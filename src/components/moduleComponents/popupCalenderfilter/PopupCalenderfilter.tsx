import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../../redux";
import {
  DatePickermodule,
  ref as DatePickermoduleRef,
} from "../../generic/datePicker";
import styles from "./PopupCalenderfilter.module.scss";
import { DateToLocalString } from "../../../utils/time/time.util";
import { useSelector, useDispatch } from "react-redux";
import {
  setCalenderData,
  toggleShowRightSideBar,
} from "../../../redux/filters/actions";
import { transcriptPhoneApi } from "../../../redux/logger/transcript/actions/actions";
import {
  setShowRightSideBar,
  setSelectedFilterType,
} from "../../../redux/filters/actions";
import moment from "moment";

export default function PopupCalenderfilter(props:any) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [totalDays, setTotalDays] = useState<string>();
  const dispatch = useDispatch();
  const calenderData = useSelector(
    (state: RootState) => state.filterReducers.calenderData
  );

  const ref = useRef<DatePickermoduleRef>();
  function setOnChange() {
    if (ref.current) {
      setTotalDays(ref.current.getNumberOfDays());
      const updatedDates = ref.current.getUpdatedRange();
      setStartDate(() => {
        return updatedDates.startDate;
      });
      setEndDate(() => {
        return updatedDates.endDate;
      });
    }
  }

  useEffect(() => {
    setStartDate(calenderData.startDate);
    setEndDate(calenderData.endDate);
  }, []);
  function handleSubmit() {
    dispatch(setCalenderData({ startDate, endDate }));

    transcriptPhoneApi({ dategte: startDate, datetle: endDate });
    const formatedStartDate = moment(startDate).format("YYYY-MM-DD");

    const formatedEndDate = moment(endDate).format("YYYY-MM-DD");

    dispatch(
      setCalenderData({
        startDate,
        endDate,
        formatedStartDate,
        formatedEndDate,
      })
    );
    dispatch(setShowRightSideBar(false));
    dispatch(setSelectedFilterType(""));
    props.setSelectedIcon("");
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.date}>
          <div className={styles.startDate}>{DateToLocalString(startDate)}</div>
          <div>-</div>
          <div className={styles.endDate}>{DateToLocalString(endDate)}</div>
        </div>
        <div className={styles.totalDays}>{totalDays} days selected</div>
        <DatePickermodule
          range={{
            startDate: calenderData.startDate,
            endDate: calenderData.endDate,
          }}
          ref={ref}
          onChange={setOnChange}
        ></DatePickermodule>
      </div>
      <div className={styles.button}>
        <button onClick={handleSubmit}>View Result</button>
      </div>
    </>
  );
}
