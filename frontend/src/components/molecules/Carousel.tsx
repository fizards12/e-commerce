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
  wrapperClassName?: string;
  slideClassName?: string;
  showNavigation?: boolean;
  showPagination?: boolean;
  onSlideChange?: (index: number) => void;
} & Omit<SwiperProps, "onSlideChange">;

const Carousel: React.FC<CarouselProps> = ({
  slides = [],
  wrapperClassName = "",
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
    <div className={`${wrapperClassName} relative isolate px-5`}>
      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        loop={loop}
        pagination={showPagination ? { clickable: true } : false}
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
        <div className="flex justify-between absolute left-0 top-1/2 transform z-10 -translate-y-1/2 w-full">
          <NavigationButton
            direction="prev"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
          />
          <NavigationButton
            direction="next"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
          />
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
function NavigationButton({ Icon, ...props }: NavigationButtonProps) {
  return (
    <button className="btn btn-soft btn-circle" {...props}>
      {Icon ? <Icon size={24} /> : <>{props.direction === "prev" ? <BiLeftArrowAlt size={24}/> : <BiRightArrowAlt size={24}/>}</>}
    </button>
  );
}
