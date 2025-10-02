export async function getProducts(limit = 56, catId?: string) {
  try {
    const endPoint = catId
      ? `?limit=${limit}&category[in]=${catId}`
      : `?limit=${limit}`;
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products${endPoint}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
