import React from "react";

import { useStyles } from "./style";

import Table from "../../../../components/Table";

import {
	Box,
	Button,
	TableCell,
	TableRow,
	IconButton,
} from "@material-ui/core";
import { Add, Delete, Edit, Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const ListPatient: React.FC = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const pushToCreate = (url: string) => {
		push(url);
	};
	return (
		<Box>
			<Box className={classes.mainContainer}>
				<Table
					tableFooter={
						<Button
							onClick={() => {
								pushToCreate("patient/createPatient");
							}}
						>
							{" "}
							<Add />
							Criar
						</Button>
					}
					mainContainerStyles={classes.tableStyle}
					header={[
						"E-Mail",
						"Nome",
						"Plano",
						"Visualizar",
						"Editar",
						"Deletar",
					]}
					title="Pacientes"
					rows={[
						{
							email: "teste@gmail.com",
							name: "Carlos",
							plain: "Plano1",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano2",
						},
						{
							email: "teste@gmail.com",
							name: "Camila",
							plain: "Plano3",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano4",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano5",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano4",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano1",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano1",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano1",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano1",
						},
						{
							email: "teste@gmail.com",
							name: "Marcela",
							plain: "Plano1",
						},
					]}
					pageOffset={1}
					renderItems={(item, index) => (
						<TableRow key={`${item}-${index}`}>
							<TableCell align="center">{item.email}</TableCell>
							<TableCell align="center">{item.name}</TableCell>
							<TableCell align="center">{item.plain}</TableCell>
							<TableCell align="center">
								<IconButton>
									<Visibility />
								</IconButton>
							</TableCell>
							<TableCell align="center">
								<IconButton>
									<Edit />
								</IconButton>
							</TableCell>
							<TableCell align="center">
								<IconButton>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					)}
				/>
			</Box>
		</Box>
	);
};

export default ListPatient;
