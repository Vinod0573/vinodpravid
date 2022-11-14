import React, { useState, useEffect, useRef } from "react";
import {
  getAllReportCsvData,
  refreshApi,
  refreshFilters,
  setLastUpdatedTime,
  setSelectedFilterType,
  setShowColumnCustomizePop,
  setShowRightSideBar,
  toggleRefresh,
  toggleShowColumnCustomizePop,
} from "../../../redux/filters/actions";
import RightSidebarpop from "../rightSidebarpop/RightSidebarpop";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RightSidebarComp.module.scss";
import { RootState } from "../../../redux";
import { lastUpdatedText } from "../../../utils/time/time.util";
import KPIWrapper from "../kpiWrapper/KPIWapper";
import ColumnCustomizeWrapper from "../../moduleComponents/columCustomize/ColumnCustomizeWrapper";
import ColumnEditName from "../../moduleComponents/columCustomize/columnEditName/ColumnEditName";
import { useCurrentPageTab } from "../../../hooks";
import {
  getMessages,
  getSummaryByAPI,
} from "../../../redux/logger/loggerState/action";
import { getLoggerReportDataAPI } from "../../../redux/logger/report/actions";
import { getAnalyticsAPIData } from "../../../redux/analytics/actions";
import moment from "moment";
import Loader from "../loader/Loader";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";
import { getDayInCorrectFormat } from "../../../utils/ConvertTime";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../theme/assets/svg/rightSideIcon";
import { each } from "lodash";
import screenType from "../../../screens/screenType";
import { channel } from "diagnostics_channel";
import PravidIcons from "../icon/PravidIcons";
interface IconObj {
  name: string;
  firstIcon: any;
  secondIcon?: any;
  isActive?: boolean;
}
interface props {
  icons: Array<IconObj>;
}

