import React from "react";

import { TextField as MTextField, PropTypes,  } from "@material-ui/core";

type tVarient = "filled" | "outlined" | "standard";

interface IMTextInput {
	variant: tVarient;
	margin: PropTypes.Margin;
	handleChange: (element: React.ChangeEvent<HTMLInputElement>) => void;
	required: boolean;
	fullWidth: boolean
	label: string;
	type?: string;
	name: string;
	autoComplete?: string;
	autoFocus?: boolean;
};

const TextField: React.FC<IMTextInput> = (props) => {
	const {
		fullWidth,
		label,
		margin,
		name,
		required,
		variant,
		autoComplete,
		type,
		handleChange,
		autoFocus } = props;
	return (
		<MTextField
			variant={variant}
			margin={margin}
			required={required}
			fullWidth={fullWidth}
			label={label}
			name={name}
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			type={type}
			onChange={handleChange}
		/>
	);
};

export default TextField;
