import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		navBarUser: {
			display: "flex",
			justifyContent:"center",
			alignItems:"center",
		},

	}),
);
