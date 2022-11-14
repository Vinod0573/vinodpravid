import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../../components/generic/errorMessage/ErrorMessage'
import { useSelector, useDispatch } from "react-redux";
import './DemoLogIn.css'
import nameIcon from '../../../theme/assets/svg/demo/nameIcon.svg'
import DropDown from "../../../components/generic/dropdownsaarthi2/DropdownSaarthi"
// import dropdownRightIcon from "../../assets/clientadmin/DropdownIcon.svg"
import downArrow from "../../../theme/assets/svg/demo/downArrowIcon.svg"
import dropdownIcon from "../../../theme/assets/svg/demo/dropdownIcon.svg"
import emailIcon from "../../../theme/assets/svg/demo/emailIcon.svg"
import phoneIcon from "../../../theme/assets/svg/demo/phoneIcon.svg"
import tcIcon from "../../../theme/assets/svg/demo/t&cIcon.svg"
import axios from "axios"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setDemoPage , setPhoneNumberdemo} from "../../../redux/demo/actions";
import { setIsActivePageType } from '../../../redux/onboarding/login/actions';

import { DEMO_SERVER_URL , DEMO_URL} from "../../../services/ApiRoutes"
import {
    emailValidation,
    nameValidation,
    phoneNumberValidation
  } from "../../../utils/Validation";
import isoIcon from "../../../theme/assets/svg/demo/isoIcon.svg"
import TandC from '../../../components/moduleComponents/demo/temsAndConditionModal/TandC'
import AgentPage from '../agentConfiguration/AgentPage'
import ProgressBar from '../../../components/generic/progressBar/ProgressBar'

