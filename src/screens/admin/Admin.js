import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import UserList from "../../components/moduleComponents/adminview/userlist/UserList";
import Button from "../../components/generic/button/Button";

import { SERVER_URL, ONBOARDING_URL } from "../../services/ApiRoutes";

import MoveForwardIcon from "../../theme/assets/svg/adminView/moveForwardIcon.svg";
import LoaderSaarthi from "../../components/generic/loader/Loader";
import screenType from "../screenType";
import Pagination from "../../components/generic/pagination/Pagination";
import { useNavigate } from "react-router-dom";


const UserAdmin = () => {
  const [allUserList, setAllUserList] = useState([]);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isFirstCreateNewUser, setIsFirstCreateNewUser] = useState(false);
  const [loading1, setLoading1] = useState(null);
  const [loading2, setLoading2] = useState(null);
 
  const history = useNavigate();

  //paginationn
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState(0);
  const [limit, setLimit] = useState(13);

  // to update the page no
  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo(prev => tempNewPage);
  };

// to set totla no page 
const toSetTotalNoOfPageOnSearch = (value) =>{
  setTotalNoOfPage(prev => value);
}

  // To fetch all user list
  const getUserList = async () => {
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    const accountName = await sessionStorage.getItem("accountName");
    const addUserUrl = `${SERVER_URL}${ONBOARDING_URL.All_USERS}&accountName=${accountName}&page=${pageNo}&limit=${limit}`;
    const res = await axios
      .get(addUserUrl, {
        headers: {
          "x-access-token": token,
          userId: id,
        },
      })
      .then((res) => {
        const tempData = res.data.data.results;
        // console.log(tempData);
        setAllUserList(tempData);
        setLoading1("loaded");
        setLoading2("loaded");
        const totalpage=res.data.data.totalPages
        setTotalNoOfPage(prev =>totalpage);
      })
      .catch((e) => {
        console.log(e);
        setLoading1("error");
      });
  };

  // To open up create user form
  const handleClickCreateUser = (value) => {
    setIsCreateUser((previousState) => value);
  };

  // To Skip the Creating user when no of user is less than 2
  const handleClickSkipCreatingUser = () => {
    // window.sessionStorage.setItem('isActive','map');
    window.sessionStorage.setItem('isActive','dashboard');
    sessionStorage.setItem("pageType","Analytics Dashboard");
    // history.push("/map");
    history(screenType.analytics.routeName);
  };

  const handleClickCreateUserFirst = () => {
    setIsFirstCreateNewUser((prev) => true);
  };
  useEffect(() => {
    setAllUserList((prev) => allUserList);
  }, [allUserList]);

  useEffect(() => {
    setLoading2(null);
    getUserList();
  }, [isCreateUser,pageNo]);
  



  return (
    <>
      <div className="clientAdminTopDiv">

        {loading1 ? (
          <div className="ClientAdminchild2">
            {allUserList && allUserList.length < 2 && totalNoOfPage === 1 && !isFirstCreateNewUser ? (
              <div>
                <div className="CACreateUser">
                  <div className="CACreateUserMainDiv">
                    <Button 
                    text=" + Create User "
                    extraClass="createUserAdminButtonStyle"
                    onClick={() => handleClickCreateUserFirst()}/>
                    <p className="orParaClass"> or </p>
                    <button onClick={handleClickSkipCreatingUser}>
                      {" "}
                      Skip <img
                        src={MoveForwardIcon}
                        alt="move forward Icon"
                      />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <UserList
                  allUserList={allUserList}
                  handleClickCreateUser={(value) =>
                    handleClickCreateUser(value)
                  }
                  isFirstCreateNewUser={isFirstCreateNewUser}
                  pageNo={pageNo}
                  limit={limit}
                  loading2={loading2}
                  toSetTotalNoOfPageOnSearch={value => toSetTotalNoOfPageOnSearch(value)}
                />

                <div>
                  {
                    totalNoOfPage >1 && 
                  <div>
                    {
                      // loading2 === 'loaded'&&
                    <Pagination
                    forcePage={pageNo}
                      totalNoOfPage={totalNoOfPage}
                      handleClickPageNo={(value) => handleClickPageNo(value)}
                    />
}
                  </div>
}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <LoaderSaarthi />
          </div>
        )}
      </div>
    </>
  );
};

export default UserAdmin;
