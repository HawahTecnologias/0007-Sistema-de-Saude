import { useEffect, useState } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import { useForm, useLoader } from "hooks";
import { useGlobalContext } from "contexts/GlobalContext";


function useCreateConsultation(props: ISnackBar) {
	const [patients, setPatients] = useState<api.IPatient[]>([]);
	const { authentication } = useGlobalContext();
	const { formValues, onChange, handleFilds, handleSelectFilds, onSelect } = useForm({
		professional: "",
		consultType: api.ConsultType.first,
		observation: "",
		patientId: "",
		time: "",
	});

	const loader = useLoader();
	const patientsloader = useLoader();

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

	useEffect(() => {
		getPatients();
	} , [])

	const createConsult = async (onSuccess: () => void) => {
		console.log("entrou");
		if (!authentication.currentUser) {
			return;
		}
		if (loader.loading) {
			return;
		}

		try {
			loader.start();
			await api.createConsult({...formValues, 
				createdBy: authentication.currentUser.id,
				modifiedBy: authentication.currentUser.id,
			});
			onSuccess();
		} catch (e) {
			props.showSnackBar(e.message, "error");
			console.log(e.message);
		} finally {
			loader.end();
		}
	};

	return {
		createConsult,
		onChange,
		handleFilds,
		handleSelectFilds,
		patients,
		formValues,
		onSelect,
	};
}

export default useCreateConsultation;
