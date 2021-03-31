import React from "react";

import {
	Avatar as MAvatar,
	Box,
	Popover,
	IconButton,
	List,
	ListItem,
	ListItemText } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { useStyles } from "./style";

interface IProps {
}

const Avatar: React.FC<IProps> = (props) => {
	const classes = useStyles();
	const { push } = useHistory();
	const [open] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
	const openAvatar = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<Box className={classes.navBarUser}>
			<IconButton onClick={handleClick}>
			<MAvatar>A</MAvatar>
			</IconButton>
			<Popover
				id={id}
				open={openAvatar}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<List>
					<ListItem
						button={true}
					>
						<ListItemText primary="Sair" onClick={() => push("/login")} />
					</ListItem>
				</List>
			</Popover>
		</Box>
	);
};

export default Avatar;
