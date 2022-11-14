import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import Transcript from "./transcript/Transcript";
import Report from "./report/Report";
import { setIsActivePageType } from "../../redux/onboarding/login/actions";

export default function Logger() {
  // useEffect(() => {
  //   setIsActivePageType("Logger");
  // }, []);
  const currentPage = useSelector(
    (store: RootState) => store.loggerReducer.loggerState.currentPage
  );
  return <>{currentPage === "Report" ? <Report /> : <Transcript />}</>;
}
