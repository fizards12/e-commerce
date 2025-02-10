import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Wrapper from "../../../components/atoms/Wrapper/Wrapper";

const Root = () => {
  return (
    <div className="flex h-screen transition-all">
      <Sidebar />
      <div className="flex w-full flex-col h-full">
        <Header />
        <Wrapper className="flex-1" cardClassName="p-0 bg-transparent shadow-none rounded-none">
            <Outlet />
        </Wrapper>
      </div>
    </div>
  );
};

export default Root;
