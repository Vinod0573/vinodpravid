import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { routesToBeRendered } from "./routes.functions";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Salesforce from "../components/moduleComponents/integration/salesforces/salesforce";
import { error404 } from "../theme/assets/svg";
import HomePage from "../screens/onBoarding/Home";
import LogIn from "../screens/onBoarding/login/LogIn";
import BaseScreen from "../screens/baseScreeen/BaseScreen";
import Logger from "../screens/logger/Logger";
import Analytics from "../screens/analytics/AnalyticsScreen";
import ConnectorPage from "../components/moduleComponents/demo/connectorPage/ConnectorPage";
import DemoLogIn from "../screens/demoScreen/demoLoginInPage/DemoLogIn";
import Admin from "../screens/admin/Admin";
import Billing from "../screens/billing/billing";
import Operation from "../screens/operation/Operation";
import Campaign from "../screens/campaign/campaignTable/Campaign";
import CampaignTestingInfo from "../screens/campaign/campaignTesting/CampaignTesting";
import Bot from "../screens/botManager/bot";
import UserAdmin from "../screens/admin/Admin";
import screenTypes from "../screens/screenType";
import { RootState } from "../redux/rootStore";
import styles from "./Routes.module.scss";
// import { RootState } from "../redux";

// import {LOGIN} from "./Path.js"
import NoDatamodel from "../components/generic/noDatamodel/NoDatamodel";
const Routers = () => {
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  const tokenRedux = useSelector(
    (store: any) =>
      store.loginReducer.userLoginInfo?.userSessionDetails?.accessToken
  );
  const defaultSelectedModule = useSelector(
    (store: RootState) => store.baseScreen.leftMenu.defaultSelectedModule
  );
  const navigate = useNavigate();
  function backToHome() {
    navigate("/");
  }
  // const leftModuleDetails = useSelector(
  //   (store: RootState) => store.baseScreen.leftMenu.moduleDetails
  // );

  // /* useStates */
  // const [toBeRendered, setToBeRendered] = useState<any>({});
  // const [moduleArr, setModuleArr] = useState<Array<string>>([]);

  // /* useEffects */
  // useEffect(() => {
  //   const routes = routesToBeRendered(leftModuleDetails);
  //   setToBeRendered(routes);
  //   setModuleArr(Object.keys(routes));
  //   console.log(routes);
  // }, [leftModuleDetails]);

  if (!(token || tokenRedux)) {
    return (
      <>
        {/* {console.log("i am in non token ")} */}
        <Routes>
          <Route path="/resetpassword"></Route>
          <Route path="/login" element={<LogIn setToken={setToken} />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup"></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseScreen />}>
          <Route path="dashboard" element={<Analytics />} />
          <Route path="calllogger" element={<Logger />} />
          <Route
            path="ConnectorPage"
            element={<ConnectorPage hideProgressBar="hide" />}
          />
          <Route path="demo" element={<DemoLogIn />} />
          <Route path="campaignmanager" element={<Campaign />} />
          <Route path="billing" element={<Billing />} />
          <Route path="strategy" element={<Operation />} />
          <Route path="admin" element={<Admin />} />
          <Route
            path="campaign-testing-info"
            element={<CampaignTestingInfo />}
          />
          <Route path="botmanager" element={<Bot />} />
          <Route path="/operation" element={<Operation />} />
          <Route path="/userlist" element={<UserAdmin />} />
          <Route
            path="/"
            // element={<Navigate to={defaultSelectedModule.url} replace={true} />}
            element={
              defaultSelectedModule.url && (
                <Navigate to={defaultSelectedModule.url} replace={true} />
              )
            }
          />
          <Route
            path="*"
            // element={<Navigate to={defaultSelectedModule.url} replace={true} />}
            element={
              <div className={styles.error}>
                <NoDatamodel
                  srcImg={error404}
                  message="Ooops!! We can’t seem to find a page you are looking for."
                  extraCss={{ message: styles.message, img: styles.img }}
                  button={{ message: "Back to Home", onClick: backToHome }}
                ></NoDatamodel>
              </div>
            }
          />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<BaseScreen />}>
          {moduleArr.includes("Analytics") && (
            <Route path={toBeRendered["Analytics"]} element={<Analytics />} />
          )}
          {moduleArr.includes("Logger") && (
            <Route path={toBeRendered["Logger"]} element={<Logger />} />
          )}

          {moduleArr.includes("Connector") && (
            <Route
              path={toBeRendered["Connector"]}
              element={<ConnectorPage hideProgressBar="hide" />}
            />
          )}

          {moduleArr.includes("Demo") && (
            <Route path={toBeRendered["Demo"]} element={<DemoLogIn />} />
          )}

          {moduleArr.includes("Campaign") && (
            <Route path={toBeRendered["Campaign"]} element={<Campaign />} />
          )}

          {moduleArr.includes("Billing") && (
            <Route path={toBeRendered["Billing"]} element={<Billing />} />
          )}

          {moduleArr.includes("Strategy") && (
            <Route path={toBeRendered["Strategy"]} element={<Operation />} />
          )}

          {moduleArr.includes("Admin") && (
            <Route path={toBeRendered["Admin"]} element={<Admin />} />
          )}

          {moduleArr.includes("CampaignTesting") && (
            <Route
              path={toBeRendered["CampaignTesting"]}
              element={<CampaignTestingInfo />}
            />
          )}

          {moduleArr.includes("Bot") && (
            <Route path={toBeRendered["Bot"]} element={<Bot />} />
          )}
        </Route>
      </Routes> */}
    </>
  );
};

export default Routers;
