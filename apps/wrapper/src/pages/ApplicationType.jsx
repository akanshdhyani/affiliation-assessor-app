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

  return (
    <>
   
    <CommonLayout back="/login" logoutDisabled backDisabled crossDisabled>
      

    <div className='py-10 md:py-20 lg:py-24 px-4'>
      <section className=" transition-all duration-300 hover:bg-white text-white hover:text-primary border-white border-2 font-medium py-3 mt-6 w-full text-[18px]"
>
        <Accordion title="BSC" content= {<Div/>} />
        <Accordion title="MSC" content={<Div/>} />
        <Accordion title="PBBSC" content={<Div/>} />
      </section>
    </div>

        

    </CommonLayout>
    
      
  </>
  );
};

export default ApplicationType;
