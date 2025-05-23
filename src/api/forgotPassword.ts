// api/forgotPassword.ts
import api from './axios';

export const forgotPassword = async (email: string) => {
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      console.log(response)
      return response.data;
    } catch (err) {
      console.error('API ERROR in forgotPassword:', err);
      throw err;
    }
};
  
