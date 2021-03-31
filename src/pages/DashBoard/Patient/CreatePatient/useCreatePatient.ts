import { useState } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import strings from "resources/strings";
import useForm from "hooks/useForm";

import { useGlobalContext } from "contexts/GlobalContext";


function useCreatePatient(props: ISnackBar) {
	const PatientStrings = strings.pages.patient;
	const { authentication } = useGlobalContext();
	const [birthDay, setBirthDay] = useState<Date>(new Date);
	const { formValues, onChange, handleFilds, handleSelectFilds } = useForm({
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
		knowUs: "",
		healthPlan: "",
		companions: "",
		observation: "",
		patientRecordId: [],
	});

	const createPatient = async (onSuccess: () => void) => {
		if(!authentication.currentUser){
			return;
		}

		try {
			await api.createPatient(
				{...formValues,
					birthdate: birthDay,
					age: Number(formValues.age),
					createdBy: authentication.currentUser.id,
					modifiedBy: authentication.currentUser.id

				});
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
		handleSelectFilds,
		setBirthDay,
		formValues
	};
}

export default useCreatePatient;
