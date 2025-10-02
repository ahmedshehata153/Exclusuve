"use server";
import {resetPasswordSchema,resetPasswordState } from "@/schema/resetPassword.schema";

export async function resetPasswordHandling(
  formState: resetPasswordState,
  formData: FormData
): Promise<resetPasswordState> {
  const valuesResetPasswordForm = {
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
  };

  const parseData = resetPasswordSchema.safeParse(valuesResetPasswordForm);
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(valuesResetPasswordForm),
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
      callbackUrl: "/login",
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
