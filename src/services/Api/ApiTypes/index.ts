export interface IConsults {
    readonly id: string;
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
