import api from "./axios";

export const deleteProduct = async (productId: string) => {
    try {
        const response = await api.delete(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
