import React from "react";

import { FormControl, InputLabel, Select as MSelect, MenuItem } from "@material-ui/core";

import { PropTypes } from "@material-ui/core";

type tVarient = "filled" | "outlined" | "standard";

interface ISelectAble {
	label: string;
	value: string;
}

interface IMSelect<TypeValue> {
	variant: tVarient;
	margin?: PropTypes.Margin;
	onSelect: (name: string, value: TypeValue) => void;
	required?: boolean;
	fullWidth?: boolean;
	label: string;
	type?: string;
	name: string;
	classStyleForm: string;
	selectAbleItems: ISelectAble[];
}

function Select<TypeValue> (props: IMSelect<TypeValue>) {
	const {
		onSelect,
		name,
		variant,
		label,
		classStyleForm,
		selectAbleItems,
	} = props;
	return (
		<FormControl variant={variant} className={classStyleForm}>
			<InputLabel>{label}</InputLabel>
			<MSelect
				native
				onChange={(element) => {
					const currentTarget = element.currentTarget;
					
					const { name } = currentTarget;
					const value: TypeValue = currentTarget.value as TypeValue; 
					if (name && value) {
						onSelect(name, value);
					}
				}}
				label={label}
				name={name}

			>
				<option aria-label="None" value="" />
				{selectAbleItems.map((items) => (
					<option key={`${items.label}-${items.value}`} value={items.value}>{items.label}</option>
				))}
			</MSelect>
		</FormControl>
	);
};

export default Select;
