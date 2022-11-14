import React, { useEffect, useState } from 'react';
import "./sms.css"

import accountSetup from "../../../../../theme/assets/svg/demo/accountSetup.svg";
import ErrorMessage from '../../../../generic/errorMessage/ErrorMessage';
import {
  emailValidation,
  nameValidation,
  phoneNumberValidation
} from "../../../../../utils/Validation";

function SMS(props) {
  const [smsProfile, setSmsProfile] = useState(["POC Name", "POC Email ID", "POC Contact Number", "Registered Company Name", "Registered Company Address", "Sender Phone Number", "Display Name"])
  const [dataList, setDataList] = useState({
  })

  const [validEmail, setValidEmail] = useState(false)
  const [validName, setValidName] = useState(false)
  const [validPhoneNumber, setValidPhoneNumber] = useState(false)
  const [validSenderPhoneNumber, setValidSendePhoneNumber] = useState(false)
  const [validDisplayName, setValidDisplayName] = useState(false)
  const [errorHandle, setErrorHandle] = useState({
    pocEmailInvalid: null,
    pocNameInvalid: null,
    phoneNumberInvalid: null,
    senderNumberInvalid: null,
    displayNameInvalid: null,
    allError: null,
  });

  const setData = (e) => {
    let temp = Object.assign({}, dataList)
    if (Object.keys(temp).includes(e.target.name)) {
      temp[e.target.name] = e.target.value
    } else {
      temp[e.target.name] = e.target.value
    }
    setDataList(temp)
  }

  if (props.isBtnClick === true) {
    for (let val in dataList) {
      dataList[val] = "";
    }
  }


  useEffect(() => {
    props.receiveData(dataList)
  }, [dataList])



  useEffect(() => {
    if (dataList["POC Contact Number"]) {
      const checkingPhoneNumberLP = phoneNumberValidation(dataList["POC Contact Number"]);
      if (!checkingPhoneNumberLP.isValid) {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            phoneNumberInvalid: checkingPhoneNumberLP.errors.message,
          };
        });
        setValidPhoneNumber(prev => false)
      }
      else {
        setValidPhoneNumber(prev => true)

      }

    }
    if (dataList["Sender Phone Number"]) {
      const checkingSenderNumberLP = phoneNumberValidation(dataList["Sender Phone Number"]);
      if (!checkingSenderNumberLP.isValid) {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            senderNumberInvalid: checkingSenderNumberLP.errors.message,
          };
        });
        setValidSendePhoneNumber(prev => false)
      }
      else {
        setValidSendePhoneNumber(prev => true)

      }
    }
    if (dataList["POC Name"]) {
      const checkingPocNameLP = nameValidation(dataList["POC Name"]);
      if (!checkingPocNameLP.isValid) {
        setErrorHandle({
          ...errorHandle,
          pocNameInvalid: checkingPocNameLP.errors.message
        })
        setValidName(prev => false)
      }
      else {
        setErrorHandle({ ...errorHandle, pocNameInvalid: null })
        setValidName(prev => true)
      }
    }
    if (dataList["Display Name"]) {
      const checkingDisplayNameLP = nameValidation(dataList["Display Name"]);
      if (!checkingDisplayNameLP.isValid) {
        setErrorHandle({ ...errorHandle, displayNameInvalid: checkingDisplayNameLP.errors.message })
        setValidDisplayName(prev => false)
      }
      else {
        setErrorHandle({ ...errorHandle, displayNameInvalid: null })
        setValidDisplayName(prev => true)
      }
    }
    if (dataList["POC Email ID"]) {
      const checkingEmailLP = emailValidation(dataList["POC Email ID"]);
      if (!checkingEmailLP.isValid) {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            pocEmailInvalid: checkingEmailLP.errors.message,
          };
        });
        setValidEmail(prev => false)
      }
      else {
        setValidEmail(prev => true)
      }
    }

  }, [dataList])

  if (props.isBtnClick === true) {
    for (let val in dataList) {
      dataList[val] = "";
    }
  }


  return (
    <>
      <div className="core-data">
        <div className='row'>
          <div className='icon-sec'>
            <img className="content-img" src={accountSetup} />
          </div>

          <div className='main-sec' >
            <div className='m-heading'>SMS Account Setup</div>

          </div>
          <div className='last-sec'></div>
          <div className='info-sec'></div>
        </div>
        {
          smsProfile.map((each ,i) => {
            return <div className='row' key={i}>
              <div className='icon-sec'>
              </div>
              <div className='main-sec'>
                {each}
              </div>
              <div className='last-sec'>
                {
                  (each == "Registered Company Address") ?
                    <><textarea
                      className={`${(each == "Registered Company Address") ? "channel-text-area increase-width" : "channel-text-area"}`}
                      type="text"
                      placeholder={`Enter ${each}`}
                      value={dataList[each]}
                      onChange={(e) => setData(e)}
                      name={each}
                    />
                      {
                        dataList && Object.keys(dataList).includes(each) && dataList[each].length == 0 ?
                          props.isBtnClick === true ? <div style={{ visibility: "hidden" }}>
                            {`Please Enter ${each}`}
                          </div> :
                            <ErrorMessage
                              errorMessage={`Please Enter ${each}`}
                            /> : <div style={{ visibility: "hidden" }}>
                            {`Please Enter ${each}`}
                          </div>
                      }</> :
                    <> <input
                      className={`${(each == "Registered Company Address") ? "channel-input increase-width" : "channel-input"}`}
                      type={`${(each == "POC Contact Number" || each == "Sender Phone Number") ? "number" : "text"}`}
                      placeholder={`Enter ${each}`}
                      value={dataList[each]}
                      name={each}
                      onChange={(e) => setData(e)}
                      onKeyDown={(each == "POC Contact Number" || each == "Sender Phone Number") ? (e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault() : null}
                      onWheel={(each == "POC Contact Number" || each == "Sender Phone Number") ? (e) => { return (e.target).blur() } : null}
                    // onBlur={handleFocusOnEmail}
                    // onChange={(e) => setjobName(e.target.value)}
                    />
                      {
                        (each == "POC Contact Number" && dataList["POC Contact Number"] && validPhoneNumber == false) ?
                          errorHandle.phoneNumberInvalid && (
                            <ErrorMessage
                              errorMessage={errorHandle.phoneNumberInvalid}
                            />
                          ) :
                          each == "POC Email ID" && dataList["POC Email ID"] && validEmail == false ?
                            errorHandle.pocEmailInvalid && (
                              <ErrorMessage
                                errorMessage={errorHandle.pocEmailInvalid}
                              />
                            ) :
                            each == "Sender Phone Number" && dataList["Sender Phone Number"] && validSenderPhoneNumber == false ?
                              errorHandle.senderNumberInvalid && (
                                <ErrorMessage
                                  errorMessage={errorHandle.senderNumberInvalid}
                                />
                              ) :
                              each == "POC Name" && dataList["POC Name"] && validName == false ?
                                errorHandle.pocNameInvalid && (
                                  <ErrorMessage
                                    errorMessage={errorHandle.pocNameInvalid}
                                  />
                                ) :
                                each == "Display Name" && dataList["Display Name"] && validDisplayName == false ?
                                  errorHandle.displayNameInvalid && (
                                    <ErrorMessage
                                      errorMessage={errorHandle.displayNameInvalid}
                                    />
                                  ) :
                                  dataList && Object.keys(dataList).includes(each) && dataList[each].length == 0 ?
                                    props.isBtnClick === true ? <div style={{ visibility: "hidden" }}>
                                      {`Please Enter ${each}`}
                                    </div> :
                                      <ErrorMessage
                                        errorMessage={`Please Enter ${each}`}
                                      /> : <div style={{ visibility: "hidden" }}>
                                      {`Please Enter ${each}`}
                                    </div>
                      }</>
                }
              </div>
              <div className='info-sec'></div>
            </div>
          })
        }

      </div>


    </>
  )
}

export default SMS
