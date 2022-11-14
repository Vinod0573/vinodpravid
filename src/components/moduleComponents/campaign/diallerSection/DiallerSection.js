import React, { useEffect, useState } from "react";
import Breadcrum from "../../../generic/breadcrumCampaign/Breadcrum";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../redux/breadcrum/actions";
import Checkbox from "../../../generic/checkbox/Checkbox";
import "./DiallerSection.css";
import CallingCondition from "./callingCondition/callingCondition";
import DialTimeModal from "../../../moduleComponents/campaign/schedulerAllComponent/dialTimeModal/DialTimeModal";
import CreateCampaignModel from "../../../moduleComponents/campaign/createcampaignmodel/CreateCampaignModel";
import DataUpload from "../dataupload/DataUpload";
import UploadCampaignDetails from "../uploadcampaigndetails/UploadCampaignDetails";
import DispositionBasedCalling from "./dispositionBasedCalling/DispositionBasedCalling";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as schedulerAction from "../../../../redux/campaign/scheduler/actions";
import ToggleSwitch from "../../../generic/toggleSwitch/ToggleSwitch";
import StartTimeEndTime from "../../../moduleComponents/campaign/startTimeEndTime/StartTimeEndTime";
import PriorityDropdown from "../../../generic/priorityDropdown/PriorityDropdown";
import downArrow from "../../../../theme/assets/svg/campaign/priorityDropdownIcon.svg";
import SameDayComponent from "../../../moduleComponents/campaign/samedayComponent/SameDayComponent";
import { SERVER_URL, SCHEDULER_URL } from "../../../../services/ApiRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import AlertBox from "../../../moduleComponents/campaign/schedulerAllComponent/alertBox/AlertBox";
import DialTimeAccord from "../../../moduleComponents/campaign/schedulerSections/DialTimeAccord";
import PreferredTimeAccord from "../../../moduleComponents/campaign/schedulerSections/PreferredTimeAccord";

import CallingConditionAccord from "../../../moduleComponents/campaign/schedulerSections/CallingConditionAccord";
import DCBAccord from "../../../moduleComponents/campaign/schedulerSections/DCBAccord";
import NavigationChannel from "../../../moduleComponents/campaign/omniChannel/navigation/NavigationChannel";
import * as omniChannelAction from "../../../../redux/omniChannel/actions";
import WpSettingPage from "../../../../screens/campaign/schedulerSettingPageWp/WpSettingPage";
import { isArray } from "lodash";

