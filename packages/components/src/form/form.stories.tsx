import * as React from "react";
import Form, { DisplayType } from "./index";
import Input from "../input";
import Select from "../select";
import TypeAhead from "../typeahead";
import styled from "styled-components";
import RadioGroup from "../radio-group";
import Button from "../button";
import FormItem, { labelCol, Label } from "./form-item";
import Row from "../grid/row";
import Col from "../grid/col";
import COLORS from "../__utils/colors";
import Card from "../card";
import FormRow from "./row";
import DatePicker from "../date-picker";

export default {
	title: "Form",
	component: Form,
	subcomponents: { FormItem, FormRow },
	parameters: {
		componentSubtitle: "seedState"
	}
};

const LayoutWrapper = styled.div`
	margin: 0 auto;
	width: 100%;
`;
export const seedState = () => {
	const selectData = [
		{
			text: "Select Value",
			value: ""
		},
		{
			text: "Item 1",
			value: "item1"
		},
		{
			text: "Item 2",
			value: "item2"
		}
	];
	const formItemLayout: { labelCol: labelCol; fieldCol: labelCol } = {
		labelCol: { span: 4 },
		fieldCol: { span: 8 }
	};

	const handleSubmit = (state: any) => {
		console.log("state", state);
	};

	// const formState = {
	// 	firstName: "Your",
	// 	lastName: "Name",
	// 	email: "",
	// 	state: selectData[0],
	// 	radioGroup: "item-2",
	// 	maritalStatus: true
	// };
	const dataConfig = {
		url: "https://api.publicapis.org/entries",
		params: {
			// fill the params here or later in app flow dynamically as you wish
			category: "business",
			https: true
		},
		dataKey: "entries",
		valueKey: "Link", // this will usually be id key
		displayKey: "API",
		searchKey: ""
	};
	return (
		<LayoutWrapper>
			<Card boxShadow>
				<Form name="full" onSubmit={handleSubmit}>
					<Form.Item
						label="First name"
						name="firstName"
						rules={[
							{
								required: true,
								message: "First name is required"
							},
							{
								len: 10,
								message: "Length should be exact 10"
							}
						]}
						helpText="First name has a rule of 10 exact characters for some secret reason"
						{...formItemLayout}
					>
						<Input type="text" placeholder="First name" />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Last name"
						rules={[
							{
								min: 1,
								max: 15,
								message:
									"Min and Max length should be between 1 and 15"
							}
						]}
						helpText="Last name should be lie between 1 and 15 characters"
						{...formItemLayout}
					>
						<Input type="text" placeholder="Last name" />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Email is required"
							},
							{
								message: "Email is not valid",
								pattern:
									"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
							}
						]}
						{...formItemLayout}
					>
						<Input type="text" name="email" placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="dob"
						label="Date of birth"
						{...formItemLayout}
					>
						<DatePicker />
					</Form.Item>
					<Form.Item
						name="state"
						label="State"
						rules={[
							{
								required: true,
								message: "State is required"
							}
						]}
						{...formItemLayout}
					>
						<Select
							placeholder="Select user..."
							options={selectData}
						/>
					</Form.Item>
					<Form.Item
						name="city"
						label="City"
						rules={[
							{
								required: true,
								message: "City is required"
							}
						]}
						{...formItemLayout}
					>
						<TypeAhead name="some-typeahead" data={dataConfig} />
					</Form.Item>
					<Form.Item
						name="radioGroup"
						label="Select options"
						rules={[
							{
								required: true,
								message: "Selection is required"
							}
						]}
						{...formItemLayout}
					>
						<RadioGroup
							buttonStyle="solid"
							radios={[
								{ text: "Item 1", value: "item-1" },
								{ text: "Item 2", value: "item-2" }
							]}
						/>
					</Form.Item>
					<Form.Row submit justify="center">
						<Button
							title="Back"
							size="small"
							btnType="outlined"
							btnStyle="primary"
							style={{ marginRight: "30px" }}
							onClick={() =>
								alert(
									"You probably want to route away by this CTA click in a real app. Not happening here though! We have more interesting stuff to look at"
								)
							}
						/>
						<Button
							size="small"
							btnType="solid"
							btnStyle="primary"
							htmlType="submit"
							title="Submit"
						/>
					</Form.Row>
				</Form>
			</Card>
		</LayoutWrapper>
	);
};

