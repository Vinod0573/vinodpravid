import React, { useState, useEffect } from "react";

import Axios from "axios";

import clearCacheData from "../../../../utils/clearCacheData";
import "./CreateCampaignModel.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterAction from "../../../../redux/filter/actions";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as loginAction from "../../../../redux/onboarding/login/actions";
import * as breadcrumActions from "../../../../redux/breadcrum/actions";
import * as schedulerAction from "../../../../redux/campaign/scheduler/actions";
import Screen from "../screen/Screen";
import {useNavigate} from "react-router-dom";
import Button from "../../../generic/button/Button";
import CampaignDetails from "../campaigndetails/CampaignDetails";

import {
  SERVER_URL_CONNECTOR,
  CAMPAIGN_URL,
  DEMO_SERVER_URL,
  DEMO_URL,
} from "../../../../services/ApiRoutes";
import ConfigureCampaign from "../configurecampaign/ConfigureCampaign";

const CreateCampaignModel = (props) => {
  const [showDownloadedUi, setShowDownloadedUi] = useState(true);
  const [isError, setIsError] = useState();
  const [campaignId, setCampaignId] = useState();
  const [selectedDetails, setSelectDetails] = useState("");
  const [campaignName, setCampaignName] = useState(() =>
    props.campaignCredentials ? props.campaignCredentials?.campaignId : ""
  );
  const [toHideupload, setToHideupload] = useState();
  const [campaignData, setCampaignData] = useState({});
  const [disButton, setDisButton] = useState(true);
  const [errMsg , setErrMsg] = useState()
  const[disableNextBtn , setDisableNextBtn] = useState(false)

  const [isToggleActive, setIsToggleActive] = useState(() =>
    props.campaignSelectedData ? props.campaignSelectedData?.isActive : true
  );

  
  const accountType = props.userLoginInfo?.accountDetails[0]?.type;
  let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
  let headers = {
    headers: { "Content-Type": "application/json", "x-access-token": tokenZx },
  };
  const history = useNavigate();
  useEffect(() => {
    setCampaignData((prev) => {
      return {
        ...props.campaignSelectedData,
      };
    });
    let temp = {
      id: props.campaignSelectedData?.id,
      name: props.campaignSelectedData?.campaignId,
    };

    // props.setCreatedCampaignIdName(temp);
  }, [props.campaignSelectedData]);

  
  const handleClickCreateCampaign = () => {
    props.shuffledCallingCondition([])
    const campaignBodyData = {
      ...campaignData,
    };

    if (props.campaignEditUpdateType === "edit" ) {

      if(toHideupload){
      let id = campaignData?.["id"];
      // if(id?.length){
      //   campaignData["mode"] = "update"
      // }
      campaignData["mode"] =  props.updateMode
      if (!id?.length) {
        //props.campaignIdName?.id;
        campaignData["id"] =  props.allIdsEdit
        // campaignData["mode"] = "create"
      }
      const urlUpdate = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.UPDATE_CAMPAIGN}`;

      Axios.post(urlUpdate, campaignData, headers)
        .then((res) => {
          if (res?.status == 401) {
            history("/login");
            props.setLoggedInUserInfo();
          }
          console.log("update" ,res?.data?.data)
          if (res?.data?.data) {
            toast.success("Campaign updated successfully!");
            //setEnableSaveBtn(true)
         // abhishek ---two campaign update 
         console.log("update data " ,res?.data )
         props.setAllCampaignChannelData(res?.data?.data)
         let tempChannel =[]
         let allomniChannel = res?.data?.data?.map(
           e => {
             if(e?.channels){
               return tempChannel?.push(...e?.channels)
             }
        }
         ) 
         props.setAllChannelArray(tempChannel) 
         let calldata = res.data.data?.map(
          e => {
               if(e?.channels?.includes("Call")){
                 return e
               }
          }
    )?.filter(o => o)
  
         // ---end
            props.setSelectedCampaignCredentials(calldata[0]);
            let restArr = res.data.data?.map(
              e => {
                if(e?.campaignId){
                  setCampaignName((prev) => e?.campaignId);
                }
              }
            )
        
            setDisButton(false);
            // setToHideupload((prev) => true);
          }
          if(res?.status==401){
            props.setLoggedInUserInfo();
            history("/login");
            
          }
          //for next button
          setDisableNextBtn(false)
          clickNextButtonInconfig()
        })
        .catch((err) => {
          console.log("catch err" ,err)
          if(err.status==401){
            props.setLoggedInUserInfo();
            history("/login");
          }
        
          if(err?.response?.data?.error){
            setErrMsg(prev => err?.response?.data?.error )
            toast.error(err?.response?.data?.error );
          }
          else{
            toast.error("Campaign Updation not successful");
          }
          setDisableNextBtn(false)
        });}
        else{
          clickNextButtonInconfig()
        }
    } else {
      props.setSelectedCallingData([])
      props.setSelectedDispositionData([])
      props.setSelectedDispositionDataParent([])
      props.setSelectedDispositionDataChild([])
      props.selectedDataRetryTime([])
      const urlCreate = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.CREATE_CAMPAIGN}`;
      if (!props.filteredDateRangeData) {
        return;
      }

      Axios.post(urlCreate, campaignBodyData, headers)
        .then((res) => {
          
          if (res?.data) {
            let tmLength = res?.data?.data?.length - 1;
          
        //abhishek -- two campaignLogic 
        let callCampaign = res?.data?.data?.map(
              e => {
                   if(e?.channels?.includes("Call")){
                     return e
                   }
              }
        )?.filter(o => o)
        let allIdsForEdit = res?.data?.data?.map(
          e => {
               if(e?.id){
                 return e?.id
               }
          }
          )
          let whatsAppCampaign = res?.data?.data?.map(
            e => {
              if(e?.channels?.includes("WhatsApp")){
                return e
              }
         }
          ) 
          let tempChannel =[]
          let allomniChannel = res?.data?.data?.map(
            e => {
              if(e?.channels){
                return tempChannel?.push(...e?.channels)
              }
         }
          ) 

  
     props.setCreatedCampaignAllIdEdit(allIdsForEdit)
     props.setAllChannelArray(tempChannel) 

        //----end

            setCampaignName(callCampaign?.[0]?.campaignId);
            setCampaignId(callCampaign?.[0]?.id);
            let temp = {
              id: callCampaign?.[0]?.id,
              accountId: callCampaign?.[0]?.accountId,
              name: callCampaign?.[0]?.campaignId,
            };
           
            props.setCreatedCampaignIdName(temp);
            props.setSelectedCampaignCredentials(callCampaign?.[0]);
            props.setCreatedCampaignIdNameEdit({
              id:callCampaign?.[0]?.id,
            });
            props.setCampaignEditOrCreateType("edit");
            props.setAllCampaignChannelData(res?.data?.data)
            toast.success("Campaign created successfully!");
            setErrMsg()
            if(!callCampaign?.[0]?.campaignId){
              setCampaignName(whatsAppCampaign?.[0]?.campaignId);
             }
          }
          //for next button
          setDisableNextBtn(false)
          clickNextButtonInconfig()
        })
        .catch((err) => {
         
          if(err?.response?.status==401){
            history("/login");
            clearCacheData();
            window.location.reload();
            props.setLoggedInUserInfo();
            }
            if(err?.response?.data?.error){
              setErrMsg(prev => err?.response?.data?.error )
              toast.error(err?.response?.data?.error );
            }
            else{
              toast.error(err?.message);
            }
            setDisableNextBtn(false)
        });
    }
  };

  const handleClickUploadData = () => {
    if (accountType === "External") {
      props.storeSelectedBreadcrum("Data Upload");
    } else {
      props.storeSelectedBreadcrum("Scheduler Settings");
    }
    // setShowDownloadedUi((prev) => false);
    setSelectDetails(props?.EditData);
  };

  const moveToPrevious = () => {
    props.previous();
  };

  const handleMoveBack = () => {
    setShowDownloadedUi((prev) => true);
  };

  const [fetchData, setFetchData] = useState();
  const [postEmiName, setPostEmiName] = useState([]);

  let fetchUrl = `${DEMO_SERVER_URL}${DEMO_URL.FETCH_POSTEMI}`;
  useEffect(
    () =>{ Axios.post(fetchUrl, { flowName: ["Post-Due"] }).then((data) => {
        return setFetchData(data?.data?.data?.[0].subFlow);
      }) },
    []
  );
  useEffect(() => {
    let temp =
      fetchData?.length &&
      fetchData.map((e) => {
        return e.name;
      });
    setPostEmiName((prev) => temp);
  }, [fetchData]);

  const getToggleData = (checked) => {
    let temp = checked;
    setIsToggleActive((prevState) => checked);
    let tempBodyData = {
      id: props?.EditData?.id,
      isActive: checked,
    };
    // var tempObj = Object.assign(campaignData)
    // tempObj.isActive = !temp
    // setCampaignData(tempObj)
    if (props.campaignEditUpdateType === "edit") {
      Axios.post(
        `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/campaignManagerInfo/v1/update`,
        tempBodyData,
        headers
      )
        .then((res) => {
          if (res.status == 401) {
            history("/login");
            props.setLoggedInUserInfo();
          }
          if (res?.data) {
            if (checked === true) {
              toast.success("Campaign activated successfully!");
            } else {
              toast.success("Campaign inactivated successfully!");
            }
          }
        })
        .catch((err) => {
          if (err?.status == 401) {
            history("/login");
            props.setLoggedInUserInfo();
          }
          if (!temp == true) {
            toast.error("Campaign cannot be activated!");
          } else {
            toast.error("Campaign cannot be inactivated");
          }

          if(err.status==401){
            history("/login");
            props.setLoggedInUserInfo();
          }
          // setShowButton(false)
        });
    }
  };
  const clickNextButtonInconfig =() => {
    handleClickUploadData();
    props.updateData("Scheduler Settings");
    // props.storeSelectedDialTime()
  }
  
  return (
    <>
      <div className="createCampaignModelWrapper">
        {/* {props.campaignEditUpdateType === "edit"&&
      <DiallerSection />} */}
        {showDownloadedUi ? (
          <div>
            <div className="createCampaignModelHeader">
              {/* <div
                className="backIcon"
                onClick={() => {
                  moveToPrevious();
                }}
                // style={{ width: "40%", display: "flex" }}
              >
                <img className="back-img-jp" src={BackIcon} alt="back img" />
              </div> */}

              {/* <div>
                <h3 className="titleCpCPM">
                  {" "}
                  {props.campaignEditUpdateType === "edit"
                    ? "Campaign Updation"
                    : "Campaign Creation"}
                </h3>
              </div> */}
              {/* <div
                className={`${
                  props.campaignEditUpdateType === "edit"
                    ? ""
                    : "disablePointerEventUniversaljp"
                } ${isToggleActive ? "" : "disableMakeBlurUniversaljp"}`}
              >
                <ToggleSwitch
                  id="createCamMT"
                  checked={isToggleActive}
                  onChange={(checked) => getToggleData(checked)}
                  //disabled={props.campaignEditUpdateType === 'create' ?  true : false}
                />
              </div> */}
            </div>
            <div className="createCampaignModelWrapperConfig">
              {/* <div style={{ paddingLeft: "5%", paddingBottom: "1.5vmax" }}>
                <h3> Configure </h3>
              </div> */}
              <div className="ccConfiguration">
                <ConfigureCampaign
                  postEmiName={postEmiName}
                  fetchData={fetchData}
                  campaign={true}
                  url={fetchUrl}
                  disableButton={setDisButton}
                  EditData={props.EditData}
                  toHideupload={toHideupload}
                  toSetHideupload={setToHideupload}
                  errMessage = {errMsg}
                />
              </div>
              <div className="ccConfigRightSide">
                <Button
                  disabled={disButton || disableNextBtn }
                  text={
                    // props.campaignEditUpdateType === "edit"
                    //   ? "Update Campaign"
                    //   : "Create Campaign"
                    "Next"
                  }
                  extraClass={
                   ( disButton || disableNextBtn )
                      ?  "ccColorUploadDataButtonStyleJp" : "ccUploadDataButtonStyleJp"
                  }
                  onClick={() =>{return  handleClickCreateCampaign() , setDisableNextBtn(true) }}
                  // image_src={createCampaignIcon}
                />
                {/* <Button
                    disabled={campaignName ? false : true}
                    text=" Next"
                    extraClass={
                      campaignName
                        ? "ccUploadDataButtonStyleJp"
                        : "ccColorUploadDataButtonStyleJp"
                    }
                    onClick={() => {
                      clickNextButtonInconfig()
                    }}
                  /> */}
              </div>
            </div>
            {/* {
              <div className="ccUploadArea">
                <div className="ccCampaignName">
                  <h3 style={{ paddingBottom: "10px" }}> Campaign Name: </h3>
                  <div className="cccamapignNameArea">
                    <p className={campaignName ? "" : "colorCampaignNamePara"}>
                      {campaignName
                        ? campaignName
                        : "-----------------------------------------------"}
                    </p>
                  </div>
                </div>
                <div className="ccUploadButton">
                  <Button
                    disabled={campaignName ? false : true}
                    text=" Next"
                    extraClass={
                      campaignName
                        ? "ccUploadDataButtonStyleJp"
                        : "ccColorUploadDataButtonStyleJp"
                    }
                    onClick={() => {
                      clickNextButtonInconfig()
                    }}
                  />
                </div>
              </div>
            } */}
          </div>
        ) : (
          <>
            {accountType == "External" ? (
              <div>
                <CampaignDetails toBack={() => handleMoveBack()} />
              </div>
            ) : (
              <div>
                <Screen
                  selecteDetails={selectedDetails}
                  presstoBack={() => handleMoveBack()}
                  newaccoutId={props.campaignIdName?.accountId}
                  campaignCredentials={props.campaignCredentials}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    campaignSelectedData: state.campaignReducer?.campaignSelectedData,
    campaignIdName: state.campaignReducer?.campaignIdName,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    campaignEditUpdateType: state.campaignReducer?.campaignEditUpdateType,
    campaignCredentials: state.campaignReducer?.campaignCredentials,
    allIdsEdit: state.campaignReducer?.campaignAllIdEdit,
    updateMode : state.campaignReducer?.campaignUpdateMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      {},
      filterAction,
      campaignAction,
      loginAction,
      breadcrumActions,
      schedulerAction
    ),
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaignModel);
