import React, { useState, useEffect, JSX } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperInstance } from "swiper/types";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { IconType } from "react-icons/lib";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

type CarouselProps = {
  slides?: React.ReactNode[];
  containerClass?: string;
  slideClassName?: string;
  showNavigation?: boolean;
  showPagination?: boolean;
  onSlideChange?: (index: number) => void;
} & Omit<SwiperProps, "onSlideChange">;

const Carousel: React.FC<CarouselProps> = ({
  slides = [],
  containerClass = "",
  slideClassName = "",
  autoplay = false,
  showNavigation = true,
  showPagination = true,
  spaceBetween = 16,
  loop = true,
  onSlideChange,
  children,
  ...swiperProps
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  // Handle both children and slides prop
  const slideContent =
    slides.length > 0 ? slides : React.Children.toArray(children);
  const slidesIds = slideContent.map((_, index) => `slide-${index}`);
  // Setup modules based on props
  const modules = [];
  if (showNavigation) modules.push(Navigation);
  if (showPagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);

  useEffect(() => {
    // Notify parent component when slide changes
    if (onSlideChange) {
      onSlideChange(activeIndex);
    }
  }, [activeIndex, onSlideChange]);

  if (!slideContent.length) {
    return null;
  }

  return (
    <div className={`${containerClass} relative isolate`}>
      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplay}
        className={`${swiperProps.className || ""} h-full`}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        {...swiperProps}
      >
        {slideContent.map((slide, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional: Add custom controls if needed */}
      {showNavigation && (
        <>
          <div className="absolute -left-7 top-1/2 z-10 transform -translate-y-1/2">
            <NavigationButton
              direction="prev"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous slide"
            />
          </div>
          <div className="absolute -right-7 top-1/2 z-10 transform -translate-y-1/2">
            <NavigationButton
              direction="next"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next slide"
            />
          </div>
        </>
      )}
      {showPagination && (
        <div className="absolute bottom-4 left-1/2 z-10 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {slideContent.map((_, index) => (
              <button
                key={slidesIds[index]}
                onClick={() => swiperInstance?.slideTo(index)}
                className={`cursor-pointer transition-[width] size-2 rounded-full bg-white ${
                  activeIndex === index ? "w-6" : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;

type NavigationButtonProps = JSX.IntrinsicElements["button"] & {
  direction: "prev" | "next";
  Icon?: IconType;
};
function NavigationButton({
  Icon,
  className,
  ...props
}: NavigationButtonProps) {
  return (
    <button
      className={"btn btn-soft btn-accent btn-circle btn-xl " + className || ""}
      {...props}
    >
      {Icon ? (
        <Icon size={24} />
      ) : (
        <>
          {props.direction === "prev" ? (
            <BiLeftArrowAlt size={24} />
          ) : (
            <BiRightArrowAlt size={24} />
          )}
        </>
      )}
    </button>
  );
}
