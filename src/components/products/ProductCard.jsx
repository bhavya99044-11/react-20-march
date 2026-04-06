import React, { useId, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Rating from "./Rating";
import Button from "../common/Button";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const ProductCard = ({
  name,
  price,
  rating,
  reviews,
  images = [],
  onEdit,
  onLike,
  isLiked = false,
  slidesPerView = 1.3,
  centerImages = false,
  actionText = "Edit Product",
  showImageSlider = true,
}) => {
  const id = useId().replace(/[:]/g, "");
  const prevClass = `product-prev-${id}`;
  const nextClass = `product-next-${id}`;
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const updateNavState = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleCardClick = () => {
    onEdit?.();
  };
  return (
    <div
      className="bg-white hover:scale-105 pt-4 group duration-300 ease-in-out transition-transform rounded-xl shadow-sm cursor-pointer dark:bg-slate-900 dark:border dark:border-slate-800 h-full flex flex-col"
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        {showImageSlider ? (
          <>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.${prevClass}`,
                nextEl: `.${nextClass}`,
              }}
              slidesPerView={slidesPerView}
              loop={false}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavState(swiper);
              }}
              onSlideChange={updateNavState}
              className="relative z-0"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={name}
                    className={`h-[317px] object-contain ${centerImages ? "mx-auto" : ""}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Button
              text="❮"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                swiperRef.current?.slidePrev();
              }}
              type="button"
              variant="icon"
              useColorClasses={false}
              disabled={isBeginning}
              className={`absolute z-10 ${prevClass} left-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition pointer-events-auto dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800`}
            />

            <Button
              text="❯"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                swiperRef.current?.slideNext();
              }}
              type="button"
              variant="icon"
              useColorClasses={false}
              disabled={isEnd}
              className={`absolute z-10 ${nextClass} right-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 px-0 py-0 rounded-full text-gray-600 hover:bg-gray-300 transition pointer-events-auto dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800`}
            />
          </>
        ) : (
          <div className="flex h-[317px] items-center justify-center px-4">
            <img
              src={images[0]}
              alt={name}
              className={`h-[317px] object-contain ${centerImages ? "mx-auto" : ""}`}
            />
          </div>
        )}
      </div>

      <div className="mt-6 ml-6 pb-[23px] pr-4 flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100 truncate">
            {name}
          </h3>
          <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-[#F9F9F9] dark:bg-slate-800">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onLike?.();
              }}
              disabled={!onLike}
              className={`inline-flex h-6 cursor-pointer w-6 items-center justify-center ${
                isLiked ? "text-red-500" : "text-black dark:text-slate-200"
              }`}
              aria-label={isLiked ? "Unlike product" : "Like product"}
            >
              {isLiked ? (
                <MdFavorite className="h-5 w-5" />
              ) : (
                <MdFavoriteBorder className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <p className="text-blue-600 transition-transform ease-in-out duration-300 font-bold text-sm dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="mt-2">
          <Rating value={rating} count={reviews} />
        </div>

        <Button
          text={actionText}
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
          type="button"
          variant="custom"
          useColorClasses={false}
          className="mt-3 text-sm bg-[#E2EAF8] font-[700] px-[22px] py-[5px] rounded-[12px] hover:bg-gray-300 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 mt-auto self-start"
        />
      </div>
    </div>
  );
};

export default ProductCard;
