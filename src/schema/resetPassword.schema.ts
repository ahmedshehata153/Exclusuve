import z from "zod";

export const resetPasswordSchema = z.object({
  email:z.email({message:"email is required"}),
  newPassword:z.string({message: "password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)."})
});

export type resetPasswordForm = z.infer<typeof resetPasswordSchema>;

export interface resetPasswordState {
  success: boolean;
  error: {
    email?: string[];
    newPassword?: string[];
  };
  message: string | null;
  callbackUrl?: string;
}
