import api from "./axios"
import { LoginField } from "../schema/LoginSchema"
import { useAuthStore } from "../store/AuthStore"
import { getProfile } from "./getProfile"
interface LoginResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
  }
}

export const loginUser = async (data: LoginField) => {
  try {
    const response = await api.post<LoginResponse>('/api/auth/login', {
      ...data,
      token_expires_in: "1y"
  })
  const { accessToken, refreshToken } = response.data.data;
  useAuthStore.getState().setTokens(accessToken, refreshToken);
  await getProfile()
  return response.data.data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

