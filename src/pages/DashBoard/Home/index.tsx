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
import { PersonAddOutlined, Alarm, ListAlt } from "@material-ui/icons";
const Home: React.FC = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const miniCardIcons = [
		{
			title:"Cadastrar Paciente",
			explain:"Cadastrar",
			placeHolder:"Adicione um novo paciente",
			Icon: <PersonAddOutlined color="disabled" className={classes.MiniCardIcon}/>,
			onClick: () => push("dashboard/patient/createPatient"),
		},
		{
			title:"Agendar Consulta",
			explain:"Agendar",
			placeHolder:"Agende a consulta de um paciente",
			Icon: <Alarm color="disabled" className={classes.MiniCardIcon}/>,
			onClick: () => push("dashboard/consultations/create"),
		},
		{
			title:"Criar Prontuário",
			explain:"Prontuário",
			placeHolder:"Contrua um Prontoário",
			Icon: <ListAlt color="disabled" className={classes.MiniCardIcon}/>,
			onClick: () => push("dashboard/patientRecord/create"),
		},
	]

	return (
		<Box>
			<Box className={classes.MiniCardsContainer}>
				{miniCardIcons.map((cardIcon, index) => (
					<MiniCardLink 
					key={`${cardIcon.placeHolder}-${index}`}
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
					loading={false}
					mainContainerStyles={classes.tableStyle}
					header={["Horario", "Nome", "Tipo de Consulta"]}
					title="Consultas do dia"
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
