import React, { useEffect } from "react";
import { useState } from "react";
import LoaderSaarthi from "../../generic/loader/Loader";
import NoDatamodel from "../noDatamodel/NoDatamodel";
import HeadCellComponent from "./HeadCellComponent";
import RowComponent from "./RowComponent";
import { noTranscriptDataIcon } from "../../../theme/assets/svg";
import "./TablePravid.scss";

type dataType = Array<{ [key: string]: string | number }>;

interface props {
  data: dataType;
  columns: Array<any>;
  pageNo: number;
  isLoading?: boolean;
  hoverable?: boolean;
  stripedColor?: string;
  tableEndDisplay?: boolean; // to display rectangle line at end of table
  extraClassTableWrapper?: string;
  extraClassTable?: string;
  extraClassTableHead?: string;
  extraClassTableBody?: string;
}

export default function TablePravid(props: props) {
  const { columns, isLoading, pageNo } = props;
  const [tableData, setTableData] = useState<dataType>(props.data);

  useEffect(() => {
    props.data
      ? setTableData(props.data)
      : setTableData([] as unknown as dataType);
  }, [props.data]);
  // console.log(columns);

  return (
    <div className={`wrapper__table-pravid ${props.extraClassTableWrapper}`}>
      <table className={`table-pravid ${props.extraClassTable}`}>
        <thead className={`table-pravid__head ${props.extraClassTableHead}`}>
          <tr className="head__row">
            {columns.map((column, index) => (
              <HeadCellComponent key={index} columnTitle={column.title} />
            ))}
          </tr>
        </thead>
        {!isLoading && (
          <tbody className={`table-pravid__body ${props.extraClassTableBody}`}>
            {tableData?.map((rowData, index) => (
              <RowComponent
                key={index}
                columns={columns}
                rowData={rowData}
                index={index}
                pageNo={pageNo}
              />
            ))}
          </tbody>
        )}
      </table>
      {props.tableEndDisplay && tableData?.length > 0 && !isLoading && (
        <div className="table-end"></div>
      )}
      {isLoading && (
        <div className="loader">
          <LoaderSaarthi />
        </div>
      )}
      {!isLoading && tableData?.length === Number(0) && (
        <div className="table__no__data">
          <NoDatamodel
            message="No Data to show"
            srcImg={noTranscriptDataIcon}
            extraCss={{ message: "message" }}
          ></NoDatamodel>
        </div>
      )}
    </div>
  );
}
