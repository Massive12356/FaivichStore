import { apiClient } from "./config"



// Function for fetching the details of a user
export const apiGetUserDetails = async()=>{
    return apiClient.get("/users/me");
}