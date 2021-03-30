import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useGlobalContext } from "../../contexts";

const SnackBar: React.FC = () => {
	const { snackBar } = useGlobalContext();

	return (
		<Snackbar
			open={snackBar.isOpen}
			onClose={snackBar.handleClose}
			autoHideDuration={4000}
		>
			<Alert
			severity={snackBar.typeMessage}
				color={snackBar.typeMessage} 
				variant={"filled"}>{snackBar.message}</Alert>
		</Snackbar>
	);
};

export default SnackBar;
