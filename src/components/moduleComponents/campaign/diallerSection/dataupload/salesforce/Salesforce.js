import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Salesforce.css";
import TableSaarthiJp from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/widlyuse/TableSaarthiJp/TableSaarthiJpFi/TableSaarthiJp";
import Pagination from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/pagination/Pagination";
import { tableConstants } from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/pages/Campaign/screen/jobTable/tableConstants";
import Axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterAction from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/filterActions";
import * as campaignAction from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/campaignActions";
import * as loginAction from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/loginActions";

function Salesforce(props) {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [paginationData, setPaginationData] = useState([]);
  const [jobFetchStatus, setJobFetchStatus] = useState("");
  const [loop, setLoop] = useState();
  const [accName, setAccName] = useState();
  const [jobList,setJobList]=useState([])

  const selecteDetails = useSelector((store) => {
    return store.campaignReducer.campaignCredentials;
  });
  useEffect(() => {
    let id = selecteDetails?.accountId || props.campaignIdName?.accountId;
    Axios.get(
      `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/account/v1/getById?id=${id}`
    )
      .then((res) => {
        setAccName((prev) => res?.data?.data?.name);
      })
      .catch((e) => console.log(e));
  }, [selecteDetails?.accountId, selecteDetails]);

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
    // setClickData(value)
    // setResetClickData(value)
  };
  const handleRun = (data) => {
    let payload = {
      jobName: data.jobName,
      campaignManagerId: selecteDetails.id ? selecteDetails.id:props.campaignCredentials.id,
    };
    Axios.post(
      `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/fetchRecords`,
      payload
    ).then((res) => {
      setLoop(
        setInterval(() => {
          Axios.get(
            `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job?jobName=${data.jobName}`
          ).then((response) => {
            if (response.data.data) {
              setJobFetchStatus(response.data.data?.jobFetchStatus);
            }
          });
        }, 2000)
      );
    });
  };
  const handleCompleted = () => {
    // setSelectedTab("Manual")
  };
  const getListDetails = () => {
    if (accName?.length > 0) {
      Axios.get(
        `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job/all?clientName=${accName}`
      ).then((res) => {
        if (res.data) {
          setJobList(res.data.data);
          setPaginationData(res.data.data);
        }
      });
    }
  };

  useEffect(() => {
    if (jobFetchStatus == "Completed") {
      clearInterval(loop);
      setLoop();
      getListDetails();
    }
  }, [jobFetchStatus]);

  return (
    <>
      <div className="table-section">
        {
          <TableSaarthiJp
            cols={tableConstants(
              (data) => handleRun(data),
              jobFetchStatus,
              handleCompleted
            )}
            data={paginationData}
            pageNo={pageNo}
            isLoading={"test"}
          />
        }
      </div>
      <div>
        {totalPage > 1 && (
          <div>
            <Pagination
              totalNoOfPage={totalPage}
              handleClickPageNo={(value) => handleClickPageNo(value)}
              forcePage={pageNo}
            />
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
      filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
      campaignSelectedData: state.campaignReducer?.campaignSelectedData,
      campaignIdName: state.campaignReducer?.campaignIdName,
      userLoginInfo: state.loginReducer.userLoginInfo,
      campaignEditUpdateType: state.campaignReducer?.campaignEditUpdateType,
      campaignCredentials: state.campaignReducer.campaignCredentials
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      Object.assign({}, filterAction, campaignAction, loginAction),
      dispatch
    );
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Salesforce);
