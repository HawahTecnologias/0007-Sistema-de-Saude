import API from "../Connection";

export interface IConsults {
    readonly id: string;
    name: string;
    consult_type: string;
    time_start: Date;
    patient_id: string;
    created_at: Date;
}

export interface ICreateConsults {
    name: string;
    consult_type: string;
    time_start: Date;
    patient_id: string;
    created_at: Date;
}

export interface IPatient {
	name: string;
	email: string;
	health_plan: string;
}

export interface ICreatePatient {
    name: string,
    age: string,
    gender: string,
    birthdate: string,
    color: string,
    health_plan: string,
    nationality: string,
    income: string,
    profession: string,
    phone_number_01: string,
    phone_number_02: string,
    email: string,
    how_know: string,
    scholarity: string,
    adress: string,
    observation: string,
    companions: string,
    which: string,
    use_medicines: string,
}

export const getPatients = async () => await API.get("patients");
export const getConsults = async () => await API.get("consults");
export const createPatient = async (value: ICreatePatient) => await API.post("patients/create", value);
export const createConsult = async (value: ICreateConsults) => await API.post("consults/create", value);
 
