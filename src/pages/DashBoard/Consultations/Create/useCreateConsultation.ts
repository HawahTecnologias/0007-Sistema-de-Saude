import { useEffect, useState } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import { useForm, useLoader } from "hooks";


function useCreateConsultation(props: ISnackBar) {
	const [patients, setPatients] = useState<api.IPatient[]>([]);
<<<<<<< HEAD
=======
	const { authentication } = useGlobalContext();
>>>>>>> parent of c9fd591... consulta is working
	const [timeStart, setTimeStart] = useState<Date>(new Date);
	const { formValues, onChange, handleFilds, handleSelectFilds, onSelect } = useForm({
		name: "",
		consultType: "",
		patientId: "",
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
<<<<<<< HEAD
=======
		if (!authentication.currentUser) {
			return;
		}
>>>>>>> parent of c9fd591... consulta is working
		if (loader.loading) {
			return;
		}

		try {
			loader.start();
<<<<<<< HEAD
			await api.createConsult({...formValues, timeStart: timeStart});
=======
			await api.createConsult({...formValues, 
				createdBy: authentication.currentUser.id,
				modifiedBy: authentication.currentUser.id,
				time: timeStart,	
			});
>>>>>>> parent of c9fd591... consulta is working
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
		timeStart,
		setTimeStart,
		onSelect,
	};
}

export default useCreateConsultation;
