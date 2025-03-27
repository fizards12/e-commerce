import FeaturesCards from "../../../components/features/FeaturesCards";
import BestSelling from "../../../components/features/home/BestSelling";
import Categories from "../../../components/features/home/Categories";
import FlashSale from "../../../components/features/home/FlashSale";
import OurProducts from "../../../components/features/home/OurProducts";
import HomeCarousel from "../../../components/templates/HomeCarousel";
import { IProduct } from "../../../schemas/product";
import { useFetchProductsQuery } from "../../../stores/apis/products";
import banner1 from "../../../assets/images/banner-home.png";
const Home = () => {
  const { data, error, isError } = useFetchProductsQuery({}, { refetchOnMountOrArgChange: true })
  const products: IProduct[] = data?.products;
  if (isError) throw error
  return (
    <div>
      <div className="container flex flex-col gap-24 mx-auto p-7">
        <HomeCarousel />
        <FlashSale products={products} />
        <Categories />
        <BestSelling products={products} />
        {/* Banner */}
        <div className="w-full bg-indigo-900 relative rounded-box overflow-hidden p-8 py-20">
          <div className="absolute z-10 max-w-md w-full h-full top-0 py-16 flex flex-col gap-6 items-start">
            <p className="text-secondary">Categories</p>
            <div>
              <h1 className="text-white uppercase tracking-wide !font-semibold">Enhance Your Music Experience</h1>
              <p className="text-white text-sm mt-2">Use code <span className="font-semibold">FIRST50</span> to get 50% off on your first order</p>
            </div>
            <button className="btn btn-xl btn-primary">Shop Now</button>
          </div>
          <div className="max-w-lg ml-auto relative isolate">
            <div className="w-xl h-96 rounded-full bg-white/20 blur-3xl absolute -z-10"></div>
            <img src={banner1} className="w-full" />
          </div>
        </div>
        <OurProducts products={products} />
        <FeaturesCards />
      </div>
    </div>
  );
};

export default Home;
