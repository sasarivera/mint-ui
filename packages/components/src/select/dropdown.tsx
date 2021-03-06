import * as React from "react";
import styled, { css } from "styled-components";
import COLORS from "../__utils/colors";
import { GlobalStyles } from "../app";

interface DropdownProps {
	options: SelectedOption[];
	onSelect: (option: SelectedOption) => void;
	style?: React.CSSProperties;
	loading: boolean;
}

export const Dropdown = ({
	onSelect,
	options,
	style,
	loading
}: DropdownProps) => {
	const handleSelect = (event: any) => {
		event.preventDefault();
		const text = event.target.innerText || event.target.textContent || "";
		const value = event.target.getAttribute("value") || "";
		onSelect ? onSelect({ value, text }) : null;
	};

	return (
		<DropdownWrapper style={style}>
			<List>
				{loading ? (
					<Option handleSelect={() => {}}>Loading...</Option>
				) : null}
				{options.map((item: SelectedOption) => (
					<Option
						key={item.value}
						value={item.value}
						handleSelect={handleSelect}
					>
						{item.text}
					</Option>
				))}
			</List>
		</DropdownWrapper>
	);
};
export interface OptionProps {
	disabled?: boolean;
	value?: string | number;
	title?: string;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	handleSelect: (event: any) => void;
}

export interface SelectedOption {
	value: string | number;
	text: string;
}
export const Option = ({
	value,
	disabled = false,
	children,
	handleSelect
}: OptionProps) => {
	return (
		<StyledOption
			value={value}
			disabled={disabled}
			onMouseDown={handleSelect}
		>
			{children}
		</StyledOption>
	);
};
export const DropdownWrapper = styled.div`
	${GlobalStyles};
	margin: 0;
	padding: 0;
	list-style: none;
	background-color: ${COLORS.WHITE};
	border-radius: 4px;
	outline: none;
	-webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	position: absolute;
	width: 100%;
	z-index: 9999;
`;

export const List = styled.ul`
	border: 1px solid ${COLORS.BACKGROUND_GREY};
	border-radius: 4px;
	list-style: none;
	margin: 0;
	padding: 0;
	max-height: 250px;
	margin-bottom: 0;
	padding-left: 0;
	overflow: auto;
	outline: none;
`;

export const StyledOption = styled.li<Pick<OptionProps, "disabled">>`
	display: block;
	padding: 5px 12px;
	overflow: hidden;
	color: ${COLORS.GREY1};
	font-weight: normal;
	line-height: 22px;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: pointer;
	-webkit-transition: background 0.3s ease;
	transition: background 0.3s ease;
	${props =>
		props.disabled &&
		css`
			cursor: no-drop;
		`}
	&:first-child {
		color: rgba(0, 0, 0, 0.65);
		font-weight: 500;
		background-color: #fafafa;
	}
	&:hover {
		background-color: #e6f7ff;
	}
`;
export default Dropdown;
