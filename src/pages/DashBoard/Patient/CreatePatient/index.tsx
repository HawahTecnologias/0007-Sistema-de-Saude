import {
	Box,
	FormControl,
	InputLabel,
	Select,
	TextField,
	Typography,
	Container,
	Button,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

const CreatePatient: React.FC = () => {
	const classes = useStyles();
	return (
		<Container className={classes.pageContent}>
			<Typography className={classes.titlePage} variant="h4" gutterBottom>
				Cadastro do Paciente
			</Typography>
			<Box className={classes.formContent}>
				<Box className={classes.row}>
					<TextField
						className={classes.inputForm}
						label="Nome"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
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
					<TextField
						className={classes.inputForm}
						label="Cor"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
				<Box className={classes.row}>
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
					<TextField
						className={classes.inputForm}
						label="Naturalidade"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
				<Box className={classes.row}>
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
					<TextField
						className={classes.inputForm}
						label="Profissão"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
					<TextField
						className={classes.inputForm}
						label="Telefone 01"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
				<Box className={classes.row}>
					<TextField
						className={classes.inputForm}
						label="Telefone 02"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
					<TextField
						className={classes.inputForm}
						label="E-mail"
						type="email"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
					<TextField
						className={classes.inputForm}
						label="Escolaridade"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
				<Box className={classes.row}>
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
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
				<Box className={classes.row}>
					<Button className={classes.buttonFile} variant="contained" color="primary">
						Anexar exame
					</Button>
                    <Button className={classes.buttonFile} variant="contained" color="primary" >
						Anexar fotos
					</Button>
                    <Button className={classes.buttonFile} variant="contained" color="primary">
						Anexar Documentos
					</Button>
				</Box>
				<Box className={classes.row}>
					<TextField
						className={classes.inputForm}
						label="Observações"
						multiline
						rows={6}
						variant="outlined"
					/>
					<TextField
						className={classes.inputForm}
						label="Acompanhante"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
					<TextField
						className={classes.inputForm}
						label="Remédios em uso"
						onChange={(e) => {
							console.log(e.currentTarget.value);
						}}
						variant="outlined"
					/>
				</Box>
			</Box>
		</Container>
	);
};

export default CreatePatient;
