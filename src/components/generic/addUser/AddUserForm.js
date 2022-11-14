import { useState, useEffect } from "react";


import InputBox from "../inputBox/InputBox";
import Button from "../button/Button";
import DropdownSaarthi from "../dropdownsaarthi2/DropdownSaarthi";

import "./AddUserForm.css";

import NameIcon from "../../../theme/assets/svg/adduserformIcon/nameIcon.svg";
import EmailIcon from "../../../theme/assets/svg/adduserformIcon/emailIcon.svg";
import PasswordIcon from "../../../theme/assets/svg/adduserformIcon/passwordIcon.svg";
import RoleIcon from "../../../theme/assets/svg/adduserformIcon/roleIcon.svg";
import DropdownIcon from "../../../theme/assets/svg/generic/dropdownIcon.svg";

import visiblity from "../../../theme/assets/svg/adduserformIcon/visibility.png";
import hidden from "../../../theme/assets/svg/adduserformIcon/hidden.png";
import { SERVER_URL, ONBOARDING_URL } from "../../../services/ApiRoutes";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../../utils/Validation";
import ErrorMessage from "../errorMessage/ErrorMessage";

const FormAddUser = (props) => {
  const [showPassword, setShowPassword] = useState([]);

  const langauge =  sessionStorage.getItem("language");
  const accountName =  sessionStorage.getItem("accountName");

  const [inputList, setInputList] = useState([{
         language: [langauge],
       accountName: accountName,
       name:"",
       password:"",
       role:"",
       email:""
  }]);

  const [isError, setIsError] = useState();
  const [isReadOnly, setIsReadOnly] =useState(true);




  // To change the value of credential
  const onChangeCredentials = (e, credential, i) => {
    const list = [...inputList];
    if (credential === "name") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "email") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "password") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "role") {
      if(e){
        list[i]["role"] = e;
        setInputList(prev =>list);
      }
     
    }
  };
  const imageClickLeft = () => {true};

  // To function for validation
  const toCheckAllValidation = (each, i) => {
    const isCheckName =  nameValidation(each.name);
    if (!isCheckName.isValid) {
      const temp = `${isCheckName.errors.message}`;
      return temp;
    }
    const isCheckEmail =  emailValidation(each.email);
    if (!isCheckEmail.isValid) {
      const temp = `${isCheckEmail.errors.message}`;
      return temp;
    }
    const isCheckPassword =  passwordValidation(each.password);
    if (!isCheckPassword.isValid) {
      const temp = `${isCheckPassword.errors.message}`;
      return temp;
    }
    if (!each.role) {
      const temp = `Please select the role`;
      return temp;
    }
    return null;
  };

  // To create user
  const addUserList = async () => {
    const dataValidation = inputList;
    const addUserUrl = SERVER_URL + ONBOARDING_URL.SIGN_UP;
    const accountName = await sessionStorage.getItem("accountName")
    const langauge = await sessionStorage.getItem("langauge")
    let checkIsError = null;
   if(dataValidation.length){
    const tempErrojjjr = dataValidation.map((ipfield, i) =>{
      const checkError = toCheckAllValidation(ipfield, i)
      setIsError((previousState) => checkError);
      checkIsError = checkError;
      // if(checkError){
      // console.log(checkError);
       
        props.toGetErrorMessage(checkError);
        //return;
      // }
    })
  }

  if(checkIsError){
    return;
  }

    let data = inputList;
    // console.log(data);
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    await axios
      .post(addUserUrl, data, {
        headers: {
          "x-access-token": token,
          userId: id,
        },
      })
      .then((res) => {
        if(Array.isArray(res.data?.data?.message) && res.data?.data?.message[0]?.exception[0]){
          toast.error(res.data?.data?.message[0]?.exception[0]);
          return;
        }
        props.handleClickCreateUser(true);
        props.handleClickCreateUser(false);
        //props.handleClickCancelAddUserModel();
        // if (res.request.statusText === "OK") {
        //   props.handleClickCreateUser(true);
        //   props.handleClickCreateUser(false);
        //   props.handleClickCancelUpdateModel();
        // }
        toast.success("User added successfully!");
      })
      .catch((e) => {
        toast.error("User not added successfully!");
        console.log(e);
      });
  };

  const handleClickAddMoreUserForm = () => {
    let tempram = [...inputList];
    tempram.push({
        language: [langauge],
      accountName: accountName,
      name:"",
       password:"",
       role:"",
       email:""
    });
    setInputList(tempram);
    
  }

  const handleClickRemoveUserForm = (i) => {
    let temp = [...inputList];
    // const index = temp.indexOf(i);
      if (i > -1) {
        temp.splice(i, 1);
      }
    setInputList(temp);
  };

  useEffect(() => {
    setInputList( prev => inputList);
  }, [inputList])






  const handleClickEyeIcon = (i) => {
    let tempArr = showPassword;
    if (!tempArr.includes(i)) {
      tempArr.push(i);
    } else {
      const index = tempArr.indexOf(i);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
    }
    setShowPassword((previousState) => {
      return [...previousState, [tempArr]];
    });
  };




  useEffect(() => {
     handleClickAddMoreUserForm();  
  }, [props.isAddUser]);

  useEffect(() => {
    addUserList();
  }, [props.isCreateNewUser]);


 


  const [propsForDropdown, setPropsForDropdown] = useState({
      optionList: [],
      placeHolderText: "Role",
      imgSrcLeft:RoleIcon,
      imgSrcRight:DropdownIcon
  })

  useEffect(() => {
setPropsForDropdown(prev =>{
  return{
    ...prev,
    optionList: [...props.allRole],
  }
})
  },[props.allRole])

  // const propsForDropdown = {
  //   optionList: [...allRole],
  //   placeHolderText: "Role",
  //   imgSrcLeft:RoleIcon,
  //   imgSrcRight:DropdownIcon
  // };
  return (
    <>
      {inputList.length &&
        inputList?.map((ipfield, i) => {
          return (
            <div key={i} className="userCredentialsTopOneForm">
           
              <div className="userCredentialsOneForm">
              <p className="formGroupAU">{i+1}.</p>
                <div className="formGroupAU">
                  <InputBox
                    className="userCredentials"
                   
                    type="text"
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "name", i)
                    }
                    value={inputList[i]["name"]}
                    imgSrcLeft={NameIcon}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    placeholder="Name"
                    name="name"
                    id={"name" + i}
                    // key={"name" + i}
                    parentClass={
                      nameValidation(inputList[i]["name"]).isValid 
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly= {isReadOnly}
                    onFocus={() =>{
                      setIsReadOnly(prev =>false);
                    }}
                  />
                </div>
                <div className={`formGroupAU emailBoxLargerAF`}>
                  <InputBox
                    className="userCredentials"
                
                    type="email"
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "email", i)
                    }
                    value={inputList[i]["email"]}
                    imgSrcLeft={EmailIcon}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    placeholder="Email"
                    name="email"
                    id={"email" + i}
                    // key={"email" + i}
                    parentClass={
                      emailValidation(inputList[i]["email"]).isValid
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly= {isReadOnly}
                    onFocus={() =>{
                      setIsReadOnly(prev =>false);
                    }}
                  />
                </div>
                <div className="formGroupAU">
                  <InputBox
                    className="userCredentials"
                    
                    type={showPassword.includes(i) ? "text" : "password"}
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "password", i)
                    }
                    value={inputList[i]["password"]}
                    imgSrcLeft={PasswordIcon}
                    imgSrc={showPassword.includes(i) ? hidden : visiblity}
                    imageClick={() => handleClickEyeIcon(i)}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    imageSrcExtraStyle={{ width: "15px" }}
                    placeholder="Password"
                    name="password"
                    id={"password" + i}
                    // key={"password" + i}
                    maxLength="20"
                    parentClass={
                      passwordValidation(inputList[i]["password"]).isValid
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly= {isReadOnly}
                    onFocus={() =>{
                      setIsReadOnly(prev =>false);
                    }}
                  />
                </div>
                <div style={{ width: "25%" }} className="formGroupAU">
                  <DropdownSaarthi
                    droplist={propsForDropdown}
                    selectedItem={(item) =>
                      onChangeCredentials(item, "role", i)
                    }
                    extraClassSelectedArea={'extraStyleClassAUF'}
                    // key={"role" + i}
                  />
                </div>
                <div className="addRemoveUserIcon">
                {inputList.length > 1 && (
                  <Button  
                  text=" — "
                  extraClass="removeButtonStyle"
                  onClick={()=>handleClickRemoveUserForm(i)}/>
                )}
              </div>
              </div>
              <div style={{height:"14px"}} className="addRemoveUserIcon" >
                {/* {inputList.length > 1 && (
                  <span style={{paddingTop:"0px",marginTop:"0px" }} onClick={()=>handleClickRemoveUserForm(i)}>  </span>
                )} */}
              </div>
              <ToastContainer
        position="top-center"
        type="success"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={true}
      />
            </div>
          );
        })}
    </>
  );
};

