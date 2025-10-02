import z from "zod";

export const checkOutSchema = z.object({
  cartId: z.string().nonempty({ message: "cart id is required" }),
  details: z.string().nonempty({ message: "Details is required" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message:
      "Please enter a valid phone number in the correct format (e.g., +201234567890).",
  }),
  city: z.string().nonempty({ message: "City is required" }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "payment method is required",
  }),
});

export type checkOutForm = z.infer<typeof checkOutSchema>;

export interface checkFormState {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    phone?: string[];
    city?: string[];
    paymentMethod?: string[];
  };
  message: string | null;
  callbackUrl?: string;
}
