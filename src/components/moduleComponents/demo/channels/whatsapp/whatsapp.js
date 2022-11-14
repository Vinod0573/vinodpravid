import React, { useEffect, useState } from 'react';
import accountSetup from "../../../../../theme/assets/svg/demo/accountSetup.svg";
import profileSetup from "../../../../../theme/assets/svg/demo/profileSetup.svg";
import buisnessContactIcon from "../../../../../theme/assets/svg/demo/buisnessContact.svg";
import Info from "../../../../../theme/assets/svg/demo/infoIcon.svg";
import UploadIcon from "../../../../../theme/assets/svg/demo/uploadIcon.svg";
import ReactTooltip from "react-tooltip";
import ErrorMessage from "../../../../generic/errorMessage/ErrorMessage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setPageNo} from "../../../../../redux/integration/actions"
import BackIcon from "../../../../../theme/assets/svg/demo/backIcon.svg";
import {
    emailValidation,
    nameValidation,
    webValidation
  } from "../../../../../utils/Validation";


function Whatsapp(props) {
    const [whatsappProfile, setWhatsappProfile] = useState(["Company Registered Name", "Whatsapp Display Name", "Brief About Business", "Display Photo", "Business Address", "Business Description", "Industry", "Email", "Website"])
    const [buisnessContact, setBuisnessContact] = useState(["POC Name", "Designation", "Email", "Phone"])
    const [uploadName, setUploadName] = useState("")
    const [isError,setIsError]=useState([])
    const[validEmail , setValidEmail] = useState(false)
    const [validWebsite,setValidWebsite]=useState(false)
    const[validNumber , setValiNumber] = useState(false)
    const[phoneNumber , setPhoneNumber] = useState()
    const [validBusinessEmail,setValidBusinessEmail]=useState(false)
    const [dataList,setDataList]=useState({
        // "facebook-Business-id":"",
        // "Company Registered Name":"",
        // "Whatsapp Display Name":"",
        // "Brief About Business":"",
        // "Business Address":"",
        // "Business Description":"",
        // "Industry":"",
        // "Email":"",
        // "Website":"",
        // "contact":"",
        // "POC Name":"",
        // "Designation":"",
        // "Buisness-Email":"",
        // "Phone":""
        })
    const [steps, setSteps] = useState("1")
    const [userCreditials, setUserCreditials] = useState({
        pocEmail: null,
        pocName: null,
        phoneNumber: null,
        senderNumber: null,
        displayName: null,
      });
      const [errorHandle, setErrorHandle] = useState({
        pocEmailInvalid: null,
        pocNameInvalid: null,
        phoneNumberInvalid: null,
        senderNumberInvalid: null,
        displayNameInvalid: null,
        allError: null,
      });
      
    const openAdminModal = () => {

        document.getElementById('fileButton').click();

        document.getElementById('fileButton').onchange = () => {
            setUploadName(document.getElementById('fileButton').files[0]["name"])
            // setPath(document.getElementById('fileButton').files[0])
            // CSVImportGetHeaders(document.getElementById('fileButton').files[0])
        }


    }

    const goBack = () => {
        props.setPageNo("SET_PAGE_NO_WHATSAPP", 1)
    }
    const setData=(e)=>{
        let temp=Object.assign({},dataList)

       
           
            if(Object.keys(temp).includes(e.target.name)){
           
                temp[e.target.name]=e.target.value
            }else{
                temp[e.target.name]=e.target.value
               
        
           }
        setDataList(temp)
    }

    useEffect(()=>{
        props.receiveData(dataList)
    },[dataList])

    const handleFocusOnEmail=(e)=>{
        const checkingBusiness = emailValidation(dataList["Business Email"]);
        const checkingEmailLP = emailValidation(dataList["Email"]);
        const checkWebsite= webValidation(dataList["Website"]);
        const checkingPhoneNumberLP = (dataList["contact"]?.length<10 || dataList["contact"]?.length>10)?false:true;
        if (!checkingEmailLP.isValid) {
          setValidEmail(prev =>false)
        }
        else{
          setValidEmail(prev =>true)
        }
        // alert(webValidation(dataList["Website"]))
        if(checkWebsite==false){
            setValidWebsite(prev =>false)
        }
        else{
            setValidWebsite(prev =>true)
        }
        if (checkingPhoneNumberLP==false) {
            setValiNumber(prev => false)
          }
          else{
            setValiNumber(prev => true)
          }
          if(!checkingBusiness.isValid){
            setValidBusinessEmail(prev => false)
          }else{
            setValidBusinessEmail(prev => true)
          }

          
    }

    // console.log(Object.keys(dataList))

    return (

        <>
            {
                props.pageNo == 1 ?

                    <>
                        <div className="core-data">
                            <div className='row'>
                                <div className='icon-sec'>
                                    <img className="content-img" src={accountSetup} />
                                </div>

                                <div className='main-sec' >
                                    <div className='m-heading'>Whatsapp Account Setup</div>

                                </div>
                                <div className='last-sec'></div>
                                <div className='info-sec'></div>
                            </div>

                            <div className='row'>
                                <div className='icon-sec'>

                                </div>
                                <div className='main-sec'>
                                    Facebook Business Manager ID
                                </div>

                                <div className='last-sec fb-id'>

                                    <input
                                        type="text"
                                        placeholder={"Enter ID"}
                                        className="channel-input"
                                        name="facebook-Business-id"
                                        onChange={(e)=>setData(e)}
                                        value={dataList["facebook-Business-id"]}
                                    // onChange={(e) => setjobName(e.target.value)}
                                    />

                                </div>
                                {/* {
                                    dataList && Object.keys(dataList).includes("facebook-Business-id") &&dataList["facebook-Business-id"].length==0 ?
                                    <ErrorMessage
                                    errorMessage="Please Enter Facebook ID"
                                /> : <div style={{visibility:"hidden"}}>
                                        { `Please Enter ID`}
                                    </div>
                                } */}
                             
                                <div className='info-sec'>
                                    <p
                                        data-for='path'
                                        data-tip="1)Your business will be identified by a phone number on WhatsApp, known as the Business Contact number.
                                                <br/>
                                                2)The phone number should preferably be a mobile number (SIM or virtual) or a landline phone number, which has SMS and/or Voice calling facility enabled.<br/>
                                                3)This is because WhatsApp sends an OTP for two factor authentication via SMS or Voice."
                                                                >
                                        <img src={Info} />
                                    </p>
                                    <ReactTooltip id='path' html={true} />
                                    {/* <img src={Info} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="core-data">
                            <div className='row'>
                                <div className='icon-sec'>
                                    <img className="content-img" src={profileSetup} />
                                </div>

                                <div className='main-sec' >
                                    <div className='m-heading'>Whatsapp Profile Setup</div>

                                </div>
                                <div className='last-sec'></div>
                                <div className='info-sec'></div>
                            </div>
                            {
                                whatsappProfile.map((each ,i) => {
                                    return <div className='row' key={i}>
                                        <div className='icon-sec'>
                                        </div>
                                        <div className='main-sec'>
                                            {each}
                                        </div>
                                        <div className='last-sec'>
                                            {((each == "Business Address") || (each == "Business Description")) ?
                                                <><textarea
                                                    className={`${(each == "Business Address") || (each == "Business Description") ? "channel-text-area increase-width" : "channel-text-area"}`}
                                                    type="text"
                                                    name={each}
                                                    placeholder={`Enter ${each}`}
                                                    onChange={(e)=>setData(e)}
                                                    value={dataList[each]}
                                                />
                                                {
                                                    dataList && Object.keys(dataList).includes(each) &&dataList[each].length==0 ?
                                    
                                                    <ErrorMessage
                                                        errorMessage={`Please Enter ${each}`}
                                                    /> : <div style={{visibility:"hidden"}}>
                                                            { `Please Enter ${each}`}
                                                        </div>
                                                }</>
                                                : (each == "Display Photo") ?
                                                    <> <div className='profile-photo'>
                                                        <input
                                                            className={`${(each == "Business Address") || (each == "Business Description") ? "increase-width" : ""}`}
                                                            placeholder={`Upload ${each}`}
                                                            disabled={(each == "Display Photo") ? true : false}
                                                            value={uploadName}
                                                            
                                                        />
                                                        <input
                                                            type="file"
                                                            accept=".jpeg,.jpg,.png"
                                                            id="fileButton"
                                                            hidden
                                                        />
                                                        <div onClick={() => { openAdminModal() }} ><img src={UploadIcon} /></div>
                                                    </div>
                                                   
                                                          {
                                                            dataList && Object.keys(dataList).includes(each) &&dataList[each].length==0 ?
                                                        <ErrorMessage
                                                            errorMessage="Please Enter Facebook ID"
                                                        /> : <div style={{visibility:"hidden"}}>
                                                                { `Please Upload ${each}`}
                                                            </div>}</>
                                                    : <><input
                                                        className={`${(each == "Business Address") || (each == "Business Description") ? "channel-input increase-width" : "channel-input"}`}
                                                        type="text"
                                                        placeholder={`Enter ${each}`}
                                                        name={each}
                                                        // imgSrc={each == "Display Photo" ? buisnessContactIcon : ""}
                                                        onChange={(e)=>setData(e)}
                                                        value={dataList[each]}
                                                        onBlur={handleFocusOnEmail}
                                                    // onChange={(e) => setjobName(e.target.value)}
                                                    />
                                                    
                                                    { (dataList["Email"]?.length>0 &&each=="Email" &&  validEmail==false)?
                                                     <ErrorMessage
                                                     errorMessage={`Please Enter a valid Email`}
                                                        />:
                                                        (dataList["Website"]?.length>0 && each=="Website" && validWebsite==false)?
                                                        <ErrorMessage
                                                        errorMessage={`Please Enter a valid Website`}
                                                           />
                                                    :dataList && Object.keys(dataList).includes(each) &&dataList[each].length==0 ?
                                                        <ErrorMessage
                                                            errorMessage={`Please Enter ${each}`}
                                                        />
                                                    : <div style={{visibility:"hidden"}}>
                                                       { `Please Enter ${each}`}
                                                    </div>
                                                    }</>


                                            }

                                        </div>
                                        <div className='info-sec'></div>
                                    </div>
                                })
                            }

                        </div></> :

                    <>
                        {/* <div onClick={() => { goBack() }} className="back-icon">
                            <img src={BackIcon} />
                        </div> */}

                        <div className="core-data">
                            <div className='row'>
                                <div className='icon-sec'>
                                    <img className="content-img" src={phoneNumber} />
                                </div>

                                <div className='main-sec' >
                                    <div className='m-heading'>Whatsapp Phone Number</div>

                                </div>
                                <div className='last-sec'></div>
                                <div className='info-sec'>

                                </div>
                            </div>

                            <div className='row'>
                                <div className='icon-sec'>

                                </div>
                                <div className='main-sec'>
                                    contact
                                </div>

                                <div className='last-sec'>
                                    <input
                                        className="channel-input"
                                        type="number"
                                        placeholder={`Enter Contact`}
                                        // value={jobName} 
                                        name="contact"
                                        onChange={(e)=>setData(e)}
                                        value={dataList["contact"]}
                                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                                       onWheel= {(e) => {return (e.target).blur()}}
                                    // onChange={(e) => setjobName(e.target.value)}
                                    />{ dataList["contact"]?.length !=10?
                                    <ErrorMessage
                                    errorMessage={`Please Enter a valid 10 digit contact number`}
                                    />:
                                        dataList && Object.keys(dataList).includes("contact") &&dataList["contact"].length==0 ?
                                    <ErrorMessage
                                        errorMessage={`Please Enter Contact`}
                                    /> : <div style={{visibility:"hidden"}}>
                                            { `Please Enter contact`}
                                        </div>
                                }

                                </div>
                                <div
                                    className='info-sec'

                                >

                                    <>
                                        <p
                                            data-for='path'
                                            data-tip="1) WhatsApp uses Facebook Business Manager tools for administration and management<br/>
                                      of your WhatsApp Business account.<br/>
                                    2) Since we have a implementation partner, we require your  business's existing Business<br/>
                                    Manager account number so we can share it with the WhatsApp team
                                    <br/>
                                     for setup of your WhatsApp Business account (WABA)"
                                        >
                                            <img src={Info} />
                                        </p>
                                        <ReactTooltip id='path' html={true} />
                                    </>

                                </div>
                            </div>
                        </div>
                        <div className="core-data">
                            <div className='row'>
                                <div className='icon-sec'>
                                    <img className="content-img" src={buisnessContactIcon} />
                                </div>

                                <div className='main-sec' >
                                    <div className='m-heading'>Business Contact Details</div>

                                </div>
                                <div className='last-sec'></div>
                                <div className='info-sec'></div>
                            </div>

                            {
                                buisnessContact.map((each ,i) => {
                                    return <div className='row' key={i}>
                                        <div className='icon-sec'>
                                        </div>
                                        <div className='main-sec'>
                                            {each}
                                        </div>
                                        <div className='last-sec'>
                                            <input
                                                 className="channel-input"
                                                type="text"
                                                placeholder={`Enter ${each}`}
                                                // value={jobName} 
                                                name={each=="Email"?"Business Email":each}
                                                
                                                onChange={(e)=>setData(e)}
                                                value={each=="Email"?dataList["Business Email"]:dataList[each]}
                                                onBlur={handleFocusOnEmail}
                                            // onChange={(e) => setjobName(e.target.value)}
                                            />
                                            {(dataList["Business Email"]?.length>0 && each=="Email" &&  validBusinessEmail==false)?
                                                     <ErrorMessage
                                                     errorMessage={`Please Enter a valid Email`}
                                                        />:
                                                        (dataList["Phone"]?.length>0 && each=="Phone" &&  dataList["Phone"]?.length !=10)?
                                                     <ErrorMessage
                                                     errorMessage={`Please Enter a valid 10 digit contact number`}
                                                        />:(dataList["POC Name"]?.length>0 && each=="POC Name" &&  dataList["POC Name"]?.length !=0 && !nameValidation(dataList["POC Name"]).isValid)?
                                                        <ErrorMessage
                                                        errorMessage={nameValidation(dataList["POC Name"]).errors.message}
                                                           />:
                                                
                                              dataList && Object.keys(dataList).includes(each) &&dataList[each].length==0 ?
                
                                            <ErrorMessage
                                                errorMessage={`Please Enter ${each}`}
                                            />
                                            : <div style={{visibility:"hidden"}}>
                                            { `Please Enter ${each}`}
                                            </div>
                                        }
                                        </div>
                                        <div className='info-sec'>

                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageNo: state.integrationdReducer?.pageNo
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, setPageNo),
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Whatsapp);