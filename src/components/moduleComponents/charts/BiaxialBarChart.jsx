import React, { PureComponent, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
function BiaxialBarChart(props) {
  const [data, setData] = useState([]);
  const [timeSlotData, setTimeSlotData] = useState([]);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const isSort = useSelector((store) => store?.analyticsReducer?.isSort);

  const sortedChart = useSelector(
    (store) => store?.analyticsReducer?.sortedChart
  );

  let name = props.chartDetails?.keys[0].referenceKeyName;
  let key1 = props.chartDetails?.legendData[0];
  let key2 = props.chartDetails?.legendData[1];
  let value1 = props.chartDetails?.keys[1].referenceKeyName;
  let value2 = props.chartDetails?.keys[2].referenceKeyName;
  let refenceKeyForData = props.chartDetails?.refenceKeyForData;
  let fill1 = props.chartDetails?.keys[1].fillColor;
  let fill2 = props.chartDetails?.keys[2].fillColor;
  let barWidth = parseInt(props.chartDetails?.chartStyle?.width) - 100;

  useEffect(() => {
    if (props.chartDetails && props.data) {
      var sortedTimeList = [];
      var tempTimesList = [];
      let tempData = props.data[refenceKeyForData];
      tempData?.map((each, index) => {
        var tempSingleTimeArr = each[name].split("-");
        tempTimesList.push({
          time: moment(tempSingleTimeArr[0].trim(), "hh:mm a").unix(),
          index: index,
          count1: each[value1],
          count2: each[value2],
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
    if (props.chartDetails && props.data) {
      let temp = props.data[refenceKeyForData];
      // let tempVal = temp.sort((a, b) => ((moment(a[name].split("-")[0],["h:mm A"]).format("HH")) > (moment(b[name].split("-")[0],["h:mm A"]).format("HH"))) ? 1 : (((moment(b[name].split("-")[0],["h:mm A"]).format("HH")) > (moment(a[name].split("-")[0],["h:mm A"]).format("HH"))) ? -1 : 0));
      // let tempVal = temp.sort((a,b)=>{return (moment(b[name].split("-")[0],["h:mm A"]).format("HH"))-(moment(a[name].split("-")[0],["h:mm A"]).format("HH"))})
      let finalData = temp?.map((each, i) => {
        return {
          name: each[name],
          [key1]: each[value1],
          [key2]: each[value2],
          amt: 0,
        };
      });
      setData(finalData);
    }
  }, [props.chartDetails, props.data[refenceKeyForData]]);

  const setSortedData = (data) => {
    let finalData = data?.map((each, i) => {
      return {
        name: each[name],
        [key1]: each[value1],
        [key2]: each[value2],
        amt: 0,
      };
    });
    setData(finalData);
  };

  useEffect(() => {
    if (props.chartTitle === sortedChart) {
      if (isSort) {
        let tempdata = props?.data[refenceKeyForData];
        tempdata.reverse();
        // tempdata?.sort((a, b) => (a[name] < b[name]) ? 1 : ((b[name] < a[name]) ? -1 : 0))
        setSortedData(tempdata);
      } else {
        let tempdata = props?.data[refenceKeyForData];
        // tempdata?.sort((a, b) => (a[name] > b[name]) ? 1 : ((b[name] > a[name]) ? -1 : 0))
        tempdata.reverse();
        setSortedData(tempdata);
      }
    }
  }, [isSort, props?.data[refenceKeyForData]]);

  return data?.length > 0 ? (
    <div
      style={{
        minWidth: `${data.length * 80}px`,
        height: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "612px"
            : "412px"
        }`,
        width: "1060px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" stroke="#000000">
            <Label
              // angle={200}
              position="insideBottomMiddle"
              style={{
                textAnchor: "middle",
                fill: "#000000",
                padding: "20px",
                margin: "20px",
              }}
              dy={23}
              offset={-10}
            >
              {props.chartDetails?.keys[0].name}
              {/* {config?.barAttemptChart?.chart?.xAxis} */}
            </Label>
          </XAxis>
          <YAxis yAxisId="left" orientation="left" stroke="#000000">
            <Label
              angle={270}
              offset={20}
              dx={15}
              position="left"
              style={{ textAnchor: "middle", fill: "#000000" }}
            >
              {props.chartDetails?.keys[1].name}
            </Label>
          </YAxis>
          <YAxis yAxisId="right" orientation="right" stroke="#ffffff" />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="left"
            wrapperStyle={{
              // paddingRight: "15px",
              top: "0",
              left: "900px",
              width: "auto",
            }}
          />
          <Bar yAxisId="left" dataKey={key1} fill={fill1} barSize={35}>
            <LabelList
              dataKey={key1}
              position="top"
              style={{ fontSize: "10px", padding: "20px" }}
            />
          </Bar>
          <Bar yAxisId="right" dataKey={key2} fill={fill2} barSize={35}>
            <LabelList
              dataKey={key2}
              position="top"
              style={{ fontSize: "10px", padding: "20px" }}
            />
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
            ? "510px"
            : "350px"
        }`,
      }}
    >
      <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
    </div>
  );
}

export default BiaxialBarChart;
