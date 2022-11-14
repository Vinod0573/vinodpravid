import React, { useEffect, useState } from "react";

import "./Channels.css";
import Button from "../../../generic/button/Button";
import { ToastContainer, toast } from "react-toastify";
import Whatsapp from "./whatsapp/whatsapp";
import WhatsappHeader from "./whatsapp/whatsappHeader";
import Email from "./email/email";
import EmailHeader from "./email/emailHeader";
import SMS from "./sms/sms";
import SMSHeader from "./sms/smsHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setPageNo} from "../../../../redux/integration/actions"
import {
  emailValidation,
  nameValidation,
  phoneNumberValidation,
  webValidation,
} from "../../../../utils/Validation";

function Channels(props) {
  const [header, setHeader] = useState("email");
  const [step, setStep] = useState("1");
  const [saveData, setSaveData] = useState([]);
  const [cdata, setCdata] = useState([]);
  const [isBtnClick, setIsBtnClick] = useState(false);

  const handleViewButtonClick = () => {
    if (step == 1 && props.showData == "WhatsApp") {
      setStep((prev) => 2);
      props.setPageNo(2);
    } else {
      if (props.showData == "WhatsApp") {
        toast.success(
          "Your request has been generated you will receive a response within 48 hours!"
        );
      }
      if (props.showData == "Email") {
        setIsBtnClick(true);
        toast.success(
          "Your request has been generated you will receive a response within 48 hours!"
        );
        setSaveData([]);
      }
      if (props.showData == "SMS") {
        setIsBtnClick(true);
        toast.success(
          "Your request has been generated you will receive a response within 48 hours!"
        );
        setSaveData([]);
      }
    }
  };

  const back = () => {
    props.setBack();
  };

  useEffect(() => {
    setStep((prev) => props.pageNo);
  }, [props.pageNo]);

  const getDataList = (data) => {
    setSaveData(data);
  };
  
  const notAllCheckEmail = function (params) {
    //for email
    let det = !(
      phoneNumberValidation(params["POC Contact Number"]).isValid &&
      nameValidation(params["POC Name"]).isValid &&
      emailValidation(params["POC Email ID"]).isValid &&
      emailValidation(params["Sender Email ID"]).isValid &&
      emailValidation(params["Reply Email ID"]).isValid
    );
    return det;
  };
  const notAllCheckSMS = function (params) {
    
    let det = !(
      phoneNumberValidation(params["POC Contact Number"]).isValid &&
      nameValidation(params["POC Name"]).isValid &&
      emailValidation(params["POC Email ID"]).isValid &&
      phoneNumberValidation(params["Sender Phone Number"]).isValid&&
      nameValidation(params["Display Name"]).isValid
    );
    return det;
    
  };

  const notAllCheckW1 = function (params) {
    
    let det = !(
   emailValidation(params["Email"]).isValid&&
   webValidation(params["Website"])
      
    );

    return det;
  };

  const notAllCheckW2 = function (params) {
   
    let det = !(
      phoneNumberValidation(params["contact"]).isValid &&
      nameValidation(params["POC Name"]).isValid &&
      emailValidation(params["Email"]).isValid &&
      phoneNumberValidation(params["Phone"]).isValid
    );
    return det;
  };

    
  return (
    <div className="topDiv">
      {/* <Sidebar /> */}

      <div className="channel-wrapper">
        <div className="channel-header">
          {props.showData == "WhatsApp" ? (
            <WhatsappHeader stepData={step} goBack={back} />
          ) : props.showData == "Email" ? (
            <EmailHeader getStep={step} goBack={back} />
          ) : props.showData == "SMS" ? (
            <SMSHeader getStep={step} goBack={back} />
          ) : (
            ""
          )}
        </div>
        <div className="client-card">
          <div className="card">
            <div className="div-elements">
              {props.showData == "WhatsApp" ? (
                <Whatsapp receiveData={(data) => getDataList(data)} />
              ) : props.showData == "Email" ? (
                <Email receiveData={(data) => getDataList(data)} isBtnClick={isBtnClick}  />
              ) : props.showData == "SMS" ? (
                <SMS receiveData={(data) => getDataList(data)} isBtnClick={isBtnClick} />
              ) : (
                ""
              )}
              <div className="channels-btn">
                <Button
                  className="whtasapp-btn"
                  text={
                    props.showData == "Email"
                      ? "Submit"
                      : props.showData == "SMS"
                      ? "Submit"
                      : props.showData == "WhatsApp" && step == 1
                      ? "Next"
                      : "Submit"
                  }
                  onClick={() => handleViewButtonClick()}
                  disabled={
                    (props.showData == "Email" && notAllCheckEmail(saveData)) ||
                    (props.showData == "SMS" && notAllCheckSMS(saveData)) ||
                    (props.showData == "WhatsApp" && notAllCheckW1(saveData)&& step == 1) ||
                    (props.showData == "WhatsApp" && notAllCheckW2(saveData)&&step==2) ? true: false
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={true}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    pageNo: state.integrationReducer?.pageNo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, setPageNo), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Channels);