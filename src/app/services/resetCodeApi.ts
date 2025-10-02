"use server";
import { resetCodeSchema, resetCodeState } from "@/schema/resetCode.schema";

export async function resetCodeHandling(
  formState: resetCodeState,
  formData: FormData
): Promise<resetCodeState> {
  const valuesResetCodeForm = {
    resetCode: formData.get("resetCode"),
  };

  const parseData = resetCodeSchema.safeParse(valuesResetCodeForm);
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(valuesResetCodeForm),
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
      callbackUrl: "/resetpassword",
    };
  } catch (error) {
    console.log(error);
      return {
        success: false,
        error: {},
        message:(error as string)|| "Reset code sent to your email",
      };
  }
}
