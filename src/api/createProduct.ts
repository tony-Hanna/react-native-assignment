import api from "./axios";
import { sendProductNotification } from "../services/NotificationService";

export const createProduct = async (formData: FormData) => {
  try {
    const response = await api.post('/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await sendProductNotification(response.data.data._id, response.data.data.title);
    return response.data;
  } catch (error) {
    throw error;
  }
};
