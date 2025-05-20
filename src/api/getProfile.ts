import api from "./axios";

export const getProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}; 