import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FiPlay, FiPause, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from "../../assets/images";

import Image from "../designLayouts/Image";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const togglePlay = () => {
    if (sliderRef.current) {
      if (isPaused) {
        sliderRef.current.slickPlay();
        setIsPaused(false);
      } else {
        sliderRef.current.slickPause();
        setIsPaused(true);
      }
    }
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: !isPaused,
    autoplaySpeed: 30000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <ul
          style={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: i === dotActive ? "8px" : "6px",
          height: i === dotActive ? "8px" : "6px",
          backgroundColor: i === dotActive ? "#fff" : "rgba(255,255,255,0.5)",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "inline-block",
        }}
      ></div>
    ),
  };

  return (
    <div className="w-full relative bg-black h-[600px] md:h-[800px] overflow-hidden group">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {[
          {
            img: bannerImgOne,
            title: "AIR MAX 95",
            titleColor: "text-white",
            subtitle: "Above the Influence",
            subtitleColor: "text-gray-300",
          },
          {
            img: bannerImgTwo,
            title: "RUN REVOLUTION",
            titleColor: "text-cyan-400",
            subtitle: "Experience True Speed",
            subtitleColor: "text-cyan-100",
          },
          {
            img: bannerImgThree,
            title: "STREET STYLE",
            titleColor: "text-amber-400",
            subtitle: "Define Your Own Rules",
            subtitleColor: "text-amber-100",
          },
          {
            img: bannerImgFour,
            title: "COMFORT REDEFINED",
            titleColor: "text-pink-500",
            subtitle: "Step Into The Future",
            subtitleColor: "text-pink-200",
          },
          {
            img: bannerImgFive,
            title: "LIMITED EDITION",
            titleColor: "text-emerald-400",
            subtitle: "Exclusive Drops Weekly",
            subtitleColor: "text-emerald-100",
          },
        ].map((slide, index) => (
          <div
            key={index}
            className="outline-none relative h-[600px] md:h-[800px] w-full"
          >
            <Image
              imgSrc={slide.img}
              className="w-full h-full object-cover opacity-80"
            />

            {/* Overlay Content for this specific slide */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
              <h1
                className={`${slide.titleColor} text-6xl sm:text-7xl md:text-[140px] font-black uppercase tracking-tighter text-center leading-[0.9] transition-colors duration-500`}
                style={{ textShadow: "0 8px 16px rgba(0,0,0,0.6)" }}
              >
                {slide.title}
              </h1>
              <p
                className={`${slide.subtitleColor} text-base sm:text-lg md:text-3xl font-bold mt-4 text-center tracking-wide transition-colors duration-500`}
                style={{ textShadow: "0 4px 8px rgba(0,0,0,0.6)" }}
              >
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
                <Link to="/products">
                  <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-base hover:bg-gray-200 transition">
                    Shop
                  </button>
                </Link>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                  Watch <FaPlay className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20 pointer-events-auto">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-transparent border-2 border-white flex justify-center items-center text-white hover:bg-white hover:text-black transition"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <FiPlay /> : <FiPause />}
        </button>
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-transparent border-2 border-white flex justify-center items-center text-white hover:bg-white hover:text-black transition"
          aria-label="Previous"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-transparent border-2 border-white flex justify-center items-center text-white hover:bg-white hover:text-black transition"
          aria-label="Next"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
