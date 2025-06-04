import api from "./axios";
import { useAuthStore } from "../store/AuthStore";
import { OneSignal } from "react-native-onesignal";
import Toast from "react-native-toast-message";
export const getProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    useAuthStore.getState().setUserId(response.data.data.user.id);
    OneSignal.login(response.data.data.user.id)
    return response.data.data.user;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: JSON.stringify(error),
    }); 
    console.error(error)
    throw new Error("Failed to fetch profile data."); 
  }
}; 