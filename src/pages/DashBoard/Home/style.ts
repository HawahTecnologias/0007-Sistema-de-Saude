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
            width: "70%",
        },
        messageBox: {
            width: "28%",
        },
        messageContent: {
            padding: 8,
        },
		row: {
            width: "100%",
			marginBottom: "10px",
		},
        MiniCardsContainer: {
            marginBottom: 10,
        },
        MiniCardIcon: {
            width: 40, 
            height: 40,
        }
	}),
);
