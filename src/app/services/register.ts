"use server";
import { error } from "console";
import { registerFormSchema, registerState } from "@/schema/register.schema";
import { json, success } from "zod";
import { promises } from "dns";

export async function registerHandling(
  formState: registerState,
  formData: FormData
): Promise<registerState> {
  const valuesForm = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };
  const parseData = registerFormSchema.safeParse(valuesForm);
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(valuesForm),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }
    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "something wrong",
    };
  }
}
