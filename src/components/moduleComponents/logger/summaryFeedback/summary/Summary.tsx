import React, { useEffect } from "react";
import { useState } from "react";
import SummaryContent from "./subComponents/SummaryContent";
import { useCurrentPageTab } from "../../../../../hooks";
import { getDataFromSchema } from "../../../../../utils/getDataFromSchema";
import { useSelector } from "react-redux";
import { getValueByReferenceKey } from "../../../../../utils";

interface props {
  summary: any;
}
type summaryObjectType = {
  mainKey: string;
  subKey: { [key: string]: string };
};

export default function Summary(props: props) {
  const transcriptData: any[] = useSelector((state: any) => {
    return state.loggerReducer?.loggerState?.transcriptData;
  });
  const [customerProfile, setCustomerProfile] = useState({});
  const [conversation, setConversation] = useState<{ [key: string]: string }>(
    {}
  );
  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();

  const [dataToBeShown, setDataToBeShown] = useState<any>([]);
  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setDataToBeShown(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        }).Summary
      );
    }
  }, [schema, sourceTab, whatsappChannelTab, subModuleTab, channelTab]);

  // const dataToBeShown = useFetchFromSchema().Summary;
  // console.log("dataToBeShown", dataToBeShown);
  const callSummaryData: { [key: string]: any } = props.summary;

  useEffect(() => {
    if (callSummaryData && dataToBeShown.length > 0) {
      // conversation
      const newConversation: { [key: string]: string } = {};
      const newCustomerProfile: { [key: string]: string } = {};

      const conversationKey = dataToBeShown.find(
        (item: summaryObjectType) => item.mainKey === "Conversation"
      )?.subKey;
      conversationKey.forEach((item: summaryObjectType["subKey"]) => {
        const key = item.referenceKeyName.substring(
          21,
          item.referenceKeyName.length - 1
        );
        newConversation[item.keyName] = callSummaryData.information[key];
      });
      setConversation(newConversation);
      // customerProfile

      const customerProfileKeys = dataToBeShown?.find(
        (item: summaryObjectType) => item?.mainKey === "Customer Profile"
      )?.subKey;
      customerProfileKeys.forEach((item: summaryObjectType["subKey"]) => {
        // const key = item.referenceKeyName.substring(
        //   21,
        //   item.referenceKeyName.length - 1
        // );
        // newCustomerProfile[item.keyName] = callSummaryData.information[key];
        newCustomerProfile[item.keyName] = getValueByReferenceKey(
          transcriptData[1],
          item.referenceKeyName
        );
      });
      setCustomerProfile({ ...newCustomerProfile });
      // console.log("customer profile", newCustomerProfile);
      // console.log("customer profile", newConversation);
    }
  }, [callSummaryData, transcriptData]);

  return (
    <div>
      <SummaryContent
        customerProfile={customerProfile}
        conversation={conversation}
      />
    </div>
  );
}
