import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import ErrorElement from "./ErrorElement";

const Root = () => {
  return (
    <div className="flex h-screen transition-all">
      <Sidebar />
      <div className="flex w-full flex-col h-full">
        <Header />
        <div className="p-3 flex-1">
          <ErrorBoundary FallbackComponent={ErrorElement}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Root;
