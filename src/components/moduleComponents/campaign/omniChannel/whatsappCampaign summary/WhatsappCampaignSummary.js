import React, { useEffect, useState } from "react";
import "../../configurecampaign/ConfigureCampaign.css";
import languageIcon from "../../../../../theme/assets/svg/demo/template.svg";
import campaignTypeicon from "../../../../../theme/assets/svg/demo/communicationIcon.svg";
import agentTypeIcon from "../../../../../theme/assets/svg/campaign/campaignType.svg";
import dateRangeIcon from "../../../../../theme/assets/svg/demo/clockOmni.svg";
import EditIcon from "../../../../../theme/assets/svg/demo/editIcon.svg";
import channelIcon from "../../../../../theme/assets/svg/demo/channelIcon.svg";
import campaignNameIcon from "../../../../../theme/assets/svg/demo/campaignNameIcon.svg";
import callunActive from "../../../../../theme/assets/svg/campaign/callunActive.svg";
import callActive from "../../../../../theme/assets/svg/campaign/callActive.svg";
import whatsAppunActive from "../../../../../theme/assets/svg/campaign/whatsAppUnActive.svg";
import whatsAppActive from "../../../../../theme/assets/svg/campaign/whatsAppActive.svg";
import emailunActive from "../../../../../theme/assets/svg/campaign/emailunActive.svg";
import smsunActive from "../../../../../theme/assets/svg/campaign/smsunActive.svg";
import dateActive from "../../../../../theme/assets/svg/demo/dateIcon.svg";
import clockActive from "../../../../../theme/assets/svg/demo/clockActive.svg";
import MultiSelectDropdown from "../../schedulerAllComponent/MultiSelectDropdown";
import MultiSelectDrop from "../../omniChannel/multiDropdownOmni/MultiSelectDropdown";
import downArrow from "../../../../../theme/assets/svg/campaign/dropdownIconDown.svg";
import moment from "moment";
import ChannelOmni from '../channelBtnOmni/channelOmni'
import Button from "../../../../generic/button/Button";
import "./WhatsappCampaignSummary.css";
import ErrorMessage from "../../../../generic/errorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../../redux/breadcrum/actions";
import { isArray } from "lodash";

