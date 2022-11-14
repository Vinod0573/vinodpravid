import React , {useState,useEffect} from 'react';

import InputBox from "../../inputBox/InputBox";
import DropdownSaarthi from "../../dropdownsaarthi2/DropdownSaarthi";
import { emailValidation, passwordValidation,nameValidation} from "../../../../utils/Validation";


import "./UserCredentialForm.css";


import NameIcon from "../../../../theme/assets/svg/adduserformIcon/nameIcon.svg";
import EmailIcon from "../../../../theme/assets/svg/adduserformIcon/emailIcon.svg";
import PasswordIcon from "../../../../theme/assets/svg/adduserformIcon/passwordIcon.svg";
import RoleIcon from "../../../../theme/assets/svg/adduserformIcon/roleIcon.svg";
import DropdownIcon from "../../../../theme/assets/svg/generic/dropdownIcon.svg";
import visiblity from "../../../../theme/assets/svg/adduserformIcon/visibility.png";
import hidden from "../../../../theme/assets/svg/adduserformIcon/hidden.png";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";







const UserCredentialForm = (props) =>{

    const [userCredential, setUserCredential] = useState();
    const [showPassword,setShowPassword]=useState(false)

    useEffect(() => {
        if(props.userToUpdateData){
            setUserCredential(previousState =>{
                return{
                    ...props.userToUpdateData,
                }
            });
        }
    }, [props.userToUpdateData])


    const [allRole, setAllRole] = useState([])

    useEffect(() =>{
      const rolerrrTemp = props.userLoginInfo?.userDetail?.role.toString().toLowerCase()

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


    const propsForDropdown = {
        optionList: [...allRole],
        placeHolderText:userCredential?.role,
        imgSrcLeft:RoleIcon,
        imgSrcRight:DropdownIcon
    
    }
    useEffect(() => {
       props.updatededData(userCredential)
    }, [userCredential])


    // To change the value of credential
    const onChangeCredentials = (e,credential,i) =>{
        
        if(credential=== 'name'){
            const { name, value } = e.target;
            setUserCredential(previousState =>{
                return{
                    ...previousState,
                    name:value
                }
            })
            
        }
        else if(credential=== 'email'){
            const { name, value } = e.target;
            setUserCredential(previousState =>{
                return{
                    ...previousState,
                    email:value
                }
            })
        }
        else if(credential=== 'password'){
            const { name, value } = e.target;
            setUserCredential(previousState =>{
                return{
                    ...previousState,
                    password:value
                }
            })
        }
        else if(credential === 'role'){
            setUserCredential(previousState =>{
                return{
                    ...previousState,
                    role:e
                }
            })
        }
    }

    return(
        <>
             <div>
                <div className="userCredentialsOneForm">
                    <div className="formGroupUCF">
                    <InputBox className="userCredentials" id="userNameID" type="text" 
                    onChangeValue={(event)=>onChangeCredentials(event,'name')}
                     value={userCredential?.name} 
                     imgSrcLeft={NameIcon}
                    //  imageClickLeft={()=>imageClickLeft()}
                     imageExtraStyle={{width:"40px"}}
                     placeholder="Name"
                     name="name"
                    //id={"name "+i}
                    parentClass={(nameValidation(userCredential?.name).isValid) ? "parentClassValidated":"parentClassNotValidated"}
                    />
                    </div>
                    <div className={`formGroupUCF emailBoxLargerUCF`}>
                    <InputBox className="userCredentials" id="userEmailID" type="email" 
                    onChangeValue={(event)=>onChangeCredentials(event,'email')}
                      value={userCredential?.email} 
                     imgSrcLeft={EmailIcon}
                     disabled={props.disable?props.disable:false}
                    //  imageClickLeft={()=>imageClickLeft()}
                     imageExtraStyle={{width:"40px"}}
                     placeholder="Email"
                     name="email"
                    //id={"email"+i}
                    parentClass={(emailValidation(userCredential?.email).isValid) ? "parentClassValidated":"parentClassNotValidated"}

                    />
                    </div>
                    <div className="formGroupUCF">
                    <InputBox className="userCredentials" id="userPasswordID" 
                    onChangeValue={(event)=>onChangeCredentials(event,'password')}
                    value={userCredential?.password} 
                    type={showPassword?"text":"password"}
                    imgSrc={showPassword?hidden:visiblity}
                    imageClick={()=>{setShowPassword(!(showPassword))}}
                    imgSrcLeft={PasswordIcon}
                    //  imageClickLeft={()=>imageClickLeft()}
                     imageExtraStyle={{width:"40px"}}
                     placeholder="Password"
                     name="password"
                    //id={"password"+i}
                    maxLength="20"
                    parentClass={(passwordValidation(userCredential?.password).isValid) ? "parentClassValidated":"parentClassNotValidated"}
                    />
                    </div>
                    <div style={{width:"25%"}} >
                        <DropdownSaarthi  
                        droplist={propsForDropdown}
                         selectedItem={(item)=>onChangeCredentials(item,'role')}
                         extraClassSelectedArea={'extraStyleClassUCF'}
                        />
                    </div>
                </div>
                </div>
        </>
        
    )
    
}


const mapStateToProps = (state, ownProps) => {
    return {
      userLoginInfo: state.loginReducer.userLoginInfo,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}), dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserCredentialForm);


//export default UserCredentialForm;