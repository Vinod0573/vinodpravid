import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginFields.css";
import {
  SERVER_URL,
  ONBOARDING_URL,
  RESETLINK_URL,
  PROJECT_URL,
} from "../../../../../services/ApiRoutes";
import ErrorMessage from "../../../../generic/errorMessage/ErrorMessage";

import UsernameIcon from "../../../../../theme/assets/svg/login/usernameIcon.svg";
import PasswordKeyIcon from "../../../../../theme/assets/svg/login/passwordKeyIcon.svg";
import Visiblity from "../../../../../theme/assets/svg/login/visibility.png";
import Hidden from "../../../../../theme/assets/svg/login/hidden.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFiltersOptionsForAccount } from "../../../../../redux/filters/actions";
import {
  getLeftSideModuleDetails,
  mapSubModulesToModulesFunc,
  mapUrlToModulesFunc,
} from "./LoginFields.functions";
import {
  setLeftSideModuleDetails,
  setHighlightedModule,
  setSubModuleMappingToModule,
  setUrlToModuleMapping,
  setDefaultSelectedModule,
} from "../../../../../redux/baseScreen/leftMenu";
import {
  emailValidation,
  passwordValidation,
  userNameValidation,
  nameValidation,
} from "../../../../../utils/Validation";

import {
  setLoggedInUserInfo,
  setIsActivePageType,
  setIsPageType,
} from "../../../../../redux/onboarding/login/actions";
import { schema } from "./schema";
import { sourceDetails } from "./sourceDetails";
import { Mixpanel } from "../../../../../utils/mixpanelSetup";

