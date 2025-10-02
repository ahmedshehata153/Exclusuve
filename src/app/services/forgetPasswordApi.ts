"use server";
import { forgetFormSchema } from "@/schema/forget.shema";
import { forgetState } from "@/schema/forget.shema";

export async function forgetHandling(
  formState: forgetState,
  formData: FormData
): Promise<forgetState> {
  const valuesForgetForm = {
    email: formData.get("email"),
    
  };

  const parseData = forgetFormSchema.safeParse(valuesForgetForm);
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(valuesForgetForm),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "something wrong",
      
      };
    }
    return {
      success: true,
      error: {},
      message: data.message || "Reset code sent to your email",
      callbackUrl: "/resetcode",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "Reset code sent to your email",
    };
  }
}
