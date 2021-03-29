import { useState } from "react";
import * as api from "services/Api";
import { setToken } from "services/Api";

import useLoader from "./useLoader";

export interface IAuthentication {
	login: (authForm: api.ILoginUser, onSuccess: () => void, onFailed: (message: string) => void) => void;
	authLoading: boolean;
	currentUser: api.IUser | null;
	checkCurrentUser: () => void;
};

function useAuthentication() {
	const loader = useLoader();
	const [currentUser, setCurrentUser] = useState<api.IUser | null>(null);
	const currentuserToken = "CLINIC_TO_K";

	const checkCurrentUser = async () => {
		const currentUser = localStorage.getItem(currentuserToken);
		if (!currentUser) {
			return;
		}
		const user: api.IUser = JSON.parse(currentUser);
		//await login({email: user.email, password: user.password},);
	};

	const login = async (authForm: api.ILoginUser, onSuccess?: () => void, onFailed?: (message: string) => void) => {
		if (loader.loading) return;

		loader.start();
		try {
			const user = await api.login({
				email: authForm.email.trim(),
				password: authForm.password.trim(),
			});

			console.log("valor retorno do user", user.data);
			setCurrentUser(user.data);
			setToken(user.data.token);
			localStorage.setItem(currentuserToken, JSON.stringify(user.data));
			onSuccess && onSuccess();
		}
		catch (e) {
			localStorage.removeItem(currentuserToken);
			console.error(e.message);
			console.log("valor removido",  localStorage.getItem(currentuserToken)  );
			onFailed && onFailed(e.message);
		} finally {
			loader.end();
		}
	};

let authLoading = loader.loading;

	return {
		login,
		authLoading,
		currentUser,
		checkCurrentUser
	};
}

export default useAuthentication;
