import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        twoCardBox: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
        },
        tableStyle: {
            width: "70%",
        },
	}),
);
