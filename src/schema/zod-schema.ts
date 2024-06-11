import { z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Provide your email address!",
    })
    .email("Provide an email!"),
  password: z
    .string({
      required_error: "Provide a password!",
    })
    .min(4, { message: "Password must be between 4 and 16 characters!" })
    .max(6, {
      message: "Password must be between 4 and 16 characters!",
    }),
});

export const RegisterSchema = z.object({
  name: z
    .string({
      required_error: "Provide you name!",
    })
    .min(4, { message: "Name must be minimum 4 characters long!" }),
  email: z.string().email("Provide an email!"),
  password: z
    .string()
    .min(4, { message: "Password must be between 4 and 16 characters!" })
    .max(16, {
      message: "Password must be between 4 and 16 characters!",
    }),
});
