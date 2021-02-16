import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { grey } from "@material-ui/core/colors"
export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        mainContainer: {
            maxWidth: 1000,
            margin: "0 auto",
        },
        createButton: {
            margin: 5,
            backgroundColor: grey[300],
        },
    })
);