const LoginFields = (props) => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigation = useNavigate();
  let accountName = window.sessionStorage.getItem("accountName");
  accountName = accountName?.toString().toLowerCase();
  var typeOfUser = "";
  const [userCreditials, setUserCreditials] = useState({
    email: null,
    password: null,
    sendMeLinkEmail: null,
  });
  const [errorHandle, setErrorHandle] = useState({
    emailInvalid: null,
    passwordInvalid: null,
    allError: null,
  });

  const [toHandleLoginPageView, settoHandleLoginPageView] = useState({
    login: 0,
    forgetPassword: 0,
    forgetPasswordOne: 0,
  });
  const [showPassword, setShowPassword] = useState(false);

  const refreshPage = () => {
    settoHandleLoginPageView((previousState) => {
      return {
        ...previousState,
        login: 0,
        forgetPassword: 0,
        forgetPasswordOne: 0,
      };
    });

    setErrorHandle((previousState) => {
      return {
        ...previousState,
        emailInvalid: null,
        passwordInvalid: null,
        allError: null,
      };
    });

    setUserCreditials((previousState) => {
      return {
        ...previousState,
        email: null,
        password: null,
        sendMeLinkEmail: null,
      };
    });
  };

  const history = useNavigate();
  const dispatch = useDispatch();
  const ttoken = sessionStorage.getItem("token");

  if (ttoken) {
    navigation("/");
  }

  const handleChangeEmail = (e) => {
    const temp = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        email: temp,
      };
    });
  };

  const handleChangeSendMeLinkEmail = (e) => {
    const emaill = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        sendMeLinkEmail: emaill,
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
  };

  const handleFocusOnPassword = () => {
    setErrorHandle((previousState) => {
      return {
        ...previousState,
        passwordInvalid: null,
        allError: null,
      };
    });
    const checkingEmailLP = emailValidation(userCreditials.email);
    if (!checkingEmailLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: "Please enter correct username",
        };
      });
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        password: password,
      };
    });
  };

  const handleSubmit = async (e) => {
    let start = new Date().getTime();
    e.preventDefault();
    const signInUrl = SERVER_URL + ONBOARDING_URL.SIGN_IN;
    const checkingEmailLP = emailValidation(userCreditials.email);
    const checkingPasswordLP = passwordValidation(userCreditials.password);
    if (!checkingEmailLP.isValid || !checkingPasswordLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: "Please enter correct username",
          passwordInvalid: checkingPasswordLP.errors.message,
        };
      });
      return;
    }
    let data = {
      userName: userCreditials.email,
      password: userCreditials.password,
    };
    let headers = { "Content-Type": "application/json" };
    //console.log(signInUrl)
    setIsLoginLoading(true);
    const res = await axios
      .post(signInUrl, data, headers)
      .then((res) => {
        if (!res.data.data.userDetail.isActive) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              allError: "Inactive User",
            };
          });
          return;
        }
        //  //let tempresjj = { ...res.data.data, schema: schema };
        // dispatch(
        //   getAllFiltersOptionsForAccount(tempresjj?.accountDetails[0]?.name)
        // );
        // // tempresjj.schema = schema;
        // // //tempresjj["sourceDetails"] = sourceDetails;
        // //console.log("loginUserInfo", { ...res.data.data, schema: schema });
        dispatch(setLoggedInUserInfo(res.data.data));
        const { moduleDetails, defaultSelected } = getLeftSideModuleDetails(
          res.data.data.moduleDetails
        );
        dispatch(setLeftSideModuleDetails(moduleDetails));
        dispatch(setDefaultSelectedModule(defaultSelected));
        dispatch(setIsActivePageType(defaultSelected.name));
        dispatch(setHighlightedModule(defaultSelected.name));

        const subModuleMapping = mapSubModulesToModulesFunc(
          res.data.data.moduleDetails
        );
        dispatch(setSubModuleMappingToModule(subModuleMapping));
        const urlToModulesMapping = mapUrlToModulesFunc(
          res.data.data.moduleDetails
        );
        console.log(urlToModulesMapping);
        dispatch(setUrlToModuleMapping(urlToModulesMapping));
         let mixPanelUserobj = {
           "$name" : res.data.data.userDetail?.name,
           "$id": res.data.data.userDetail?._id,
           "$email" : res.data.data.userDetail?.email
         }
         console.log("fgfg" , mixPanelUserobj)
         Mixpanel.identify(res.data.data.userDetail?.accountDetails?.[0]?.id);
       Mixpanel.people.set({
        "$name" : res.data.data.userDetail?.name,
        "$id": res.data.data.userDetail?._id,
        "$email" : res.data.data.userDetail?.email
      })
        let rrolr = res.data.data.userDetail.role;
        if (rrolr === "Camapign Manager") {
          // dispatch(setIsActivePageType("conversation logger"));
          dispatch(setIsPageType("conversation logger"));
          window.sessionStorage.setItem("isActive", "conversation logger");
          sessionStorage.setItem("pageType", "conversation logger");
          history("/calllogger");
        } else {
          if (
            rrolr.toString().toLowerCase() === "guest" ||
            rrolr.toString().toLowerCase() === "owner"
          ) {
            // dispatch(setIsActivePageType("demo"));
            dispatch(setIsPageType("demo"));
            window.sessionStorage.setItem("isActive", "demo");
            sessionStorage.setItem("pageType", "demo");
            history("/demo");
          } else {
            window.sessionStorage.setItem("isActive", "dashboard");
            sessionStorage.setItem("pageType", "Analytics Dashboard");
            // dispatch(setIsActivePageType("dashboard"));

            //console.log("abhishek 12222", tempresjj);
            history("/dashboard");
            dispatch(setIsPageType("dashboard"));
            //console.log("abhishek 12", tempresjj);
          }
        }

        props.setToken(res.data.data.userSessionDetails.accessToken);
        // console.log("ggg", res.data.data.userSessionDetails.accessToken);
        sessionStorage.setItem("Id", res.data.data.userSessionDetails.userId);
        sessionStorage.setItem("email", res.data.data.userDetail.email);
        sessionStorage.setItem("name", res.data.data.userDetail.name);
        sessionStorage.setItem("role", res.data.data.userDetail.role);
        // sessionStorage.setItem("isActive", res.data.data.userDetail.isActive);
        const accountNametemp = res.data.data.userDetail.accountDetails[0].name;
        sessionStorage.setItem("accountName", accountNametemp);

        // // // To get all types filters from store
        // props.getFilterDetails(accountNametemp);

        // // to get all client info
        // props.getClientDetails();

        sessionStorage.setItem(
          "accountId",
          res.data.data.userDetail.accountDetails[0].id
        );
        sessionStorage.setItem("language", res.data.data.userDetail.language);

        axios
          .get(
            `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/account/v1/all`
          )
          .then((response) => {
            let fdata = response?.data?.data;
            let type = fdata.filter((each) => {
              if (
                each?.name?.toLowerCase() ===
                res?.data?.data?.userDetail?.accountDetails[0]?.name?.toLowerCase()
              ) {
                return each;
              }
            });
            sessionStorage.setItem(
              "userType",
              res.data.data.accountDetails[0].type
            );
            // sessionStorage.setItem("userType",type[0].type)
            typeOfUser = type[0].type;
            props?.setUserType("SET_USER_TYPE", typeOfUser);
          });
      })
      .catch((e) => {
        console.error("err", e);
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            allError: "Please check your username and password",
          };
        });
      });
    let end = new Date().getTime();
    setIsLoginLoading(false);
  };

  const handleSubmitSendLink = async (e) => {
    e.preventDefault();
    const fetchUserIdUrl = SERVER_URL + RESETLINK_URL.GET_USER_ID;
    const sendLinkUrl = SERVER_URL + RESETLINK_URL.PASSWORD_RESET_LINK;
    // "http://connectors.saarthi.ai/conversation/api/accounts/v1/forgotPasswordLink" ;
    const checkingEmailLP = userNameValidation(userCreditials.sendMeLinkEmail);
    if (!checkingEmailLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: checkingEmailLP.errors.message,
        };
      });
      return;
    }
    const finalFetchUserIdUrl = `${fetchUserIdUrl}userName=${userCreditials.sendMeLinkEmail}`;
    let resUserId;
    setIsLoginLoading(true);
    await axios
      .get(finalFetchUserIdUrl)
      .then((res) => {
        resUserId = res?.data?.data?.userId;
      })
      .catch((err) => {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            allError: "User not exits",
          };
        });
        //return;
      });

    let resetPasswordLink = `${PROJECT_URL}/resetpassword?id=${resUserId}`;
    //let resetPasswordLink = `http://localhost:3000/resetpassword?id=${resUserId}`;
    let data = {
      userName: userCreditials.sendMeLinkEmail,
      resetLink: resetPasswordLink,
    };
    let headers = { "Content-Type": "application/json" };

    const res = await axios
      .post(sendLinkUrl, data, headers)
      .then((res) => {
        settoHandleLoginPageView((previousState) => {
          return {
            ...previousState,
            forgetPassword: 1,
          };
        });
      })
      .catch((e) => {
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            allError: "User not exits",
          };
        });
      });
    setIsLoginLoading(false);
  };

  const HandleLoginPageView = (type) => {
    if (type === "forgetPassword") {
      settoHandleLoginPageView((previousState) => {
        return {
          ...previousState,
          login: 1,
        };
      });
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: null,
          passwordInvalid: null,
          confirmPasswordInvalid: null,
          allError: null,
        };
      });
    } else if (type === "moveToLogin") {
      settoHandleLoginPageView((previousState) => {
        return {
          ...previousState,
          login: 0,
        };
      });
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: null,
          passwordInvalid: null,
          confirmPasswordInvalid: null,
          allError: null,
        };
      });
    }
  };

  return (
    <>
      <div className="loginTopDiv">
        <div className="loginHeader"></div>
        <div className="formloginPageCard">
          {toHandleLoginPageView.login === 0 && (
            <div className="formAreaLP">
              <div className="loginHeading">
                <h2 className="wlcomeBacklg">Welcome back!</h2>
                <p className="wlcomeBackMessage">Please enter your details.</p>
              </div>
              <form>
                <div className="formLabelLP">
                  <div className="inputBorderForm">
                    <img src={UsernameIcon} alt="Email Id Icon" />
                    <input
                      className="formInputArea"
                      type="email"
                      placeholder="Enter Username"
                      required
                      onChange={handleChangeEmail}
                      onFocus={handleFocusOnEmail}
                    />
                  </div>
                  {errorHandle.emailInvalid && (
                    <div className="errorMessageLP">
                      <ErrorMessage errorMessage={errorHandle.emailInvalid} />
                    </div>
                  )}
                </div>
                <div className="formLabelLP">
                  <div className="inputBorderForm">
                    <img src={PasswordKeyIcon} alt="Password Icon" />
                    <input
                      className="formInputArea"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      required
                      onChange={handleChangePassword}
                      onFocus={handleFocusOnPassword}
                      maxLength="20"
                    />
                    <img
                      className="passwordVisibilityIconLP"
                      src={showPassword ? Hidden : Visiblity}
                      alt="Email Id Icon"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    />
                  </div>
                  {errorHandle.passwordInvalid && (
                    <div className="errorMessageLP">
                      <ErrorMessage
                        errorMessage={errorHandle.passwordInvalid}
                      />
                    </div>
                  )}
                  <p
                    className="forgetPasswordLink"
                    onClick={() => HandleLoginPageView("forgetPassword")}
                  >
                    Forgot password?
                  </p>
                </div>
                <div className="formLabelLP">
                  {errorHandle.allError && (
                    <div className="">
                      <ErrorMessage
                        errorMessage={errorHandle.allError}
                        extraClass={"extraErrorMessageClassNameLPSL"}
                      />
                    </div>
                  )}
                </div>

                <div className="formLabelLP">
                  <div className="summitTopDivLP">
                    <input
                      className="formInputSubmitLP"
                      type="button"
                      value={isLoginLoading ? "Logging in..." : "Login"}
                      disabled={isLoginLoading}
                      onClick={(e) => handleSubmit(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
          {toHandleLoginPageView.login === 1 && (
            <div className="formAreaLP" style={{ marginTop: "6vmax" }}>
              {toHandleLoginPageView.forgetPassword === 0 && (
                <div>
                  <div className="forgetPasswordHeadingTopDiv">
                    {/* <div className="FPHeading">
                      <img src={WelcomeBackIcon} alt="Welcome back icon" />
                      <h2> Welcome back! </h2>
                    </div> */}
                  </div>
                  <form>
                    <div className="formLabelLP">
                      <div className="inputBorderForm">
                        <img src={UsernameIcon} alt="Email Id Icon" />
                        <input
                          className="formInputArea"
                          type="email"
                          placeholder="Enter your username"
                          required
                          onChange={handleChangeSendMeLinkEmail}
                          onFocus={handleFocusOnEmail}
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

                    <div className="formLabelLP">
                      <p className="dontWorryMessage">
                        Dont worry, happens to the best of us.
                      </p>
                    </div>
                    {errorHandle.allError && (
                      <div className="errorMessageLP">
                        <ErrorMessage
                          errorMessage={errorHandle.allError}
                          extraClass={"extraErrorMessageClassNameLPSL"}
                        />
                      </div>
                    )}
                    <div className="formLabelLP">
                      <div className="summitTopDivLP">
                        <input
                          className="formInputSubmitLP"
                          type="button"
                          value=" Send me the link "
                          onClick={(e) => handleSubmitSendLink(e)}
                        />
                      </div>
                    </div>
                    <div className="formLabelLP">
                      <p
                        className="forgetPasswordLink"
                        onClick={() => {
                          HandleLoginPageView("moveToLogin");
                          refreshPage();
                        }}
                      >
                        or Login
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {toHandleLoginPageView.forgetPassword === 1 && (
                <div className="forgetPasswordHeadingTopDiv">
                  <div className="successfulMessageSentLink">
                    <h3> RESET PASSWORD LINK SENT </h3>
                    <p>
                      {" "}
                      Please check your email for a link to reset your password{" "}
                    </p>
                  </div>
                  <div className="mailSentLogin">
                    <Link to="/" onClick={() => refreshPage()}>
                      Click here to login{" "}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <ToastContainer
          position="top-center"
          type="success"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable={false}
          rtl={true}
        />
      </div>
    </>
  );
};

export default LoginFields;
