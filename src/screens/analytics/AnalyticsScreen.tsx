import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/rootStore";
import ChartModel from "../../components/moduleComponents/chartModel/ChartModel";
import { useCurrentPageTab } from "../../hooks";
import { getDataFromSchema } from "../../utils/getDataFromSchema";
import { getAnalyticsAPIData } from "../../redux/analytics/actions";


import moment from "moment";
import cloneDeep from "lodash.clonedeep";
import styles from "./AnalyticsScreen.module.scss";
import { Mixpanel } from "../../utils/mixpanelSetup";

interface props {
  default: string;
}

export default function Analytics(props: any) {
  const analyticsRef = useRef<any>(null);
  const [schemaDetails, setSchemaDetails] = useState<any>();

  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );

  const chartData = useSelector(
    (store: RootState) => store?.analyticsReducer?.analyticsChartDetails
  );

  const loading = useSelector(
    (store: RootState) => store?.analyticsReducer?.isLoadingAnalyticsChart
  );

  const filterSelectedDate = useSelector(
    (store: RootState) => store?.filterReducers?.calenderData
  );
  const selectedFilters = useSelector(
    (state: RootState) => state?.filterReducers?.selectedFilterOptions
  );
  // const filterDataHasChanged = useSelector(
  //   (state: RootState) => state?.filterReducers?.hasFilterChanged
  // );

  const downloadAnalyticsState = useSelector(
    (state: RootState) => state.filterReducers.downloadViewAll
  );

  const refreshPage = useSelector((state: RootState) => {
    return state.filterReducers?.refreshPage;
  });
  // useEffect(() => {
  //   if (downloadAnalyticsState === "InActive") {
  //     //
  //   } else {
  //     takeScreenshot()
  //       .then(downloadAnalytics)
  //       .then(() => dispatch(setDownloadViewAll("InActive")));
  //   }
  // }, [downloadAnalyticsState]);

  // const sourceTab = useSelector(
  //   (store: RootState) => store.dashboardReducer.sourceTab
  // );
  // const subModuleTab = useSelector(
  //   (store: RootState) => store.dashboardReducer.subModuleTab
  // );
  // const channelTab = useSelector(
  //   (store: RootState) => store.dashboardReducer.channelTab
  // );
  // const whatsappChannelTab = useSelector(
  //   (store: RootState) => store.dashboardReducer.whatsappChannelTab
  // );

  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
  } = useCurrentPageTab();

  // useEffect(() => {
  //   setIsActivePageType("Analytics");
  // }, []);
  
  useEffect(() => {
    analyticsRef && analyticsRef.current.scrollIntoView({ behavior: "smooth" });
  }, [refreshPage]);
  useEffect(() => {
    Mixpanel.track("Analytics | Landing Page| Total Time spent" , {
      "module" : "Analytics"
     })
    if (sourceTab && channelTab && isActivePageType) {
      setSchemaDetails(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
        })?.kpiDetails
      );
    }
  }, [sourceTab, subModuleTab, channelTab, whatsappChannelTab, schema]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (sourceTab && channelTab) {
      dispatch(
        getAnalyticsAPIData({
          username: accountName,
          start_date: !filterSelectedDate?.formatedStartDate
            ? moment(new Date()).format("YYYY-MM-DD")
            : filterSelectedDate?.formatedStartDate,

          end_date: !filterSelectedDate?.formatedEndDate
            ? moment(new Date()).format("YYYY-MM-DD")
            : filterSelectedDate?.formatedEndDate,
          source: [sourceTab],
          channel: [channelTab],
          ...(whatsappChannelTab && {
            communicationType: [whatsappChannelTab],
          }),
          ...selectedFilters,
        })
      );
    }
  }, [
    sourceTab,
    subModuleTab,
    channelTab,
    whatsappChannelTab,
    filterSelectedDate,
    selectedFilters,
    schema,
    refreshPage,
  ]);

  return (
    <>
      <div className={styles.topDiv}>
        <div className={styles.childdiv}>
          <div className={styles.chartModel}>
            <div className={styles.row} ref={analyticsRef}>
              {schemaDetails && (
                <ChartModel
                  kpiDetails={schemaDetails}
                  chartData={chartData}
                  isLoading={loading}
                  channel={channelTab}
                  source={sourceTab}
                  whatsappChannel={whatsappChannelTab ? whatsappChannelTab : ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
