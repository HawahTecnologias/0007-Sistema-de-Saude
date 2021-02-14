import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		pageContent: {
            marginTop: "20px",
        },
        titlePage:{
            marginTop: "20px",
            marginBottom: "50px",
        },
        formContent: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            marginTop: "20px",
        },
		inputForm: {
            width: "100%",
            maxWidth: "300px",
			marginRight: "25px",
            marginBottom: "20px",
		},
		row: {
            width: "100%",
			marginBottom: "10px",
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
	}),
);
