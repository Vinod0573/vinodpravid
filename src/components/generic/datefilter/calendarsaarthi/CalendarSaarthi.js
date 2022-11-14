import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {addYears } from "date-fns";
import './CalendarSaarthi.css';

import CrossIcon from "../../../../theme/assets/genericSvg/crossIcon.svg";
import React, { useEffect,useRef } from 'react';
import Button from "../../button/Button";


// requre parameter   1) range 2) close event 3) submit date range 4) onChange
const CalendarSaarthi = (props) =>{
  const ref=useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if ( props.calenderOpen && ref.current && !ref.current.contains(e.target)) {
        props.handleClickCloseCalendar(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [props.calenderOpen])

    return(
        <>
        <div className={`calendarSaarthiTopdiv ${props.extraStyle?props.extraStyle:""}`} ref={ref}>
                <div className="calendarSelectDateRange">
                  <div>
                    <p>Select Date Range</p>
                  </div>
                  <div>
                    <img
                    onClick={() => props.handleClickCloseCalendar(false)}
                      style={{ cursor: "pointer" }}
                      src={CrossIcon}
                      alt="Cross"
                    />
                  </div>
                </div>
                <div
                  id="exceptClick"
                  style={{ backgroundColor: "white"}}
                >
                  <DateRange 
                    onChange={(item) => props.dateFormater(item)}
                    showSelectionPreview={false}
                    editableDateInputs={true}
                    //disabled={true}
                    moveRangeOnFirstSelection={false}
                    //months={2}
                    //fixedWidth={true}
                     ranges={props.dateRange}
                    direction="horizontal"
                    maxDate={addYears(new Date(), +7)}
                    minDate={ props.disableRange ? addYears(new Date(), 0) : addYears(new Date(), -7)}
                  />
                 
                </div>
                <div className="summitDateRange">
                  {/* <img
                     onClick={()=>props.handleSumitDateRange(false)}
                    style={{ cursor: "pointer" }}
                    src={ForwardArrowIcon}
                    alt="Forward"
                  /> */}
                  <Button
                text= { props.typeText?.length ? (props.typeText ==="campaign" ? "Submit" : "Update") : "View Result" }
                extraClass="calendarViewResultButton"
                onClick={()=>props.handleSumitDateRange(false)}
              ></Button>
                </div>
              </div>
        </>
    )
}

export default CalendarSaarthi;