import React, { useState } from 'react';
import Button from '../../../../generic/button/Button';
import Inputbox from '../../../../generic/inputBox/InputBox';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './RequestDemo.css';
import {
    DEMO_SERVER_URL,
    DEMO_SIGNUP_URL
  } from "../../../../../services/ApiRoutes";
import axios from 'axios';
import { useMediaQuery } from '../../../../../screens/onBoarding/mediaQuery';
import {
  emailValidation,
  phoneNumberValidation,
  nameValidation,
} from "../../../../../utils/Validation";
import ErrorMessage from '../../../../generic/errorMessage/ErrorMessage'

const RequestDemo = () => {
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [company , setCompany] = useState("")
    const [companyEmail , setCompanyEmail] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [phoneNumber , setphoneNumber] = useState("");
    const[validName , setValidName] = useState(false);
    const[validEmail , setValidEmail] = useState(false);
    const[validNumber , setValiNumber] = useState(false);
    const[validLastName , setValidLastName] = useState(false)
    const [userCreditials, setUserCreditials] = useState({
      email: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
    });
    const [errorHandle, setErrorHandle] = useState({
      emailInvalid: null,
      firstNameInvalid: null,
      lastNameInvalid: null,
      phoneNumberInvalid: null,
      allError: null,
    });
   
     let url = DEMO_SERVER_URL+""+ DEMO_SIGNUP_URL.REQUEST_DEMO;
     let isPageWide = useMediaQuery('(max-width: 480px)');

  const hubspotFormSubmit = (rawdata) => {
       const timedate = new Date();
       // Create the new request
       var xhr = new XMLHttpRequest();
       var url ="https://api.hsforms.com/submissions/v3/integration/submit/20107629/1712e859-f655-43e0-abf6-6c3b7d8ccd6c";

       // Example request JSON:
       var data = {
         submittedAt: timedate,
         fields: [
           {
             name: "email",
             value: rawdata.companyEmail,
           },
           {
            name: "firstname",
            value: rawdata.firstName,
          },
          {
            name: "lastname",
            value: rawdata.lastName,
          },
          {
            name: "phone",
            value: rawdata.phoneNumber,
          },
          {
            name: "company",
            value: rawdata.companyName,
          },
          {
            name: "designation",
            value: rawdata.jobTitle,
          },
         ],
         legalConsentOptions: {
           // Include this object when GDPR options are enabled
           consent: {
             consentToProcess: true,
             text: "I agree to allow Saarthi.ai to store and process my personal data.",
             communications: [
               {
                 value: true,
                 subscriptionTypeId: 999,
                 text: "I agree to receive marketing communications from Saarthi.ai.",
               },
             ],
           },
         },
       };

       var final_data = JSON.stringify(data);

       xhr.open("POST", url);
       // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
       xhr.setRequestHeader("Content-Type", "application/json");

      //  xhr.onreadystatechange = function () {
      //    if (xhr.readyState === 4 && xhr.status === 200) {
          
      //    } else if (xhr.readyState === 4 && xhr.status === 400) {
           
      //      //alert(responseText.errors[0].message); // Returns a 400 error the submission is rejected.
      //    } else if (xhr.readyState === 4 && xhr.status === 403) {
          

      //      //alert(responseText.errors[0].message); // Returns a 403 error if the portal isn't allowed to post submissions.
      //    } else if (xhr.readyState === 4 && xhr.status === 404) {
           
      //     // alert(responseText.errors[0].message); //Returns a 404 error if the formGuid isn't found
      //    }
      //  };

       // Sends the request

       xhr.send(final_data);
     }

    const handleChangeEmail = (e) => {
      const temp = e.target.value;
      setCompanyEmail(temp)
      setUserCreditials((previousState) => {
        return {
          ...previousState,
          email: temp,
        };
      });
    };
    const handleChangeFirstName = (e) => {
      const temp = e.target.value;
      setFirstName(temp);
      setUserCreditials((previousState) => {
        return {
          ...previousState,
          firstName: temp,
        };
      });
    };
    const handleChangeLastName = (e) => {
      const temp = e.target.value;
      setLastName(temp);
      setUserCreditials((previousState) => {
        return {
          ...previousState,
          lastName: temp,
        };
      });
    };
    const handleChangePhoneNumber = (e) => {
      const temp = e.target.value;
      setphoneNumber(temp)
      setUserCreditials((previousState) => {
        return {
          ...previousState,
          phoneNumber: temp,
        };
      });
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
        setValidEmail(false)
      }
      else{
        setValidEmail(true)
      }
      
    };

    const handleValidName = (e) => {
      const checkingFirstNameLP = nameValidation(e.target.value);
      if( !checkingFirstNameLP.isValid){
        setErrorHandle({...errorHandle , firstNameInvalid:checkingFirstNameLP.errors.message })
        setValidName(false)
      }
      else{
        setErrorHandle({...errorHandle , firstNameInvalid:null })
        setValidName(true)
      }
    };
    const handleValidLastName = (e) => {
      const checkingLastNameLP = nameValidation(e.target.value);
      if( !checkingLastNameLP.isValid){
        setErrorHandle({...errorHandle , lastNameInvalid:checkingLastNameLP.errors.message })
        setValidLastName(false)
      }
      else{
        setErrorHandle({...errorHandle , lastNameInvalid:null })
        setValidLastName(true)
      }
    };

    var invalidChars = [
      "-",
      "+",
      "e",
      ""
    ];
    const handleFocusOnPhoneNumber = (e) => {
      if (invalidChars.includes(e.target.value)) {
        e.preventDefault();
      }
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          phoneNumberInvalid: null,
          allError: null,
        };
      });
      
      const checkingPhoneNumberLP = phoneNumberValidation(e.target.value);
      if (!checkingPhoneNumberLP.isValid) {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            phoneNumberInvalid: checkingPhoneNumberLP.errors.message,
          };
        });
        setValiNumber(false)
      }
      else{
        setValiNumber(true)
        setphoneNumber(e.target.value)
      }
    };
    
    const requestDemo = async (e) => {
      e.preventDefault();
      const checkingEmailLP = emailValidation(userCreditials.email);
       const  checkingFirstNameLP = nameValidation(userCreditials.firstName);
       const  checkingLastNameLP = nameValidation(userCreditials.lastName);
       const  checkingPhoneNumberLP  =  phoneNumberValidation(userCreditials.phoneNumber);
      if (!checkingEmailLP.isValid || !checkingFirstNameLP.isValid || !checkingLastNameLP.isValid || !checkingPhoneNumberLP.isValid) {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            emailInvalid: checkingEmailLP.errors.message,
            firstNameInvalid:!checkingFirstNameLP.isValid ? "Please Enter your First Name" : "",
            lastNameInvalid: !checkingLastNameLP.isValid ? "Please Enter your Last Name" : "",
            phoneNumberInvalid: checkingPhoneNumberLP.errors.message
          
          };
        });
        return;
      } else {
        let data = {
          "firstName":firstName,
            "lastName": lastName,
            "companyName": company,
            "jobTitle": jobTitle,
            "companyEmail": companyEmail,
            "phoneNumber": phoneNumber
          
        };
        
        hubspotFormSubmit(data);
           await axios.post(url , data).then(
               () => {
               toast.success("Our team will reach out to you soon")
              }
           ).catch(err => console.log(err));

           window.open(`https://calendly.com/akash-kundu-1?name=${firstName}%20${lastName}&email=${companyEmail}`);

           setFirstName("")
           setLastName("")
           setCompany("")
           setCompanyEmail("")
           setJobTitle("")
           setphoneNumber("")

      }
    }
   
