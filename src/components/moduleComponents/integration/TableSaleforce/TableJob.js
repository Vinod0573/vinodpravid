import React, { useState } from "react";

import { TABLESALESFORCE_URL } from "../../../../services/ApiRoutes";

import BackIcon from "../../../../theme/assets/genericSvg/backIcon.svg";
import Table from "./Table";
import JobNav from "../CreateJob/JobNav";
import JobCreate from "../JobCreate/JobCreate";

const arr = ["Job Name", "Connector Name", "Client Name", "Job Fetch Status"];
const urlt = TABLESALESFORCE_URL;
export default function MyCheck(props) {
  const [nextPage, setNextPage] = useState(false);
  const [getfetcheddata, setGetFetchedData] = useState();
  const [onJobCreate, setOnJobCreate] = useState(false);

  const handleCallback = (childData) => {
    setGetFetchedData((prev) => childData);
  };
  let tochange = nextPage;

  return (
    <div>
      {/* <Navigationbar/> */}

      {nextPage || onJobCreate ? (
        <JobNav
          data={getfetcheddata}
          editable={tochange}
          goback={setOnJobCreate}
          gobackforce={setNextPage}
          clientName={props.clientName}
        />
      ) : (
        <div style={{ display: "flex", width: "100%" }}>
          {/* <Sidebar /> */}
          <div style={{ width: "100%" }}>
            <div
              style={{ position: "absolute", right: "10%" }}
              onClick={() => setOnJobCreate(true)}
            >
              <JobCreate />
            </div>
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "flex-end",
                // width: "40px",
                paddingRight: "4%"
               
              }}
              onClick={() =>  props.pushBack(false) }
            >
              <img width="30px" src={BackIcon} />
            </div>

            <div>
              <Table
                url={`${urlt}?clientName=${props.clientName}`}
                array={arr}
                dep={setNextPage}
                callfunc={(childData) => handleCallback(childData)}
                clientName = {props.clientName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}