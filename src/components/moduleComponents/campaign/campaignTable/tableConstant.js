import React from "react";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import editIcon from "../../../../theme/assets/svg/campaign/editIcon.svg";
import deleteIcon from "../../../../theme/assets/svg/campaign/deleteIcon.svg";
import iInprogressIcon from "../../../../theme/assets/svg/campaign/iIconInprog.svg";
import iCompleteIcon from "../../../../theme/assets/svg/campaign/iCompleteIcon.svg";
import iPendingIcon from "../../../../theme/assets/svg/campaign/iPendingIcon.svg";
import pauseIcon from "../../../../theme/assets/svg/campaign/pauseIcon.svg";
import nonArchiveIcon from "../../../../theme/assets/svg/campaign/nonArchive.svg";
import callListIcon from "../../../../theme/assets/svg/campaign/callConnectIcon.svg";
import schedulerIcon from "../../../../theme/assets/svg/campaign/calenderIcon.svg";
import analystIcon from "../../../../theme/assets/svg/campaign/analystic.svg";
import childNumberIcon from "../../../../theme/assets/svg/campaign/childNumber.svg"
import playIcon from "../../../../theme/assets/svg/campaign/playIcon.svg";
import whatsApp from "../../../../theme/assets/svg/campaign/whatsAppTable.svg";
import callIcon from "../../../../theme/assets/svg/campaign/callTable.svg";
import LshapeIcon from "../../../../theme/assets/svg/campaign/lshapewithdot.svg";

