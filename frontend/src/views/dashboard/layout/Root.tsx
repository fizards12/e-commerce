import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import ErrorElement from "./ErrorElement";

const Root = () => {
  return (
    <div className="bg-primary/10 max-md:drawer flex h-screen transition-all">
      <input id="my-drawer" type="checkbox" className="max-md:drawer-toggle md:hidden" />
      <Sidebar />
      <div className="flex max-md:drawer-content w-full flex-col overflow-auto">
        <Header />
        <div className="flex-1">
          <ErrorBoundary FallbackComponent={ErrorElement}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Root;
