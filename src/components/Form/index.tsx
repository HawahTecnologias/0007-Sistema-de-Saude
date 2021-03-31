import {
	Box,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

const Form: React.FC = (props) => {
	const classes = useStyles();
	return <Box className={classes.formContent}>{props.children}</Box>;
};

export default Form;
