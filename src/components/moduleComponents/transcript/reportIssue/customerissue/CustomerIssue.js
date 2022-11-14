import React, { useState, useEffect } from "react";
import "./CustomerIssue.css";

import { dropdownDownArrow as DropdownIcon } from "../../../../../theme/assets/svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../../redux/logger/reportIssue/reportIssueActions";
import MultiselectDropdownSp from "../../../../generic/MultiselectDropdownSp/MultiselectDropdownSp";
const CustomerIssue = (props) => {
  const [options, setOptions] = useState(() => {
    return {
      imgSrcRight: DropdownIcon,
      placeHolderText: "CUSTOMER",
      imgSrcLeft: "",
    };
  });

  const [isDropdownShow, setIsDropDownShow] = useState(false);
  const [customerIssuesToBe, setCustomerIssuesToBe] = useState([
    "No Response",
    "Wrong Response",
    "Interrupt",
    "Background Noise",
  ]);
  const [customerIssuesSelected, setCustomerIssuesSelected] = useState();
  const [fixedData, setFixedData] = useState([]);

  useEffect(() => {
    if (!customerIssuesSelected || customerIssuesSelected?.length < 1) {
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
  }, [customerIssuesSelected]);

  // To get selected value and set to reducer form multiselect
  const getSelectedData = (value) => {
    if (value?.length <= 0 || !value) {
      props.setCustomerIssueData(null);
    } else {
      props.setCustomerIssueData(value);
    }

    if (props.allSelectedReportIssueData) {
      let forDeletion = [...customerIssuesToBe];
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
    setCustomerIssuesSelected((prev) => value);
  };

  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
    // alert("yes");
    setCustomerIssuesSelected((prev) => value);
    //props.setCustomerIssueFilterData(value);
  };

  useEffect(() => {
    let temp = props.customerIssueData;
    updateMultiSelectedData(temp);
  }, [props.customerIssueData]);

  return (
    <>
      <div
        className={`CustomerIssueWrapper ${
          props.hideFilterList?.includes("CustomerIssue")
            ? "hidePointerEventUniversaljp"
            : ""
        }`}
      >
        {customerIssuesSelected && customerIssuesSelected.length > 0 && (
          <div className="placeholder-up">CUSTOMER</div>
        )}
        <div>
          <MultiselectDropdownSp
            toBeFilterData={customerIssuesToBe}
            options={options}
            extraSelectedClass="extraReportIssueSelectedClassMS"
            getFilteredData={(value) => getSelectedData(value)}
            key="CustomerIssueMultiSelectOne"
            selectedDataOutside={customerIssuesSelected}
            multiselectWrapperWrapper="extraClassMultiselectWrapperWrapperMS"
            leftImgStyle="extraClassLeftImgStyleMS"
            filterDataTobeSelected="extraReportIssueToBeSelectedMS"
            isDropdownShow={isDropdownShow}
            setIsDropDownShow={setIsDropDownShow}
            // isDisable={props.disableFilterList?.includes('CustomerIssue') ? true : false}
          />
        </div>
        <div className="goinbox">
          {customerIssuesSelected?.length == 1 ? (
            <p className="err">
              <span className="err-box">{customerIssuesSelected[0]}</span>
            </p>
          ) : customerIssuesSelected?.length == 2 ? (
            <p className="err">
              <span className="err-box">{customerIssuesSelected[0]}</span>
              <span className="err-box">{customerIssuesSelected[1]}</span>
            </p>
          ) : customerIssuesSelected?.length > 2 ? (
            <p className="err">
              <span className="err-box">{customerIssuesSelected[0]}</span>
              <span className="err-box">{customerIssuesSelected[1]}</span>

              <span
                className="err-boxx"
                onClick={() => setIsDropDownShow(true)}
              >{`+${customerIssuesSelected.length - 2}`}</span>
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
    customerIssueData: state.loggerReducer.reportIssue?.customerIssueData,
    allSelectedReportIssueData:
      state.loggerReducer.reportIssue?.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerIssue);
