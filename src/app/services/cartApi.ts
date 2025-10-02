import { getToken } from "@/lib/utilitiesServer";

export async function getUserCart() {
  try {
    const token = await getToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
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

export async function deleteAllCarts() {
  try {
    const token = await getToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
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
export async function AddCart(productId: string) {
  try {
    const token = await getToken();
    if (!token) {
      return {
        data: null,
        success: false,
        message: "please login first",
      };
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
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
      message: "added successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "product was not added successfully",
    };
  }
}
export async function deleteCart(Id: string) {
  try {
    const token = await getToken();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${Id}`,
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
export async function changeQuan(productId: string, count: number) {
  try {
    const token = await getToken();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      }
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    const token = await getToken();
    console.log(productId, count, token);
  }
}
