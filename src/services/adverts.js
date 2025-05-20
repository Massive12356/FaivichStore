import { apiClient } from "./config"

//service function for posting all products
export const apiAddProduct = async(payload)=>{
    return apiClient.post("/products", payload);
}
//function for fetching all products
export const apiGetAllProducts = async() =>{
    return apiClient.get("/products");
}

//function for fetching vendor products
//function for updating the products
export const apiUpdateProduct = async (id, payload) => {
  return apiClient.put(`/products/${id}`, payload);
};
//function for fetching a single products
export const apiGetSingleProduct = async(id) =>{
    return apiClient.get(`/products/${id}`)
}
//function for  deleting a products
export const apiDeleteProduct = async(id) =>{
    return apiClient.delete(`/products/${id}`);
}


//function for searching products/filtering

// Service function for filtering products based on category and sorting by price
export const apiFilterProducts = async (filterParams, sortParams) => {
    try {
        const response = await apiClient.get("/products", {
            params: {
                filter: JSON.stringify(filterParams),
                sort: JSON.stringify(sortParams),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error filtering products:", error);
        throw error;
    }
};

