import API from "../Connection";
import { AxiosResponse } from "axios";
export interface IConsults {
    id: string;
    name: string;
    consultType: string;
    timeStart: Date;
    patientId: string;
}

export interface ICreateConsults {
    name: string;
    consultType: string;
    timeStart: Date;
    patientId: string;
}

export interface IPatient {
	id: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    color: string;
    birthdate: Date;
    scholarity: string;
    profession: string;
    nationality: string;
    income: string;
    primaryPhone: string;
    secondPhone: string;
    howKnow: string;
    healthPlan: string;
    which: string;
    useMedicines: string;
    companions: string;
    observation: string;
    createdAt: Date;
}

export interface ICreatePatient {
    name: string;
    email: string;
    gender: string;
    age: number;
    color: string;
    birthdate: Date;
    scholarity: string;
    profession: string;
    nationality: string;
    income: string;
    primaryPhone: string;
    secondPhone: string;
    howKnow: string;
    healthPlan: string;
    which: string;
    useMedicines: string;
    companions: string;
    observation: string;
    createdAt: Date;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export const getPatients = async (): Promise<AxiosResponse<IPatient[]>> => await API.get("patients");
export const getConsults = async (): Promise<AxiosResponse<IConsults[]>>  => await API.get("consults");
export const createPatient = async (sendValue: ICreatePatient): Promise<IPatient> => await API.post("patients/create", sendValue);
export const createConsult = async (sendValue: ICreateConsults) => await API.post("consults/create", sendValue);
export const login = async (sendValue: ILoginUser): Promise<IUser> => API.post("/login", sendValue);
