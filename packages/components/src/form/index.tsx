import * as React from "react";
import FormItem, { FormItemProps } from "./form-item";
import { _isObject, _isArray } from "../__utils/type-check";
import { tuple } from "../__utils/type";
import FormRow, { FormRowProps } from "./row";

const displayTuple = tuple("horizontal", "vertical", "inline");
export type DisplayType = typeof displayTuple[number];
interface FormProps {
	/** name of the form */
	name: string;
	/** onSubmit event handler of the form */
	onSubmit: (state: any, e?: React.FormEvent) => void;
	/** layout can take values from  horizontal, vertical and inline. Horizontal is default  */
	layout?: DisplayType;
	formState?: any;
	children: any;
}
export interface Rule {
	type?: string;
	required?: boolean;
	message: string;
	pattern?: any;
	len?: number;
	min?: number;
	max?: number;
	enum?: string[];
}
const REGEX = {
	EMAIL: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
};

const validateRuleType = (type: string, value: string) => {
	switch (type) {
		case "email":
			return new RegExp(REGEX.EMAIL).test(value);
		default:
			throw "type you mentioned is not defined";
	}
};
const validateRegex = (expression: any, value: string) => {
	return value.search(expression) !== -1 ? true : false;
};
const ifEmpty = (value: any): boolean => {
	if (
		!value ||
		(_isObject(value) && !value.value) ||
		(_isArray(value) && !value.length)
	)
		return true;
	return false;
};
interface CompoundedComponent
	extends React.ForwardRefExoticComponent<
		FormProps & React.RefAttributes<HTMLFormElement>
	> {
	Item: React.FC<FormItemProps>;
	Row: React.FC<FormRowProps>;
}

const formWithRef = (props: FormProps, ref: any) => {
	const {
		name,
		layout = "horizontal",
		onSubmit = () => {},
		formState,
		children
	} = props;
	const [state, setState] = React.useState<any>(formState ?? {});
	const [errors, setErrors] = React.useState<any>({});

	// Called on blur
	const handleError = (rules: Rule[], name: string, value: any) => {
		value = typeof value === "string" ? value.trim() : value;
		if (rules) {
			const requiredRule = rules.filter(item => item.required)[0];
			if (requiredRule) {
				if (ifEmpty(value)) {
					setErrors({ ...errors, [name]: requiredRule.message });
					return;
				}
			}
			const typeRule = rules.filter(item => item.type)[0];
			if (typeRule) {
				const isValid = validateRuleType(
					typeRule.type as string,
					value
				);
				if (!isValid) {
					setErrors({ ...errors, [name]: typeRule.message });
					return;
				}
			}
			const patternRule = rules.filter(item => item.pattern)[0];
			if (patternRule) {
				const isValid = validateRegex(patternRule.pattern, value);
				if (!isValid) {
					setErrors({ ...errors, [name]: patternRule.message });
					return;
				}
			}
			const lengthRule = rules.filter(item => item.len)[0];
			if (lengthRule) {
				const isValid = value.length === lengthRule.len;
				if (!isValid) {
					setErrors({ ...errors, [name]: lengthRule.message });
					return;
				}
			}
			const minMaxRule = rules.filter(item => item.min && item.max)[0];
			if (minMaxRule) {
				const { min, max }: any = minMaxRule;
				const isValid = value.length >= min && value.length <= max;
				if (!isValid) {
					setErrors({ ...errors, [name]: minMaxRule.message });
					return;
				}
			}
			const enumRule = rules.filter(item => item.enum)[0];
			if (enumRule) {
				const isValid = enumRule.enum?.includes(
					_isObject(value) ? value.text : value
				);
				if (!isValid) {
					setErrors({ ...errors, [name]: enumRule.message });
					return;
				}
			}
			setErrors({ ...errors, [name]: "" });
		}
	};

	// Called on each keystroke
	const handleChange = (value: any, name: string) => {
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isError()) return;
		onSubmit(state, e);
	};
	const requiredFields: any = {};

	const isError = (): boolean => {
		// throw error only if rule is violated on any of the required fields
		let isError = false;
		for (let key in requiredFields) {
			if (ifEmpty(state[key]) || errors[key]) {
				isError = true;
				break;
			}
		}
		return isError;
	};

	React.useImperativeHandle(ref, () => ({
		validate: () => !isError(),
		getFormState: () => state,
		setFormState: (state: any) => {
			setState({ ...state });
		},
		resetForm: (emptyState: any) => {
			setState(emptyState);
		}
	}));

	return (
		<form name={name} onSubmit={handleSubmit}>
			{React.Children.map(children, child => {
				const { rules, name } = child.props;
				if (child.props.submit) {
					const disabled = isError();
					return React.cloneElement(child, {
						disabled,
						layout
					});
				}
				if (rules) {
					const requiredRule = rules.filter(
						(item: any) => item.required
					)[0];
					if (requiredRule) requiredFields[name] = true;
				}
				// This is a check for handling side effects
				const changeHandler = child.props.handleChange
					? child.props.handleChange
					: handleChange;

				return React.cloneElement(child, {
					state,
					handleChange: changeHandler,
					errors,
					handleError,
					layout
				});
			})}
		</form>
	);
};

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
	formWithRef
) as CompoundedComponent;

Form.Item = FormItem;
Form.Row = FormRow;

export default Form;
