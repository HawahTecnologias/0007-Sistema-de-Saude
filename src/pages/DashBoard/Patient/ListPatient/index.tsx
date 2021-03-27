import React from "react";

import { useStyles } from "./style";

import Table from "components/Table";

import {
	Box,
	Button,
	TableCell,
	TableRow,
	IconButton,
} from "@material-ui/core";
import { Add, Delete, Edit, Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import * as api from "services/Api";
import useTableForm from "hooks/useTableForm";

const ListPatient: React.FC = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const useTable = useTableForm<api.IPatient>({getItemsData: api.getPatients});

	const pushToCreate = (url: string) => {
		push(url);
	};

	return (
		<Box>
			<Box className={classes.mainContainer}>
				{useTable.loading ? (
					<h1>CARREGANDO...</h1>
				) : (
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
						rows={useTable.itemsData}
						pageOffset={1}
						renderItems={(item, index) => (
							<TableRow key={`${item}-${index}`}>
								<TableCell align="center">
									{item.email}
								</TableCell>
								<TableCell align="center">
									{item.name}
								</TableCell>
								<TableCell align="center">
									{item.healthPlan}
								</TableCell>
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
				)}
			</Box>
		</Box>
	);
};

export default ListPatient;
