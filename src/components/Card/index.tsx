import { Container, Card } from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

const Create: React.FC = (props) => {
	const classes = useStyles();
	return (
		<Container className={classes.pageContent}>
			<Card className={classes.cardContent} elevation={3}>
				{props.children}
			</Card>
		</Container>
	);
};

export default Create;
