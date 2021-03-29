import React from "react";
import { useHistory } from "react-router-dom";
import {
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
import SelectInputs from "components/SelectInputs";

const CreatePatient: React.FC = () => {
	const { snackBar } = useGlobalContext();
	const classes = useStyles();
	const route = useHistory();
	const {
		createPatient,
		handleFilds,
		handleSelectFilds,
		setBirthDay,
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
						<SelectInputs
							{...handleSelectFilds("gender")}
							selectAbleItems={[{label: "Masculino", value: "masculino"},{label: "Feminino", value: "feminino"}]}
							label="Genêro"
							variant="outlined"
							classStyleForm={classes.inputForm}
						/>
					</Row>
					<Row>
						<TextField
							className={classes.inputForm}
							id="datetime-local"
							label="Horário"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
							onChange={(e) => {
								setBirthDay(new Date(e.currentTarget.value));
							}}
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
						<TextRow {...handleFilds("color")} />
						<TextRow {...handleFilds("nationality")} />
					</Row>
					<Row>
						<SelectInputs
							{...handleSelectFilds("income")}
							selectAbleItems={[{label: "1000-2000", value: "1000-2000"},{label: "2000-4000", value: "2000-4000"},{label: "4000-8000", value: "4000-8000"}]}
							label="Renda"
							variant="outlined"
							classStyleForm={classes.inputForm}
						/>
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
						<SelectInputs
							{...handleSelectFilds("knowUs")}
							selectAbleItems={[{label: "facebook", value: "facebook"},{label: "instagram", value: "instagram"},{label: "outros", value: "outros"}]}
							label="Como conheceu"
							variant="outlined"
							classStyleForm={classes.inputForm}
						/>
						{/* <TextField
							{...handleFilds("")}
							className={classes.adressInput}
							variant="outlined"
						/>  */}
						<SelectInputs
							{...handleSelectFilds("healthPlan")}
							selectAbleItems={[{label: "Plano 1", value: "plano1"},{label: "Plano 2", value: "plano2"},{label: "Plano 3", value: "plano3"}]}
							label="Plano"
							variant="outlined"
							classStyleForm={classes.inputForm}
						/>
					</Row>
					<Row>
						<TextRow
							{...handleFilds("observation")}
							rows={6}
						/>
						<TextRow {...handleFilds("companions")} />
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
