import React from "react";

import Moment from "moment";
import downloadBtn from "../../../../../theme/assets/svg/campaign/campaignDownload.svg";
import mapingIcon from "../../../../../theme/assets/svg/campaign/mappingIcon.svg"
import downloadGreen from "../uploadedinfo/downloadGreenIcon.svg"
import DownloadRed from "../uploadedinfo/downloadRed.svg";

// This is the table constant/settings which needed to render table elements
export const callDetailsTableConstants = (
 downloadcsvFunc ,  downloadIdFun , tomap ,accountType,breadcrumName
) => {

      const toDownloadCsv = (url , name) => {
         downloadcsvFunc(url ,name)
      }
      const downloadId =(url ,name) => {
        downloadIdFun(url ,name)
      }
      const mappin = (data,rowdata) => {
        tomap(data,rowdata)
      }

  return [
    {
      title: "Mode",
      render: (rowData, indx, pageNo) => {
        return <span>{rowData?.mode}</span>;
      },
    },
    {
      title: "File Name",
      render: (rowData) => {
        return <><span>{rowData?.uploadCsvFileName[0]}</span>
        </>;
      },
    },
    {
      title:"",
      render:(rowData)=>{
        return <> <img className="download-btn" src={downloadBtn} onClick={() => toDownloadCsv(rowData?.uploadCsvPath[0] , rowData?.fileName)}/></>
      }
    },

    {
      title:"Uploaded On",
      render: (rowData) => {
        return (
          <div>
            <p>
            <div>{Moment.utc(rowData?.createdAt).format("DD MMM YY")}</div>
            <div style={{fontSize : "0.75vmax"}}>{Moment.utc(rowData?.createdAt).local().format("h:mma") }</div>
            </p>
           </div>
        );
      },
    },
    {
      title:"",
      render:(rowData)=>{

        let pathData=rowData?.uploadCsvPath[0]?.length>0?rowData.uploadCsvPath:rowData?.downloadablePath?[rowData.downloadablePath]:""
        return accountType!="External" && rowData?.area!="Dunning" &&<> <img className={`mapBtn ${(rowData.status==="Completed" || rowData.status=="Partial Completed" || rowData.status=="Failed") ? "mapBtnDis" : ""}`}
         src={mapingIcon} onClick ={() =>  mappin(pathData,rowData )}/></>
      }
    },
    {
      title:"",
      render:(rowData)=>{
        return <> {
          ( (rowData.status==="Completed" ) && rowData?.area=== "Allocation" )|| ( (rowData.status==="Completed"&& rowData?.area=== "Dunning" ))?
          <img className="download-btn2" src={downloadGreen} onClick={() => downloadId(rowData?.downloadablePath , rowData?.fileName)}/>
            : ((rowData.status==="Partial Completed" && rowData?.area=== "Allocation") || (rowData.status==="Failed" && rowData?.area=== "Allocation") )
            ||((rowData.status==="Partial Completed" && rowData?.area=== "Dunning") || (rowData.status==="Failed" && rowData?.area=== "Dunning"))
            ? <img className="download-btn2" src={DownloadRed} onClick={() => downloadId(rowData?.downloadablePath , rowData?.fileName)}/>: ""} </>
      }
    },

  ];
};
