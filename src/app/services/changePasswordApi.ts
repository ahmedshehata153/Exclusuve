"use server";
import { changeState, changeFormSchema } from "@/schema/changePassword.schema";
import { getToken } from "@/lib/utilitiesServer";
import { fail } from "assert";

export async function changeHandling(
  formState: changeState,
  formData: FormData
): Promise<changeState> {
  const valuesChangeForm = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };
  const token = await getToken();
  const parseData = changeFormSchema.safeParse(valuesChangeForm);
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(valuesChangeForm),
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
      message: data.message || "password changed successfully",
      callbackUrl: "/login",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "password changed successfully",
    };
  }
}
