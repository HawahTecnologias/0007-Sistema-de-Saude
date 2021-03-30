import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Typography,
	Container,
	Button,
	TextField as MTextFiled,
	Box,
} from "@material-ui/core";

import { useGlobalContext } from "contexts";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "components/Card";
import Form from "components/Form";
import Row from "components/Form/Row";
import { useStyles } from "./style";
import * as api from "services/Api";
import useCreateConsultation from "./useCreateConsultation";

import SelectInputs from "components/SelectInputs";

import TextField from "components/TextField";

const Create: React.FC = () => {
	const { snackBar } = useGlobalContext();
	const useCreate = useCreateConsultation(snackBar);

	const [selectPatient, setSelectPatient] = useState<api.IPatient | null>(null);
	const route = useHistory();

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
						<TextField
							{...useCreate.handleFilds("professional")}
							variant="outlined"
							className={classes.inputForm}
							margin="normal"
							required
							name="professional"
							autoComplete="professional"
							autoFocus
						/>

						<TextField
							{...useCreate.handleFilds("observation")}
							variant="outlined"
							className={classes.inputForm}
							margin="normal"
							required
							name="observation"
							autoComplete="professional"
							autoFocus
						/>

						<Autocomplete
							className={classes.inputForm}
							id="patientId"
							options={useCreate.patients}
							getOptionLabel={(option) => option.name}
							onChange={(event, newValue: api.IPatient | null) => {
								if (newValue) {
									setSelectPatient(newValue);
									useCreate.onSelect("patientId", newValue.id);
								}
							}}
							style={{ width: 300 }}
							renderInput={(params) => (
								<MTextFiled
									{...params}
									name="patient"
									label="Paciente"
									variant="outlined"
									
								/>
							)}
						/>

						<SelectInputs
							{...useCreate.handleSelectFilds("consultType")}
							selectAbleItems={[{label: "Consulta1", value: "consulta1"}, {label: "Consulta2", value: "consulta2"},{label: "Consulta3", value: "consulta3"}]}
							label="Tipo de Consulta"
							variant="outlined"
							classStyleForm={classes.inputForm}
						/>

						<MTextFiled
							className={classes.inputForm}
							id="datetime-local"
							label="Horário"
							type="date"
							defaultValue="2017-05-24"
							onChange={(e) => {
								useCreate.onSelect("time", e.currentTarget.value);
							}}
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
					</Row>
					{selectPatient && (
						<>
							<Row>
								<Box className={classes.patientInfo}>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.gender}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.birthdate}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.healthPlan}
									</Typography>
								</Box>
							</Row>
							<Row>
								<Box className={classes.patientInfo}>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.primaryPhone}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.secondPhone}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{selectPatient.email}
									</Typography>
								</Box>
							</Row>
						</>
					)}
					<Button
						className={classes.buttonSave}
						onClick={() => {
							useCreate.createConsult(() => route.push("/dashboard/consultations"));
						}}
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
