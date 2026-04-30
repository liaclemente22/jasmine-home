"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface GalleryProps {
    images: string[];
    title: string;
}

export default function PropertyGallery({ images, title }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="w-full">

            {/* Main Slider */}
            <div className="relative h-[65vh]">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    loop
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-[65vh]">
                                <Image
                                    src={img}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Thumbnail Strip */}
            <div className="max-w-6xl mx-auto mt-6 px-8">
                <div className="flex gap-4 overflow-x-auto">

                    {images.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => swiperInstance?.slideToLoop(index)}
                            className={`relative w-28 h-20 rounded-lg overflow-hidden cursor-pointer transition ${activeIndex === index
                                ? "ring-2 ring-sage"
                                : "opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} thumbnail`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}
