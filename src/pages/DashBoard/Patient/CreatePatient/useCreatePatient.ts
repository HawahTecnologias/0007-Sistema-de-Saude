import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import strings from "resources/strings";
import useForm from "hooks/useForm";


function useCreatePatient(props: ISnackBar) {
	const PatientStrings = strings.pages.patient;
	const { formValues, onChange, handleFilds } = useForm({
		name: "",
		email: "",
		gender: "",
		age: "",
		color: "",
		scholarity: "",
		profession: "",
		nationality: "",
		income: "",
		primaryPhone: "",
		secondPhone: "",
		howKnow: "",
		healthPlan: "",
		which: "",
		useMedicines: "",
		companions: "",
		observation: "",
	});

	const createPatient = async (onSuccess: () => void) => {
		try {
			await api.createPatient(
				{...formValues, createdAt: new Date(),
					birthdate: new Date(),
					age: Number(formValues.age) });
			props.showSnackBar(PatientStrings.success, "success");
			onSuccess();
		} catch (e) {
			console.log(e.message);
			props.showSnackBar(e.message, "error");
		}
	};

	return {
		createPatient,
		onChange,
		handleFilds,
		formValues
	};
}

export default useCreatePatient;
