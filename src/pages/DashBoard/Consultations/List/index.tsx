import React from "react";

import { useStyles } from "./style";

import api from "../../../../services/Api";
import Table from "../../../../components/Table";
import StatusButton, {Status} from "../../../../components/StatusButton";

import {
    Button,
	TableCell,
	TableRow,
} from "@material-ui/core";

import { Add, } from "@material-ui/icons";

import { useHistory } from "react-router-dom";

const List: React.FC = () => {
	const classes = useStyles();
    const { push } = useHistory();

	React.useEffect(() => {
		const request = async () => {
			try {
				const result = await api.get("consults");
				console.log(result.data);
			} catch (e) {
				console.log(e.message);
			}
		};
		request();
	}, []);

	return (
			<Table
					mainContainerStyles={classes.mainContainer}
					header={["Data", "Nome", "Tipo de Consulta", "Status"]}
					title="Consultas"
					rows={[
						{
							hour: "8:00",
							name: "Carlos",
							type: "Retorno",
							date: new Date(),
							status: Status.Confirm,
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Primeira",
							date: new Date(),
							status: Status.Cancel,
						},
						{
							hour: "9:00",
							name: "Camila",
							type: "Retorno",
							date: new Date(),
							status: Status.Missed,
						},
						{
							hour: "10:00",
							name: "Rodrigo",
							type: "Retorno",
							date: new Date(),
							status: Status.scheduled,
						},
						{
							hour: "10:30",
							name: "Marcela rodrigues",
							type: "internamento",
							date: new Date(),
							status: Status.WaitingForService,
						},
						{
							hour: "11:00",
							name: "Marcela",
							type: "Retorno",
							date: new Date(),
							status: Status.Confirm,
						},
						{
							hour: "11:30",
							name: "Italo",
							type: "Retorno",
							date: new Date(),
							status: Status.Attended,
						},
						{
							hour: "12:00",
							name: "Josivaldo",
							type: "Retorno",
							date: new Date(),
							status: Status.Confirm,
						},
						{
							hour: "12:30",
							name: "Arthur",
							type: "Retorno",
							date: new Date(),
							status: Status.Cancel,
						},
						{
							hour: "13:00",
							name: "Enzo",
							type: "Retorno",
							date: new Date(),
							status: Status.InAttendance,
						},
						{
							hour: "13:30",
							name: "Camile",
							type: "Retorno",
							date: new Date(),
							status: Status.Attended,
						},
					]}
					renderItems={(item, index) => (
						<TableRow key={`${item}-${index}`}>
							<TableCell align="center">{item.hour}</TableCell>
							<TableCell align="center">{item.name}</TableCell>
							<TableCell align="center">{item.type}</TableCell>
							<TableCell align="center">{<StatusButton  status={item.status}/>}</TableCell>
						</TableRow>
					)}
					pageOffset={1}
					tableFooter={(
						<Button
							className={classes.createButton}
							onClick={() => push("/dashboard/consultations/create")}
						><Add/> Agendar</Button>
					)}
				/>
	);
};

export default List;
