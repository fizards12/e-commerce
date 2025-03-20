import BestSelling from "../../../components/features/home/BestSelling";
import Categories from "../../../components/features/home/Categories";
import FlashSale from "../../../components/features/home/FlashSale";
import HomeCarousel from "../../../components/templates/HomeCarousel";
import { IProduct } from "../../../schemas/product";
import { useFetchProductsQuery } from "../../../stores/apis/products";

const Home = () => {
  const { data, error, isError } = useFetchProductsQuery({}, { refetchOnMountOrArgChange: true })
  const products: IProduct[] = data?.products;
  if(isError) throw error
  return (
    <div>
      <div className="container flex flex-col gap-5 mx-auto p-7">
        <HomeCarousel />
        <FlashSale products={products} />
        <Categories />
        <BestSelling products={products}/>
      </div>
    </div>
  );
};

export default Home;
