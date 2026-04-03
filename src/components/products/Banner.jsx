import React, { useId, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import classNames from "classnames";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const ProductsBanner = ({
  slides = [
    {
      dateRange: "September 12–22",
      titleLines: "Enjoy free home  delivery in this summer",
      subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
      buttonText: "Get Started",
    },
  ],
}) => {
  const id = useId().replace(/[:]/g, "");
  const prevClass = `products-banner-prev-${id}`;
  const nextClass = `products-banner-next-${id}`;
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div
      className={classNames(
        "",
      )}
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="relative"
      >          <SwiperSlide key={1}>
                  <div onClick={()=>navigate('/spin-wheel')} className="cursor-pointer">
                   <img
                    src='images/final-banner.png'
                      alt="Spin Wheel Banner"
                      style={{ width: '1212px', height: '394px' }}
                    />
                    </div>
                </SwiperSlide>
        {/* {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <p className="text-sm sm:text-base opacity-80 font-semibold leading-6 sm:leading-[30px] mb-2">
              {slide.dateRange}
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-[37px] leading-8 sm:leading-10 lg:leading-[48px] max-w-[420px] font-[900] mb-2">
              {slide.titleLines}
            </h2>

            <p className="text-sm sm:text-base leading-6 sm:leading-[30px] font-semibold opacity-80 mb-6 sm:mb-[30px]">
              {slide.subtitle}
            </p>

            <Button
              text={slide.buttonText}
              variant="custom"
              useColorClasses={false}
              className="bg-[#FF8743] hover:bg-orange-600 w-32 sm:w-[156px] flex items-center font-bold py-2 rounded-[11px] transition"
            />
          </SwiperSlide>
        ))} */}
      </Swiper>

      <div
        className="absolute inset-0 bg-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/images/curves.png')" }}
      ></div>
      <Button
        text="❮"
        aria-label="Previous"
        onClick={() => swiperRef.current?.slidePrev()}
        variant="icon"
        useColorClasses={false}
        className={`absolute z-10 ${prevClass} left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition hidden sm:flex dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800`}
      />
      <Button
        text="❯"
        aria-label="Next"
        onClick={() => swiperRef.current?.slideNext()}
        variant="icon"
        useColorClasses={false}
        className={`absolute z-10 ${nextClass} right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition hidden sm:flex dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800`}
      />
    </div>
  );
};

export default ProductsBanner;
