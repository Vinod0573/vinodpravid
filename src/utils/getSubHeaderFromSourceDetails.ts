export const getSubHeaderFromSourceDetails = (
  channels: any,
  selectedChannelKeyIn?: string,
  selectedSubChannelKeyIn?: string,
  selectedSubModuleKeyIn?: string
) => {
  const helperFunction = (arr: Array<any>, selectedKey: string) => {
    const outputArr = arr ? [...arr] : [];
    outputArr.sort((a, b) => a?.position - b?.position);
    const selectedElement =
      outputArr.find(
        (item) => item.name === selectedKey && item.isDisabled === false
      ) || outputArr.find((item) => item.isDisabled === false);
    selectedKey = selectedElement?.name;
    return [outputArr, selectedElement, selectedKey];
  };

  // for channels
  const [channelsArr, selectedChannel, selectedChannelKey] = helperFunction(
    channels,
    selectedChannelKeyIn as string
  );
  let tempSelected = selectedChannel;

  // if selected has subChannels
  let subChannelsArr, selectedSubChannelKey, selectedSubChannel;
  if ("subChannels" in selectedChannel) {
    [subChannelsArr, selectedSubChannel, selectedSubChannelKey] =
      helperFunction(
        tempSelected.subChannels,
        selectedSubChannelKeyIn as string
      );
    tempSelected = selectedSubChannel;
  }

  // for subModules
  const [subModulesArr, selectedSubModule, selectedSubModuleKey] =
    helperFunction(tempSelected.subModules, selectedSubModuleKeyIn as string);

  return {
    channelsArr,
    subChannelsArr,
    subModulesArr,
    selectedChannelKey,
    selectedSubChannelKey,
    selectedSubModuleKey,
  };
};
