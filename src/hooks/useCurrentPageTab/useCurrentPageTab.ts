import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { RootState } from "../../redux";

export default function useCurrentPageTab() {
  const location = useLocation();

  const urlToModulesMapping = useSelector(
    (state: RootState) => state.baseScreen?.leftMenu?.urlToModuleMapping
  );

  const schema = useSelector(
    (store: any) => store.loginReducer?.userLoginInfo?.schema
  );

  const { sourceTab, channelTab, subModuleTab, whatsappChannelTab } =
    useSelector((store: any) => store.dashboardReducer);

  // const isActivePageType = useSelector(
  //   (store: any) => store.loginReducer?.isActivePageType
  // );

  const currentLoggerPage = useSelector(
    (state: RootState) => state.loggerReducer?.loggerState?.currentPage
  );

  const urlPath = location.pathname.split("/")[1];

  const isActivePageType = urlToModulesMapping[urlPath];

  return {
    schema,

    sourceTab,

    channelTab,

    subModuleTab,

    whatsappChannelTab,

    isActivePageType,

    currentLoggerPage,
  };
}
