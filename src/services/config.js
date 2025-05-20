// axios instance goes here
import axios from "axios";

// get the base url from the env file 
const baseURL = import.meta.env.VITE_BASE_URL

// creating the base url instance 

export const apiClient = axios.create({
    baseURL:baseURL,
});

apiClient.interceptors.request.use((config)=>{
    // get the access token from localstorage
    const token = localStorage.getItem('token');
    // attach token to authorization header
    config.headers.Authorization=`Bearer ${token}`;
    // return config
    return config;
})