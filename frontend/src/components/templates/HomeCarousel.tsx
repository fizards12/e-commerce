import Carousel from "../molecules/Carousel";
import banner1 from "../../assets/images/banner-1.png";
const slides = [
  <div
    className={`p-10 px-14 h-full relative isolate bg-primary/90 text-white rounded-lg`}
  >
    <div className="absolute -translate-y-1/2 -z-10 top-60 right-5 rotate-x-[75deg] w-64 h-52 bg-primary rounded-full" />
    <img
      src={banner1}
      className="h-full float-right animate-[fadeIn_1s_ease-in-out_1]"
      alt="Watch Product"
    />
    <div className="h-full ps-10">
      <h4>Best Deal Online on smart watches</h4>
      <h1 className="tracking-wider">SMART WEARABLE.</h1>
      <h5 className="!font-normal">UP to 80% OFF</h5>
    </div>
  </div>,
  <div
    className={`p-10 px-14 h-full relative isolate bg-purple-900 text-white rounded-lg`}
  >
    <div className="absolute -translate-y-1/2 -z-10 top-60 right-5 rotate-x-[75deg] w-64 h-52 bg-purple-800 rounded-full" />
    <img
      src={banner1}
      className="h-full float-right animate-[fadeIn_1s_ease-in-out_1]"
      alt="Watch Product"
    />
    <div className="h-full ps-10">
      <h4>Best Deal Online on smart watches</h4>
      <h1 className="tracking-wider">SMART WEARABLE.</h1>
      <h5 className="!font-normal">UP to 80% OFF</h5>
    </div>
  </div>,
  <div
    className={`p-10 px-14 h-full relative isolate bg-amber-600 text-white rounded-lg`}
  >
    <div className="absolute -translate-y-1/2 -z-10 top-60 right-5 rotate-x-[75deg] w-64 h-52 bg-amber-700 rounded-full" />
    <img
      src={banner1}
      className="h-full float-right animate-[fadeIn_1s_ease-in-out_1]"
      alt="Watch Product"
    />
    <div className="h-full ps-10">
      <h4>Best Deal Online on smart watches</h4>
      <h1 className="tracking-wider">SMART WEARABLE.</h1>
      <h5 className="!font-normal">UP to 80% OFF</h5>
    </div>
  </div>
];
const HomeCarousel = () => {
  return (
    <div>
      <Carousel slides={slides} autoplay={{delay: 3000}} speed={800} containerClass="h-72" />
    </div>
  );
};

export default HomeCarousel;
