import { z } from "zod"

export const AuthCredentialsValidator = z.object({
  firstName: z.string().min(2, { message: "Too short" }),
  lastName: z.string().min(2, { message: "Too short" }),
  email: z.string().email({ message: "Ogiltig E-Post" }),

  password: z
    .string()
    .min(8, { message: "Lösenordet måste vara minst 8 bokstäver" }),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

export const LoginCredentialsValidator = z.object({
  email: z.string().email({ message: "Ogiltig E-Post" }),
  password: z
    .string()
    .min(8, { message: "Lösenordet måste vara minst 8 bokstäver" }),
})

export type TLoginCredentialsValidator = z.infer<
  typeof LoginCredentialsValidator
>