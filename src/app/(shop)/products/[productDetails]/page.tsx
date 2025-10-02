import { getProductsDetails } from "@/app/services/productsSectionApi";
import { ProductArray } from "@/app/interfaces/productSection.interface";
import ProductItem from "@/app/component/home/productItem";
import { Star } from "lucide-react";
import AddCartButton from "@/app/component/home/addCartButton";
import AddWishListButton from "@/app/component/home/addWhishlistButton";
import Title from "@/app/component/home/title";
import { getProducts } from "@/app/services/productsSectionApi";
import ProductCard from "@/app/component/home/productCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function ProductDetails({
  params: { productDetails },
}: {
  params: { productDetails: string };
}) {
  const { data }: { data: ProductArray } = await getProductsDetails(
    productDetails
  );
  const { data: products }: { data: ProductArray[] } = await getProducts(
    8,
    data.category._id
  );
  console.log(products);
  return (
    <>
      <section className="py-5">
        <div className="container  mx-auto px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-1 md:col-span-2">
              <ProductItem images={data.images} />
            </div>
            <div className="col-span-1">
              <h2 className="font-[600] text-2xl uppercase mb-3">
                {data.title}
              </h2>
              <div className="flex gap-4 mb-3">
                <Star className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{data.ratingsAverage}</span>
                <span>|</span>
                <span className="text-green-600">
                  {data.quantity > 0 ? "in stock" : "out of stock"}
                </span>
              </div>
              <span className="mb-3 inline-block text-2xl">
                LE ${data.price}
              </span>
              <p className="text-[14px] mb-3">{data.description}</p>
              <span className="w-full inline-block h-[1px] bg-gray-500"></span>
              <AddCartButton
                Id={data._id}
                variant="destructive"
                className="w-full mt-2"
              />
              <AddWishListButton
                Id={data._id}
                variant="destructive"
                className="w-full mt-2"
              />
            </div>
          </div>
          <div className="mt-7">
            <Title
              sectionName1={"Related Products"}
              sectionName2={"Related Products"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products &&
                products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
            </div>
            <div className="flex justify-center mt-10">
              <Button
                className="px-10 py-4 rounded-[4px] text-white bg-[#DB4444] hover:bg-[#DD5555]"
                asChild
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
