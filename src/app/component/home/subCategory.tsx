"use client";
import { CategoryArray } from "@/app/interfaces/categorySection.interface";
import Title from "./title";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Castle } from "lucide-react";

export default function SubCategorySection({
  SubCategoryDetails,
}: {
  SubCategoryDetails: CategoryArray[];
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
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1040: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1115: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  };
  return (
    <>
      <div className="mt-24">
        <Title
          sectionName1="Our SubCategories"
          sectionName2="Explore Our SubCategories"
        />

        <Swiper {...swiperOption}>
          {SubCategoryDetails &&
            SubCategoryDetails.map((SubCat: CategoryArray) => {
              return (
                <>
                  <SwiperSlide className="mb-14 ">
                    <div className="bg-[#DB4444]  py-9 rounded-2xl">
                      <div className="py-2 px-1.5 flex justify-center items-center flex-col align-middle gap-3  ">
                        <Castle />
                        <h2 className="text-[13px] sm:text-[16px]">{SubCat.name.split("").slice(0, 15)}</h2>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
        </Swiper>
      </div>
    </>
  );
}
