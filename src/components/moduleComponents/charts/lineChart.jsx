import React, { PureComponent, useState, useEffect } from "react";
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
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
function LineChart(props) {
  const [data, setData] = useState([]);
  const [timeSlotData, setTimeSlotData] = useState([]);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const isSort = useSelector((store) => store?.analyticsReducer?.isSort);

  const sortedChart = useSelector(
    (store) => store?.analyticsReducer?.sortedChart
  );

  let key = props.chartDetails?.kpiCustomizationName;
  let value1 = props.chartDetails?.keys[0].referenceKeyName;
  let value2 = props.chartDetails?.keys[1].referenceKeyName;
  let refenceKeyForData = props.chartDetails?.refenceKeyForData;
  let barWidth = parseInt(props.chartDetails?.chartStyle?.width) - 150;

  useEffect(() => {
    if (props.data) {
      var sortedTimeList = [];
      var tempTimesList = [];
      let tempData = props?.data[refenceKeyForData];
      tempData?.map(function (each, index) {
        var tempSingleTimeArr = each[value1].split("-");
        tempTimesList.push({
          time: moment(tempSingleTimeArr[0].trim(), "hh:mm a").unix(),
          index: index,
          count: each[value2],
        });
      });
      tempTimesList.sort(function (a, b) {
        return a.time - b.time;
      });

      tempTimesList.forEach(function (t) {
        sortedTimeList.push(tempData[t.index]);
      });
      setTimeSlotData(sortedTimeList);
    }
  }, [props.chartDetails, props.data]);

  useEffect(() => {
    if (timeSlotData) {
      let finalData = timeSlotData.map((each, i) => {
        return {
          name: each[value1],
          [key]: each[value2],
          amt: each[value1],
        };
      });
      setData(finalData);
      // setMonth(temp)
    }
  }, [timeSlotData]);
  // console.log(props.chartDetails,"12345")
  const setSortedData = (data) => {
    let finalData = data?.map((each, i) => {
      return {
        name: each[value1],
        [key]: each[value2],
        amt: each[value1],
      };
    });
    setData(finalData);
  };

  useEffect(() => {
    if (props.chartTitle === sortedChart) {
      let tempdata = timeSlotData;
      if (isSort) {
        tempdata.reverse();
        setSortedData(tempdata);
      } else {
        let tempdata = timeSlotData;
        console.log(tempdata, "777888");
        // tempdata.reverse();
        setSortedData(tempdata);
      }
    }
  }, [isSort, timeSlotData]);

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
          <p className="label">{`${props.chartDetails?.legendData[0]}: ${payload[0]?.value}`}</p>
          <p className="label">{`${props.chartDetails?.legendData[1]}: ${payload[0]?.payload?.amt}`}</p>
        </div>
      );
    }
  };

  //   return null;
  // };

  // var monthlyData = Month.filter(function (item, pos) {
  //   return Month.indexOf(item) == pos;
  // })
  return data?.length > 0 ? (
    <div
      className="sd-chart"
      style={{
        minWidth: `${data.length * 140}px`,
        // width: `${
        //   expandedChart && expandedChart.includes(props.chartTitle)
        //     ? "1000px"
        //     : `${barWidth}px`
        // }`,
        height: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "450px"
            : "314px"
          // `${barHeight}px`
        }`,
        position: "relative",
        marginTop: "60px",
      }}
    >
      <ResponsiveContainer height="100%">
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
              fontSize: props.chartDetails?.expand?.isExpand ? "15px" : "10px",
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
              dy={25}
              offset={-10}
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

          <Tooltip content={<CustomTooltip />} />
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
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`${props.chartDetails?.keys[0]?.fillColor}`}
              />
            ))}
            {/* {
                config?.lineChart?.chart?.data?.map((entry, index) => {
                  // console.log(entry[value2],"123")
                  var getDate = new Date(entry[value2])
                  var Months = moment(getDate).format("YYYY").toString()

                  // console.log(monthlyData)
                  return <Cell
                    key={`cell-${index}`}
                    // fill={fillcolour} 
                    fill={Months == "2021" ? "#6041E8" : "#9ADBF9"}
                  />
                })
              } */}
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
            ? "485px"
            : "350px"
        }`,
      }}
    >
      <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
    </div>
  );
}

export default LineChart;
