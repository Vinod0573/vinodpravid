import React, { PureComponent, useState, useEffect } from "react";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function BarLineChart(props) {
  const [data, setData] = useState([]);
  const [Month, setMonth] = useState([]);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const isSort = useSelector((store) => store?.analyticsReducer?.isSort);

  const sortedChart = useSelector(
    (store) => store?.analyticsReducer?.sortedChart
  );

  let key = props.chartDetails?.kpiCustomizationName;
  let barWidth = parseInt(props.chartDetails?.chartStyle?.width) - 100;
  let value1 = props.chartDetails?.keys[0].referenceKeyName;
  let value2 = props.chartDetails?.keys[1].referenceKeyName;
  let refenceKeyForData = props.chartDetails?.refenceKeyForData;

  useEffect(() => {
    if (props.chartDetails && props.data) {
      let temp = Month;
      let finalData = props?.data[refenceKeyForData]?.map((each, i) => {
        var getDate = new Date(each[value1]);
        var dates = moment(getDate).format("DD MMM").toString();
        var Months = moment(getDate).format("YYYY").toString();

        temp.push(Months);
        return {
          name: dates,
          [key]: each[value2],
          amt: each[value1],
        };
      });
      setData(finalData);
      setMonth(temp);
    }
  }, [props.chartDetails, props.data[refenceKeyForData]]);

  let setSortedData = (data) => {
    let temp = Month;
    let finalData = data?.map((each, i) => {
      var getDate = new Date(each[value1]);
      var dates = moment(getDate).format("DD MMM").toString();
      var Months = moment(getDate).format("YYYY").toString();
      temp.push(Months);
      return {
        name: dates,
        [key]: each[value2],
        amt: each[value1],
      };
    });
    setData(finalData);
  };

  useEffect(() => {
    if (isSort && props.chartTitle === sortedChart) {
      let tempdata = props?.data[refenceKeyForData];
      tempdata?.sort((a, b) => {
        return a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0;
      });
      setSortedData(tempdata);
    } else {
      let tempdata = props?.data[refenceKeyForData];
      tempdata?.sort((a, b) =>
        a[value2] > b[value2] ? 1 : b[value2] > a[value2] ? -1 : 0
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
            height: "80px",
            width: "250px",
            textAlign: "center",
            paddingTop: "20px",
            // fontSize: "15px",
          }}
        >
          <p className="label">{`${props.chartDetails?.keys[0]?.name}: ${payload[0]?.payload?.name}`}</p>
          <p className="label">{`${payload[0].name}: ${payload[0]?.value}`}</p>
        </div>
      );
    }

    return null;
  };

  // var monthlyData = Month.filter(function (item, pos) {
  //   return Month.indexOf(item) == pos;
  // })
  return data?.length > 0 ? (
    <div
      className="sd-chart"
      style={{
        minWidth: `${data.length * 140}px`,
        height: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "512px"
            : "314px"
        }`,
        width: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "100%"
            : `${barWidth}px`
        }`,
        position: "relative",
      }}
    >
      <ResponsiveContainer height="100%">
        {}
        <ComposedChart
          width={500}
          height={700}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: 30,
          }}
          barCategoryGap={10}
        >
          {/* <CartesianGrid vertical={false} /> */}
          {/* <XAxis dataKey="name" scale="band" />
         <YAxis /> */}
          {/* <Legend
              layout="vertical"
              verticalAlign='top'
              align='right'
              payload={
                [...new Set(Month)].map((each) => {
                  return {
                    id: each,
                    type: "square",
                    value: each,
                    color: each == "2021" ? "#6041E8" : "#9ADBF9"
                  }
                })

              }
            // wrapperStyle={{ margin: "-10px", top: "0", left: "25px" }}
            /> */}
          <XAxis
            dataKey="name"
            style={{
              fontSize: props.chartDetails?.expand?.isExpand ? "17px" : "12px",
              fontWeight: "bold",
            }}
          >
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
            >
              {props.chartDetails?.keys[0].name}
            </Label>
            {/* } */}
          </XAxis>
          <YAxis>
            <Label
              angle={270}
              offset={10}
              position="left"
              style={{ textAnchor: "middle", fill: "#000000", padding: "15px" }}
            >
              {props.chartDetails?.keys[1].name}
            </Label>
            {/* } */}
          </YAxis>

          <Tooltip content={CustomTooltip} />

          {/* <Legend  verticalAlign='top' align='right'/> */}

          <Bar isAnimationActive={false} dataKey={key} barSize={35}>
            <LabelList
              dataKey={key}
              position="top"
              dy={-4}
              style={{
                fontSize: "10px",
                fontWeight: "500",
                fill: "rgb(0, 102, 255)",
                padding: "20px",
              }}
            />

            {data?.map((entry, index) => {
              var getDate = new Date(entry.amt);
              var Months = moment(getDate).format("YYYY").toString();

              // console.log(monthlyData)
              return (
                <>
                  {props.chartDetails?.legendColor?.map((each) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        // fill={fillcolour}
                        fill={
                          Months === `${each.year}`
                            ? `${each.fillColor}`
                            : "#9ADBF9"
                        }
                      />
                    );
                  })}
                </>
              );
            })}
          </Bar>
          <Line
            type="monotonex"
            dot={{ strokeWidth: 7 }}
            activeDot={{ strokeWidth: 1 }}
            dataKey={key}
            stroke="#0066FF"
            fill="#0066FF"
            name="no"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div
      className="no-data"
      style={{
        height: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "510px"
            : "310px"
        }`,
      }}
    >
      <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
    </div>
  );
}

export default BarLineChart;
