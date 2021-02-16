import { TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

interface IProps {
	maxWidth?: number;
	setChange: (currentTarget: string) => void;
	label: string;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	type?: string;
	rows?: number;
}

const TextRow: React.FC<IProps> = (props) => {
	const { maxWidth, setChange, label, required, variant, type, rows } = props;
	const classes = useStyles();
	return rows ? (
		<TextField
			className={classes.inputForm}
			style={{ maxWidth: maxWidth ? `${maxWidth}px` : "300px" }}
			label={label}
			onChange={(e) => {
				setChange(e.currentTarget.value);
			}}
			type={type ? type : "text"}
			required={required ? required : false}
			variant={variant ? variant : "outlined"}
			multiline
			rows={rows}
		/>
	) : (
		<TextField
			className={classes.inputForm}
			style={{ maxWidth: maxWidth ? `${maxWidth}px` : "300px" }}
			label={label}
			onChange={(e) => {
				setChange(e.currentTarget.value);
			}}
			type={type ? type : "text"}
			required={required ? required : false}
			variant={variant ? variant : "outlined"}
		/>
	);
};

export default TextRow;
