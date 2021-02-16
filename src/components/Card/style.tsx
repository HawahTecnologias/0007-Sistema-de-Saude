import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		pageContent: {
			marginTop: "20px",
		},
        cardContent: {
            padding: "20px 40px 40px 40px",
        }
	}),
);
