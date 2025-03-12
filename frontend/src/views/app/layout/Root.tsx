import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorElement from "../../dashboard/layout/ErrorElement";

const Root = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorElement}>
      <div>
        <Header />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default Root;
