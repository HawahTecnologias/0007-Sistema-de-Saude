import { useState, useEffect } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import strings from "resources/strings";
import { useLoader, useForm } from "hooks";

import { useGlobalContext } from "contexts/GlobalContext";


function useCreateRecord(props: ISnackBar) {
	const RecordStrings = strings.pages.patientRecord;
	const { authentication } = useGlobalContext();
	const [patients, setPatients] = useState<api.IPatient[]>([]);

	const { formValues, onSelect, handleFilds } = useForm({
		patientId: "",
		general: "",
		skin: "",
		headAndNeck: "",
		sysRespiratory: "",
		sysCardiovascular: "",
		sysAbdominal: "",
		sysUrinary: "",
		sysNeurological: "",
		extremities: "",
		osteoarticular: "",
		mentalState: "",
		fnCortical: "",
		cranialNerves: "",
		motricity: "",
		sensory: "",
		reflections: "",
		cerebellar: "",
		march: "",
		others: "",
		qp: "",
		hda: "",
		hpp: "",
		hps: "",
		hf: "",
	});
	
	const loader = useLoader();
	const patientsloader = useLoader();

	useEffect(() => {
		getPatients();
	} , [])

	const getPatients = async (newPage?: number) => {
		if (patientsloader.loading) {
			return;
		}
		try {
			patientsloader.start();
			const results = await api.getPatients();
			setPatients(results.data);
		} catch (e) {
			console.log(e.message);
		} finally {
			patientsloader.end();
		}
	}

	const createPatientRecord = async (onSuccess: () => void) => {
		if(!authentication.currentUser || loader.loading){
			return;
		}
		try {
			loader.start();

			await api.createPatientRecord(
				{ 	...formValues,
					createdBy: authentication.currentUser.id,
					modifiedBy: authentication.currentUser.id,
				});
			props.showSnackBar(RecordStrings.success, "success");
			onSuccess();
		} catch (e) {
			loader.end();
			console.log(e.message);
			props.showSnackBar(e.message, "error");
		}
	};

	const loading = loader.loading;
	return {
		createPatientRecord,
		onSelect,
		handleFilds,
		patients,
		formValues,
		loading
	};
}

export default useCreateRecord;
