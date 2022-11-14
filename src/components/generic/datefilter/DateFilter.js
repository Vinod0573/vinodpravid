import React, { useState } from "react";
import "./DateFilter.css";

import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
 import {setDateFilterData} from  "../../../redux/filter/actions"

import moment from "moment";
import { format } from "date-fns";


import CalendarSaarthi from "./calendarsaarthi/CalendarSaarthi";
import { toConvertCalendarDate } from "../../../utils/ConvertTime";
import CalendarIcon from "../../../theme/assets/genericSvg/calendarIcon.svg";
import CalendarColorIcon from "../../../theme/assets/genericSvg/calenderColor.svg"

const DateFilter = (props) => {

  const [dateRange, setDateRange] = useState([
    {
      startDate: props.filteredDateRangeData ? moment(props.filteredDateRangeData?.fromDate).toDate() :  format(new Date(),"yyy-MM-dd"),
      endDate: props.filteredDateRangeData ? moment(props.filteredDateRangeData?.toDate).toDate() : format(new Date(),"yyy-MM-dd"),
      key: "selectiont"
    },
  ]);



  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const dateFormater = (item) => {
    setDateRange([item.selectiont]);
      if(props.hideBtnUp){
       props.hideBtnUp(true)
      }
  };
  const dispatch = useDispatch()

  // console.log("dd", dateRange)
  // To Close the calendar
  const handleClickCloseCalendar = (value) => {
    let temp = false;
    setIsCalendarOn((previousState) => false);
    return false;
  };



  const handleSumitDateRange = async () => {
    if(props.onChangeValue){
         props.getonChangeValue({
          fromDate: format(new Date(dateRange[0].startDate), "yyyy-MM-dd"),
          toDate: format(new Date(dateRange[0].endDate), "yyyy-MM-dd")
         })
         dispatch(setDateFilterData({ fromDate: format(new Date(dateRange[0].startDate), "yyyy-MM-dd"),
           toDate: format(new Date(dateRange[0].endDate), "yyyy-MM-dd") }));
           setIsCalendarOn((previousState) => false);
    }
    else{
    if (dateRange[0].startDate && dateRange[0].endDate) {
      let today = format(new Date(),"yyy-MM-dd");
      const from_date = dateRange[0].startDate
        ? format(new Date(dateRange[0].startDate), "yyyy-MM-dd")
        : today;
      const to_date = dateRange[0].endDate
        ? format(new Date(dateRange[0].endDate), "yyyy-MM-dd")
        : today;
      dispatch(setDateFilterData({ fromDate: from_date, toDate: to_date }));
      setIsCalendarOn((previousState) => false);
    }
  }
  };

  return (
    <>
      <div className="dateFilterWrapper">
        {props.dateHeader && props.dateHeader=="show"?"":<div className="dfTitle">
          <p>Date Range</p>
        </div>}
        <div>
          <div className="fdCalendarArea">
            <div
              className={`fdCalendarDateRange`}
            >
              {/* &nbsp;&nbsp; */}
              <span
                className= {`dateRangeAreafltr ${props.schedulerFilter ? " schedulerDateFilter" : ""}` }
                style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                onClick={() => {
                  setIsCalendarOn((previousState) => !previousState);
                }}
              >
                {" "}
                {props.filteredDateRangeData?.fromDate
                  ? moment(props.filteredDateRangeData.fromDate).format("DD MMM YY")
                  : toConvertCalendarDate(dateRange[0].startDate)}{" "}
                -{" "}
                {props.filteredDateRangeData?.toDate
                  ? moment(props.filteredDateRangeData.toDate).format("DD MMM YY")
                  : toConvertCalendarDate(dateRange[0].endDate)}{" "}
              </span>
              &nbsp;&nbsp;
              <span
                onClick={() => {
                  setIsCalendarOn((previousState) => !previousState);
                }}
              >
                {" "}
                <img src={props.schedulerFilter ? CalendarColorIcon:
                 isCalendarOn===true? CalendarColorIcon : CalendarIcon} style={{width:"15px"}} alt="Calendar Icon" />
              </span>{" "}
            </div>
            {isCalendarOn && (
              <CalendarSaarthi
                dateRange={dateRange}
                dateFormater={(value) => dateFormater(value)}
                handleClickCloseCalendar={(value) =>
                  handleClickCloseCalendar(value)
                }
                handleSumitDateRange={() => handleSumitDateRange()}
                extraStyle="cal-pos"
                calenderOpen={isCalendarOn}
                disableRange ={props.disableRangeMin}
                typeText = {props.typeText}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    filterData: state.filterReducer?.filterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, setDateFilterData), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
