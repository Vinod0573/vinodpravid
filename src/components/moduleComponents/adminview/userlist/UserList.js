import React, { useState, useEffect } from "react";
import axios from "axios";

import { SERVER_URL, ONBOARDING_URL } from "../../../../services/ApiRoutes";

// import { decrypt } from "../../../../utils/deCrypt";

import "./UserList.css";
import InputBox from "../../../generic/inputBox/InputBox";
import Button from "../../../generic/button/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchIcon from "../../../../theme/assets/svg/generic/searchIcon.svg";

import UpdateUserCredential from "../../../generic/updateusercredential/UpdateUserCredential";
import AddUserForm from "../../../generic/addUser/AddUserForm";
import Table from '../../../generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp';
import TableConstant from './UserTableConstsnts';



// import AddUserForm from '../../components/addUser/AddUserForm';

const UserList = (props) => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectOne, setIsSelectOne] = useState([]);
  const [isToggleActive, setIsToggleActive] = useState([]);

  const [searchingValue, setSearchingValue] = useState("");

  const [usersData, setUsersData] = useState();

  const [isUpdateUserModel, setIsUpdateUserModel] = useState(false);
  const [isAddUserModel, setIsAddUserModel] = useState(false);

  const [userToUpdateData, setToUserUpdateData] = useState(null);

  const [qUser, setQUser] = useState("");
  const [pageNo, setPageNo] = useState();
  const [isLoading, setIsLoading] = useState('loaded');



  useEffect(() => {
    setPageNo(prev => props.pageNo)
  }, [props.pageNo])


useEffect(() => {
  setUsersData(prev => props.allUserList);
}, [props.allUserList])



// To check first user to create
useEffect(() => {
   if(props.isFirstCreateNewUser){
    setIsAddUserModel(prev => props.isFirstCreateNewUser)
   }
}, [])


  useEffect(() => {
    let tempArr = isToggleActive;
    usersData &&
      usersData.map((each, i) => {
        if (each.isActive) {
          tempArr.push(i);
        }
      });
    setIsSelectOne((previousState) => {
      return [...previousState, [tempArr]];
    });
  }, []);

  // To make active inactive user
  const postingUpdatedData = async (checked, i) => {
    const updateUserUrl = SERVER_URL + ONBOARDING_URL.UPDATE_USER_DATA;
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    const decripted = await decrypt(usersData[i].password);
    let data = {
      isActive: checked,
      language: usersData[i]?.language,
      name: usersData[i]?.name,
      password: decripted,
      role: usersData[i]?.role,
      id: usersData[i]?._id,
      // email:usersData[i]?.email
    };

    await axios
      .post(updateUserUrl, data, {
        headers: {
          "x-access-token": token,
          userId: id,
        },
      })
      .then((res) => {
        if (res.request.statusText === "OK") {
          toast.success("User updated successfully!");
          // props.isCheckSuccessful(false);
        }
      })
      .catch((e) => {
        toast.error("User Updation not successfull");
      });
  };

  // To select all users
  const handleSelectAllCheckbox = (checked, data, index) => {
    if (checked) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
  };

  // To select the users
  const handleSelectOneCheckbox = (checked, each, i) => {
    let tempArr = isSelectOne;
    if (checked) {
      tempArr.push(i);
    } else {
      const index = tempArr.indexOf(i);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
    }
    setIsSelectOne((previousState) => {
      return [...previousState, [tempArr]];
    });
  };

  // To disable users
  const handleDisableToggleSwitch = (checked, i) => {
    let tempData = usersData;
    tempData[i].isActive = checked;
    setUsersData((previousState) => tempData);
    let tempArr = isToggleActive;
    if (checked) {
      tempArr.push(i);
    } else {
      const index = tempArr.indexOf(i);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
    }
    setIsSelectOne((previousState) => {
      return [...previousState, [tempArr]];
    });
    postingUpdatedData(checked, i);
  };
  const imageClick = () => {true};

  // To create new user
  const handleClickCreateUser = (value) => {
    props.handleClickCreateUser(value);
  };



  // To Search user in list
  const handleSearchUser = async (e) => {
    setSearchingValue(e.target.value);
    const val = e.target.value;
     const accountName = await sessionStorage.getItem("accountName");
    const searchUserUrl = `${SERVER_URL}${ONBOARDING_URL.SEARCH_USERS}accountName=${accountName}`;
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    const bodyData = {
        "name":val,
        "email":val,
        "page":1,
        "limit":props.limit
    }
     await axios.post(searchUserUrl,bodyData)
    .then( res =>{
        const tempData = res.data.data.results;
        setUsersData( prev => tempData);
        const ttpage =res.data.data.totalPages;
        props.toSetTotalNoOfPageOnSearch(ttpage);
    })
    .catch( e =>{
        console.log(e);
    })

  };

  // To open update user details model
  const handleClickUpdateUserDetail = (i) => {
    const temp = usersData[i];
    // console.log(temp,"88");
    setToUserUpdateData(temp);
    setIsUpdateUserModel((previousState) => true);
  };

  // To Cancel update user model
  const handleClickCancelUpdateModel = () => {
    setIsUpdateUserModel((previousState) => false);
  };

  const handleClickAddUser = () => {
    setIsAddUserModel((previousState) => true);
  };
  // To Cancel Add user model
  const handleClickCancelAddUserModel = () => {
    setIsAddUserModel((previousState) => false);
  };
//  console.log(usersData,"333")

  return (
    <>
      <div>
        <div className="updateModelTopDiv">
          {isUpdateUserModel && (
            <div className="updateModelWrap">
            <div className="updateModel">
              <UpdateUserCredential
                handleClickCancelUpdateModel={() =>
                  handleClickCancelUpdateModel()
                }
                userToUpdateData={userToUpdateData}
                handleClickCreateUser={(value) => handleClickCreateUser(value)}
              />
            </div>
            </div>
          )}
          {isAddUserModel && (
            <div className="addUserModelWrap">
            <div className="addUserModel">
              <AddUserForm
                handleClickCancelAddUserModel={() =>
                  handleClickCancelAddUserModel()
                }
                handleClickCreateUser={(value) => handleClickCreateUser(value)}
              />
            </div>
            </div>
          )}
        </div>
        <div className="userListTopDiv">
          <div className="searchInputDiv">
            <div className="searchInput">
              <div className="userListSearchTitle">
                <h4> User list </h4>{" "}
              </div>{" "}
              &nbsp;&nbsp;
              <div>
                <InputBox
                  className="userListSearchInput"
                  type="search"
                  imgSrc={SearchIcon}
                //   onChangeValue={(e) => {
                //     setQUser(e.target.value);
                //   }}
                //   value={qUser}
                onChangeValue={(e)=>handleSearchUser(e)}
                  imageClick={() => imageClick()}
                  placeholder="Name or E-mail"
                />
              </div>
            </div>
            <div>
              <Button
                text="+ Create User"
                extraClass="addUserListTopButton"
                onClick={() => handleClickAddUser()}
              ></Button>
            </div>
          </div>
          <div className="userListDiv">
              <Table 
                data = {usersData}
                cols = {TableConstant(
                  (i) =>handleClickUpdateUserDetail(i),
                  handleDisableToggleSwitch)} 
                isLoading={isLoading}
                extraClassTBody= "userTableBody"
                />
                </div>
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
    </>
  );
};

export default UserList;
