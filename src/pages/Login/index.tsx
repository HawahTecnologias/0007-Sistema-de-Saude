import React from "react";
import {
	Avatar,
	Button,
	CssBaseline,
	Typography,
	Container,
	CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useHistory } from "react-router-dom";

import TextField from "components/TextField";
import { useGlobalContext } from "contexts/GlobalContext";
import { useStyles } from "./style";
import useLogin from "./useLogin";

const Login: React.FC = () => {
	const classes = useStyles();
	const { authentication, snackBar } = useGlobalContext();
	const { formValues, handleFilds } = useLogin();
	const { push } = useHistory();

	const onLogin = () => {
		authentication.login(formValues,
			() => {snackBar.showSnackBar("Bem Vindo!", "success");
				push("/")},
			(message: string) => snackBar.showSnackBar(message, "error")
		);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar} color="disabled">
					<LockOutlinedIcon color="disabled" />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						{...handleFilds("email")}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						{...handleFilds("password")}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={onLogin}
					>
						{authentication.authLoading ? <CircularProgress /> : "Entrar"}
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default Login;
