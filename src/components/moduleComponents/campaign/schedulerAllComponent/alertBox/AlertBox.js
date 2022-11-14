import React, { useEffect, useState } from "react";
import "./AlertBox.css";
import alertIcon from "../../../../../theme/assets/svg/campaign/alertIcon.svg";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as loginAction from "../../../../../redux/onboarding/login/actions";
import {
  SERVER_URL_CONNECTOR,
  SCHEDULER_URL,
} from "../../../../../services/ApiRoutes";
import axios from "axios";
import clearCacheData from "../../../../../utils/clearCacheData";
import {useNavigate} from "react-router-dom"
function AlertBox(props) {
  const [maxAttempt, setMaxAttempt] = useState();

  const closeBox = () => {
    //    props.setCloseAlert()
    props.setCloseAlert();
  };
  const history=useNavigate();
  useEffect(() => {
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": tokenZx,
      },
    };

    let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.MAX_CALL_ATTEMPS}`;
    let obj = {
      id: props.id,
    };
    axios
      .post(url, obj, headers)
      .then((res) => {
        setMaxAttempt((prev) => res?.data?.data);
      })
      .catch((err) => {console.log(err)
        if(err.response.status==401){
         
          history.push("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
          }
      });
  }, [props?.id]);

  return (
    <div className="alertBoxSchedulerWrapper">
      <div className="alertBoxOuterDiv">
        {/* <div className='crossBtn'><img src={crossIcon }
             onClick= {() => closeBox()} alt=""/>
             </div> */}
        <div className="imgContainerDiv">
          <img src={alertIcon} alt="" />
        </div>
        <div className="firstMsg">
          <p> Maximum {maxAttempt} calls can be made in selected timespan.</p>
        </div>
        <div className="noteDiv">
          <p>
            {" "}
            <span className="note">Note: </span>
            This number is calculated considering maximum values you can
            continue to<br></br> add more accounts
          </p>
        </div>
        <div className="buttonDiv">
          <button
            className="btnStyle"
            onClick={() => {
              props.uploadData();
            }}
          >
            Upload Data
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
      
      userLoginInfo: state.loginReducer.userLoginInfo
     
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      Object.assign({},  loginAction),
      dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
