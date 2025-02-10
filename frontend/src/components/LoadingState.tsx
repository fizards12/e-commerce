import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RootState } from "../stores";

const LoadingState = () => {
  const { loading } = useSelector((state: RootState) => state.app);
  return (
    loading && (
      <div className="fixed bg-black/50 z-50 overflow-hidden w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    )
  );
};

export default LoadingState;