return (
  <div className="reguestDemoWrapper">
    <div className="requestDemoDiv">
      {!isPageWide ? (
        <div className="firstDivHeading">
          <p className="paraBold">
            Pravid is here to give you complete control
          </p>
          <p className="paraBold">over your business communications</p>
          <p className="paraSmall">
            Don&apos;t take our word for it -{" "}
            <span className="spanColor"> see it yourself</span>
          </p>
        </div>
      ) : (
        <div className="firstDivHeading">
          <p className="paraBold">Pravid is here to give you</p>
          <p className="paraBold">complete control over your</p>
          <p className="paraBold">business communications</p>
          <p className="paraSmall">
            Don&apos;t take our word for it -{" "}
            <span className="spanColor"> see it yourself</span>
          </p>
        </div>
      )}
      <div className="secondDivContainer">
        <div className="secondInner">
          <div className="inputFieldContainer">
            <div className="inputBox">
              <label className="label">
                First Name<span className="starRed">*</span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="text"
                value={firstName}
                onChangeValue={(e) => {
                  return handleChangeFirstName(e), handleValidName(e);
                }}
              />

              <div className="errorMessageLP">
                {errorHandle.firstNameInvalid && (
                  <ErrorMessage errorMessage={errorHandle.firstNameInvalid} />
                )}
              </div>
            </div>
            <div className="inputBox">
              <label className="label">
                Last Name <span className="starRed">*</span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="text"
                value={lastName}
                onChangeValue={(e) => {
                  return handleChangeLastName(e), handleValidLastName(e);
                }}
              />

              <div className="errorMessageLP">
                {errorHandle.lastNameInvalid && (
                  <ErrorMessage errorMessage={errorHandle.lastNameInvalid} />
                )}
              </div>
            </div>
            <div className="inputBox">
              <label className="label">
                Company <span className="starRed"></span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="text"
                value={company}
                onChangeValue={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label className="label">
                Company Email<span className="starRed">*</span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="text"
                value={companyEmail}
                onChangeValue={(e) => {
                  return handleChangeEmail(e), handleFocusOnEmail();
                }}
                onBlur={handleFocusOnEmail}
              />

              <div className="errorMessageLP">
                {errorHandle.emailInvalid && (
                  <ErrorMessage errorMessage={errorHandle.emailInvalid} />
                )}
              </div>
            </div>
            <div className="inputBox">
              <label className="label">
                Job title <span className="starRed"></span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="text"
                value={jobTitle}
                onChangeValue={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label className="label">
                Phone number <span className="starRed">*</span>
              </label>
              <Inputbox
                parentClass="inputBoxRequestDemo"
                className="inputBoxRequestDemoIn"
                type="number"
                value={phoneNumber}
                onChangeValue={(e) => {
                  return (
                    handleChangePhoneNumber(e), handleFocusOnPhoneNumber(e)
                  );
                }}
              />

              <div className="errorMessageLP">
                {errorHandle.phoneNumberInvalid && (
                  <ErrorMessage errorMessage={errorHandle.phoneNumberInvalid} />
                )}
              </div>
            </div>
          </div>
          <div
            className={`'btncontainer' ${
              validEmail && validLastName && validName && validNumber
                ? ""
                : "disable-pointer-events"
            }`}
          >
            <Button
              text="Request a demo"
              extraClass="btnDesign"
              onClick={(e) => requestDemo(e)}
            />
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      type="success"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      draggable={false}
      rtl={true}
    />
  </div>
);
}

export default RequestDemo;