import React from "react";
import api from "../services/Api/API";
import { ISnackBar } from "./useSnackBar";
import strings from "../resources/strings";

function useCreateConsult(props: ISnackBar) {
	const ConsultationsStrings = strings.pages.consultations;
	const [name, setName] = React.useState("");
	const [consultType, setConsultType] = React.useState("");
	const [timeStart, setTimeStart] = React.useState<Date>(new Date());
	const [observation, setObservation] = React.useState("");
	const [patientId, setPatientId] = React.useState("");

	const createConsult = async (onSuccess: () => void) => {
        console.log(consultType);
		const data = {
			name,
			consult_type: consultType,
			time_start: timeStart,
			observation,
			patient_id: patientId,
		};
		try {
			const result = await api.post("consults/create", data);
			console.log(result.data);
			props.showSnackBar(ConsultationsStrings.success, "success");
            onSuccess();
		} catch (e) {
			console.log(e.message);
		}
	};

	return {
		createConsult,
		setName,
		setConsultType,
		setTimeStart,
		setObservation,
		setPatientId,
	};
}

export default useCreateConsult;
