import React from "react";

const SkeletonProduct: React.FC = () => {
  return (
    <div className="h-56 w-40 shadow-xs p-3 flex flex-col gap-2">
      <div className="h-24 w-full skeleton"></div>
      <div className="w-1/2 h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full h-4 skeleton"></div>
      <div className="w-full flex-1 skeleton"></div>
    </div>
  );
};

export default SkeletonProduct;