export const layout = () => {
	const [layout, setLayout] = React.useState<DisplayType>("horizontal");
	const handleSubmit = (state: any) => {
		console.log("state", state);
	};
	const formItemLayout: { labelCol: labelCol; fieldCol: labelCol } = {
		labelCol: { span: 4 },
		fieldCol: { span: 8 }
	};
	return (
		<LayoutWrapper>
			<Card boxShadow>
				<Row style={{ marginBottom: "30px" }}>
					<Col>
						<Label style={{ marginRight: "10px" }}>
							Form Layout:
						</Label>
						<Button
							title="Horizontal"
							size="small"
							style={{ marginRight: "10px" }}
							onClick={() => setLayout("horizontal")}
						/>
						<Button
							title="Vertical"
							size="small"
							style={{ marginRight: "10px" }}
							onClick={() => setLayout("vertical")}
						/>
						<Button
							title="Inline"
							size="small"
							onClick={() => setLayout("inline")}
						/>
					</Col>
				</Row>
				<div
					style={{
						border: `1px dotted ${COLORS.GREY4}`,
						margin: "30px 0"
					}}
				></div>
				<Form name="basic" layout={layout} onSubmit={handleSubmit}>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: "First name is required"
							},
							{
								len: 10,
								message: "Length should be exact 10"
							}
						]}
						{...formItemLayout}
					>
						<Input type="text" placeholder="First name" />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Email is required"
							},
							{
								message: "Email is not valid",
								pattern: new RegExp(
									/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?: [\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
								)
							}
						]}
						{...formItemLayout}
					>
						<Input type="text" name="email" placeholder="Email" />
					</Form.Item>
					<Form.Row
						submit
						justify={
							layout === "vertical" ? "flex-start" : "center"
						}
					>
						<Button
							title="Submit"
							btnType="solid"
							btnStyle="primary"
							htmlType="submit"
						/>
					</Form.Row>
				</Form>
			</Card>
		</LayoutWrapper>
	);
};

export const SideEffects = () => {
	const state = {
		statename: "",
		city: undefined
	};
	const formRef = React.useRef<HTMLFormElement>();

	const [formError, setFormError] = React.useState<boolean>(false);

	const handleChange = (selected: any, name: string) => {
		const state = formRef.current.getFormState();
		let newState;
		if (selected.value === "udaipur") {
			newState = {
				...state,
				[name]: selected,
				statename: "Rajasthan"
			};
		} else {
			newState = {
				...state,
				[name]: selected,
				statename: "Karnataka"
			};
		}
		formRef.current.setFormState(newState);
	};
	return (
		<LayoutWrapper>
			<Card boxShadow>
				<h4 style={{ color: COLORS.YELLOW }}>
					The need to have a CTA outside form is probably a bad UX.
					Catch your designer here and browbeat to have a valid one.
					But we have got you covered even for such pandemic
					situations in case these are unavoidable.
				</h4>
				<Form
					name="validateAPI"
					formState={state}
					ref={formRef}
					onSubmit={() => {}}
				>
					<Form.Item
						label="State Name"
						name="statename"
						labelCol={{ span: 4 }}
						fieldCol={{ span: 8 }}
					>
						<Input placeholder="Select city below to get state name..." />
					</Form.Item>
					<Form.Item
						name="city"
						label="City"
						handleChange={handleChange}
						labelCol={{ span: 4 }}
						fieldCol={{ span: 8 }}
						rules={[
							{
								required: true,
								message:
									"Select city to see real power of imperative handlers"
							}
						]}
					>
						<Select
							options={[
								{ text: "Udaipur", value: "udaipur" },
								{ text: "Coorg", value: "coorg" }
							]}
							placeholder="Select City"
						/>
					</Form.Item>

					<Form.Row submit justify="center">
						<Button
							size="small"
							btnType="solid"
							btnStyle="primary"
							htmlType="submit"
							title="Submit"
						/>
					</Form.Row>
				</Form>
				{formError ? (
					<p style={{ color: COLORS.DANGER }}>
						Your custom global error message at any place outside
						the form component
					</p>
				) : null}
				<hr />
				<p>
					Legit sophisticated `Form` ends here. Below is an entry into
					imperative handlers to show more dynamism which in some
					cases maybe required.
				</p>

				<Row style={{ marginTop: "30px" }} justify="center">
					<Button
						title="Validate manually"
						size="small"
						btnType="outlined"
						btnStyle="primary"
						onClick={() => {
							const isValid = formRef.current.validate();
							setFormError(!isValid);
						}}
						style={{ marginRight: "15px" }}
					/>
					<Button
						title="reset"
						size="small"
						btnType="outlined"
						btnStyle="default"
						onClick={() => {
							formRef.current.resetForm({
								statename: "",
								city: undefined
							});
						}}
					/>
				</Row>
			</Card>
		</LayoutWrapper>
	);
};

export const fieldsFromJSON = () => {
	const selectConfig = {
		url: "https://api.publicapis.org/entries?category=finance&https=true",
		params: {
			// fill the params here or later in app flow dynamically as you wish
			category: "business",
			https: true
		},
		dataKey: "entries",
		valueKey: "Link", // this will usually be id key
		displayKey: "API"
	};
	return (
		<Form name="configDriven" onSubmit={() => {}}>
			<Form.Item
				label="Business"
				name="business"
				labelCol={{ span: 4 }}
				fieldCol={{ span: 8 }}
				rules={[
					{
						required: true,
						message: "You need to select a business here"
					}
				]}
			>
				<Select
					data={selectConfig}
					placeholder="Select a business..."
				/>
			</Form.Item>
			<Form.Row submit justify="center">
				<Button
					size="small"
					btnType="solid"
					btnStyle="primary"
					htmlType="submit"
					title="Submit"
				/>
			</Form.Row>
		</Form>
	);
};
