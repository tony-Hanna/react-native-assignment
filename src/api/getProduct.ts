import api from "./axios"

export const getProduct = async (id: string) => {
    try {
        const response = await api.get(`/api/products/${id}`)
        return response.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch product data."); 
    }
}

