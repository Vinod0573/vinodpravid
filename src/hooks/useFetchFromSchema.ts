import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

export default function useFetchFromSchema() {
  const schema = useSelector(
    (store: any) => store.loginReducer?.userLoginInfo?.schema
  );
  // const { sourceTab, channelTab, subModuleTab, whatsappChannelTab } =
  //   useSelector((store: any) => store.dashboardReducer);
  const isActivePageType = useSelector(
    (store: any) => store.loginReducer?.isActivePageType
  );
  const currentLoggerPage = useSelector(
    (state: RootState) => state.loggerReducer?.loggerState?.currentPage
  );

  // let dataToReturn = schema;
  // if (!schema) return "invalid schema";

  // // level 1
  // if (!isActivePageType) return "loginReducer?.isActivePageType is invalid";
  // if (isActivePageType === "logger") {
  //   if (!currentLoggerPage)
  //     return "loggerReducer.loggerState.currentPage of logger is invalid";
  //   dataToReturn = dataToReturn["logger"][currentLoggerPage.toLowerCase()];
  // } else if (isActivePageType === "dashboard") {
  //   dataToReturn = dataToReturn["analytics"];
  // }
  // // level 2 & 3
  // if (!sourceTab) return "dashboardReducer.sourceTab is invalid";
  // if (sourceTab === "Debt Collection") {
  //   dataToReturn = dataToReturn["Debt"];
  // } else {
  //   dataToReturn = dataToReturn["Lead Generation"];
  // }
  // // if (!subModuleTab) return "dashboardReducer.subModuleTab is invalid";
  // // dataToReturn = dataToReturn[subModuleTab];
  // if (!channelTab) return "invalid channelTab";
  // dataToReturn = dataToReturn[channelTab];

  // if (channelTab === "WhatsApp") {
  //   if (!whatsappChannelTab)
  //     return "dashboardReducer.whatappChannelTab is invalid";
  //   dataToReturn = dataToReturn[whatsappChannelTab];
  // }

  // if (!subModuleTab) return "dashboardReducer.subModuleTab is invalid";
  // dataToReturn = dataToReturn[subModuleTab];

  // return dataToReturn;

  return schema["analytics"]["Debt"]["WhatsApp"]["One Way"]["Campaign"];
}