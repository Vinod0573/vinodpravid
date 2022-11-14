import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import portalTypes from "./portalTypes";
import FeedbackHistoryPortal from "../../components/moduleComponents/logger/feedbackHistoryPortal/feedbackHistoryPortal";
import SummaryPortal from "../../components/moduleComponents/report/summaryPortal/SummaryPortal";

export default function rootPortal() {
  const rootPortalScreen: string = useSelector(
    (store: RootState) => store.baseScreen.baseScreenState.rootPortalScreen
  );
  // console.log(rootPortalScreen === portalTypes.FEEDBACK_HISTORY_PORTAL);
  switch (rootPortalScreen) {
    case portalTypes.FEEDBACK_HISTORY_PORTAL: {
      return createPortal(
        <FeedbackHistoryPortal />,
        document.getElementById("root-portal")!
      );
    }
    case portalTypes.SUMMARY_PORTAL: {
      return createPortal(
        <SummaryPortal />,
        document.getElementById("root-portal")!
      );
    }
    default: {
      return <></>;
    }
  }
}
