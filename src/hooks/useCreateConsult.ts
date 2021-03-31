import React from "react";
import api from "../services/API";

function useCreateConsult() {
	const [name, setName] = React.useState("");
    const [consultType, setConsultType] = React.useState("");
    const [timeStart, setTimeStart] = React.useState<Date>(new Date());
    const [observation, setObservation] = React.useState("");
    const [patientId, setPatientId] = React.useState("");

	const createPatient = async() => {
		const data = {
			name,
            consult_type: consultType,
            time_start: timeStart,
            observation,
            patient_id: patientId,
		}
		try {
			const result = await api.post("consults/create", data);
			console.log(result.data);
		} catch (e) {
			console.log(e.message);
		}

	};

	return {
        createPatient,
        setName,
        setConsultType,
        setTimeStart,
        setObservation,
        setPatientId
	};
}

export default useCreateConsult;
