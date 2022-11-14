import React, { useEffect, useState } from "react";
import "./UseCaseScreen.css";
import DivComponent from "../../../moduleComponents/demo/buttonDivComponent/DivComponent";
import debtIcon from "../../../../theme/assets/svg/campaign/debtCollectionIcon.svg";
import leadIcon from "../../../../theme/assets/svg/campaign/leadCollection.svg";
import bfsIIcon from "../../../../theme/assets/svg/campaign/bfsiIcon.svg"
import DiallerSection from "../diallerSection/DiallerSection";
import backIcon from "../../../../theme/assets/svg/campaign/backicon.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as schedulerAction from "../../../../redux/campaign/scheduler/actions";
import * as filterAction from "../../../../redux/filter/actions";
import * as loginAction from "../../../../redux/onboarding/login/actions";
import * as omniAction from "../../../../redux/omniChannel/actions";
import { SERVER_URL , SCHEDULER_URL , OMNICHANNEL} from "../../../../services/ApiRoutes";
import axios from "axios";
import { format } from "date-fns";
function UseCaseScreen(props) {
  const [useCasePage , setUseCasePage] = useState(true)
  const[useCaseData, setUseCaseData] = useState()
  

  const moveToPrevious = (isEdit) => {
      setUseCasePage(true)
  }
  const nextPageCreate =(data) => {
    props.storeSelectedUsecase(data)
    setUseCasePage(prev => false)
  }
  let arr = [
    {
      name: "Debt Collection",
      img: debtIcon,
    },
    {
      name: "Lead Generation",
      img: leadIcon,
      coming: "coming",
    },
  ];


useEffect(
  () => {
    props.setCampaignEditOrCreateType("create");
    let  from_date =  format(new Date(), "yyyy-MM-dd")
    let  to_date=   format(new Date(), "yyyy-MM-dd")

    props.setDateFilterData({ fromDate: from_date, toDate: to_date });
    props.setSelectedCampaignCredentials()
    props.storeTime()
    props.storeSelectedDialTime()
    props.setAllCampaignChannelData()
    props.storeSedulerSettingDataWhatsApp()
    props.getTemplatesWhatsApp() 
    props.getMindMap()
    props.setSelectedDispositionDataWP([])
    props.storeSeparateSelectedDataWP([])
    props.setSelectedDispositionDataChildWP([])
    props.shuffledConnectedSuccedingWP([])
    props.shuffledNotConnectedSuccedingWP([])
    props.setDCBdataforwhatsAppflowupTime("remove")
    props.setDCBdataforwhatsApp("remove")
  
  },[useCasePage])
  useEffect(
    () => {
     
      axios.get(`${SERVER_URL}${SCHEDULER_URL.GET_USECASE_API}`).then(
        res =>  {setUseCaseData(res?.data?.data)}
      )
    },[]
  )
  useEffect(
    () => {
      props.storeUsecase(useCaseData)
    },[useCaseData]
  )
    useCaseData?.map((e ,i) => {
        e["img"] = arr[i]["img"]
        e["coming"]= arr[i]["coming"]
    })
//storeSelectedUsecase
  // for hide initial screen 
  useEffect(
    () => {
      if(props.userLoginInfo?.userDetail?._id) {
       let obj ={
        "userId": props.userLoginInfo?.userDetail?._id,
        "moduleName":"Campaign"
       }
       axios.post(`${OMNICHANNEL.HIDE_INITIAL_SCREEN}` ,obj).then(
         res => console.log(res)
       )
    }
  }
    ,[props.userLoginInfo?.userDetail?._id]
  )


  return (
    useCasePage ?
    <div className="userScreenSchedulerWrapper">
      <div>
        <div className="backIcon" onClick={() => props.prevPage()} ><img src={backIcon} className="icon"></img></div>
        <div className="firstHeadContainer">
        <div className="bfsiDiv">
              <img alt="pic" src = {bfsIIcon }></img>
               <p>BFSI</p>
          </div>
          <div className="headingUserCaseDiv">
              Select Usecase
          </div>
        </div>
        <div className="divComponentContainer">
          {useCaseData?.map((e) => {
            return (
              <div onClick={()=>  e.useCasename ==="Debt Collection" ?  nextPageCreate(e) : ""}>
                <DivComponent
                  heading={e.useCasename}
                  img={e.img}
                  coming={e.coming ? e.coming : null}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
    :  <DiallerSection
       previous={()=>{moveToPrevious()}}
         EditData={[]} 
       isCreate={true}
    />
  );
}
const mapStateToProps = (state, ownProps) => { 
  return {
      
    userLoginInfo:state.loginReducer.userLoginInfo,
  
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      Object.assign({}, campaignAction, schedulerAction, filterAction , loginAction , omniAction ),
      dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(UseCaseScreen);

