import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/rootStore";
import { userLogoutAction } from "../../../redux/onboarding/login/actions";
import { setIsOnlyIcons as setIsOnlyIconsLeftMenu } from "../../../redux/baseScreen/leftMenu";
import styles from "./NavigationBar.module.scss";
import Button from "../../generic/button/Button";
import ReportRequest from "../reportRequest/ReportRequest";
import clearCacheData from "../../../utils/clearCacheData";
import {
  pravidLogo,
  sidebarIconOpen,
  sidebarIconClosed,
  requestFeatureIcon,
  reportBugs,
  reportBugActiveIcon,
  requestFeatureActiveIcon,
} from "../../../theme/assets/headerSvg";
import {
  setShowRightSideBar,
  setSelectedFilterType,
} from "../../../redux/filters/actions";
import ReactTooltip from "react-tooltip";

interface FeatureOptionsDetails {
  1: string;
  2: string;
  3: string;
  4: string;
}

export default function NavigationBar(props: any) {
  //useSelectors and dispatch
  const showOnlyIconsLeftMenu = useSelector(
    (store: RootState) => store.baseScreen.leftMenu.isOnlyIcons
  );
  const activePage = useSelector(
    (store: RootState) => store.loginReducer.isActivePageType
  );

  const dispatch = useDispatch();

  const [propsOption, setPropsOption] = useState<FeatureOptionsDetails | null>(
    null
  );
  const userAccountDetails = useSelector(
    (store: any) => store?.loginReducer?.userLoginInfo?.userDetail?.name
  );
  const [isError, setIsError] = useState();
  const [isCheckActiveRR, setIsCheckActiveRR] = useState({
    reportBugActiveIcon: false,
    requestFeatureActiveIcon: false,
  });
  const ref = useRef<any>();

  const requestFeatureOption = {
    1: "Feature Request",
    2: "Feature Requested",
    3: "Thank you for requesting the feature.",
    4: "Request another feature",
  };
  const reportBugOption = {
    1: "Report a Bug",
    2: "Bug Reported",
    3: "Thank you for reporting the bug.",
    4: "Report another bug",
  };

  const toGetUserCredentials = async () => {
    const temp = await sessionStorage.getItem("name");
  };
  const Navigate = useNavigate();
  useEffect(() => {
    toGetUserCredentials();
  }, []);

  // To close the request feature and report bug pop up on outside click
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isCheckActiveRR.requestFeatureActiveIcon &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsCheckActiveRR((prev) => {
          return {
            ...prev,
            reportBugActiveIcon: false,
            requestFeatureActiveIcon: false,
          };
        });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isCheckActiveRR.requestFeatureActiveIcon]);

  // To close the request feature and report bug pop up on outside click
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isCheckActiveRR.reportBugActiveIcon &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsCheckActiveRR((prev) => {
          return {
            ...prev,
            reportBugActiveIcon: false,
            requestFeatureActiveIcon: false,
          };
        });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isCheckActiveRR.reportBugActiveIcon]);

  // selection between  request feature and report issue
  const handleClickRequestReport = (type: any) => {
    dispatch(setShowRightSideBar(false));
    dispatch(setSelectedFilterType(""));
    if (type === "requestFeature") {
      setPropsOption((previouState) => {
        return {
          ...requestFeatureOption,
        };
      });
      setIsCheckActiveRR((prev) => {
        return {
          ...prev,
          reportBugActiveIcon: false,
          requestFeatureActiveIcon: !prev.requestFeatureActiveIcon,
        };
      });
    } else {
      setPropsOption((previouState) => {
        return {
          ...reportBugOption,
        };
      });
      setIsCheckActiveRR((prev) => {
        return {
          ...prev,
          reportBugActiveIcon: !prev.reportBugActiveIcon,
          requestFeatureActiveIcon: false,
        };
      });
    }
  };

  const toCloseRRModel = () => {
    setIsCheckActiveRR((prev) => {
      return {
        ...prev,
        reportBugActiveIcon: false,
        requestFeatureActiveIcon: false,
      };
    });
  };

  const logout = () => {
    sessionStorage.clear();
    clearCacheData();
    setTimeout(() => dispatch(userLogoutAction()), 3000);
  };

  const handleToggleButtonClick = () => {
    setIsOnlyIconsLeftMenu(dispatch, !showOnlyIconsLeftMenu);
  };

  const handleClickReportBug = () => {
    window.open(
      "https://forms.clickup.com/3667185/f/3fx7h-38984/6HO5TLVGIH4MOBD0AU"
    );
  };
  // console.log(isCheckActiveRR, propsOption, "8999");
  return (
    <>
      <div className={styles.navigationbarTopDiv} ref={ref}>
        <div className={styles.navgationLeft}>
          <div className={styles.navgationLeftChild}>
            <span className={styles.navgationLeftLogoArea}>
              <img
                className={styles.sidebarIcon}
                src={
                  showOnlyIconsLeftMenu ? sidebarIconClosed : sidebarIconOpen
                }
                onClick={handleToggleButtonClick}
              />
              <img className={styles.logomainnav} src={pravidLogo} />
            </span>{" "}
          </div>
        </div>
        <div className={styles.navigationRightChild}>
          <span className={styles.navigationRightWelcome} id="welcome_saarthi">
            {" "}
            Welcome!{" "}
          </span>
          <span className={styles.navigationRightClientname}>
            {userAccountDetails}
          </span>
          <span
          // onClick={logout}
          >
            {/* <a className="logoutLink" href="/"> */}
            <Button
              text="Log Out"
              extraClass={styles.logoutButtonStyle}
              onClick={() => logout()}
            />
            {/* Logout */}
            {/* </a> */}
          </span>
          <span style={{ position: "relative" }}>
            <span
              className={styles.requestFeatureSpan}
              onClick={() => handleClickRequestReport("requestFeature")}
            >
              <span className={styles.requestFeaturePopupIcon}>
                <img
                  src={
                    isCheckActiveRR.requestFeatureActiveIcon
                      ? requestFeatureActiveIcon
                      : requestFeatureIcon
                  }
                  alt="request feature"
                />
                <span className={styles.requestFeaturePopupDescription}>
                  {" "}
                  Request Feature{" "}
                </span>
              </span>
            </span>
          </span>
          {isCheckActiveRR.requestFeatureActiveIcon && (
            <ReportRequest
              propsOption={propsOption}
              toCloseRRModel={() => toCloseRRModel()}
            />
          )}
          <span style={{ position: "relative" }}>
            <span
              className={styles.reportBugSpan}
              // onClick={() => handleClickRequestReport("reportbug")}
              onClick={() => handleClickReportBug()}
            >
              <span className={styles.requestFeaturePopupIcon}>
                <img
                  src={
                    isCheckActiveRR.reportBugActiveIcon
                      ? reportBugActiveIcon
                      : reportBugs
                  }
                  alt="report bug"
                />
                <span className={styles.requestFeaturePopupDescription}>
                  {" "}
                  Report Bug{" "}
                </span>
              </span>
            </span>
          </span>
          {/* {isCheckActiveRR.reportBugActiveIcon && (
            <ReportRequest
              propsOption={propsOption}
              toCloseRRModel={() => toCloseRRModel()}
            />
          )} */}
        </div>
      </div>
    </>
  );
}
