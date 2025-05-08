import { z } from "zod";
const otpSchema = z.object({
  d1: z.string().length(1, 'Required'),
  d2: z.string().length(1, 'Required'),
  d3: z.string().length(1, 'Required'),
  d4: z.string().length(1, 'Required'),
});
type otpField = z.infer<typeof otpSchema>

export {otpSchema}
export type {otpField}