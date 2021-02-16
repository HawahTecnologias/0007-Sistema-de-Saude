import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            marginRight: "10px",
            width: "100%",
            maxWidth: 300,
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
        },
        Icon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
	}),
);