export default function RightSidebar(props: props) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const show = useSelector(
    (state: RootState) => state.filterReducers.showRightSidePop
  );
  const refP = useRef<any>(null);
  const iconUrl = useSelector(
    (state: RootState) => state?.loginReducer?.userLoginInfo?.iconsBaseUrl
  );
  // const lastUpdated = useSelector(
  //   (state: RootState) => state.filterReducers.lastUpdated
  // );
  const showPopupForColumnCustomize = useSelector(
    (state: RootState) => state.filterReducers.showColumnCustomizePopup
  );
  const lastUpdated = useSelector(
    (state: RootState) => state.filterReducers.lastUpdatedTime
  );
  const showColumnEditName = useSelector(
    (state: RootState) => state.filterReducers.showEditColumnName
  );
  const isSchemaUpdating = useSelector(
    (state: RootState) => state.loginReducer.isSchemaUpdating
  );

  const isReportDownloading = useSelector(
    (state: RootState) => state.filterReducers.isReportDownloading
  );
  const dispatch = useDispatch();
  function handleClickOnIcons(e: IconObj) {
    if (
      (selectedIcon === e.name && show) ||
      e.name === "Last Updated" ||
      e.name === "Shuffle Column"
    ) {
      setSelectedIcon("");
      dispatch(setShowRightSideBar(false));
    } else {
      setSelectedIcon(e.name);
      dispatch(setShowRightSideBar(true));

      // if(isActivePageType === screenType.logger.name && currentLoggerPage=="Report"&&selectedIcon==="Download"){
      //   dispatch(setShowRightSideBar(false));
      // }
    }

    dispatch(setSelectedFilterType(""));
  }

  const conversationId = useSelector(
    (store: RootState) =>
      store.loggerReducer.transcriptReducer?.currentSession?.conversationId
  );
  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );
  const calender = useSelector((state: RootState) => {
    return state.filterReducers?.calenderData;
  });
  const selectedFilterOptions = useSelector((state: RootState) => {
    return state.filterReducers?.selectedFilterOptions;
  });
  const filterSelectedDate = useSelector(
    (store: RootState) => store?.filterReducers?.calenderData
  );
  const currentSelectedDate = useSelector(
    (store: RootState) => store.filterReducers.calenderData
  );
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userLoginInfo?.userDetail?._id
  );

  const [showBlue, setShowBlue] = useState<any>(false);
  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();

  const [directDownload, setDataforoptions] = useState<any>(true);
  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setDataforoptions(
        getDataFromSchema({
          schema,

          sourceTab,

          isActivePageType,

          whatsappChannelTab,

          subModuleTab,

          channelTab,

          currentLoggerPage,
        }).sidebarModules.find((e: any) => e.name === "Download")
          .isDirectdownload
      );
    }
  }, [
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  ]);
  /* useEffect */
  useEffect(() => {
    dispatch(setShowRightSideBar(false));
  }, [isActivePageType]);
  useEffect(() => {
    if (
      isActivePageType === screenType.logger.name &&
      currentLoggerPage == "Report" &&
      selectedIcon === "Download"
    ) {
      dispatch(setShowRightSideBar(false));
    }
  }, [currentLoggerPage, selectedIcon]);
  useEffect(() => {
    dispatch(setShowRightSideBar(false));
  }, [isActivePageType]);

  // useEffect(()=>{
  //   if(!isSchemaUpdating){
  //     toast.success("Changes Applied Successfully")
  //   }
  // },[isSchemaUpdating])
  useEffect(() => {
    dispatch(refreshFilters());
  }, [isActivePageType, channelTab, subModuleTab, sourceTab]);
  const handleRefresh = (e: any) => {
    // dispatch(setLastUpdatedTime({ time: new Date() }));
    dispatch(refreshApi(accountName));
    dispatch(toggleRefresh());
    setShowBlue(true);
    setTimeout(() => {
      setShowBlue(false);
    }, 1000);

    // if (isActivePageType === "Analytics") {
    //   if (sourceTab && channelTab) {

    //     dispatch(
    //       getAnalyticsAPIData({
    //         username: accountName,
    //         start_date:moment(filterSelectedDate.startDate).format("YYYY-MM-DD"),

    //         end_date:moment(filterSelectedDate.endDate).format("YYYY-MM-DD"),

    //         source: [sourceTab],
    //         channel: [channelTab],
    //         communicationType:[whatsappChannelTab],
    //       //  ...(channelTab==="WhatsApp"?{communicationType:[whatsappChannelTab]}:{}),

    //         ...selectedFilterOptions,
    //       })
    //     );
    //   }
    // } else {
    //   if (currentLoggerPage === "Report") {

    //     const bodyData = {
    //       clientName: accountName,
    //       dategte: moment(filterSelectedDate.startDate).format("YYYY-MM-DD")+"T00:00:00",
    //       datelte: moment(filterSelectedDate.startDate).format("YYYY-MM-DD")+"T23:59:59",
    //       channel: [channelTab],
    //       source: [sourceTab],
    //       ...(channelTab==="Whatsapp"?{communicationType:[whatsappChannelTab]}:{}),
    //       // page: currentPageNo,
    //       limit: 19,
    //       page:1,
    //       ...selectedFilterOptions,
    //     };
    //     dispatch(getLoggerReportDataAPI(bodyData));
    //   } else {
    //     dispatch(getMessages(conversationId));
    //     dispatch(getSummaryByAPI(conversationId));
    //   }
    // }

    //
  };
  //getting current satus

  const showPopupForColumnCustomization = () => {
    //console.log("CLICKE DON SHIFFLe")
    dispatch(toggleShowColumnCustomizePop());
    //setShowColumnCustomizePop toggleShowColumnCustomizePop
  };
  const handleDirectDownload = () => {
    //dispatch(setShowRightSideBar(false));
    toast.success("Please Wait...Download In Progress");
    dispatch(
      getAllReportCsvData(
        {
          clientName: accountName,
          dategte:
            moment(filterSelectedDate.startDate).format("YYYY-MM-DD") +
            "T00:00:00",
          datelte:
            moment(filterSelectedDate.endDate).format("YYYY-MM-DD") +
            "T23:59:59",
          channel: [channelTab],
          source: [sourceTab],
          subModule: subModuleTab,

          ...(channelTab === "Whatsapp" || channelTab === "Chat"
            ? { communicationType: [whatsappChannelTab] }
            : {}),
          userId: userId,
          ...selectedFilterOptions,
        },
        dispatch
      )
    );

    //console.log("direct Download")

    //
  };
  //  console.log(schema,
  //   sourceTab,
  //   isActivePageType,
  //   whatsappChannelTab,
  //   subModuleTab,
  //   channelTab,
  //   currentLoggerPage,"ACTIVE")

  //console.log(selectedIcon,currentLoggerPage,isReportDownloading,sourceTab,"STATEX")
  return (
    <div ref={refP} className={styles.rightsidebarcontianer}>
      {props.icons.map((e, i) => {
        if (e.isActive)
          return (
            <div
              key={i}
              className={
                styles.iconswrapperrightside + " " + styles.tooltiparea
              }
              id={"auto_" + e.name?.trim().replace(/\s/g, "")}
            >
              <button
                onClick={() => {
                  if (
                    e.name == "Download" &&
                    selectedIcon == "Download" &&
                    isActivePageType !== "Analytics" &&
                    currentLoggerPage == "Report" &&
                    directDownload
                  ) {
                    setSelectedIcon("");
                    return;
                  }
                  handleClickOnIcons(e);
                  e.name === "Last Updated" && handleRefresh(e);
                  e.name === "Shuffle Column" &&
                    showPopupForColumnCustomization();
                  e.name === "Download" &&
                    isActivePageType !== "Analytics" &&
                    directDownload &&
                    currentLoggerPage == "Report" &&
                    handleDirectDownload();
                }}
                className={`${styles.rightsidebaricosn}`}
              >
                {e.name !== "Last Updated" ? (
                  <img
                    src={
                      e.name == "Download" &&
                      selectedIcon == "Download" &&
                      currentLoggerPage == "Report" &&
                      isActivePageType !== "Analytics"
                        ? isReportDownloading
                          ? loader
                          : `${iconUrl}${e.firstIcon}.svg`
                        : selectedIcon === e.name
                        ? `${iconUrl}${e.secondIcon}.svg`
                        : `${iconUrl}${e.firstIcon}.svg`
                    }
                    alt="io"
                  />
                ) : (
                  <PravidIcons
                    activeIcon={showBlue ? e.secondIcon : e.firstIcon}
                    alt="alt"
                  />
                )}
              </button>
              {e.name === "Last Updated" ? (
                <div className={styles.tooltiptextsp}>
                  {lastUpdatedText(new Date(lastUpdated))}
                </div>
              ) : (
                <div
                  className={styles.tooltiptext}
                  style={e.name === "Calendar" ? { width: "175px" } : {}}
                >
                  {e.name === "Shuffle Column"
                    ? "Customize Table"
                    : e.name === "Calendar"
                    ? getDayInCorrectFormat(currentSelectedDate)
                    : e.name === "KPI customisation"
                    ? "KPI Selection"
                    : e.name}
                </div>
              )}
            </div>
          );
        else return null;
      })}

      <RightSidebarpop
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        ref={refP}
      />

      {showPopupForColumnCustomize && <ColumnCustomizeWrapper />}
      {showColumnEditName && <ColumnEditName />}
      {/* {isSchemaUpdating && (
        <div className={styles.loader}>
          <p>
            <Loader></Loader>

          </p>
        </div>
      )} */}
    </div>
  );
}
