import z from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "username is required" })
      .min(3, { message: "3 letters at least" }),
    email: z.email({ message: "email is required" }),
    password: z
      .string()
      .nonempty({ message: "password is required" })
      .min(6, { message: "password should be 6 letters at least" }),
    rePassword: z
      .string()
      .nonempty({ message: "repassword is required" })
      .min(6, { message: "password should be 6 letters at least" }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "Please enter a valid phone number in the correct format (e.g., +201234567890).",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerForm = z.infer<typeof registerFormSchema>;
export interface registerState {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
}
