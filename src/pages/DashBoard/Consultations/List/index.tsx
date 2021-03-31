import React from "react";

import { useStyles } from "./style";

import * as api from "services/Api";
import Table from "components/Table";
import StatusButton, {Status} from "components/StatusButton";

import {
    Button,
	TableCell,
	TableRow,
} from "@material-ui/core";

import { Add, } from "@material-ui/icons";

import { useHistory } from "react-router-dom";

import useTableForm from "hooks/useTableForm";

const List: React.FC = () => {
	const classes = useStyles();
    const { push } = useHistory();
	const useTable = useTableForm({ getItemsData: api.getConsults});

	return (
			<Table
					mainContainerStyles={classes.mainContainer}
					header={["Nome", "Id do Paciente", "Tipo de Consulta"]}
					title="Consultas"
					rows={useTable.itemsData}
					renderItems={(item, index) => (
						<TableRow key={`${item}-${index}`}>
							<TableCell align="center">{item.name}</TableCell>
							<TableCell align="center">{item.patientId}</TableCell>
							<TableCell align="center">{item.consultType}</TableCell>
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
