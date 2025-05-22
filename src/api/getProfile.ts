import api from "./axios";
import { useAuthStore } from "../store/AuthStore";
export const getProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    useAuthStore.getState().setUserId(response.data.data.user.id);
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}; 