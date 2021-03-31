import { Api, config } from "../Connection";
import { AxiosResponse } from "axios";
const API = Api();

export interface Anamnesis {
    id: string;
    qp: string;
    hda: string;
    hpp: string;
    hps: string;
    hf: string;
    patientRecordsId: string;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PhysicalExam {
    id: string;
    general: string;
    skin: string;
    headAndNeck: string;
    sysRespiratory: string;
    sysCardiovascular: string;
    sysAbdominal: string;
    sysUrinary: string;
    sysNeurological: string;
    extremities: string;
    osteoarticular: string;
    mentalState: string;
    fnCortical: string;
    cranialNerves: string;
    motricity: string;
    sensory: string;
    reflections: string;
    cerebellar: string;
    march: string;
    others: string;
    patientRecordsId: string;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ConsultType {
    return = "Retorno",
    first = "Primeira",
}

interface IConsult {
    id: string;
    professional: string;
    consultType: ConsultType;
    time: Date;
    observation: string;
    patientId: string;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateConsults {
    professional: string;
    consultType: ConsultType;
    time: Date;
    observation: string;
    patientId: string;
    createdBy: string;
    modifiedBy: string;
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
    knowUs: string;
    healthPlan: string;
    companions: string;
    observation: string;
    patientRecordId: string[];
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
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
    knowUs: string;
    healthPlan: string;
    companions: string;
    observation: string;
    patientRecordId: string[];
    createdBy: string;
    modifiedBy: string;
}

export enum Permission {
    admin = "admin",
    user = "user",
}

export interface IUser {
    id: string;
    name: string;
    cpf: string;
    certificate: string;
    speciality: string;
    permission: Permission; // AQUI ALGUM VALOR DO ENUM PERMISSION QUE ESTÁ ACIMA DA INTERFACE
    profession: string;
    email: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IPatientRecord {
    id: string;
    patientId: IPatient;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreatePatientRecord {
    patientId: string;
    createdBy: string;
    modifiedBy: string;
    general: string;
    skin: string;
    headAndNeck: string;
    sysRespiratory: string;
    sysCardiovascular: string;
    sysAbdominal: string;
    sysUrinary: string;
    sysNeurological: string;
    extremities: string;
    osteoarticular: string;
    mentalState: string;
    fnCortical: string;
    cranialNerves: string;
    motricity: string;
    sensory: string;
    reflections: string;
    cerebellar: string;
    march: string;
    others: string;
    qp: string;
    hda: string;
    hpp: string;
    hps: string;
    hf: string;
}

export const getPatients = async (): Promise<AxiosResponse<IPatient[]>> => await API.get("patients", config);
export const createPatient = async (sendValue: ICreatePatient): Promise<IPatient> => await API.post("patients/create", sendValue, config);

export const getConsults = async (): Promise<AxiosResponse<IConsult[]>>  => await API.get("consults", config);
export const createConsult = async (sendValue: ICreateConsults) => await API.post("consults/create", sendValue, config);

export const login = async (sendValue: ILoginUser): Promise<AxiosResponse<IUser>> => API.post("/login", sendValue,config);

export const getPatientRecords = async (): Promise<AxiosResponse<IPatientRecord[]>> => await API.get("patientRecords", config);
export const createPatientRecord = async (sendValue: ICreatePatientRecord): Promise<IPatientRecord> => await API.post("patientRecords/create", sendValue, config);
