import ProductCard from "@/app/component/home/productCard";
import { ProductArray } from "@/app/interfaces/productSection.interface";
import { getProducts } from "@/app/services/productsSectionApi";

export default async function Products() {
    const { data: products }: { data: ProductArray[] } = await getProducts();
  return (
    <>
      <section className="py-28  mx-auto">
        <div className="container mx-auto px-2 lg:px-0">
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products &&
              products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
