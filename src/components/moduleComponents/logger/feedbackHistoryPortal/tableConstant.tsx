import React from "react";
import Moment from "moment";
import {
  sortingDescIcon,
  sortingAscIcon,
  noSortingIcon,
} from "../../../../theme/assets/genericSvg";

interface argInterface {
  limit: number;
  handleSortClick: any;
  title: string;
  tableSortingColumn: { referenceKey: string; direction: string };
  accountType: string;
}

export const tableConstant = ({
  limit,
  handleSortClick,
  title,
  tableSortingColumn,
  accountType,
}: argInterface) => {
  let column = [
    {
      title: "Sr. No.",
      render: (rowData: any, key: string, index: number, pageNo: number) => {
        return <span>{(pageNo - 1) * limit + index + 1}</span>;
      },
    },
    {
      title: (
        <div>
          <p>Date</p>
        </div>
      ),
      render: (rowData: any) => {
        return (
          <div>
            <p>{Moment.utc(rowData?.date).format("DD-MM-YY") || "-"}</p>
          </div>
        );
      },
    },
    {
      title: (
        <span>
          {
            <img
              src={
                tableSortingColumn.referenceKey === "phoneNo"
                  ? tableSortingColumn.direction === "asc"
                    ? sortingAscIcon
                    : sortingDescIcon
                  : noSortingIcon
              }
              style={{ marginRight: "8px", cursor: "pointer" }}
              onClick={handleSortClick}
              data-reference-key="phoneNo"
              alt="sorting Decreasing Icon"
            />
          }
          <span>{"Contact No."}</span>
        </span>
      ),
      render: (rowData: any) => {
        return <span>{rowData?.phoneNo || "-"}</span>;
      },
    },
    {
      title: accountType === "Internal" ? "Type" : "Client Name",
      render: (rowData: any) => {
        return (
          <span>
            {accountType === "Internal"
              ? rowData?.type
                ? rowData?.type
                : "-"
              : rowData?.accountName}
          </span>
        );
      },
    },
    {
      title: "Language",
      render: (rowData: any) => {
        return <span>{rowData?.language || "-"}</span>;
      },
    },

    {
      title: "Flow Type",
      render: (rowData: any) => {
        return <span>{rowData?.flow || "-"}</span>;
      },
    },
    {
      title: "Session Id",
      render: (rowData: any) => {
        return <span>{rowData?.sessionId || "-"}</span>;
      },
    },
    {
      title:
        title.toString().toLowerCase() === "campaign analyst"
          ? "Issue"
          : "Feedback",
      render: (rowData: any) => {
        if (title.toString().toLowerCase() === "campaign analyst") {
          return (
            <div>
              {Object.keys(rowData?.issue).length > 0 &&
                Object.keys(rowData?.issue)?.map((item, i) => {
                  return (
                    <>
                      <div key={i}>
                        {rowData?.issue[item] &&
                          rowData?.issue[item]?.map((each: any) => {
                            return (
                              <>
                                <p
                                  key={i + i + 1}
                                  style={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    color: "#0174FF",
                                    background: "#ddebff",
                                    borderRadius: "3px",
                                    padding: "3px 12px",
                                    marginBottom: "5px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "fit-content",
                                    textAlign: "center",
                                  }}
                                >
                                  {item + " - " + each}
                                </p>
                              </>
                            );
                          })}
                      </div>
                    </>
                  );
                })}
            </div>
          );
        } else {
          return <span>{rowData?.feedback || "-"}</span>;
        }
      },
    },
  ];
  // for report issue
  if (title.toString().toLowerCase() === "campaign analyst") {
    const status = {
      title: "Status",
      render: (rowData: any) => {
        return <span>{rowData?.status}</span>;
      },
    };

    const remark = {
      title: "Remark",
      render: (rowData: any) => {
        return <span>{rowData?.remark}</span>;
      },
    };
    column = [...column.slice(0, 3), ...column.slice(3), status, remark];
  }
  return column;
};

export const tableConstantForIssue = {};
