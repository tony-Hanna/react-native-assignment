import { z } from "zod";

// Matches a single digit (0-9)
const digitSchema = z
  .string()
  .regex(/^[0-9]$/, "Must be a single digit from 0 to 9")
  .min(1, "Digit is required");

const otpSchema = z.object({
  d1: digitSchema,
  d2: digitSchema,
  d3: digitSchema,
  d4: digitSchema,
  d5: digitSchema,
  d6: digitSchema,
  });

type otpField = z.infer<typeof otpSchema>;

export { otpSchema };
export type { otpField };
