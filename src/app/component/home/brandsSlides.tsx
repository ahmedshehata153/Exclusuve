"use client";
import { BrandArray } from "@/app/interfaces/brandSection.interface";
import BrandCard from "./brandCard";

import Title from "./title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrandsSlides({ brands }: { brands: BrandArray[] }) {
  const swiperOption = {
    spaceBetween: 50,
    slidesPerView: 1,
    modules: [Pagination],
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
  };
  return (
    <div className="container  mx-auto px-2 md:px-0 ">
      {/* title */}
      <Title sectionName1={"Brands"} sectionName2={"Price By Brands"} />
      <Swiper {...swiperOption}>
        {brands &&
          brands.map((brand) => {
            return (
              <SwiperSlide key={brand._id} className="mb-5">
                <BrandCard brand={brand} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="flex justify-center mt-10">
        <Button
          className="px-10 py-4 rounded-[4px] text-white bg-[#DB4444] hover:bg-[#DD5555]"
          asChild
        >
          <Link href="/brands">View All Brands</Link>
        </Button>
      </div>
    </div>
  );
}
