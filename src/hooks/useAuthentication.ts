import { useState } from "react";
import * as api from "services/Api";

import useLoader from "./useLoader";

export interface IAuthentication {
	login: (authForm: api.ILoginUser, onSuccess: () => void, onFailed: (message: string) => void) => void;
	authLoading: boolean;
	currentUser: api.IUser | null;
};

function useAuthentication() {
	const loader = useLoader();
	const [currentUser, setCurrentUser] = useState<api.IUser | null>(null);

	const login = async (authForm: api.ILoginUser, onSuccess: () => void, onFailed: (message: string) => void) => {
		if (loader.loading) return;

		loader.start();

		console.log("valores", authForm);
		try {
			const user = await api.login({
				email: authForm.email.trim(),
				password: authForm.password.trim(),
			});

			setCurrentUser(user);
			onSuccess();
		}
		catch (e) {
			onFailed(e.message);
		} finally {
			loader.end();
		}
	};

let authLoading = loader.loading;

	return {
		login,
		authLoading,
		currentUser
	};
}

export default useAuthentication;
