import React, { useEffect, useState } from "react";
import DndComponent from "../../../../generic/dndcomponent/DndComponent";
import "./DispositionBasedCalling.css";
import ToggleSwitch from "../../../../generic/toggleSwitch/ToggleSwitch";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as schedulerAction from "../../../../../redux/campaign/scheduler/actions";
import * as breadcrumAction from "../../../../../redux/breadcrum/actions";

function DispositionBasedCalling(props) {
  const [sortedOrder, setSortedOrder] = useState("");
  const [toggle, setToggle] = useState("");
  const [checkedData, setCheckedData] = useState("Not Connected");

  const handleDisableToggleSwitch = (checked) => {
    setToggle(checked);
  };

  const preferedTime = useSelector((store) => {
    return store.schedulerReducer?.dialtimeData?.preferedTime;
  });

  var dcbData = useSelector((store) => {
    return store.breadcrumReducer.dispositionBasedCalling;
  });

  var dispositionDataType = useSelector((store) => {
    return store.schedulerReducer.dispositionType;
  });

  useEffect(() => {
    props.sendToggle(toggle);
  }, [toggle]);

  useEffect(() => {
    props.dispositionType(checkedData);
  }, [checkedData]);

  const storePriorityList = (list, data) => {
    if (data?.length > 0) {
      // if(list?.length>0 && props.selectedDispositionData?.length>0){
      //   let tempArr=[]
      //   let tempData=[]
      //   const data=list.map((each,i)=>{return each.condition}).filter(e=>e)
      //   // const data= props.selectedDispositionData
      //   let val=props.dispositionData?.template.map((er)=>{
      //     let index=data.indexOf(er.text)
      //     if(index>0){
      //       return tempArr[index]=er
      //     }

      //   })

      //  let filteredData=tempArr.filter((e)=>e)

      //   if(data.length>0){
      //     let tVal= filteredData.map((each)=>{
      //       if(props.selectedDispositionData?.includes(each.respKey)){
      //         tempData.push(each)
      //         return each
      //       }

      //     })

      //     props.shuffledDispositionCondition(tempData)

      //   }else{
      //     let tVal=  filteredData.map((each)=>{
      //       if( props.selectedDispositionData?.includes(each.respKey)){
      //         tempData.push(each)
      //         return each
      //       }

      //     })
      //     props.shuffledDispositionCondition(tempData)

      //   }

      // }
      if (list?.length > 0 && props.selectedDispositionData?.length > 0) {
        let tempArr = [];
        const data = list
          .map((each, i) => {
            return each.respKey;
          })
          .filter((e) => e);
        // const data= props.selectedDispositionData
        let val = props.dispositionData?.template.map((er) => {
          let index = data.indexOf(er.respKey);
          return (tempArr[index] = er);
        });

        if (data.length > 0) {
          let tVal =
            dispositionDataType == "Not Connected"
              ? tempArr
                  .map((each) => {
                    if (
                      props.notConnectedSelectedDispositionData?.includes(
                        each.respKey
                      )
                    ) {
                      return each;
                    }
                  })
                  .filter((e) => e)
              : tempArr
                  .map((each) => {
                    if (
                      props.connectedSelectedDispositionData?.includes(
                        each.respKey
                      )
                    ) {
                      return each;
                    }
                  })
                  .filter((e) => e);
                 

          if (dispositionDataType == "Not Connected") {
            props.shuffledDispositionCondition(tVal);
          } else {
            props.shuffledConnectedDispositionCondition(tVal);
          }
        } else {
          let tVal =
            dispositionDataType == "Not Connected"
              ? props.dispositionData?.template
                  .map((each) => {
                    if (
                      props.notConnectedSelectedDispositionData?.includes(
                        each.respKey
                      )
                    ) {
                      return each;
                    }
                  })
                  .filter((e) => e)
              : props.dispositionData?.template
                  .map((each) => {
                    if (
                      props.connectedSelectedDispositionData?.includes(
                        each.respKey
                      )
                    ) {
                      return each;
                    }
                  })
                  .filter((e) => e);
                
          if (dispositionDataType == "Not Connected") {
            props.shuffledDispositionCondition(tVal);
          } else {
            props.shuffledConnectedDispositionCondition(tVal);
          }
          // props.shuffledDispositionCondition(tVal)
        }
      }
    } else {
      if (list?.length > 0 && props.selectedDispositionData?.length > 0) {
        let tempArr = [];
        const data = list
          .map((each, i) => {
            return each;
          })
          .filter((e) => e);
        // const data= props.selectedDispositionData
        let val = props.dispositionData?.template.map((er) => {
          let index = data.indexOf(er.respKey);
          return (tempArr[index] = er);
        });

        if (data.length > 0) {
          let tVal =  dispositionDataType == "Not Connected"
          ?tempArr
            .map((each) => {
              if (props.notConnectedSelectedDispositionData?.includes(each.respKey)) {
                return each;
              }
            })
            .filter((e) => e):
            tempArr
            .map((each) => {
              if (props.connectedSelectedDispositionData?.includes(each.respKey)) {
                return each;
              }
            })
            .filter((e) => e)

          if (dispositionDataType == "Not Connected") {
            props.shuffledDispositionCondition(tVal);
          } else {
            props.shuffledConnectedDispositionCondition(tVal);
          }
          // props.shuffledDispositionCondition(tVal)
        } else {
          let tVal = props.dispositionData?.template
            .map((each) => {
              if (props.selectedDispositionData?.includes(each.respKey)) {
                return each;
              }
            })
            .filter((e) => e);
          if (dispositionDataType == "Not Connected") {
            props.shuffledDispositionCondition(tVal);
          } else {
            props.shuffledConnectedDispositionCondition(tVal);
          }
          // props.shuffledDispositionCondition(tVal)
        }
      }
    }
  };
  useEffect(() => {
    
    if (sortedOrder?.length > 0) {
      return storePriorityList(sortedOrder, "data");
    } else {
      let priorityData = props.dispositionData?.template.map((each) => {
        return each.respKey;
      });
      return storePriorityList(priorityData);
    }
  }, [sortedOrder, props.selectedData?.length]);

  return (
    <div className="dcb-wrapper">
      <div className="connected-section">
        <div className="initial-campaign-section">
          <div>
            <input
              type="radio"
              value="true"
              checked={checkedData == "Not Connected" ? false : true}
              className="scheduler-radio"
              name="Not Connected"
              onClick={() => setCheckedData((prev) => "Not Connected")}
            />
            Not Connected
            <input
              type="radio"
              value="true"
              checked={checkedData == "Connected" ? false : true}
              className="scheduler-radio"
              name="Connected"
              onClick={() => {
                setCheckedData((prev) => "Connected");
              }}
            />{" "}
            Connected
          </div>
          <div>
            {!preferedTime && (
              <>
                <span className={`pre ${toggle ? "" : "radio-active"} `}>
                  Current Campaign Setting
                </span>
                <ToggleSwitch
                  id="toggle"
                  checked={toggle}
                  optionLabels={[
                    "Current Campaign Setting",
                    "Succeeding Campaign Setting",
                  ]}
                  small={true}
                  onChange={(checked) => {
                    handleDisableToggleSwitch(checked);
                  }}
                />{" "}
              </>
            )}
            <span
              className={`post ${toggle || preferedTime ? "radio-active" : ""}`}
            >
              Succeeding Campaign Setting
            </span>
          </div>
        </div>
        <div className={`callingcondition-wrapper`}>
          <table
            className={`${!toggle && !preferedTime ? "" : "retry-time-setion"}`}
          >
            <thead>
              <th>Priority</th>
              <th>Disposition</th>
              {!toggle && !preferedTime && <th>Retry Time</th>}
              <th>Select</th>
              <th></th>
            </thead>
              <DndComponent
                startingList={props.listData}
                sendOrder={(items) => {
                  setSortedOrder(items);
                }}
              />
           
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLoginInfo: state.loginReducer?.userLoginInfo,
    schedulerData: state.schedulerReducer?.dialtimeData,
    callingData: state.breadcrumReducer?.callingCondition,
    dispositionData: state.breadcrumReducer?.dispositionBasedCalling,
    selectedDispositionData: state.breadcrumReducer?.selectedDispositionData,
    connectedSelectedDispositionData:
      state.breadcrumReducer?.separateDispositionData?.connected,
    notConnectedSelectedDispositionData:
      state.breadcrumReducer?.separateDispositionData?.notConnected,
    shuffledData: state.breadcrumReducer?.shuffledDispositionCondition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, schedulerAction, breadcrumAction),
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DispositionBasedCalling);
