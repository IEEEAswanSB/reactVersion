import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "./manga.css"

import swipeHand from "../../assets/bein7/swipe.webp"
import lastBein1 from "../../assets/bein7/last-bein/1.webp";
import lastBein2 from "../../assets/bein7/last-bein/2.webp";
import lastBein4 from "../../assets/bein7/last-bein/4.webp";
import lastBein5 from "../../assets/bein7/last-bein/5.webp";
import lastBein6 from "../../assets/bein7/last-bein/6.webp";
import lastBein7 from "../../assets/bein7/last-bein/7.webp";
import lastBein8 from "../../assets/bein7/last-bein/8.webp";
import lastBein9 from "../../assets/bein7/last-bein/9.webp";
import lastBein10 from "../../assets/bein7/last-bein/10.webp";
import lastBein11 from "../../assets/bein7/last-bein/11.webp";
import lastBein12 from "../../assets/bein7/last-bein/12.webp";
import lastBein13 from "../../assets/bein7/last-bein/13.webp";
import lastBein14 from "../../assets/bein7/last-bein/14.webp";

const images = [
  lastBein1, lastBein2, lastBein4, lastBein5,
  lastBein6, lastBein7, lastBein8, lastBein9, lastBein10,
  lastBein11, lastBein12, lastBein13, lastBein14
];

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={40}
      slidesPerView={1}
      centeredSlides={true}
      loop
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 1500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        stopOnLastSlide: false,
        waitForTransition: true,
      }}
      className={`w-full max-w-7xl  relative flex justify-center items-center`}
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className={`flex items-center justify-center`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="rounded-2xl object-cover w-full h-full lg:aspect-video"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;