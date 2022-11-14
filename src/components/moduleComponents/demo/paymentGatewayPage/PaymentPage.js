import React, { useState } from 'react'
import DivComponent from '../buttonDivComponent/DivComponent'
import "./PaymentPage.css"
import { useSelector, useDispatch } from "react-redux";

import backIcon from "../../../../theme/assets/svg/demo/backIcon.svg"
import Razorpay from '../razorpay/Razorpay';
import ReactTooltip from "react-tooltip";
import razorpayIcon from "../../../../theme/assets/svg/demo/razorpayIcon.svg"
import juspayIcon from "../../../../theme/assets/svg/demo/juspayIcon.svg"
import cashfreeIcon from "../../../../theme/assets/svg/demo/cashfreeIcon.svg"
import payuIcon from "../../../../theme/assets/svg/demo/payuIcon.svg"
import billdeskIcon from "../../../../theme/assets/svg/demo/billdesk.svg"
import Breadcrum from "../../../generic/breadcrum/Breadcrum";

import demoConfig from "../demoConfig";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

function PaymentPage(props){

  const userLoginInfo = useSelector(
    (store ) => store.loginReducer.userLoginInfo
  )
    let arr =[
        {  name :"Razorpay" ,
           icon : razorpayIcon },
       { name :"Juspay" ,
         icon : juspayIcon ,
          coming : "coming"},
       {  name :"PayU", 
          icon : payuIcon,
          coming : "coming"},

        { name : "Billdesk", 
           icon : billdeskIcon,
           coming : "coming"} ,
         { name :"Cashfree" ,
           icon : cashfreeIcon,
           coming : "coming"}]
    const[razorpay , setrazorPay] = useState(true)
    const onNextpage = () => {
      // alert("ya")
      // console.log("i am oushing to payment")
      // console.log(historyt);
      // historyt.push("/payment");
      // console.log(historyt);
          setrazorPay(prev => false)
    }

    let accountName = userLoginInfo?.userDetail?.accountDetails[0]?.name?.toString().toLowerCase()
    let role = userLoginInfo?.userDetail?.role
    role = role?.toString().toLowerCase();
     let demoCon = demoConfig() 
    //  console.log("paymentPage" , demoCon[accountName][role]['payment']['filters']['hidden'] )
    
        

       let tempArrHide 
      try{ tempArrHide = demoCon[accountName][role]['payment']['filters']['hidden']  }
      catch{
         tempArrHide = []
      }

  return (
    <div>
    {razorpay ?
    <div className='PaymentWrapper'>
          {/* <div className='backArrow' onClick={()=>{props.getData()}}><img src={backIcon}></img></div>
        <div className='connectorIconDiv' onClick={()=>{props.getData()}}> 
         <img src={connectorIcon}></img>
       </div> */}
       <div className='backArrow'>
       
           <div className='iconBack'
            // onClick= {() =>props.prevPage(false)}
            >
              <Breadcrum 
           highlightSelected={"Payment Gateway"} 
           listData={["Integration","Payment Gateway"]}
           setNext={"Salesforce"}
          />
               
          {/* <img src={backIcon} 
          ></img> */}
          </div>
             
           {/* <div className='iconBack'
            >
           <img src={connectorIcon}
           onClick = {()=>{props.getData()}}
           data-tip data-for="registerTip"
          
           ></img>
             <ReactTooltip id="registerTip" place="top" effect="solid">
            Press to go to Integration Page
          </ReactTooltip>
           </div> 

           <div className='iconBack'
            onClick = {()=>{props.getData()}}
            >
          <img src={backIcon} 
          ></img>
          </div> */}</div>
        {/* <div className='headindDiv'>
             <p className='heading'>Payment Gateway</p>
         </div> */}
         <div className='componentContainer'>
             { arr.map((e,i) => {
               if(!tempArrHide.includes(e.name)){
                  return <div key={i}  onClick ={ e.name=== "Razorpay" ? onNextpage : ""}>
                  <DivComponent heading = {e.name } img = {e.icon}
                    coming = {e.coming ? e.coming :null}
                          />
                          </div>
               }
             })}
        
         </div>
    </div>
    :  <div className='PaymentWrapper'>
      <div className='backArrow'>
           <div className='iconBack'
            
           >
           {/* <img src={connectorIcon}
           onClick = {()=>{props.getData()}}
           ></img> */}
           </div>
           <div className='iconBack'
            onClick = {()=>{setrazorPay(prev => true)}}
            >
          <img src={backIcon} 
          ></img>
          </div></div>
    <Razorpay/>
    </div>
    }
    </div>
  )
}
// const mapStateToProps = (state, ownProps) => {
//   return {
    
//     userLoginInfo:state.loginReducer.userLoginInfo,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//       Object.assign({}, loginAction),
//       dispatch
//   );
// };
export default PaymentPage;

