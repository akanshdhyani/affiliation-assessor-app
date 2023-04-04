import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ButtonTwo } from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis , faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import ROUTE_MAP from "../routing/routeMap";
import Accordion from "../components/Accordion";

const MedicalAssessor = () => {
  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <>
   
    <CommonLayout back="/login" logoutDisabled backDisabled crossDisabled>
      <div className="flex flex-col px-5 py-12 items-center">
      

    

        <img
          src="/assets/account_circle.png"
          className="h-[70px] lg:h-[70px]"
          alt="illustration"
        />
        
        
        
        <p className=" lg:text-4xl text-secondary text-[24px] font-bold mt-8 lg:text-[45px] animate__animated animate__fadeInDown">
          Welcome Assessor
        </p>
        <p className="text-gray-600 text-[16px] mb-2 py-0 animate__animated animate__fadeInDown">
          Please check your assigned inspection
        </p>
        <hr />
        <div className="w-80 lg:w-[60%]  border-2 font-medium px-3 py-3 mt-6 w-full">
        <p className="text-gray-500 text-[12px]">
          Your Employee Identity Code
        </p>
        <p className="text-secondary py-1 text-[16px]">
          ID-909883
        </p>
        {/* <input type="text" className="px-1 text-secondary py-1 text-[16px]"/> */}
        </div>
        
        <Button
          text="Today's Inspections"
          styles="w-80 lg:w-[60%] animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.medical_assessments)}
        />
        <ButtonTwo
          text="Upcoming Inspections"
          styles="text-primary border-primary w-80 lg:w-[60%] bg-white animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.upcoming_medical_assessments)}
        />
        <ButtonTwo
          text="Past Inspections"
          styles="text-gray-600 border-gray-300 w-80 lg:w-[60%] bg-white animate__animated animate__fadeInDown"
          onClick={() => handleClick(ROUTE_MAP.upcoming_medical_assessments)}
        />
      </div>
      {/* <div className="sm:text-center lg:w-[60%] flex px-2 py-10 items-center position-absolute"> */}
    <div className="flex flex-row">
      <div className="flex align-center justify-content px-8">
    <span className="pl-10 pr-20 text-gray-600">
            <FontAwesomeIcon icon={faCircleQuestion} />
            &nbsp;Need help?
          </span>
         

           <span className="pl-20 text-gray-600">
            <FontAwesomeIcon icon={faEllipsis} />
            &nbsp; More
          </span>
          </div>
          </div>
          {/* </div> */}
<div>

</div>

    </CommonLayout>
    
      
  </>
  );
};

export default MedicalAssessor;
