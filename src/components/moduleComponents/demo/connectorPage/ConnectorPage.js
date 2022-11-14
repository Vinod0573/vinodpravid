import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DivComponent from "../buttonDivComponent/DivComponent";
import "./ConnectorPage.css";
import connectorIcon from "../../../../theme/assets/svg/demo/connectorsIcon.svg";
import paymentIcon from "../../../../theme/assets/svg/demo/paymentIcon.svg";
import crmIcon from "../../../../theme/assets/svg/demo/crmIcon.svg";
import CrmPage from "../crmPage/CrmPage";
import PaymentPage from "../paymentGatewayPage/PaymentPage";
import ChannelPage from "../channelPage/ChannelPage";
import CompaignPage from "../compaignManagerPage/CompaignManager"
import backIcon from "../../../../theme/assets/svg/demo/backIcon.svg"
import ProgressBar from '../../../generic/progressBar/ProgressBar'
// import * as dashboardActions from "../../../actions/dashboardActions";
import {setSelectedTab} from "../../../../redux/breadcrum/actions"
import demoConfig from "../demoConfig";



function ConnectorPage(props) {
  const [nextPagesArr, setNextPagesArr] = useState([]);
  const[nextcompaignPage , setnextcompaignPage] = useState(false)
  const dispatch =  useDispatch()
  const userLoginInfo = useSelector(
    (store ) => store.loginReducer.userLoginInfo
  );

  const selectedTab = useSelector(
    (store ) => store?.breadcrumReducer?.selectedTab
  )
  console.log("Slected" , selectedTab)
  const onclickNext = (name) => {
   
    setNextPagesArr([name]);
  };
  const onConnector =(data) => {
     setnextcompaignPage(prev => data)
  
  }
  let arr = ["Onboarding" , "Agent Configuration" ,"Integration" , "Campaign Manager" , "Campaign Execution"]
 

  useEffect(()=>{
    if(selectedTab=="Integration"){
    
      setNextPagesArr(prev=>[])
      dispatch(setSelectedTab(""))
      // setnextcompaignPage(true)
    }
  },[selectedTab])
  let accountName = userLoginInfo?.userDetail?.accountDetails[0]?.name?.toString().toLowerCase()
  let role = userLoginInfo?.userDetail?.role
  role = role?.toString().toLowerCase();


   let demoCon = demoConfig() 
  //  console.log("democonfigure" , demoCon[accountName][role]['integration']['filters']['hidden'] )
   let tempArrHide
    try{ 
      tempArrHide = demoCon[accountName][role]['integration']['filters']['hidden']
    }
    catch{
       tempArrHide = []
    }

  return (
    <div> 
      {nextcompaignPage ? <CompaignPage next = {onConnector}/> :  
      <div>
      {nextPagesArr?.length>0 ? (
        nextPagesArr[0] === "crm" ? (
          <CrmPage
            getData={()=>{setNextPagesArr()}}
          />
        ) : nextPagesArr[0] === "payment" ? (
          <PaymentPage 
          getData={()=>{setNextPagesArr()}} />
        ) :(
          <ChannelPage 
          getData={()=>{setNextPagesArr()}}/>
        )
      ) : (
        
        <div className="connectorPageWrapper">
          {/* <div className="backArrow"  > 
          <div>
          <img src={backIcon}
             onClick= {() =>props.prevPage(false)}
             className = "imgBackIcon"></img> 
             </div>
             </div> */}
              <div className='backArrow'>
           <div className='iconBack'>
        
           </div>
          {props.hideProgressBar ? "" :
           <div className='iconBack'
            onClick= {() =>props.prevPage(false)}
            >
          <img src={backIcon} 
          ></img>
          </div>
             }
          </div>
          <div className="">
            {/* <p className="heading"> */}
          
            {/* </p> */}
          </div>
          <div className="componentContainer">
          { !tempArrHide.includes("crm") && <div onClick={() => onclickNext("crm")}
              
               >
              <DivComponent   img={crmIcon} heading="CRM" 
                 />{" "}
            </div>
          }
          {!tempArrHide.includes("payment") && <div onClick={() => onclickNext("payment")}>
              {" "}
              <DivComponent img={paymentIcon} heading="Payment Gateway" />
            </div>
    }
      { !tempArrHide.includes("channel") &&  <div onClick={() => onclickNext("channel")}>
              <DivComponent img={connectorIcon} heading="Channel" />
            </div>
 }
          </div>
          {props.hideProgressBar ? "" :
          <div className="progressAndNextDiv"> 
            <div className="progressBar">
            <ProgressBar 
             arr = {arr}
             currentStep = {2}/>
               </div>
            <div className="btnContainer"> <button className="btn"
               onClick={() => setnextcompaignPage(true)}
            >Next</button></div>
          </div>
         }
        </div>
          
      )}
      </div>
       }
    </div>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     selectedTab :state.dashboardReducer.selectedTab,
//     userLoginInfo:state.loginReducer.userLoginInfo,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//       Object.assign({},dashboardActions,loginAction),
//       dispatch
//   );
// };
export default ConnectorPage;
