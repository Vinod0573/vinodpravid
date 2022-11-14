import React, { useEffect, useState } from "react";
import "./ScheduleCampaignConfirm.css"
import popupIcon from "../../../../theme/assets/svg/campaign/popupIcon.svg"
import crossIcon from "../../../../theme/assets/svg/campaign/crossIcon.svg"
import axios from "axios";
import { SERVER_URL_CONNECTOR, SCHEDULER_URL} from "../../../../services/ApiRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import * as loginAction from "../../../../redux/onboarding/login/actions";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
function ScheduleCampaignConfirm(props) {
    const[allData , setAllData] = useState();
    const[disableScheduleBtn , setDisableScheduledBtn] = useState(false)
    const history=useNavigate();
    function closeContent(){
       props.close(false)
    }
    let  tokenZx=props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
          headers:{"Content-Type": "application/json" ,
       "x-access-token":tokenZx}
     };

  
 //for scheduling campaign --abhishek 
  
 const handleScheduleCampaign =() => {
     let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.SCHEDULE_CAMPAIGN}`
     let obj = {
        "campaignId":props.scheduleData?.id 
    
    }
   

      axios.post(url ,obj,headers ).then(
          resp =>  {  toast.success("Your Campaign is Scheduled")
                   closeContent()
                   if(resp.status==401){
                    history("/login");
                    props.setLoggedInUserInfo();
                  }
          
      }
      ).catch(
          err => {
            if(err.status==401){
                history("/login");
                props.setLoggedInUserInfo();
                setDisableScheduledBtn(false)
              }
      
            toast.error("Campaign is not Scheduled  error!")}
      )
 }
 
 // to get All data of campaign ---abhishek 
 useEffect(
     () => {
         let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.GET_CAMPAIGN_DAETAIL}`
         let obj = {
            "campaignId": props.scheduleData?.id 
         }
         axios.post(url,obj,headers).then(
             res => {
                 setAllData(res?.data?.data)
                 if(res.status==401){
                    history("/login");
                    props.setLoggedInUserInfo();
                  }
          
             }
         ).catch(
            err => {
                if(err.status==401){
                    history("/login");
                    props.setLoggedInUserInfo();
                  }
          
                console.log(err)}
         )
     },[props.scheduleData?.id]
 )
 
    return(
        <div className="schedule-campaign-confirm-wrapper">
        <div className="container">
            <div  className="cross-container"> <img className="img1" src={crossIcon} alt="x" onClick={closeContent} /></div>
            <img src={popupIcon} alt="i" />
            <div className="data">
              <div><p className="para">Campaign Name:<span className="spnx">{allData?.campaignName}</span></p></div>
              <div><p className="para">Max Attempt:<span className="spnx">{allData?.maxAttempts}</span></p> <p>Time:<span className="spnx">{allData?.time}</span></p></div>
              <div><p className="para">Preffered Time:<span className="spnx">{allData?.preferredTime}</span></p><p>Auto Dial:<span className="spnx">{allData?.autoDial}</span></p></div>
              <div><p className="para">Channels:<span className="spnx">{allData?.channels?.toString()}</span></p><p>Number of Accounts:<span className="spnx">{allData?.totalAccounts }</span></p></div>

            </div>
            <button onClick={() => { return handleScheduleCampaign()  , setDisableScheduledBtn(true) }} 
            className= {`btnxy ${disableScheduleBtn ? "disableBtnscheduler" : ""}` }>
              Schedule Campaign</button>
           
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
    )

    
}
const mapStateToProps = (state, ownProps) => {
    return {
    
      userLoginInfo: state.loginReducer.userLoginInfo,
    
    };
  };
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      Object.assign({}, loginAction),
      dispatch
    );
  };
  

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleCampaignConfirm);