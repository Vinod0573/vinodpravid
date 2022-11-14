import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
import styles from "./StackedBarChat.module.scss";
function StackedBarChart(props) {
  const [data, setData] = useState([]);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  let stackedBarDetails =
    props.chartDetails && Object.values(props.chartDetails.keys).length > 0
      ? Object.values(
          props.chartDetails.keys.sort((a, b) => {
            return a.position - b.position;
          })
        )
      : [];

  let key1 = stackedBarDetails[0]?.shortKey;
  let key2 = stackedBarDetails[1]?.shortKey;
  let legend1 = props.chartDetails?.legendData[0];
  let legend2 = props.chartDetails?.legendData[1];
  let fill1 = stackedBarDetails[0]?.fillColor;
  let fill2 = stackedBarDetails[1]?.fillColor;
  let value1 = stackedBarDetails[0]?.referenceKeyName;
  let value2 = stackedBarDetails[1]?.referenceKeyName;
  let referenceKey = props.chartDetails?.refenceKeyForData;

  useEffect(() => {
    if (props.data && props.chartDetails) {
      setData([
        {
          name: "",
          [key1]:
            props?.data && props?.data[referenceKey]
              ? props?.data[referenceKey][value1]
              : 0,
          [key2]:
            props?.data && props?.data[referenceKey]
              ? props?.data[referenceKey][value2]
              : 0,
          amt: 0,
        },
      ]);
    }
  }, [props.data, props.chartDetails]);

  // console.log(props.data[referenceKey][value1],props.chartDetails,"sta")
  return (props.data[referenceKey] && props.data[referenceKey][value1]) ||
    (props.data[referenceKey] && props.data[referenceKey][value2]) ? (
    <div
      style={{
        width: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "1000px"
            : `${parseInt(props.chartDetails?.chartStyle?.width) - 50}px`
        }`,
        height: `${
          expandedChart && expandedChart.includes(props.chartTitle)
            ? "460px"
            : `${parseInt(props.chartDetails?.chartStyle?.height) - 130}px`
        }`,
        overflow: "none",
        marginTop: "40px",
      }}
    >
      <ResponsiveContainer className="st-bar" width="100%" height="100%">
        <BarChart
          width={500}
          height={700}
          data={data}
          margin={{
            top: 20,
            right: 20,
            // bottom: 10,
            left: 50,
          }}
          barGap={10}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{ margin: "-30px", top: "0", left: "70px" }}
            payload={[
              {
                id: props.data[referenceKey][value1] ? "12" : "",
                type: props.data[referenceKey][value1] ? "square" : "none",
                value: props.data[referenceKey][value1] ? legend1 : "",
                color: props.data[referenceKey][value1] ? fill1 : "",
              },
              {
                id: props.data[referenceKey][value2] ? "13" : "",
                type: props.data[referenceKey][value2] ? "square" : "none",
                value: props.data[referenceKey][value2] ? legend2 : "",
                color: props.data[referenceKey][value2] ? fill2 : "",
              },
            ]}
          />
          <XAxis dataKey="name">
            <Label
              // angle={200}
              position="insideBottomMiddle"
              style={{
                textAnchor: "middle",
                fill: "#000000",
                padding: "20px",
                fontFamily: "Roboto",
              }}
              dy={5}
            >
              {stackedBarDetails[0].name}
            </Label>
          </XAxis>
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: "#000000",
                fontFamily: "Roboto",
              }}
              offset={10}
            >
              {stackedBarDetails[1].name}
            </Label>
          </YAxis>
          <Tooltip cursor={{ fill: "#ffffff" }} />

          <Bar
            isAnimationActive={false}
            dataKey={key1}
            fill={fill1}
            barSize={35}
          >
            <LabelList
              dataKey={key1}
              position="top"
              style={{ fontSize: "10px" }}
            />
          </Bar>
          <Bar
            isAnimationActive={false}
            dataKey={key2}
            fill={fill2}
            barSize={35}
          >
            <LabelList
              dataKey={key2}
              position="top"
              style={{ fontSize: "10px" }}
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
            ? "485px"
            : "380px"
        }`,
      }}
    >
      <NoDatamodel
        srcImg={noPhoneDataIcon}
        extraCss={{ img: styles.img }}
      ></NoDatamodel>
    </div>
  );
}

export default StackedBarChart;
