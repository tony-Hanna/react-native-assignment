import api from "./axios"
import { LoginField } from "../schema/LoginSchema"

interface LoginResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
  }
}

export const loginUser = async (data: LoginField) => {
  const response = await api.post<LoginResponse>('/api/auth/login', {
    ...data,
    token_expires_in: "1y"
  })

  return response.data.data
}

