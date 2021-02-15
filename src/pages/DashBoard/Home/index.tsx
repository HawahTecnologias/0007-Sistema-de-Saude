import React from "react";

import { useStyles } from "./style";
import { useHistory } from "react-router-dom";

import Table from "../../../components/Table";
import MiniCardLink from "../../../components/MiniCardLink";

import { Box,
	Divider,
	Paper,
	TableCell,
	TableRow,
	Typography
} from "@material-ui/core";
import { PersonAddOutlined } from "@material-ui/icons";

const Home: React.FC = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const miniCardIcons = [
		{
			title:"Cadastrar Paciente",
			explain:"Cadastrar",
			placeHolder:"Adicione um novo paciente",
			Icon: <PersonAddOutlined color="disabled" className={classes.MiniCardIcon}/>,
			onClick: () => push("dashboard/patient"),
		},
	]

	return (
		<Box>
			<Box className={classes.MiniCardsContainer}>
				{miniCardIcons.map((cardIcon) => (
					<MiniCardLink 
					title={cardIcon.title}
					explain={cardIcon.explain}
					placeHolder={cardIcon.placeHolder}
					Icon={cardIcon.Icon}
					onClick={cardIcon.onClick}
				/>
				))}
			
			</Box>
			<Box className={classes.twoCardBox}>
				<Table
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
				<Paper className={classes.messageBox} elevation={3}>
					<Box className={classes.messageContent}>
						<Typography variant="h6">Messages</Typography>
					</Box>
					<Divider/>
				</Paper>
			</Box>
		</Box>
	);
};

export default Home;
