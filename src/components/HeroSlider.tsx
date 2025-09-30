"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/image/hero_1.jpg",
      title: "Elegant Suits Collection",
      text: "Discover premium straight suits and palazzo suits",
    },
    {
      id: 2,
      image: "/image/hero_2.jpg",
      title: "Sharara Styles",
      text: "Festive wear with handcrafted details",
    },
    {
      id: 3,
      image: "/image/hero_3.jpg",
      title: "Bridal Lehenga",
      text: "Timeless designs for your special day",
    },
  ];

  return (
    <section className="relative w-full h-[70vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full h-[70vh]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                <div className="text-white max-w-3xl">
                  <h2 className="text-3xl md:text-5xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-sm md:text-lg">{s.text}</p>
                  <a
                    href="#products"
                    className="inline-block mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
