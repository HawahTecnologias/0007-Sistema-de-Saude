import React from "react";
import { useHistory } from "react-router-dom";
import {
	FormControl,
	InputLabel,
	Select,
	TextField,
	Typography,
	Container,
	Button,
} from "@material-ui/core";
import { useGlobalContext } from "contexts";
import Form from "components/Form";
import Row from "components/Form/Row";
import TextRow from "components/Form/TextRow";
import Card from "components/Card";
import { useStyles } from "./style";
import useCreatePatient from "./useCreatePatient";

const CreatePatient: React.FC = () => {
	const { snackBar } = useGlobalContext();
	const classes = useStyles();
	const route = useHistory();
	const {
		createPatient,
		handleFilds,
	} = useCreatePatient(snackBar);
	return (
		<Container className={classes.pageContent}>
			<Card>
				<Typography
					className={classes.titlePage}
					variant="h4"
					gutterBottom
				>
					Cadastro do Paciente
				</Typography>
				<Form>
					<Row>
						<TextRow {...handleFilds("name")} />
						<TextRow {...handleFilds("age")} />
					{/* 	<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Gênero</InputLabel>
							<Select
								native
								onChange={(e) => {
									if (e.currentTarget.value) {
										handleChange(
											String(e.currentTarget.value),
										);
									}
								}}
								label="genero"
							>
								<option aria-label="None" value="" />
								<option value={"masculino"}>Masculino</option>
								<option value={"feminino"}>Feminino</option>
							</Select>
						</FormControl> */}
					</Row>
					<Row>
						{/* <TextField
							{...handleFilds("birthdate")}
							id="date"
							type="date"
							variant="outlined"
							className={classes.inputForm}
							InputLabelProps={{
								shrink: true,
							}}
						/> */}
						<TextRow {...handleFilds("color")} />
						<TextRow {...handleFilds("nationality")} />
					</Row>
					<Row>
						{/* <FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Renda</InputLabel>
							<Select
								native
								onChange={(e) => {
									if (e.currentTarget.value) {
										setIncome(
											String(e.currentTarget.value),
										);
									}
								}}
								label="Renda"
							>
								<option aria-label="None" value="" />
								<option value={"1000-2000"}>1000-2000</option>
								<option value={"2000-4000"}>2000-4000</option>
								<option value={"4000-8000"}>4000-8000</option>
							</Select>
						</FormControl> */}
						<TextRow {...handleFilds("profession")} />
						<TextRow {...handleFilds("primaryPhone")} />
					</Row>
					<Row>
						<TextRow
							{...handleFilds("secondPhone")}
						/>
						<TextRow {...handleFilds("email")} type="email" />
						<TextRow {...handleFilds("scholarity")} />
					</Row>
					<Row>
						{/* <FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Como conheceu</InputLabel>
							<Select
								native
								onChange={(e) => {
									if (e.currentTarget.value) {
										setIncome(
											String(e.currentTarget.value),
										);
									}
								}}
								label="Como conheceu"
							>
								<option aria-label="None" value="" />
								<option value={"facebook"}>Facebook</option>
								<option value={"instagram"}>Instagram</option>
								<option value={"outros"}>Outros</option>
							</Select>
						</FormControl> */}
						{/* <TextField
							{...handleFilds("")}
							className={classes.adressInput}
							variant="outlined"
						/> */}
						{/* <FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Plano de Saúde</InputLabel>
							<Select
								native
								onChange={(e) => {
									if (e.currentTarget.value) {
										setHealthPlan(
											String(e.currentTarget.value),
										);
									}
								}}
								label="Plano de Saúde"
							>
								<option aria-label="None" value="" />
								<option value={"plano1"}>Plano01</option>
								<option value={"plano2"}>Plano02</option>
								<option value={"plano3"}>Plano03</option>
							</Select>
						</FormControl> */}
					</Row>
					<Row>
						<Button
							className={classes.buttonFile}
							variant="contained"
							color="primary"
						>
							Anexar exame
						</Button>
						<Button
							className={classes.buttonFile}
							variant="contained"
							color="primary"
						>
							Anexar fotos
						</Button>
						<Button
							className={classes.buttonFile}
							variant="contained"
							color="primary"
						>
							Anexar Documentos
						</Button>
					</Row>
					<Row>
						<TextRow
							{...handleFilds("observation")}
							rows={6}
						/>
						<TextRow {...handleFilds("companions")} />
						<TextRow {...handleFilds("useMedicines")} />
					</Row>
					<Button
						className={classes.buttonSave}
						onClick={() => {
							createPatient(() =>
								route.push("/dashboard/patient"),
							);
						}}
						variant="contained"
					>
						Criar
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default CreatePatient;
