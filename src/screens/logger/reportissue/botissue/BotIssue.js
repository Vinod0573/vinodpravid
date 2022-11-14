import React, { useState, useEffect } from "react";
import "./BotIssue.css";

import DropdownIcon from "../../../../assets/summarysection/dropdownIcon.svg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../actions/reportIssueActions";

import MultiselectDropdownSp from "../../../schedulerAllComponent/MultiselectDropdownSp/MultiselectDropdownSp";

const BotIssue = (props) => {
  const [isDropdownShow,setIsDropDownShow]=useState(false)

  const [options, setOptions] = useState(() => {
    return {
      imgSrcRight: DropdownIcon,
      placeHolderText: "BOT",
      imgSrcLeft:"",
    };
  });

  const [botIssuesToBe, setBotIssuesToBe] = useState([
    "Wrong Flow",
    "Server Issue ",
    "Stuck in Loop",
    "End Call Abruptly",
    "No response",
    "Audio Issue",
    "Incorrect Disposition",
    "Other",
  ]);



  const [botIssuesSelected, setBotIssuesSelected] = useState();
  const [fixedData, setFixedData] = useState([]);

  useEffect(() => {
    if (!botIssuesSelected || botIssuesSelected?.length < 1) {
      // alert('jai');
      setOptions((prev) => {
        return {
          ...prev,
          imgSrcLeft: "",
        };
      });
    } else {
      // alert('jai');
      setOptions((prev) => {
        return {
          ...prev,
          imgSrcLeft: "",
        };
      });
    }
  

    
  }, [botIssuesSelected]);

  // To get selected value and set to reducer form multiselect
  const getSelectedData = (value) => {
    if (value?.length <= 0 || !value) {
      props.setBotIssueData(null);
    } else {
      props.setBotIssueData(value);
    }

    if (props.allSelectedReportIssueData) {
      let forDeletion = [...botIssuesToBe];
      let tempAllFiltered = props.allSelectedReportIssueData;
      tempAllFiltered = tempAllFiltered.filter(
        (item) => !forDeletion.includes(item)
      );
      let temp = [...tempAllFiltered, ...value];
      if (temp?.length > 0) {
        props.setAllSelectedReportIssueData(temp);
      } else {
        props.setAllSelectedReportIssueData(null);
      }
    } else {
      if (value?.length <= 0 || !value) {
        props.setAllSelectedReportIssueData(null);
      } else {
        props.setAllSelectedReportIssueData(value);
      }
    }
    //console.log(value);
    setBotIssuesSelected((prev) => value);
  };

  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
    // alert("yes");
    setBotIssuesSelected((prev) => value);
    //props.setbotIssueFilterData(value);
  };

  useEffect(() => {
    let temp = props.botIssueData;
    updateMultiSelectedData(temp);
  }, [props.botIssueData]);

  return (
    <>
      <div
        className={`botIssueWrapper ${
          props.hideFilterList?.includes("botIssue")
            ? "hidePointerEventUniversaljp"
            : ""
        }`}
      >
        {botIssuesSelected&&botIssuesSelected.length>0&&<div className="placeholder-up">BOT</div>}
        <div>
          <MultiselectDropdownSp
            toBeFilterData={botIssuesToBe}
            options={options}
            extraSelectedClass="extraReportIssueSelectedClassMS"
            getFilteredData={(value) => getSelectedData(value)}
            key="botIssueMultiSelectOne"
            selectedDataOutside={botIssuesSelected}
            multiselectWrapperWrapper="extraClassMultiselectWrapperWrapperMS"
             leftImgStyle="extraClassLeftImgStyleMS"
            rightImgStyle="extraClassRightImgStyle"
            filterDataTobeSelected="extraReportIssueToBeSelectedMS"
            isDropdownShow={isDropdownShow}
            setIsDropDownShow={setIsDropDownShow}
            // isDisable={props.disableFilterList?.includes('botIssue') ? true : false}
          />
        </div>
        
        <div className="goinbox"> {
          (botIssuesSelected?.length==1)?
          <p className="err"><span className="err-box">{botIssuesSelected[0]}</span></p>:
          (botIssuesSelected?.length==2)?
          
          <p className="err"><span className="err-box">{botIssuesSelected[0]}</span>
          <span  className="err-box">{botIssuesSelected[1]}</span></p>
          :(botIssuesSelected?.length>2)?
          
          <p className="err">
          <span className="err-box">{botIssuesSelected[0]}</span>
          <span  className="err-box">{botIssuesSelected[1]}</span>
          
          <span className="err-boxx" onClick={()=>setIsDropDownShow(true)}>{`+${botIssuesSelected.length-2}`}</span>
          </p>:
          <>{``}</>
         
        } </div>
        
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    botIssueData: state.reportIssueReducer.botIssueData,
    // fetchedIssueData: state.reportIssueReducer.fetchedIssueData,
    allSelectedReportIssueData:
      state.reportIssueReducer.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BotIssue);
