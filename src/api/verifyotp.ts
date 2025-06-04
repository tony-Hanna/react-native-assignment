import api from "./axios"

export const verifyOtp = async (email: string, otp: string, password: string) => {
  //verify otp
  const verifyResponse = await api.post('/api/auth/verify-otp', {
    email,
    otp
  })

  return verifyResponse.data
}
