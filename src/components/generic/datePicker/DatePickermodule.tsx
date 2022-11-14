import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { props, rangeForCalender } from "./DatePickermodule.interface";
import styles from "./DatePickermodule.module.scss";
import { numberOfDays } from "./DatePickermodule.util";

const minDate = new Date(2015, 0);

const DatePickermodule = React.forwardRef((props: props, ref) => {
  const calenderRef = useRef<any>();
  const [range, setRange] = useState<rangeForCalender>(
    props.range
      ? {
          startDate: props.range.startDate,
          endDate: props.range.endDate,
          key: "key",
        }
      : {
          startDate: new Date(),
          endDate: new Date(),
          key: "key",
        }
  );
  useEffect(() => {
    // console.log(range, "changed");
    props.onChange();
  }, [range]);
  useImperativeHandle(ref, () => ({
    getNumberOfDays: () => {
      return numberOfDays(range.startDate, range.endDate);
    },
    getUpdatedRange: () => {
      return {
        startDate: range.startDate,
        endDate: range.endDate,
        totalDays: numberOfDays(range.startDate, range.endDate),
      };
    },
  }));

  return (
    <div ref={calenderRef} className={styles.wrapper}>
      <DateRangePicker
        ranges={[range]}
        minDate={minDate}
        onChange={(e: any) => {
          const newrange: rangeForCalender = {
            startDate: e.key.startDate,
            endDate: e.key.endDate,
            key: "key",
          };
          // console.log(newrange);
          setRange(newrange);
        }}
        showSelectionPreview={false}
      />
    </div>
  );
});
DatePickermodule.displayName = "DatePickermodule";
export default DatePickermodule;
