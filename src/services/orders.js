import { apiClient } from "./config"



// posting orders to the backend
export const apiPostOrder= async(payload)=>{
    return apiClient.post('/orders', payload , {
        headers: {'Content-Type' : 'application/json'}
    });
}

// fetching orders from the backend
export const apiGetOrders = async () =>{
    return apiClient.get('/orders');
};

// delete order
export const apiDeleteOrder = async (id) =>{
    return apiClient.delete(`/orders/${id}`);
}