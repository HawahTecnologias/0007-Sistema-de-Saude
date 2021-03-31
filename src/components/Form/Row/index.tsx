import {
	Box,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

const Row: React.FC = (props) => {
	const classes = useStyles();
	return <Box className={classes.row}>{props.children}</Box>;
};

export default Row;