function DemoLogIn() {
    const[selectedItem , setSelectedItem] = useState("")
    const[showTandCModal , setShowTandCModal]= useState(false)
    const[validName , setValidName] = useState(false)
    const[validEmail , setValidEmail] = useState(false)
    const[validNumber , setValiNumber] = useState(false)
    const[validRole , setValidRole] = useState(false)
    const[ submitBtn,setSubmitBtn] = useState(false)
    const[phoneNumber , setPhoneNumber] = useState()
    const[allRole , setAllRole] = useState([])
    const[role , setRole] = useState([ 
        "Chief Risk Officer" , "Collection Manager", "Campaign Manager" , "Campaign Analyst" , "Guest"
    ])
    const[showIso , setIso] = useState(false)
   const[comeFromAgent , setComeFromAgent] = useState(true)
    const [userCreditials, setUserCreditials] = useState({
        email: null,
        name: null,
        phoneNumber: null,
        role: null
      });
      const [errorHandle, setErrorHandle] = useState({
        emailInvalid: null,
        nameInvalid: null,
        phoneNumberInvalid: null,
        allError: null,
      });
      const [checkedData,setCheckedData]=useState(false)
      const[agentPage , setAgentPage] = useState(false)

      const dispatch = useDispatch()
      const userLoginInfo = useSelector(
        (store ) => store?.loginReducer?.userLoginInfo
      )
      const demopageIcon = useSelector(
        (store) => store?.demoReducer?.demopage,
      )
     
      const handleChangeEmail = (e) => {
        const temp = e.target.value;
        setUserCreditials((previousState) => {
          return {
            ...previousState,
            email: temp,
          };
        });
        handleFocusOnEmail()
      };
      const handleChangeName = (e) => {
        const temp = e.target.value;
        setUserCreditials((previousState) => {
          return {
            ...previousState,
            name: temp,
          };
        });
        handleFocusOnName(e.target.value)
      };
      var invalidChars = [
        "-",
        "+",
        "e",
        ""
      ];
       const handleExtraCase = (e) => {
       
        if (invalidChars.includes(e.key) ) {
          e.preventDefault();
        }
       }
      const handleChangePhoneNumber =  (e) => { 
        if (invalidChars.includes(e.target.value)) {
          e.preventDefault();
        }
        const temp = e.target.value;
        //  if(temp.length <=10){
           setUserCreditials((previousState) =>  {
          return {
            ...previousState,
            phoneNumber: temp,
          };
        });
      // }
      handleFocusOnPhoneNumber(e.target.value)
    
      };

      const handleFocusOnEmail = () => {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            emailInvalid: null,
            allError: null,
          };
        });
        const checkingEmailLP = emailValidation(userCreditials.email);
        if (!checkingEmailLP.isValid) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              emailInvalid: checkingEmailLP.errors.message,
            };
          });
          setValidEmail(prev =>false)
        }
        else{
          setValidEmail(prev =>true)
        }
      };
      const handleFocusOnName = (name) => {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            nameInvalid: null,
            allError: null,
          };
        });
        const checkingNameLP = nameValidation(name);
        if (!checkingNameLP.isValid) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              nameInvalid: checkingNameLP.errors.message,
            };
          });
          setValidName(prev =>false)
        }
        else{
          setValidName(prev =>true)
        }
      };
      const handleFocusOnPhoneNumber = (n) => {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            phoneNumberInvalid: null,
            allError: null,
          };
        });
        let number = userCreditials.phoneNumber?.length && userCreditials.phoneNumber 
        const checkingPhoneNumberLP = phoneNumberValidation(n);
        if (!checkingPhoneNumberLP.isValid) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              phoneNumberInvalid: checkingPhoneNumberLP.errors.message,
            };
          });
          setValiNumber(prev => false)
        }
        else{
          setValiNumber(prev => true)
          setPhoneNumber(prev => n)
        }
      };
      let headers = { "Content-Type": "application/json" };
      let data = {
        name : userCreditials?.name,
        email: userCreditials?.email,
        // phoneNumber: userCreditials.phoneNumber,
        role : userCreditials?.role,
        accountName : userLoginInfo?.userDetail?.accountDetails[0].name
      };
      useEffect(()=>{
        const cleanUpFunction = () => {
          console.log("this is cleanup")
          dispatch(setIsActivePageType(""));
        }
        return cleanUpFunction;
      },[])

     useEffect(
       () => {setComeFromAgent(prev => true)},[userCreditials]
     )

      const onSubmit = () => {
        const registerUrl = DEMO_SERVER_URL + DEMO_URL.REGISTER_USER
  
         if(comeFromAgent){
         axios.post(registerUrl, [data]).then(
           (e) => {
           if( !e.data.data.message[0]["exception"]){
           setAgentPage(true)}
           else{
               if(e.data.data.message[0]["exception"].length ==2){
                setErrorHandle((previousState) => {
                  return {
                    ...previousState,
                    nameInvalid: e.data.data.message[0]["exception"][0],
                    emailInvalid: e.data.data.message[0]["exception"][1]
                  };
                });
               }
               else if(e.data.data.message[0]["exception"].length ==1){
                 if(e.data.data.message[0]["exception"][0] === "Email already exist"){
                  setErrorHandle((previousState) => {
                    return {
                      ...previousState,
                      emailInvalid: e.data.data.message[0]["exception"][0]
                    };
                  });
                 }
                 else{
                  setErrorHandle((previousState) => {
                    return {
                      ...previousState,
                      nameInvalid: e.data.data.message[0]["exception"][0],
                      
                    };
                  });
                 }
               }
           }
          }  
          
         ).catch(
           (responce) => {
             setErrorHandle((previousState) => {
              return {
                ...previousState,
                emailInvalid: "Please enter valid email."
              };
            });
           }
         )
          }
          if(!comeFromAgent){
            setAgentPage(true)
          }
      }
      let arr = ["Onboarding" , "Agent Configuration" ,"Integration"  , "Campaign Manager" , "Campaign Execution"]
 
    const propsForDropdown1 = {
        optionList: role,
        imgSrcRight: downArrow ,
        placeHolderText: userCreditials?.role ? userCreditials?.role : "Role",
        imgSrcLeft : dropdownIcon 
    };
    const onChangeItem = (item) => {
        setSelectedItem(prev =>item) 
    }
   
    const tandcModal =()=> {
        setShowTandCModal(true)
    }
    useEffect(
      () => {
        if(selectedItem){
          setValidRole(prev => true)
          setUserCreditials((previousState) =>  {
            return {
              ...previousState,
              role: selectedItem,
            };
          })
        }
        
      },[selectedItem]
    )
    const OnclickCheckBox =(checked) => {
      let temp= checkedData
      
     setCheckedData(!temp)
       if( validEmail&&validName&&validNumber&&validRole  && (!temp==true)){
         setSubmitBtn(prev => true)
       }
       else if(submitBtn){
         setSubmitBtn(prev => false)
       }
       else{
         setSubmitBtn(prev => true)
       }
       const checkingEmailLP = emailValidation(userCreditials.email);
         const  checkingNameLP = nameValidation(userCreditials.name);
         const  checkingPhoneNumberLP  =  phoneNumberValidation(userCreditials.phoneNumber);
        if (!checkingEmailLP.isValid || !checkingNameLP.isValid || !checkingPhoneNumberLP.isValid) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              emailInvalid: checkingEmailLP.errors.message,
              nameInvalid: checkingNameLP.errors.message,
              phoneNumberInvalid: checkingPhoneNumberLP.errors.message
            
            };
          });
        }
    }
    useEffect(() => {
      let data = {phoneNumber : phoneNumber ? phoneNumber : "", 
                  name : userCreditials?.name,
                  email : userCreditials?.email
                  };
      dispatch(setPhoneNumberdemo(data));
    }, [phoneNumber , userCreditials?.name ,userCreditials?.email]);

    const callBack =(data) => {
         setAgentPage(prev => data)
         setComeFromAgent(prev => data)
    }
   
    //to reset

    useEffect(
      () => {
        return setAgentPage(prev => false),
      
              setUserCreditials(prev => {
                return {
                  email: null,
                 name: null,
               phoneNumber: null,
                 role: null
                }
              }),
            setValiNumber(false),
            setValidEmail(false),
            setValidName(false),
            setValidRole(false),
            setCheckedData(prev => false)
              }
     , [demopageIcon])
     useEffect(
       () =>{ dispatch(setDemoPage(false)) } ,[!agentPage]
     )

     //---after logger we can add 
  // useEffect (
  //   () => {
  //     props.setIsCallLoggerOrReport(true)
  //   },[]
  // )
  

  return (
    <div>
      
      {agentPage ? <AgentPage  call ={callBack} visibleBack = "visible"/> :
      <>
    <div className='DemoLogInWrapper'>
        <div className='headingDiv'>
          <div className='mainLogo'>
              </div>
            <p className='para'>

            </p>
        </div>
       
        <div className='DemoLogInOuterDiv'> 
        <form> 
                 < div className="formLabelLP">
                      <div className="inputBorderForm">
                        <img src={nameIcon} width={"30px"} alt=" Name Icon" 
                          className='InputImgIcon' />
                        <input
                          className="formInputArea"
                          type="name"
                          placeholder="Name"
                          required
                          onChange={handleChangeName}
                          value= {userCreditials?.name}
                        />
                      </div>
                      {errorHandle.nameInvalid && (
                        <div className="errorMessageLP">
                          <ErrorMessage
                            errorMessage={errorHandle.nameInvalid}
                          />
                        </div>
                        )} 
                    </div>
                    < div className="formLabelLP">
                      <div className="inputBorderForm">
                        <img src={emailIcon} 
                        alt="Email Id Icon"
                        className='InputImgIcon' />
                        <input
                          className="formInputArea"
                          type="email"
                          placeholder="Business Email"
                          required
                          onChange={handleChangeEmail}
                          onBlur={handleFocusOnEmail}
                          value = {userCreditials?.email}
                        />
                      </div>
                      {errorHandle.emailInvalid && (
                        <div className="errorMessageLP">
                          <ErrorMessage
                            errorMessage={errorHandle.emailInvalid}
                          />
                        </div>
                      )} 
                    </div>
                    < div className="formLabelLP">
                      <div className="inputBorderForm">
                        <img src={phoneIcon} alt="phone Number" 
                        className='InputImgIcon'/>
                        <input
                          className="formInputArea"
                          type="number"
                          placeholder="Phone Number"
                          onKeyDown={(e) => handleExtraCase(e)}
                          onChange={(e) => {return handleChangePhoneNumber(e)}}
                          onBlur={(e) => handleFocusOnEmail(e.target.value)}
                          value ={userCreditials?.phoneNumber}
                        />
                      </div>
                      {errorHandle.phoneNumberInvalid && (
                        <div className="errorMessageLP">
                          <ErrorMessage
                            errorMessage={errorHandle.phoneNumberInvalid}
                          />
                        </div>
                      )} 
                    </div>
                    < div className="formLabelLP">
                      <DropDown 
                        droplist={propsForDropdown1}
                        searchUi={false}
                        handleSearchItem={selectedItem}
                        selectedItem={(item) =>
                            onChangeItem(item)}
                        extraClassSelectedArea={'extraStyledropDownArea'}
                        extraClassToBeSelectedArea={'dropdownlist'}
                        extraStyleLeftImg = {"styleleftLogo"}
                       />
                    </div>
                   <div className="checkBoxDiv">
                       <input type="checkbox" 
                        className={`checkBox ${
                          validEmail&&validName&&validNumber&&validRole && !agentPage ?
                          "" :
                          'disablePointerEventUniversal'
                        }`}
                        checked = {
                           checkedData
                        }
                        onClick ={(checked) => OnclickCheckBox(checked)}/>
                       <label htmlFor="T and C" className= {`labelcheckBox  ${
                          validEmail&&validName&&validNumber&&validRole ?
                          "" :
                          'disablePointerEventUniversal'
                        }`}> Agree to T&amp;C
                         <img src={tcIcon} className ="tcIcon" 
                          onClick={tandcModal}></img></label>
                   </div>
                   {showTandCModal ? 
                   <div className='showingModal'>
                   <TandC hideModal = {setShowTandCModal}
                         callBack = {onSubmit}
                   />
                   </div>
                    : null}

</form>         
                    
        </div>
          <div>
              <button 
               className={`submitBtn ${submitBtn &&(validEmail&&validName&&validNumber&&validRole && !agentPage ) ? "" : "disablePointerEventUniversal" }
                                   
                                     `}
                onClick = { () => {return onSubmit() }}  >
                  Let&apos;s Start
                  </button>
          </div>
         
    </div>
        <div className='progressBarDiv'>

       { submitBtn &&(validEmail&&validName&&validNumber&&validRole ) ?
           <ProgressBar 
             arr = {arr}
             currentStep = {0}/> 
             :<div>
             <img src= {isoIcon} 
              
             ></img>
             </div>

       }       
            </div>
    </>       
}
    </div>
  
  )
}


// const mapStateToProps = (state, ownProps) => {
//   return {
   
//     isLoggerOrReport: state.callLoggerReducer.isLoggerOrReport,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//       Object.assign({},  callLoggerAction),
//       dispatch
//   );
// };
export default DemoLogIn;