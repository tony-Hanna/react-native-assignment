import api from "./axios"


export const resendOtp = async (email: string) => {
  //verify otp
  const verifyResponse = await api.post('/api/auth/resend-verification-otp', {
    email
  })

  return verifyResponse.data
}
