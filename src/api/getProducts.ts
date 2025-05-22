import api from "./axios"

export const getProducts = async ({ pageParam = 1}: { pageParam: number }) => {
    const response = await api.get(`/api/products?page=${pageParam}&limit=10`);
    console.log('response', response.data)
    return response.data;
}