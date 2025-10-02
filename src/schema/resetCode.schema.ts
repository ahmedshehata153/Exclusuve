import z from "zod";

export const resetCodeSchema = z.object({
  resetCode: z.string().min(5, { message: "it is not valid" }),
});

export type resetCodeForm = z.infer<typeof resetCodeSchema>;

export interface resetCodeState {
  success: boolean;
  error: {
    resetCode?: string[];
  };
  message: string | null;
  callbackUrl?: string;
}
