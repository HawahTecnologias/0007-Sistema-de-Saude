import axios from "axios";

import { IConsults, IPatient } from "./ApiTypes";

const api = axios.create({
    baseURL: "http://localhost:3333",
})

export default api;
export type { IConsults, IPatient };

