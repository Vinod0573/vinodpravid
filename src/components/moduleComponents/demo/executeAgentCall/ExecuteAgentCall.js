import React, { useEffect, useState } from 'react'
import AddBtn from '../addBtn/AddBtn'
import "./ExecuteAgentCall.css"
import executionBtn from "../../../../theme/assets/svg/demo/executionBtn.svg"
import InitiateCall from '../InitiateCallModal/InitiateCall'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import axios from 'axios'
// import * as loginAction from "../../../actions/loginActions";
import ErrorMessage from '../../../generic/errorMessage/ErrorMessage';
import {
  phoneNumberValidation,
} from "../../../../utils/Validation";

function ExecuteCall(props) {

  var tokendemoPage = window.sessionStorage.getItem("accessTokenDemoPage");
  var tokenlogin = props.userLoginInfo?.userSessionDetails?.accessToken;
  let accountName = props.userLoginInfo?.userDetail.accountDetails[0].name;
  let accountId = props.userLoginInfo?.userDetail.accountDetails[0].id;

    const [inputData, setInputData] = useState([
        { "contactInfo.primary": props.phoneNumber, 
        "loanAccountDetails.emiAmount": "5000", 
        "loanAccountDetails.emiDueDate": props.preDue ? "28-03-2022" : props.postEmi ==="NPA" ? "23-12-2021" : "15-03-2022",
        "primaryInfo.firstName":props.name  ? props.name : props.logname, 
        "primaryInfo.flow":props.postEmi ? props.postEmi: (props.preDue?.length ? props.preDue :"" ), 
        "primaryInfo.language": props.language,
        "accessToken":tokendemoPage ? tokendemoPage : tokenlogin,
        "email.primary" : props.email ? props.email : props.logemail,
        "agentNumber": "",
        "clientId": accountId,
        "clientName": accountName,
      },
      ]);
      const [errorHandle, setErrorHandle] = useState({
        mobilevalid: null,
        duedatevalid: null,
        dateValid: null,
       
      });
      
      const[initiatCall , setInitiatCall] =useState(false);
      const[disExecutebtn , setDisExecuteBtn] = useState(true);
      const [validAgentNumber,setValidAgentNumber]=useState(false);
      const [validCustomerNumber,setValidCustomerNumber]=useState(false)

      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputData];
        list[index][name] = value;
        setInputData(list);
      };
