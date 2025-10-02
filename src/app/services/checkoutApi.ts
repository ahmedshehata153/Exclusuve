"use server";
import { getToken, getId } from "@/lib/utilitiesServer";
import { checkFormState, checkOutSchema } from "@/schema/checkout.schema";

export async function checkOutHandling(
  formState: checkFormState,
  formData: FormData
): Promise<checkFormState> {
  const token = await getToken();
  console.log(token);
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");
  const parseData = checkOutSchema.safeParse({
    cartId,
    paymentMethod,
    ...shippingAddress,
  });
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const endPoint =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    const res = await fetch(`https://ecommerce.routemisr.com/${endPoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(shippingAddress),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "something wrong",
        callbackUrl: "/cart",
        
      };
    }
    return {
      success: true,
      error: {},
      message: data.message || "all carts ordered successfully",
      callbackUrl:
        paymentMethod === "cash"
          ? "/all-orders"
          : data?.session?.url ?? "/cart",
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
export async function getUserOrders() {
  const userId = await getId();
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
