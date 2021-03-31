import useForm from "hooks/useForm";

function useLogin() {
    const { handleFilds, formValues } = useForm({
	email: "",
        password: "",
	});

	return {
        formValues,
        handleFilds,
	};
}

export default useLogin;
