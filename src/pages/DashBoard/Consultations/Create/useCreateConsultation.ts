import { useEffect, useState } from "react";
import * as api from "services/Api";
import { ISnackBar } from "hooks/useSnackBar";
import { useForm, useLoader } from "hooks";


function useCreateConsultation(props: ISnackBar) {
	const [patients, setPatients] = useState<api.IPatient[]>([]);
<<<<<<< HEAD
<<<<<<< HEAD
=======
	const { authentication } = useGlobalContext();
>>>>>>> parent of c9fd591... consulta is working
=======
>>>>>>> parent of 8f548b9... Prontuario
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
<<<<<<< HEAD
=======
		if (!authentication.currentUser) {
			return;
		}
>>>>>>> parent of c9fd591... consulta is working
=======
>>>>>>> parent of 8f548b9... Prontuario
		if (loader.loading) {
			return;
		}

		try {
			loader.start();
<<<<<<< HEAD
<<<<<<< HEAD
			await api.createConsult({...formValues, timeStart: timeStart});
=======
			await api.createConsult({...formValues, 
				createdBy: authentication.currentUser.id,
				modifiedBy: authentication.currentUser.id,
				time: timeStart,	
			});
>>>>>>> parent of c9fd591... consulta is working
=======
			await api.createConsult({...formValues, timeStart: timeStart});
>>>>>>> parent of 8f548b9... Prontuario
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
