import React from "react";

import useSnackBar, { ISnackBar } from "hooks/useSnackBar";

import useAuthentication, { IAuthentication } from "hooks/useAuthentication";

interface IContext {
	snackBar: ISnackBar;
	authentication: IAuthentication;
}
const MyContext = React.createContext<IContext | null>(null);

export const GlobalContext: React.FC = (props) => {
	const snackBar: ISnackBar | null = useSnackBar();
	const authentication: IAuthentication | null = useAuthentication();

	return (
	<MyContext.Provider
	value={{snackBar, authentication}}>
		{props.children}
	</MyContext.Provider>	
	);
};
export function useGlobalContext() {
	const context = React.useContext(MyContext);
	if (!context) throw new Error("Cannot Access Store outside it's context");
	return context;
};
