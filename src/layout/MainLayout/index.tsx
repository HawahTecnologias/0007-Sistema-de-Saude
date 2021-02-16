import React from "react";

import { useHistory } from "react-router-dom";
import strings from "../../resources/strings";
import { baseRoutes } from "../../resources/baseRoutes";

import clsx from "clsx";

import {
	useTheme,
} from "@material-ui/core/styles";

import { Box, Drawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import NavBar from "./NavBar";

import { useStyles } from "./style";

const MainLayout: React.FC = (props) => {
	const history = useHistory();
	const MainStrings = strings.mainLayout;
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />

			<NavBar
				title={MainStrings.LogoName}
				handleDrawerOpen={handleDrawerOpen}
				open={open}
			/>

			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{baseRoutes.map(
						(routes, index) => (
							<ListItem button={true} key={`${routes.path}-${index}`}>
								<ListItemIcon onClick={() => history.push(routes.path)}>
									<routes.icon />
								</ListItemIcon>
								<ListItemText primary={routes.title} />
							</ListItem>
						),
					)}
				</List>
				<Divider />
			</Drawer>
			<Box className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</Box>
		</div>
	);
};

export default MainLayout;
