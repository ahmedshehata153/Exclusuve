import z from "zod";

export const forgetFormSchema = z.object({
  email: z.email({ message: "email is reqiured" }),
});

export type forgetForm = z.infer<typeof forgetFormSchema>;

export interface forgetState {
  success: boolean;
  error: {
    email?: string[];
  };
  message: string | null;
  callbackUrl?: string;
}
