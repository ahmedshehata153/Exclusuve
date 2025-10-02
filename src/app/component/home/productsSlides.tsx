"use client";
import Title from "./title";

import "swiper/css";
import "swiper/css/pagination";
import { ProductArray } from "@/app/interfaces/productSection.interface";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "./productCard";
export default function ProductsSlides({
  products,
}: {
  products: ProductArray[];
}) {
  return (
    <>
      <div className="container relative mx-auto px-2 md:px-0 after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-200 after:absolute after:top-[110%]">
        <Title
          sectionName1="Our Products"
          sectionName2="Explore Our Products"
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
    </>
  );
}
