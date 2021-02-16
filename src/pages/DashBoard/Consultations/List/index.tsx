import React from "react";

import { useStyles } from "./style";

import Table from "../../../../components/Table";
import StatusButton, {Status} from "../../../../components/StatusButton";

import { Box,
    Button,
	TableCell,
	TableRow,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

const List: React.FC = () => {
	const classes = useStyles();
    const { push } = useHistory();

	return (
			<Table
					mainContainerStyles={classes.mainContainer}
					header={["Horario", "Nome", "Tipo de Consulta", "Status"]}
					title="Consultas"
					rows={[
						{
							hour: "8:00",
							name: "Carlos",
							type: "Retorno",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Primeira",
						},
						{
							hour: "9:00",
							name: "Camila",
							type: "Retorno",
						},
						{
							hour: "10:00",
							name: "Rodrigo",
							type: "Retorno",
						},
						{
							hour: "10:30",
							name: "Marcela rodrigues",
							type: "internamento",
						},
						{
							hour: "11:00",
							name: "Marcela",
							type: "Retorno",
						},
						{
							hour: "11:30",
							name: "Italo",
							type: "Retorno",
						},
						{
							hour: "12:00",
							name: "Josivaldo",
							type: "Retorno",
						},
						{
							hour: "12:30",
							name: "Arthur",
							type: "Retorno",
						},
						{
							hour: "13:00",
							name: "Enzo",
							type: "Retorno",
						},
						{
							hour: "13:30",
							name: "Camile",
							type: "Retorno",
						},
					]}
					renderItems={(item, index) => (
						<TableRow key={`${item}-${index}`}>
							<TableCell align="center">{item.hour}</TableCell>
							<TableCell align="center">{item.name}</TableCell>
							<TableCell align="center">{item.type}</TableCell>
							<TableCell align="center">{<StatusButton  status={Status.Confirm}/>}</TableCell>
						</TableRow>
					)}
				/>
	);
};

export default List;
