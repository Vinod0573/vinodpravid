import React, { useEffect, useState } from "react";
import KPIComponent from "../kpiFilter/KPIComponent";
import { firstLetterCapital } from "./../../../utils/stringmodifycase";
// import { blueKpi } from "./../../../theme/assets/svg/rightSideIcon";
import styles from "./KPIWapper.module.scss";
import { RootState } from "./../../../redux";
import { useSelector } from "react-redux";
import { useCurrentPageTab } from "../../../hooks";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";
import { functions } from "lodash";
import PravidIcons from "../icon/PravidIcons";
export default function KPIWrapper(props: any) {
  // const whereweare=useSelector((state:RootState)=>state.dashboardReducer);
  // const sourceTab=whereweare.sourceTab;
  // const channelTab=whereweare.channelTab;
  // const whatsappChannelTab=whereweare.whatsappChannelTab;
  // const subModuleTab=whereweare.subModuleTab;
  // const loggerstate=useSelector((state:RootState)=>state.loggerReducer.loggerState.currentPage)
  // const pageType=useSelector((state:RootState)=>state.loginReducer.isActivePageType)
  // const schema =useSelector((state:RootState)=>state.loginReducer?.userLoginInfo?.schema);
  //   const allFilterOptions=useSelector((state:RootState)=>state.filterReducers?.filterOptions?.data?.filters);
  //getting data dfor downlaod
  //  const downloadsoption=(schema["Logger"]['report']['Debt Collection']["Campaign"]["Call"]["kpiDetails"]);

  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();

  const [kpiDetails, setKpiDetails] = useState<any>({ charts: [], cards: [] });

  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setKpiDetails(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        }).kpiDetails
      );
    }
  }, [
    schema,
    sourceTab,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
    isActivePageType,
  ]);
  const chartMapOptions = kpiDetails.charts.map((each: any) => {
    return each;
  });
  const cardsMap = kpiDetails.cards.map((each: any) => {
    return each;
  });

  return (
    <>
      <div className={styles.titleofilter}>
        <PravidIcons activeIcon={"blueKpi"} />
        <p className={styles.titletext}>{"KPI Customisation"}</p>
      </div>
      <div className={styles.divide}></div>

      <KPIComponent
        options={{
          options: chartMapOptions,
          name: "Charts",
          fieldName: "charts",
        }}
        disabled={false}
      />
      <KPIComponent
        options={{ options: cardsMap, name: "Cards", fieldName: "cards" }}
        disabled={false}
      />

      <div className={styles.divide}></div>
    </>
  );
}
