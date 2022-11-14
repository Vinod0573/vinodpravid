import React, { useState } from "react";
import "./MonthMultiFilter.css";

function MonthMultiFilter() {
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState("2022");
  const [highlight, setHighight] = useState(false);

  const OnselectMonth = (e) => {
    if (month.includes(e.target.value)) {
      let montha = month?.filter((val) => val !== e.target.value);
      setMonth([...montha]);
     
    } else {

      setMonth([...month, e.target.value]);
      setHighight((prev) => false);
    }
  };
  const yearChange = (data) => {
    if (year) {
      if (data === "Inc") {
        setYear((prev) => year + 1);
      } else {
        setYear((prev) => year - 1);
      }
    }
  };
   
  return (
    <div className="multiMonthWrapper">
      <div className="yearDiv">
        <div className="yearRangeChange">
          <div onClick={() => yearChange("Dec")}
           className= "cursorPointer"
          >&lt;</div>
          <div>{year}</div>
          <div className= "cursorPointer" onClick={() => yearChange("Inc")}>&gt;</div>
        </div>
      </div>
      <div className="monthDiv">
        <div className="monthPicker">
          <button
            className= {`monthButton ${month.includes("Jan" + year) ? "hightlight" : ""}`}
            value={"Jan" + year}
            onClick={(e) => OnselectMonth(e)}
          >
            Jan
          </button>
          <button
            className= {`monthButton ${month.includes("Feb" + year) ? "hightlight" : ""}`}
            value={"Feb"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Feb
          </button>
          <button
          className= {`monthButton ${month.includes("March" + year) ? "hightlight" : ""}`}
            value={"March"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            March
          </button>
        </div>
        <div className="monthPicker">
          <button
         className= {`monthButton ${month.includes("April" + year) ? "hightlight" : ""}`}
            value={"April"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            April
          </button>
          <button
           className= {`monthButton ${month.includes("May" + year) ? "hightlight" : ""}`}
            value={"May"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            May
          </button>
          <button
           className= {`monthButton ${month.includes("Jun" + year) ? "hightlight" : ""}`}
            value={"Jun"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Jun
          </button>
        </div>
        <div className="monthPicker">
          <button
         className= {`monthButton ${month.includes("July" + year) ? "hightlight" : ""}`}
            value={"July"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            July
          </button>
          <button
         className= {`monthButton ${month.includes("Aug" + year) ? "hightlight" : ""}`}
            value={"Aug"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Aug
          </button>
          <button
           className= {`monthButton ${month.includes("Sept" + year) ? "hightlight" : ""}`}
            value={"Sept"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Sept
          </button>
        </div>
        <div className="monthPicker">
          <button
           className= {`monthButton ${month.includes("Oct" + year) ? "hightlight" : ""}`}
            value={"Oct"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Oct
          </button>
          <button
           className= {`monthButton ${month.includes("Nov" + year) ? "hightlight" : ""}`}
            value={"Nov"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Nov
          </button>
          <button
           className= {`monthButton ${month.includes("Dec" + year) ? "hightlight" : ""}`}
            value={"Dec"+ year}
            onClick={(e) => OnselectMonth(e)}
          >
            Dec
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonthMultiFilter;
