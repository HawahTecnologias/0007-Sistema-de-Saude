import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		pageContent: {
			height: "100vh",
			marginTop: "20px",
			marginBottom: "200px",
		},
		titlePage: {
			marginTop: "20px",
			marginBottom: "50px",
		},
		formContent: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			alignItems: "center",
			margin: "20px 50px 0 50px",
		},
		inputForm: {
			width: "100%",
			maxWidth: "300px",
			marginRight: "25px",
			marginBottom: "20px",
		},
		adressInput: {
			width: "100%",
			maxWidth: "625px",
			marginRight: "50px",
			marginBottom: "20px",
		},
		buttonFile: {
			marginRight: "10px",
			marginBottom: "20px",
		},
		buttonSave: {
			color: grey[50],
			margin: "10px 50px",
			alignSelf: "flex-end",
			backgroundColor: green[600],
			"&:hover": {
				backgroundColor:green[400],
			}
		},
		patientInfo: {
            display: "flex",
        },
        patientInfoItems: {
            textAlign: "center",
            width: "100%",
			maxWidth: "300px",
			marginRight: "25px",
			marginBottom: "20px",
            backgroundColor: grey[100],
        },
	}),
);
