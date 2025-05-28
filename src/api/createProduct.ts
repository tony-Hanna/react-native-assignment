import api from "./axios";
import { sendProductNotification } from "../services/NotificationService";
export const createProduct = async (formData: any) => {
      console.log('formData', formData)
      try {
        const response = await api.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('create product response', response.data);
        await sendProductNotification(response.data.data._id, response.data.data.title);
        return response.data;

      } catch (error) {
        console.error('error', error)
        throw error;
      }

};
