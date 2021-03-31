import React from "react";

import clsx from "clsx";

import { AppBar, Box } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Notifications } from '@material-ui/icons';
import Avatar from "../Avatar"

import { useStyles } from "./style";

interface IProps {
	title: string;
	handleDrawerOpen: () => void;
	open: boolean;
}

const NavBar: React.FC<IProps> = (props) => {
	const { title, handleDrawerOpen, open } = props;
	const classes = useStyles();

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar className={classes.toolbarBox}>
				<Box className={classes.navBarMenu}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{title}
					</Typography>
				</Box>
				<Box className={classes.navBarUser}>
					<Notifications style={{ marginRight: 20 }}/>
					<Avatar/>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
