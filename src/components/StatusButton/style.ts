import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { green, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		statusButton: {
			width: 90,
			fontSize: 11,
		},
		confirmBtn: {
			width: 90,
			fontSize: 11,
			borderColor: green[500],

			color: green[500],
		},
		waitingBtn: {
			width: 90,
			fontSize: 11,
			borderColor: grey[500],

			color: grey[500],
		},
	}),
);
