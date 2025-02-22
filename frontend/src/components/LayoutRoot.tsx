import React, { HTMLAttributes, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const LayoutRoot: React.FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ className = "",children, ...props }) => {
  return (
    <div className={`h-full rounded-box overflow-auto ${className}`} {...props}>
      <div className="overflow-hidden p-3">
        <div className="rounded-box">
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutRoot;
