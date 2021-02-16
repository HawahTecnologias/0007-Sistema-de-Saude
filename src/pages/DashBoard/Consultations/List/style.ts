import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            maxWidth: 1000,
            margin: "0 auto",
        },
    })
);
