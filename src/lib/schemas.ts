// src/lib/schemas.ts
import { z } from "zod";

export const firstNameSchema = z
  .string()
  .min(1, "First name is required")
  .max(32, "First name must be at most 32 characters");

export const lastNameSchema = z
  .string()
  .min(1, "Last name is required")
  .max(32, "Last name must be at most 32 characters");

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(32, "Username must be at most 32 characters")
  .regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dot, underscore, or dash");

export const emailSchema = z.string().email("Enter a valid email");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  // add your policy here as needed:
  // .regex(/[A-Z]/, "Include an uppercase letter")
  // .regex(/[0-9]/, "Include a number")
  ;

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
