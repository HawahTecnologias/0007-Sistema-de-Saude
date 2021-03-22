import React from "react";

import useSnackBar, { ISnackBar } from "../../hooks/useSnackBar";

interface IContext {
	snackBar: ISnackBar;
}
const MyContext = React.createContext<IContext | null>(null);

export const GlobalContext: React.FC = (props) => {
	const snackBar: ISnackBar | null = useSnackBar();
	return (
	<MyContext.Provider
	value={{snackBar}}>
		{props.children}
	</MyContext.Provider>	
	);
};
export function useGlobalContext() {
	const context = React.useContext(MyContext);
	if (!context) throw new Error("Cannot Access Store outside it's context");
	return context;
};
