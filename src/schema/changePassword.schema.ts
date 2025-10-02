import z from "zod";

export const changeFormSchema = z.object({
 currentPassword:z.string({message: "password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)."}),
 password:z.string({message: "password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)."}),
 rePassword:z.string({message: "password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)."})
})
export type changeForm = z.infer<typeof changeFormSchema>;

export interface changeState {
  success: boolean;
  error: {
    currentPassword?: string[];
    password?: string[];
    rePassword?: string[];
  };
  message: string | null;
  callbackUrl?:string;
}
