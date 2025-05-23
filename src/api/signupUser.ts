import api from "./axios"
import { SignupField } from "../schema/SignupSchema"

export const signupUser = async (data: SignupField) => {
  
  try {
    const response = await api.post('/api/auth/signup', {
        ...data
    })
    console.log('API response:', response.data)
    return response.data
  } catch (error) {
    console.log('API error:', error)
    throw error
  }
}

