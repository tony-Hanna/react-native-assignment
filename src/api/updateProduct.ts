import api from "./axios";

export const updateProduct = async (productId: string, productData: any) => {
    try {
        const response = await api.put(`/api/products/${productId}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

