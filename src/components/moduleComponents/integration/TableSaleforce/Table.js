import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./Table.css";

import Pagination from "../../../generic/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import editIcon from "../../../../theme/assets/svg/integration/editIcon.svg";
import deleteIcon from "../../../../theme/assets/svg/integration/deleteIcon.svg";
import "react-toastify/dist/ReactToastify.css";
import ConformationBox from "../ConformationBox/ConformationBox";
import Inputbox from "../../../generic/inputBox/InputBox";
import SearchIcon from "../../../../theme/assets/svg/onboarding/searchIcon.svg";
import downloadIcon from "../../../../theme/assets/svg/integration/campaignDownload.svg";

import {setJobNameRedux} from "../../../../redux/integration/actions"


function Table(props) {
  const [tableData, settableData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [paginationData, setPaginationData] = useState([]);
  const [fetchedData, setfetchedData] = useState();
  const [conformBox, setConformBox] = useState(false);
  const [confDelete, setConfDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const url = props.url;
  //  const urll = `https://connectors.saarthi.ai/api/connectors/job/v1/job/all?clientName=${}`
  const dispatch = useDispatch()
  const getdatatable = () => {
    axios.get(url).then((data) => {
      let temdata = data.data.data;
      settableData(temdata);
      let arrSize = temdata?.length;
      arrSize = Math.ceil(arrSize / 14);
      setTotalPage((prev) => arrSize);
      //   let tempData = tableData;
      temdata = temdata?.slice(0, 14);
      setPaginationData(temdata);
    });
  };
  useEffect(() => {
    getdatatable();
  }, []);

  const setfordelet = async (chilld) => {
    setConfDelete((prev) => chilld);
    deletitem(deleteId);
  };
  const deletitem = async (str) => {
    // console.log(str)

    const headers = {
      "Content-Type": "application/json",
      jobId: `${str}`,
    };

    await axios
      .post(
        `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/delete`,
        headers
      )
      .then((response) => {
        return (
          getdatatable(),
          toast.success(" deleted successfully!"),
          setConfDelete(false),
          setConformBox(false)
        );
      });
  };
  const tableHeader = props.array;

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    let tempData = tableData;
    tempData = tempData?.slice(newPageNo * 14, (newPageNo + 1) * 14);
    setPaginationData((prev) => tempData);
    setPageNo((prev) => tempNewPage);
  };

  const FetchEditData = async (name) => {
    await axios
      .get(
        `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job?jobName=${name}`
      )
      .then((response) => {
        let data = response.data.data;
        //  setfetchedData( prev => data)
        props.callfunc(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchUser = (jobname) => {
    axios
      .get(
        `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/specificjob?jobName=${jobname}&clientName=${props.clientName}`
      )
      .then((data) => {
        let temdata = data.data.data;
        settableData(temdata);
        let arrSize = temdata?.length;
        arrSize = Math.ceil(arrSize / 14);
        setTotalPage((prev) => arrSize);
        //   let tempData = tableData;
        temdata = temdata?.slice(0, 14);
        setPaginationData(temdata);
      })
      .catch((err) => console.log("searchbyjobName filter error"));
  };
  // paginationData.map(e=>{for(let k in e) {
  //   if(k=='filePath')
  //   console.log("file",e[k])}})
  //   paginationData.map(e =>Object.keys(e)
  //   .forEach(k => {if(k=='filePath'){
  //     console.log("medusri",e[k])}}))
  const downloadfile = (path, fileName) => {
    // downloadCsvFile(path , fileName)

    var link = document.createElement("a");
    link.download = fileName;
    link.href = path;
    document.body.appendChild(link);
    link.click();
    //  document.body.removeChild(link);
    //  delete link;
  };

  return (
    <div className="mytable">
      <ToastContainer
        position="top-center"
        type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={true}
      />
      <div className="searchDivTable">
        <Inputbox
          className="userListSearchInput"
          type="search"
          placeholder="Job Name"
          imgSrcLeft={SearchIcon}
          onChangeValue={(e) => handleSearchUser(e.target.value)}
          //    imageClick={() => imageClick()}
        />
      </div>
      <div className="table-div">
        <table className="table">
          <tr className="first-row">
            <th className="th1">Sr.</th>
            <th>{tableHeader[0]}</th>
            <th>{tableHeader[1]}</th>
            <th>{tableHeader[2]}</th>
            <th>{tableHeader[3]}</th>

            <th> Actions</th>
          </tr>
          <tbody className="tbody">
            {  paginationData.map((tab, i) => {
              {
                for (let k in tab) {
                  if (k === "filePath") {
                    var path = tab[k];
                  }
                }
              }
              return (
                <tr key={i}>
                  <td> {(pageNo - 1) * 14 + i + 1}. </td>
                  <td>{tab.jobName}</td>
                  <td>{tab.connectorName}</td>
                  <td>{tab.clientName ? tab.clientName : "-"}</td>
                  <td>{tab.jobFetchStatus ? tab.jobFetchStatus : "New"}</td>
                  <td>
                    <div className="iconDivInline">
                      <div
                        onClick={() => downloadfile(path, `${tab.jobName}.csv`)}
                        className={`${
                          tab.jobFetchStatus === "Completed"
                            ? ""
                            : "myIconHidden"
                        }`}
                      >
                        {tab.jobFetchStatus === "Completed" ? (
                          <img
                            src={downloadIcon}
                            height="20px"
                            className="myIcon"
                          ></img>
                        ) : null}
                      </div>
                      <div
                        onClick={() => {
                          return props.dep(true), FetchEditData(tab.jobName),
                          
                          dispatch(setJobNameRedux(tab.jobName));
                        }}
                      >
                        <img src={editIcon} className="myIcon"  />
                      </div>
                      <div
                        onClick={() => {
                          return setConformBox(true), setDeleteId(tab.id);
                        }}
                      >
                        <img
                          src={deleteIcon}
                          height="20px"
                          className="myIcon"
                        />
                      </div>
                      {/* <span><img  src= {deletIcon} className ='my1' value = {tab.jobName} onClick={deletitem}></img></span>
                       */}
                    </div>
                  </td>
                </tr>
              );
            }) 
            }
          </tbody>
        </table>
            {paginationData.length ? "" : <div className="notFoundMsg"><p>No Data Found</p></div>}
      </div>

      <div className="pagination-table">
        <Pagination
         forcePage={pageNo}
          totalNoOfPage={totalPage}
          handleClickPageNo={(value) => handleClickPageNo(value)}
          // forcePage ={pageNo}
        />
      </div>

      {conformBox ? (
        <ConformationBox
          message="delete"
          setOpenBox={setConformBox}
          setDelete={(data) => setfordelet(data)}
        />
      ) : null}
    </div>
  );
}



export default Table;
