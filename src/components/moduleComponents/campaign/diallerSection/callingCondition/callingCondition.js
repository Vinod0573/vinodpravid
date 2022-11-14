import React, { useEffect, useState } from "react";
import "./callingCondition.css";
import DndComponent from "../../../../generic/dndcomponent/DndComponent";
import downArrow from "../../../../../theme/assets/svg/campaign/priorityDropdownIcon.svg";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../../redux/breadcrum/actions";

function CallingCondition(props) {
  const [selectedPer, setSelectedPer] = useState();
  const [sortedOrder, setSortedOrder] = useState([]);
  const [listData, setlistData] = useState([]);
  const propsForFlow = {
    optionList: ["Post-EMI", "Pre-EMI"],
    imgSrcRight: downArrow,
    placeHolderText: "Select priority",
  };
  const propsForRisk = {
    optionList: ["High", "Medium", "Low"],
    imgSrcRight: downArrow,
    placeHolderText: "Select Risk Type",
  };
  const propsForEMI = {
    optionList: ["Increasing Order", "Decreasing Order"],
    imgSrcRight: downArrow,
    placeHolderText: "Select Order",
  };

  const list = props.callingData;

  useEffect(() => {
    setlistData(props.callingData);
  }, [props.callingData]);
  const onChangePer = (item) => {
    setSelectedPer((prev) => item);
  };
  var callingConditionData = useSelector((store) => {
    return store.breadcrumReducer.callingConditionData;
  });

  const storePriorityList = (list) => {
    if (list?.length > 0 && props.selectedCallingData?.length > 0) {
      let tempArr = [];
      const data = list
        .map((each, i) => {
          return each.condition;
        })
        .filter((e) => e);
      // const data= props.selectedCallingData
      let val = props.callingDataSection?.condition.map((er) => {
        let index = data.indexOf(er.text);
        return (tempArr[index] = er);
      });

      if (data.length > 0) {
        let tVal = tempArr
          .map((each) => {
            if (props.selectedCallingData?.includes(each.text)) {
              return each;
            }
          })
          .filter((e) => e);
        props.shuffledCallingCondition(tVal);
      } else {
        let tVal = props.callingDataSection?.condition
          .map((each) => {
            if (props.selectedCallingData?.includes(each.text)) {
              return each;
            }
          })
          .filter((e) => e);
        props.shuffledCallingCondition(tVal);
      }
    }
  };

  useEffect(() => {
    if (sortedOrder?.length > 0) {
      return storePriorityList(sortedOrder);
    } else {
      let priorityData = props.callingDataSection?.condition.map((each) => {
        return each.text;
      });
      return storePriorityList(priorityData);
    }
  }, [sortedOrder, props.selectedData?.length],props.selectedCallingData?.length);

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
            startingList={listData}
            sendOrder={(items) => {
           
              setSortedOrder(items);
            }}
          />
        
      </table>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    callingDataSection: state.breadcrumReducer?.callingCondition,
    selectedCallingData: state.breadcrumReducer?.selectedCallingData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, breadcrumActions), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CallingCondition);
