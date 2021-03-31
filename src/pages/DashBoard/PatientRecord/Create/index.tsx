import React from "react";

import * as api from "services/Api";
import { useHistory } from "react-router-dom";

import {
	Box,
	TextField,
	Typography,
	Container,
	Button,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import { useGlobalContext } from "contexts";
import Form from "components/Form";
import Row from "components/Form/Row";
import TextRow from "components/Form/TextRow";
import Card from "components/Card";
import { useStyles } from "./style";
import useCreateRecord from "./useCreateRecord";

const Create: React.FC = () => {
	const { snackBar } = useGlobalContext();
	const classes = useStyles();
	const route = useHistory();

	const [
		selectedPatient,
		setSelectedPatient,
	] = React.useState<api.IPatient>();
	const useCreate = useCreateRecord(snackBar);

	return (
		<Container className={classes.pageContent}>
			<Card >
				<Typography
					className={classes.titlePage}
					variant="h4"
					gutterBottom
				>
					Cadastrar Prontuário
				</Typography>
				<Form formStyles={classes.formContent}>
					<Row>
						<TextRow {...useCreate.handleFilds("general")} label="Geral" />
						<TextRow {...useCreate.handleFilds("motricity")} label="Motricidade" />
						<TextRow {...useCreate.handleFilds("osteoarticular")} label="Osteoarticular" />
					</Row>
					<Row>
						
						<TextRow {...useCreate.handleFilds("reflections")} label="Reflexos" />
						<TextRow {...useCreate.handleFilds("skin")} label="Pele" />
						<TextRow {...useCreate.handleFilds("headAndNeck")} label="Cabeça e Pescoço" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("sysCardiovascular")} label="Sistema Cardiovascular" />
						<TextRow {...useCreate.handleFilds("sysRespiratory")} label="Sistema Respiratório" />
						<TextRow {...useCreate.handleFilds("sysAbdominal")} label="Sistema Abdonominal" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("sysUrinary")} label="Sistema Urinario" />
						<TextRow {...useCreate.handleFilds("sysNeurological")} label="Sistema Neurological" />
						<TextRow {...useCreate.handleFilds("extremities")} label="Extremidades" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("mentalState")} label="Estado mental" />
						<TextRow {...useCreate.handleFilds("fnCortical")} label="Cortica" />
						<TextRow {...useCreate.handleFilds("sensory")} label="Sensorial" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("cranialNerves")} label="Nervos Cranianos" />
						<TextRow {...useCreate.handleFilds("cerebellar")} label="Cerebelar" />
						<TextRow {...useCreate.handleFilds("march")} label="Marcha" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("others")} label="Outros" />
						<TextRow {...useCreate.handleFilds("qp")} label="qp" />
						<TextRow {...useCreate.handleFilds("hda")} label="hda" />
					</Row>
					<Row>
						<TextRow {...useCreate.handleFilds("hpp")} label="hpp" />
						<TextRow {...useCreate.handleFilds("hps")} label="hps" />
						<TextRow {...useCreate.handleFilds("hf")} label="hf" />
					</Row>
					<Row>
					<Autocomplete
                            className={classes.inputForm}
                            id="patientId"
                            options={useCreate.patients}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue: api.IPatient | null) => {
                                if (newValue) {
                                    setSelectedPatient(newValue);
                                    useCreate.onSelect("patientId", newValue.id);
                                }
                            }}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="patientId"
                                    label="Paciente"
                                    variant="outlined"

                                />
                            )}
                        />
					</Row>
					{selectedPatient && (
                        <>
                            <Row>
                                <Box className={classes.patientInfo}>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.gender}
                                    </Typography>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.birthdate}
                                    </Typography>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.healthPlan}
                                    </Typography>
                                </Box>
                            </Row>
                            <Row>
							<Box className={classes.patientInfo}>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.primaryPhone}
                                    </Typography>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.secondPhone}
                                    </Typography>
                                    <Typography
                                        className={classes.patientInfoItems}
                                    >
                                        {selectedPatient.email}
                                    </Typography>
                                </Box>
                            </Row>
                        </>
                    )}
				</Form>
				<Button
						className={classes.buttonSave}
						onClick={() => {
							useCreate.createPatientRecord(() =>
								route.push("/dashboard/patientRecord"),
							);
						}}
						variant="contained"
					>
						Criar
					</Button>
			</Card>
		</Container>
	);
};

export default Create;
