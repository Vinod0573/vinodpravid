import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "./colors";
import moment from "moment";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
function SimpleBarChart(props) {
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const isSort = useSelector((store) => store?.analyticsReducer?.isSort);

  const sortedChart = useSelector(
    (store) => store?.analyticsReducer?.sortedChart
  );

  let key = props.chartDetails?.legendData[0];
  let barWidth = parseInt(props.chartDetails?.chartStyle?.width) - 100;
  let value1 = props.chartDetails?.keys[0].referenceKeyName;
  let value2 = props.chartDetails?.keys[1].referenceKeyName;
  let refenceKeyForData = props.chartDetails?.refenceKeyForData;
  let perValue =
    props.data["card_details"] &&
    props.data["card_details"]["total_connected_calls"];
  let RespondentPercentage = "RespondentPercentage";

  useEffect(() => {
    if (props.chartDetails && props.data) {
      let temp = props?.data && props?.data[refenceKeyForData];
      let tempArr = year;
      // let tempVal = temp.sort((a, b) => (a[value1] > b[value1]) ? 1 : ((b[value1] > a[value1]) ? -1 : 0));
      let finalData = temp?.map((each, i) => {
        var getDate = moment(each[value1], "DD/MM/YYYY").format("MM/DD/YYYY");
        var dates = moment(getDate).format("DD MMM").toString();
        let yrData = moment(getDate).format("YYYY");
        tempArr.push(yrData);
        setYear(tempArr);
        return {
          name:
            props.chartDetails?.keys[0]?.name === "Date" ? dates : each[value1],
          [key]: each[value2],
          [RespondentPercentage]: `${each[value2]}(${(
            (each[value2] / perValue) *
            100
          ).toFixed(0)}%)`,
          amt:
            props.chartDetails?.keys[0]?.name === "No. of Attempt"
              ? `${((each[value2] / perValue) * 100).toFixed(0)}%`
              : 0,
        };
      });
      setData(finalData);
    }
  }, [props.chartDetails, props.data]);

  const setSortedData = (data) => {
    let tempArr = year;
    let finalData = data?.map((each, i) => {
      var getDate = moment(each[value1], "DD/MM/YYYY").format("MM/DD/YYYY");
      var dates = moment(getDate).format("DD MMM").toString();
      let yrData = moment(getDate).format("YYYY");
      tempArr.push(yrData);
      setYear(tempArr);
      return {
        name:
          props.chartDetails?.keys[0]?.name === "Date" ? dates : each[value1],
        [key]: each[value2],
        [RespondentPercentage]: `${each[value2]}(${(
          (each[value2] / perValue) *
          100
        ).toFixed(0)}%)`,
        amt:
          props.chartDetails?.keys[0]?.name === "No. of Attempt"
            ? `${((each[value2] / perValue) * 100).toFixed(0)}%`
            : 0,
      };
    });
    setData(finalData);
  };

  useEffect(() => {
    if (isSort && props.chartTitle === sortedChart) {
      let tempdata = props?.data && props?.data[refenceKeyForData];
      props.chartDetails?.keys[0]?.name === "Date"
        ? tempdata?.sort((a, b) =>
            new Date(moment(a[value1], "DD/MM/YYYY").format("YYYY/MM/DD")) <
            new Date(moment(b[value1], "DD/MM/YYYY").format("YYYY/MM/DD"))
              ? 1
              : new Date(moment(b[value1], "DD/MM/YYYY").format("YYYY/MM/DD")) <
                new Date(moment(a[value1], "DD/MM/YYYY").format("YYYY/MM/DD"))
              ? -1
              : 0
          )
        : tempdata?.sort((a, b) =>
            a[value1] < b[value1] ? 1 : b[value1] < a[value1] ? -1 : 0
          );

      setSortedData(tempdata);
    } else {
      let tempdata = props?.data && props?.data[refenceKeyForData];
      props.chartDetails?.keys[0]?.name === "Date"
        ? tempdata?.sort((a, b) =>
            new Date(moment(a[value1], "DD/MM/YYYY").format("YYYY/MM/DD")) >
            new Date(moment(b[value1], "DD/MM/YYYY").format("YYYY/MM/DD"))
              ? 1
              : new Date(moment(b[value1], "DD/MM/YYYY").format("YYYY/MM/DD")) >
                new Date(moment(a[value1], "DD/MM/YYYY").format("YYYY/MM/DD"))
              ? -1
              : 0
          )
        : tempdata?.sort((a, b) =>
            a[value1] > b[value1] ? 1 : b[value1] > a[value1] ? -1 : 0
          );

      setSortedData(tempdata);
    }
  }, [isSort, props.data[refenceKeyForData]]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "#ffffff",
            height: "100px",
            width: "250px",
            textAlign: "center",
            paddingTop: "20px",
            // fontSize: "15px",
          }}
        >
          <p className="label">{`${props.chartDetails?.keys[0]?.name}: ${payload[0]?.payload?.name}`}</p>
          <p className="label">{`${payload[0].name}: ${payload[0]?.value}`}</p>
          {props.chartDetails?.keys[0]?.name === "No. of Attempt" ? (
            <p className="label">{`${props.chartDetails?.legendData[2]}: ${payload[0]?.payload?.amt}`}</p>
          ) : (
            ""
          )}
        </div>
      );
    }

    return null;
  };

  return (
    // props.isLoading === true && props.isselectedTab !== "payment" && props.isselectedTab !== "customer" ?
    //   <Loading />
    //   :
    data?.length > 0 ? (
      <div
        style={{
          minWidth: `${data.length * 80}px`,
          height: `${
            expandedChart && expandedChart.includes(props.chartTitle)
              ? "462px"
              : "314px"
          }`,
          width: `${
            expandedChart && expandedChart.includes(props.chartTitle)
              ? "100%"
              : `${barWidth}px`
          }`,
        }}
      >
        <ResponsiveContainer height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 30,
              left: 30,
            }}
            barCategoryGap={10}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" style={{ fontSize: "15px" }}>
              <Label
                // angle={200}
                position="insideBottomMiddle"
                style={{
                  textAnchor: "middle",
                  fill: "#000000",
                  padding: "20px",
                  margin: "20px",
                }}
                dy={30}
                offset={-50}
              >
                {props.chartDetails?.keys[0]?.name}
              </Label>
              {/* } */}
            </XAxis>
            <YAxis interval={1}>
              <Label
                angle={270}
                offset={40}
                dx={30}
                position="left"
                style={{ textAnchor: "middle", fill: "#000000" }}
              >
                {props.chartDetails?.keys[1]?.name}
              </Label>
              {/* } */}
            </YAxis>
            {/* <Tooltip
              formatter={function (value, name, props, index) {
                return ` ${value}`;
              }}
              labelFormatter={function (value) {
                return `${props.chartDetails?.keys[0]?.name}: ${value}`;
              }}
            /> */}
            <Tooltip content={<CustomTooltip />} />
            {/* } */}
            {props.chartDetails?.keys[0]?.name === "Date" ? (
              <Legend
                layout="vertical"
                verticalAlign="top"
                align="right"
                payload={[...new Set(year)].map((each, index) => {
                  return {
                    id: each,
                    type: "square",
                    value: each,
                    color: Colors[index],
                  };
                })}
              />
            ) : (
              ""
            )}

            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar
              isAnimationActive={false}
              dataKey={key}
              style={{ width: "100px" }}
              barSize={35}
            >
              <LabelList
                dataKey={
                  props.chartDetails?.keys[0]?.name === "No. of Attempt"
                    ? RespondentPercentage
                    : key
                }
                position="top"
                style={{ fontSize: "10px", fontWeight: "500" }}
              />
              {props.chartDetails?.keys[0]?.name === "Date"
                ? props?.data &&
                  props?.data[refenceKeyForData]?.map((entry, index) => {
                    var getDate = moment(entry[value1], "DD/MM/YYYY").format(
                      "MM/DD/YYYY"
                    );
                    var yrData = moment(getDate).format("YYYY");
                    let dat = [...new Set(year)].indexOf(yrData);

                    return <Cell key={`cell-${index}`} fill={Colors[dat]} />;
                  })
                : data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Colors[index]} />
                  ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div
        className="no-data"
        style={{
          height: `${
            expandedChart && expandedChart.includes(props.chartTitle)
              ? "455px"
              : "310px"
          }`,
        }}
      >
        {props.chartDetails?.keys[0]?.name === "Date" ? (
          <NoDatamodel
            srcImg={noPhoneDataIcon}
            // message="No PTP given for selected date range"
          ></NoDatamodel>
        ) : (
          <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
        )}
      </div>
    )
  );
}

export default SimpleBarChart;