const AddUserForm = (props) => {
  const [isAddUserjai, setIsAddUserjai] = useState(false);
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [isError, setIsError] = useState();

  const [allRole, setAllRole] = useState([])

  useEffect(() =>{
    const rolerrrTemp = props.userLoginInfo?.userDetail?.role.toString().toLowerCase()
// console.log(rolerrrTemp)
    if(rolerrrTemp){
    if(rolerrrTemp === 'owner'){
      setAllRole(prev =>["Chief Risk Officer","Collection Manager", "Campaign Manager", "Campaign Analyst","Guest"])
    }
    else if(rolerrrTemp === 'guest'){
      setAllRole(prev =>["Chief Risk Officer","Collection Manager", "Campaign Manager", "Campaign Analyst"])
    }
    else if(rolerrrTemp === 'chief risk officer'){
      setAllRole(prev =>["Collection Manager", "Campaign Manager", "Campaign Analyst"])
    }
    else if(rolerrrTemp === 'collection manager'){
      setAllRole(prev =>[ "Campaign Manager", "Campaign Analyst"])
    }
    else if(rolerrrTemp === 'campaign manager'){
      setAllRole(prev =>[ "Campaign Analyst"])
    }
  }
  },[props.userLoginInfo])

  const AddUserData = () => {
    setIsAddUserjai(prev =>!prev);
  };
  useEffect(() => {
    setIsAddUserjai(isAddUserjai)
  }, [isAddUserjai])

  // To summit all user
  const handleSummitAddUserList = () => {
    setIsCreateNewUser(previousState => !previousState);
  };


  // To cancel add user form
  const handleClickCancelAddUser = () => {
    props.handleClickCancelAddUserModel();
  };

  const handleClickCreateUser = (value) =>{
    props.handleClickCreateUser(value);
    props.handleClickCancelAddUserModel();
  }

  const toGetErrorMessage = (err) => {
    setIsError(prev => err);
  };

  return (
    <>
      <div className="addUserFormTopDiv">
        <div className="addUserButton">
          <Button
            text="+ Add User"
            extraStyle={{ padding: "5px 15px", fontWeight: "bold", background: "#DDECFF" }}
            onClick={() => AddUserData()}
          />
        </div>
        <div className="addUserFormArea">
          <FormAddUser
            isAddUser={isAddUserjai}
            isCreateNewUser={isCreateNewUser}
            handleClickCreateUser={value =>handleClickCreateUser(value)}
            toGetErrorMessage={(value) => toGetErrorMessage(value)}
            allRole={allRole}
          />
        </div>
        <div className="errorMessage">
          {isError && <ErrorMessage errorMessage={isError} extraClass={'extraErrorMessageClassName'} />}
        </div>
        <div className="createAndCancelButtonDiv">
          <div className="createUserButton">
            <Button
              text=" Submit "
              extraClass="createUserButtonStyle"
              onClick={() => handleSummitAddUserList()}
              // disabled={isError?true:false}
            />
          </div>
          <div className="createUserButton">
            <Button
              text=" Cancel "
              extraClass="cancelButtonStyle"
              onClick={() => handleClickCancelAddUser()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userLoginInfo: state.loginReducer.userLoginInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);

// export default AddUserForm;
