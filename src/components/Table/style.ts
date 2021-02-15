import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            maxWidth: 1000,
            margin: "0 auto",
        },
        tableContainer: {
            maxHeight:500,
        },
        tableTop: {
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 3,
            pandingBottom: 3,
        },
		row: {
            width: "100%",
			marginBottom: "10px",
		},
        tableFooter: {
            padding: 5,
            display: "flex",
            justifyContent: "space-between",
        },
        pagination: {
            width: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-end",
        },
	}),
);
