import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		row: {
			width: "100%",
			marginBottom: "10px",
		},
	}),
);
