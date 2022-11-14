import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
// import { viewMore, viewLess } from "../../../theme/assets/analyticsSvg";
// import { useState } from "react";
import {
  getExpandedChart,
  getViewMore,
} from "../../../redux/analytics/actions";
import PravidIcons from "../../generic/icon/PravidIcons";

const Table = (props) => {
  const isExpand = useSelector((store) => store?.analyticsReducer?.isExpand);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const isViewMore = useSelector(
    (store) => store?.analyticsReducer?.isViewMore
  );
  const viewMoreChart = useSelector(
    (store) => store?.analyticsReducer?.viewMoreChart
  );

  const dispatch = useDispatch();
  const fetchAllData = (title) => {
    if (title) {
      dispatch(getExpandedChart(!isExpand, title));
      dispatch(getViewMore(!isViewMore, title));
    }
  };

  var bd_data =
    expandedChart && expandedChart.includes(props.chartTitle)
      ? props.bodyData
      : props.bodyData?.length > 5
      ? props.bodyData?.slice(0, 5)
      : props.bodyData;
  //   console.log(bd_data,"llll")
  return (
    <>
      <div className="TableContainer">
        <div className="Header">
          <div className="col1Head" style={{ textTransform: "capitalize" }}>
            {props.heading[0]}
          </div>
          <div className="col2Head" style={{ textTransform: "capitalize" }}>
            {props.heading[1]}
          </div>
        </div>
        <div className="lftvl"></div>
        <div className="TableContent">
          {/* Row */}
          {bd_data?.map((each, key) => {
            return (
              <div className="row" key={key}>
                <div className="col1Content">
                  <div style={{ display: "inline-flex" }}>
                    <span>{key + 1}. </span>
                    <div
                      style={{
                        textAlign: "left",
                        paddingLeft: "3px",
                        textTransform: "capitalize",
                        maxWidth:"120px",
                        wordWrap:"break-word",
                      }}
                    >
                      {each[props.value1]}
                    </div>
                  </div>
                  <div>
                    {expandedChart &&
                    expandedChart.includes(props.chartTitle) ? (
                      <svg
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          r="4.95317"
                          transform="matrix(1 0 0 -1 5.18949 4.95406)"
                          fill={each.color}
                        />
                      </svg>
                    ) : key <= 4 ? (
                      <svg
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          r="4.95317"
                          transform="matrix(1 0 0 -1 5.18949 4.95406)"
                          fill={each.color}
                        />
                      </svg>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </div>
                <div className="col2Content">{each[props.value2]}</div>
              </div>
            );
          })}
        </div>
        {props.bodyData?.length > 5 ? (
          <div className="row-end">
            <div className="col1Content-box">
              {expandedChart && expandedChart.includes(props.chartTitle) ? (
                <div>
                  <button
                    className="box-btn"
                    onClick={() => fetchAllData(props.chartTitle)}
                  >
                    View Less
                    {/* <img src={viewLess} /> */}
                    <PravidIcons activeIcon={"viewLess"} />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="box-btn"
                    onClick={() => fetchAllData(props.chartTitle)}
                  >
                    View More
                    {/* <img src={viewMore} /> */}
                    <PravidIcons activeIcon={"viewMore"} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Table;
