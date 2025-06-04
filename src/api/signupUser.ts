import api from "./axios"
import { SignupField } from "../schema/SignupSchema"
import Toast from "react-native-toast-message"
export const signupUser = async (data: SignupField) => {
  
  try {
    const response = await api.post('/api/auth/signup', {
        ...data
    })
    return response.data
  } catch (error) {
    Toast.show({
      type: 'error',
      text1:'server error',
    });
    console.error('API error:', error)
    throw error
  }
}

