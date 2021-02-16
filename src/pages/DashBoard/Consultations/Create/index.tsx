import {
	Typography,
	Container,
	Button,
	FormControl,
	InputLabel,
	Select,
	TextField,
    Box,
} from "@material-ui/core";
import React from "react";
import Card from "../../../../components/Card";
import Form from "../../../../components/Form";
import Row from "../../../../components/Form/Row";
import TextRow from "../../../../components/Form/TextRow";
import { useStyles } from "./style";

const Create: React.FC = () => {
	const classes = useStyles();
	return (
		<Container className={classes.pageContent}>
			<Card>
				<Typography
					className={classes.titlePage}
					variant="h4"
					gutterBottom
				>
					Agendar Consulta
				</Typography>
				<Form>
					<Row>
						<TextRow label="Nome" setChange={() => {}} />
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Tipo de consulta</InputLabel>
							<Select
								native
								onChange={(e) => {
									console.log(e.currentTarget.value);
								}}
								label="Gênero"
							>
								<option aria-label="None" value="" />
								<option value={10}>Primeira</option>
								<option value={20}>Retorno</option>
								<option value={30}>Internação</option>
							</Select>
						</FormControl>
                        
						<TextField
							className={classes.inputForm}
							id="datetime-local"
							label="Horário"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
					</Row>
					<Row>
						<Box className={classes.patientInfo}>
							<Typography className={classes.patientInfoItems}>Gênero: Masculino</Typography>
							<Typography className={classes.patientInfoItems}>Nascimento: 15/06/1971</Typography>
							<Typography className={classes.patientInfoItems}>Plano de saúde:  Plano01</Typography>
						</Box>
					</Row>
                    <Row>
						<Box className={classes.patientInfo}>
							<Typography className={classes.patientInfoItems}>Telefone01: 57912378129</Typography>
							<Typography className={classes.patientInfoItems}>Telefone02: 57912370953</Typography>
							<Typography className={classes.patientInfoItems}>E-mail: teste@gmail.com</Typography>
						</Box>
					</Row>
					<Row>
						<TextRow
							label="Observações"
							setChange={() => {}}
							rows={6}
						/>
					</Row>
					<Button
						className={classes.buttonSave}
						onClick={() => {}}
						variant="contained"
					>
						Agendar
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default Create;
