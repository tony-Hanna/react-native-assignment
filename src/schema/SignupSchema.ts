import { z } from "zod"

export const SignupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  profileImage: z.object({
    uri: z.string(),
    type: z.string(),
    name: z.string(),
  }).optional(),
})

export type SignupField = z.infer<typeof SignupSchema>