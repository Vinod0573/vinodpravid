import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux";
import { feedbackBodyDataType } from "./interface";
import { feedbackHistory } from "../../../../../theme/assets/svg";
import { feedbackPostAPI } from "../../../../../redux/logger/loggerState/action";
import portalTypes from "../../../../../screens/rootPortal/portalTypes";
import { ToastContainer } from "react-toastify";
import "./FeedbackHistory.scss";
import { setRootPortalScreen } from "../../../../../redux/baseScreen/baseScreenState/actions";
interface props {
  summary: any;
}

export default function FeedbackHistory(props: props) {
  /* useSelector */
  const summary = props.summary;
  const accountType = useSelector(
    (store: RootState) =>
      store.loginReducer.userLoginInfo?.accountDetails[0]?.type
  );
  const token = useSelector(
    (store: RootState) =>
      store.loginReducer.userLoginInfo?.userSessionDetails?.accessToken
  );
  const accountName = useSelector(
    (store: RootState) =>
      store.loginReducer.userLoginInfo?.userDetail.accountDetails[0].name
  );
  const isLoading = useSelector(
    (store: RootState) => store.loggerReducer?.loggerState?.feedbackPostLoading
  );
  const channelTab = useSelector(
    (store: RootState) => store.dashboardReducer?.channelTab
  );
  const dispatch = useDispatch();
  /* useStates */
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const [summaryDetails, setSummaryDetails] = useState<any>(
    summary ? summary?.information : ""
  );
  const [feedbackBodyData, setFeedbackBodyData] =
    useState<feedbackBodyDataType>({
      flow: summaryDetails?.flow_type,
      // category: summaryDetails?.category,
      userId: summaryDetails?.user_id,
      language: summaryDetails?.language,
      phoneNo: summaryDetails?.phone_number,
      sessionId: summaryDetails?.sessionId,
      conversationId: summary?.conversationId,
      accountName: accountName,
    });

  /* useEffect */
  useEffect(() => {
    setSummaryDetails(summary ? summary?.information : "");
  }, [summary]);

  useEffect(() => {
    setFeedbackBodyData((prev) => {
      return {
        ...prev,
        flow: summaryDetails?.flow_type,
        // category: summaryDetails?.category,
        userId: summaryDetails?.user_id,
        language: summaryDetails?.language,
        phoneNo: summaryDetails?.phone_number,
        sessionId: summaryDetails?.sessionId,
        conversationId: summary?.conversationId,
        accountName: accountName,
      };
    });
  }, [summaryDetails]);

  /* handlers */
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackMessage(e.target.value);
  };
  const handleSubmitClick = () => {
    if (!feedbackBodyData.sessionId) {
      setIsError("Session Id Required");
      return;
    } else if (!feedbackMessage) {
      setIsError("Feedback Required");
      return;
    }
    const id = sessionStorage.getItem("Id");
    const data: any = {
      ...feedbackBodyData,
      feedback: feedbackMessage,
      userId: id,
      type: accountType,
    };
    if (!data.flow) {
      delete data["flow"];
    }
    if (!data.language) {
      delete data["language"];
    }
    const headers = {
      "x-access-token": token,
      userId: id,
    };
    dispatch(feedbackPostAPI(data, headers));
    setFeedbackMessage("");
  };

  const handleFocusTextArea = () => {
    setIsError("");
  };

  const handleHeaderClick = () => {
    dispatch(setRootPortalScreen(portalTypes.FEEDBACK_HISTORY_PORTAL));
  };

  return (
    <div className="wrapper__feedbackHistory">
      <div className="feedbackHistory__container">
        <div
          className="container__head clickAbleCursorPointerU"
          onClick={handleHeaderClick}
        >
          <img src={feedbackHistory} alt="" className="feedbackHistory-icon" />
          <span className="heading__title">Feedback History</span>
        </div>
        <div className="container__body">
          <textarea
            name=""
            id=""
            value={feedbackMessage}
            onChange={handleTextAreaChange}
            className="body__textarea"
            placeholder={`Kindly provide ${
              channelTab === "Call" ? "call" : "chat"
            } feedback`}
            onFocus={handleFocusTextArea}
          ></textarea>
        </div>
        <div className="container__foot">
          {isError && <p className="error-message">{isError}</p>}

          <button
            className={`submit-btn ${!feedbackMessage ? "disable-btn" : ""}`}
            disabled={!feedbackMessage}
            onClick={handleSubmitClick}
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
          <div className="toast">
            <ToastContainer
              position="top-center"
              // type="success"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={false}
              draggable={false}
              rtl={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
