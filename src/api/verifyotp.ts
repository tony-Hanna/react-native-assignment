import api from "./axios"
import { loginUser } from "./loginUser"

export const verifyOtp = async (email: string, otp: string, password: string) => {
  //verify otp
  const verifyResponse = await api.post('/api/auth/verify-otp', {
    email,
    otp
  })
  console.log('verifyResponse', verifyResponse.data)
  //login
  if (verifyResponse.data.success) {
    const loginResponse = await loginUser({ email, password })
    return {
      verifyResponse: verifyResponse.data,
      loginData: loginResponse
    }
  }

  return verifyResponse.data
}
