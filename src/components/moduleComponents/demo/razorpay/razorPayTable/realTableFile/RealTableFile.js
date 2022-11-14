import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as razorpayAction from "../../../../actions/razorpayActions";
import LoaderSaarthi from "../../../../components/loader/Loader";

import "./RealTableFile.css";

const RealRazorpayTable = (props) => {
  const [razorpayDataPaseWise, setRazorpayDataPageWise] = useState();

  useEffect(() => {
    setRazorpayDataPageWise((prev) => props.razorpayDataPaseWise);
  }, [props.razorpayDataPaseWise]);


  return (
    <>
    <div className="tableRPWrapper">
      <div className="rzpTable">
        <table className="tableRP">
          <tr className="tableRHRP">
            <th className="tableRHRPSNo">Sr.</th>
            <th className="tableRHRPID">ID</th>
            <th className="tableRHRPAmount">Amount</th>
            <th className="tableRHRPStatus">Status</th>
            <th className="tableRHRPContact">Contact</th>
            <th className="tableRHRPError">Error Description</th>
          </tr>
          {razorpayDataPaseWise?.map((item, i) => {
            return (
              <tr key={i} className="tableDataRow">
                <td> {(props.pageNo - 1) * 8 + i + 1}. </td>
                <td> {item.id ? item.id : '-'} </td>
                <td> {item.amount} </td>
                <td> {item.status} </td>
                <td> {item.contact} </td>
                <td> {item.error_description ? item.error_description : '--'} </td>
              </tr>
            );
          })}
        </table>
        {razorpayDataPaseWise ? 
        (
          <></>
          // <div className="realTablePaginationPosi">
          //   <Pagination
          //     totalNoOfPage={totalNoOfPage}
          //     handleClickPageNo={(value) => handleClickPageNo(value)}
          //   />
          // </div>
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <LoaderSaarthi />
          </div>
        )}
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // isDistribution: state.dashboardReducer.distribution,
    // regiontype: state.dashboardReducer.region,
    // dates: state.dashboardReducer.dates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, razorpayAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(RealRazorpayTable);
