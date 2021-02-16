import React from "react";

function useCreatePatient() {
	const [name, setName] = React.useState("");
	const [color, setColor] = React.useState("");
	const [nationality, setNationality] = React.useState("");
	const [profession, setProfession] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [secondaryPhone, setSecondaryPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [scholarity, setScholarity] = React.useState("");
	const [adress, setAdress] = React.useState("");
	const [comments, setComments] = React.useState("");
	const [companion, setCompanion] = React.useState("");
	const [medicine, setMedicine] = React.useState("");

	const createPatient = () => {
		console.log(
			name,
			color,
			nationality,
			profession,
			phone,
			secondaryPhone,
			email,
			scholarity,
			adress,
			comments,
			companion,
			medicine,
		);
	};

	return {
		setName,
		setColor,
		setNationality,
		setProfession,
		setPhone,
		setSecondaryPhone,
		setEmail,
		setScholarity,
		setAdress,
		setComments,
		setCompanion,
		setMedicine,
        createPatient,
	};
}

export default useCreatePatient;
