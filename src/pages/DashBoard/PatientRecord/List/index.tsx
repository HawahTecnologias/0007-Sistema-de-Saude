import React from "react";

import * as api from "services/Api";

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

import strings from "resources/strings";

import { useHistory } from "react-router-dom";
import useTableForm from "hooks/useTableForm";

const List: React.FC = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const useTable = useTableForm<api.IPatientRecord>({
		getItemsData: api.getPatientRecords,
	});

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
								pushToCreate("patientRecord/create");
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
					title={strings.pages.patientRecord.title}
					rows={useTable.itemsData}
					pageOffset={1}
					renderItems={(item, index) => (
						<TableRow key={`${item}-${index}`}>
							<TableCell align="center">{`item${index}`}</TableCell>
							<TableCell align="center">{`item${index}`}</TableCell>
							<TableCell align="center">
								{`item${index}`}
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
			</Box>
		</Box>
	);
};

export default List;
