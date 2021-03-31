import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		inputForm: {
			width: "100%",
			marginRight: "25px",
			marginBottom: "20px",
		},
	}),
);
