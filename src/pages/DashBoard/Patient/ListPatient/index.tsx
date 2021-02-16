import React from "react";

import { useStyles } from "./style";

import Table from "../../../../components/Table";

import { Box,
    Button,
	TableCell,
	TableRow,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const ListPatient: React.FC = () => {
	const classes = useStyles();
    const { push } = useHistory();

    const pushToCreate = (url: string)=> {
        push(url);
    }
	return (
		<Box>
			<Box className={classes.mainContainer}>
				<Table
                    tableFooter={<Button onClick={()=>{pushToCreate("patient/createPatient")}}> <Add/>Criar</Button>}
					mainContainerStyles={classes.tableStyle}
					header={["Horario", "Nome", "Tipo de Consulta"]}
					title="Consultas do dia"
					rows={[
						{
							hour: "8:00",
							name: "Carlos",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "9:00",
							name: "Camila",
							type: "Pediatria",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
						},
						{
							hour: "8:30",
							name: "Marcela",
							type: "Cardiologista",
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
			</Box>
		</Box>
	);
};

export default ListPatient;
