import { getToken } from "@/lib/utilitiesServer";

export async function getUserWishList() {
  try {
    const token = await getToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function AddWishList(productId: string) {
  try {
    const token = await getToken();
    if (!token) {
      return {
        data: null,
        success: false,
        message: "please login first",
      };
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return {
      data: data,
      success: true,
      message: "product added successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "product was not added",
    };
  }
}
export async function deleteWishList(Id: string) {
  try {
    const token = await getToken();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
