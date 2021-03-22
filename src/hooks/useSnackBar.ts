import React from "react";

export interface ISnackBar {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	handleClose: (event?: React.SyntheticEvent, reason?: string) => void;
	showSnackBar: (message: string, typeMessage?: Color) => void;
	typeMessage: Color,
};
type Color = "info" | "error" | "success" | "warning";

function useSnackBar() {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState("");
    const [typeMessage, setTypeMessage] = React.useState<Color>("info");

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setIsOpen(false);
	  };

	const showSnackBar = (message: string, typeMessage?: Color) => {
		setTypeMessage(typeMessage ? typeMessage : "info");
		setMessage(message);
		setIsOpen(true);
	};

	return {
        isOpen,
        setIsOpen,
        message,
        setMessage,
        handleClose,
		showSnackBar,
		typeMessage,
	};
}

export default useSnackBar;
