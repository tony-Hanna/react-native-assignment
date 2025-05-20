import api from "./axios";

export const createProduct = async (formData: any) => {
      console.log('formData', formData)
      try {
        const response = await api.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('create product response', response.data);
        return response.data;

      } catch (error) {
        console.error('error', error)
        throw error;
      }

};
