import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InitiateCall.css";
import callIcon from "../../../../theme/assets/svg/demo/callIcon.svg";
import { useNavigate } from "react-router-dom";
import CallingProgress from "../../../generic/callingProgressBar/CallingProgress";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLeftModulesToVisibleAll } from "../../../../redux/baseScreen/leftMenu/actions";
import { RootState } from "../../../../redux/rootStore";

import {
  setIsActivePageType,
  setIsPageType,
  setLoggedInUserInfo,
} from "../../../../redux/onboarding/login/actions";
import axios from "axios";

function InitiateCall(props) {
  const moduleDetails = useSelector(
    (store) => store.baseScreen.leftMenu.moduleDetails
  );

  const [initiat, setInitiat] = useState(true);
  const [clearIntervalID, setClearIntervalID] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  // let tokendemoPage = window.sessionStorage.getItem("accessTokenDemoPage");
  // let tokenlogin = props.userLoginInfo?.userSessionDetails?.accessToken

  let setIntervalID;
  const hittingApicont = (url, data, time) => {
    clearInterval(setIntervalID);
    setIntervalID = setInterval(async () => {
      const res = await axios.post(url, data);
      const status = res?.data?.data?.message;
      if (status === "Calling Completed") {
        clearInterval(setIntervalID);
        setInitiat(false);
      }
    }, time);
  };
  //To hit api for calling status
  // useEffect(
  //     () => {
  //         let data = {
  //             "accessToken":tokendemoPage ? tokendemoPage : tokenlogin
  //         }

  //         // axios.post('https://connectors.saarthi.ai/campaign/api/campaignManagement/callingInfo/v1/status', data).then(
  //         //    data => {console.log(data.data.data.message)
  //         //       if( data.data.data.message=== 'Calling Completed'){
  //         //         setInitiat(false)
  //         //       }
  //         //   }
  //         // )
  //         hittingApicont('https://connectors.saarthi.ai/campaign/api/campaignManagement/callingInfo/v1/status', data,2000)

  //     },[]
  // )
  useEffect(() => {
    if (initiat === true) {
      props.tolast((prev) => true);
      setTimeout(async () => {
        dispatch(setLeftModulesToVisibleAll(moduleDetails));
        return (
          history("/calllogger"),
          await window.sessionStorage.setItem(
            "isActive",
            "conversation logger"
          ),
          await sessionStorage.setItem("pageType", "conversation logger"),
          // await dispatch(setIsActivePageType("conversation logger")),
          await dispatch(setIsPageType("conversation logger"))
        );
      }, 2000);
    }
  });

  const cancelPush = async () => {
    dispatch(setLeftModulesToVisibleAll(moduleDetails));
    return (
      history("/calllogger"),
      await window.sessionStorage.setItem("isActive", "conversation logger"),
      await sessionStorage.setItem("pageType", "conversation logger"),
      //    await dispatch(setIsActivePageType("conversation logger")),
      await dispatch(setIsPageType("conversation logger")),
      clearInterval(setIntervalID)
    );
  };
  return (
    <div className="InitiateCallWrapper">
      <div className="InitiateCallDiv">
        {/* <div className= "addBtnDiv">
                 <AddBtn/>
             </div> */}
        {initiat ? (
          <div className="initiate">
            <div className="initiatingCallBar">
              <img src={callIcon} width={"80px"}></img>

              <div className="bardiv">
                <p className="paraDiv"> Initiating Call</p>
                {/* <img src={callbar}></img> */}
                <CallingProgress />
              </div>
            </div>
          </div>
        ) : (
          <div className="callCompleteOuterDiv">
            <div className="callCompleteDiv">
              <img src={callIcon} width={"80px"}></img>
              <p className="paraDiv">Call Completed</p>
            </div>
          </div>
        )}
        <div className="buttoncancelLoggerdemo">
          <button className="cancelInbtn" onClick={() => cancelPush()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    userLoginInfo: state.loginReducer.userLoginInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(InitiateCall);
