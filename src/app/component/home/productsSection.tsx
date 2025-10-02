import ProductsSlides from "./productsSlides";
import { ProductArray } from "@/app/interfaces/productSection.interface";
import { getProducts } from "@/app/services/productsSectionApi";

export default async function ProductsSection() {
  const { data: products }: { data: ProductArray[] } = await getProducts(8);
  return (
    <>
      <section className="py-28 overflow-hidden">
        <ProductsSlides products={products} />
      </section>
    </>
  );
}
