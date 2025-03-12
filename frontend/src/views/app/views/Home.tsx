import FlashSale from "../../../components/features/home/FlashSale";
import HomeCarousel from "../../../components/templates/HomeCarousel";

const Home = () => {
  return (
    <div>
      <div className="container flex flex-col gap-5 mx-auto p-7">
        <HomeCarousel />
        <FlashSale />
      </div>
    </div>
  );
};

export default Home;
