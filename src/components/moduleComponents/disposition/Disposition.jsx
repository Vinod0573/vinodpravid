import React, { useEffect, useState } from "react";
import "./Disposition.css";
import Table from "../table/Table";
import PieChartComponent from "../charts/PieChart";
import { useDispatch, useSelector } from "react-redux";

function Disposition(props) {
  const [bodyData, setBodyData] = useState([]);
  // const [getAllData, setAllData] = useState(false);

  const isExpand = useSelector(
    (store) =>
      store?.analyticsReducer?.isExpand
  );

  const expandedChart = useSelector(
    (store) =>
      store?.analyticsReducer?.expandedChart
  );

  const isSort = useSelector(
    (store) =>
      store?.analyticsReducer?.isSort
  );
  const sortedChart = useSelector(
    (store) =>
      store?.analyticsReducer?.sortedChart
  )

  let value1 = props.chartDetails?.keys[0]?.referenceKeyName;
  let value2 = props.chartDetails?.keys[1]?.referenceKeyName;
  let refenceKeyForData = props.chartDetails?.refenceKeyForData;

  useEffect(() => {
    if (props.data) {
      let finaldata = props?.data[refenceKeyForData];
      finaldata && finaldata?.sort((a, b) =>
        a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
      );
      setBodyData(finaldata);
    }
  }, [props.data]);

  const getColour = (entry, i) => {
    let tempArr = bodyData?.map((each, i) => {
      return { ...each, color: entry[i % entry?.length] };
    });
    setBodyData(tempArr);
    
  };
  useEffect(() => {
    if(props.chartTitle === sortedChart && bodyData && bodyData.length > 0){
      let finaldata= bodyData;   
    if (isSort) {
      finaldata && finaldata?.sort((a, b) =>
        a[value2] < b[value2] ? 1 : b[value2] < a[value2] ? -1 : 0
      );
    } else{
      finaldata && finaldata?.sort((a, b) =>
        a[value2] > b[value2] ? 1 : b[value2] > a[value2] ? -1 : 0
      );
    }
    setBodyData(finaldata);
    
  }
  }, [isSort]);

  return (
    <div className="disposition-wrapper">
      <div style={{ width: "20%" }}>
        {
          <Table
            heading={props.chartDetails?.tableHeading}
            bodyData={bodyData}
            value1={value1}
            value2={value2}
            // showAllData={getAllData}
            // fetchData={() => {
            //   fetchAllData();
            // }}
            chartTitle={props.chartTitle}
          />
        }
      </div>
      <div className="disposition-chart" style={{ width: "80%" }}>
        <div className="align-right" style={{ textAlign: "right" }}></div>
        {
          <PieChartComponent
            chartDetails={props.chartDetails}
            data={props.data && props.data[refenceKeyForData]}
            sendColour={(entry, i) => getColour(entry, i)} 
            // showAllData={getAllData}
            chartTitle={props.chartTitle}
          />
        }
      </div>
    </div>
  );
}

export default Disposition;
