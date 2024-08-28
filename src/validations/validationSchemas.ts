import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "email is required").max(50, "email must be at most 50 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

export const registerSchema = z.object({
  email: z.string().min(1, "email is required").max(50, "email must be at most 50 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
