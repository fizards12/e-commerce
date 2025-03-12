import FlashSale from "../../../components/features/home/FlashSale";
import HomeCarousel from "../../../components/templates/HomeCarousel";

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <div className="container mx-auto">
        <FlashSale />
      </div>
    </div>
  );
};

export default Home;
