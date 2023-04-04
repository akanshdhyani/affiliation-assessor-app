import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ButtonTwo } from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import ROUTE_MAP from "../routing/routeMap";
import Accordion from "../components/Accordion";
import Div from "../components/DivComponent";

const ApplicationType = () => {
  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <>
   
    <CommonLayout back="/login" logoutDisabled backDisabled crossDisabled>
      

    <div className='py-10 md:py-20 lg:py-24 px-4'>
      <section className=" transition-all duration-300 hover:bg-white text-white hover:text-primary border-white border-2 font-medium py-3 mt-6 w-full text-[18px]"
>
        <Accordion title="BSC" content= {<Div/>} />
        <Accordion title="MSC" content={<Accordion title="BSC in Nursing"/>} />
        <Accordion title="PBBSC" content={<Accordion title="BSC in Nursing"/>} />
      </section>
    </div>

        

    </CommonLayout>
    
      
  </>
  );
};

export default ApplicationType;
