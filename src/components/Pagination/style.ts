import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
	createStyles({
		paginationControl: {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},

		paginationNone: {
			display: "none",
		},
	}),
);

export default useStyles;
