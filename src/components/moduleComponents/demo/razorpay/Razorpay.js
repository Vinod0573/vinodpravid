import React, { useState, useEffect } from "react";
import "./Razorpay.css";
import RazorPayTable from "./razorPayTable/RazorPayTable";
import Button from "../../../generic/button/Button";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as razorpayAction from "../../actions/razorpayActions";



const Razorpay = (props) => {
  //const filePathNameRazor = sessionStorage.getItem("paymentInfoName");
  const [razorClicked, setRazorClicked] = useState(true);

  const [reRazorpayData, setReRazorpayData] = useState()

  useEffect( () => {
    setReRazorpayData(prev => props.razorpayData);
  })


  return (
    <>
    <div className="paymentWrapperJp">
      <div className="razorpayWrapperDiv">
        {/* <Sidebar /> */}
        <div className="razorpayViewDivJp">
          {(razorClicked || reRazorpayData)? (
              <RazorPayTable />
          ) : (
            <div className="paymentButton">
              <Button  
                  text=" Razor Pay "
                  extraClass="razorPayButtonStyle"
                  onClick={() => setRazorClicked(true)}
                  />
              </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};


// const mapStateToProps = (state, ownProps) => {
//   return {
//     razorpayData: state.razorpayReducer.razorpayData,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Object.assign({}, razorpayAction), dispatch);
// };
export default Razorpay