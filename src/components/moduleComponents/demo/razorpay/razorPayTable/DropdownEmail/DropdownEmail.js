// import React,{useState,useEffect,useRef} from 'react';
// import axios from 'axios';

// import './DropDownEmail.css';
// import sendEmailIcon from './sendEmail.svg';
// import {CONNECTOR_PAYMENT_INFO, PAYMENT_INFO_URL} from "../../../../Utilities/ApiRoutes";

// import { connect } from "react-redux";
// import { bindActionCreators, compose } from "redux";
// import * as razorpayAction from "../../../../actions/razorpayActions";
// import {emailValidation} from "../../../../Utilities/Validation";
// //import ErrorMessage from "../error/ErrorMessage";



// const DropdownEmail = (props) => {
//     const [toEmail, setToEmail] = useState()
//     const [ccEmail, setCCEmail] = useState();
//     const [isError, setIsError] = useState(null);
//     const [csvFile, setCsvFile] = useState();
//     //const [isEmailSend, setIsEmailSend] = useState(null);;


//     useEffect(() => {
//         setCsvFile(prev => props.filePathName);
//     },[props.filePathName])
    
//     const closeRef=useRef()

//     useEffect(() => {
//       const checkIfClickedOutside = e => {
//         // If the menu is open and the clicked target is not within the menu,
//         // then close the menu
//         if ( props.isEmailDropDownOn && closeRef.current && !closeRef.current.contains(e.target)) {
//           props.setIsEmailDropDownOn(false)
//         }
//       }
  
//       document.addEventListener("mousedown", checkIfClickedOutside)
  
//       return () => {
//         // Cleanup the event listener
//         document.removeEventListener("mousedown", checkIfClickedOutside)
//       }
//     }, [props.isEmailDropDownOn])

 

//     const handleToEmailChange = (e) =>{
//         setIsError(prev => null)
//         let toId = e.target.value;
//         setToEmail(previousState => toId);
//     }

//     const handleCCEmailChange = (e) => {
//         setIsError(prev => null)
//         let ccID = e.target.value;
//         setCCEmail(previousState => ccID);
//     }

//     const sendCsvFileOnEmail = async () => {
//             const fileName = csvFile;
//             const checkToEmail = emailValidation(toEmail);
//             const checkCcEmail = emailValidation(ccEmail);
//             if(!checkToEmail.isValid || !checkCcEmail.isValid){
//                 setIsError(prev => "Please Check Email");
//             }
//             const data = {
//                 "fileName": fileName,
//                 "toEmail": toEmail
//                 }
                
//             const urlPostEmail = `${CONNECTOR_PAYMENT_INFO}${PAYMENT_INFO_URL.SEND_PAYMENT_INFO_EMAIL}`
//              await axios.post(urlPostEmail, data,{
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }}
//             ).then(res => {
//                 props.setIsEmailDropDownOn(false);
//                 props.handleEmailSuccessFul("Email send successfully");
//                 console.log(res);
//             }).catch(err =>{
//                 console.log(err);
//             });
//         }

//     return (
//         <>  
//             <div className="ddMailWrapper" ref={closeRef}>
//                 <div className="ddMailHeaderWrapper">
//                     <span className="ddMailHeading">Send Email To</span>
//                 </div>
//                 <div className="inputWrapper">
//                     <span className='ddMailText'>To:</span> 
//                     <input type="text" className = "ddMailInput" onChange = {(e) =>handleToEmailChange(e)}/>
//                 </div>
//                 <div className="inputWrapper">
//                     <span className='ddMailText'>CC:</span> 
//                     <input type="text" className = "ddMailInput" onChange = {(e) =>handleCCEmailChange(e)}/>
//                 </div>
//                 <div className="sendEmailIconWrapper">
//                     <img src={sendEmailIcon} 
//                         className = "sendEmailIcon"
//                         alt="send Email"  
//                         onClick={() => sendCsvFileOnEmail()}
//                         />
//                 </div>
//             </div>
//         </>
//     );


// };

// const mapStateToProps = (state, ownProps) =>{
//     return{
//         razorpayCsvFile: state.razorpayReducer.razorpayCsvFile,
//         razorpayCsvFile: state.razorpayReducer.razorpayCsvFile,
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(Object.assign({}, razorpayAction), dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DropdownEmail);;
