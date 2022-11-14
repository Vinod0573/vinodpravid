import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { optionType } from "./leftSideMenu.interface";
import { RootState, AppDispatch } from "../../../redux/rootStore";
import { setIsActivePageType } from "../../../redux/onboarding/login/actions";
import {
  setHighlightedModule,
  setLeftSideModuleDetails,
} from "../../../redux/baseScreen/leftMenu";
import Option from "./option/Option";
import styles from "./LeftSide.module.scss";
import optionStyles from "./option/option.module.scss";
import { useDispatch, useSelector } from "react-redux";
import SubModules from "./subModules/SubModules";
import { getLeftSideModuleDetails } from "../onBoarding/login/loginField/LoginFields.functions";

import {
  setShowRightSideBar,
  setSelectedFilterType,
} from "../../../redux/filters/actions";
import {
  setSelectedSourceTab,
  setSubHeaderTabs,
} from "../../../redux/dashboard/actions";
export default function LeftSideMenu() {
  /* useSelector , dispatch */
  const isOnlyIcons = useSelector(
    (store: RootState) => store.baseScreen?.leftMenu?.isOnlyIcons
  );
  const activePage = useSelector(
    (store: RootState) => store.loginReducer?.isActivePageType
  );
  const highlightedModule = useSelector(
    (store: RootState) => store.baseScreen?.leftMenu?.highlightedModule
  );
  // const navbarOptions = useSelector(
  //   (store: RootState) => store.baseScreen?.leftMenu?.menuOptions
  // );
  // const moduleDetails_redux = useSelector(
  //   (store: RootState) => store.loginReducer?.userLoginInfo?.moduleDetails
  // );
  // let moduleDetails = [...moduleDetails_redux];
  // moduleDetails = moduleDetails?.sort((a: any, b: any) =>
  //   a?.moduleId?.localeCompare(b?.moduleId)
  // );
  const moduleDetails = useSelector(
    (store: RootState) => store.baseScreen.leftMenu.moduleDetails
  );
  const subModuleMapping = useSelector(
    (store: RootState) => store.baseScreen.leftMenu.subModuleMapping
  );
  const urlToModuleMapping = useSelector(
    (store: RootState) => store.baseScreen.leftMenu.urlToModuleMapping
  );
  const sourceDetails = useSelector(
    (store: RootState) => store?.loginReducer?.userLoginInfo?.sourceDetails
  );
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  /* useState */
  // const [navbarOptionsToShow, setNavbarOptionsToShow] =
  //   useState<optionType[]>();

  // const moduleName: string[] = moduleDetails.map((item: any) =>
  //   item.name.toLowerCase()
  // );
  // moduleName.push("dashboard");

  // useEffect(() => {
  //   const optionsToShow = navbarOptions.filter((item: optionType) =>
  //     moduleName?.includes(item.pageName)
  //   );
  //   setNavbarOptionsToShow(optionsToShow);
  //   // console.log(moduleName);
  // }, []);

  const navigate = useNavigate();

  const [activeSubModule, setActiveSubModule] = useState<string>("");

  /* useEffect */
  useEffect(() => {
    const urlPath = location.pathname.split("/")[1];
    dispatch(setIsActivePageType(urlToModuleMapping[urlPath]));
  }, [location.pathname]);

  useEffect(() => {
    dispatch(setHighlightedModule(subModuleMapping[activePage]));
  }, [activePage]);

  // handlers
  const setActiveOption = (moduleData: any) => {
    if (activePage !== moduleData.name && moduleData.routeName) {
      dispatch(setSelectedSourceTab(sourceDetails?.analytics[0]?.name));
      dispatch(setSubHeaderTabs("", "", ""));
    }
    setActiveSubModule(moduleData.name);
    if (moduleData.isModuleShown) {
      const { moduleDetails: newModuleDetails } =
        getLeftSideModuleDetails(moduleDetails); // make only isShownModules visible
      dispatch(setLeftSideModuleDetails(newModuleDetails));
    }
    if (moduleData.routeName) {
      setActiveSubModule("");
      // dispatch(setIsActivePageType(moduleData.name));
      navigate(moduleData.routeName);
    }
    dispatch(setShowRightSideBar(false));
    dispatch(setSelectedFilterType(""));
  };

  /* handle */

  return (
    <>
      <div
        className={`${styles.leftMenu__container} ${
          isOnlyIcons
            ? `${styles.onlyIcon} ${optionStyles.onlyIcon} onlyIcon`
            : ""
        } `}
        id="auto_main_leftMenu_1"
      >
        <div className={styles.innerDiv} id="auto_main_leftMenu_2">
          {moduleDetails?.map((option, index) => {
            return (
              option.shouldFrontEndShow && (
                <div
                  className={styles.leftMenuOption__container}
                  data-is-down={option.isDown}
                  key={index}
                  id={"auto_left_" + option.name.trim().replace(/\s/g, "")}
                >
                  <div className={styles.leftMenuOption__innerDiv}>
                    {activeSubModule === option.name &&
                      option?.childModules?.length > 0 && (
                        <SubModules
                          subModulesArr={option.childModules}
                          setActiveOption={setActiveOption}
                          activeSubModule={activeSubModule}
                          setActiveSubModule={setActiveSubModule}
                        />
                      )}
                    <Option
                      optionData={option}
                      setActiveOption={setActiveOption}
                      isOnlyIcons={isOnlyIcons}
                      highlightedModule={highlightedModule}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}
