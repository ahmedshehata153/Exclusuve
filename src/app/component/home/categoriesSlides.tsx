"use client";
import Title from "./title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import CategoryCard from "./categoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoriesSlides({
  categories,
}: {
  categories: CategoryArray[];
}) {
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
    <>
      <div className="container  relative mx-auto px-2 md:px-0 after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-200 after:absolute after:top-[115%]">
        {/* title */}
        <Title sectionName1={"categories"} sectionName2={"price by category"} />
        <Swiper {...swiperOption} >
          {categories &&
            categories.map((cat) => {
              return (
                <SwiperSlide key={cat._id} className="mb-14">
                  <CategoryCard cat={cat} />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="flex justify-center mt-10">
          <Button
            className="px-10 py-4 rounded-[4px] text-white bg-[#DB4444] hover:bg-[#DD5555]"
            asChild
          >
            <Link href="/categories">View All Catogories</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
