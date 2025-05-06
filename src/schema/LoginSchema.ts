import {z} from 'zod'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required').regex(emailRegex,'Invalid email'),
    password: z.string().min(1, 'Password is required')
})

type LoginField = z.infer<typeof LoginSchema>
export {LoginSchema}
export type {LoginField}