function WhatsappCampaignSummary(props) {
  const [selectCommunication, setSelectCommunication] = useState();
  const [selectTemplate, setSelectTemplate] = useState();
  const [newCampaignName, setNewCampaignName] = useState();
  const [errMessageCamp, setErrMessageCamp] = useState();
  const [selectedChannel, setSelectedChannel] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [whatsappChannelData,setWhatsappChannelData]=useState([])

  const onChangeCommunication = (data) => {
    if (selectCommunication == data) {
      setSelectCommunication((prev) => null);
    } else {
      setSelectCommunication((prev) => data);
    }
  };
  const onChangeselectTemplate = (item) => {
    setSelectTemplate((prev) => item);
    // setHidebtn(true)
  };
  const templateOptions = {
    imgSrcRight: downArrow,
    imgSrcleft: "",
    // placeHolderText:  selectedLanguage?.length ?  selectedLanguage?.[0]+(selectedLanguage?.length>1 ? ("+".concat(selectedLanguage?.length-1)) : ""): "Select"
    placeHolderText: selectTemplate?.length
      ? selectTemplate?.toString()?.length > 16
        ? selectTemplate[0].length > 16
          ? selectTemplate[0].substring(0, 16) + "..."
          : selectTemplate[0]
        : selectTemplate
      : "Select Template",
  };

  const langOptions = {
    imgSrcRight: downArrow,
    imgSrcleft: "",
    // placeHolderText:  selectedLanguage?.length ?  selectedLanguage?.[0]+(selectedLanguage?.length>1 ? ("+".concat(selectedLanguage?.length-1)) : ""): "Select"
    placeHolderText: selectedLanguage?.length
      ? selectedLanguage?.length > 16
        ? selectedLanguage.substring(1, 8)
        : selectedLanguage
      : "Select Language",
  };

  let arrChannelOmni = [
    { name: "Call", imgActive: callActive, imgUnActive: callunActive },
    {
      name: "WhatsApp",
      imgActive: whatsAppActive,
      imgUnActive: whatsAppunActive,
    },
    {
      name: "Mail",
      imgActive: emailunActive,
      imgUnActive: emailunActive,
      disable: true,
    },
    {
      name: "SMS",
      imgActive: smsunActive,
      imgUnActive: smsunActive,
      disable: true,
    },
  ];
  const format1 = "h:mm a";
  const now = moment().hour(0).minute(0);

  const campaignDetails = useSelector((store) => {
    return store.campaignReducer.campaignSelectedData;
  });

  const omniChannelDetails = useSelector((store) => {
    return store.omniChannelReducer.storedschedulerSettingwhatsApp;
  });

  const breadCrumData = useSelector((store) => {
    return store.breadcrumReducer.breadCrumData;
  });

  const summaryPhase = useSelector((store) => {
    return store.breadcrumReducer.selectedPhase;
  });

  const campaignData= useSelector((store)=>{
    return store.campaignReducer.campaignAllCampaignChannelData
  })
 

  useEffect(() => {
    if(campaignData?.length>0){
      campaignData?.map((er)=>{
        if(isArray(er?.channels) && er?.channels?.[0]=="WhatsApp"){
          setSelectedChannel(["WhatsApp"]);
          setNewCampaignName(er?.campaignName);
          setSelectedLanguage(er?.language);
          setWhatsappChannelData(er)
        }
      }).filter(et=>et)

    }

  }, [campaignData]);

  useEffect(() => {
    setSelectCommunication(omniChannelDetails?.communication);
    setSelectTemplate(omniChannelDetails?.template);
  }, [omniChannelDetails]);

  const clockTime = useSelector((store) => {
    return store.omniChannelReducer.storedschedulerSettingwhatsApp;
  });
  const loginDetails = useSelector((store) => {
    return store.loginReducer;
  });


  const shuffledConnectedSucceding = useSelector((store) => {
    return store?.omniChannelReducer?.shuffledConnectedSuccedingWP;
  });
  const shuffledNotConnectedSucceding = useSelector((store) => {
    return store?.omniChannelReducer?.shuffledNotConnectedSuccedingWP;
  });
  const flowUpDBCdata =  useSelector((store) => {
    return store.omniChannelReducer.dcbDataWhatsApp;
  });

  const numberOfFollowUp =  useSelector((store) => {
    return store.omniChannelReducer.numberOfFollowUp;
  });
  

 let succeeding_connected= shuffledConnectedSucceding?.map((each, i) => {
    let tempArr = [];

    return {
      text: each.text,
      priority: i + 1,
      respKey: each.respKey,
      retryTime:
      each.retryHrTime ? Number(each.retryHrTime * 60) +
         Number(each.retryMinTime) : 120 ,
    };
  })
  let succeeding_not_connected =shuffledNotConnectedSucceding?.map(
    (each, i) => {
      let tempArr = [];
      return {
        text: each.text,
        priority: i + 1,
        respKey: each.respKey,
        retryTime:
        each.retryHrTime ? Number(each.retryHrTime * 60) +
          Number(each.retryMinTime) : 120,
      };
    }
  )



  console.log("flowUp",whatsappChannelData?.id )


  const sendWhatsappDetails = () => {
    let  tokenZx=loginDetails?.userLoginInfo?.userSessionDetails?.accessToken;
    let payload = {
      campaignId: whatsappChannelData?.id,
      channel: whatsappChannelData?.channels?.[0].toLowerCase(),
      preferredTime: false,
      dialTimeData: {
        languages: whatsappChannelData?.language,
        agent_type: whatsappChannelData?.campaignType[0],
        communication: omniChannelDetails?.communication,
        templates: omniChannelDetails?.templatesId,
        mindmap_url: omniChannelDetails?.mindMapLink,
        schedule_date_start: omniChannelDetails?.startDate,
        schedule_date_end: omniChannelDetails?.endDate,
        schedule_time: omniChannelDetails?.time?.am?Number(omniChannelDetails.time.hour)*60+ Number(omniChannelDetails.time.minute) :(Number(omniChannelDetails.time.hour)+12)*60 + Number(omniChannelDetails.time.minute),
        templateName:omniChannelDetails?.template
      },
      dispositionBasedCallingData : {
        followUpAttributes : {
          "noOfFollowups": numberOfFollowUp,
          followupInterval : flowUpDBCdata 
        },
        succeeding_connected : succeeding_connected ,
        succeeding_not_connected : succeeding_not_connected
      }
    }
    props.sendWhatsappDetails(tokenZx,payload)
  };




  return (
    <div className="whatsappOmniWrapperModal">
      <div className="OuterDiv">
        <div className="HeaderDiv">
          <div className="header-name">Whatsapp Campaign Summary</div>
          <div className="edit-icon">
            <img
              src={EditIcon}
              onClick={() => {
                // props.hideSummaryScreen(false)
                props.storeSelectedBreadcrum(breadCrumData[0]);
              }}
            />
          </div>
        </div>

        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={campaignNameIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">Campaign Name:</h2>
          </div>
          <div className="heightCampName">
            <input
              type="text"
              className={`inputNameCamp ${
                !newCampaignName?.length ? "colorPlaceholder" : ""
              }`}
              placeholder="Campaign Name"
              value={newCampaignName}
              disabled={true}
            />
            {errMessageCamp?.length && (
              <div>
                <ErrorMessage errorMessage={errMessageCamp} />
              </div>
            )}
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={channelIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">Channels:</h2>
          </div>
          <div className="dropDownDiv dropDownDivChannel">
            {/* {arrChannelOmni?.map((e) => {
              return ( */}
                {/* selectedChannel?.includes(e.name?.toLowerCase()) && ( */}
                  <div className="channelBtns">
                    <ChannelOmni
                      name={"WhatsApp"}
                      imgActive={whatsAppActive}
                      imgUnActive={whatsAppunActive}
                      // onselect={clickedBtn}
                      outSideSelect={selectedChannel?.includes("WhatsApp")}
                      disable={true}
                    />
                  </div>
                {/* ) */}
              {/* );
            })} */}
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={languageIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">Language:</h2>
          </div>
          <div className="dropDownDiv">
            <MultiSelectDropdown
              options={langOptions}
              toBeFilterData={["abhishek", "sss"]}
              extraSelectedClass="languageDropdown"
              getFilteredData={(value) => onChangeselectTemplate(value)}
              key="dispositionMultiSelectOne"
              selectedDataOutside={selectedLanguage}
              extraPlaceHolderStyle="placeholderMultiStyleAgent"
              isDisable={true}
            />
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={agentTypeIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">Agent Type:</h2>
          </div>

          <div className="dropDownDiv">
            {campaignDetails.campaignType[0] == "AI Driven" && (
              <div className="agent-staticDiv">
                <p>AI Driven</p>
              </div>
            )}
            {campaignDetails.campaignType[0] == "Human Driven" && (
              <div className="agent-staticDivHuman">
                <p>Human Driven</p>
              </div>
            )}
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={campaignTypeicon} width={"50px"} alt="img"></img>
            <h2 className="heading">Communication</h2>
          </div>
          <div className="dropDownDiv">
            {selectCommunication == "One way" && (
              <div
                className={
                  selectCommunication == "One way"
                    ? "staticDiv"
                    : "staticDivHuman"
                }
                // onClick={() => onChangeCommunication("One way")}
              >
                <p>One way</p>
              </div>
            )}
            {selectCommunication == "Two way" && (
              <div
                className={`${
                  selectCommunication == "Two way"
                    ? "staticDiv"
                    : "staticDivHuman"
                } gapBtn `}
                // onClick={() => onChangeCommunication("Two way")}
              >
                <p>Two way</p>
              </div>
            )}
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={languageIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">Template</h2>
          </div>
          <div className="dropDownDiv">
            <MultiSelectDrop
              options={templateOptions}
              toBeFilterData={["abhishek", "sss"]}
              extraSelectedClass="languageDropdown"
              getFilteredData={(value) => onChangeselectTemplate(value)}
              key="dispositionMultiSelectOne"
              selectedDataOutside={selectTemplate}
              extraPlaceHolderStyle="extraPlaceHolderStyle"
              isDisable={true}
            />
          </div>
        </div>
        <div className="ContainDiv">
          <div className="logoNameDiv">
            <img src={dateRangeIcon} width={"50px"} alt="img"></img>
            <h2 className="heading">When to Schedule</h2>
          </div>
          <div className="dropDownDiv">
            <div className="midDate time-clr">
              <img src={dateActive} />
              &nbsp;&nbsp;
              {moment(clockTime.startDate).format("MMM DD") +
                " - " +
                moment(clockTime.endDate).format("MMM DD")}
            </div>
            <div className={"midDate gapBtn time-clr"}>
              <img src={clockActive} />
              &nbsp;
              {clockTime.time.hour +
                " " +
                ":" +
                " " +
                clockTime.time.minute}{" "}
              {clockTime.time.am ? "AM" : "PM"}
            </div>
          </div>
        </div>
      </div>

      <div className="buttonSubmit">
        <Button
          text="Submit"
          extraClass={"submitOmni"}
          onClick={() => {
            let data = summaryPhase;
            data?.["whatsapp"]?.push("Scheduler Settings");
            sendWhatsappDetails();
            props.setSchedulerPhase(data);
            props.storeSelectedBreadcrum("Data Upload");
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, breadcrumActions), dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatsappCampaignSummary);
