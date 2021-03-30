import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formContent: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			alignItems: "center",
			marginTop: "20px",
		},
	}),
);
