import React, { useEffect, useState } from "react";
// import { useReactToPrint } from "react-to-print";
import "./DownloadComponent.scss";
// import { quest } from "./../../../theme/assets/svg/rightSideIcon";
import { each } from "immer/dist/internal";
import {
  setDownloadViewAll,
  setDownloadOptionsAndDownload,
  setShowRightSideBar,
  getAllReportCsvData,
} from "../../../redux/filters/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useCurrentPageTab } from "../../../hooks";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import PravidIcons from "../../generic/icon/PravidIcons";

interface EachObj {
  name: string;
  about: string;
  format: string;
}
interface Props {
  radioOptions: Array<EachObj>;
  setSelectedIcon: any;
  // downloadFormats: Array<string>;
}

export default function DownloadComponent(props: Props) {
  const calender = useSelector((state: any) => {
    return state.filterReducers?.calenderData;
  });
  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );

  const selectedFilterOptions = useSelector((state: RootState) => {
    return state.filterReducers?.selectedFilterOptions;
  });
  const filterSelectedDate = useSelector(
    (store: RootState) => store?.filterReducers?.calenderData
  );
  const currentSelectedDate = useSelector(
    (store: RootState) => store.filterReducers.calenderData
  );
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userLoginInfo?.userDetail?._id
  );

  const activePageType = useSelector(
    (state: RootState) => state.loginReducer.isActivePageType
  );
  const selectedFilters = useSelector(
    (state: RootState) => state?.filterReducers?.selectedFilterOptions
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

  const conversationId = useSelector(
    (state: RootState) =>
      state.loggerReducer?.transcriptReducer?.currentSession?.conversationId
  );
  const [selectedTypeOfDownload, setSelectedTypeOfDownload] =
    useState<number>(0);
  const [selectedDownloadFormat, setSelectedDownloadFormat] =
    useState<number>(0);
  const [formatOfDownload, setFormatOfDownlaod] = useState<any>();

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { typeofdownload, formattype } = e.target as typeof e.target & {
      typeofdownload: { value: number };
      formattype: { value: number };
    };

    dispatch(setShowRightSideBar(false));
    if (activePageType === "Analytics" && typeofdownload.value == 0) {
      toast.success("Please Wait ... Downloading ");
      dispatch(setDownloadViewAll("Active"));
      dispatch(setShowRightSideBar(false));
    } else if (currentLoggerPage === "Transcript") {
      if (typeofdownload.value == 0) {
        dispatch(
          setDownloadOptionsAndDownload({
            accountName: accountName,
            conversationId: conversationId,
          })
        );
      } else {
        toast.success("Please Wait ... Downloading ");
        dispatch(
          setDownloadOptionsAndDownload({
            accountName: accountName,
            dategte: calender?.startDate,
            datelte: calender?.endDate,
            ...selectedFilters,
          })
        );
      }

      //
    } else {
      toast.success("Please Wait ... Downloading ");
      dispatch(
        getAllReportCsvData(
          {
            clientName: accountName,
            dategte:
              moment(filterSelectedDate.startDate).format("YYYY-MM-DD") +
              "T00:00:00",
            datelte:
              moment(filterSelectedDate.endDate).format("YYYY-MM-DD") +
              "T23:59:59",
            channel: [channelTab],
            source: [sourceTab],
            subModule: subModuleTab,

            ...(channelTab === "Whatsapp" || channelTab === "Chat"
              ? { communicationType: [whatsappChannelTab] }
              : {}),
            userId: userId,
            ...selectedFilterOptions,
          },
          dispatch
        )
      );
    }
    props?.setSelectedIcon("");
  }

  const handleChange = (e: any, i: number) => {
    setSelectedTypeOfDownload(+i);
  };
  const handleChangeFormat = (e: any, i: number) => {
    setSelectedDownloadFormat(+i);
  };

  useEffect(() => {
    //  / if//
    setFormatOfDownlaod(props.radioOptions[selectedTypeOfDownload]["format"]);
  }, [props.radioOptions, selectedTypeOfDownload]);

  // useEffect(() => {
  //   //  / if//
  //   setFormatOfDownlaod(props.radioOptions[0]["format"]);
  //   console.log(formatOfDownload, "dfddd", props.radioOptions[0]["format"]);
  // }, [props.radioOptions]);

  // useEffect(() => {
  //   console.log("why this is changeing", currentLoggerPage)
  //   // if (currentLoggerPage === "Report") dispatch(setShowRightSideBar(false));
  // }, [currentLoggerPageFromReducer]);

  return (
    <div className="downloadcompoennetwrapper">
      <form action="" onSubmit={handleSubmit}>
        {props.radioOptions.map((e, i) => {
          return (
            <div
              className={
                "eachoptions" +
                (selectedTypeOfDownload === i ? " eachoptionsblue " : "")
              }
              key={i}
            >
              <div className={"inputareadiv"}>
                <input
                  type="radio"
                  name="typeofdownload"
                  value={i}
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  defaultChecked={selectedTypeOfDownload === i}
                />
                <p>{e.name}</p>
              </div>
              <div className="tooltip">
                {/* <img src={quest} alt="" /> */}
                <PravidIcons activeIcon={"quest"} />
                <span className="tooltiptext">
                  <div className="tooltipteaxt-div">
                    <p className="tooltiptext-head">{e.name} </p>
                    <p className="tooltiptext-about">{e.about}</p>
                  </div>
                </span>
              </div>
            </div>
          );
        })}

        <div className="divideder"></div>
        <p className="formates">Format</p>
        <div className="formatsdivopt">
          {/* {props.downloadFormats.map((e, i) => {
            return (
              <div
                className={
                  "formatsofinput" +
                  (selectedDownloadFormat === i ? " formatsofinputblue" : "")
                }
                key={i}
              >
                {" "}
                <input
                  type="radio"
                  name="formattype"
                  onChange={(e) => {
                    handleChangeFormat(e, i);
                  }}
                  value={i}
                  defaultChecked={selectedDownloadFormat === i}
                />
                <p> {e}</p>
              </div>
            );
          })} */}
          <div className={"formatsofinput" + " formatsofinputblue"}>
            <input
              type="radio"
              name="formattype"
              // onChange={(e) => {
              //   handleChangeFormat(e, i);
              // }}
              //value={i}
              defaultChecked={true}
            />

            <p>{formatOfDownload}</p>
          </div>
        </div>
        <button type="submit" className="blueclorbtn">
          Download
        </button>
      </form>
    </div>
  );
}
