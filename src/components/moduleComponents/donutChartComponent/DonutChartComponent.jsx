import React, { useEffect, useState } from "react";
import "./DonutChartComponent.css";
import DonutChart from "../charts/DonutChart";
// import { donutChartIcon } from "../../../theme/assets/analyticsSvg";
import { useDispatch, useSelector } from "react-redux";
import PravidIcons from "../../generic/icon/PravidIcons";
// import Icon from "../../generic/icon/Icons"
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
// import { is } from 'date-fns/locale';
const DonutChartComponent = (props) => {
  const [nodataFound, setNoDataFound] = useState(true);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  let donutChartDetails =
    props?.chartDetails && Object.values(props?.chartDetails?.keys).length > 0
      ? Object.values(
          props?.chartDetails.keys.sort((a, b) => {
            return a.position - b.position;
          })
        )
      : [];

  let referenceKey = props?.chartDetails?.refenceKeyForData;

  useEffect(() => {
    let temp =
      props.data &&
      props.data[referenceKey] &&
      Object.values(props.data[referenceKey])?.map((each) => {
        if (each > 0) {
          setNoDataFound(false);
        }
      });
  }, []);

  return (
    <>
      {!nodataFound ? (
        <div className="donut_chart_wrap">
          <DonutChart
            donutChart={donutChartDetails}
            chartDetails={props.chartDetails}
            data={props.data[referenceKey]}
            chartTitle={props.chartTitle}
          />
          <div className="donutChartLabelsDiv">
            {donutChartDetails?.map((each, i) => {
              return (
                <div
                  key={i}
                  className="donutChatTopDiv"
                  style={{
                    width: "100%",
                    height: "35px",
                  }}
                >
                  <div className="icons">
                    {/* <img src={donutChartIcon} /> */}
                    <PravidIcons
                      activeIcon={each.icon}
                      // extraClass={"iconImage"}
                      // donutIcon
                    />
                  </div>
                  <div className="name" style={{ textTransform: "capitalize" }}>
                    {each.name}
                  </div>
                  <div className="data">
                    {props.data && props.data[referenceKey]
                      ? props.data[referenceKey][each?.referenceKeyName]
                      : 0}
                    {/* {props.data && props.data[referenceKey]
                    ? props.data[referenceKey][
                        Object.keys(props.data[referenceKey])[i]
                      ]
                    : 0} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            // padding: props.chartDetails?.expand?.isExpand
            //   ? "30% 20% 20% 20%"
            //   : "30% 20% 20% 20%",
            width: "60%",
            margin: "auto",
          }}
          // style={{
          //   padding: props.chartDetails?.expand?.isExpand
          //     ? "25% 50%"
          //     : "30% 40%",
          // }}
        >
          {/* <p style={{ width: "500px" }}>No data found</p> */}
          <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
        </div>
        //   <div
        //   className="noData"
        //   style={{
        //     minWidth: "550px",
        //     minHeight: "412px",
        //     height: "100%",
        //     position: "relative",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     margin: "-15px",
        //   }}
        // >
        //   <p>No data found</p>
        // </div>
      )}
    </>
  );
};

export default DonutChartComponent;
