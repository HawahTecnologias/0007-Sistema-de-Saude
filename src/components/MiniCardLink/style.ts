import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            width: 300,
            padding: 15,
            display: "flex",
            flexDirection: "row",
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
