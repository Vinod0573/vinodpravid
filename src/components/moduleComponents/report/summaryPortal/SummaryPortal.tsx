import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
// import { crossThinIcon } from "../../../../theme/assets/genericSvg";
// import { downloadIcon } from "../../../../theme/assets/svg/rightSideIcon";
import {
  getMessages,
  getSummaryByAPI,
} from "../../../../redux/logger/loggerState/action";
import SummaryFeedback from "../../logger/summaryFeedback/SummaryFeedback";
import ConversationCardsWrapper from "../../../generic/conversationCards/ConversationCardsWrapper";
import "./SummaryPortal.scss";
import { RootState } from "../../../../redux";
import { setRootPortalScreen } from "../../../../redux/baseScreen/baseScreenState/actions";
import { portalTranscriptDownloadCSV } from "../../../../redux/logger/loggerState/action";
import portalTypes from "../../../../screens/rootPortal/portalTypes";
import { DateToLocalString } from "../../../../utils/time/time.util";
import PravidIcons from "../../../generic/icon/PravidIcons";
export default function SummaryPortal() {
  /* redux hooks */
  const summary = useSelector(
    (store: RootState) => store.loggerReducer?.loggerState?.summaryData[0]
  );
  const conversationId = useSelector(
    (store: RootState) =>
      store.baseScreen.baseScreenState.conversationIdSummaryPortal
  );
  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );
  const channelTab = useSelector(
    (store: RootState) => store.dashboardReducer?.channelTab
  );
  const dispatch = useDispatch();

  /* useEffect */
  useEffect(() => {
    if (conversationId) {
      dispatch(getMessages(conversationId));
      dispatch(getSummaryByAPI(conversationId));
    }
  }, [conversationId]);

  /* handlers */
  const handleCrossIconClick = () => {
    dispatch(setRootPortalScreen(portalTypes.NULL_PORTAL));
  };
  const handleDownloadClick = () => {
    const bodyData = { accountName, conversationId };
    dispatch(portalTranscriptDownloadCSV(bodyData));
  };
  return createPortal(
    <>
      <div className="wrapper__summary-portal">
        <div className="portal__container">
          <div className="cross-icon-div">
            {/* <img
              className="clickAbleCursorPointerU"
              src={downloadIcon}
              alt="download Icon"
              onClick={handleDownloadClick}
            /> */}
            {/* <img
              className="clickAbleCursorPointerU"
              src={crossThinIcon}
              alt="cross Icon"
              onClick={handleCrossIconClick}
            /> */}
            <PravidIcons
              activeIcon={"downloadIconGray"}
              extraClass={"clickAbleCursorPointerU"}
              onClick={handleDownloadClick}
            />
            <PravidIcons
              activeIcon={"crossThinIcon"}
              extraClass={"clickAbleCursorPointerU"}
              onClick={handleCrossIconClick}
            />
          </div>
          <div className="body__summary-portal">
            <div className="summary-portal__left">
              {channelTab === "Chat" ? (
                <div className="basic-info">
                  <span>
                    <span>User ID: </span>
                    <span className="color-pravidBlueU">
                      {summary?.information?.user_id}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="basic-info">
                  <span>
                    <span>Phone number: </span>
                    <span className="color-pravidBlueU">
                      {summary?.information?.phone_number}
                    </span>
                  </span>
                  <span>
                    <span>Date: </span>
                    <span className="color-pravidBlueU">
                      {DateToLocalString(summary?.information?.dialed_time)}
                    </span>
                  </span>
                </div>
              )}
              <div className="transcript__container">
                <ConversationCardsWrapper />
              </div>
            </div>

            <div className="summary-feedback__container">
              <SummaryFeedback summary={summary} />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root-portal")!
  );
}
