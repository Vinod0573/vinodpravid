import React, { useEffect, useRef, useState } from "react";
import Monent from "moment";
import TablePravid from "../../../generic/tablePravid/TablePravid";
import FeedbackCalender from "./feedbackCalender/FeedbackCalender";
import { crossThinIcon } from "../../../../theme/assets/genericSvg";
import { setRootPortalScreen } from "../../../../redux/baseScreen/baseScreenState/actions";
import PravidIcons from "../../../generic/icon/PravidIcons";
import {
  calenderIcon,
  downloadIcon,
} from "../../../../theme/assets/svg/rightSideIcon";
import { feedbackHistory } from "../../../../theme/assets/svg";
import "./FeedbackHistoryPortal.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import portalTypes from "../../../../screens/rootPortal/portalTypes";
import {
  feedbackHistoryPostAPI,
  reportIssueHistory,
} from "../../../../redux/logger/loggerState/action";
import { tableConstant } from "./tableConstant";
import { sortTableData } from "../../../../utils";
import {
  setFeedbackHistoryTableData,
  feedbackHistoryDownload,
  reportIssueDownload,
} from "../../../../redux/logger/loggerState/action";
import NewPagination from "../../../generic/pagination/NewPagination";
import moment from "moment";

export default function FeedbackHistoryPortal() {
  const limit = 10;
  /* redux hooks */
  const accountName = useSelector(
    (store: RootState) =>
      store.loginReducer.userLoginInfo?.userDetail.accountDetails[0].name
  );
  const accountType = useSelector(
    (store: RootState) =>
      store.loginReducer.userLoginInfo?.accountDetails[0]?.type
  );
  const tableData = useSelector(
    (store: any) =>
      store.loggerReducer?.loggerState?.feedbackHistory?.data?.results
  );
  const isLoading = useSelector(
    (store: any) => store.loggerReducer?.loggerState?.feedbackHistory?.isLoading
  );
  const calenderData = useSelector(
    (store: RootState) => store.loggerReducer?.loggerState?.feedbackCalender
  );
  const totalPages = useSelector(
    (store: any) =>
      store.loggerReducer?.loggerState?.feedbackHistory?.data?.totalPages
  );
  const dispatch = useDispatch();

  const calenderRef = useRef<any>();

  const userRole: any = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.role;
  });
  /* useStates */
  const currentSelectedClient = useSelector(
    (state: any) => state.allClientReducer.currentSelectedClient
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableSortingColumn, setTableSortingColumn] = useState({
    referenceKey: "",
    direction: "",
  });
  const [showCalender, setShowCalender] = useState(false);

  /* useEffect */
  useEffect(() => {
    setCurrentPage(1);
  }, [calenderData]);

  useEffect(() => {
    if (userRole.toString().toLowerCase() === "campaign analyst") {
      if (currentSelectedClient.length > 0) {
        const bodyData = {
          page: currentPage,
          limit: limit,
          dategte: `${moment(calenderData?.startDate).format(
            "YYYY-MM-DD"
          )}T00:00:00`,
          datelte: `${moment(calenderData?.endDate).format(
            "YYYY-MM-DD"
          )}T23:59:59`,
          accountName: currentSelectedClient[0].name,
        };
        dispatch(reportIssueHistory(bodyData));
      }
    } else {
      const bodyData = {
        page: currentPage,
        limit: limit,
        dategte: `${moment(calenderData?.startDate).format(
          "YYYY-MM-DD"
        )}T00:00:00`,
        datelte: `${moment(calenderData?.endDate).format(
          "YYYY-MM-DD"
        )}T23:59:59`,
        accountName: accountName,
        type: accountType,
      };
      dispatch(feedbackHistoryPostAPI(bodyData));
    }
  }, [calenderData, currentPage]);

  useEffect(() => {
    if (tableData?.length > 0) {
      if (tableSortingColumn.referenceKey) {
        const sortedData = sortTableData(tableData, tableSortingColumn);
        dispatch(setFeedbackHistoryTableData(sortedData));
      }
    }
  }, [tableSortingColumn, isLoading]);

  useEffect(() => {
    const listener = (e: any) => {
      if (calenderRef.current) {
        if (!calenderRef.current.contains(e.target)) {
          setShowCalender(false);
        }
      }
    };
    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, []);

  /* handlers */
  const handleCrossClick = () => {
    dispatch(setRootPortalScreen(portalTypes.NULL_PORTAL));
  };
  const handleSortClick = (e: any) => {
    const referenceKey = e.target.dataset.referenceKey;
    let direction;
    if (referenceKey === tableSortingColumn.referenceKey) {
      if (tableSortingColumn.direction === "asc") direction = "desc";
      else direction = "asc";
    } else {
      direction = "asc";
    }
    setTableSortingColumn({ referenceKey, direction });
  };
  const handleDownloadClick = () => {
    if (userRole?.toString().toLowerCase() == "campaign analyst") {
      const bodyData = {
        accountName,
        dategte: `${moment(calenderData?.startDate).format(
          "YYYY-MM-DD"
        )}T00:00:00`,
        datelte: `${moment(calenderData?.endDate).format(
          "YYYY-MM-DD"
        )}T23:59:59`,
      };
      dispatch(reportIssueDownload(bodyData));
    } else {
      const bodyData = {
        accountName,
        dategte: `${moment(calenderData?.startDate).format(
          "YYYY-MM-DD"
        )}T00:00:00`,
        datelte: `${moment(calenderData?.endDate).format(
          "YYYY-MM-DD"
        )}T23:59:59`,
      };
      dispatch(feedbackHistoryDownload(bodyData));
    }
  };
  const handleCalenderClick = () => {
    // if (!showCalender) {
    //   const listener = (e: any) => {
    //     console.log(e);
    //     // document.removeEventListener("click", listener);
    //   };
    //   document.addEventListener("click", listener);
    // }
    setShowCalender((prev) => !prev);
  };
  const handlePageChange = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="wrapper__feedbackHistoryPortal">
      <div className="portal__container">
        <div className="cross-btn">
          <img
            src={crossThinIcon}
            alt="cross icon"
            onClick={handleCrossClick}
            className="clickAbleCursorPointerU"
          />
        </div>
        <div className="header">
          <div className="calender__filter" ref={calenderRef}>
            <div
              className="calender-heder clickAbleCursorPointerU"
              onClick={handleCalenderClick}
            >
              <PravidIcons activeIcon={"calenderIcon"} />
              <span className="calender__date">
                {Monent(calenderData.startDate).format("MMM DD, YYYY")} -{" "}
                {Monent(calenderData.endDate).format("MMM DD, YYYY")}
              </span>
            </div>

            <div
              className={`calender-pop ${showCalender ? "" : "hide-calender"}`}
            >
              <FeedbackCalender setShowCalender={setShowCalender} />
            </div>
          </div>
          <div className="title">
            <img src={feedbackHistory} alt="" />
            <span className="title__span">
              {userRole.toString().toLowerCase() === "campaign analyst"
                ? "Reported Issue Summary"
                : "Feedback History"}
            </span>
          </div>
          <div
            className="download-btn clickAbleCursorPointerU"
            onClick={handleDownloadClick}
          >
            <img src={downloadIcon} alt="" />
            {/* <PravidIcons activeIcon={"downloadIcon"} /> */}
          </div>
        </div>
        <div className="body">
          <div className="table">
            <TablePravid
              data={tableData}
              columns={tableConstant({
                limit,
                handleSortClick,
                title: userRole || "",
                tableSortingColumn,
                accountType
              })}
              pageNo={currentPage}
              isLoading={isLoading}
              extraClassTable={"extraClassTable"}
              extraClassTableWrapper={"extraClassTableWrapper"}
            />
          </div>
          <div className="pagination">
            {totalPages > 1 && (
              <NewPagination
                handlePageChange={handlePageChange}
                totalNoOfPage={totalPages}
                getPage={currentPage - 1}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
