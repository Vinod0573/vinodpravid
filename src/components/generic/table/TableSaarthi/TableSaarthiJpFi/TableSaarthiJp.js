import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TableSaarthiJp.css";
import LoaderSaarthi from "../../../loader/Loader";

const TableByJp = (
  {
    cols,
    data,
    idOutside,
    bordered,
    hoverable,
    striped,
    isDark,
    pageNo,
    isLoading,
    extraTableClass,
    extraTableTheadClass,
    theadTrExtraStyle,
    trThExtraStyle,
    tbodytrExtraStyle,
    tbodytrtdExtraStyle,
    extraStyleTableDiv,
    noDataUploaded,
    hideBorderArray
  },
  props
) => {
  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData((prev) => data);
  }, [data]);
 
  return (
    <div className={`table-responsive ${extraStyleTableDiv ? extraStyleTableDiv : ""}`}>
      <table
        className={`table ${bordered ? "table-bordered" : "table-borderless"} ${
          hoverable && "table-hover"
        } ${striped && "table-striped"} ${isDark && "table-dark"}
        ${extraTableClass ? extraTableClass : ""} 
        `}
        id={`${idOutside ? idOutside : ""}`}
      >
        <thead
          className={`saarthiTableThead ${
            extraTableTheadClass ? extraTableTheadClass : ""
          }`}
        >
          <tr className={`${theadTrExtraStyle ? theadTrExtraStyle : ""}`}>
            {cols.map((headerItem, index) => (
              <th
                className={`${trThExtraStyle ? trThExtraStyle : ""}`}
                key={index}
              >
                {headerItem.title}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            {tableData?.map((item, index) => (
              <tr
                key={index}
                className={`${tbodytrExtraStyle ? tbodytrExtraStyle : ""} ${ hideBorderArray?.includes(item?.id) || item?.isCampaign || item?.isChildCampaign ?"borderforOmni" : "borderforomnitop"} 
                ${ tableData?.length-1 === index ? "borderforomniLastcampaign" : null}`}
              >
                {cols.map((col, key) => (
                  <td
                    className={`${
                      tbodytrtdExtraStyle ? tbodytrtdExtraStyle : ""
                    }`}
                    key={key}
                  >
                    {col.render(item, index, pageNo)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <>
            <div style={{ display: "none" }}>
              <LoaderSaarthi />
            </div>
          </>
        )}
      </table>
      {isLoading && tableData?.length === 0 && (
        // props.imgNoData ?
        <div style={{ textAlign: "center", position: "relative", top: "40%" }}>
         {noDataUploaded ? noDataUploaded : "No Data Found"} 
        </div>
        // : <img src= {props.imgNoData} alt="img"></img>
      )}
      {!isLoading && (
        <div style={{ marginLeft: "Auto", marginRight: "auto" }}>
          <LoaderSaarthi />
        </div>
      )}
    </div>
  );
};

TableByJp.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  striped: PropTypes.bool,
  isDark: PropTypes.bool,
};

TableByJp.defaultProps = {
  bordered: true,
  hoverable: false,
  striped: false,
  isDark: false,
};

export default TableByJp;
