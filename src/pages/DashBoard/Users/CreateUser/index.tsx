import React from "react";
import { useHistory } from "react-router-dom";
import {
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
import useCreateUser from "./useCreateUser";

const CreateUser: React.FC = () => {
	const { snackBar } = useGlobalContext();
	const classes = useStyles();
	const route = useHistory();
	const {
		createUser,
		handleFilds,
	} = useCreateUser(snackBar);
	return (
		<Container className={classes.pageContent}>
			<Card>
				<Typography
					className={classes.titlePage}
					variant="h4"
					gutterBottom
				>
					Cadastro de Usuário EM PRODUÇÃO
				</Typography>
				<Form>
					<Row>
						<TextRow {...handleFilds("name")} />
                        <TextRow {...handleFilds("password")} />
					</Row>
					<Row>
						<TextRow {...handleFilds("profession")} />
						<TextRow {...handleFilds("certificate")} />
					</Row>
					<Row>
						<TextRow
							{...handleFilds("speciality")}
						/>
						<TextRow {...handleFilds("email")} type="email" />
					</Row>
					
					<Button
						className={classes.buttonSave}
						onClick={() => {
							createUser(() =>
								route.push("/login"),
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

export default CreateUser;