// This is the table constant/settings which needed to render table elements
export const tableConstants = (
  getChildCampaign,
  accountType,
  pageNo,
  downloadCampaignData,
  moveToEdit,
  deleteCampaignData,
  showManualScreen,
  moveToAnnalyticPage,
  moveToCallingListPage,
  handleArchieve,
  handlePlayCampaign,
  handlePauseCampaign,
  toShowScheduleModal,
  toshowProgressModal,
  closeArrowList,
  showChildId,
  getParentLabelId
) => {
  const getdata = (id) => {
    getChildCampaign(id);
  };
  const moveToAnnalytics = (data) => {
    moveToAnnalyticPage(data);
  };
  const moveToCallingList = (data) => {
    moveToCallingListPage(data);
  };
  const handleArchieveTrue = (id, data) => {
    handleArchieve(id, data);
  };
  const handlePlayCampaignTable = (id) => {
    handlePlayCampaign(id);
  };
  const handlePauseCampaignTable = (id) => {
    handlePauseCampaign(id);
  };
  const getParentdata =(id) => {
    console.log("get id " , id )
    getParentLabelId(id)
  }
    

  return [
    {
      title: "Sr.No",
      render: (rowdata, indx, pageNo) => {
        return <span className={`${rowdata?.isChildCampaign ? "childCamapaignChildcolor" : null}`}>{rowdata?.sl_num}</span>;
      },
    },
    {
      title: "Campaign Name",
      render: (rowData) => {
        return (
          <div>
            {/* {rowData?.isMaster ? <div className="masterDiv">Master</div> : null} */}
            <div
              style={{
                display: "flex",
                justifyContent: rowData?.index ? "flex-start" :"space-between" ,
                padding: "0 2%",
                cursor: rowData?.isParent ? "pointer" : ""
              }}
              onClick={() => rowData?.isParent ? getParentdata(rowData?.id) :null}
            >   
              {rowData?.index ? <img src= {rowData?.channels?.includes("Call") ? callIcon : whatsApp }></img>  : ""}
              <span className={rowData?.isParent ? "parentBold" : rowData?.index ?  "childCamapaign" :"childCamapaignChild"}>
              {rowData?.isChildCampaign ? <img className="lshapeIconomni" src= {LshapeIcon}></img>  : ""}
               {  rowData.campaignName ? rowData.campaignName : rowData.campaignId ? rowData.campaignId : "-"}
              </span>{" "}
              <span>
                { !rowData?.isParent  ? rowData?.childCampaigns?.length || rowData?.children?.length? (
             <div className="childNumberDivomni" 
             onClick={() => getdata(rowData?.id)}
             >
                <img
                    style={{ cursor: "pointer" }}
                    src={childNumberIcon}
                    className= "imgchilddr"
                  ></img> 
                   {rowData?.children?.length}
             </div>
                 
                ) : null : null}
              </span>
            </div>
          </div>
        );
      },
    },

    //  {
    //   title: 'Channel',
    //   render: rowData => {
    //     return <span> <div
    //       style={{
    //         display: "flex",
    //         padding: "0 1vmax",
    //         alignItems: "center",
    //       }}
    //     > 
    //      {rowData?.channels &&
    //        rowData?.channels?.map(
    //          e => {
    //            return (
    //             <img className={`imgchannel`} src={ e=="WhatsApp" ? whatsApp : callIcon}></img>
    //            )
    //          }
    //        )
          

    //      }
    //     </div></span>;
    //   },
    // },
    // {
    //   title: 'End Date',
    //   render: rowData => {
    //     let eDate=new Date(rowData.endDate)

    //     return <span>{eDate?moment(eDate).format("DD-MM-YYYY"):"-"}</span>;
    //   },
    // },
    {
      title: "Created On",
      render: (rowData) => {
        let cDate = new Date(rowData.createdAt);
        let time = moment.utc(rowData.createdAt)
       
        return (
        
          <span className={`${rowData?.index ?  "childCamapaign" :"childCamapaignChildcolor"} ${rowData?.isParent  ? "parentDate" : ""} `}>
             {cDate ? moment(cDate).format("DD-MM-YYYY") : "-"}
             <div style={{fontSize :"0.75vmax"}}>{time.local().format('h:mm A')} </div>
          </span>
        );
      },
    },
    {
      title: "Upload Status",
      render: (rowData) => {
        let uDate = new Date(rowData?.uploadedDate);
        return rowData.customerUploadStatus === "Completed"  && !rowData?.isParent? (
          <div className= {`paid-btn ${rowData?.index ? "" : "childCampaignBtnstatus"}` }>
            {rowData.customerUploadStatus === "Completed" &&
            !(rowData?.campaignStatus === "Completed") ? (
              <div className="greenCircle"></div>
            ) : null}
            <div className="spanBtn">
              <span>
                {rowData.customerUploadStatus === "New"
                  ? "Pending"
                  : rowData.customerUploadStatus === "Pending"
                  ? "Pending"
                  : "Uploaded"}
              </span>
            </div>
            <p className="dateP">
              {rowData.customerUploadStatus === "New" ||
              rowData.customerUploadStatus === "Pending"
                ? ""
                : uDate
                ? moment(uDate).format("DD-MM-YYYY")
                : "-"}
            </p>
          </div>
        ) : (
          "----"
        );
        // <span>{rowData.customerUploadStatus}</span>;
      },
    },
    {
      title: "Data Mapping Status",
      render: (rowData) => {
        return rowData?.mappingStatus && !rowData?.isParent &&
          rowData?.mappingStatus !== "Pending" ? (
          <div
            className={`${rowData?.index ? "" : "childCampaignBtnstatus"} ${
              rowData?.mappingStatus === "Completed"
                ? "mappingBtnCompleted"
                : "mappingBtnFail"
            }`}
          >
            <span>{rowData?.mappingStatus}</span>
          </div>
        ) : (
          "----"
        );
      },
    },
    {
      title: "Campaign Status",
      render: (rowData) => {
        return rowData?.campaignStatus && !rowData?.isParent &&
          rowData?.campaignStatus !== "Pending" ? (
          <div
            className={`${rowData?.index ? "" : "childCampaignBtnstatus"} ${
              rowData?.campaignStatus === "Completed"
                ? "campaignStatusBtn"
                : rowData?.campaignStatus === "Paused"
                ? "campaignStatusBtnPa"
                : "campaignStatusBtnIN"
            }`}
          >
            <span>{rowData?.campaignStatus}</span>{" "}
            <span>
              <>
                <img
                  className={"imgI"}
                  src={
                    rowData?.campaignStatus === "Completed"
                      ? iCompleteIcon
                      : rowData?.campaignStatus === "Paused"
                      ? iPendingIcon
                      : iInprogressIcon
                  }
                  onClick={() => toshowProgressModal(rowData)}
                  data-tip
                  data-for="info"
                ></img>
                <ReactTooltip
                  id="info"
                  place="bottom"
                  effect="solid"
                  backgroundColor="#DDECFF"
                  textColor="#0174FF"
                  borderColor="#0174FF"
                  border="true"
                >
                  Info
                </ReactTooltip>
              </>
            </span>
          </div>
        ) : (
          "----"
        );
      },
    },
    {
      title: "Actions",
      render: (rowData) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img className={`img  ${rowData.customerUploadStatus=="Uploaded"?"":"hide-it"}`} src={campaignDownload} onClick={()=>{downloadCampaignData(rowData)}} style={{height:"20px",marginLeft:"5px",cursor:"pointer"}} /> */}
            {!rowData?.isArchived &&
            !(rowData?.campaignStatus === "Completed") && (rowData?.campaignStatus ) &&
            rowData.customerUploadStatus === "Completed" &&
            rowData?.mappingStatus === "Completed" &&  !rowData?.isParent &&
            accountType === "Internal" ? (
              rowData?.isPaused ? (
                <>
                  <img
                    className="img"
                    src={pauseIcon}
                    onClick={() => {
                      handlePlayCampaignTable(rowData?.id);
                    }}
                    data-tip
                    data-for="play"
                  ></img>
                  <ReactTooltip
                    id="play"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#DDECFF"
                    textColor="#0174FF"
                    borderColor="#0174FF"
                    border="true"
                  >
                    Play
                  </ReactTooltip>
                </>
              ) : (
                <>
                  <img
                    className="img"
                    src={playIcon}
                    onClick={() => {
                      handlePauseCampaignTable(rowData?.id);
                    }}
                    data-tip
                    data-for="pause"
                  ></img>
                  <ReactTooltip
                    id="pause"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#DDECFF"
                    textColor="#0174FF"
                    borderColor="#0174FF"
                    border="true"
                  >
                    Pause
                  </ReactTooltip>
                </>
              )
            ) : (
              ""
            )}

            {
            !rowData?.isArchived &&
              accountType === "Internal" &&
              rowData.customerUploadStatus === "Completed" &&
              rowData?.mappingStatus !== "Failed" && rowData?.mappingStatus && !rowData?.isParent &&
              // rowData?.campaignStatus &&
               (
                <>
                  <img
                    className="img"
                    src={callListIcon}
                    onClick={() => moveToCallingList(rowData)}
                    data-tip
                    data-for="registerTip"
                  ></img>

                  <ReactTooltip
                    id="registerTip"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#DDECFF"
                    textColor="#0174FF"
                    borderColor="#0174FF"
                    border="true"
                  >
                    calling List
                  </ReactTooltip>
                </>
              )}

            {!rowData?.isArchived &&
              accountType === "Internal" &&
              rowData?.index &&
              rowData.customerUploadStatus === "Completed" &&
              rowData?.mappingStatus === "Completed" &&
              !rowData?.isScheduled &&
               !rowData?.isCompleted && !rowData?.isParent &&
              (
                <>
                  <img
                    className="img"
                    src={schedulerIcon}
                    onClick={() => toShowScheduleModal(rowData)}
                    data-tip
                    data-for="scheduler"
                  ></img>
                  <ReactTooltip
                    id="scheduler"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#DDECFF"
                    textColor="#0174FF"
                    borderColor="#0174FF"
                    border="true"
                  >
                    scheduler
                  </ReactTooltip>
                </>
              )}

            {/* {!rowData?.isArchived &&
              rowData.customerUploadStatus === "Completed" &&
              rowData?.mappingStatus === "Completed" &&
              rowData?.campaignStatus && (
                <>
                  <img
                    className="img"
                    src={analystIcon}
                    onClick={() => moveToAnnalytics(rowData)}
                    data-tip
                    data-for="analytics"
                  ></img>
                  <ReactTooltip
                    id="analytics"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#DDECFF"
                    textColor="#0174FF"
                    borderColor="#0174FF"
                    border="true"
                  >
                    Analytics
                  </ReactTooltip>
                </>
              )} */}
            {!rowData?.isArchived && (rowData?.campaignStatus !== "Completed") && (rowData?.campaignStatus !== "In Progress") && !rowData?.isParent &&(
              <>
                <img
                  className={`img`}
                  src={editIcon}
                  onClick={() => {
                    moveToEdit(rowData);
                  }}
                  data-tip
                  data-for="edit"
                />
                <ReactTooltip
                  id="edit"
                  place="bottom"
                  effect="solid"
                  backgroundColor="#DDECFF"
                  textColor="#0174FF"
                  borderColor="#0174FF"
                  border="true"
                >
                  Edit
                </ReactTooltip>
              </>
            )}

            {rowData.customerUploadStatus !== "Completed" && !rowData?.isParent &&
            !rowData?.isArchived ? (
              <>
                <img
                  className="imgPic"
                  src={deleteIcon}
                  onClick={() => {
                    deleteCampaignData(rowData);
                  }}
                  data-tip
                  data-for="delete"
                />
                <ReactTooltip
                  id="delete"
                  place="bottom"
                  effect="solid"
                  backgroundColor="#DDECFF"
                  textColor="#0174FF"
                  borderColor="#0174FF"
                  border="true"
                >
                  Delete
                </ReactTooltip>
              </>
            ) : null}
            {rowData?.index && rowData.customerUploadStatus === "Completed" && (rowData?.campaignStatus !== "In Progress") && !rowData?.isParent && ( 
              <>
                <img
                  className="imgPic"
                  src={nonArchiveIcon}
                  onClick={() =>
                    handleArchieveTrue(rowData?.id, rowData?.isArchived)
                  }
                  data-tip
                  data-for="archieved"
                ></img>
                <ReactTooltip
                  id="archieved"
                  place="bottom"
                  effect="solid"
                  backgroundColor="#DDECFF"
                  textColor="#0174FF"
                  borderColor="#0174FF"
                  border="true"
                >
                  {rowData?.isArchived ? "Unarchive" : "Archive"}
                </ReactTooltip>
              </>
            )}
            {/* { accountType != "External" && 
      <img className='img' src={connectIcon} onClick={()=>{showManualScreen(rowData)}}/> } */}
          </div>
        );
      },
    },
  ];
};
