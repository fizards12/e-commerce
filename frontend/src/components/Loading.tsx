import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-y-1/2 inset-x-1/2 flex items-center justify-center">
      <div className=" animate-spin inline-block w-8 h-8 border-b-4 border-blue-500 rounded-full" role="status">
        <span className="invisible">Loading</span>
      </div>
    </div>
  );
};

export default Loading;
