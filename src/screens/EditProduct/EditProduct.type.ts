import { z } from "zod";

export const EditProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a number',
  }),
  location: z.object({
    name: z.string().min(1, 'Location name is required'),
    longitude: z.number(),
    latitude: z.number(),
  }),
});

export type EditProductField = z.infer<typeof EditProductSchema>;

export interface Location {
  name: string;
  longitude: number;
  latitude: number;
} 