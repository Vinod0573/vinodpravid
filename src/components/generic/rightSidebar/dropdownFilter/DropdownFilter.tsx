import React, { useEffect, useState } from "react";
import DropdownFilterAccord from "../../dropdownFilter/DropdownFilterAccord";
import { firstLetterCapital } from "../../../../utils/stringmodifycase";
// import { blueFilter } from "../../../../theme/assets/svg/rightSideIcon";
import styles from "./DropdownFilter.module.scss";
import DropdownSingleSelectCheck from "../../dropdownSingleSelectCheck/DropdownSingleSelectCheck";
import { RootState } from "../../../../redux";
import { useSelector } from "react-redux";
import { useCurrentPageTab } from "../../../../hooks";
import { getDataFromSchema } from "../../../../utils/getDataFromSchema";
import PravidIcons from "../../icon/PravidIcons";
export default function DropdownFilter(props: any) {
  // const whereweare=useSelector((state:RootState)=>state.dashboardReducer);
  // const sourceTab=whereweare.sourceTab;
  // const channelTab=whereweare.channelTab;
  // const whatsappChannelTab=whereweare.whatsappChannelTab;
  // const subModuleTab=whereweare.subModuleTab;
  // const loggerstate=useSelector((state:RootState)=>state.loggerReducer.loggerState.currentPage)
  // const pageType=useSelector((state:RootState)=>state.loginReducer.isActivePageType)
  // const schema =useSelector((state:RootState)=>state.loginReducer?.userLoginInfo?.schema);
  const allFilterOptions = useSelector(
    (state: RootState) => state.filterReducers?.filterOptions?.data?.filters
  );
  //getting data dfor downlaod
  const optionsDefaultSelected = useSelector(
    (state: RootState) => state.filterReducers?.selectedFilterOptions
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

  const [downloadOptions, setDownloadOptions] = useState<Array<any>>([]);
  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setDownloadOptions(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        }).filters
      );
    }
  }, [
    schema,
    sourceTab,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
    isActivePageType,
  ]);

  let filterOptionstoMap: Array<any> = JSON.parse(
    JSON.stringify(downloadOptions)
  );
  filterOptionstoMap =
    allFilterOptions &&
    filterOptionstoMap.map((each: any) => {
      const x: any = {};
      x["name"] = each.name;
      let options = allFilterOptions[each.backendReference];
      x["backendRefrence"] = each.backendReference;
      options?.sort((a: any, b: any) => b.priority - a.priority);
      options = options?.map((e: any) => e[each.backendReference]);

      x["options"] = options;
      // console.log(x,"EACH FILTER OPTIONSLIST")
      return x;
    });
  // useEffect(()=>{

  // },[optionsDefaultSelected])

  return (
    <>
      <div className={styles.titleofilter}>
        {/* <img src={blueFilter} alt="" /> */}
        <PravidIcons activeIcon={"blueFilter"} />
        <p className={styles.titletext}>
          {firstLetterCapital(props.selectedIcon)}
        </p>
      </div>
      <div className={styles.divide}></div>

      {filterOptionstoMap &&
        filterOptionstoMap?.map((e: any, i: number) => {
          return <DropdownFilterAccord options={e} key={i} disabled={false} />;
        })}
      <div className={styles.divide}></div>
    </>
  );
}
