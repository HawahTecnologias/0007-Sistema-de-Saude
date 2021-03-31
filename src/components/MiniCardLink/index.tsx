import React from "react";

import { useStyles } from "./style";

import {
	Paper,
	Typography,
	Box,
} from "@material-ui/core";

import {} from "@material-ui/icons";

interface IProps {
	title: string;
	explain: string;
	placeHolder: string;
	Icon: React.ReactElement;
	onClick: () => void;
}

function MiniCardLink(props: IProps) {
	const classes = useStyles();
	const {
		title,
		explain,
		placeHolder,
		Icon,
		onClick,
	} = props;

	return (
		<Paper
			className={classes.mainContainer}
			elevation={0}
			onClick={onClick}
		>
			<Box>
				<Typography variant="subtitle1">{title}</Typography>
				<Typography variant="h4">{explain}</Typography>
				<Typography variant="subtitle2">{placeHolder}</Typography>
			</Box>
			<Box className={classes.Icon}>{Icon}</Box>
		</Paper>
	);
}

export default MiniCardLink;
