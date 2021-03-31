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
<<<<<<< HEAD
<<<<<<< HEAD
    name: string;
<<<<<<< HEAD
    consultType: string;
    timeStart: Date;
=======
    professional: string;
    consultType: ConsultType;
    time: Date;
    observation: string;
>>>>>>> parent of c9fd591... consulta is working
=======
    name: string;
    consultType: string;
    timeStart: Date;
>>>>>>> parent of 8f548b9... Prontuario
    patientId: string;
=======
    consult_type: string;
    time_start: Date;
    patient_id: string;
    created_at: Date;
>>>>>>> parent of 691138f... useTableForm
}

export interface IPatient {
	name: string;
	email: string;
	health_plan: string;
}

export interface ICreatePatient {
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
    email: string;
=======
    cpf: string;
    certificate: string;
    speciality: string;
    permission: Permission; // AQUI ALGUM VALOR DO ENUM PERMISSION QUE ESTÁ ACIMA DA INTERFACE
    profession: string;
    email: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
<<<<<<< HEAD
>>>>>>> parent of 12c856e (create users INCOMPLETE)
=======
>>>>>>> parent of 12c856e (create users INCOMPLETE)
=======
    email: string;
>>>>>>> parent of 8f548b9... Prontuario
}

export interface ILoginUser {
    email: string;
    password: string;
=======
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
>>>>>>> parent of 6a18160... login
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 8f548b9... Prontuario
export const getPatients = async (): Promise<AxiosResponse<IPatient[]>> => await API.get("patients");
export const getConsults = async (): Promise<AxiosResponse<IConsults[]>>  => await API.get("consults");
=======
export const getPatients = async () => await API.get("patients");
export const getConsults = async () => await API.get("consults");
<<<<<<< HEAD
>>>>>>> parent of 691138f... useTableForm
export const createPatient = async (sendValue: ICreatePatient): Promise<IPatient> => await API.post("patients/create", sendValue);
export const createConsult = async (sendValue: ICreateConsults) => await API.post("consults/create", sendValue);
export const login = async (sendValue: ILoginUser): Promise<IUser> => API.post("/login", sendValue);
<<<<<<< HEAD
=======
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
>>>>>>> parent of 12c856e (create users INCOMPLETE)
=======
>>>>>>> parent of 8f548b9... Prontuario
=======
export const createPatient = async (value: ICreatePatient) => await API.post("patients/create", value);
export const createConsult = async (value: ICreateConsults) => await API.post("consults/create", value);
 
>>>>>>> parent of 6a18160... login
