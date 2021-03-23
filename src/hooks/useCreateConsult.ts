import React from "react";
import * as api from "../services/Api";
import { ISnackBar } from "./useSnackBar";
import strings from "../resources/strings";

function useCreateConsult(props: ISnackBar) {
	const ConsultationsStrings = strings.pages.consultations;
	const [name, setName] = React.useState("");
	const [consultType, setConsultType] = React.useState("");
	const [timeStart, setTimeStart] = React.useState<Date>(new Date());
	const [patientId, setPatientId] = React.useState("");

	const createConsult = async (onSuccess: () => void) => {
        console.log(consultType);
		const data: api.ICreateConsults = {
			name,
			consult_type: consultType,
			time_start: timeStart,
			patient_id: patientId,
			created_at: new Date(),
		};
		try {
			const result = await api.createConsult(data);
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
		setPatientId,
	};
}

export default useCreateConsult;
