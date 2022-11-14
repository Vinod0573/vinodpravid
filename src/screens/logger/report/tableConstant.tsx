import React from "react";
import {
  sortingDescIcon,
  summaryIcon,
  playIcon,
  linkIcon,
  replayIcon,
  noSortingIcon,
  sortingAscIcon,
} from "../../../theme/assets/genericSvg";
import { columnInterface } from "./type";
import { getValueByReferenceKey } from "../../../utils/getValueByReferenceKey";
import { pauseIcon } from "../../../theme/assets/svg";
interface argInterface {
  limit: number;
  columnSchema: Array<columnInterface>;
  handleAudioClick: (
    e: React.MouseEvent<HTMLElement>,
    url: string,
    tab: string
  ) => void;
  handleSummaryClick: any;
  handleSortClick: any;
  tableSortingColumn: Record<string, "desc" | "asc">;
  currentAudioState: {
    currentTab: string | undefined;
    isPlaying: boolean;
  };
}

export const tableConstant = ({
  limit,
  columnSchema,
  handleAudioClick,
  handleSummaryClick,
  handleSortClick,
  currentAudioState,
  tableSortingColumn,
}: argInterface) => {
  const sortingColumn = Object.keys(tableSortingColumn)?.[0];
  const columnsToShow: Array<any> = [];
  let totalColumnData = [...columnSchema];

  totalColumnData = totalColumnData.filter((item) => item.isActive);
  totalColumnData = totalColumnData.sort((a, b) => a.position - b.position);

  totalColumnData.forEach((item, currentRow) => {
    if (item.originalName === "Sr. No") {
      const obj = {
        title: item.currentName,
        render: (rowData: any, key: string, index: number, pageNo: number) => (
          <span>{(pageNo - 1) * limit + index + 1}</span>
        ),
      };
      columnsToShow.push(obj);
    } else if (item.originalName === "Call Summary" || item.originalName === "Chat Summary") {
      const obj = {
        title: item.currentName,
        key: item.referancKeyName,
        render: (rowData: any, key: string) => (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ cursor: "pointer" }}
              src={summaryIcon}
              alt="Summary Icon"
              onClick={() =>
                handleSummaryClick(getValueByReferenceKey(rowData, key))
              }
            />
          </span>
        ),
      };
      columnsToShow.push(obj);
    } else if (item.originalName === "Audio") {
      const obj = {
        title: item.currentName,
        key: item.referancKeyName,
        render: (rowData: any, key: string, index: number) => (
          <span
            data-row={index.toString()}
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              handleAudioClick(
                e,
                getValueByReferenceKey(rowData, key),
                index.toString()
              )
            }
          >
            {currentAudioState.currentTab === index.toString() ? (
              currentAudioState.isPlaying === true ? (
                <img
                  src={pauseIcon}
                  style={{ width: "11px" }}
                  alt="play icon"
                  data-type="play"
                />
              ) : (
                <img
                  src={playIcon}
                  style={{ width: "11px" }}
                  alt="play icon"
                  data-type="play"
                />
              )
            ) : (
              <img
                src={playIcon}
                style={{ width: "11px" }}
                alt="play icon"
                data-type="play"
              />
            )}

            <img
              src={replayIcon}
              style={{ width: "16px" }}
              alt="replay icon"
              data-type="replay"
            />
            <img src={linkIcon} alt="link icon" data-type="copy-link" />
          </span>
        ),
      };
      columnsToShow.push(obj);
    } else {
      const obj = {
        title: (
          <span>
            {item.isSortBtn && (
              <img
                src={
                  sortingColumn === item.referancKeyName
                    ? tableSortingColumn?.[sortingColumn] === "asc"
                      ? sortingAscIcon
                      : sortingDescIcon
                    : noSortingIcon
                }
                style={{ marginRight: "8px", cursor: "pointer" }}
                onClick={handleSortClick}
                data-reference-key={item.referancKeyName}
                alt="sorting Decreasing Icon"
              />
            )}
            <span>{item.currentName}</span>
          </span>
        ),
        key: item.referancKeyName,
        render: (rowData: any, key: string) => (
          <span>{getValueByReferenceKey(rowData, key)}</span>
        ),
      };
      columnsToShow.push(obj);
    }
  });

  // return [
  //   {
  //     title: "Sr. No",
  //     render: (rowData: any, index: number, pageNo: number) => (
  //       <span>{(pageNo - 1) * limit + index + 1}</span>
  //     ),
  //   },
  //   {
  //     title: "Date",
  //     render: (rowData: any) => (
  //       <span>
  //         {Moment(rowData.information.lastConnected).format("DD-MM-YYYY")}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: (
  //       <span>
  //         <img
  //           src={sortingDescIcon}
  //           style={{ marginRight: "8px" }}
  //           alt="sorting Decreasing Icon"
  //         />
  //         <span>Contact No.</span>
  //       </span>
  //     ),
  //     render: (rowData: any) => <span>{rowData.information.phone_number}</span>,
  //   },
  //   {
  //     title: "Flow",
  //     render: (rowData: any) => <span>{rowData.information.flowType}</span>,
  //   },
  //   {
  //     title: "Language",
  //     render: (rowData: any) => <span>{rowData.information.language}</span>,
  //   },
  //   {
  //     title: "Loan ID",
  //     render: (rowData: any) => <span>{rowData.information.loan_id}</span>,
  //   },
  //   {
  //     title: "Dispositon",
  //     render: (rowData: any) => <span>{rowData.information.disposition}</span>,
  //   },
  //   {
  //     title: "Language",
  //     render: (rowData: any) => <span>{rowData.information.language}</span>,
  //   },
  //   {
  //     title: "Delay Reason",
  //     render: (rowData: any) => <span>{rowData.information.reason}</span>,
  //   },
  //   {
  //     title: "Atempt",
  //     render: (rowData: any) => (
  //       <span>{rowData.information.attempt_count}</span>
  //     ),
  //   },
  //   {
  //     title: "Audio",
  //     render: (rowData: any) => (
  //       <span>
  //         <img src={playIcon} style={{ width: "11px" }} alt="play icon" />
  //         <img src={replayIcon} style={{ width: "16px" }} alt="replay icon" />
  //         <img src={linkIcon} alt="link icon" />
  //       </span>
  //     ),
  //   },
  //   {
  //     title: "TalkTime",
  //     render: (rowData: any) => (
  //       <span>{rowData.information.talk_time / 1000}</span>
  //     ),
  //   },
  //   {
  //     title: "Summary",
  //     render: (rowData: any) => (
  //       <span>
  //         <img src={summaryIcon} alt="Summary Icon" />
  //       </span>
  //     ),
  //   },
  // ];
  // console.log("columnSchema", columnsToShow);
  return columnsToShow;
};
