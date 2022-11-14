import React from "react";
import styles from "./DownloadSection.module.scss";
import DownloadComponent from "../../../moduleComponents/downloadComponet/DownloadComponent";
// import { blueCalender } from "../../../../theme/assets/svg/rightSideIcon";
// import { firstLetterCapital } from "../../../../utils/stringmodifycase";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../redux";
import { getDataFromSchema } from "../../../../utils/getDataFromSchema";
import { useEffect, useState } from "react";
import useCurrentPageTab from "../../../../hooks/useCurrentPageTab/useCurrentPageTab";
export default function DownloadSection(props: any) {
  // const whereweare = useSelector((state: RootState) => state.dashboardReducer);
  // const sourceTab = whereweare.sourceTab;
  // const channelTab = whereweare.channelTab;
  // const whatsappChannelTab = whereweare.whatsappChannelTab;
  // const subModuleTab = whereweare.subModuleTab;
  // const loggerstate = useSelector(
  //   (state: RootState) => state.loggerReducer.loggerState.currentPage
  // );
  // const pageType = useSelector(
  //   (state: RootState) => state.loginReducer.isActivePageType
  // );
  // const datafordownload = useSelector(
  //   (state: RootState) => state.loginReducer?.userLoginInfo?.schema
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
  //getting data dfor downlaod
  // const downloadsoption=(datafordownload["Logger"]['report']['Debt Collection']["Campaign"]["Call"]["sidebarModules"]).find((e:any)=>e.name==="Download").keys;
  // const downloadsoption = getDataFromSchema({
  //   schema: datafordownload,
  //   sourceTab,
  //   subModuleTab,
  //   isActivePageType: pageType,
  //   channelTab,
  //   whatappChannelTab: whatsappChannelTab,
  //   currentLoggerPage: loggerstate,
  // });
  // const downloadsoption2 =(datafordownload["Logger"]['report']['Debt Collection']["Payment"]["Call"])
  // console.log(JSON.stringify(downloadsoption) === JSON.stringify(downloadsoption2), "HAHHAHAHAHHAH");
  const [dataforoptions, setDataforoptions] = useState<any>([]);
  useEffect(() => {
    if (
      sourceTab &&
      channelTab &&
      currentLoggerPage &&
      currentLoggerPage &&
      isActivePageType
    ) {
      setDataforoptions(
        getDataFromSchema({
          schema,

          sourceTab,

          isActivePageType,

          whatsappChannelTab,

          subModuleTab,

          channelTab,

          currentLoggerPage,
        }).sidebarModules.find((e: any) => e.name === "Download").keys
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

  return (
    <>
      <div className={styles.titleofilter}>
        <p className={styles.titletext}>
          {dataforoptions ? dataforoptions[0]?.mainKey : "Download"}
        </p>
      </div>
      <div className={styles.divide}></div>
      {dataforoptions && (
        <DownloadComponent
          setSelectedIcon={props?.setSelectedIcon}
          radioOptions={[
            {
              name: dataforoptions[0]?.subKey[0]?.keyName,
              about: dataforoptions[0]?.subKey[0]?.info,
              format: dataforoptions[0]?.subKey[0]?.format,
            },
            {
              name: dataforoptions[0]?.subKey[1]?.keyName,
              about: dataforoptions[0]?.subKey[1]?.info,
              format: dataforoptions[0]?.subKey[1]?.format,
            },
          ]}
          //  downloadFormats={[dataforoptions[0]?.subKey[0]?.format,dataforoptions[0]?.subKey[1]?.format]}
        />
      )}
    </>
  );
}
