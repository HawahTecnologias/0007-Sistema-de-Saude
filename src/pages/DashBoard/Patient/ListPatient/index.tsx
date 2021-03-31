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
import api from "../../../../services/API";

interface IData {
	name: string;
	email: string;
	health_plan: string;
}
const ListPatient: React.FC = () => {
	const [data, setData] = React.useState<IData[]>();

	const classes = useStyles();
	const { push } = useHistory();

	React.useEffect(() => {
		const request = async () => {
			try {
				const result = await api.get("patients");
				setData(result.data);
				console.log(result.data);
			} catch (e) {
				console.log(e.message);
			}
		};
		request();
	}, []);

	const pushToCreate = (url: string) => {
		push(url);
	};
	return (
		<Box>
			<Box className={classes.mainContainer}>
				{!data ? (
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
						rows={data}
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
									{item.health_plan}
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
