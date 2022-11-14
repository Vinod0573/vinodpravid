import React, { useState, useEffect } from "react";
import "./Campaign.css";
import clearCacheData from "../../../utils/clearCacheData";
import Axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../redux/campaign/actions";
import * as loginAction from "../../../redux/onboarding/login/actions";
import * as filterAction from "../../../redux/filter/actions";
import * as schedulerAction from "../../../redux/campaign/scheduler/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Screen from "../../../components/moduleComponents/campaign/screen/Screen";
import Pagination from "../../../components/generic/pagination/Pagination";
import { jsonToCsv } from "../../../utils/jsonToCsv.js";
import { downloadCsvFile } from "../../../utils/downloadCsvFile";
import DeleteModal from "../../../components/generic/deleteModal/DeleteModal";
import SearchIcon from "../../../theme/assets/svg/generic/searchIcon.svg";
import Inputbox from "../../../components/generic/inputBox/InputBox";
import Button from "../../../components/generic/button/Button";
import TableSaarthiJp from "../../../components/generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp";
import { tableConstants } from "../../../components/moduleComponents/campaign/campaignTable/tableConstant";
import DropDown from "../../../components/generic/dropdownsaarthi2/DropdownSaarthi";

import {
  SERVER_URL_CONNECTOR,
  CAMPAIGN_URL,
  SCHEDULER_URL,
} from "../../../services/ApiRoutes";
import axios from "axios";
import downArrow from "../../../theme/assets/svg/campaign/dropdownIconDown.svg";
import DiallerSection from "../../../components/moduleComponents/campaign/diallerSection/DiallerSection";
import InitialScreen from "../../../components/moduleComponents/campaign/initialScreen/InitialScreen";
import DateFilter from "../../../components/generic/datefilter/DateFilter";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import CallingListTable from "../../../components/moduleComponents/campaign/callingListTable/CallingListTable";
import PauseCampaignReason from "../../../components/moduleComponents/campaign/pauseCampaignReason/PauseCampaignReason";
import ScheduleCampaignConfirm from "../../../components/moduleComponents/campaign/scheduleCampaignConfirm/ScheduleCampaignConfirm";
import InProgressPopup from "../../../components/moduleComponents/campaign/inProgressPopup/InProgressPopup";
import * as breadcrumActions from "../../../redux/breadcrum/actions";
import * as omniChannelAction from "../../../redux/omniChannel/actions";
import UseCaseScreen from "../../../components/moduleComponents/campaign/useCaseScreen/UseCaseScreen";
import "../../../components/moduleComponents/table/Table.css";
import { useDispatch } from "react-redux";
import {getAllClientData,setAllClientData} from '../../../redux/allClient/actions/allClient.action';
function Campaign(props) {
  const [bodyData, setBodyData] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [clickData, setClickData] = useState(0);
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [paginationData, setPaginationData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [resetBodydata, setResetBodydata] = useState([]);
  const [hideToggle, setHideToggle] = useState(false);
  const [resetClickData, setResetClickData] = useState([]);
  const [showScreen, setShowScreen] = useState(false);
  const [selecteDetails, setSelectDetails] = useState({});
  const [clientList, setClientList] = useState([]);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [resetClientList, setResetClientList] = useState([]);
  const [searchClientName, setSearchClientName] = useState([]);
  const [initialBodyData, setInitialBodyData] = useState([]);
  const [load, setLoad] = useState("Loaded");
  const [showEditPage, setShowEditPage] = useState(false);
  const [showChildId, setShowChildId] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [clickedArchieved, setClickedArchieved] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [pauseModalShow, setPauseModalShow] = useState(false);
  const [pauseId, setPauseId] = useState();
  const [scheduleModal, setScheduleModal] = useState(false);
  const [toPauseIcon, setToPauseIcon] = useState();
  const [callingListData, setCallingListData] = useState();
  const [progressModal, setProgressModal] = useState(false);
  const [scheduleCampaignData, setScheduleCampaignData] = useState();
  const [infoId, setInfoId] = useState();
  const [closeArrowList, setCloseArrowList] = useState(false);
  const [dateFil, setDateFil] = useState();
  const [labelParentId, setlabelParentId] = useState([]);
  const dispatch=useDispatch();

  let mainClientName = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
  let accountId = props.userLoginInfo?.userDetail?.accountDetails[0]?.id;
  let typeCheck = props.userLoginInfo?.accountDetails[0]?.type;
  let inialPageVisible = props.userLoginInfo?.demoSessionModules;

  useEffect(() => {
    axios
      .get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/account/v1/all`,
        headers
      )
      .then((res) => {
        if (res.data) {
          let arrData = res.data.data;
          let filteredData = arrData.map((each) => {
            return each?.name;
          });
          setClientList(["Select All", ...filteredData]);
          setResetClientList(["Select All", ...filteredData]);
          dispatch(setAllClientData(res.data.data));
        }
      });
    props.tabSelected("");
     
  }, []);
  //to maintained filter Date
  useEffect(() => {
    if (dateFil) {
      props.setFilteredDateRangeCamapign({
        fromDate: dateFil?.fromDate,
        toDate: dateFil?.toDate,
      });
      setPageNo(1);
    }
  }, [dateFil]);

  useEffect(() => {
    if (!showEditPage || !showCreate) {
      if (props.dateFilterCampaign) {
        const from_date = format(
          props.dateFilterCampaign?.fromDate
            ? new Date(props.dateFilterCampaign?.fromDate)
            : new Date(),
          "yyyy-MM-dd"
        );

        const to_date = format(
          props.dateFilterCampaign?.toDate
            ? new Date(props.dateFilterCampaign?.toDate)
            : new Date(),
          "yyyy-MM-dd"
        );

        props.setDateFilterData({ fromDate: from_date, toDate: to_date });
      } else {
        let today = format(new Date(), "yyy-MM-dd");
        const from_date = today;
        const to_date = today;
        props.setDateFilterData({ fromDate: from_date, toDate: to_date });
      }
    }
  }, [showEditPage, showCreate]);

  useEffect(() => {
    if (typeCheck === "External") {
      setSelectedClientName((prev) => mainClientName);
    }
  }, [mainClientName]);

  const moveToEdit = (data) => {
    //for channel and two ids ----

    props.setAllChannelArray(data?.channels);
    props.setAllCampaignChannelData([data]);

    //---end
    props.setSelectedCampaignCredentials(data);
    props.setCampaignEditOrCreateType("edit");
    props.setCamapignSelectedData(data);
    props.setCreatedCampaignIdNameEdit({ id: data.id });
    setEditData((prev) => data);
    setShowEditPage(true);
    props.storeSelectedDialTime();
    props.setUpdateModeOmni("update");
    props.setDCBdataforwhatsAppflowupTime([])
    props.setSelectedDispositionDataWP([])
    props.storeSeparateSelectedDataWP([])
    props.setSelectedDispositionDataChildWP([])
    props.shuffledConnectedSuccedingWP([])
    props.shuffledNotConnectedSuccedingWP([])
    props.setDCBdataforwhatsAppflowupTime("remove")
    props.setDCBdataforwhatsApp("remove")
  };

  const setValue = (arrSize) => {
    setTotalPage(arrSize);
  };

  const getPagination = () => {
    bodyData?.sort((a, b) => {
      return a.index - b.index;
    });

    let arrSize = bodyData?.length;
    // arrSize =  Math.ceil(arrSize / 11);
    // setTotalPage((prev) => arrSize);
    let tempData = bodyData;
    //    let startValue=(pageNo-1)*11
    //    let endValue=pageNo*11
    //     tempData = tempData?.slice(startValue, endValue);
    setPaginationData(tempData);
    setOriginalData(tempData);
  };
  useEffect(() => {
    getPagination();
  }, [bodyData, pageNo]);

  useEffect(() => {
    if (selectedClientName?.length) {
      props.setCampaignClientName(selectedClientName);
    }
  }, [selectedClientName]);

  // useEffect(() => {
  //   if (selectedClientName?.length) {
  //     props.setCampaignClientName(selectedClientName);
  //   }
  // }, [selectedClientName]);

  const deleteCampaignData = (data, pgno) => {
    setShowDeleteModal(true);
    setDeleteId({
      id: data.id,
      campaignId: data.campaignName ? data.campaignName : data.campaignId,
    });
    // setPageNo(pgno)
  };

  const showManualScreen = (data) => {
    let temp = showScreen;
    setShowScreen(!temp);
    setSelectDetails(data);
    props.setSelectedCampaignCredentials(data);
    props.setCreatedCampaignIdNameEdit({ id: data.id });
  };

  const deleteCampaign = (isDelete) => {
    const deleteCampaignUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.DELETE_CAMPAIGN}`;
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
      "Content-Type": "application/json",
      "x-access-token": tokenZx,
    };

    if (isDelete) {
      axios({
        method: "delete",
        url: deleteCampaignUrl,
        data: { id: deleteId.id },
        headers: headers,
      })
        .then((res) => {
          if (res?.data?.data?.Status === "Deleted Successfully") {
            toast.success("Campaign deleted successfully!");
          } else {
            toast.error("Campaign deletion failed as it has mapped files");
          }

          // getCampaignList("delete")
          // "Campaign deletion failed as it has mapped files"
          setShowDeleteModal(false);
        })
        .catch((err) => {
          if (err?.response?.status == 401) {
            history("/login");
            clearCacheData();
            window.location.reload();
            props.setLoggedInUserInfo();
          }
        });
      // setShowDeleteModal(false)
    } else {
      setShowDeleteModal(false);
    }
  };

  // useEffect(()=>{
  //     if(!selectedClientName){
  //
  //     getCampaignList()
  //     }
  // },[!selectedClientName])

  let headers = {
    "Content-Type": "application/json",
    "x-access-token": props?.userLoginInfo?.userSessionDetails?.accessToken,
  };
  const toListTable = () => {
    let fromDate = props.filteredDateRangeData?.fromDate;
    let toDate = props.filteredDateRangeData?.toDate;
    if (
      !selectedClientName?.length &&
      typeCheck === "Internal" &&
      !clickedArchieved
    ) {
      !showDeleteModal && setLoading(true);
      const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
      setLoad();
      Axios.get(getCampaignListUrl, {
        params: {
          after: fromDate,
          before: toDate,
          limit: 11,
          offset: pageNo,
          search: searchData,
        },
        headers: headers,
      })
        .then((res) => {
          if (res.data) {
            setBodyData(res.data.data?.campaigns);
            let arrSize = Math.ceil(res.data.data?.totalCount / 11);
            setTotalPage((prev) => arrSize);
            setInitialBodyData(res.data.data?.campaigns);
            setLoading(false);
            setLoad("Loaded");
          }
        })
        .catch((err) => {
          if (err?.response?.status == 401) {
            history("/login");
            clearCacheData();
            window.location.reload();
            props.setLoggedInUserInfo();
          }
        });
    }
  };
  // useEffect(() => {
  //   toListTable();
  // }, []);

  // useEffect(() => {
  //   if (
  //     !selectedClientName?.length &&
  //     typeCheck === "Internal" &&
  //     !clickedArchieved
  //   ) {
  //     let fromDate = format(new Date(props.filteredDateRangeData?.fromDate), "yyyy-MM-dd");
  //     let toDate = format(new Date(props.filteredDateRangeData?.toDate), "yyyy-MM-dd");
  //     const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
  //     !showDeleteModal && setLoad();
  //     Axios.get(getCampaignListUrl, {
  //       params: {
  //         after: fromDate,
  //         before: toDate,
  //         limit: 11,
  //         offset: pageNo,
  //         search: searchData,
  //       },
  //       headers: headers,
  //     })
  //       .then((res) => {
  //         if (res.status == 401) {
  //           history("/login");
  //           props.setLoggedInUserInfo();
  //         }

  //         if (res.data) {
  //           setBodyData(res.data.data?.campaigns);
  //           let arrSize = Math.ceil(res.data.data?.totalCount / 11);
  //           setTotalPage((prev) => arrSize);
  //           setInitialBodyData(res.data.data?.campaigns);
  //           setLoad("Loaded");
  //         }
  //       })
  //       .catch((err) => {
  //         if(err?.response?.status==401){
  //           history.push("/login");
  //         clearCacheData();
  //         window.location.reload();
  //         props.setLoggedInUserInfo();
  //         }
  //       });
  //   }
  // }, [
  //   !selectedClientName,
  //   !showCreate,
  //   !showScreen,
  //   !showDeleteModal,
  //   props.filteredDateRangeData,
  //   !showEditPage,
  //   pageNo,
  //   searchData?.length,
  // ]);

  const pushToCreate = () => {
    props.setSelectedCallingData([]);
    props.setIsCampaignCreate(true);
    props.setCampaignEditOrCreateType("create");
    let temp = showCreate;
    setShowCreate(!temp);
    props.setUpdateModeOmni("create");
    props.setCamapignSelectedData();
    props.setAllCampaignChannelData();
  };

  const moveToPrevious = () => {
    handleClickPageNo(0);
    setShowCreate(false);
    setEditData([]);
    // getCampaignList()
  };

  const downloadCampaignData = (downloadData) => {
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": tokenZx,
      },
    };
    Axios.get(
      `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerUploadInfo/v1/get?campaignManagerId=${props.campaignIdNameEdit.id}`,
      headers
    )
      .then((res) => {
        if (res.status == 401) {
          history("/login");
          props.setLoggedInUserInfo();
        }
        if (res.data && res.data.data) {
          let iddata = res.data.data;
          if (iddata.downloadablePath) {
            let data = { fileName: iddata.downloadablePath };
            Axios.post(
              `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/callingInfo/v1/downloadCallingInfo`,
              data,
              headers
            )
              .then((res) => {
                if (res.status == 401) {
                  history("/login");
                  props.setLoggedInUserInfo();
                }
                if (res.data) {
                  const dataToDownload = jsonToCsv(res.data);
                  downloadCsvFile(dataToDownload, "Campaign details.csv");
                }
              })
              .catch((err) => {
                if (err?.response?.status == 401) {
                  history("/login");
                  clearCacheData();
                  window.location.reload();
                  props.setLoggedInUserInfo();
                }
              });
          }
        }
      })
      .catch((err) => {
        if (err?.response?.status == 401) {
          history("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
        }
      });
  };
  useEffect(() => {
    if (props.moveToCallingList == "true") {
      setShowCreate(false);
      setShowEditPage(false);
      setTimeout(() => {
        getAllTableDataCampaignupdatedStatus();
      }, 3000);
    }
  }, [props.moveToCallingList]);

  const handleSearchChange = (e) => {
    setPageNo((prev) => 1);

    // let toSearch = (e.target.value.trim())
    setSearchData((prev) => e.target.value.trim());
    // let finalData = paginationData.map((dat, i) => {

    //    if (
    //     (dat.campaignId?.toString()?.toLowerCase().match(toSearch?.toLowerCase()) && toSearch)||
    //    (dat.campaignId?.toString()?.toLowerCase().includes(toSearch?.toLowerCase()) && toSearch)) {
    //     return dat
    //      }
    // })
    // let data = finalData.filter(e => { return e })
    // if(e.target.value?.length>0){
    //    setBodyData(data)
    //    setClickData(0)
    // }else{
    //     if(initialBodyData.length>0){
    //         setBodyData(initialBodyData)
    //         setClickData(prev => ["Select All",...resetClickData])
    //     }else{
    //         setBodyData( prev => resetBodydata)
    //         setClickData(prev => ["Select All",...resetClickData])
    //     }

    // }
  };

  const setIsActive = (data) => {
    if (data.toLowerCase() == "campaign") {
      setShowCreate(false);
    }
  };
  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
    // setClickData(value)
    // setResetClickData(value)
  };

  const onChangeClientName = (data) => {
    if (data?.toLowerCase() != "no matches found") {
      setSelectedClientName(data);
      if (data == "Select All") {
        setSearchClientName("");
        setClientList(resetClientList);
      }
    }
  };

  const getSearchItem = (e) => {
    setSearchClientName(e.target.value);
    let toSearchSaarthi = e.target.value.toLowerCase();
    let searchSaarthiData = resetClientList;
    if (toSearchSaarthi.length > 0) {
      let filteredSaarthiData = searchSaarthiData.map((d, i) => {
        if (d == "Select All") {
          return d;
        } else {
          if (d?.toLowerCase().match(toSearchSaarthi) && toSearchSaarthi) {
            return d;
          }
        }
      });
      let finalSaarthiData = filteredSaarthiData.filter((e) => {
        return e;
      });

      if (finalSaarthiData.length > 1) {
        setClientList(finalSaarthiData);
      } else {
        setClientList(resetClientList);
      }
    } else {
      setClientList(resetClientList);
    }
  };

  const getAllTableDataCampaign = () => {
    let fromDate = format(
      props.filteredDateRangeData?.fromDate
        ? new Date(props.filteredDateRangeData?.fromDate)
        : new Date(),
      "yyyy-MM-dd"
    );
    let toDate = format(
      props.filteredDateRangeData?.toDate
        ? new Date(props.filteredDateRangeData?.toDate)
        : new Date(),
      "yyyy-MM-dd"
    );
    if (
      !selectedClientName?.length &&
      typeCheck === "Internal" &&
      !clickedArchieved
    ) {
      !showDeleteModal && setLoad();

      const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
      Axios.get(getCampaignListUrl, {
        params: {
          after: fromDate,
          before: toDate,
          limit: 11,
          offset: pageNo,
          search: searchData,
        },
        headers: headers,
      })
        .then((res) => {
          if (res.data) {
            setBodyData(res.data.data?.campaigns);
            let arrSize = Math.ceil(res.data.data?.totalCount / 11);
            setTotalPage((prev) => arrSize);
            setInitialBodyData(res.data.data?.campaigns);
            setLoading(false);
            setLoad("Loaded");
          }
        })
        .catch((err) => {
          if (err?.response?.status == 401) {
            history("/login");
            clearCacheData();
            window.location.reload();
            props.setLoggedInUserInfo();
          }
        });
    } else {
      if (selectedClientName == "Select All" && !clickedArchieved) {
        const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
        !showDeleteModal && setLoad();
        Axios.get(getCampaignListUrl, {
          params: {
            after: fromDate,
            before: toDate,
            limit: 11,
            offset: pageNo,
            search: searchData,
          },
          headers: headers,
        })
          .then((res) => {
            if (res.status == 401) {
              history("/login");
              props.setLoggedInUserInfo();
            }

            if (res.data) {
              setBodyData(res.data.data?.campaigns);
              let arrSize = Math.ceil(res.data.data?.totalCount / 11);
              setTotalPage((prev) => arrSize);
              setInitialBodyData(res.data.data?.campaigns);
              setLoad("Loaded");
            }
          })
          .catch((err) => {
            if (err?.response?.status == 401) {
              history("/login");
              clearCacheData();
              window.location.reload();
              props.setLoggedInUserInfo();
            }
          });
      } else {
        if (selectedClientName?.length && !clickedArchieved) {
          const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}?accountName=${selectedClientName}`;
          !showDeleteModal && setLoad();
          Axios.get(getCampaignListUrl, {
            params: {
              after: fromDate,
              before: toDate,
              limit: 11,
              offset: pageNo,
              search: searchData,
            },
            headers: headers,
          })
            .then((res) => {
              if (res.status == 401) {
                history("/login");
                props.setLoggedInUserInfo();
              }

              if (res.data) {
                setBodyData((prev) => res.data.data?.campaigns);
                let arrSize = Math.ceil(res.data.data?.totalCount / 11);
                setTotalPage((prev) => arrSize);
                setInitialBodyData((prev) => res.data.data?.campaigns);
                setLoad("Loaded");
              }
            })
            .catch((err) => {
              if (err?.response?.status == 401) {
                history("/login");
                clearCacheData();
                window.location.reload();
                props.setLoggedInUserInfo();
              }
            });
        }
      }
    }
  };
  // for getting updated mapping status

  const getAllTableDataCampaignupdatedStatus = () => {
    let fromDate = format(
      props.filteredDateRangeData?.fromDate
        ? new Date(props.filteredDateRangeData?.fromDate)
        : new Date(),
      "yyyy-MM-dd"
    );
    let toDate = format(
      props.filteredDateRangeData?.toDate
        ? new Date(props.filteredDateRangeData?.toDate)
        : new Date(),
      "yyyy-MM-dd"
    );
    if (
      !selectedClientName?.length &&
      typeCheck === "Internal" &&
      !clickedArchieved
    ) {
      const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
      Axios.get(getCampaignListUrl, {
        params: {
          after: fromDate,
          before: toDate,
          limit: 11,
          offset: pageNo,
          search: searchData,
        },
        headers: headers,
      })
        .then((res) => {
          if (res.data) {
            setBodyData(res.data.data?.campaigns);
            let arrSize = Math.ceil(res.data.data?.totalCount / 11);
            setTotalPage((prev) => arrSize);
            setInitialBodyData(res.data.data?.campaigns);
            // setLoading(false);
            // setLoad("Loaded");
          }
        })
        .catch((err) => {
          if (err?.response?.status == 401) {
            history("/login");
            clearCacheData();
            window.location.reload();
            props.setLoggedInUserInfo();
          }
        });
    } else {
      if (selectedClientName == "Select All" && !clickedArchieved) {
        const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
        // !showDeleteModal && setLoad();
        Axios.get(getCampaignListUrl, {
          params: {
            after: fromDate,
            before: toDate,
            limit: 11,
            offset: pageNo,
            search: searchData,
          },
          headers: headers,
        })
          .then((res) => {
            if (res.status == 401) {
              history("/login");
              props.setLoggedInUserInfo();
            }

            if (res.data) {
              setBodyData(res.data.data?.campaigns);
              let arrSize = Math.ceil(res.data.data?.totalCount / 11);
              setTotalPage((prev) => arrSize);
              setInitialBodyData(res.data.data?.campaigns);
              // setLoad("Loaded");
            }
          })
          .catch((err) => {
            if (err?.response?.status == 401) {
              history("/login");
              clearCacheData();
              window.location.reload();
              props.setLoggedInUserInfo();
            }
          });
      } else {
        if (selectedClientName?.length && !clickedArchieved) {
          const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}?accountName=${selectedClientName}`;
          // !showDeleteModal && setLoad();
          Axios.get(getCampaignListUrl, {
            params: {
              after: fromDate,
              before: toDate,
              limit: 11,
              offset: pageNo,
              search: searchData,
            },
            headers: headers,
          })
            .then((res) => {
              if (res.status == 401) {
                history("/login");
                props.setLoggedInUserInfo();
              }

              if (res.data) {
                setBodyData((prev) => res.data.data?.campaigns);
                let arrSize = Math.ceil(res.data.data?.totalCount / 11);
                setTotalPage((prev) => arrSize);
                setInitialBodyData((prev) => res.data.data?.campaigns);
                // setLoad("Loaded");
              }
            })
            .catch((err) => {
              if (err?.response?.status == 401) {
                history("/login");
                clearCacheData();
                window.location.reload();
                props.setLoggedInUserInfo();
              }
            });
        }
      }
    }
  };

  useEffect(() => {
    // let fromDate = format(new Date(props.filteredDateRangeData?.fromDate), "yyyy-MM-dd");
    // let toDate = format(new Date(props.filteredDateRangeData?.toDate), "yyyy-MM-dd");
    // if (selectedClientName == "Select All" && !clickedArchieved) {
    //   const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
    //   !showDeleteModal && setLoad();
    //   Axios.get(getCampaignListUrl, {
    //     params: {
    //       after: fromDate,
    //       before: toDate,
    //       limit: 11,
    //       offset: pageNo,
    //       search: searchData,
    //     },

    //     headers: headers,
    //   })
    //     .then((res) => {

    //       if (res.data) {
    //         setBodyData(res.data.data?.campaigns);
    //         let arrSize = Math.ceil(res.data.data?.totalCount / 11);
    //         setTotalPage((prev) => arrSize);
    //         setInitialBodyData(res.data.data?.campaigns);
    //         setLoad("Loaded");
    //       }
    //     })
    //     .catch((err) => {
    //       if(err?.response?.status==401){
    //         history.push("/login");
    //         clearCacheData();
    //         window.location.reload();
    //         props.setLoggedInUserInfo();
    //         }
    //     });
    // } else {
    //   if (selectedClientName?.length && !clickedArchieved) {
    //     const getCampaignListUrl = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}?accountName=${selectedClientName}`;
    //     !showDeleteModal && setLoad();
    //     Axios.get(getCampaignListUrl, {
    //       params: {
    //         after: fromDate,
    //         before: toDate,
    //         limit: 11,
    //         offset: pageNo,
    //         search: searchData,
    //       },
    //       headers: headers,
    //     })
    //       .then((res) => {
    //         if (res.status == 401) {
    //           history("/login");
    //           props.setLoggedInUserInfo();
    //         }

    //         if (res.data) {
    //           setBodyData((prev) => res.data.data?.campaigns);
    //           let arrSize = Math.ceil(res.data.data?.totalCount / 11);
    //           setTotalPage((prev) => arrSize);
    //           setInitialBodyData((prev) => res.data.data?.campaigns);
    //           setLoad("Loaded");
    //         }
    //       })
    //       .catch((err) => {
    //         if(err?.response?.status==401){
    //           history.push("/login");
    //           clearCacheData();
    //           window.location.reload();
    //           props.setLoggedInUserInfo();
    //           }
    //       });
    //   }
    // }
    getAllTableDataCampaign();
  }, [
    selectedClientName,
    !showCreate,
    !showScreen,
    !showDeleteModal,
    props.filteredDateRangeData?.fromDate,
    props.filteredDateRangeData?.toDate,
    !showEditPage,
    pageNo,
    searchData?.length,
    !clickedArchieved,
    !scheduleModal,
  ]);
  const accountType = window.sessionStorage.getItem("userType");

  useEffect(() => {
    if (props.clientNameRedux?.length)
      setSelectedClientName((prev) => props.clientNameRedux);
  }, [
    props.clientNameRedux,
    !showCreate,
    !showScreen,
    !showDeleteModal,
    !showEditPage,
    !showClient,
  ]);

  const initialPage = () => {
    setShowCreate(false);
  };

  //for getting child Campaign
  const getChildCampaign = (id) => {
    if (showChildId?.includes(id)) {
      let tempArr = [...showChildId];
      const indexr = tempArr.indexOf(id);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setShowChildId((prevState) => {
        return [...tempArr];
      });
      setCloseArrowList((prev) => false);
      setPaginationData(originalData);
    } else {
      setCloseArrowList((prev) => true);
      setPaginationData(originalData);
      setShowChildId((prevState) => {
        return [id];
      });
    }
  };
  useEffect(() => {
    if (!showChildId?.length) {
      setCloseArrowList((prev) => false);
    }
  }, [showChildId]);

  // useEffect(
  //   () => {
  //     setlabelParentId(prev => props.campaignListParentidlabel)
  //   },[props.campaignListParentidlabel]
  // )

  useEffect(() => {
    if (labelParentId?.length) {
      let temp = [];
      paginationData?.map((e) => {
        if (labelParentId?.includes(e.id)) {
          let arrId = paginationData?.map((e) => e.id);
          temp.push(e);
          if (e?.children) {
            let child = e?.children;
            child.map((id) => {
              if (showChildId?.includes(id.id)) {
                temp.push(id);
                if (id?.children) {
                  let childsub = id?.children;
                  childsub?.map((d) => {
                    temp.push(d);
                  });
                }
              } else if (!arrId?.includes(id?.id)) {
                temp.push(id);
              }
            });

            // temp.push(...e.children)
          }
        } else {
          temp.push(e);
        }
      });
      setPaginationData(temp);
    } else {
      setPaginationData(originalData);
    }
  }, [labelParentId, showChildId, originalData]);

  // get parent id
  const getParentLabelId = (id) => {
    if (labelParentId?.includes(id)) {
      let tempArr = [...labelParentId];
      const indexr = tempArr.indexOf(id);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setlabelParentId((prevState) => {
        return [...tempArr];
      });
      props.setParentCampaignListId([...tempArr]);
      setShowChildId((prev) => []);
    } else {
      setPaginationData(originalData);
      setlabelParentId((prevState) => {
        return [id];
      });
      props.setParentCampaignListId([id]);
    }
  };

  const history = useNavigate();
  const moveToAnnalyticPage = (data) => {
    let obj = {
      id: data?.id,
      campaignName: data?.campaignName ? data?.campaignName : data?.campaignId,
      startDate: data?.startDate,
      endDate: data?.endDate,
      allInfo: data,
    };
    props.storeDataForAnalytics(obj);
    props.setIsPageType("analytics dashboard");
    history("/dashboard");
    window.sessionStorage.setItem("isActive", "map");
    sessionStorage.setItem("pageType", "analytics dashboard");
    //  props.setIsActivePageType("analytics dashboard")
    //  props.setIsPageType("analytics dashboard")
  };
  const moveToCallingListPage = (data) => {
    setCallingListData((prev) => data);
    setShowClient((prev) => true);
  };
  //TO make archieve
  const handleArchieve = (id, data) => {
    let obj = {
      campaignId: id,
      archive: !data,
    };
    Axios.patch(
      `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.ARCHIEVE_API}`,
      obj,
      headers
    )
      .then((res) => {
        if (!data) {
          getAllTableDataCampaign();
          toast.success(`Campaign archieved successfully!
                                      Note - This can be restore from archived tab. `);
        } else {
          toast.success("Campaign Unarchieved successfully!");
          getAllArchievedTableData();
        }
      })
      .catch((err) => {
        if (err?.response?.status == 401) {
          history("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
        }
        toast.error("Campaign archieved  error!");
      });
  };
  //To Play and Pause the Campaign
  //for play
  const handlePlayCampaign = (id) => {
    let objPlay = {
      campaignId: id,
      pause: false,
    };
    Axios.patch(
      `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.PLAY_PAUSE_API}`,
      objPlay,
      headers
    )
      .then((res) => {
        toast.success("Campaign Resumed Successfully!");
        getAllTableDataCampaign();
      })
      .catch((err) => {
        toast.error("Campaign Resumed error!");
        if (err?.response?.status == 401) {
          history("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
        }
      });
  };
  //for pause
  const handlePauseCampaign = (id) => {
    setPauseModalShow(true);
    setPauseId((prev) => id);
  };
  const onSubmitPause = (value) => {
    let objPlay = {
      campaignId: pauseId,
      pause: true,
      reason: value,
    };
    Axios.patch(
      `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.PLAY_PAUSE_API}`,
      objPlay,
      headers
    )
      .then((res) => {
        if (res.status == 401) {
          history("/login");
          props.setLoggedInUserInfo();
        }
        toast.success("Campaign Paused Successfully!");
        setPauseModalShow(false);
        getAllTableDataCampaign();
      })
      .catch((err) => {
        toast.error("Campaign Paused error!");
        if (err?.response?.status == 401) {
          history.push("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
        }
      });
  };

  //To schedule Campaign
  const toShowScheduleModal = (data) => {
    setScheduleModal((prev) => true);

    setScheduleCampaignData((prev) => data);
  };

  // To show Modal of progress
  const toshowProgressModal = (data) => {
    setInfoId(data?.id);
    setProgressModal(true);
  };

  // To get All Archieved Data table

  const getAllArchievedTableData = () => {
    let fromDate = format(
      new Date(props.filteredDateRangeData?.fromDate),
      "yyyy-MM-dd"
    );
    let toDate = format(
      new Date(props.filteredDateRangeData?.toDate),
      "yyyy-MM-dd"
    );
    let getCampaignListUrl =
      SERVER_URL_CONNECTOR + "" + CAMPAIGN_URL.ALL_CAMPAIGN_LIST + "?";
    if (selectedClientName?.length && selectedClientName !== "Select All") {
      getCampaignListUrl = `${getCampaignListUrl}accountName=${selectedClientName}`;
    }

    getCampaignListUrl = `${getCampaignListUrl}&showArchived=true`;
    setLoad();
    Axios.get(getCampaignListUrl, {
      params: {
        after: fromDate,
        before: toDate,
        limit: 11,
        offset: pageNo,
        search: searchData,
      },
    }).then((res) => {
      if (res.data) {
        setBodyData((prev) => res.data.data?.campaigns);
        let arrSize = Math.ceil(res.data.data?.totalCount / 11);
        setTotalPage((prev) => arrSize);
        setInitialBodyData((prev) => res.data.data?.campaigns);
        setLoad("Loaded");
      }
    });
  };
  useEffect(() => {
    if (clickedArchieved) {
      getAllArchievedTableData();
    }
    // else if(!clickedArchieved ){

    //     getAllTableDataCampaign()
    // }
  }, [clickedArchieved, searchData, selectedClientName, pageNo]);

  // resetDate
  useEffect(() => {
    if (!showClient) {
      //   let  start =  new Date()
      //  let end = new Date()
      // props.setDateFilterData({ fromDate: start, toDate: end });
      if (props.dateFilterCampaign) {
        const from_date = format(
          new Date(props.dateFilterCampaign?.fromDate),
          "yyyy-MM-dd"
        );

        const to_date = format(
          new Date(props.dateFilterCampaign?.toDate),
          "yyyy-MM-dd"
        );

        props.setDateFilterData({ fromDate: from_date, toDate: to_date });
      } else {
        let today = format(new Date(), "yyy-MM-dd");
        const from_date = today;
        const to_date = today;
        props.setDateFilterData({ fromDate: from_date, toDate: to_date });
      }
    }
  }, [showClient]);

  return (
    <>
      <div className="topDiv createCampaigPageWrapper">
        <div className="childdiv">
          {
            // loading?
            // <LoaderSaarthi />:
            showCreate ? (
              // <CreateCampaign
              // previous={()=>{moveToPrevious()}}
              // EditData={editData}
              // downloadData={(downloadData)=>{downloadCampaignData(downloadData)}}
              // />
              <>
                {/* <DiallerSection
                previous={()=>{moveToPrevious()}}
                EditData={editData}
                isCreate={true}
                /> */}
                {!inialPageVisible?.includes("Campaign") ? (
                  <InitialScreen EditData={editData} prevPages={initialPage} />
                ) : (
                  <UseCaseScreen EditData={editData} prevPage={initialPage} />
                )}

                {/* <CreateCampaignModel
                previous={()=>{moveToPrevious()}}
                EditData={editData}
               // downloadData={(downloadData)=>{downloadCampaignData(downloadData)}}
                /> */}
              </>
            ) : showEditPage ? (
              <DiallerSection
                previous={() => {
                  showEditPage ? setShowEditPage(false) : moveToPrevious();
                }}
                EditData={editData}
                isCreate={true}
              />
            ) : // <CallingListTable/>
            showClient ? (
              <CallingListTable data={callingListData} back={setShowClient} />
            ) : showScreen ? (
              <Screen
                selecteDetails={selecteDetails}
                presstoBack={setShowScreen}
              />
            ) : (
              <div className="campaign-data">
                <div className="btn-component campaignTableContainer">
                  <div className="search-input">
                    <div
                      className={
                        typeCheck?.toLowerCase() == "internal"
                          ? "searchDivTable"
                          : "searchDivTableExternal"
                      }
                    >
                      <Inputbox
                        className="userListSearchInput"
                        type="search"
                        value={searchData}
                        placeholder="Campaign Name"
                        imgSrcLeft={SearchIcon}
                        onChangeValue={(e) => handleSearchChange(e)}
                        imageClickLeft={() => {
                          true;
                        }}
                      />
                    </div>
                    {typeCheck?.toLowerCase() == "internal" &&
                      accountId != "6357ededbc771e3f0332e62f" &&
                      accountId != "6357e19818427181896d1232" && (
                        <div className="dropDownDiv">
                          <DropDown
                            droplist={{
                              optionList: clientList ? clientList : "",
                              placeHolderText: selectedClientName
                                ? selectedClientName
                                : "Select Client",
                              imgSrcRight: downArrow,
                            }}
                            // isFilter={true}
                            searchVal={searchClientName}
                            searchUi={true}
                            handleSearchItem={(data) => {
                              getSearchItem(data);
                            }}
                            selectedItem={(item) => onChangeClientName(item)}
                            extraClassSelectedArea={"languageDropdown"}
                            extraClassToBeSelectedArea={"dropdowndListArea"}
                          />
                        </div>
                      )}
                    <div className="dateFilterScheduler">
                      <DateFilter
                        id="dateRangeschedulers"
                        dateHeader={"show"}
                        onChangeValue="true"
                        getonChangeValue={setDateFil}
                      />
                    </div>
                    {
                      <div
                        className={
                          clickedArchieved ? "archiveBtnHigh" : "archiveBtn"
                        }
                        onClick={() => {
                          return setClickedArchieved((prev) => !prev);
                        }}
                      >
                        Archived
                      </div>
                    }
                  </div>

                  <div className="btn-div">
                    <Button
                      text=" Create Campaign "
                      extraClass="createCampaignButtonStyle"
                      onClick={() => pushToCreate()}
                    />
                  </div>
                </div>
                <div className="campaignTableContainer">
                  {/* <div className='search-input'>
                            <div className={`dropdown-search`}>
                                <InputBox
                                className={`dropDownSearchInput`}
                                type="text"
                                imgSrc={SearchIcon}
                                // imageClick={() => {}}
                                // name={props.ipName}
                                onChangeValue={(e)=>handleSearchChange(e)}
                                value={searchData}
                                placeholder="Search by Enterprise Name"
                                />
                            </div> */}

                  {/* <div className='management-table'> */}
                  {/* <ManagementTable
                            {...propsOfTable}
                            bodyData={bodyData}
                            tBodyClassName=""
                            showCreateForEdit={(data)=>{moveToEdit(data)}}
                            noOfPages={(arrSize)=>{setValue(arrSize)}}
                            isHandleClick={clickData}
                            deleteData={(data,pgno)=>{deleteCampaignData(data,pgno)}}
                            downloadData={(downloadData)=>{downloadCampaignData(downloadData)}}
                            /> */}
                  <div className="campaignTable">
                    <TableSaarthiJp
                      cols={tableConstants(
                        getChildCampaign,
                        typeCheck,
                        pageNo,
                        downloadCampaignData,
                        moveToEdit,
                        deleteCampaignData,
                        showManualScreen,
                        moveToAnnalyticPage,
                        moveToCallingListPage,
                        handleArchieve,
                        handlePlayCampaign,
                        handlePauseCampaign,
                        toShowScheduleModal,
                        toshowProgressModal,
                        closeArrowList,
                        showChildId,
                        getParentLabelId
                      )}
                      data={paginationData}
                      pageNo={pageNo}
                      isLoading={load}
                      hideBorderArray={labelParentId}
                    />
                  </div>
                  {/* </div> */}
                </div>
                <div>
                  {totalPage > 1 && (
                    <div>
                      <Pagination
                        totalNoOfPage={totalPage}
                        handleClickPageNo={(value) => handleClickPageNo(value)}
                        forcePage={pageNo}
                      />
                    </div>
                  )}
                </div>
                {/* <div className='pagination-campaign'>
                        <Pagination
                                forcePage={1}
                                getPage={clickData}
                                totalNoOfPage={totalPage}
                                handleClickPageNo={(value) => handleClickPageNo(value)}
                                />
                        </div> */}
              </div>
            )
          }
        </div>
        {showDeleteModal && (
          <div className="deleteModalCenter">
            <DeleteModal
              deleteData={(data) => {
                deleteCampaign(data);
              }}
              elementId={deleteId.campaignId}
              closeDeleteModal={() => {
                setShowDeleteModal(false);
              }}
            />
          </div>
        )}
        {pauseModalShow && (
          <div className="deleteModalCenter">
            <PauseCampaignReason
              close={setPauseModalShow}
              submit={onSubmitPause}
            />
          </div>
        )}
        {scheduleModal && (
          <div className="deleteModalCenter">
            <ScheduleCampaignConfirm
              close={setScheduleModal}
              scheduleData={scheduleCampaignData}
            />
          </div>
        )}
        {progressModal && (
          <div className="deleteModalCenter">
            <InProgressPopup hide={setProgressModal} id={infoId} />
          </div>
        )}
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    campaignIdName: state.campaignReducer?.campaignIdName,
    campaignIdNameEdit: state.campaignReducer?.campaignIdNameEdit,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    clientNameRedux: state.campaignReducer?.campaignClientName,
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    moveToCallingList: state.breadcrumReducer?.goToCallingList,
    dateFilterCampaign: state.campaignReducer?.datefiltercampaign,
    campaignListParentidlabel: state.campaignReducer?.campaignListParentId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      {},
      campaignAction,
      loginAction,
      filterAction,
      breadcrumActions,
      schedulerAction,
      omniChannelAction
    ),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
