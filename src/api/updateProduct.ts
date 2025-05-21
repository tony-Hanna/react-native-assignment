import api from "./axios";

export const updateProduct = async (productId: string, productData: any) => {
    console.log('productData', productData)
    console.log('productId', productId)
    try {
        const response = await api.put(`/api/products/${productId}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
      
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

