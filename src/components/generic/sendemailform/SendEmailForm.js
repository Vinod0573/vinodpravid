import React,{useState,useEffect} from 'react';
import axios from 'axios';

import './SendEmailForm.css';
import sendEmailIcon from './sendEmail.svg';
import {CONNECTOR_PAYMENT_INFO, PAYMENT_INFO_URL , OPERATION} from "../../../services/ApiRoutes";
import {jsonToCsvReport , textTocsv} from "../../../utils/downloadCsvFromJson";
import ErrorMessage from '../../generic/errorMessage/ErrorMessage'

// import { connect } from "react-redux";
// import { bindActionCreators, compose } from "redux";
// import * as callReportAction from "../../../actions/callReportActions";
import {emailValidation} from "../../../utils/Validation";





const SendEmailForm = (props) => {
    const [toEmail, setToEmail] = useState()
    const [ccEmail, setCCEmail] = useState();
    const [isError, setIsError] = useState(null);
    const [isErrorTo, setIsErrorTo] = useState(null);
    const [isErrorCc, setIsErrorCc] = useState(null);
    const[disableSend , setDisableSend] = useState(true)
    const [csvFile, setCsvFile] = useState();
    //const [isEmailSend, setIsEmailSend] = useState(null);;

    let accountNameBystore = sessionStorage.getItem("accountName")

    useEffect(() => {
        setCsvFile(prev => props.filePathName);
    },[props.filePathName])
 
    const handleToEmailChange = (e) =>{
        setIsError(prev => null)
        let toId = e.target.value;
        setToEmail(previousState => toId);
    }

    const handleCCEmailChange = (e) => {
        setIsError(prev => null)
        let ccID = e.target.value;
        setCCEmail(previousState => ccID);
    }

    useEffect(
        () => {
            if(props.data){
            props.data["toEmail"] = toEmail
            props.data["ccEmail"] = ccEmail
            props.data["accountName"] = accountNameBystore
            }
        },[toEmail , ccEmail]
    )
   
    useEffect(
        () => {
            const checkToEmail = emailValidation(toEmail);
            const checkCcEmail = emailValidation(ccEmail);
            if(checkToEmail.isValid || !toEmail?.length ){
                setIsErrorTo(prev => false)
            }
            if( checkCcEmail.isValid || !ccEmail?.length){
                setIsErrorCc(prev => false)
            }
            if(checkToEmail.isValid ){
               setDisableSend(prev => false)
            }
            else{
                
                if(!checkToEmail.isValid && toEmail?.length){
                    setIsErrorTo(prev => true)
                }
                if(!checkCcEmail.isValid && ccEmail?.length){
                    setIsErrorCc(prev => true)
                }
                setDisableSend(prev => true)
            }
        },[toEmail , ccEmail ] 
    )
    //For only check of cc
    useEffect(
        () => {
        const checkCcEmail = emailValidation(ccEmail)
        if( checkCcEmail.isValid || !ccEmail?.length){
            setIsErrorCc(prev => false)
        }else{
            setIsErrorCc(prev => true)  
        }
        },[ccEmail ]
    )

    const sendCsvFileOnEmail = async () => {
        if(props.operationMail) {
          const csvFileOperation = csvFile?.length ? csvFile : null
          let csvfileO
          if(csvFileOperation ){
          csvfileO = textTocsv(csvFileOperation);
          }
          
          const checkToEmail = emailValidation(toEmail);
          const checkCcEmail = emailValidation(ccEmail);
          if(!checkToEmail.isValid ){
              setIsError(prev => "Please Check Email");
          }
          else{
          
          const data = {
            toEmail : toEmail,
            ccEmail : ccEmail,
            uploadFile: csvfileO
          }
          const urlEmail = `${OPERATION.SEND_EMAIL}`
          await axios.post(urlEmail, data,{
             headers: {
                 'Content-Type': 'application/json'
             }}
         ).then(res => {
             if(res?.data){
           
             props.setIsEmailDropDownOn(false);
             props.handleEmailSuccessFul("Email send successfully");
             }
         }).catch(err =>{
             console.log(err);
             
         });
        }
        }
        else{
        const fileName = csvFile?.length ? csvFile : null;
        let csvfileC
        if(fileName){
        csvfileC = jsonToCsvReport(fileName);
        }
            const checkToEmail = emailValidation(toEmail);
            const checkCcEmail = emailValidation(ccEmail);
            if(!checkToEmail.isValid || !checkCcEmail.isValid){
                setIsError(prev => "Please Check Email");
            }
       
            const data = {
                "fileName": csvfileC,
                "toEmail": toEmail
                }
                let data2 = props.data ? props.data : data
                
            const urlPostEmail = `${CONNECTOR_PAYMENT_INFO}${PAYMENT_INFO_URL.SEND_PAYMENT_INFO_EMAIL}`
             await axios.post(urlPostEmail, data2,{
                headers: {
                    'Content-Type': 'application/json'
                }}
            ).then(res => {
                props.setIsEmailDropDownOn(false);
                props.handleEmailSuccessFul("Email send successfully");
            }).catch(err =>{
                console.log(err);
            });
        }
        }
       
    return (
        <>  
            <div className="ddMailWrapper" >
                <div className="ddMailHeaderWrapper">
                    <span className="ddMailHeading">Send Email To</span>
                </div>
                <div className="inputWrapper">
                    <span className='ddMailText'>To:</span> 
                    <input type="text" className = "ddMailInput" onChange = {(e) =>handleToEmailChange(e)}/>
                </div>
                  <div className='errorMessageEmailModal'>
                  {isErrorTo ? <div><ErrorMessage
                            errorMessage={"Please Enter Valid Email"}
                          /></div> : null}
                  </div>
                <div className="inputWrapper">
                    <span className='ddMailText'>CC:</span> 
                    <input type="text" className = "ddMailInput" onChange = {(e) =>handleCCEmailChange(e)}/>
                </div>
                <div className='errorMessageEmailModal'>
                  {isErrorCc ? <div><ErrorMessage
                            errorMessage={"Please Enter Valid Email"}
                          /></div> : null}
                  </div>
                <div className="sendEmailIconWrapper">
                    <img src={sendEmailIcon} 
                        className = {`sendEmailIcon ${disableSend ? "disable-pointer-events" : ""}` }
                        alt="send Email"  
                        onClick={() => sendCsvFileOnEmail()}
                        />
                </div>
           
            </div>
        
        </>
    );


};

// const mapStateToProps = (state, ownProps) =>{
//     return{
//         callReportCsvFile: state.callReportReducer.callReportCsvFile
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(Object.assign({}, callReportAction), dispatch);
//}

//export default connect(mapStateToProps, mapDispatchToProps)(SendEmailForm);;

export default SendEmailForm;