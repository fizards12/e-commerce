import React from "react";
import { Link } from "react-router-dom";
import { GeneralError } from "../../../services/error";
import notFound from "../../../assets/images/notFound.png";
interface ErrorFallbackProps {
  error?: GeneralError;
  resetErrorBoundary?: () => void;
}
const ErrorElement: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div className="p-3">
      <div className="hero h-full bg-white rounded-box shadow-lg">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <img src={notFound} alt="404" />
             <h5 className="py-6">{error ? error.message : 'Page Not Found'}</h5>
            <Link to="/dashboard" className="btn btn-primary">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
