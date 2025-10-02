"use client";

import { ProductArray } from "@/app/interfaces/productSection.interface";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import AddCartButton from "./addCartButton";
import AddWishListButton from "./addWhishlistButton";

export default function ProductCard({ product }: { product: ProductArray }) {
  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full relative bg-gray-100 overflow-hidden group rounded-[4px]">
          <Link
            href={`/products/${product._id}`}
            className=" flex justify-center "
          >
            <Image
              alt={product.title}
              height={256}
              width={170}
              src={product.images[0]}
              className="w-3/4 sm:contain"
            />
          </Link>

          <AddCartButton
            Id={product._id}
            className="absolute w-full bg-black text-white capitalize py-4 -bottom-24 group-hover:bottom-10 transition-all duration-75"
          />
          <AddWishListButton
            Id={product._id}
            className="absolute w-full bg-black text-white capitalize py-4 -bottom-24 group-hover:bottom-0 transition-all duration-75"
          />
        </div>
        <div className="py-2 px-8 sm:px-3 flex justify-between ">
          <Link href={`/products/${product._id}`}>
            <h2 className="font-bold">
              {product.title.split("").slice(0, 11).join("") + "...."}
            </h2>
          </Link>
          <div className="flex gap-2">
            <Star className="text-yellow-500 fill-yellow-500" />
            <h2 className="font-bold">{product.price}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
