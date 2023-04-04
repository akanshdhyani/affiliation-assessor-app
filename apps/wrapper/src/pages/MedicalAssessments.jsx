import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faBuilding, faUser, faPhone, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";

import { getMedicalAssessments } from "../api";
import { StateContext } from "../App";
import { getCookie } from "../utils";

const MedicalAssessments = () => {
  const inspection_data = {
    id: '12345',
    district: 'Ballari',
    instituteName: 'RYMEC',
    specialization: 'Engineering',
    courses: 'CSE, ECE, Mech, EEE',
    type: 'Engineering',
    pocs: [{
      name: 'Vinod Shyave', 
      number: '9743298498'
    }, {
      name: 'Praveen Shyave',
      number: '9654591151'
    }],
    address: '5V5R+2H5, Cantonment Bellary, Karnataka 583104',
    latitude: '15.144318792',
    longitude: '76.941914408',
  }

  const { state, setState } = useContext(StateContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isMobile = window.innerWidth < 500;
  const [role, setRole] = useState('');
  const [data, setData] = useState({
    district: "",
    instituteName: "",
    nursing: "",
    paramedical: "",
    type: "",
    latitude: null,
    longitude: null,
  });

  const startAssess = () => {
    setState({ ...state, todayAssessment: { ...data } });
    navigate(role == 'Medical' ? ROUTE_MAP.assessment_type : ROUTE_MAP.capture_location);
  };

  const getTodayAssessments = async () => {


    
    setLoading(true);



// API call starts here



    let apiBody = {
      "date":"2023-04-04"   
     }

    const apiCall = fetch(
      'http://staging.affiliation.samagra.io:8080/api/rest/getTodaysInspections',
      {
        method: 'POST',
        headers: {
          'Content-Type':"application/json",
      'Hasura-Client-Name':"hasura-console",
      'x-hasura-admin-secret':"myadminsecretkey",
      }
      ,
        body: JSON.stringify(apiBody)
      }
    ).then(

      resp => resp.json()

    ).then(
      json => {
        console.log(json)
        let poc = json.assessment_schedule[0].institute.institute_pocs;
        console.log("poc", poc);
        inspection_data.pocs = poc;
        console.log(this.inspection_data.pocs);
      }
    )


// API call ends here

   
    const res = await getMedicalAssessments();
    if (res?.data?.assessment_schedule?.[0]) {
      let ass = res?.data?.assessment_schedule?.[0];
      setData({
        id: ass.institute.id,
        district: ass.institute.district,
        instituteName: ass.institute.name,
        specialization: ass.institute?.institute_specializations?.[0]?.specializations,
        courses: ass.institute?.institute_types?.[0]?.types,
        type: ass.institute.sector,
        pocs: ass.institute.institute_pocs,
        address: ass.institute.address,
        latitude: ass.institute.latitude,
        longitude: ass.institute.longitude,
      });
    } else setData(null);

    setData(inspection_data);
    setLoading(false);
  };

  const handleNavigate = () => {
    alert(`lat - ${data.latitude} && long - ${data.longitude}`);
  }

  useEffect(() => {
    getTodayAssessments();
    const {
      user: { registrations },
    } = getCookie("userData");
    const roles = registrations[0]?.roles[0];
    setRole(roles);
  }, []);

  return (
    <CommonLayout back={ROUTE_MAP.root} pageTitle="Today's Inspection" logoutDisabled>
      <div className={`flex flex-col px-6 h-[calc(100vh-214px)] overflow-y-auto ${!data?.id ? 'justify-center' : '' }` }>
        {
          !loading && data && (
            <div className="flex flex-col bg-tertiary p-7 rounded-[8px] gap-3 animate__animated animate__fadeIn animate__slow">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-1xl lg:text-4xl text-gray-600" />
                  <div className="text-gray-500">Applicant name</div>
                </div>
                <div className="text-secondary text-[18px] font-medium">{ data?.instituteName }</div>
              </div>
              <hr className="border-slate-300" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                  <div className="text-gray-500">District</div>
                </div>
                <div className="text-secondary text-[18px] font-medium">{ data?.district }</div>
              </div>
              <hr className="border-slate-300" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faUser} className="text-1xl lg:text-4xl text-gray-600" />
                  <div className="text-gray-500">POC Names</div>
                </div>
                { 
                  data?.pocs?.map((el, idx) =>
                    <div className="mt-[4px] text-secondary text-[18px] font-medium" key={idx}>{ el.name }</div>
                  )
                }
              </div>
              <hr className="border-slate-300" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faPhone} className="text-1xl lg:text-4xl text-gray-600" />
                  <div className="text-gray-500">POC Numbers</div>
                </div>
                <div className="flex flex-row wrap">
                  { 
                    data?.pocs?.map((el, idx) =>
                      <div className="flex flex-col p-2 m-[4px] bg-[#DBDBDB;] grow items-center rounded-[8px] gap-2" key={idx}>
                        <div className="rounded-[50%] w-[36px] h-[36px] bg-[#009A2B;] flex items-center justify-center">
                          <FontAwesomeIcon icon={faPhone} className="text-1xl lg:text-4xl text-gray-600 text-white w-[16px]" />
                        </div>
                        <div className="text-secondary text-[18px] font-medium">{ el.number }</div>
                      </div>
                    )
                  }
                </div>
              </div>
              <hr className="border-slate-300" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                  <div className="text-gray-500">Address</div>
                </div>
                <div className="flex flex-row gap-7">
                  <div className="flex grow mt-[4px]">
                    <div className="text-secondary text-[18px] font-medium">
                      { data.address }
                    </div>
                  </div>
                  {
                    data.latitude && data.longitude &&
                    <div className="flex justify-center items-center" onClick={handleNavigate}>
                      <div className="flex grow-0 w-[60px] h-[60px] bg-[#DBDBDB;] justify-center items-center">
                        <FontAwesomeIcon icon={faLocationArrow} className="text-1xl lg:text-4xl text-gray-600 w-[24px] h-[24px]" />
                      </div>
                    </div>
                  }
                </div>
              </div>
              <Button text="Start Assessing" styles="border-primary text-white" onClick={startAssess} />
            </div>
          )
        }
        {
          !loading && !data && (
            <div className="flex flex-col">
              <div className="w-full bg-tertiary p-7 rounded-[8px]">
                <div className="text-secondary text-[24px] text-center font-medium">No Assessments Today!</div>
              </div>
            </div>
          )
        }
      </div>
    </CommonLayout>
  );
};

export default MedicalAssessments;
