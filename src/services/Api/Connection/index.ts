import axios, { AxiosRequestConfig } from "axios";

let token = "";

export let config: AxiosRequestConfig = { headers: { 'token': token}};

export function setToken(sendToken: string) {
    token = sendToken;
    config = { headers: { 'token': sendToken}};
    console.log("token", token);
}



export const Api = () => axios.create({
            baseURL: "http://localhost:3333",
            headers: {
                'token': token
              }
        });
