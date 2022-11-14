import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubHeaderFromSourceDetails } from "../../../utils";
import HeaderTabComponent from "../headerTabComponent/HeaderTabComponent";
import styles from "./SubModuleHeader.module.scss";
import { useCurrentPageTab } from "../../../hooks";
import { setSubHeaderTabs } from "../../../redux/dashboard/actions";

export default function SubModuleHeader(props: any) {
  /* redux hooks */
  const {
    sourceTab,
    isActivePageType,
    whatsappChannelTab: subChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();
  const dispatch = useDispatch();

  /* useState */
  const [channelsArr, setChannelsArr] = useState<Array<any>>([]);
  const [subChannelsArr, setSubChannelsArr] = useState<Array<any>>([]);
  const [subModulesArr, setSubModulesArr] = useState<Array<any>>([]);

  /* useEffect */
  useEffect(() => {
    makeSubHeader(channelTab, subChannelTab, subModuleTab);
  }, [sourceTab, isActivePageType, currentLoggerPage, props.channels]);

  /* helper functions */
  const makeSubHeader = (
    channelTab: string,
    subChannelTab: string,
    subModuleTab: string
  ) => {
    const {
      channelsArr,
      subChannelsArr,
      subModulesArr,
      selectedChannelKey,
      selectedSubChannelKey,
      selectedSubModuleKey,
    } = getSubHeaderFromSourceDetails(
      props.channels,
      channelTab,
      subChannelTab,
      subModuleTab
    );
    setChannelsArr(channelsArr);
    setSubChannelsArr(subChannelsArr);
    setSubModulesArr(subModulesArr);
    dispatch(
      setSubHeaderTabs(
        selectedChannelKey,
        selectedSubChannelKey,
        selectedSubModuleKey
      )
    );
  };

  /* handlers */
  const handleChannelClick = (name: string) => {
    makeSubHeader(name, subChannelTab, subModuleTab);
  };
  const handleSubChannelClick = (name: string) => {
    makeSubHeader(channelTab, name, subModuleTab);
  };
  const handleSubModuleClick = (name: string) => {
    makeSubHeader(channelTab, subChannelTab, name);
  };

  return (
    <div className={styles.subModuleTopDiv}>
      <div className={styles.channelTab}>
        <HeaderTabComponent
          sourceDetails={channelsArr}
          onClick={handleChannelClick}
          selectedTab={channelTab}
        />
      </div>
      {(channelTab === "Whatsapp" || channelTab === "Chat") && (
        <div className={styles.whatsAppChannelTab}>
          <HeaderTabComponent
            sourceDetails={subChannelsArr}
            onClick={handleSubChannelClick}
            selectedTab={subChannelTab}
          />
        </div>
      )}
      <div className={styles.campaignTab}>
        <HeaderTabComponent
          sourceDetails={subModulesArr}
          onClick={handleSubModuleClick}
          selectedTab={subModuleTab}
        />
      </div>
    </div>
  );
}
