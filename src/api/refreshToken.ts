import api from "./axios"

interface RefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
  }
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post<RefreshTokenResponse>('/api/auth/refresh-token', {
      refreshToken,
      token_expires_in: "1y"
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}