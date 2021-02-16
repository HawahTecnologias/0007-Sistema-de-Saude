import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		pageContent: {
			marginTop: "20px",
		},

		titlePage: {
			marginTop: "20px",
			marginBottom: "50px",
		},
		inputForm: {
			width: "100%",
			maxWidth: "300px",
			marginRight: "25px",
			marginBottom: "20px",
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
		buttonSave: {
            alignSelf: "flex-end",
			color: grey[50],
			backgroundColor: green[600],
			"&:hover": {
				backgroundColor:green[400],
			}
		},
	}),
);
