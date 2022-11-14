import React, { useEffect, useRef } from "react";
import { useState } from "react";
import TablePravid from "../../../components/generic/tablePravid/TablePravid";
import { tableConstant } from "./tableConstant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { columnInterface } from "./type";
import {
  getLoggerReportDataAPI,
  sortReportTableData,
} from "../../../redux/logger/report/actions";
import {
  setRootPortalScreen,
  setConversationIdSummaryPortal,
} from "../../../redux/baseScreen/baseScreenState/actions";
import portalTypes from "../../rootPortal/portalTypes";
import AudioPlayer from "../../../components/generic/audioPlayer/AudioPlayer";
import NewPagination from "../../../components/generic/pagination/NewPagination";
import SearchInputBox from "../../../components/generic/searchInputBox/SearchInputBox";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";
import { searchIcon } from "../../../theme/assets/svg";
import "./Report.scss";
import { useDebounce } from "../../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { useCurrentPageTab } from "../../../hooks";
import {
  handleAudioClickFunction,
  handleSortClickFunction,
  getLimitFunc,
} from "./report.functions";
import SummaryPortal from "../../../components/moduleComponents/report/summaryPortal/SummaryPortal";
import SelectClient from "../../../components/moduleComponents/transcript/selectClient/SelectClient";
import moment from "moment";
import AudioPlayerWrapper from "../../../components/generic/audioPlayer/AudioPlayerWrapper";
import { previousDay } from "date-fns";
export default function Report() {
  /* redux hooks */
  // const accountName = useSelector(
  //   (store: any) =>
  //     store.loginReducer?.userLoginInfo?.userDetail.accountDetails[0].name
  // );
  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();
  const { results: tableData, totalPages } = useSelector(
    (store: RootState) => store.loggerReducer?.report?.reportTableDetails
  );
  const isTableLoading = useSelector(
    (store: RootState) => store.loggerReducer?.report?.isLoadingReportTable
  );
  const calender = useSelector((state: RootState) => {
    return state.filterReducers?.calenderData;
  });
  const selectedFilterOptions = useSelector((state: RootState) => {
    return state.filterReducers?.selectedFilterOptions;
  });
  const tableSortingColumn = useSelector(
    (store: RootState) => store.loggerReducer?.report?.tableSortingColumn
  );
  const defaultuser = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.accountDetails[0].name;
  });
  // const user = "Maia Testing";
  const currentUser = useSelector((state: any) => {
    return state.allClientReducer?.currentSelectedClient[0];
  });
  const userRole: any = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.role;
  });
  const refreshPage = useSelector((state: RootState) => {
    return state.filterReducers?.refreshPage;
  });
  const [accountName, setAccountName] = useState(defaultuser);
  useEffect(() => {
    // console.log("account name changed", currentUser);
    if (
      currentUser &&
      userRole.toString().toLowerCase() === "campaign analyst"
    ) {
      if (currentUser.name) {
        setAccountName(currentUser.name);
      }
    }
  }, [currentUser, userRole]);
  const dispatch = useDispatch();

  /* useState */
  const [currentAudioState, setCurrentAudioState] = useState<{
    currentTab: string | undefined;
    isPlaying: boolean;
  }>({ currentTab: undefined, isPlaying: false });
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | number>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [reportColumn, setReportColumn] = useState<Array<columnInterface>>([]);
  const [limit, setLimit] = useState(18);
  const [phoneNo, setPhoneNo] = useState("");
  const ref = useRef<any>();
  useEffect(() => {
    setCurrentAudioState({ currentTab: "", isPlaying: false });
    setAudioUrl("");
  }, [calender]);
  /* useEffect */
  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setReportColumn(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        })?.reportColumns
      );
    }
  }, [
    schema,
    sourceTab,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    accountName,
  ]);

  useEffect(() => {
    setCurrentPageNo(1);
  }, [
    calender,
    selectedFilterOptions,
    channelTab,
    sourceTab,
    accountName,
    schema,
    whatsappChannelTab,
  ]);
  useEffect(() => {
    const currentLimit = getLimitFunc();
    setLimit(currentLimit);
    if (channelTab && sourceTab) {
      const bodyData = {
        clientName: accountName,
        dategte: `${moment(calender?.startDate).format("YYYY-MM-DD")}T00:00:00`,
        datelte: `${moment(calender?.endDate).format("YYYY-MM-DD")}T23:59:59`,
        channel: [channelTab],
        source: [sourceTab],
        page: currentPageNo,
        limit: Math.max(currentLimit, 2),
        ...selectedFilterOptions,
      };
      if (whatsappChannelTab) {
        bodyData["communicationType"] = [whatsappChannelTab];
      }
      if (phoneNo) {
        bodyData["phoneNo"] = phoneNo;
      }
      dispatch(getLoggerReportDataAPI(bodyData));
    }
  }, [
    currentPageNo,
    calender,
    selectedFilterOptions,
    channelTab,
    sourceTab,
    accountName,
    schema,
    whatsappChannelTab,
    refreshPage,
  ]);
  const [ready, setReady] = useState(true);
  useEffect(() => {
    setReady(false);
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, [audioUrl]);
  useEffect(() => {
    if (tableData?.length > 0) {
      dispatch(sortReportTableData(tableData || [], tableSortingColumn));
    }
  }, [tableSortingColumn, isTableLoading]);
  // console.log(tableData);
  // console.log(reportColumn);

  /* handlers */
  const handlePageChange = (pageNo: number) => {
    setCurrentPageNo(pageNo);
  };
  // useEffect(() => {
  //   console.log(audioUrl, "report rabi");
  // }, [audioUrl]);
  const handleSearchPhoneNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value);
    setCurrentPageNo(1);
    const bodyData = {
      clientName: accountName,
      dategte: `${moment(calender?.startDate).format("YYYY-MM-DD")}T00:00:00`,
      datelte: `${moment(calender?.endDate).format("YYYY-MM-DD")}T23:59:59`,
      channel: [channelTab],
      source: [sourceTab],
      page: 1,
      limit: limit,
      ...selectedFilterOptions,
      phoneNo: e.target.value,
    };
    if (whatsappChannelTab) {
      bodyData["communicationType"] = [whatsappChannelTab];
    }
    dispatch(getLoggerReportDataAPI(bodyData));
  };
  const debouncedHandleSearchPhoneNo = useDebounce(handleSearchPhoneNo, 500);

  const handleAudioClick = (
    e: React.MouseEvent<HTMLElement>,
    url: string,
    tab: string
  ) => {
    handleAudioClickFunction(e, url, setAudioUrl, ref);
    setCurrentAudioState((prev) => {
      return { ...prev, currentTab: tab };
    });
    setTimeout(() => {
      let isPlaying = false;
      if (ref.current?.isPlaying) {
        isPlaying = true;
      }
      setCurrentAudioState((prev) => {
        return { ...prev, isPlaying };
      });
    }, 500);
    // setCurrentAudioState((prev) => {
    //   return { ...prev, currentTab: tab };
    // });

    // console.log(tab, "nithin audio");
  };
  // useEffect(() => {
  //   console.log(currentAudioState, "nithin audio");
  // }, [currentAudioState]);

  const handleSummaryClick = (conversationId: string) => {
    dispatch(setConversationIdSummaryPortal(conversationId));
    dispatch(setRootPortalScreen(portalTypes.SUMMARY_PORTAL));
  };
