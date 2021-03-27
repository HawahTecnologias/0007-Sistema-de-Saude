import { TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

interface IProps {
	maxWidth?: number;
	handleChange: (element: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	required?: boolean;
	value?: string;
	variant?: "standard" | "filled" | "outlined";
	type?: string;
	rows?: number;
}

const TextRow: React.FC<IProps> = (props) => {
	const { maxWidth, handleChange, label, required, variant, type, rows, value } = props;
	const classes = useStyles();
	return rows ? (
		<TextField
			className={classes.inputForm}
			style={{ maxWidth: maxWidth ? `${maxWidth}px` : "300px" }}
			label={label}
			onChange={handleChange}
			type={type ? type : "text"}
			required={required ? required : false}
			variant={variant ? variant : "outlined"}
			value={value}
			multiline
			rows={rows}
		/>
	) : (
		<TextField
			className={classes.inputForm}
			style={{ maxWidth: maxWidth ? `${maxWidth}px` : "300px" }}
			label={label}
			onChange={handleChange}
			type={type ? type : "text"}
			required={required ? required : false}
			variant={variant ? variant : "outlined"}
			value={value}
		/>
	);
};

export default TextRow;
