import { useState } from "react";

import useForm from "hooks/useForm";

function useLogin() {
    const { handleFilds, formValues, handleChange } = useForm({
		email: "",
        password: "",
	});

	return {
        formValues,
        handleFilds,
        handleChange
	};
}

export default useLogin;
