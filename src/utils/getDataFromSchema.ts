/**
 * getDataFromSchema is use to get data from schema in cleaner way.
 * get require data by useSelector hook from reducer and pass in function.
 * currentLoggerPage?: string; it is report/ transcript.
 * It will return schema according to tab selected if all data is valid.
 * Otherwise will return string with error message.
 */

interface argsInterface {
  schema: any;
  isActivePageType: string;
  sourceTab: string;
  subModuleTab: string;
  channelTab: string;
  whatsappChannelTab?: string;
  currentLoggerPage?: string;
}

export const getDataFromSchema = ({
  schema,
  isActivePageType,
  sourceTab,
  subModuleTab,
  channelTab,
  whatsappChannelTab,
  currentLoggerPage,
}: argsInterface) => {
  let dataToReturn = schema;
  if (!schema) return null;

  // level 1
  if (!isActivePageType) return null;
  dataToReturn = dataToReturn[isActivePageType.toLowerCase()];

  // level 2
  if (isActivePageType === "Logger") {
    if (!currentLoggerPage) return null;
    dataToReturn = dataToReturn[currentLoggerPage.toLowerCase()];
  }

  // level 3
  if (!sourceTab) return null;
  dataToReturn = dataToReturn[sourceTab];
  // level 4
  if (!channelTab) return null;
  dataToReturn = dataToReturn[channelTab];

  if (channelTab === "Whatsapp" || channelTab === "Chat") {
    if (!whatsappChannelTab) return null;
    dataToReturn = dataToReturn[whatsappChannelTab];
  }

  if (!subModuleTab) {  dataToReturn = dataToReturn["Campaign"]}
  else {dataToReturn = dataToReturn[subModuleTab]}
  

  if (dataToReturn instanceof Array) dataToReturn = [...dataToReturn];
  
  return dataToReturn;
 
  // return schema["analytics"]["Debt"]["WhatsApp"]["One Way"]["Campaign"];
};