//making infinite loop
  // useEffect(() => {
  //   // pause the audio if up thing is paused
  //   if (ref.current) {
  //     setCurrentAudioState((prev) => {
  //       return { ...prev, isPlaying: ref.current.isPlaying };
  //     });
  //   }
  // }, [ref.current]);
  
  function pauseAud() {
    if (ref.current) {
          setCurrentAudioState((prev) => {
            return { ...prev, isPlaying: ref.current.isPlaying };
          });
        }
  }
  useEffect(()=>{
    
    const interval=setInterval(pauseAud,300)
    return ()=>{
      clearInterval(interval)
    }
  },[])
  const handleSortClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    handleSortClickFunction(e, tableSortingColumn, dispatch);
  };
  function onStop() {
    setCurrentAudioState((prev) => {
      return { ...prev, isPlaying: false };
    });
  }
  function onLoad() {
    let isPlaying = false;
    if (ref.current?.isPlaying) {
      isPlaying = true;
    }
    setCurrentAudioState((prev) => {
      return { ...prev, isPlaying: true };
    });
  }
  return (
    <div className="wrapper__report">
      <div className="search-audio-player">
        <div className="search-box">
          <SearchInputBox
            searchIcon={searchIcon}
            onChange={debouncedHandleSearchPhoneNo}
            placeholder={"Search"}
            extraClassWrapper={"extraClassSearchWrapper"}
            value={searchValue}
            inputType={"text"}
          />
        </div>
        {userRole.toString().toLowerCase() === "campaign analyst" &&
        accountName !== "Demo" ? (
          <div className="select-client">
            <SelectClient></SelectClient>
          </div>
        ) : (
          ""
        )}
        {channelTab?.toString().toLowerCase() === "call" ? (
          <div className="audio-player">
            {audioUrl ? (
              <AudioPlayerWrapper
                url={audioUrl}
                ref={ref}
                autoPlay={true}
                onStop={onStop}
                onLoad={onLoad}
              />
            ) : (
              <AudioPlayerWrapper url="" ref={ref} />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="report__table">
        <TablePravid
          data={tableData}
          pageNo={currentPageNo}
          columns={tableConstant({
            limit,
            columnSchema: reportColumn,
            handleAudioClick,
            handleSummaryClick,
            handleSortClick,
            tableSortingColumn,
            currentAudioState,
          })}
          // fsd
          isLoading={isTableLoading}
          extraClassTableBody={"extraClassTableBody"}
          extraClassTableWrapper={"extraClassTableWrapper"}
          tableEndDisplay={false}
        />
      </div>
      <div
        className={`report__pagination ${
          !tableData || tableData?.length <= 0 || isTableLoading
            ? "hide-report-table"
            : ""
        }`}
      >
        <NewPagination
          totalNoOfPage={totalPages}
          handlePageChange={handlePageChange}
          getPage={currentPageNo - 1}
        />
      </div>
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
  );
}
