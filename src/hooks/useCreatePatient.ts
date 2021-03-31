import React from "react";

function useCreatePatient() {
	const [name, setName] = React.useState("");
	const [color, setColor] = React.useState("");
<<<<<<< HEAD:src/hooks/useCreatePatient.ts
	const [healthPlan, setHealthPlan] = React.useState("");
=======
>>>>>>> parent of 0dae834... list and create patient:src/hooks/useCreatePatient.tsx
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

<<<<<<< HEAD:src/hooks/useCreatePatient.ts
	const createPatient = async() => {
		console.log(birthdate);
		const data = {
=======
	const createPatient = () => {
		console.log(
>>>>>>> parent of 0dae834... list and create patient:src/hooks/useCreatePatient.tsx
			name,
			color,
<<<<<<< HEAD:src/hooks/useCreatePatient.ts
			health_plan: healthPlan,
=======
>>>>>>> parent of 0dae834... list and create patient:src/hooks/useCreatePatient.tsx
			nationality,
			profession,
			phone,
			secondaryPhone,
			email,
<<<<<<< HEAD:src/hooks/useCreatePatient.ts
			how_know: howKnow,
=======
>>>>>>> parent of 0dae834... list and create patient:src/hooks/useCreatePatient.tsx
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
<<<<<<< HEAD:src/hooks/useCreatePatient.ts
		setHealthPlan,
=======
>>>>>>> parent of 0dae834... list and create patient:src/hooks/useCreatePatient.tsx
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
