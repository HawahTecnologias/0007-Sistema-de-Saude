import { useState } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import strings from "resources/strings";
import useForm from "hooks/useForm";

import { useGlobalContext } from "contexts/GlobalContext";

function useCreateUser(props: ISnackBar) {
	const UserStrings = strings.pages.patient;
	const { authentication } = useGlobalContext();
	const { formValues, onChange, handleFilds } = useForm({
		name: "",
		password: "",
		email: "",
		cpf: "",
		certificate: "",
		permission: "",
		profession: "",
		speciality: "",
	});

	const createUser = async (onSuccess: () => void) => {

		console.log("salve");
		try {
			console.log("salve");
			await api.createUser({ ...formValues, permission: "admin" });
			props.showSnackBar(UserStrings.success, "success");
			onSuccess();
		} catch (e) {
			console.log(e.message);
			props.showSnackBar(e.message, "error");
		}
	};

	return {
		createUser,
		onChange,
		handleFilds,
		formValues,
	};
}

export default useCreateUser;
