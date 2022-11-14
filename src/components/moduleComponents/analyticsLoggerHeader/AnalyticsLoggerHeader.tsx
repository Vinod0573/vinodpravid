import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootStore";
import HeaderTabComponent from "../headerTabComponent/HeaderTabComponent";
import styles from "./AnalyticsLoggerHeader.module.scss";
import RadioButton from "../../generic/radioButton/RadioButton";
import { setCurrentPage } from "../../../redux/logger/loggerState/action";
import {
  additionWorker,
  substractionWorker,
  restAPICallWorker,
} from "../../../redux/reduxSagaExample/actions";
import SubModuleHeader from "../subModuleHeaderTab/SubModuleHeader";
import {
  setSelectedSourceTab,
  setSubHeaderTabs,
} from "../../../redux/dashboard/actions";
import { getDayInCorrectFormat } from "../../../utils/ConvertTime";
import screenType from "../../../screens/screenType";
interface props {
  default: string;
}

export default function AnalyticsLoggerHeader(props: any) {
  // useSelector and dispatch
  // const isLeftSideMenuIcon = useSelector(
  //   (store: RootState) => store.baseScreen?.leftMenu?.isOnlyIcons
  // );
  const activePage = useSelector(
    (store: RootState) => store?.loginReducer?.isActivePageType
  );
  const sourceDetails = useSelector(
    (store: RootState) => store?.loginReducer?.userLoginInfo?.sourceDetails
  );
  const currentPage = useSelector(
    (store: RootState) => store?.loggerReducer?.loggerState?.currentPage
  );
  const currentSelectedDate = useSelector(
    (store: RootState) => store.filterReducers.calenderData
  );
  const [showTabName, setShowTabName] = useState<string>();
  const sourceTab = useSelector((state: any) => {
    return state.dashboardReducer?.sourceTab;
  });
  const dispatch = useDispatch();

  const handleTabClick = (name: string) => {
    if (name !== sourceTab) {
      dispatch(setSubHeaderTabs("", "", ""));
    }
    setShowTabName(name);
    dispatch(setSelectedSourceTab(name));
  };

  useEffect(() => {
    setShowTabName(sourceDetails?.analytics[0]?.name);
    if (sourceDetails) {
      dispatch(setSelectedSourceTab(sourceDetails?.analytics[0]?.name));
    }
  }, []);

  useEffect(() => {
    setShowTabName(sourceDetails?.analytics[0]?.name);
  }, [activePage]);

  const radioChangeHandler = (e: any) => {
    dispatch(setCurrentPage(e.target.value));
  };

  const sourceArr =
    activePage === screenType.analytics.name
      ? sourceDetails?.analytics
      : activePage === "Logger" && currentPage === "Report"
      ? sourceDetails?.logger?.report
      : sourceDetails?.logger?.transcript;

  let subselectedTabData: any = {};

  if (showTabName) {
    subselectedTabData = sourceArr.find((x: any) => x.name == showTabName);
  }

  return (
    <div className={styles.analyticsLoggerHeaderWrapper}>
      <div className={styles.sourceTab}>
        {activePage === "Logger" && (
          <div className={styles.loggerRadioButton}>
            <div>
              <RadioButton
                changed={radioChangeHandler}
                id="1"
                isSelected={currentPage === "Report"}
                label="Report"
                value="Report"
              />
            </div>
            <div>
              <RadioButton
                changed={radioChangeHandler}
                id="2"
                isSelected={currentPage === "Transcript"}
                label="Transcript"
                value="Transcript"
              />
            </div>
          </div>
        )}
        {
          <div className={styles.datearea}>
            <p className={styles.dateArea}>
              {getDayInCorrectFormat(currentSelectedDate)}
            </p>
          </div>
        }
        <HeaderTabComponent
          sourceDetails={sourceArr}
          onClick={handleTabClick}
          selectedTab={showTabName}
        />
      </div>
      <div className={styles.subHeaderPart2}>
        {Object.keys(subselectedTabData).length > 0 && (
          <SubModuleHeader channels={subselectedTabData.channels} />
        )}
      </div>
    </div>
  );
}
