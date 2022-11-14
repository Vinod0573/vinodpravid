import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../../../../redux";
import {
  DatePickermodule,
  ref as DatePickermoduleRef,
} from "../../../../generic/datePicker";
import styles from "./FeedbackCalender.module.scss";
import { DateToLocalString } from "../../../../../utils/time/time.util";
import { useSelector, useDispatch } from "react-redux";
import { setFeedbackCalender } from "../../../../../redux/logger/loggerState/action";

interface propsInterface {
  setShowCalender: any;
}

export default function PopupCalenderfilter(props: propsInterface) {
  const calenderData = useSelector(
    (state: RootState) => state.loggerReducer.loggerState.feedbackCalender
  );

  const [startDate, setStartDate] = useState<Date>(calenderData.startDate);
  const [endDate, setEndDate] = useState<Date>(calenderData.endDate);
  const [totalDays, setTotalDays] = useState<string>();
  const dispatch = useDispatch();

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
    dispatch(setFeedbackCalender({ startDate, endDate }));
    props.setShowCalender(false);
    // transcriptPhoneApi({ dategte: startDate, datetle: endDate });
    // const formatedStartDate = moment(startDate).format("YYYY-MM-DD");

    // const formatedEndDate = moment(endDate).format("YYYY-MM-DD");

    // dispatch(
    //   setCalenderData({
    //     startDate,
    //     endDate,
    //     formatedStartDate,
    //     formatedEndDate,
    //   })
    // );
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
