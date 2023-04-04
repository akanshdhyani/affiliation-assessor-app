import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";

import { loginMedical } from "../api";
import { setCookie } from "../utils";

const LoginMedical = ({ handleStepChangeForLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function userIsAdminForPortal(registrations) {
    const currentRegistration = registrations[0];
    return (
      currentRegistration !== null &&
      currentRegistration.roles.includes("Admin")
    );
  }

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Either username or password is missing");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const loginRes = await loginMedical(username, password);

    if (loginRes?.params?.errMsg && loginRes.responseCode == "FAILURE") {
      setError(loginRes?.params?.errMsg);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (loginRes.responseCode == "OK" && loginRes.result) {
      let loggedInUser = loginRes.result.data.user;
      setCookie("userData", loggedInUser);
      if (userIsAdminForPortal(loggedInUser.user.registrations)) {
        navigate(ROUTE_MAP.admin);
      } else {
        navigate(ROUTE_MAP.root);
      }
      return;
    }

    setError("An internal server error occured");
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <CommonLayout backFunction={handleStepChangeForLogin} backDisabled logoutDisabled>
      <div className="flex flex-col px-5 h-[calc(100vh-176px)] gap-5 overflow-y-auto">

        <div className="flex">
          <img src="/assets/affiliationHome.png" className="w-[64%] m-auto lg:h-60 lg:mt-[40px]" alt="illustration" />
        </div>

        <div className="flex flex-col w-80 lg:w-[70%] animate__animated animate__fadeInDown gap-6 mx-auto">
          <div className="flex flex-col gap-2">
            <div className="text-secondary text-[14px] font-medium">Enter Mobile number</div>
            <input
              type="text"
              placeholder="Enter phone number"
              className="border-2 border-primary p-3.5"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-secondary text-[14px] font-medium">Enter Password</div>
            <input
              type="password"
              placeholder="Enter password"
              className="border-2 border-primary p-3.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") handleLogin();
              }}
            />
          </div>
        </div>

        {
          error && (
            <span className="text-white animate__animated animate__headShake bg-rose-600 font-medium px-4 py-2 text-center mt-2">
              { error }
            </span>
          )
        }

        <Button
          text={"Sign In"}
          styles="w-80 lg:w-[70%] animate__animated animate__fadeInDown mx-auto bg-primary mt-2 border-primary text-white"
          onClick={handleLogin}
        />

        <Button
          text={"Reset Password"}
          styles="bg-white border-[#DBDBDB] border-1 text-[#535461] hover:text-[#535461] w-80 mx-auto mt-2"
          onClick={() => navigate(ROUTE_MAP.forgot_password)}
        />

        <Button
          text={"Read terms & conditions"}
          styles="bg-white border-white text-[#535461] hover:text-[#535461] w-80 mx-auto"
          onClick={() => navigate(ROUTE_MAP.terms_and_condition)}
        />
      </div>
    </CommonLayout>
  );
};

export default LoginMedical;
