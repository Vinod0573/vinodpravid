import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";

function DonutChart(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const expandedChart = useSelector(
    (store) => store?.analyticsReducer?.expandedChart
  );

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    if (props.donutChart && props.data) {
      let temp = props.donutChart.map((each, i) => {
        return {
          name: each.shortKey,
          value: props.data[each?.referenceKeyName],
          fill: props.data[each?.referenceKeyName] == 0 ? null : each.fillColor,
        };
      });
      setData(temp);
    }
  }, [props.donutChart, props.data]);

  useEffect(() => {
    if (props.data && props.donutChart) {
      let temp = total;
      for (let val of props.donutChart) {
        temp = temp + props?.data[val?.referenceKeyName];
      }
      setTotal(temp);
    }
  }, []);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      name,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return parseInt(value) === 0 || value === "" ? (
      ""
    ) : (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="ffffff">
          {`Σ ${total}`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {/* <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        /> */}

        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        {value ? (
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        ) : (
          ""
        )}
        {
          <>
            {(parseInt(value) === 2 && name.length < 4) ||
            (parseInt(value) === 1 && name.length < 4) ? (
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
                style={{ textTransform: "capitalize",
                fontSize: `${props.chartDetails?.chartStyle?.fontSize ? parseInt(props.chartDetails?.chartStyle?.fontSize) : ""}`
               }}
              >{`${name}(${(percent * 100).toFixed(2)}%)`}</text>
            ) : (
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
                style={{ textTransform: "capitalize" }}
              >{`${name}`}</text>
            )}
            {name.length > 4 ? (
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#333"
              >
                {`(${(percent * 100).toFixed(2)}%)`}
              </text>
            ) : value &&
              ((parseInt(value) === 2 && name.length < 4) ||
                (parseInt(value) === 1 && name.length < 4)) ? (
              ""
            ) : (
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#333"
              >
                {`(${(percent * 100).toFixed(2)}%)`}
              </text>
            )}
          </>
        }
      </g>
    );
  };

  const getIsAngleRequired = () => {
    let temp = [];
    let val = data.map((each, i) => {
      if (each.value > 0) {
        temp.push(i);
      }
    });
    if (temp.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <PieChart
        width={
          expandedChart && expandedChart.includes(props.chartTitle)
            ? 1000
            : parseInt(props.chartDetails?.chartStyle?.innerWidth)
        }
        height={
          expandedChart && expandedChart.includes(props.chartTitle)
            ? 470
            : parseInt(props.chartDetails?.chartStyle?.innerHeight)
        }
      >
        <Pie
          // activeIndex={activeIndex}
          label={renderActiveShape}
          data={data}
          cx={"55%"}
          cy="50%"
          innerRadius={
            expandedChart && expandedChart.includes(props.chartTitle)
              ? 120
              : parseInt(props.chartDetails?.chartStyle?.innerRadius)
          }
          // {props.chartDetails?.expand?.isExpanded ? 120 : props.chartDetails?.chartStyle?.innerRadius}
          outerRadius={
            expandedChart && expandedChart.includes(props.chartTitle)
              ? 180
              : parseInt(props.chartDetails?.chartStyle?.outerRadius)
          }
          // {props.chartDetails?.expand?.isExpanded ? 180 : props.chartDetails?.chartStyle?.outerRadius}
          fill="#0066FF"
          dataKey="value"
          labelLine={true}
          isAnimationActive={false}
          paddingAngle={0}
          minAngle={2}
          // minAngle={1}
          // onMouseEnter={onPieEnter}
        />
      </PieChart>
    </>
  );
}

export default DonutChart;
