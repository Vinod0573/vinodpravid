import React, { useEffect, useState, useRef } from "react";

import styles from "./TranscriptLeft.module.scss";
import NewPagination from "../../generic/pagination/NewPagination";
import DisplayDataTranscript from "./displayDataTranscript/DisplayDataTranscript";
import { searchIcon } from "../../../theme/assets/svg";
//import { sampleData } from "./sampledata";
import { data } from "./displayDataTranscript/types";
import { useDebounce } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { transcriptPhoneApi } from "../../../redux/logger/transcript/actions/actions";
import {
  getMessages,
  getSummaryByAPI,
} from "../../../redux/logger/loggerState/action";
import SearchInputBox from "../../generic/searchInputBox/SearchInputBox";
import { RootState } from "../../../redux";
import TRANSCRIPT_ACTION from "../../../redux/logger/transcript/actionTypes";
import SelectClient from "../transcript/selectClient/SelectClient";
// import session from "redux -persist/lib/storage/session""
import Loader from "../../generic/loader/Loader";
import moment from "moment";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
export default function TranscriptLeft() {
  const reduxPhoneList: void | [] = useSelector((state: any) => {
    return state.loggerReducer?.transcriptReducer?.allPhoneNumberList;
  });
  const totalNoOfPages = useSelector((state: any) => {
    return state.loggerReducer?.transcriptReducer?.totalPages || 0;
  });
  const channel = useSelector((state: any) => {
    return state.dashboardReducer?.channelTab;
  });
  const defaultuser = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.accountDetails[0].name;
  });
  // const user = "Maia Testing";
  const currentUser = useSelector((state: any) => {
    return state.allClientReducer?.currentSelectedClient[0];
  });
  // const disposition = useSelector((state: RootState) => {
  //   return state.filterReducers?.Disposition;
  // });
  // const flowType = useSelector((state: RootState) => {
  //   return state.filterReducers?.Flow;
  // });
  const source = useSelector((state: any) => {
    return state.dashboardReducer?.sourceTab;
  });
  const channelTab = useSelector((state: any) => {
    return state.dashboardReducer?.whatsappChannelTab;
  });
  const calender = useSelector((state: any) => {
    return state.filterReducers.calenderData;
  });

  // my Filters
  const filter = useSelector((state: any) => {
    return state?.filterReducers?.filterOptions?.data?.filters;
  });
  const schemaFilter = useSelector((state: any) => {
    return state?.loginReducer?.userLoginInfo?.schema?.logger?.transcript;
  });
  const dashboard = useSelector((state: any) => {
    return state?.dashboardReducer;
  });
  //search the phone number

  const refreshPage = useSelector((state: RootState) => {
    return state.filterReducers?.refreshPage;
  });
  // const language = useSelector((state: any) => {
  //   return state.filterReducers?.Language;
  // });
  const isPhoneNumberLoading = useSelector((state: any) => {
    return state.loggerReducer?.transcriptReducer?.isPhoneNumberLoading;
  });
  const selectedFilters = useSelector(
    (state: RootState) => state?.filterReducers?.selectedFilterOptions
  );
  // const language = useSelector((state: any) => {
  //   return state.filterReducers?.Language;
  // });
  const dispatch = useDispatch();
  const [user, setUser] = useState(defaultuser);
  const [currentSession, setCurrentSession] = useState<{
    phoneNo: string;
    sessionId: string;
    id: string;
  }>({ phoneNo: "", sessionId: "", id: "" });
  const [filteredData, setFilteredData] = useState<data[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const paginationRef = useRef<any>();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) {
        setUser(currentUser.name);
      }
    }
  }, [currentUser]);
  useEffect(() => {
    if (user) {
      dispatch({
        type: TRANSCRIPT_ACTION.SET_CURRENT_SESSION,
        payload: {
          phoneNo: currentSession.phoneNo,
          sessionId: currentSession.sessionId,
          conversationId: currentSession.id,
          accountName: user,
        },
      });
    }
  }, [currentSession, user]);
  //set messages

  //set the phone lists
  useEffect(() => {
    if (reduxPhoneList) {
      const filterdList: data[] = reduxPhoneList.map((e: any, index) => {
        const dropdown = e.sessionIds.map((sessions: any) => {
          if (
            userRole.toString().toLowerCase() === "campaign analyst" &&
            sessions.status !== undefined &&
            sessions.status !== "not seen" &&
            sessions.status !== "seen"
          ) {
            return {
              time: sessions.createdAt,
              sessionId: sessions.sessionId,
              id: sessions.id,
              issue: sessions.status === "no issue" ? false : true,
            };
          } else {
            return {
              time: sessions.createdAt,
              sessionId: sessions.sessionId,
              id: sessions.id,
            };
          }
        });
        return {
          phoneNo: e.phoneNo,
          index: (page - 1) * limit + index + 1,
          dropDown: dropdown,
        };
      });
      setFilteredData(filterdList);
      if (filterdList.length > 0) {
        setCurrentSession({
          phoneNo: filterdList[0]?.phoneNo || "",
          sessionId: filterdList[0]?.dropDown[0]?.sessionId || "",
          id: filterdList[0]?.dropDown[0]?.id,
        });
      } else {
        setCurrentSession({ phoneNo: "", sessionId: "", id: "" });
      }
    }
  }, [reduxPhoneList]);

  // sget page number // get the page info also
  function getPageInfo(e: number) {
    // console.log(e);
    setPage(e);

    const data: any = {
      limit: limit,
      user: user,
      page: e,
      channel: channel,
      source: source,
      startDate: `${moment(calender?.startDate).format("YYYY-MM-DD")}T00:00:00`,
      endDate: `${moment(calender?.endDate).format("YYYY-MM-DD")}T23:59:59`,
      //language: selectedFilters.language,
      selectedFilters,
    };

    if (channel?.toString().toLowerCase() === "whatsapp") {
      data.communicationType = channelTab;
    }
    dispatch(transcriptPhoneApi(data));
  }
  // select the phone number and sessionId
  function getPhoneDetails(phoneNo: string, sessionId: string, id: string) {
    // console.log({ phoneNo, sessionId });
    setCurrentSession({ phoneNo, sessionId: sessionId || "", id });
  }
  //search the phone number

  function handleSearchPhoneNo(e: any) {
    // console.log(e);
    setPage(e);

    const data: any = {
      limit: limit,
      user: user,
      page: 1,
      phoneNo: e.target.value,
      channel: channel,
      source: source,
      startDate: `${moment(calender?.startDate).format("YYYY-MM-DD")}T00:00:00`,
      endDate: `${moment(calender?.endDate).format("YYYY-MM-DD")}T23:59:59`,
      //language: selectedFilters.language,
      selectedFilters,
    };

    if (channel?.toString().toLowerCase() === "whatsapp") {
      data.communicationType = channelTab;
    }
    dispatch(transcriptPhoneApi(data));
    if (paginationRef.current) {
      paginationRef.current.resetCurrentPage();
    }
    setPage(1);
  }
  useEffect(() => {
    dispatch(getMessages(currentSession.id));

    dispatch(getSummaryByAPI(currentSession.id));
  }, [currentSession.id]);
  useEffect(() => {
    const data: any = {
      limit: limit,
      user: user,
      page: 1,
      channel: channel,
      source: source,
      startDate: `${moment(calender?.startDate).format("YYYY-MM-DD")}T00:00:00`,
      endDate: `${moment(calender?.endDate).format("YYYY-MM-DD")}T23:59:59`,
      // language: selectedFilters.language,
      selectedFilters,
    };

    if (channel?.toString().toLowerCase() === "whatsapp") {
      data.communicationType = channelTab;
    }
    setPage(1);
    // console.log("calling Api inside transcript on login", data);
    // callApi();
    dispatch(transcriptPhoneApi(data));
  }, [limit, user, channel, source, calender, selectedFilters, refreshPage]);

  const debouncedHandleSearchPhoneNo = useDebounce(handleSearchPhoneNo, 300);
  const userRole: any = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.role;
  });
  return (
    <div className={styles.wrapper}>
      {userRole.toString().toLowerCase() === "campaign analyst" &&
      user !== "Demo" ? (
        <div className={styles.allClients}>
          <SelectClient></SelectClient>
        </div>
      ) : (
        ""
      )}
      <SearchInputBox
        onChange={debouncedHandleSearchPhoneNo}
        searchIcon={searchIcon}
        placeholder={"Search"}
        extraClassWrapper={styles.extraClassSearchWrapper}
        value={searchValue}
        inputType={"text"}
      />

      <div className={styles.phoneList}>
        {isPhoneNumberLoading ? (
          <div className={styles.loader}>
            <Loader></Loader>
          </div>
        ) : filteredData.length === 0 ? (
          <div className={styles.noData}>
            <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
          </div>
        ) : (
          <DisplayDataTranscript
            data={filteredData}
            handleSelectOption={getPhoneDetails}
            selected={currentSession}
          ></DisplayDataTranscript>
        )}
      </div>
      <div className={styles.pagination}>
        {!isPhoneNumberLoading && (
          <NewPagination
            ref={paginationRef}
            getPage={page - 1}
            handlePageChange={(e: any) => {
              getPageInfo(e);
            }}
            totalNoOfPage={totalNoOfPages || 0}
          ></NewPagination>
        )}
      </div>
    </div>
  );
}
