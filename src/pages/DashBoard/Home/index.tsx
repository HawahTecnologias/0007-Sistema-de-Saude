import React from "react";

import { useStyles } from "./style";

import Table from "../../../components/Table";

import { Box, Paper, Card, TableCell, TableRow, Typography } from "@material-ui/core";
import {} from "@material-ui/icons";

const Home: React.FC = () => {
const classes = useStyles();

	return (
		<Box className={classes.twoCardBox}>
		<Table 
		mainContainerStyles={classes.tableStyle}
			header={["Horario", "Nome", "Tipo de Consulta"]}
			title="Consultas do dia"
			rows={[
				{
					hour: "8:00",
					name: "Carlos",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},
				{
					hour: "8:30",
					name: "Marcela",
					type: "Cardiologista"
				},

			]}
			renderItems={(item, index) => (
				<TableRow key={`${item}-${index}`}>
					<TableCell align="center">{item.hour}</TableCell>
					<TableCell align="center">{item.name}</TableCell>
					<TableCell align="center">{item.type}</TableCell>
				</TableRow>
			)}
		/>
		<Paper className={classes.messageBox}>
			<Typography>Messages</Typography>
		</Paper>
		</Box>
	);
};

export default Home;
