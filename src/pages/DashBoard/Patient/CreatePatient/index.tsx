import {
	FormControl,
	InputLabel,
	Select,
	TextField,
	Typography,
	Container,
	Button,
} from "@material-ui/core";
import React from "react";
import Form from "../../../../components/Form";
import Row from "../../../../components/Form/Row";
import TextRow from "../../../../components/Form/TextRow";
import Card from "../../../../components/Card";
import { useStyles } from "./style";
import useCreatePatient from "../../../../hooks/useCreatePatient";

const CreatePatient: React.FC = () => {
	const {
		setName,
		setColor,
		setNationality,
		setProfession,
		setPhone,
		setSecondaryPhone,
		setEmail,
		setScholarity,
		setAdress,
		setComments,
		setCompanion,
		setMedicine,
		createPatient,
	} = useCreatePatient();
	const classes = useStyles();
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
						<TextRow label="Nome" setChange={setName} />
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Gênero</InputLabel>
							<Select
								native
								onChange={(e) => {
									console.log(e.currentTarget.value);
								}}
								label="Gênero"
							>
								<option aria-label="None" value="" />
								<option value={10}>Ten</option>
								<option value={20}>Twenty</option>
								<option value={30}>Thirty</option>
							</Select>
						</FormControl>
						<TextRow label="Cor" setChange={setColor} />
					</Row>
					<Row>
						<TextField
							id="date"
							label="Data de Nascimento"
							type="date"
							variant="outlined"
							onChange={(e) => {
								console.log(e.currentTarget.value);
							}}
							className={classes.inputForm}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Plano de Saúde</InputLabel>
							<Select
								native
								onChange={(e) => {
									console.log(e.currentTarget.value);
								}}
								label="Plano de Saúde"
							>
								<option aria-label="None" value="" />
								<option value={10}>Ten</option>
								<option value={20}>Twenty</option>
								<option value={30}>Thirty</option>
							</Select>
						</FormControl>
						<TextRow
							label="Naturalidade"
							setChange={setNationality}
						/>
					</Row>
					<Row>
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Renda</InputLabel>
							<Select
								native
								onChange={(e) => {
									console.log(e.currentTarget.value);
								}}
								label="Renda"
							>
								<option aria-label="None" value="" />
								<option value={10}>Ten</option>
								<option value={20}>Twenty</option>
								<option value={30}>Thirty</option>
							</Select>
						</FormControl>
						<TextRow label="Profissão" setChange={setProfession} />
						<TextRow label="Telefone 01" setChange={setPhone} />
					</Row>
					<Row>
						<TextRow
							label="Telefone 02"
							setChange={setSecondaryPhone}
						/>
						<TextRow
							label="E-mail"
							setChange={setEmail}
							type="email"
						/>
						<TextRow
							label="Escolaridade"
							setChange={setScholarity}
						/>
					</Row>
					<Row>
						<FormControl
							variant="outlined"
							className={classes.inputForm}
						>
							<InputLabel>Como conheceu</InputLabel>
							<Select
								native
								onChange={(e) => {
									console.log(e.currentTarget.value);
								}}
								label="Como conheceu"
							>
								<option aria-label="None" value="" />
								<option value={10}>Ten</option>
								<option value={20}>Twenty</option>
								<option value={30}>Thirty</option>
							</Select>
						</FormControl>
						<TextField
							className={classes.adressInput}
							label="Endereço"
							onChange={(e) => {
								setAdress(e.currentTarget.value);
							}}
							variant="outlined"
						/>
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
							label="Observações"
							setChange={setComments}
							rows={6}
						/>
						<TextRow
							label="Acompanhante"
							setChange={setCompanion}
						/>
						<TextRow
							label="Remédios em uso"
							setChange={setMedicine}
						/>
					</Row>
					<Button
						className={classes.buttonSave}
						onClick={createPatient}
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
