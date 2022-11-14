import React from "react";

import "./LogIn.css";

import LoginFields from "../.././../components/moduleComponents/onBoarding/login/loginField/LoginFields";
import pravidelogo from "../../../theme/assets/svg/login/pravidDemoMainlogo.svg";


import belowImg from "../../../theme/assets/svg/login/belowImg.svg";


const LogIn = (props) => {

  return (
    <>
      <div className="loginProWrapperjp">
        <div className="loginProjp">
          <div className="loginHeadLogo">
            <img src={pravidelogo} alt="SaarthiLog" className="imgLogo" />
          </div>
          <div className="loginProflex">
            {/* <div className='loginPravidFImg'>
                        <img src={pravidFeatureImg} alt="feature img" className='pravidFeatureImg'/>
                    </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                position: "relative",
                width: "100%"
              }}
            >
              <img
                src={belowImg}
                alt="feature img"
                className="pravidFeaBelowImg"
              />
              <LoginFields setToken ={props.setToken} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;