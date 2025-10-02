import { getId } from "@/lib/utilitiesServer";

export async function getUserData() {
  const userId = await getId();

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/${userId}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log(error);
  }
}
