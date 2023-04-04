import React, { useState } from "react";
import CommonLayout from "../components/CommonLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { loginMedical } from "../api";
import ROUTE_MAP from "../routing/routeMap";
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
    <CommonLayout backFunction={handleStepChangeForLogin} logoutDisabled crossDisabled>
      <div className="flex flex-col px-5 py-8 items-center">
        <p className="text-secondary text-[34px] font-bold mt-5 lg:text-[45px] animate__animated animate__fadeInDown">
          Welcome Back
        </p>
        <p className="text-primary text-md lg:text-[20px] font-medium animate__animated animate__fadeInDown">
          Please enter your details
        </p>
        <div className="flex flex-col w-80 py-5 mt-5 lg:w-[70%] animate__animated animate__fadeInDown">
          <span className="text-secondary pl-0.5 pb-2">
            <FontAwesomeIcon icon={faUser} /> &nbsp;Username
          </span>
          <input
            type="text"
            placeholder="Enter username"
            className="border-2 border-primary p-3.5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-80 pt-3 lg:w-[70%] animate__animated animate__fadeInDown">
          <span className="text-secondary pl-0.5 pb-2">
            <FontAwesomeIcon icon={faLock} />
            &nbsp; Password
          </span>
          <input
            type="password"
            placeholder="Enter password"
            className="border-2 border-primary p-3.5 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key == "Enter") handleLogin();
            }}
          />
        </div>
        {error && (
          <span className="text-white animate__animated animate__headShake bg-rose-600 font-medium px-4 py-2 text-center mt-2">
            {error}
          </span>
        )}
        <Button
          text={"Sign In"}
          styles="w-80 lg:w-[70%] animate__animated animate__fadeInDown"
          onClick={handleLogin}
        />
        <p
          className="text-secondary py-5 animate__animated animate__fadeInDown"
          onClick={() => navigate(ROUTE_MAP.forgot_password)}
        >
          Forgot Password?
        </p>
      </div>
    </CommonLayout>
  );
};

export default LoginMedical;
