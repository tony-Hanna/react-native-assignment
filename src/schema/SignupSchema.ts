import {z} from 'zod'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
const nameRegex = /^[A-Za-z\s]+$/

const SignupSchema = z.object({
    email: z.string().min(1, 'Email is required').regex(emailRegex,'Invalid email'),
    password: z.string().min(1, 'Password is required').regex(passwordRegex, 'Password must be at least 6 characters and include a letter and a number'),
    name: z.string().min(1, 'Name is required').regex(nameRegex, 'Name must not contain numbers or symbols'),
    phone: z.number()
})

type SignupField = z.infer<typeof SignupSchema>
export {SignupSchema}
export type {SignupField}