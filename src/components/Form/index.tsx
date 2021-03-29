import {
	Box,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

interface IProps {
	formStyles?: string;
}
const Form: React.FC<IProps> = (props) => {
	const classes = useStyles();
	return <Box className={ props.formStyles || classes.formContent}>{props.children}</Box>;
};

export default Form;
