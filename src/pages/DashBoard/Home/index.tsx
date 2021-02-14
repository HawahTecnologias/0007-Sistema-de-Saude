import React from "react";

import { useStyles } from "./style";

import Table from "../../../components/Table";
import {} from "@material-ui/icons";
import { TableCell, TableRow } from "@material-ui/core";

const Home: React.FC = () => {
const classes = useStyles();

	return (
		<Table 
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
			]}
			renderItems={(item, index) => (
				<TableRow key={`${item}-${index}`}>
					<TableCell>{item.hour}</TableCell>
					<TableCell>{item.name}</TableCell>
					<TableCell>{item.type}</TableCell>
				</TableRow>
			)}
		/>
	);
};

export default Home;
