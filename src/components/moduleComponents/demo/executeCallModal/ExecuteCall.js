import React, { useEffect, useState } from 'react'
import AddBtn from '../addBtn/AddBtn'
import flowIcon from "../../../../theme/assets/svg/demo/flowIcon.svg"
import languageIcon from "../../../../theme/assets/svg/demo/languageIcon.svg"
import "./ExecuteCall.css"
import executionBtn from "../../../../theme/assets/svg/demo/executionBtn.svg"
import InitiateCall from '../InitiateCallModal/InitiateCall'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import axios from 'axios'
// import * as loginAction from "../../../actions/loginActions";
import ErrorMessage from '../../../generic/errorMessage/ErrorMessage'

function ExecuteCall(props) {

  var tokendemoPage = window.sessionStorage.getItem("accessTokenDemoPage");
  var tokenlogin = props.userLoginInfo?.userSessionDetails?.accessToken;

  let accountName = props.userLoginInfo?.userDetail.accountDetails[0].name;
  let accountId = props.userLoginInfo?.userDetail.accountDetails[0].id;

  const [inputData, setInputData] = useState([
    {
      "contactInfo.primary": props.phoneNumber,
      "loanAccountDetails.emiAmount": "5000",
      "loanAccountDetails.emiDueDate": props.preDue ? "28-03-2022" : props.postEmi === "NPA" ? "23-12-2021" : "15-03-2022",
      "primaryInfo.firstName": props.name ? props.name : props.logname,
      "primaryInfo.flow": props.postEmi ? props.postEmi : (props.preDue?.length ? props.preDue : ""),
      "primaryInfo.language": props.language,
      "accessToken": tokendemoPage ? tokendemoPage : tokenlogin,
      "email.primary": props.email ? props.email : props.logemail,
      "clientId": accountId,
      "clientName": accountName,
      "botEndpoint": "https://voicedemo.saarthi.ai/demobot_english/webhook",
      "customerName" : "" ,
      "agentName" : "",
      "newClientName" :  ""
    },
  ]);
  const [errorHandle, setErrorHandle] = useState({
    mobilevalid: null,
    duedatevalid: null,
    dateValid: null,

  });

  const [initiatCall, setInitiatCall] = useState(false)
  const [disExecutebtn, setDisExecuteBtn] = useState(true)
  const[clientName , setClientName] = useState("")
  const[agentName , setAgentName] = useState("")
  const[focusAgent , seFocusAgent] = useState(false)

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputData];
    list[index][name] = value;
    setInputData(list);
  };

  const handleClientName =(e) => {
      setClientName(prev => e.target.value)
  }
  const handleAgentName =(e) => {
     setAgentName(prev => e.target.value)
  }

  const handleRemoveClick = (index) => {
    const list = [...inputData];
    list.splice(index, 1);
    setInputData(list);
  };



  const handleAddClick = () => {
    if (inputData?.length < 3) {
      setInputData([
        ...inputData,
        {
          "contactInfo.primary": "",
          "loanAccountDetails.emiAmount": "5000",
          "loanAccountDetails.emiDueDate": props.preDue ? "28-03-2022" : props.postEmi === "NPA" ? "23-12-2021" : "15-03-2022",
          "primaryInfo.firstName": props.name,
          "primaryInfo.flow": props.postEmi ? props.postEmi : (props.preDue?.length ? props.preDue : ""),
          "accessToken": tokendemoPage ? tokendemoPage : tokenlogin,
          "primaryInfo.language": props.language,
          "email.primary": '',
          "clientId": accountId,
          "clientName": accountName,
          "botEndpoint": "https://voicedemo.saarthi.ai/demobot_english/webhook",
          "customerName" : "",
          "agentName" : agentName?.length ? agentName : '',
          "newClientName" :  clientName?.length ?  clientName : ''
        },
      ]);
    }
  };
  const onExecute = () => {
    axios.post(`${process.env.REACT_APP_CONNECTOR === "staging-connectors.saarthi.ai" ? `https://${process.env.REACT_APP_CONNECTOR}/dialer/api/dialer/epicode/v1/initiateCall` :
      `https://connectors.saarthi.ai/campaign/api/campaignManagement/customerInfo/v1/demo`}`, inputData).then(
        e => console.log(e)
      )
    props.toShow(true)
  }
 console.log("demoData" , inputData , agentName , clientName)
  // useEffect(()=>{

  //   let temp=Object.assign([],inputData)
  //   temp[0]["contactInfo.primary"]=props.phoneNumber
  //   setInputData(temp)
  // },[props.phoneNumber])
  const callback = (data) => {
    props.callback(data)
  }
  // /^(\d{1,2})-(\d{1,2})-(\d{4})$/
  useEffect(
    () => {
      inputData?.map((e) => {

        if (e['contactInfo.primary']?.length === 10 &&
          e['loanAccountDetails.emiAmount']?.length
          && e["loanAccountDetails.emiDueDate"].match(/^((0[1-9]|1[0-9]|2[0-9]|3[0-1]))-((0[1-9]|1[0-2]))-(([0-9][0-9][0-9][0-9]))$/)
          && ( e["customerName"].match(/^[a-zA-Z ]{3,50}$/))
          && (e["newClientName"].match(/^[a-zA-Z ]{3,50}$/))
        ) {
          setDisExecuteBtn(prev => false)
        }
        else {
          setDisExecuteBtn(prev => true)
        }
      })
    }, [inputData]
  )
   // edit agent and client Name
   useEffect(
     () => {
       if(agentName){
         inputData?.map( e=> {
             e["agentName"] = agentName
           })
       }
       if(clientName){
         inputData?.map( e=> {
          e["newClientName"] = clientName
        })
       }

     }, [agentName?.length , clientName?.length]
   )


  return (
    <div> {initiatCall ? <InitiateCall tolast={props.tolast} />

      :
      <div className='executeCallDivWrapper'>
        <div className='executeCallDiv'>
          <div className='addBtnDiv' onClick={handleAddClick}>
            {inputData?.length < 3 ?
              <AddBtn /> : ""
            }
          </div>
          <div className='logoDiv'>

            <div className='headLogo'>
              <img src={flowIcon} width={"60px"}></img>
              <p>Flow :</p>
            </div>
            <div className='preEmi'>
              <p>{props.postEmi ? props.postEmi : (props.preDue?.length ? props.preDue : "")}</p>
            </div>
            <div className='headLogo'>
              <img src={languageIcon} width={"60px"}></img>
              <p>Language:</p>
            </div>
            <div className='preEmi'>
              <p>{props.language ? props.language : "Language"}</p>
            </div>


          </div>
            <div className='nameNewDemo'>
            <div>
                    <div className='labelforinput'>Client Name</div>
                    <input
                      type="text"
                      className="emiAmountInput"
                      name="newClientName"
                      placeholder="Client Name"
                      onChange={(e) => { return handleInputChange(e ,0) , handleClientName(e) }}
                      // value={each["customerName"]}
                      // value ={5000}
                       onKeyDown={e => ["+", "-", "." , "$" , "*" , "&"].includes(e.key) && e.preventDefault()}
                    />
                    <div className='errorDiv'>
                      { ! clientName.match(/^[a-zA-Z ]{3,50}$/)  ?
                        <ErrorMessage
                          errorMessage="Please Enter Valid Client Name" />
                        : ""
                      }
                    </div>
                  </div>
                  <div>
                    <div className='labelforinput'>Agent Name</div>
                    <input
                      type="text"
                      className="emiAmountInput"
                      name="agentName"
                      placeholder="Agent Name"
                      onChange={(e) => { return handleInputChange(e ,0) , handleAgentName(e) }}
                      // value={each["customerName"]}
                      // value ={5000}
                       onKeyDown={e => ["+", "-", "." , "$" , "*" , "&"].includes(e.key) && e.preventDefault()}
                      onFocus ={() => seFocusAgent(true) }
                      onBlur ={() => seFocusAgent(false)}
                    />
                    <div className='errorDiv'>
                      { ! agentName.match(/^[a-zA-Z ]{3,50}$/) && focusAgent  ?
                        <ErrorMessage
                          errorMessage="Please Enter Valid Name" />
                        : ""
                      }
                    </div>
                  </div>
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
                    <div className='labelforinput'>Mobile Number</div>
                    <input
                      type="number"
                      className="mobnumberInput"
                      name="contactInfo.primary"
                      placeholder="Enter Mobile Number"
                      onChange={(e) => handleInputChange(e, i)}
                      value={each["contactInfo.primary"]}
                      onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                      onWheel={(e) => { return (e.target).blur() }}
                    />
                    <div className='errorDiv'>
                      {each["contactInfo.primary"]?.length !== 10 ?
                        <ErrorMessage
                          errorMessage="Please Enter 10 Digit Valid Mobile Number" />
                        : ""
                      }
                    </div>

                  </div>
                  <div>
                    <div className='labelforinput'>Customer Name</div>
                    <input
                      type="text"
                      className="emiAmountInput"
                      name="customerName"
                      placeholder="Customer Name"
                      onChange={(e) => handleInputChange(e, i)}
                      value={each["customerName"]}
                      // value ={5000}
                       onKeyDown={e => ["+", "-", "." , "$" , "*" , "&"].includes(e.key) && e.preventDefault()}
                      // onWheel={(e) => { return (e.target).blur() }}
                    />
                    <div className='errorDiv'>
                      { ! each["customerName"].match(/^[a-zA-Z ]{3,50}$/)  ?
                        <ErrorMessage
                          errorMessage="Please Enter Valid Name" />
                        : ""
                      }
                    </div>
                  </div>
                  <div>
                    <div className='labelforinput'>EMI Amount</div>
                    <input
                      type="number"
                      className="emiAmountInput"
                      name="loanAccountDetails.emiAmount"
                      placeholder="EMI Account"
                      onChange={(e) => handleInputChange(e, i)}
                      value={each["loanAccountDetails.emiAmount"]}
                      // value ={5000}
                      onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                      onWheel={(e) => { return (e.target).blur() }}
                    />
                    <div className='errorDiv'>
                      {each["loanAccountDetails.emiAmount"].length === 0 ?
                        <ErrorMessage
                          errorMessage="Please Enter Emi Amount" />
                        : ""
                      }
                    </div>
                  </div>
                  <div style={{ width: "200px" }}>
                    <div className='labelforinput'>Due Date</div>
                    <input
                      type="text"
                      className="emiAmountInput"
                      name="loanAccountDetails.emiDueDate"
                      placeholder="Due Date"
                      onChange={(e) => handleInputChange(e, i)}
                      value={each["loanAccountDetails.emiDueDate"]}

                    />
                    <div className='errorDiv'>
                      {each["loanAccountDetails.emiDueDate"].match(/^((0[1-9]|1[0-9]|2[0-9]|3[0-1]))-((0[1-9]|1[0-2]))-(([0-9][0-9][0-9][0-9]))$/) ?
                        "" :
                        <ErrorMessage
                          errorMessage="Please Enter Valid Date in DD-MM-YYYY Format" />

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
              className={`exeBtn ${disExecutebtn ? "disablePointerEventUniversal" : ""}`}
              onClick={() => { return onExecute(), setInitiatCall(prev => true) }}

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
    phoneNumber: state.demoReducer.phoneNumber?.phoneNumber,
    logname: state.loginReducer.userLoginInfo?.userDetail?.name,
    logemail: state.loginReducer.userLoginInfo?.userDetail?.email,
    language: state.demoReducer.demoAgentConfigurationData.demoLanguage,
    postEmi: state.demoReducer.demoAgentConfigurationData.postEmiData,
    preDue: state.demoReducer.demoAgentConfigurationData.preEMiData,
    userLoginInfo: state.loginReducer.userLoginInfo,
    name: state.demoReducer.phoneNumber?.name,
    email: state.demoReducer.phoneNumber?.email,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteCall);