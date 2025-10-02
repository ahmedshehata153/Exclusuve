export async function getBrands(limit = 54) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getBrandsDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
