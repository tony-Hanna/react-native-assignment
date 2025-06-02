import { z } from "zod";
export const ProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    profileImage: z.any().optional(),
});
  
export type ProfileField = z.infer<typeof ProfileSchema>;