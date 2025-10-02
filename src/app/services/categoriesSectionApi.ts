export async function getCategory() {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getCategoryDetails(id:string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getSubCategoryDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    if (!res.ok) throw new Error("there is an error");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
