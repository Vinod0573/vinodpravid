import React, { useEffect, useState } from 'react';

import accountSetup from "../../../../../theme/assets/svg/demo/accountSetup.svg";
import ErrorMessage from '../../../../generic/errorMessage/ErrorMessage';
import {
    emailValidation,
    nameValidation,
    phoneNumberValidation
} from "../../../../../utils/Validation";

function Email(props) {
    const [emailProfile, setEmailProfile] = useState(["POC Name", "POC Email ID", "POC Contact Number", "Registered Company Name", "Registered Company Address", "Sender Email ID", "Reply Email ID"])
    const [dataList, setDataList] = useState({
    })
    const [senderValidEmail, setSenderValidEmail] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [replyValidEmail, setReplyValidEmail] = useState(false)
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [validName, setValidName] = useState(false)
    const [errorHandle, setErrorHandle] = useState({
        pocNameInvalid: null,
        pocEmailInvalid: null,
        phoneNumberInvalid: null,
        senderEmailInvalid: null,
        replyEmailInvalid: null,
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

    useEffect(() => {
        props.receiveData(dataList);
    }, [dataList])

    useEffect(() => {
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
        if (dataList["Sender Email ID"]) {
            const checkingSenderEmail = emailValidation(dataList["Sender Email ID"]);
            if (!checkingSenderEmail.isValid) {
                setErrorHandle((previousState) => {
                    return {
                        ...previousState,
                        senderEmailInvalid: checkingSenderEmail.errors.message,
                    };
                });
                setSenderValidEmail(prev => false)
            }
            else {
                setSenderValidEmail(prev => true)
            }
        }
        if (dataList["Reply Email ID"]) {
            const checkingReplyEmail = emailValidation(dataList["Reply Email ID"]);
            if (!checkingReplyEmail.isValid) {
                setErrorHandle((previousState) => {
                    return {
                        ...previousState,
                        replyEmailInvalid: checkingReplyEmail.errors.message,
                    };
                });
                setReplyValidEmail(prev => false)
            }
            else {
                setReplyValidEmail(prev => true)
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
                        <div className='m-heading'>Email Account Setup</div>

                    </div>
                    <div className='last-sec'></div>
                    <div className='info-sec'></div>
                </div>
                {
                    emailProfile.map((each ,i) => {
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
                                            type={`${(each == "POC Contact Number") ? "number" : "text"}`}
                                            placeholder={`Enter ${each}`}
                                            value={dataList[each]}
                                            name={each}
                                            onChange={(e) => setData(e)}
                                            onKeyDown={(each == "POC Contact Number") ? (e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault() : null}
                                            onWheel={(each == "POC Contact Number") ? (e) => { return (e.target).blur() } : null}
                                        // onBlur={handleFocusOnEmail}
                                        // onChange={(e) => setjobName(e.target.value)}
                                        />
                                            {
                                                each == "POC Contact Number" && dataList["POC Contact Number"] && validPhoneNumber === false ?
                                                    errorHandle.phoneNumberInvalid && (
                                                        <ErrorMessage
                                                            errorMessage={errorHandle.phoneNumberInvalid}
                                                        />
                                                    ) :
                                                    each == "Sender Email ID" && dataList["Sender Email ID"] && senderValidEmail == false ?
                                                        errorHandle.senderEmailInvalid && (
                                                            <ErrorMessage
                                                                errorMessage={errorHandle.senderEmailInvalid}
                                                            />
                                                        ) :
                                                        each == "Reply Email ID" && dataList["Reply Email ID"] && replyValidEmail == false ?
                                                            errorHandle.replyEmailInvalid && (
                                                                <ErrorMessage
                                                                    errorMessage={errorHandle.replyEmailInvalid}
                                                                />
                                                            ) :
                                                            each == "POC Email ID" && dataList["POC Email ID"] && validEmail == false ?
                                                                errorHandle.pocEmailInvalid && (
                                                                    <ErrorMessage
                                                                        errorMessage={errorHandle.pocEmailInvalid}
                                                                    />
                                                                ) :
                                                                each == "POC Name" && dataList["POC Name"] && validName == false ?
                                                                    errorHandle.pocNameInvalid && (
                                                                        <ErrorMessage
                                                                            errorMessage={errorHandle.pocNameInvalid}
                                                                        />
                                                                    ) :
                                                                    dataList && Object.keys(dataList).includes(each) && dataList[each].length == 0 ?
                                                                        props.isBtnClick === true ? <div style={{ visibility: "hidden" }}>
                                                                            {`Please Enter ${each}`}
                                                                        </div> :
                                                                            <ErrorMessage
                                                                                errorMessage={`Please Enter ${each}`}
                                                                            />
                                                                        :
                                                                        <div style={{ visibility: "hidden" }}>
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

export default Email