import React, { useState, useEffect } from "react";
import { Colors } from "./colors";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import LoaderSaarthi from '../components/loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
function PieChartComponent(props) {
  const [data, setData] = useState([]);

  const isExpand = useSelector((store) => store?.analyticsReducer?.isExpand);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  let value1 = props.chartDetails?.keys[0]?.referenceKeyName;
  let value2 = props.chartDetails?.keys[1]?.referenceKeyName;

  // useEffect(() => {
  //   if (props.data) {
  //     expandedChart &&
  //       expandedChart?.map((each, i) => {
  //         if (isExpand && each === props.chartTitle) {
  //           let tempData =
  //             props.data &&
  //             props.data?.sort((a, b) =>
  //               a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
  //             );
  //           let finalData = tempData?.map((each, i) => {
  //             return {
  //               name: each[value1],
  //               value: each[value2],
  //             };
  //           });
  //           setData(finalData);
  //         } else {
  //           let tempData =
  //             props.data &&
  //             props.data?.sort((a, b) =>
  //               a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
  //             );
  //           let finalData = tempData?.map((each, i) => {
  //             if (i <= 4) {
  //               return {
  //                 name: each[value1],
  //                 value: each[value2],
  //               };
  //             }
  //           });
  //           setData(finalData);
  //         }
  //       });
  //   }
  // }, [props.data, isExpand, expandedChart]);

  useEffect(() => {
    if (props.data) {
      let tempData =
        props.data &&
        props.data?.sort((a, b) =>
          a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
        );
      let finalData = tempData?.map((each, i) => {
        if (i <= 4) {
          return {
            name: each[value1],
            value: each[value2],
          };
        }
      });
      setData(finalData);
    }
  }, [props.data, isExpand, expandedChart, props.chartDetails]);

  useEffect(() => {
    if (expandedChart && expandedChart.includes(props.chartTitle)) {
      let tempData =
        props.data &&
        props.data?.sort((a, b) =>
          a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
        );
      let finalData = tempData?.map((each, i) => {
        return {
          name: each[value1],
          value: each[value2],
        };
      });
      setData(finalData);
    }
  }, [expandedChart, props.data, props.chartDetails]);

  const COLORS = Colors;
  //  ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#65789B"];
  useEffect(() => {
    props.sendColour(COLORS, data);
  }, [props.data, data]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    startAngle,
    endAngle,
    fill,
    payload,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return payload.payload?.name ? (
      <>
        {
          // props.isPaymentDelay?"":
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: "10px" }}
          >
            {/* {`${(percent * 100).toFixed(0)}%`} */}
          </text>
        }
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          // innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx - 10},${my - 10}L${ex - 10},${ey - 10}`}
          stroke={COLORS[index % COLORS.length]}
          fill="none"
        />
        <circle
          cx={ex - 10}
          cy={ey - 10}
          r={2}
          fill={COLORS[index % COLORS.length]}
          stroke="none"
        />
        {props.data && (
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 15}
            y={ey - 15}
            dy={10}
            textAnchor={textAnchor}
            fill="#333333"
            style={{
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {expandedChart && expandedChart.includes(props.chartTitle)
              ? data[index] && data[index].name
              : index <= 4 && data[index] && data[index].name}
            {/* { data[index] && data[index].name} */}(
            {(percent * 100).toFixed(0) == 0
              ? `${(percent * 100).toFixed(2)}%`
              : `${(percent * 100).toFixed(2)}%`}
            )
          </text>
        )}
      </>
    ) : (
      ""
    );
  };

  return (
    // loading ? <LoaderSaarthi /> :
    props.data?.length > 0 ? (
      <div
        className="pie-chart"
        style={{
          height: `${
            expandedChart && expandedChart.includes(props.chartTitle)
              ? "610px"
              : "510px"
          }`,
          width: `${
            expandedChart && expandedChart.includes(props.chartTitle)
              ? "1000px"
              : "800px"
          }`,
        }}
      >
        <ResponsiveContainer>
          <PieChart
            width={
              expandedChart && expandedChart.includes(props.chartTitle)
                ? 900
                : 400
            }
            height={
              expandedChart && expandedChart.includes(props.chartTitle)
                ? 550
                : 400
            }
          >
            <Pie
              data={data}
              cx="53%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={
                expandedChart && expandedChart.includes(props.chartTitle)
                  ? 210
                  : 160
              }
              fill="#8884d8"
              dataKey="value"
              legendType="circle"
              stroke=""
              isAnimationActive={false}
              paddingAngle={
                isExpand &&
                expandedChart &&
                expandedChart.includes(props.chartTitle)
                  ? 0.5
                  : 0
              }
              minAngle={data?.length > 7 && data[0]?.value < 5 ? 50 : 10}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div
        className="no-data"
        style={{
          // width: "900px",
          width: "400px",
          marginLeft: "30%",
        }}
      >
        <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
      </div>
    )
  );
}

export default PieChartComponent;
