import React from "react";

function Loader() {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center max-w-full">
      <div className="w-[8vmax]  animate-spin h-[8vmax] border-b-[5px] border-b-[#565252] rounded-[50%]"></div>
    </div>
  );
}

export default Loader;
