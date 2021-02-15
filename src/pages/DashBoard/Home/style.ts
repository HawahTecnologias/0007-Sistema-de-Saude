import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            maxWidth: 1000,
            margin: "0 auto",
        },
        twoCardBox: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
        },
        tableStyle: {
            width: "55%",
        },
        messageBox: {
            width: "40%",
        },
		row: {
            width: "100%",
			marginBottom: "10px",
		},
	}),
);