// "primaryInfo.firstName":"Jeevan",
// "contactInfo.primary":"8884974479",
// "loanAccountDetails.emiAmount":"1000",
// "loanAccountDetails.emiDueDate":"21-03-2022",
// "primaryInfo.flow":"Post EMI",
// "primaryInfo.language":"English",
// "accessToken":"testing"
    
      const handleRemoveClick = (index) => {
        const list = [...inputData];
        list.splice(index, 1);
        setInputData(list);
      };
      
      

      const handleAddClick = () => {
          if(inputData?.length <3){
        setInputData([
          ...inputData,
          { "contactInfo.primary": "",
           "loanAccountDetails.emiAmount": "5000",
            "loanAccountDetails.emiDueDate":props.preDue ? "28-03-2022" : props.postEmi ==="NPA" ? "23-12-2021" : "15-03-2022",
          "primaryInfo.firstName":props.name,
          "primaryInfo.flow": props.postEmi ? props.postEmi: (props.preDue?.length ? props.preDue :"" ),
          "accessToken":tokendemoPage ? tokendemoPage : tokenlogin,
          "primaryInfo.language": props.language,
          "email.primary" : '',
          "agentNumber": "",
          "clientId": accountId,
          "clientName": accountName
        },
        ]);
    }
      }; 
      const onExecute = () => {
        axios.post(`https://${process.env.REACT_APP_CONNECTOR}/dialer/api/dialer/epicode/v1/initiateCall`,inputData).then(
          e => console.log(e)
        )
        props.toShow(true)
      }
      // useEffect(()=>{
       
      //   let temp=Object.assign([],inputData)
      //   temp[0]["contactInfo.primary"]=props.phoneNumber
      //   setInputData(temp)
      // },[props.phoneNumber])
      const callback =(data) => {
        props.callback(data)
      }
   // /^(\d{1,2})-(\d{1,2})-(\d{4})$/
       useEffect(
         () => {
           inputData?.map((e) => {
            //  console.log(e['contactInfo.primary'])
             if(e['contactInfo.primary']?.length ===10 && 
                e['agentNumber']?.length === 10){
              setDisExecuteBtn(prev => false)
             }
             else{
               setDisExecuteBtn(prev => true)
             }
             if(e['agentNumber']){
              const checkingAgentNumber = phoneNumberValidation(e['agentNumber']);
        
              if(!checkingAgentNumber.isValid){
                setValidAgentNumber(prev => false)
              }else{
                setValidAgentNumber(prev => true)
              }
             }
             
              })
              
         },[inputData]
       )

    
  return ( 
      <div> {initiatCall ? <InitiateCall tolast ={props.tolast}/>
          
    :
    <div className='executeAgentCallWrapper'>
         <div className='executeCallDiv'>
             <div className='addBtnDiv' onClick={handleAddClick}>
                {inputData?.length <3 ?
                 <AddBtn/> : ""
                }
             </div>
                 
             <div className='InputDiv'>
             {inputData.map((each, i) => {
            return (
              <div className="inputFieldDiv" key={i}>
                <div >
                  <p>{i + 1}</p>
                   <div className='errorDiv'> </div>
                </div>
                <div>
                  <div className='labelforinput'>Customer Number</div>
                  <input
                    type="number"
                    className="mobnumberInput"
                    name="contactInfo.primary"
                    placeholder="Enter Customer Number"
                    onChange={(e) => handleInputChange(e, i)}
                    value={each["contactInfo.primary"]}
                    onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                    onWheel= {(e) => {return (e.target).blur()}}
                    // onBlur={handleFocusOnCustomer}
                  />
                   <div className='errorDiv'>
                   {each["contactInfo.primary"]?.length !==10?
                    <ErrorMessage 
                    errorMessage = "Please Enter 10 Digits Customer Number" />
                    : ""
                     }
                    </div>
                  
                </div>
                <div>
                <div className='labelforinput'>Agent Number</div>
                  <input
                    type="number"
                    className="emiAmountInput"
                    name="agentNumber"
                    placeholder="Agent Number"
                    onChange={(e) => handleInputChange(e, i)}
                    value={each["agentNumber"]}
                    // value ={5000}
                    onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                    onWheel= {(e) => {return (e.target).blur()}}
                  />
                  <div className='errorDiv' key={i}>
                  {each["agentNumber"] && validAgentNumber===false?
                    <ErrorMessage 
                    errorMessage = "Please Enter 10 Digits Agent Number"
                     />
                    : ""
                     }
                    </div>
                </div>
                <div>
                  {inputData.length !== 1 ? (
                    <div
                      onClick={() => handleRemoveClick(i)}
                      className="minusSign"
                    >
                      <p>
                          {/* <img src={minusIcon}></img> */}
                          <div> -</div>
                          <div className='errorDiv'> </div>
                      </p>
                     
                    </div>
                  ) : (
                     <div className="minusSign"> </div>
                  )}
                </div>
              </div>
            );
          })}
             </div>
             <div className='btnContainer'>
                  
                  <div 
                  className ={`exeBtn ${disExecutebtn ? "disablePointerEventUniversal"  : ""}`}
                  onClick={() => { return onExecute(),setInitiatCall(prev => true)}}
                 
                    >
                      <img src={executionBtn} width={"40px"}></img>
                      <p> Execute Call</p>
                  </div>
                 
                 
             </div>
         </div>
         </div>
}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
     phoneNumber:state.demoReducer.phoneNumber?.phoneNumber,
     logname: state.loginReducer.userLoginInfo?.userDetail?.name,
     logemail :state.loginReducer.userLoginInfo?.userDetail?.email,
     language: state.demoReducer.demoAgentConfigurationData.demoLanguage,
     postEmi: state.demoReducer.demoAgentConfigurationData.postEmiData,
     preDue: state.demoReducer.demoAgentConfigurationData.preEMiData,
     userLoginInfo:state.loginReducer.userLoginInfo,
     name: state.demoReducer.phoneNumber?.name,
     email :state.demoReducer.phoneNumber?.email,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteCall);

