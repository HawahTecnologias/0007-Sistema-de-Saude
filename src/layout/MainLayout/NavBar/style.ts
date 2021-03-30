import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: grey[900],
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			backgroundColor: grey[900],
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		navBarMenu: {
			display: "flex",
			justifyContent:"center",
			alignItems:"center",
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: "none",
		},
		toolbarBox: {
			display: "flex",
			justifyContent: "space-between",
		},
		navBarUser: {
			display: "flex",
			justifyContent:"center",
			alignItems:"center",
		},
	}),
);
