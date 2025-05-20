import api from "./axios"

export const getProduct = async (id: string) => {
    const response = await api.get(`/api/products/${id}`)
    return response.data.data
}

