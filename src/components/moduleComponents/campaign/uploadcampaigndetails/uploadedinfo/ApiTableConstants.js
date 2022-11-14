import React from "react";

import Checkbox from "../../../../generic/checkbox/Checkbox";
import downloadBtn from "../../../../../theme/assets/svg/campaign/campaignDownload.svg";
import {loader} from "../../../../../theme/assets/svg/rightSideIcon";

// This is the table constant/settings which needed to render table elements
export const ApiTableConstants = (
  downloadcsvFunc,
  downloadIdFun,
  tomap,
  downloadCsvFileAuto,
  accountType,
  breadcrumName,
  handleCSVData,
  selectedCSVList,
  channel,
  pushedApiData,
  pushedApiDataIndex
) => {
  const toDownloadCsv = (url, name) => {
    downloadcsvFunc(url, name);
  };
  const downloadId = (url, name) => {
    downloadIdFun(url, name);
  };
  const mappin = (data, rowdata) => {
    tomap(data, rowdata);
  };

  const handleSelectedCSVData = (data) => {
    handleCSVData(data.meta, channel);
  };
  const downloadCsvFileAutoTemp = (data,index) => {
     downloadCsvFileAuto(data,index);
  };

  const callingData = ["data"];
  console.log(selectedCSVList, "mhgj");
  return [
    {
      title: "Sr.No",
      render: (rowData, indx, pageNo) => {
        return <span>{"0" + (indx + 1)}</span>;
      },
    },
    {
      title: "Date",
      render: (rowData) => {
        return (
          <>
            <span>
              {(rowData?.meta?.actualDay <= 9
                ? "0" + rowData?.meta?.actualDay
                : rowData?.meta?.actualDay) +
                "-" +
                (rowData?.meta?.actualMonth <= 9
                  ? "0" + rowData?.meta?.actualMonth
                  : rowData?.meta?.actualMonth) +
                "-" +
                rowData?.meta?.year}
            </span>
          </>
        );
      },
    },
    {
      title: "Time",
      render: (rowData) => {
        return (
          <>
            {" "}
            <span>
              {rowData?.meta?.hour <= 12
                ? rowData?.meta?.hour +
                  ":" +
                  (rowData?.meta?.intervalStart <= 9
                    ? "0" + rowData?.meta?.intervalStart
                    : rowData?.meta?.intervalStart)
                : Math.floor(rowData?.meta?.hour % 12) +
                  ":" +
                  (rowData?.meta?.intervalStart <= 9
                    ? "0" + rowData?.meta?.intervalStart
                    : rowData?.meta?.intervalStart)}{" "}
              {rowData?.meta?.hour <= 12 ? "AM" : "PM"}
            </span>
          </>
        );
      },
    },

    {
      title: "Count",
      render: (rowData) => {
        return (
          <div>
            <p>
              <div>{rowData?.count}</div>
            </p>
          </div>
        );
      },
    },
    {
      title:"",
      render:(rowData, index)=>{
        return <> <img key={index} src={pushedApiDataIndex === index && pushedApiData?.sessionInfo?.status === 'inprogress'  ? loader : downloadBtn }
        className={`clickAbleCursorPointerU download-btn ${pushedApiDataIndex === index && pushedApiData?.sessionInfo?.status === 'inprogress' ? "dloader" : ""}`}  onClick={() => downloadCsvFileAutoTemp(rowData,index)}/></>
      }
    },
    {
      title: "",
      render: (rowData) => {
        return (
          <Checkbox
            extraSpan={
              selectedCSVList[channel]?.includes(rowData.meta)
                ? "multi-border"
                : "multi-border-bs"
            }
            checked={
              selectedCSVList[channel]?.includes(rowData.meta) ? true : false
            }
            onChange={(e) => handleSelectedCSVData(rowData)}
          />
        );
      },
    },
  ];
};
