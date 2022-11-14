import React, { useState, useEffect } from "react";
import "./OtherIssue.css";

import { dropdownDownArrow as DropdownIcon } from "../../../../../theme/assets/svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../../redux/logger/reportIssue/reportIssueActions";

import MultiselectDropdownSp from "../../../../generic/MultiselectDropdownSp/MultiselectDropdownSp";

const OtherIssue = (props) => {
  const [options, setOptions] = useState(() => {
    return {
      imgSrcRight: DropdownIcon,
      placeHolderText: "OTHERS",
      imgSrcLeft: "",
    };
  });
  const [isDropdownShow, setIsDropDownShow] = useState(false);
  const [otherIssuesToBe, setOtherIssuesToBe] = useState(["Data Mismatch"]);
  const [otherIssuesSelected, setOtherIssuesSelected] = useState();
  const [fixedData, setFixedData] = useState([]);
  useEffect(() => {
    if (!otherIssuesSelected || otherIssuesSelected?.length < 1) {
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
  }, [otherIssuesSelected]);

  // To get selected value and set to reducer form multiselect
  const getSelectedData = (value) => {
    if (value?.length <= 0 || !value) {
      props.setOthersIssueData(null);
    } else {
      props.setOthersIssueData(value);
    }

    if (props.allSelectedReportIssueData) {
      let forDeletion = otherIssuesToBe;
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
    setOtherIssuesSelected((prev) => value);
  };

  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
    // alert("yes");
    setOtherIssuesSelected((prev) => value);
    //props.setOtherIssueFilterData(value);
  };

  useEffect(() => {
    let temp = props.otherIssueData;
    updateMultiSelectedData(temp);
  }, [props.otherIssueData]);

  return (
    <>
      <div
        className={`OtherIssueWrapper ${
          props.hideFilterList?.includes("OtherIssue")
            ? "hidePointerEventUniversaljp"
            : ""
        }`}
      >
        {otherIssuesSelected && otherIssuesSelected.length > 0 && (
          <div className="placeholder-up">OTHER</div>
        )}
        <div>
          <MultiselectDropdownSp
            toBeFilterData={otherIssuesToBe}
            options={options}
            extraSelectedClass="extraReportIssueSelectedClassMS"
            getFilteredData={(value) => getSelectedData(value)}
            key="OtherIssueMultiSelectOne"
            selectedDataOutside={otherIssuesSelected}
            multiselectWrapperWrapper="extraClassMultiselectWrapperWrapperMS"
            filterDataTobeSelected="extraReportIssueToBeSelectedMS"
            leftImgStyle="extraClassLeftImgStyleMS"
            isDropdownShow={isDropdownShow}
            setIsDropDownShow={setIsDropDownShow}
            // isDisable={props.disableFilterList?.includes('OtherIssue') ? true : false}
          />
        </div>
        <div className="goinbox">
          {otherIssuesSelected?.length == 1 ? (
            <p className="err">
              <span className="err-box">{otherIssuesSelected[0]}</span>
            </p>
          ) : otherIssuesSelected?.length == 2 ? (
            <p className="err">
              <span className="err-box">{otherIssuesSelected[0]}</span>
              <span className="err-box">{otherIssuesSelected[1]}</span>
            </p>
          ) : otherIssuesSelected?.length > 2 ? (
            <p className="err">
              <span className="err-box">{otherIssuesSelected[0]}</span>
              <span className="err-box">{otherIssuesSelected[1]}</span>

              <span
                className="err-boxx"
                onClick={() => setIsDropDownShow(true)}
              >{`+${otherIssuesSelected.length - 2}`}</span>
            </p>
          ) : (
            <>{``}</>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    otherIssueData: state.loggerReducer.reportIssue?.otherIssueData,
    allSelectedReportIssueData:
      state.loggerReducer.reportIssue?.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherIssue);