function DiallerSection(props) {
  let userType = props.userLoginInfo?.accountDetails[0].type;
  const [breadcrumData, setBreadcrumData] = useState([]);
  const [isTabSelected, setIsTabSelected] = useState([]);
  const [listData, setListData] = useState([]);
  const [selectedBreadcrum, setSelectedBreadcrum] =
    useState("Campaign Creation");
  const [toggle, setToggle] = useState(
    props.schedulerData?.preferredTime
      ? props.schedulerData?.preferredTime
      : false
  );
  const [prefered, setPrefed] = useState();
  const [toggleData, setToggleData] = useState(false);
  const [dispositionData, setDispositionData] = useState([]);
  const [callingListData, setCallingListData] = useState([]);
  const [selectedPer, setSelectedPer] = useState();
  const [callingData, setCallingData] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [port, setPort] = useState(0);
  const [hourChangeData, setHourChangeData] = useState({});
  const [minChangeData, setMinChangeData] = useState({});
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [selectNavChannel, setSelectNavChannel] = useState();

  const dispositionType = useSelector((store) => {
    return store.schedulerReducer?.dispositionType;
  });

  const selectedDispositionData = useSelector((store) => {
    return store.breadcrumReducer?.selectedDispositionData;
  });

  const campaignEditUpdateType = useSelector((store) => {
    return store.campaignReducer?.campaignEditUpdateType;
  });

  const schedulerStoreData = useSelector((store) => {
    return store?.schedulerReducer;
  });

  const handleChange = (each, name, i) => {
    let tempArr = dispositionData;
    if (!tempArr.includes(name)) {
      tempArr.push(name);
    } else {
      const index = tempArr.indexOf(name);
      if (index > -1) {
        tempArr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setDispositionData((prev) => tempArr);
    // props.setSelectedDispositionData(tempArr);
    let connectedArr = [];
    let notConnectedArr = [];
    let dataVal = tempArr.map((each) => {
      if (each.includes("nc")) {
        notConnectedArr.push(each);
      } else {
        connectedArr.push(each);
      }
    });
    props.storeSeparateSelectedData({
      connected: connectedArr,
      notConnected: notConnectedArr,
    });

    // checkBoxChecked("Disposition Based Calling");
    getToggleData(toggleData);
  };

  const handleCallingChange = (e, name, i) => {
    let tempVal = callingData;
    if (!tempVal.includes(name)) {
      tempVal.push(name);
    } else {
      const index = tempVal.indexOf(name);
      if (index > -1) {
        tempVal.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setCallingData((prev) => tempVal);
    // props.setSelectedCallingData(tempVal);
    // if(breadCrumReducerData?.selectedCallingData.includes("Due Date")){
    //   let tempArr=breadCrumReducerData.callingCondition
    //   let tempVal=[]
    //   tempVal.insert()
    //   props.setCallingCondition(breadCrumData?.callingCondition)
    // }
    settingAccordData(listData);
  };

  // const setRetryTime=()=>{
  //   let temp=[]
  //     let tempArr=Object.assign([],props.dispositionData.template)
  //     let finalValue=tempArr.map((each)=>{
  //       if(each.respKey==propsValue.respKey){
  //         temp.push({
  //           priority:,
  //           respKey:each.respKey,
  //           retryTime:
  //         })
  //       }
  //     })
  // }

  const getModifiedData = (respKey, time, type) => {
    let tempVal = Object.assign([], props.dispositionData);
    tempVal["template"].map((er) => {
      if (er.respKey == respKey) {
        er[type] = time;
        return er;
      } else {
        return er;
      }
    });

    // props.setDCBData(tempVal);
  };

  const hourChange = (hourValue, propsValue) => {
    getModifiedData(propsValue.respKey, hourValue, "retryHrTime");
  };

  const minChange = (minValue, propsValue) => {
    getModifiedData(propsValue.respKey, minValue, "retryMinTime");
  };

  const getToggleData = (data) => {
    let value =
      dispositionType == "Not Connected"
        ? dcbData?.template?.filter((val) => {
            return val.groupKey == "not_connected";
          })
        : dcbData?.template?.filter((val) => {
            return val.groupKey == "connected";
          });
    if (data || props.schedulerData?.preferredTime) {
      let result = value?.map((each, i) => {
        return {
          condition: each.text,
          respKey: each.respKey,
          selectComponent: (
            <Checkbox
              extraSpan={
                dispositionData.includes(each.respKey)
                  ? "multi-border"
                  : "multi-border-bs"
              }
              checked={dispositionData.includes(each.respKey) ? true : false}
              onChange={(e) => handleChange(each, each.respKey, i)}
            />
          ),
        };
      });
      setListData((prev) => result);
      settingAccordData(result);
    } else {
      let result = value?.map((each, i) => {
        return {
          condition: each.text,
          respKey: each.respKey,
          component: (
            <StartTimeEndTime
              value={each}
              handleHourChange={hourChange}
              handleMinChange={minChange}
            />
          ),
          selectComponent: (
            <div className="checkbox-margin-bottom">
              <Checkbox
                extraSpan={
                  dispositionData.includes(each.respKey)
                    ? "multi-border"
                    : "multi-border-bs"
                }
                checked={dispositionData.includes(each.respKey) ? true : false}
                onChange={(e) => handleChange(each, each.respKey, i)}
              />
            </div>
          ),
        };
      });
      setListData((prev) => result);
      settingAccordData(result);
    }
  };

  const checkBoxChecked = (data) => {
    // console.log(data);
    // if (data == "Disposition Based Calling") {
    //   let tempData = isChecked;
    //   tempData.push(data);
    //   setIsChecked(tempData);
    // } else if (data == "Calling Condition") {
    //   let tempData = isChecked;
    //   tempData.push(data);
    //   setIsChecked(tempData);
    // } else if(data=="Dial Time"){
    //   let tempData = isChecked;
    //   tempData.push(data);
    //   setIsChecked(tempData);
    // }
  };

  const settingAccordData = (result) => {
    var cList = props.callingData?.condition?.map((each, i) => {
      return {
        condition: each.text,
        respKey: each.respKey,
        component:
          each.type == "Dropdown" ? (
            <PriorityDropdown
              droplist={{
                optionList: each.value,
                parentData: each,
                imgSrcRight: downArrow,
                placeHolderText:
                  each.value.toString().length > 16 ? (
                    <>
                      <span className={`data-section`}>{each.value[0]}</span>
                      <span>...</span>
                    </>
                  ) : (
                    each.value.map((er) => {
                      return (
                        <span key={i} className={`data-section`}>
                          {er}
                        </span>
                      );
                    })
                  ),
              }}
              // isFilter={true}
              searchUi={false}
              handleSearchItem={selectedPer}
              selectedItem={(item) => onChangePer(item)}
              extraClassSelectedArea={"preEmidropdown"}
              extraClassToBeSelectedArea={"dropdowndListArea"}
            />
          ) : (
            <SameDayComponent />
          ),
        selectComponent: (
          <Checkbox
            extraSpan={
              callingData?.includes(each.text)
                ? "multi-border"
                : "multi-border-bs"
            }
            checked={callingData?.includes(each.text) ? true : false}
            onChange={(e) => {
              handleCallingChange(e, each.text, i);
              // checkBoxChecked("Calling Condition");
            }}
          />
        ),
      };
    });
    setAccordData((prev) => [
      {
        title: "Dial Time",
        component: <DialTimeModal setCheckBox={checkBoxChecked} />,
        isChecked: false,
      },
      // { title: "Preferred Timing", component:null },
      {
        title: "Preferred Time",
        component: null,
        subComponent: (
          <>
            <ToggleSwitch
              id="preferedTime"
              checked={
                schedulerStoreData?.["dialtimeData"] &&
                schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                  ? schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                  : toggle
              }
              optionLabels={["on", "off"]}
              small={true}
              onChange={(checked) => handleDisableToggleSwitch(checked)}
            />
            <span>{toggle ? "On" : "Off"}</span>
          </>
        ),
        isChecked: "true",
      },
      {
        title: "Calling Condition",
        component: (
          <CallingCondition
            selectedData={callingData}
            callingData={cList}
            checkBoxChecked={(value) => {
              setCallingData(value);
            }}
            isDisabled={prefered === true ? true : false}
          />
        ),
        isChecked: "true",
      },
      {
        title: "Disposition Based Calling",
        component: (
          <DispositionBasedCalling
            selectedData={dispositionData}
            listData={result}
            sendToggle={(value) => {
              getToggleData(value);
              setToggleData(value);
            }}
          />
        ),
        isChecked: "true",
      },
    ]);
  };

  const [accordData, setAccordData] = useState([
    {
      title: "Dial Time",
      component: <DialTimeModal setCheckBox={checkBoxChecked} />,
      isChecked: false,
    },
    // { title: "Preferred Timing", component:null },
    {
      title: "Preferred Time",
      component: null,
      subComponent: (
        <>
          <ToggleSwitch
            id="preferedTime"
            // checked={toggle}
            checked={
              schedulerStoreData?.["dialtimeData"] &&
              schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                ? schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                : toggle
            }
            optionLabels={["on", "off"]}
            small={true}
            onChange={(checked) => handleDisableToggleSwitch(checked)}
          />
          <span>{toggle ? "On" : "Off"}</span>
        </>
      ),
    },
    {
      title: "Calling Condition",
      component: <CallingCondition callingListData={callingListData} />,
      isChecked: true,
    },
    {
      title: "Disposition Based Calling",
      component: (
        <DispositionBasedCalling
          selectedData={dispositionData}
          listData={listData}
          sendToggle={(value) => {
            getToggleData(value);
            setToggleData(value);
          }}
        />
      ),
      isChecked: true,
    },
  ]);

  const tabSelected = useSelector((store) => {
    return store.breadcrumReducer?.tabName;
  });

  const breadCrumReducerData = useSelector((store) => {
    return store?.breadcrumReducer;
  });

  const breadcrumName = useSelector((store) => {
    return store.breadcrumReducer?.breadcrumName;
  });
  const campaignCredential = useSelector((store) => {
    return store.campaignReducer?.campaignSelectedData;
  });
  const allOmniChannelArray = useSelector((store) => {
    return store.campaignReducer?.campaignAllChannelOmni;
  });

  const schedulerData = useSelector((store) => {
    return store.breadcrumReducer?.schedulerData;
  });

  const portValue = useSelector((store) => {
    return store.loginReducer?.userLoginInfo;
  });

  const dcbData = useSelector((store) => {
    return store.breadcrumReducer?.dispositionBasedCalling;
  });

  const handleClickBackButton = () => {
    props.tabSelected("");
    if (
      selectedBreadcrum == "Campaign Creation" ||
      selectedBreadcrum == "Campaign Edition"
    ) {
      props.previous();
    }
    if (selectedBreadcrum == "Scheduler Settings") {
      setSelectedBreadcrum(breadcrumData[0]);
      props.storeSelectedBreadcrum(breadcrumData[0]);
    }
    if (selectedBreadcrum == "Data Upload" && tabSelected?.length > 0) {
      props.tabSelected("");
      setSelectedBreadcrum("Data Upload");
      props.storeSelectedBreadcrum("Data Upload");
    } else if (selectedBreadcrum == "Data Upload") {
      if (userType == "External") {
        setSelectedBreadcrum(breadcrumData[0]);
        props.storeSelectedBreadcrum(breadcrumData[0]);
      } else {
        setSelectedBreadcrum("Scheduler Settings");
        props.storeSelectedBreadcrum("Scheduler Settings");
      }
    }
  };

  const handleSelectBreadcrum = (name) => {
    props.storeSelectedBreadcrum(name);
    if (breadcrumName === "Data Upload") props.tabSelected("");
  };

  const handleDisableToggleSwitch = (checked) => {
    // setToggle((prev) => checked);
  };

  const onChangePer = (item) => {
    setSelectedPer((prev) => item);
  };

  const selectedCallingData = useSelector((store) => {
    return store.breadcrumReducer?.selectedCallingData;
  });

  const whatsappCampaignData = useSelector((store) => {
    return store.campaignReducer?.campaignAllCampaignChannelData;
  });

  useEffect(() => {
    if (selectedCallingData?.length > 0) {
      setCallingData(selectedCallingData);
    }
  }, [selectedCallingData]);

  const selectedDispositionBasedData = useSelector((store) => {
    return store.breadcrumReducer?.selectedDispositionData;
  });

  useEffect(() => {
    if (selectedDispositionBasedData?.length > 0) {
      setDispositionData((prev) => selectedDispositionBasedData);
    }
  }, [selectedDispositionBasedData?.length]);

  console.log("tevv" , breadCrumReducerData)

  useEffect(() => {
    if (breadcrumName == "Scheduler Settings") {
      let accountId = campaignCredential?.accountId;
      let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
      setSelectedBreadcrum(breadcrumName);
      // props.getDBCCondition(
      //   "624ae449d1bf0a217c42b568",
      //   "62a6ea1f5e29e53fe882dda8",
      //   tokenZx
      // );

            console.log("hiAbhi")
        props.setDCBdataforwhatsAppflowupTime("remove")
        props.setDCBdataforwhatsApp("remove")
    
    } else {
      setSelectedBreadcrum(breadcrumName);
    }
    let dat = whatsappCampaignData
      ?.map((each) => {
        if (
          isArray(each?.channels) &&
          each?.channels?.[0] == omniReducer.selectedOmniChannelByNavigation
        ) {
          return each;
        }
      })
      .filter((o) => o);

    let fId = dat?.length > 0 ? dat[0]?.id : props.campdata?.id;

    if (fId) {
      props.getSchedulerData(fId).then((res) => {
        if (res?.data) {
          props.storeWhatsappData(res.data.data);
          let tempData = res.data.data
          let dbcInterval = tempData?.dispositionData?.data?.followUpAttributes?.followupInterval
          let newFollowUp = Object.values(dbcInterval)
          let newFollowArray =[]
           newFollowUp?.map(
            ( each ,i) => {
               let obj = {}
               obj["retryHrTime"] = Math.floor(each/60)
               obj["retryMinTime"] = each %60
               newFollowArray.push(obj)
               props.setDCBdataforwhatsAppflowupTime(i ,obj )
             }
          )
    
        }
        let tempArr = schedulerStoreData?.selectedScheduler
          ? [...schedulerStoreData?.selectedScheduler]
          : [];
        if (res?.data && res.data.data.callingConditionData?.data?.length > 0) {
          let prioratizedData = res.data.data.callingConditionData.data.sort(
            (a, b) => {
              return a.priority - b.priority;
            }
          );
          let callingConditionData =
            res.data.data.callingConditionData.data.map((each) => {
              if (each.text == "Due Date") {
                props.setCallingDay(each.values[0].value);
              }
              if (each.text == "EMI Value") {
                props.setEmiValue(each.values[0].value);
              }
              return each.text;
            });

          // props.setSelectedCallingData(callingConditionData);
          // if(breadCrumReducerData?.selectedCallingData.includes("Due Date")){
          //   // props.setCallingCondition(breadCrumData?.callingCondition)
          // }
          // props.setSelectedCallingData(prioratizedData)
          props.shuffledCallingCondition(prioratizedData);
          props.setSelectedCallingData(prioratizedData);
          tempArr.push("Calling Condition");
        }
        if (
          res?.data &&
          res.data?.data?.dispositionData?.data &&
          Object.values(res.data.data.dispositionData?.data)?.length > 0
        ) {
          let tempsc = [];
          Object.values(res.data.data.dispositionData.data).map((err) => {
            tempsc.push(...err);
          });
          let retryTimeValue = tempsc.map((er) => {
            return { key: er.respKey, retryTime: er.retryTime };
          });

          //for child and parent
          let connectArr = [];
          let nonConnectArr = [];
          let succConnect = [];
          let notSuccConect = [];
          let temparent = [];
          let tempChild = [];
          if (res?.data?.data?.dispositionData) {
            res?.data?.data?.dispositionData?.data?.connected?.map((err) => {
              temparent.push(err);
              connectArr.push(err);
            });
            res?.data?.data?.dispositionData?.data?.not_connected?.map(
              (err) => {
                temparent.push(err);
                nonConnectArr.push(err);
              }
            );
            res?.data?.data?.dispositionData?.data?.succeeding_connected?.map(
              (err) => {
                tempChild.push(err);
                succConnect.push(err);
              }
            );
            res?.data?.data?.dispositionData?.data?.succeeding_not_connected?.map(
              (err) => {
                tempChild.push(err);
                notSuccConect.push(err);
              }
            );
            let selParent = temparent?.map((each) => {
              return each?.respKey;
            });
            let selchild = tempChild?.map((each) => {
              return each?.respKey;
            });

            if (selParent) {
              props.setSelectedDispositionDataParent(selParent);
            }
            if (selchild) {
              props.setSelectedDispositionDataChild(selchild);
            }
          }

          let selConnectKey = connectArr?.map((each) => {
            return each?.respKey;
          });
          let selNonConnectKey = nonConnectArr?.map((each) => {
            return each?.respKey;
          });
          let selSuccConnectKey = succConnect?.map((each) => {
            return each?.respKey;
          });
          let selSuccNonConnectKey = notSuccConect?.map((each) => {
            return each?.respKey;
          });

          //
          let tempVal = tempsc.map((each) => {
            return each.respKey;
          });
          props.selectedDataRetryTime(retryTimeValue);
          //abhishek code -- for keys
          let keysD = [];
          tempsc.map((each) => {
            if (!keysD?.includes(each.respKey)) {
              keysD.push(each.respKey);
            }
            // return each.respKey;
          });

          props.setSelectedDispositionData(keysD);
          props.storeSeparateSelectedData({
            connected: selConnectKey,
            notConnected: selNonConnectKey,
            succeeding_connected: selSuccConnectKey,
            succeeding_not_connected: selSuccNonConnectKey,
          });
          if (Object.keys(res.data.data.dispositionData.data)?.length > 0) {
            let dispositionData = [];
            if (
              res.data.data.dispositionData?.data?.connected?.length > 0 &&
              breadCrumReducerData.dispositionBasedCalling?.template.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.not_connected?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.not_connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.succeeding_not_connected
                ?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.succeeding_not_connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.succeeding_connected
                ?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.succeeding_connected
              );
            }
            // [...res.data.data.dispositionData?.data?.connected,
            //   ...res.data.data.dispositionData?.data?.not_connected,
            //   ...res.data.data.dispositionData?.data?.succeeding_not_connected,
            //   ...res.data.data.dispositionData?.data?.succeeding_connected]
            // let gh=[Object.values(res.data.data.dispositionData?.data)]
            // let dispositionData= [].concat.apply([], gh)
            let dispositiionQueData = dispositionData.map((each) => {
              return each.respKey;
            });
            let setDisposition =
              breadCrumReducerData?.dispositionBasedCalling?.template.map(
                (each) => {
                  let val = dispositiionQueData.indexOf(each.respKey);
                  if (val >= 0) {
                    return {
                      ...each,
                      retryHrTime: Math.floor(
                        dispositionData[val].retryTime / 60
                      ),
                      retryMinTime:
                        dispositionData[val].retryTime -
                        Math.floor(dispositionData[val].retryTime / 60) * 60,
                    };
                  } else {
                    return each;
                  }
                }
              );
            let tempObj = { ...breadCrumReducerData.dispositionBasedCalling };
            tempObj["template"] =
              setDisposition?.length > 0 ? setDisposition : [];
            props.setDCBData(tempObj);
          }

          props.shuffledConnectedDispositionCondition(
            res.data.data.dispositionData?.data?.connected
          );
          props.shuffledDispositionCondition(
            res.data.data.dispositionData?.data?.not_connected
          );
          props.shuffledNotConnectedSucceding(
            res.data.data.dispositionData?.data?.succeeding_not_connected
          );

          props.shuffledConnectedSucceding(
            res.data.data.dispositionData?.data?.succeeding_connected
          );
        }

        props.CheckedData(tempArr);
      });
    }

    // if(breadcrumName == "Campaign Edition"){
    //   let accountId=campaignCredential?.accountId
    //   props.getSchedulerData("62a9b0d912c7467dc56b2040")
    // }
  }, [breadcrumName, whatsappCampaignData]);

  useEffect(() => {
    props.storeBreadCrumData(breadcrumData);
  }, [breadcrumData]);

  useEffect(() => {
    if (Object.keys(props.EditData)?.length == 0) {
      if (userType == "External") {
        setBreadcrumData(["Campaign Creation", "Data Upload"]);
      } else {
        setBreadcrumData([
          "Campaign Creation",
          "Scheduler Settings",
          "Data Upload",
        ]);
      }
      props.storeSelectedBreadcrum("Campaign Creation");
    } else {
      if (userType == "External") {
        setBreadcrumData(["Campaign Creation", "Data Upload"]);
      } else {
        setBreadcrumData([
          "Campaign Creation",
          "Scheduler Settings",
          "Data Upload",
        ]);
      }

      props.storeSelectedBreadcrum("Campaign Creation");
    }
    settingAccordData(listData);
  }, []);

  useEffect(() => {
    if (breadCrumReducerData?.dispositionBasedCalling?.template?.length > 0) {
      props.getSchedulerData(campaignCredential?.id).then((res) => {
        let tempArr = schedulerStoreData?.selectedScheduler
          ? [...schedulerStoreData?.selectedScheduler]
          : [];
        if (res?.data && res.data.data.callingConditionData?.data?.length > 0) {
          let prioratizedData = res.data.data.callingConditionData.data.sort(
            (a, b) => {
              return a.priority - b.priority;
            }
          );
          let callingConditionData =
            res.data.data.callingConditionData.data.map((each) => {
              if (each.text == "Due Date") {
                props.setCallingDay(each.values[0].value);
              }
              if (each.text == "EMI Value") {
                props.setEmiValue(each.values[0].value);
              }
              return each.text;
            });

          // props.setSelectedCallingData(callingConditionData);
          // if(breadCrumReducerData?.selectedCallingData.includes("Due Date")){
          //   // props.setCallingCondition(breadCrumData?.callingCondition)
          // }
          // props.setSelectedCallingData(prioratizedData)
          props.shuffledCallingCondition(prioratizedData);
          props.setSelectedCallingData(prioratizedData);
          tempArr.push("Calling Condition");
        }
        if (
          res?.data &&
          res.data?.data?.dispositionData?.data &&
          Object.values(res.data.data.dispositionData?.data)?.length > 0
        ) {
          let tempsc = [];
          Object.values(res.data.data.dispositionData.data).map((err) => {
            tempsc.push(...err);
          });
          let retryTimeValue = tempsc.map((er) => {
            return { key: er.respKey, retryTime: er.retryTime };
          });

          //for child and parent
          let connectArr = [];
          let nonConnectArr = [];
          let succConnect = [];
          let notSuccConect = [];
          let temparent = [];
          let tempChild = [];
          if (res?.data?.data?.dispositionData) {
            res?.data?.data?.dispositionData?.data?.connected?.map((err) => {
              temparent.push(err);
              connectArr.push(err);
            });
            res?.data?.data?.dispositionData?.data?.not_connected?.map(
              (err) => {
                temparent.push(err);
                nonConnectArr.push(err);
              }
            );
            res?.data?.data?.dispositionData?.data?.succeeding_connected?.map(
              (err) => {
                tempChild.push(err);
                succConnect.push(err);
              }
            );
            res?.data?.data?.dispositionData?.data?.succeeding_not_connected?.map(
              (err) => {
                tempChild.push(err);
                notSuccConect.push(err);
              }
            );
            let selParent = temparent?.map((each) => {
              return each?.respKey;
            });
            let selchild = tempChild?.map((each) => {
              return each?.respKey;
            });

            if (selParent) {
              props.setSelectedDispositionDataParent(selParent);
            }
            if (selchild) {
              props.setSelectedDispositionDataChild(selchild);
            }
          }

          let selConnectKey = connectArr?.map((each) => {
            return each?.respKey;
          });
          let selNonConnectKey = nonConnectArr?.map((each) => {
            return each?.respKey;
          });
          let selSuccConnectKey = succConnect?.map((each) => {
            return each?.respKey;
          });
          let selSuccNonConnectKey = notSuccConect?.map((each) => {
            return each?.respKey;
          });

          //
          let tempVal = tempsc.map((each) => {
            return each.respKey;
          });
          props.selectedDataRetryTime(retryTimeValue);
          //abhishek code -- for keys
          let keysD = [];
          tempsc.map((each) => {
            if (!keysD?.includes(each.respKey)) {
              keysD.push(each.respKey);
            }
            // return each.respKey;
          });

          props.setSelectedDispositionData(keysD);
          props.storeSeparateSelectedData({
            connected: selConnectKey,
            notConnected: selNonConnectKey,
            succeeding_connected: selSuccConnectKey,
            succeeding_not_connected: selSuccNonConnectKey,
          });
          if (Object.keys(res.data.data.dispositionData.data)?.length > 0) {
            let dispositionData = [];
            if (
              res.data.data.dispositionData?.data?.connected?.length > 0 &&
              breadCrumReducerData.dispositionBasedCalling?.template.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.not_connected?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.not_connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.succeeding_not_connected
                ?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.succeeding_not_connected
              );
            }
            if (
              res.data.data.dispositionData?.data?.succeeding_connected
                ?.length > 0
            ) {
              dispositionData.push(
                ...res.data.data.dispositionData?.data?.succeeding_connected
              );
            }
            // [...res.data.data.dispositionData?.data?.connected,
            //   ...res.data.data.dispositionData?.data?.not_connected,
            //   ...res.data.data.dispositionData?.data?.succeeding_not_connected,
            //   ...res.data.data.dispositionData?.data?.succeeding_connected]
            // let gh=[Object.values(res.data.data.dispositionData?.data)]
            // let dispositionData= [].concat.apply([], gh)
            let dispositiionQueData = dispositionData.map((each) => {
              return each.respKey;
            });
            let setDisposition =
              breadCrumReducerData?.dispositionBasedCalling?.template.map(
                (each) => {
                  let val = dispositiionQueData.indexOf(each.respKey);
                  if (val >= 0) {
                    return {
                      ...each,
                      retryHrTime: Math.floor(
                        dispositionData[val].retryTime / 60
                      ),
                      retryMinTime:
                        dispositionData[val].retryTime -
                        Math.floor(dispositionData[val].retryTime / 60) * 60,
                    };
                  } else {
                    return each;
                  }
                }
              );
            let tempObj = { ...breadCrumReducerData.dispositionBasedCalling };
            tempObj["template"] =
              setDisposition?.length > 0 ? setDisposition : [];
            props.setDCBData(tempObj);
          }

          props.shuffledConnectedDispositionCondition(
            res.data.data.dispositionData?.data?.connected
          );
          props.shuffledDispositionCondition(
            res.data.data.dispositionData?.data?.not_connected
          );
          props.shuffledNotConnectedSucceding(
            res.data.data.dispositionData?.data?.succeeding_not_connected
          );

          props.shuffledConnectedSucceding(
            res.data.data.dispositionData?.data?.succeeding_connected
          );
        }

        props.CheckedData(tempArr);
      });
    }
  }, [breadCrumReducerData?.dispositionBasedCalling?.template?.length]);

  useEffect(() => {
    var cList = props.callingData?.condition?.map((each, i) => {
      return {
        condition: each.text,
        respKey: each.respKey,
        component:
          each.type == "Dropdown" ? (
            <PriorityDropdown
              droplist={{
                optionList: each.value,
                parentData: each,
                imgSrcRight: downArrow,
                placeHolderText:
                  each.value.toString().length > 16 ? (
                    <>
                      <span className={`data-section`}>{each.value[0]}</span>
                      <span>...</span>
                    </>
                  ) : (
                    each.value.map((er) => {
                      return <span className={`data-section`}>{er}</span>;
                    })
                  ),
              }}
              // isFilter={true}
              searchUi={false}
              handleSearchItem={selectedPer}
              selectedItem={(item) => onChangePer(item)}
              extraClassSelectedArea={"preEmidropdown"}
              extraClassToBeSelectedArea={"dropdowndListArea"}
            />
          ) : (
            <SameDayComponent />
          ),
        selectComponent: (
          <Checkbox
            extraSpan={
              callingData?.includes(each.text)
                ? "multi-border"
                : "multi-border-bs"
            }
            checked={callingData?.includes(each.text) ? true : false}
            onChange={(e) => handleCallingChange(e, each.text, i)}
          />
        ),
      };
    });
    setCallingListData((prev) => cList);
  }, [props.callingData]);


  useEffect(() => {
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;

    // let accountId = campaignCredential?.accountId;
    let accountId = props?.userLoginInfo?.userDetail?.accountDetails?.[0].id;
    
     accountId = props.EditData?.accountId ? props.EditData?.accountId : accountId
   
    let useCaseId = props.selectedUseCase?.id;
    props.getDBCCondition(
      // "624ae449d1bf0a217c42b568",
      // "62a6ea1f5e29e53fe882dda8",
      accountId,
      "62c81c4a4a0affe91342aaaa",
      tokenZx,selectNavChannel
    );
    // props.getDialTimeData(accountId, "62a6ea1f5e29e53fe882dda8", tokenZx);
    // props.getDBCCondition(
    //   accountId,
    //   useCaseId,    //   tokenZx   // );
    props.getDialTimeData(accountId, "62c81c4a4a0affe91342aaaa", tokenZx);
    props.getCallingCondition(tokenZx);
  }, [selectNavChannel]);

  useEffect(() => {
    getToggleData(toggleData);
  }, [dcbData, props.schedulerData?.preferedTime]);

  useEffect(() => {
    getToggleData(toggleData);
  }, [dispositionType]);

  useEffect(() => {
    setAccordData([
      {
        title: "Dial Time",
        component: <DialTimeModal setCheckBox={checkBoxChecked} />,
        isChecked: false,
      },
      // { title: "Preferred Timing", component:null },

      {
        title: "Preferred Time",
        component: null,
        subComponent: (
          <>
            <ToggleSwitch
              id="preferedTime"
              // checked={toggle}
              checked={
                schedulerStoreData?.["dialtimeData"] &&
                schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                  ? schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
                  : toggle
              }
              optionLabels={["on", "off"]}
              small={true}
              onChange={(checked) => handleDisableToggleSwitch(checked)}
            />
            <span>{toggle ? "On" : "Off"}</span>
          </>
        ),
        isChecked: "true",
      },
      {
        title: "Calling Condition",
        component: (
          <CallingCondition
            callingData={callingListData}
            isDisabled={prefered === true ? true : false}
          />
        ),
        isChecked: "true",
      },
      {
        title: "Disposition Based Calling",
        component: (
          <DispositionBasedCalling
            selectedData={dispositionData}
            listData={listData}
            sendToggle={(value) => {
              getToggleData(value);
              setToggleData(value);
            }}
          />
        ),
        isChecked: "true",
      },
    ]);
    let obj = props.schedulerData;
    if (obj) {
      obj["preferredTime"] = prefered;

      props.storeSelectedDialTime(props.schedulerData);
    } else {
      props.storeSelectedDialTime({ preferredTime: prefered });
    }
  }, [prefered]);

  const shuffledDispositionData = useSelector((store) => {
    return store.breadcrumReducer?.shuffledDispositionData;
  });
  const shuffledConnectedSucceding = useSelector((store) => {
    return store.breadcrumReducer?.shuffledConnectedSucceding;
  });
  const shuffledNotConnectedSucceding = useSelector((store) => {
    return store.breadcrumReducer?.shuffledNotConnectedSucceding;
  });

  const omniReducer = useSelector((store) => {
    return store?.omniChannelReducer;
  });

  const shuffledConnectedDispositionData = useSelector((store) => {
    return store.breadcrumReducer?.shuffledConnectedDispositionData;
  });
  const summaryPhase = useSelector((store) => {
    return store.breadcrumReducer?.selectedPhase;
  });
  const submitData = () => {
    let val = breadCrumReducerData?.shuffledCallingConditionData?.map((et) => {
      return et.text;
    });
    let tVal = [];
    let testVal = breadCrumReducerData?.callingCondition?.condition.map(
      (ew) => {
        let index = val?.indexOf(ew.text);
        tVal[index] = ew;
      }
    );

    let dialData = props.schedulerData.dialTimeData;
    let dat = whatsappCampaignData
      ?.map((each) => {
        if (each.channels == omniReducer.selectedOmniChannelByNavigation) {
          return each;
        }
      })
      .filter((o) => o);

    let fId = dat?.length > 0 ? dat[0]?.id : props.campdata.id;
    let dataToSubmit = {
      campaignId: fId,
      preferredTime:
        schedulerStoreData?.["dialtimeData"] &&
        schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
          ? schedulerStoreData?.["dialtimeData"]?.["preferedTime"]
          : toggle,
      dialTimeData: {
        start_date_range: dialData?.start_date_range,
        end_date_ranfge: dialData?.end_date_ranfge,
        s_time: dialData?.s_time,
        e_time: dialData?.e_time,
        timezone: "UTC +5:30 IST",
        max_attempts: dialData?.max_attempts,
        frequency: dialData?.frequency,
        autoDial: dialData?.autoDial,
      },
      callingConditionData:
        schedulerStoreData?.["dialtimeData"] &&
        !schedulerStoreData?.["dialtimeData"]?.["preferedTime"] &&
        breadCrumReducerData.shuffledCallingConditionData?.length > 0
          ? // testVal.filter((o)=>o):[],

            // breadCrumReducerData?.shuffledCallingConditionData.map((cc, i) => {
            tVal
              ?.map((cc, i) => {
                if (val?.includes(cc.text)) {
                  return {
                    text: cc.text,
                    priority: i + 1,
                    respKey: cc.respKey,
                    values:
                      cc.values?.length > 0
                        ? cc.respKey == "dueDate"
                          ? cc.values
                              ?.map((ee, ind) => {
                                if (ind == 0) {
                                  return {
                                    key: ee.key,
                                    value: breadCrumReducerData.callingDay,
                                    priority: ind + 1,
                                    days:
                                      breadCrumReducerData.callingDay ==
                                      "Same Day"
                                        ? "Same Day"
                                        : "Call Before",
                                  };
                                }
                              })
                              .filter((o) => o)
                          : cc.respKey == "emiValue"
                          ? cc.values
                              ?.map((ee, ind) => {
                                if (ind == 0) {
                                  return {
                                    key: ee.key,
                                    value: ee.value,
                                    priority: ind + 1,
                                  };
                                }
                              })
                              .filter((o) => o)
                          : cc.values?.map((ee, ind) => {
                              return {
                                key: ee.key,
                                value: ee.value,
                                priority: ind + 1,
                              };
                            })
                        : cc.respKey == "dueDate"
                        ? cc.value
                            ?.map((ee, ind) => {
                              if (ind == 0) {
                                return {
                                  key: cc.respKey,
                                  value: breadCrumReducerData.callingDay,
                                  priority: ind + 1,
                                  days:
                                    breadCrumReducerData.callingDay ==
                                    "Same Day"
                                      ? "Same Day"
                                      : breadCrumReducerData.callingDay,
                                };
                              }
                            })
                            .filter((o) => o)
                        : cc.respKey == "emiValue"
                        ? cc.value
                            ?.map((ee, ind) => {
                              if (ind == 0) {
                                return {
                                  key: cc.respKey,
                                  value: ee,
                                  priority: ind + 1,
                                };
                              }
                            })
                            .filter((o) => o)
                        : cc.value?.map((ee, ind) => {
                            return {
                              key: cc.respKey,
                              value: ee,
                              priority: ind + 1,
                            };
                          }),
                  };
                }
              })
              .filter((o) => o)
          : [],
      dispositionBasedCallingData: {
        not_connected: shuffledDispositionData?.map((each, i) => {
          let tempArr = [];
          let tempVal = props.dispositionData.template.map((et) => {
            if (et.text == each.text) {
              tempArr.push(et);
            }
          });

          return {
            text: each.text,
            priority: i + 1,
            respKey: each.respKey,
            retryTime:
              Number(tempArr[0].retryHrTime * 60) +
              Number(tempArr[0].retryMinTime),
          };
        }),
        connected: shuffledConnectedDispositionData?.map((each, i) => {
          let tempArr = [];
          let tempVal = props.dispositionData.template.map((et) => {
            if (et.text == each.text) {
              tempArr.push(et);
            }
          });

          return {
            text: each.text,
            priority: i + 1,
            respKey: each.respKey,
            retryTime:
              Number(tempArr[0].retryHrTime * 60) +
              Number(tempArr[0].retryMinTime),
          };
        }),
        succeeding_connected: shuffledConnectedSucceding?.map((each, i) => {
          let tempArr = [];
          let tempVal = props.dispositionData.template.map((et) => {
            if (et.text == each.text) {
              tempArr.push(et);
            }
          });

          return {
            text: each.text,
            priority: i + 1,
            respKey: each.respKey,
            retryTime:
              Number(tempArr[0].retryHrTime * 60) +
              Number(tempArr[0].retryMinTime),
          };
        }),
        succeeding_not_connected: shuffledNotConnectedSucceding?.map(
          (each, i) => {
            let tempArr = [];
            let tempVal = props.dispositionData.template.map((et) => {
              if (et.text == each.text) {
                tempArr.push(et);
              }
            });

            return {
              text: each.text,
              priority: i + 1,
              respKey: each.respKey,
              retryTime:
                Number(tempArr[0].retryHrTime * 60) +
                Number(tempArr[0].retryMinTime),
            };
          }
        ),
      },
      channel: "call",
    };

    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    props
      .submitDataList(dataToSubmit, tokenZx)
      .then((res) => {
        if (res.data.data) {
          props.updateData("Data Upload");
          setShowAlertBox((prev) => true);
          // toast.success("Scheduler data submitted successfully")
        }
        let data = summaryPhase;
        data["call"].push("Scheduler Settings");
        props.setSchedulerPhase(data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  // {
  //   connected: [
  //     {
  //       priority: 1,
  //       respKey: "switched_off",
  //       retryTime: "time in minutes",
  //     },
  //     {
  //       priority: 2,
  //       respKey: "switched_off",
  //       retryTime: "time in minutes",
  //     },
  //   ],
  //   not_connected: [
  //     {
  //       priority: 1,
  //       respKey: "switched_off",
  //       retryTime: "time in minutes",
  //     },
  //     {
  //       priority: 2,
  //       respKey: "switched_off",
  //       retryTime: "time in minutes",
  //     },
  //   ],
  // },

  // for getting port of clients

  // useEffect(()=>{
  //   if(props.moveToCallingList=="true"){
  //     props.previous();
  //   }
  // },[props.moveToCallingList])

  useEffect(() => {
    props.goToCallingList("false");
  }, []);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}${SCHEDULER_URL.GET_ALL_PORT}`, {
        params: { id: props.campdata?.accountId },
      })
      .then((res) => {
        if (res?.data?.data?.port) {
          setPort((prev) => res?.data?.data?.port);
        }
      });
  }, [props.campdata?.accountId]);

  useEffect(() => {
    if (
      props.schedulerData?.dialTimeData?.s_time &&
      props.schedulerData?.dialTimeData?.e_time &&
      !isChecked.includes("Dial Time")
    ) {
      let temp = [...isChecked];
      temp.push("Dial Time");
      props.CheckedData(temp);
      setIsChecked((prev) => temp);
    } else {
      let temp = [...isChecked];
      let index = temp.indexOf("Dial Time");
      if (index > -1) {
        temp.splice(index, 1);
      }
      props.CheckedData(temp);
      setIsChecked((prev) => temp);
    }
  }, [props.schedulerData]);

  const selectedCallingTime = useSelector((store) => {
    return store.breadcrumReducer.selectedCallingData;
  });

  useEffect(() => {
    if (
      selectedCallingTime &&
      selectedCallingTime.length > 0 &&
      !isChecked.includes("Calling Condition")
    ) {
      let temp = [...isChecked];
      temp.push("Calling Condition");
      props.CheckedData(temp);
      setIsChecked((prev) => temp);
    } else {
      if (selectedCallingTime?.length == 0) {
        let temp = [...isChecked];
        let index = temp.indexOf("Calling Condition");
        if (index > -1) {
          temp.splice(index, 1);
        }
        props.CheckedData(temp);
        setIsChecked((prev) => temp);
      }
    }
  }, [selectedCallingTime?.length]);

  useEffect(() => {
    if (
      selectedDispositionData &&
      selectedDispositionData.length > 0 &&
      !isChecked.includes("Disposition Based Calling")
    ) {
      let temp = [...isChecked];
      temp.push("Disposition Based Calling");
      props.CheckedData(temp);
      setIsChecked((prev) => temp);
    } else {
      if (selectedDispositionData?.length == 0) {
        let temp = [...isChecked];
        let index = temp.indexOf("Disposition Based Calling");
        if (index > -1) {
          temp.splice(index, 1);
        }
        props.CheckedData(temp);
        setIsChecked((prev) => temp);
      }
    }
  }, [selectedDispositionData?.length]);

  //for setting highlight button sameday
  // props.setSameDayBtn("Same Day")
  //  useEffect(
  //    () => {
  //   breadCrumReducerData?.shuffledCallingConditionData?.map(
  //     e => {
  //         if(e?.respKey == "dueDate"){
  //            e?.values?.map( g=> {
  //                if(g?.value== "Same Day"){
  //                  console.log("nayaks" ,g?.value )
  //                  props.setSameDayBtn("Same Day")
  //                }
  //                else{
  //                 props.setSameDayBtn()
  //                }
  //               }
  //             )
  //         }
  //     }
  //   )
  //    },[breadCrumReducerData?.shuffledCallingConditionData]
  //  )
  // storing channel selected by navigation
  useEffect(() => {
    if (selectNavChannel) {
      props.selectOmniChannelByNav(selectNavChannel);
    }
  }, [selectNavChannel]);

  // let arrayChannles =[]
  // useEffect(
  //  () => {
  //    if(campaignCredential?.channels){
  //     campaignCredential?.channels?.map(
  //       e => {
  //         if(e == "Call"){
  //           arrayChannles.unshift(e)
  //         }else{
  //           arrayChannles.push(e)
  //         }
  //       }
  //     )
  //    }

  //  },[campaignCredential]
  // )
  //     console.log("vgvgv" ,arrayChannles )

  allOmniChannelArray &&
    allOmniChannelArray?.sort((a, b) => {
      return a?.length - b?.length;
    });

  return (
    <div className="dialler">
      {breadcrumName != "Campaign Creation" ? (
        <div
          className={`nav ${
            allOmniChannelArray && allOmniChannelArray.length == 1
              ? "navMin"
              : ""
          } `}
        >
          <NavigationChannel
            NavArray={allOmniChannelArray}
            selectedNavoutside={setSelectNavChannel}
            selectouside={""}
          />
        </div>
      ) : null}
      <Breadcrum
        arrData={breadcrumData}
        handleClickBackButton={handleClickBackButton}
        selectedBreadcrum={selectedBreadcrum}
        handleSelectBreadcrum={handleSelectBreadcrum}
        edit={props.EditData}
        isCreate={campaignEditUpdateType}
      />

      {(breadcrumName == "Campaign Creation" ||
        breadcrumName == "Campaign Edition") && (
        <CreateCampaignModel
          previous={props.previous}
          EditData={props.EditData}
        />
        // <h1>hello</h1>
      )}
      {breadcrumName == "Scheduler Settings" &&
        (selectNavChannel == "Call" ? (
          <>
            <div className="port-section">
              <div className="port-area">
                <div className="campaign-title">
                  Campaign Name -{" "}
                  {props.campdata?.campaignName
                    ? props.campdata?.campaignName
                    : campaignCredential?.campaignId}
                </div>
                <div className="allocated-port">
                  Allocated Ports :{" "}
                  {/* {portValue?.accountDetails?.ports
                  ? portValue.accountDetails.ports
                  : 0} */}{" "}
                  {port}
                </div>
              </div>
            </div>
            <div className="accord-section">
              <div className="accord-card">
                <DialTimeAccord />
                <PreferredTimeAccord />
                <CallingConditionAccord />
                <DCBAccord />
                {/* {accordData.map((accord) => {
                return (
                  <>
                    <Accordion
                      title={accord.title}
                      content={accord.component ? accord.component : ""}
                      disabled={true}
                      subComponent={accord.subComponent}
                      getData={toUpdateToggle}
                      isChecked={isChecked}
                    />
                  </>
                );
              })} */}
              </div>
              <div className="accord-footer">
                {schedulerStoreData?.["dialtimeData"] &&
                schedulerStoreData?.["dialtimeData"]?.["preferedTime"] ? (
                  <span className="note-tag">
                    <strong className="note-strong-tag">Note: </strong>You have
                    selected preferred time based calling, Therefore current
                    campaign disposition setting and calling condition will be
                    disabled.
                  </span>
                ) : (
                  <span className="note-tag"></span>
                )}
                <button
                  className={`accord-submit-button ${
                    schedulerStoreData?.dialtimeData?.dialTimeData?.s_time &&
                    schedulerStoreData?.dialtimeData?.dialTimeData?.e_time
                      ? ""
                      : "disabled"
                  }`}
                  onClick={submitData}
                  disabled={
                    schedulerStoreData?.dialtimeData?.dialTimeData?.s_time &&
                    schedulerStoreData?.dialtimeData?.dialTimeData?.e_time
                      ? false
                      : true
                  }
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </>
        ) : // <WpSettingPage />
        selectNavChannel == "WhatsApp" ? (
          <WpSettingPage />
        ) : (
          ""
        ))}
      {breadcrumName == "Data Upload" && (
        <DataUpload
          tabSelected={() => {
            setIsTabSelected(true);
          }}
        />
      )}
      {breadcrumName == "Data Mapping" && <UploadCampaignDetails />}
      {showAlertBox && (
        <div className="deleteModalCenter">
          <AlertBox
            uploadData={() => {
              setSelectedBreadcrum((prev) => "Data Upload");
              props.storeSelectedBreadcrum("Data Upload");
              setShowAlertBox((prev) => false);
            }}
            setCloseAlert={() => setShowAlertBox((prev) => false)}
            id={props.campdata?.id}
          />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    userLoginInfo: state.loginReducer?.userLoginInfo,
    schedulerData: state.schedulerReducer?.dialtimeData,
    callingData: state.breadcrumReducer?.callingCondition,
    dispositionData: state.breadcrumReducer?.dispositionBasedCalling,
    campaignCredentials: state.CreateCampaignModel?.campaignCredentials,
    moveToCallingList: state.breadcrumReducer?.goToCallingList,
    selectsameday: state.breadcrumReducer?.selectsamedaybtn,
    campdata: state.campaignReducer?.campaignCredentials,
    selectedUseCase: state.schedulerReducer?.selectedUsecase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      {},
      breadcrumActions,
      schedulerAction,
      campaignAction,
      omniChannelAction
    ),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DiallerSection);
