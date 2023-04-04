import React from "react";

import Button from "./Button";

export const Div = ({ text, onClick, styles = "", css }) => {
  return (
    <>
      <div className="w-80 lg:w-[60%] py-1 font-medium mt-6 w-full">
        
          <div className="flex flex-row">
            <div className="flex align-center justify-content px-2">
            <span>
              <p className="text-black  py-1  text-[16px]">BSC in Nursing</p>
              </span>
              <span>
                   
        {/* <Button
          text="CONTINUE"
          styles="border-gray-500 border-radius-30 bg-gray-500 w-30 lg:w-[60%] animate__animated animate__fadeInDown"
          // onClick={() => handleClick(ROUTE_MAP.medical_assessments)}
        /> */}
              </span>
            </div>
          </div>
        
      </div>
      <hr className="border-gray-300 border-1" />
      <div className="w-80 lg:w-[60%] py-1 font-medium mt-6 w-full">
        <span>
          <div className="flex flex-row">
            <div className="flex align-center justify-content px-2">
              <p className="text-black  py-1 text-[16px]">
                BSC in Radiiological Imaging Techniques
              </p>
            </div>
          </div>
        </span>
      </div>
      <hr className="border-gray-300 border-1" />
    </>
  );
};

export default Div;
