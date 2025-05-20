// axios instance imported
import { apiClient } from "./config"



// function for Sign Up authorization
export const apiSignUp = async (payload) =>{
    return apiClient.post("/users/register", payload,{
        headers: {"Content-Type" : "application/json"},
    });
};

// function for login authorization
export const apiLogin = async(payload) =>{
    return apiClient.post("/users/login", payload, {
        headers: {"Content-Type" : "application/json"},
    });
};