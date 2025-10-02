"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/image/hero_1.jpg",
      title: "Elegant Suits Collection",
      subtitle: "Premium Fashion",
      text: "Discover our exclusive range of straight suits and palazzo suits crafted with precision",
      badge: "New Arrival",
      buttonText: "Shop Collection",
    },
    {
      id: 2,
      image: "/image/hero_2.jpg",
      title: "Sharara Styles",
      subtitle: "Festive Collection",
      text: "Handcrafted details and luxurious fabrics for your special occasions",
      badge: "Bestseller",
      buttonText: "Explore Styles",
    },
    {
      id: 3,
      image: "/image/hero_3.jpg",
      title: "Bridal Lehenga",
      subtitle: "Timeless Elegance",
      text: "Make your special day unforgettable with our exquisite bridal collection",
      badge: "Luxury",
      buttonText: "View Collection",
    },
  ];

  return (
    <section className="relative w-full h-screen max-h-[800px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        pagination={{ 
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-8",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-white text-sm font-medium tracking-wide">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
                      {slide.text}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <a
                        href="#products"
                        className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-xl hover:scale-105 group"
                      >
                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        {slide.buttonText}
                      </a>
                      <a
                        href="#collections"
                        className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
                      >
                        Explore More
                      </a>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center gap-6 mt-8 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span>Premium Quality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !w-12 !h-12 !left-6 lg:!left-12 after:!content-none border border-white/40 rounded-full hover:border-white/80 transition-all duration-300 group">
  <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
</div>
<div className="swiper-button-next !w-12 !h-12 !right-6 lg:!right-12 after:!content-none border border-white/40 rounded-full hover:border-white/80 transition-all duration-300 group">
  <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
</div>
      </Swiper>

      {/* Custom Pagination Position */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 2rem !important;
        }
        .swiper-pagination-bullet {
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
}