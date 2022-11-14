import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../redux/breadcrum/actions";
import DndComponent from "../../../generic/dndcomponent/DndComponent";
import PriorityDropdown from "../../../generic/priorityDropdown/PriorityDropdown";
import SameDayComponent from "../samedayComponent/SameDayComponent";
import "./CallingConditionTableData.css";
import downArrow from "../../../../theme/assets/svg/campaign/priorityDropdownIcon.svg";
import  Checkbox  from "../../../generic/checkbox/Checkbox";
import "./CallingConditionTableData.css";


function CallingConditionTableData(props) {
  const [bodyData, setBodyData] = useState([]);
  const [sortedOrder, setSortedOrder] = useState([]);
  const [frequency, setFrequency] = useState("");
  const [callingData, setCallingData] = useState([]);
  const [droppedData,setDroppedData]=useState([])

  const tableBodyData = useSelector((store) => {
    return store.breadcrumReducer?.callingCondition;
  }) || [];

  const shuffledCallingCondition=useSelector((store)=>{
    return store.breadcrumReducer?.shuffledCallingConditionData
  })

  const emiOrder=useSelector((store)=>{
    return store.breadcrumReducer?.selectedEMIOrder
  })


  const onChangeFrequency = (item) => {
    setFrequency((prev) => item);
  };

  const prioratizeData=(callingData)=>{
    if(callingData?.includes("Due Date")){
        let priorityVal=[...tableBodyData.condition]
        let tempPriorData=[]
        priorityVal.map((er)=>{
            if(er.text!="Due Date"){
                tempPriorData.push(er)
            }else{
                tempPriorData.unshift(er)
            }
        })
        let setPriorityOrder={...tableBodyData}
        setPriorityOrder["condition"]=tempPriorData
        let fVal=tempPriorData.map((et)=>{
          if(callingData.includes(et.text)){
            return et.text
          }

        }).filter((e)=>e)
        console.log(callingData,tempPriorData,fVal,"lol")
        props.setSelectedCallingData(fVal);
        props.setCallingCondition(setPriorityOrder)
    }else{
        let priorityVal=[...tableBodyData.condition]
        let tempPriorData=[]
        priorityVal.map((er)=>{
                let index=callingData.indexOf(er.text)
                if(index==-1){
                    tempPriorData.push(er)
                }else{
                    tempPriorData.unshift(er)
                }
        })
        let setPriorityOrder={...tableBodyData}
        setPriorityOrder["condition"]=tempPriorData
        let fVal=tempPriorData.map((et)=>{
          return et.text
        })
        console.log(callingData,"lol")
        let newModifiedCaling = [...callingData]
        props.setSelectedCallingData(newModifiedCaling)
        // props.setCallingCondition(setPriorityOrder)
    }
  }

  const handleCallingPriorityChange = (e, name, i) => {
    // let tempVal = callingData;
    let tempVal=callingData
    if (!tempVal.includes(name)) {
      tempVal.push(name);
    } else {
      const index = tempVal.indexOf(name);
      if (index > -1) {
        tempVal.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setCallingData((prev) => tempVal);
    prioratizeData(tempVal)


  };

  useEffect(()=>{
    if(shuffledCallingCondition?.length>0){
      let shuffledData=shuffledCallingCondition.map((each)=>{
        return each.text
      })
      setCallingData(prev=>shuffledData)
    }

  },[shuffledCallingCondition])

  useEffect(() => {
    if (tableBodyData?.condition?.length > 0) {
      let bData = tableBodyData.condition.map((each, i) => {

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
                        <span className={`data-section`}>{
                        each.text=="EMI Value"&& emiOrder?.length>0?emiOrder:
                        each.value[0]}</span>
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
                handleSearchItem={frequency}
                selectedItem={(item) => onChangeFrequency(item)}
                extraClassSelectedArea={"preEmidropdown"}
                extraClassToBeSelectedArea={"dropdowndListArea"}
                fData={(data)=>{setDroppedData(data)
                }}
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
              onChange={(e) => handleCallingPriorityChange(e, each.text, i)}
            />
          ),
        };
      });
      setBodyData((prev) => bData);
    }
    // props.setSelectedCallingData([]);
  }, [tableBodyData,callingData?.length,droppedData]);


  // useEffect(()=>{
  //   if(shuffledCallingCondition?.length>0){
  //     alert("ya")
  //     let tempArr=[]
  //     let shuffleData=shuffledCallingCondition.map((ed)=>{
  //         return ed.text
  //     })
  //     let data={...tableBodyData}
  //     data.condition.map((ec)=>{
  //       let index=shuffleData.indexOf(ec.text)
  //         return tempArr[index]=ec
  //     })
  //     data["condition"]=tempArr
  //     props.setCallingCondition(data)
  //     console.log(tempArr)
  //   }

  // },[shuffledCallingCondition])
useEffect(()=>{
  setDroppedData(emiOrder)
},[emiOrder])
  useEffect(()=>{

    let tempArr=props.selectedCallingData?.length>0?
    props.selectedCallingData.map((er)=>{
      return er.text?er.text:""
    }):[]
    setCallingData(prev=> tempArr)
    // prioratizeData(props.selectedCallingData)
  },[props.selectedCallingData?.length])

  const storePriorityList = (list,isShuffled) => {
    if (list?.length > 0 && callingData?.length > 0) {
      let tempArr = [];
      const data = isShuffled?
      list
        .map((each, i) => {
          return each.condition;
        })
        .filter((e) => e)
      :list
      // const data= props.selectedCallingData
      let val = tableBodyData?.condition?.map((er) => {
        let index = data.indexOf(er.text);
        return (tempArr[index] = er);
      });

      if (data.length > 0) {
        let tVal = tempArr
          .map((each) => {
            if (callingData?.includes(each.text)) {
              return each;
            }
          })
          .filter((e) => e);

        props.shuffledCallingCondition(tVal);
      } else {
        let tVal = props.callingDataSection?.condition
          .map((each) => {
            if (callingData?.includes(each.text)) {
              return each;
            }
          })
          .filter((e) => e);

        props.shuffledCallingCondition(tVal);
      }
    }else{
      props.shuffledCallingCondition([]);
    }
  };

  useEffect(() => {
    if (sortedOrder?.length > 0) {
      let val=sortedOrder.map((ea)=>{return ea.condition})
      // console.log(val,sortedOrder)
      // props.getCallingCondition()
      return storePriorityList(sortedOrder,true);
    } else {
      let priorityData = tableBodyData?.condition?.map((each) => {
        return each.text;
      });
      // console.log(props.selectedCallingData,"vvvv")
      return storePriorityList(props.selectedCallingData,false);
    }

  }, [sortedOrder,callingData?.length]);

  const setDueDate=(dat)=>{
    let priorityVal=[...tableBodyData?.condition]
        let tempPriorData=[]
        priorityVal.map((er)=>{
          let index=dat.indexOf(er.text)
          tempPriorData[index]=er
        })
        let setPriorityOrder={...tableBodyData}
        setPriorityOrder["condition"]=tempPriorData
        let fVal=tempPriorData.map((et)=>{
          return et.text
        })
        props.setCallingCondition(setPriorityOrder)
  }

  console.log(tableBodyData)
  return (
    <div className="callingcondition-wrapper">
      <table>
        <thead>
          <th>Priority</th>
          <th>Condition</th>
          <th>Parameters</th>
          <th>Select</th>
          <th></th>
        </thead>
        <DndComponent
          startingList={bodyData}
          sendOrder={(items) => {
            if(props.selectedCallingData?.includes("Due Date")){
              let sortedTempData=[]
              let sortedDueDate=[]
              let data=items?.map((er)=>{
                if(er.condition=="Due Date"){
                  sortedTempData[0]=er
                }else{
                  sortedDueDate.push(er)
                }
              })
              sortedTempData.push(...sortedDueDate)
              let dat=sortedTempData.map((ed)=>{
                return ed.condition
              })
              console.log(sortedTempData,"tyty")
              // setCallingData(prev=>dat)
              // props.setSelectedCallingData(dat);
              setDueDate(dat)
              setSortedOrder(sortedTempData);
            }else{
              setSortedOrder(items);
            }

          }}
        />
      </table>
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
)(CallingConditionTableData);
