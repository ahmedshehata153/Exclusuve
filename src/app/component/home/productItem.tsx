"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
export default function ProductItem({ images }: { images: string[] }) {
  const swiperOption = {
    spaceBetween: 50,
    slidesPerView: 1,
    modules: [Pagination],
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    autoplay: {
      delay: 3000,
    },
  };
  return (
    <Swiper {...swiperOption} className="bg-gray-300">
      <div >
        {images &&
          images.map((image,index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  alt={image}
                  height={400}
                  width={1000}
                  src={image}
                  className="h-[315px] object-contain"
                />
              </SwiperSlide>
            );
          })}
      </div>
    </Swiper>
  );
}
