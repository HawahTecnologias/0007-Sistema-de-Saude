import React from "react";
import { useHistory } from "react-router-dom";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "../../../../components/Card";
import Form from "../../../../components/Form";
import Row from "../../../../components/Form/Row";
import TextRow from "../../../../components/Form/TextRow";
import { useStyles } from "./style";
import api from "../../../../services/API";
import useCreateConsult from "../../../../hooks/useCreateConsult";

interface IItems {
	age: number;
	birthdate: string;
	color: string;
	companions: string;
	created_at: string;
	email: string;
	gender: string;
	health_plan: string;
	how_know: string;
	id: string;
	income: string;
	name: string;
	nationality: string;
	observation: string;
	phone_number_01: string;
	phone_number_02: string;
	profession: string;
	scholarity: string;
	use_medicines: string;
	which: string;
}

const Create: React.FC = () => {
	const [items, setItems] = React.useState<IItems[]>([]);
	const [patientData, setPatientData] = React.useState<IItems>();

	const route = useHistory();

	const {
		setName,
		setConsultType,
		setObservation,
		setPatientId,
		setTimeStart,
		createConsult,
	} = useCreateConsult();

	React.useEffect(() => {
		const request = async () => {
			try {
				const result = await api.get("patients");
				console.log(result.data);
				setItems(result.data);
			} catch (e) {
				console.log(e.message);
			}
		};
		request();
	}, []);
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
						<Autocomplete
							className={classes.inputForm}
							id="name"
							options={items}
							getOptionLabel={(option) => option.name}
							onChange={(event: any, newValue: IItems | null) => {
								if (newValue) {
									setPatientId(newValue.id);
									setName(newValue.name);
									setPatientData(newValue);
								}
							}}
							style={{ width: 300 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Nome"
									variant="outlined"
								/>
							)}
						/>
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Tipo de consulta</InputLabel>
							<Select
								native
								onChange={(e) => {
									if (e.currentTarget.value) {
										setConsultType(
											String(e.currentTarget.value),
										);
									}
								}}
								label="Tipo de consulta"
							>
								<option aria-label="None" value="" />
								<option value={"consulta1"}>Consulta01</option>
								<option value={"consulta2"}>Consulta02</option>
								<option value={"consulta3"}>Consulta03</option>
							</Select>
						</FormControl>

						<TextField
							className={classes.inputForm}
							id="datetime-local"
							label="Horário"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
							onChange={(e) => {
								setTimeStart(new Date(e.currentTarget.value));
							}}
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
					</Row>
					{patientData && (
						<>
							<Row>
								<Box className={classes.patientInfo}>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.gender}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.birthdate}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.health_plan}
									</Typography>
								</Box>
							</Row>
							<Row>
								<Box className={classes.patientInfo}>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.phone_number_01}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.phone_number_02}
									</Typography>
									<Typography
										className={classes.patientInfoItems}
									>
										{patientData.email}
									</Typography>
								</Box>
							</Row>
						</>
					)}
					<Row>
						<TextRow
							label="Observações"
							setChange={setObservation}
							rows={6}
						/>
					</Row>
					<Button
						className={classes.buttonSave}
						onClick={() => {
							createConsult(() =>
								route.push("/dashboard/consultations"),
							);
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
