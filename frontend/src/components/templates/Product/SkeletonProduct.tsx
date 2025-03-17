import React from "react";

const SkeletonProduct: React.FC = () => {
  return (
    <div className="card card-compact bg-base-100 shadow-md">
      <div className="card-body">
        <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="flex items-center justify-center mt-4">
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="h-4 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
