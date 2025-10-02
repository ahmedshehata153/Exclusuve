"use client";
import pic1 from "@/assessts/image/slider-image-1.jpeg";
import pic2 from "@/assessts/image/slider-image-2.jpeg";
import pic3 from "@/assessts/image/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination ,Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
export default function MainSlider() {
  const images = [
    {
      path: pic1.src,
      name: "bag of fruits",
    },
    {
      path: pic2.src,
      name: "chocalate",
    },
    {
      path: pic3.src,
      name: "chocalate",
    },
  ];
  const swiperOption = {
    spaceBetween: 50,
    slidesPerView: 1,
    modules: [Pagination,Autoplay],
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    autoplay:{
        delay:3000,
    }
  };
  return (
    <div className="container mx-auto">
      <Swiper {...swiperOption}>
        <div className="mx-auto">
          {images.map((image) => {
            return (
              <SwiperSlide key={image.name}>
                <Image
                  alt={image.name}
                  height={400}
                  width={1000}
                  src={image.path}
                  className="h-[344px] w-full"
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}
