import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import DndComponent from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/dndcomponent/DndComponent";
import StartTimeEndTime from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/startTimeEndTime/StartTimeEndTime";
import { Checkbox } from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/ui-kit";
import ToggleSwitch from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/ui-kit/ToggleSwitch/ToggleSwitch";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/breadcrumActions";
import * as schedulerAction from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/schedulerActions";
import "./DCBTableData.css";

function DCBTableData(props) {
    const [bodyData, setBodyData] = useState([]);
  const [checkedData, setCheckedData] = useState("Not Connected");
  const [toggle, setToggle] = useState("");
  const [dispositionData,setDispositionData]=useState([])
  const [sortedOrder, setSortedOrder] = useState("");

  const preferedTime = useSelector((store) => {
    return store.schedulerReducer?.dialtimeData?.preferedTime;
  });
  const handleDisableToggleSwitch = (checked) => {
    setToggle(checked);
  };
  const tableBodyData = useSelector((store) => {
    return store.breadcrumReducer.dispositionBasedCalling;
  });
  
  const dispositionType = useSelector((store) => {
    return store.schedulerReducer.dispositionType;
  });

  const selectedDispositionData=useSelector((store) => {
    return store.breadcrumReducer.selectedDispositionData;
  });

  const selectedDispositionDataParent=useSelector((store) => {
    return store.breadcrumReducer.selectedDispositionDataParent;
  });
  const selectedDispositionDataChild=useSelector((store) => {
    return store.breadcrumReducer.selectedDispositionDataChild;
  });
 
  const separateSelectedDispositionData=useSelector((store) => {
    return store.breadcrumReducer.separateDispositionData;
  });
  //succseding
  const shuffledDispositionData = useSelector((store) => {
    return store.breadcrumReducer.shuffledDispositionData;
  });
  const shuffledConnectedSucceding = useSelector(
    (store) => {return store.breadcrumReducer.shuffledConnectedSucceding}
  )
  const shuffledNotConnectedSucceding = useSelector(
    (store) => {return store.breadcrumReducer.shuffledNotConnectedSucceding}
  )


  const shuffledConnectedDispositionData = useSelector((store) => {
    return store.breadcrumReducer.shuffledConnectedDispositionData;
  });
 

  const retryTimeData=useSelector((store)=>{
    return store.breadcrumReducer.retryTime
  })


  const handleChange = (each, name, i) => {
    
    let tempArr = Array.isArray(selectedDispositionData)? selectedDispositionData:[];
    if (!tempArr.includes(name)) {
      tempArr.push(name);
    } else {
      const index = tempArr.indexOf(name);
      if (index > -1) {
        tempArr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  
    setDispositionData((prev) => tempArr);
    props.setSelectedDispositionData(tempArr);
     //for parent and child 
     let arrParent =  Array.isArray(selectedDispositionDataParent)? selectedDispositionDataParent:[];
     let arrChild =  Array.isArray(selectedDispositionDataChild)? selectedDispositionDataChild:[]
    if(toggle){
      if (!arrChild.includes(name)) {
        arrChild.push(name);
      } else {
        const index = arrChild.indexOf(name);
        if (index > -1) {
          arrChild.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      props.setSelectedDispositionDataChild(arrChild)
    }else{
      if (!arrParent.includes(name)) {
        arrParent.push(name);
        if (!arrChild.includes(name)) {
          arrChild.push(name);
        }
      } else {
        const index = arrParent.indexOf(name);
        if (index > -1) {
          arrParent.splice(index, 1); // 2nd parameter means remove one item only
        }
        const index2 = arrChild.indexOf(name);
        if (index2 > -1) {
          arrChild.splice(index2, 1); // 2nd parameter means remove one item only
        }
      
      }
      // if (!arrChild.includes(name)) {
      //   arrChild.push(name);
      // } else {
      //   const index = arrChild.indexOf(name);
      //   if (index > -1) {
      //     arrChild.splice(index, 1); // 2nd parameter means remove one item only
      //   }
      // }
      
      props.setSelectedDispositionDataParent(arrParent)
      props.setSelectedDispositionDataChild(arrChild)
    }
    let connectedArr =  separateSelectedDispositionData?.connected?.length >0? separateSelectedDispositionData?.connected :[];
    let notConnectedArr = separateSelectedDispositionData?.notConnected?.length > 0 ? separateSelectedDispositionData?.notConnected : [];
    let succeeding_connecteds =separateSelectedDispositionData?.succeeding_connected?.length > 0 ? separateSelectedDispositionData?.succeeding_connected : [];
    let succeeding_not_connecteds = separateSelectedDispositionData?.succeeding_not_connected?.length > 0 ? separateSelectedDispositionData?.succeeding_not_connected : [];
    // let dataVal = tempArr.map((each) => {
    //   if (each.includes("nc") && toggle == false) {
    //     if(! notConnectedArr?.includes(each)){
    //       notConnectedArr.push(each);
    //     }
    //     if(!succeeding_not_connecteds?.includes(each)){
    //       succeeding_not_connecteds.push(each)
    //     }
    //   } else if( !each.includes("nc") && toggle == false) {
    //     if(!connectedArr?.includes(each)){
    //       connectedArr.push(each);
    //     }
       
    //     if(!succeeding_connecteds?.includes(each)){
    //       succeeding_connecteds.push(each)
    //     }
    //   }
    //   else if(each.includes("nc") && toggle){
    //     if(! succeeding_not_connecteds?.includes(each)){
    //       succeeding_not_connecteds.push(each)
    //     }
    //   }
    //   else if(!each.includes("nc") && toggle){
    //     if(!succeeding_connecteds?.includes(each)){
    //       succeeding_connecteds.push(each)
    //     }
       
    //   }
    // });
      if(toggle){
        arrChild?.map(each => {
          if(each.includes("nc") ){
            if(!succeeding_not_connecteds?.includes(each)){
               succeeding_not_connecteds.push(each)
              }
          }else{
            if(!succeeding_connecteds?.includes(each)){
                    succeeding_connecteds.push(each)
                }
          }
        })
      }else{
        arrParent?.map(
          each =>{
            if(each.includes("nc") ){
              if(!notConnectedArr?.includes(each)){
                notConnectedArr.push(each)
                }
                if(!succeeding_not_connecteds?.includes(each)){
                  succeeding_not_connecteds.push(each)
                 }
            }else{
              if(!connectedArr?.includes(each)){
                connectedArr.push(each)
                }
                if(!succeeding_connecteds?.includes(each)){
                  succeeding_connecteds.push(each)
              }
            }

          }
        )

      }


    props.storeSeparateSelectedData({
      connected: connectedArr,
      notConnected: notConnectedArr,
      succeeding_connected : succeeding_connecteds,
      succeeding_not_connected: succeeding_not_connecteds
    });
  };
  
  const storePriorityList = (list, data,shuffledData) => {
   
    if(list?.length==0){
      if (dispositionType == "Not Connected") {
        props.shuffledDispositionCondition([]);
      } else {
        props.shuffledConnectedDispositionCondition([]);
      }
    }else{
      if (data?.length > 0) {
        if (list?.length > 0 && selectedDispositionDataParent?.length > 0) {
          let tempArr = [];
          const data = shuffledData?list
            .map((each, i) => {
              return each.respKey;
            })
            .filter((e) => e):list;
          // const data= selectedDispositionData
          let val = tableBodyData?.template.map((er) => {
            let index = data.indexOf(er.respKey);
            return (tempArr[index] = er);
          });
  
          if (data.length > 0) {
        
            let tVal =
              dispositionType == "Not Connected"
                ? tempArr
                    ?.map((each) => {
                      if (
                        separateSelectedDispositionData?.notConnected?.length>0&& separateSelectedDispositionData?.notConnected.includes(
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
                        separateSelectedDispositionData?.connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e);
                   
            if (dispositionType == "Not Connected") {
              props.shuffledDispositionCondition(tVal);
            } else {
              props.shuffledConnectedDispositionCondition(tVal);
            }
          } else {
            let tVal =
              dispositionType == "Not Connected"
                ? tableBodyData?.template
                    .map((each) => {
                      if (
                        separateSelectedDispositionData?.notConnected?.length>0&& separateSelectedDispositionData?.notConnected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e)
                : tableBodyData?.template
                    .map((each) => {
                      if (
                        separateSelectedDispositionData?.connected?.length>0&&separateSelectedDispositionData?.connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e);
                    
            if (dispositionType == "Not Connected") {
              props.shuffledDispositionCondition(tVal);
            } else {
              props.shuffledConnectedDispositionCondition(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          }
        }
      } else {
    
        if (list?.length > 0 && selectedDispositionDataParent?.length > 0) {
          let tempArr = [];
          const data = shuffledData?list
          .map((each, i) => {
            return each.respKey;
          })
          .filter((e) => e):list;
         
          // const data= selectedDispositionData
          let val = tableBodyData?.template.map((er) => {
            let index = data.indexOf(er.respKey);
            return (tempArr[index] = er);
          });
  
          
  
          if (data.length > 0) {
            let tVal =  dispositionType == "Not Connected"
            ?tempArr
              .map((each) => {
                if (  separateSelectedDispositionData?.notConnected?.length>0&&separateSelectedDispositionData?.notConnected.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e):
              tempArr
              .map((each) => {
                if ( separateSelectedDispositionData?.connected?.length>0&&separateSelectedDispositionData?.connected.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e)
             
            if (dispositionType == "Not Connected") {
              props.shuffledDispositionCondition(tVal);
            } else {
              props.shuffledConnectedDispositionCondition(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          } else {
            let tVal = tableBodyData?.template
              .map((each) => {
                if (selectedDispositionDataParent?.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e);
              
            if (dispositionType == "Not Connected") {
              props.shuffledDispositionCondition(tVal);
            } else {
              props.shuffledConnectedDispositionCondition(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          }
        }
      }
    }
  
  };
  // for succedding 
  const storePriorityList2 = (list, data,shuffledData) => {
   
    if(list?.length==0){
      if (dispositionType == "Not Connected") {
        props.shuffledNotConnectedSucceding([]);
      } else {
        props.shuffledConnectedSucceding([])
      }
    }else{
      if (data?.length > 0) {
        if (list?.length > 0 && selectedDispositionDataChild?.length > 0) {
          let tempArr = [];
          const data = shuffledData?list
            .map((each, i) => {
              return each.respKey;
            })
            .filter((e) => e):list;
          // const data= selectedDispositionData
          let val = tableBodyData?.template.map((er) => {
            let index = data.indexOf(er.respKey);
            return (tempArr[index] = er);
          });
  
          if (data.length > 0) {
        
            let tVal =
              dispositionType == "Not Connected"
                ? tempArr
                    ?.map((each) => {
                      if (
                        separateSelectedDispositionData?.succeeding_not_connected?.length>0&& separateSelectedDispositionData?.succeeding_not_connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e)
                : tempArr
                    ?.map((each) => {
                      if (
                        separateSelectedDispositionData?.succeeding_connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e);
                   
            if (dispositionType == "Not Connected") {
              props.shuffledNotConnectedSucceding(tVal);
            } else {
              props.shuffledConnectedSucceding(tVal);
            }
          } else {
            let tVal =
              dispositionType == "Not Connected"
                ? tableBodyData?.template
                    .map((each) => {
                      if (
                        separateSelectedDispositionData?.succeeding_not_connected?.length>0&& separateSelectedDispositionData?.succeeding_not_connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e)
                : tableBodyData?.template
                    .map((each) => {
                      if (
                        separateSelectedDispositionData?.succeeding_connected?.length>0&&separateSelectedDispositionData?.succeeding_connected.includes(
                          each.respKey
                        )
                      ) {
                        return each;
                      }
                    })
                    .filter((e) => e);
                    
            if (dispositionType == "Not Connected") {
              props.shuffledNotConnectedSucceding(tVal);
            } else {
              props.shuffledConnectedSucceding(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          }
        }
      } else {
    
        if (list?.length > 0 && selectedDispositionDataChild?.length > 0) {
          let tempArr = [];
          const data = shuffledData?list
          .map((each, i) => {
            return each.respKey;
          })
          .filter((e) => e):list;
         
          // const data= selectedDispositionData
          let val = tableBodyData?.template.map((er) => {
            let index = data.indexOf(er.respKey);
            return (tempArr[index] = er);
          });
  
          
  
          if (data.length > 0) {
            let tVal =  dispositionType == "Not Connected"
            ?tempArr
              .map((each) => {
                if (  separateSelectedDispositionData?.succeeding_not_connected?.length>0&&separateSelectedDispositionData?.succeeding_not_connected.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e):
              tempArr
              .map((each) => {
                if ( separateSelectedDispositionData?.succeeding_connected?.length>0&&separateSelectedDispositionData?.succeeding_connected.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e)
              
            if (dispositionType == "Not Connected") {
              props.shuffledNotConnectedSucceding(tVal);
            } else {
              props.shuffledConnectedSucceding(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          } else {
            let tVal = tableBodyData?.template
              .map((each) => {
                if (selectedDispositionDataChild?.includes(each.respKey)) {
                  return each;
                }
              })
              .filter((e) => e);
              
            if (dispositionType == "Not Connected") {
              props.shuffledNotConnectedSucceding(tVal);
            } else {
              props.shuffledConnectedSucceding(tVal);
            }
            // props.shuffledDispositionCondition(tVal)
          }
        }
      }
    }
  
  };

  useEffect(() => {
    // if(toggle){
    //   if (sortedOrder?.length > 0) {
    //     return storePriorityList2(sortedOrder, "data",true);
    //   } else {
    //     let priorityData = tableBodyData?.template.map((each) => {
    //       return each.respKey;
    //     });
    //     return storePriorityList2(selectedDispositionData,"",false);
    //   }
    // }
    // else{
    if (sortedOrder?.length > 0) {
      if(!toggle){
        return storePriorityList(sortedOrder, "data",true) , storePriorityList2(sortedOrder, "data",true) ;
      }
       else{
        return storePriorityList2(sortedOrder, "data",true) ;

       }
     
    } else {
      let priorityData = tableBodyData?.template.map((each) => {
        return each.respKey;
      });
      return storePriorityList(selectedDispositionDataParent,"",false), storePriorityList2(selectedDispositionDataChild,"",false);

    }
  // }
  }, [sortedOrder, selectedDispositionDataParent?.length , selectedDispositionDataChild?.length]);

  useEffect(() => {
    if (tableBodyData?.template?.length > 0) {
        let value =dispositionType == "Not Connected"
          ? tableBodyData?.template?.filter((val) => {
              return val.groupKey == "not_connected";
            })
          : tableBodyData?.template?.filter((val) => {
              return val.groupKey == "connected";
            });
        let result=[]
      if (preferedTime || toggle) {
        //child --Abhishek Nayak
       let childShuffled = dispositionType == "Not Connected" ?  shuffledNotConnectedSucceding : shuffledConnectedSucceding
      let childResKey =[]
       childShuffled?.map( e =>  {
         if(e?.respKey){
            childResKey.push((e?.respKey))}
         })

     let tempFirst =[]
     let tempSecond =[]
     let final =[]
     if(childResKey?.length >0){
      value?.map( e => {
        if(childResKey?.includes(e?.respKey)){
          let indx = childResKey?.indexOf(e?.respKey)
          tempFirst[indx] = e
        }else{
          tempSecond.push(e)
        }
      })
     }
     if(tempFirst?.length){
      final = [...tempFirst]
     }
     if(tempSecond?.length){
      final = [...final , ...tempSecond]
     }
    
    
      let arrFinalValue = final?.length >0 ? final : value
   

     //----end logic child succeding
        //
         result = arrFinalValue?.map((each, i) => {
          return {
            condition: each.text,
            respKey: each.respKey,
            selectComponent: (
              <Checkbox
                extraSpan={
                  selectedDispositionDataChild?.length >0 && selectedDispositionDataChild?.includes(each.respKey)
                    ? "multi-border"
                    : "multi-border-bs"
                }
                checked={selectedDispositionDataChild?.length >0 && selectedDispositionDataChild?.includes(each.respKey) ? true : false}
                onChange={(e) => handleChange(each, each.respKey, i)}
              />
            ),
          };
        });
      } else {
      //parent -Abhishek logic
      let parentShuffled = dispositionType == "Not Connected" ?  shuffledDispositionData: shuffledConnectedDispositionData
      let parentResKey =[]
      parentShuffled?.map( e =>  {
        if(e?.respKey){
          parentResKey?.push((e?.respKey))}
        })
 
        let temppFirst =[]
        let temppSecond =[]
        let finalp =[]
        if( parentResKey?.length >0){
         value?.map( e => {
           if( parentResKey?.includes(e?.respKey)){
             let indx =  parentResKey?.indexOf(e?.respKey)
             temppFirst[indx] = e
           }else{
            temppSecond.push(e)
           }
         })
        }
        if(temppFirst?.length){
          finalp = [...temppFirst]
        }
        if(temppSecond?.length){
          finalp = [...finalp , ...temppSecond]
        }
       
       
         let arrFinalpValue =  finalp?.length >0 ?  finalp : value
       
      // end ---Paerent logic Abhishek 
      //
        result = arrFinalpValue?.map((each, i) => {
          let retryVal=retryTimeData?.length>0 ?retryTimeData.map((el)=>{
            if(el.key==each.respKey){
              return el.retryTime
            }
          }).filter(et=>et):0
          let hourVal=retryVal[0]/60
          let minVal=retryVal[0]-(Math.floor(hourVal)*60)
       
          return {
            condition: each.text,
            respKey: each.respKey,
            component: (
              <StartTimeEndTime
                value={each}
                handleHourChange={hourChange}
                handleMinChange={minChange}
                hourVal={Math.floor(hourVal)}
                minVal={minVal}
              />
            ),
            selectComponent: (
              <div className="checkbox-margin-bottom">
                <Checkbox
                  extraSpan={
                    selectedDispositionDataParent?.length >0 && selectedDispositionDataParent?.includes(each.respKey)
                      ? "multi-border"
                      : "multi-border-bs"
                  }
                  checked={selectedDispositionDataParent?.length >0 && selectedDispositionDataParent?.includes(each.respKey) ? true : false}
                  onChange={(e) => handleChange(each, each.respKey, i)}
                />
              </div>
            ),
          };
        });
      }

      setBodyData((prev) => result);
      }
      
  }, [tableBodyData,dispositionType,preferedTime,selectedDispositionData?.length,toggle,retryTimeData, shuffledDispositionData,shuffledConnectedSucceding,shuffledNotConnectedSucceding, shuffledConnectedDispositionData])

    useEffect(() => {
        props.dispositionType(checkedData);
  }, [checkedData]);

    const getModifiedData = (respKey, time, type) => {
        let tempVal = Object.assign(tableBodyData);
        tempVal["template"].map((er) => {
          if (er.respKey == respKey) {
            er[type] = time;
            return er;
          } else {
            return er;
          }
        });
         let tempData=tempVal.template.map((en)=>{
            return {key:en.respKey,retryTime:Number(en.retryHrTime*60)+Number(en.retryMinTime)}
          })
        props.selectedDataRetryTime(tempData)
        props.setDCBData(tempVal);
      };
      
    const hourChange = (hourValue, propsValue) => {
        getModifiedData(propsValue.respKey, hourValue, "retryHrTime");
      };
    
      const minChange = (minValue, propsValue) => {
        getModifiedData(propsValue.respKey, minValue, "retryMinTime");
      };


  return (
    <div className={`dcb-wrapper ${!toggle && !preferedTime ?"":"retry-time-hide"}`}>
      <div className="connected-section">
        <div className="initial-campaign-section">
          <div>
            <input
              type="radio"
              value="true"
              checked={checkedData == "Not Connected" ? true : false}
              className="scheduler-radio"
              name="Not Connected"
              onClick={() => setCheckedData((prev) => "Not Connected")}
            />
            Not Connected
            <input
              type="radio"
              value="true"
              checked={checkedData == "Connected" ? true: false}
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
        <div className={`callingcondition-wrapper dcb-condition-wrapper`}>
          <table
            // className={`${!toggle && !preferedTime ? "" : "retry-time-setion"}`}
          >
            <thead>
              <th>Priority</th>
              <th>Disposition</th>
              {!toggle && !preferedTime && <th>Retry Time</th>}
              <th>Select</th>
              <th></th>
            </thead>
            <DndComponent
                startingList={bodyData}
                sendOrder={(items) => {
                  setSortedOrder(prev=>items);
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
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      Object.assign({}, breadcrumActions, schedulerAction),
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DCBTableData);
