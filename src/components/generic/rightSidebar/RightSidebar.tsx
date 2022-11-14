import React, { useEffect, useState } from "react";
import RightSideBarComp from "./RightSidebarComp";
// import {
//   //   arrow,
//   calenderIcon,
//   blueCalender,
//   downloadIcon,
//   blueRefresh,
//   blueDownload,
//   blueColumnCustomize,
//   filterIcon,
//   refreshIcon,
//   columnCustomizeIcon,
//   kpiIcon,
//   blueFilter,
//   blueKpi,

// } from "../../../theme/assets/svg/rightSideIcon";
import { ToastContainer } from "react-toastify";
import { useCurrentPageTab, useFetchFromSchema } from "../../../hooks";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";

export default function RightSideBar() {
  const iconList = [
    { name: "Calendar", firstIcon: "calenderIcon", secondIcon: "blueCalender" },
    {
      name: "Last Updated",
      firstIcon: "refreshIcon",
      secondIcon: "blueRefresh",
    },
    { name: "Filter", firstIcon: "filterIcon", secondIcon: "blueFilter" },
    {
      name: "Download",
      firstIcon: "downloadIconGray",
      secondIcon: "blueDownload",
    },
    { name: "KPI customisation", firstIcon: "kpiIcon", secondIcon: "blueKpi" },
    {
      name: "Shuffle Column",
      firstIcon: "columnCustomizeIcon",
      secondIcon: "blueColumnCustomize",
    },
  ];
  // const whereWeAre = {
  //   module: "Logger",
  //   source: "Debt Collection",
  //   channel: "WhatsApp",
  //   subchannel: "oneWay",
  //   submodule: "Campaign",
  //   reportOrTranscript: "transcript",
  // };
  // const schema=useSelector((state:RootState)=> state.loginReducer?.userLoginInfo?.schema);

  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();

  const [allData, setAllData] = useState([]);
  // const [allData2,setAllData2]=useState<any>([]);
  useEffect(() => {
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
      setAllData(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        })?.sidebarModules
      );
    }
  }, [
    schema,
    sourceTab,
    whatsappChannelTab,
    subModuleTab,
    currentLoggerPage,
    channelTab,
    isActivePageType,
  ]);

  //  let  allData= finderForRightSide(whereWeAre,schema).sidebarModules;
  // const allData = useFetchFromSchema().sidebarModul'es;
  // iconList=  iconList.filter((e:any)=>{
  //   let res=false;
  //      for(let i=0;i<allData.length;i++){
  //       if(e.name===allData[i].name) res=true;
  //      }
  //      return res;
  // //   })

  let allData2: Array<any> = JSON.parse(JSON.stringify(allData));
  allData2 = allData2?.map((e: any) => {
    e["firstIcon"] = iconList.find((eh) => eh.name === e.name)?.firstIcon;
    e["secondIcon"] = iconList.find((eh) => eh.name === e.name)?.secondIcon;
    return e;
    //
  });

  // useEffect(()=>{
  //   let allData3: Array<any> = JSON.parse(JSON.stringify(allData));
  // allData3 = allData3.map((e: any) => {
  //   e["firstIcon"] = iconList.find((eh) => eh.name === e.name)?.firstIcon;
  //   return e;
  //   //
  // });
  // setAllData2(allData3);
  // },[allData])

  return (
    <>
      <RightSideBarComp icons={allData2} />
      <ToastContainer
        position="top-center"
        // type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={true}
      />
    </>
  );
}
