import React from "react";
import * as api from "../services/Api";
import { ISnackBar } from "./useSnackBar";
import strings from "../resources/strings";

function useCreatePatient(props: ISnackBar) {
	const PatientStrings = strings.pages.patient;
	const [name, setName] = React.useState("");
	const [age, setAge] = React.useState("");
	const [gender, setGender] = React.useState("");
	const [birthdate, setBirthdate] = React.useState("");
	const [color, setColor] = React.useState("");
	const [healthPlan, setHealthPlan] = React.useState("");
	const [nationality, setNationality] = React.useState("");
	const [income, setIncome] = React.useState("");
	const [profession, setProfession] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [secondaryPhone, setSecondaryPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [howKnow, setHowKnow] = React.useState("");
	const [scholarity, setScholarity] = React.useState("");
	const [adress, setAdress] = React.useState("");
	const [comments, setComments] = React.useState("");
	const [companion, setCompanion] = React.useState("");
	const [medicine, setMedicine] = React.useState("");

	const createPatient = async (onSuccess: () => void) => {
		const data = {
			name,
			age,
			gender,
			birthdate,
			color,
			health_plan: healthPlan,
			nationality,
			income,
			profession,
			phone_number_01: phone,
			phone_number_02: secondaryPhone,
			email,
			how_know: howKnow,
			scholarity,
			adress,
			observation: comments,
			companions: companion,
			which: companion,
			use_medicines: medicine,
		};
		try {
			const result = await api.createPatient(data);
			props.showSnackBar(PatientStrings.success, "success");
			console.log(result.data);
			onSuccess();
		} catch (e) {
			console.log(e.message);
			props.showSnackBar(e.message, "error");
		}
	};

	return {
		setName,
		setAge,
		setGender,
		setBirthdate,
		setColor,
		setHealthPlan,
		setNationality,
		setIncome,
		setProfession,
		setPhone,
		setSecondaryPhone,
		setEmail,
		setHowKnow,
		setScholarity,
		setAdress,
		setComments,
		setCompanion,
		setMedicine,
		createPatient,
	};
}

export default useCreatePatient;
