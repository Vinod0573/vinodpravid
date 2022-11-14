import React, { useState, useEffect } from "react";
import DropdownSaarthi from "../../../generic/dropdownMapping/DropdownSaarthi";
import "./FileMappinng.css";
import closeTag from "../../../../theme/assets/genericSvg/crossIcon.svg";
import Button from "../../../generic/button/Button";
import axios from "axios";
import minusIcon from "../../../../theme/assets/svg/campaign/minusSign.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as loginAction from "../../../../redux/onboarding/login/actions";
import  clearCacheData from "../../../../utils/clearCacheData"
import eyeIcon from "../../../../theme/assets/svg/campaign/visibility.png";
import ReactTooltip from "react-tooltip";
import { isArray} from "lodash";
import { toast } from "react-toastify";
import AddBtn from "../../../moduleComponents/demo/addBtn/AddBtn";
import { useNavigate } from "react-router-dom";


function FileMapping(props) {
  const {
    onClose,
    csvHeaderData,
    saarthiHeaderData,
    saarthiList,
    csvList,
    saarthiHeaderList,
    csvHeaderList,
    uploadCSV,
    path,
    editData,
    campaignId,
    customerDataType,
    setCustomerData,
  } = props;
  const [headerList, setHeaderList] = useState([0]);
  const [headerList1, setHeaderList1] = useState([]);
  const [headerList2, setHeaderList2] = useState([]);
  const [dropListData, setDropListData] = useState({
    "saarthi header": [],
    "csv header": [],
  });
  const [enableCheckbox, setEnableCheckbox] = useState(false);
  const [search, setSearch] = useState({ saarthi: "", csv: "", childData: "" });
  const [error, setError] = useState([]);
  const [isCustomerData, setIsCustomerData] = useState(false);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [childData, setChildData] = useState("");
  const [childList, setChildList] = useState([]);
  const [resetChildList, setResetChildList] = useState([]);
  const [parentData, setParentData] = useState("");
  const [objVal,setObjVal]=useState("")
  const [keyVal,setKeyVal]=useState("")
  const [selectedChild, setSelectedChild] = useState({
    primaryInfo: [],
    contactInfo: [],
    email: [],
    address: [],
    customerPreference: [],
    loanAccountDetails: [],
    behaviourDetails: [],
    others:[]
  });
  const history=useNavigate();

  const [finalList, setFinalList] = useState([]);
  const [resetFinalList, setResetFinalList] = useState([]);

  const [totalItemToBeSelected, setTotalItemToBeSelected] = useState();

  const [typeOfUploadClick, setTypeOfUploadClick] = useState();
  const [isValid, setIsValid] = useState(false)
  const [unMappedCsvFields,setUnMappedCsvFields]= useState("")


  useEffect(() => {
    // alert(props.typeUploadClick);
    setTypeOfUploadClick((prev) => props.typeUploadClick);
    if (props.typeUploadClick === "uploadOne") {
      let minm = Math.min(csvHeaderData?.length, 64);
      setTotalItemToBeSelected((prev) => minm);
    } else {
      let minm = Math.min(csvHeaderData?.length, saarthiHeaderData?.length);
      setTotalItemToBeSelected((prev) => minm - 1);
    }
  }, [props.typeUploadClick]);

  const dropdownChanges = () => {
    if (customerDataType?.length > 0) {
      let tempObj = Object.assign({}, dropListData);
      let data1 = tempObj["saarthi header"];
      let data2 = Object.assign([], tempObj["csv header"]);
      let headList1 = [...saarthiHeaderData];

      let fheadData1 = headList1.filter((x) => !data1.includes(x));
      saarthiHeaderList(fheadData1);
      setHeaderList2(fheadData1);
      data2.push(...customerDataType);
      let headList2 = [...csvHeaderData];
      let fheadData2 = headList2.filter((x) => !data2.includes(x));

      setHeaderList1(prev=>fheadData2);
      csvHeaderList(prev=>fheadData2);
    } else {
      let tempObj = Object.assign({}, dropListData);

      let data1 = tempObj["saarthi header"];
      let data2 = tempObj["csv header"];

      let headList1 = [...saarthiHeaderData];

      let fheadData1 = headList1.filter((x) => !data1.includes(x));
      saarthiHeaderList(fheadData1);
      setHeaderList2(prev=>fheadData1);
      let headList2 = [...csvHeaderData];
      let fheadData2 = headList2.filter((x) => !data2.includes(x));
      setHeaderList1(prev=>fheadData2);
      csvHeaderList(prev=>fheadData2);
    }
  };

  // account name 
  let  accountName=props?.userLoginInfo?.userDetail?.accountDetails?.[0]?.name;



  const AddHeadersList = (index) => {
    setSearch(prev=>{ return {saarthi: "", csv: "", childData: "" }})
    if (csvHeaderData.length - 1 > index) {
      let temp = headerList;
      temp.push(index + 1);
      setHeaderList(prev=>[...temp]);
      dropdownChanges();

    }
  };


  const removeHeaderList = (index) => {
    setSearch(prev=>{ return {saarthi: "", csv: "", childData: "" }})
    let temp = headerList;
    if (index > -1) {
      temp.splice(index, 1);
    }
    let tempObj = Object.assign({}, { ...dropListData });
    tempObj["saarthi header"].splice(index, 1);
    tempObj["csv header"].splice(index, 1);
    setHeaderList([...temp]);
    setDropListData(prev=>tempObj);

    if (props.typeUploadClick == "uploadOne") {

      let tempObj = Object.assign({}, dropListData);
      let data2 = tempObj["csv header"];
      let headList2 = [...csvHeaderData];
      let fheadData2 = headList2.filter((x) => !data2.includes(x));
      setHeaderList1(prev=>fheadData2);
      csvHeaderList(prev=>fheadData2);
      let filledData = tempObj["saarthi header"].map((x) => {
        return x.split(".");
      });

      let tempFinalObj = { ...finalList };
      let testarr = [...finalList];
      let test = { ...resetFinalList };

      let t = filledData.map((x, i) => {
        return { [x[0]]: x[1] };
      });

      let result = {};
      t.map((ar) => {
        Object.keys(ar).map((k) => {
          if (k in result) {
            result[k].push(ar[k]);
          } else {
            result[k] = [ar[k]];
          }
        });
      });
      const arrayOfObj = Object.entries(result).map((e) => ({ [e[0]]: e[1] }));

      arrayOfObj.map((x, i) => {
        let keyVal = Object.keys(x)[0];
        let parentIndex = testarr.findIndex(
          (obj) => Object.keys(obj)[0] == Object.keys(x)
        );
        let objVal = Object.values(x)[0];
        tempFinalObj[parentIndex][keyVal] = test[parentIndex][keyVal]
        // .filter(
        //   (ex) => !objVal.includes(ex)
        // );
      });
      setFinalList(prev=>Object.assign([], tempFinalObj));
    }
  };

  const handleChange = (item, name, i) => {
    if (name == "saarthi header" && item == "customerData") {
      setEnableCheckbox(prev=>true);
      setIsCustomerData(prev=>true);
    } else {
      setIsCustomerData(prev=>false);
    }

    if (item.length > 0) {
      let temp = Object.assign({}, dropListData);
      temp[name][i] = item;

      setDropListData((prevState) => {
        return temp;
      });
    }
    dropdownChanges();
  };

  const getInputData = (e, name) => {
    var toSearch = e.target.value.toLowerCase();

    var finalData = [];
    var temp = Object.assign({}, search);
    if (e.target.name == "saarthi header") {
      if (name == "childSearch") {
        finalData = childList?.map((dat, i) => {
          if (dat.toLowerCase().match(toSearch) && toSearch) {
            return dat;
          }
        });
        let data = finalData.filter((e) => {
          return e;
        });
        temp.childData = toSearch;
        setSearch(temp);
        if (e.target.value.length > 0) {
          setChildList(prev=>data);
        } else {
          setChildList(prev=>resetChildList);
        }
      } else {
        let listed = [].concat.apply([], headerList2);
        finalData = listed?.map((dat, i) => {
          if (dat.toLowerCase().includes(toSearch) && toSearch) {
            return dat;
          }
        });
        let data = finalData.filter((e) => {
          return e;
        });
        temp.saarthi = toSearch;
        setSearch(temp);
        if (e.target.value.length > 0) {
          setHeaderList2(prev=>data);
        } else {
          setHeaderList2(prev=>saarthiHeaderData);
        }
      }
    }
    if (e.target.name == "csv header") {
      finalData = headerList1.map((dat, i) => {
        if (dat.toLowerCase().match(toSearch) && toSearch) {
          return dat;
        }
      });
      let data = finalData.filter((e) => {
        return e;
      });
      temp.csv = toSearch;
      setSearch(temp);
      if (e.target.value.length > 0) {
        setHeaderList1(prev=>data);
      } else {
        setHeaderList1(prev=>csvHeaderData);
      }
    }
  };

  useEffect(() => {
    if (customerDataType?.length > 0) {
      dropdownChanges();
    }
  }, [customerDataType]);

  useEffect(() => {
    if (saarthiList?.length > 0) {
      setHeaderList2(prev=>saarthiList);
    }
  }, [saarthiList]);
  useEffect(() => {}, [csvList]);

  useEffect(() => {
      setHeaderList1(prev=>csvHeaderData);
      setHeaderList2(prev=>saarthiHeaderData)
    }, [csvHeaderData, saarthiHeaderData]);

  // useEffect(() => {
  //   setCustomerData("SET_CUSTOMER_DATA", []);
  // }, []);

  function convertToObj(a, b) {
    if (a.length != b.length || a.length == 0 || b.length == 0) {
      return null;
    }

    // Using Object.assign method
    return Object.assign(...a.map((k, i) => ({ [k]: b[i] })));
  }

  const onSaveClicked = () => {
    let tempObj = Object.assign({}, dropListData);
    let data = convertToObj(tempObj["saarthi header"], tempObj["csv header"]);
        let datalist = Object.assign(
      {},
      {
        ...data,
        campaignManagerId: campaignId || props.campaignIdName?.id,
        // customerData: customerDataType?.length > 0 ? customerDataType : [],
        uploadFile: path,
        accountId: props.campaignDetails?.accountId,
        // props.userLoginInfo?.userDetail?.accountDetails[0]?.id,
      }
    );

    let tempArr = [];
    if (props.typeUploadClick === "uploadOne") {
      if (!tempObj["saarthi header"].includes("primaryInfo.firstName")) {
        tempArr.push("primaryInfo-firstName ");
      }
      // if (!tempObj["saarthi header"].includes("primaryInfo.lastName")) {
      //   tempArr.push("primaryInfo-lastName ");
      // }
      if (!tempObj["saarthi header"].includes("primaryInfo.language")) {
        tempArr.push("primaryInfo-language ");
      }
      if (!tempObj["saarthi header"].includes("primaryInfo.flow")) {
        tempArr.push("primaryInfo-flow ");
      }
      if (!tempObj["saarthi header"].includes("primaryInfo.subFlow")) {
        tempArr.push("primaryInfo-subFlow ");
      }
      if (!tempObj["saarthi header"].includes("contactInfo.primary")) {
        tempArr.push("contactInfo-primary ");
      }
      if (!tempObj["saarthi header"].includes("loanAccountDetails.loanId")) {
        tempArr.push("loanAccountDetails-loanId ");
      }
      // if(!tempObj["saarthi header"].includes("primaryInfo.subFlow")){
      //   tempArr.push("primaryInfo-subFlow")
      // }
      if (
        !tempObj["saarthi header"].includes("loanAccountDetails.emiDueDate")
      ) {
        tempArr.push("loanAccountDetails-emiDueDate ");
      }
      if (!tempObj["saarthi header"].includes("loanAccountDetails.emiAmount")) {
        tempArr.push("loanAccountDetails-emiAmount ");
      }
      if( accountName?.includes("LendingKart") && !tempObj["saarthi header"].includes("loanAccountDetails.loanCategory")){
      tempArr.push("loanAccountDetails-loanCategory");
     }
     if( accountName?.includes("LendingKart") && !tempObj["saarthi header"].includes("loanAccountDetails.autoPayment")){
      tempArr.push("loanAccountDetails-autoPayment");
     }


    } else if (props.typeUploadClick === "uploadTwo") {
      if (!tempObj["saarthi header"].includes("phone")) {
        tempArr.push("phone number");
      }
      if (!tempObj["saarthi header"].includes("paymentStatus")) {
        tempArr.push("paymentStatus ");
      }
      // if (!tempObj["saarthi header"].includes("emiAmount")) {
      //   tempArr.push("emiAmount ");
      // }
      // if (!tempObj["saarthi header"].includes("loanId")) {
      //   tempArr.push("loanId ");
      // }
    }

    if (tempArr.length > 0) {
      setError(`${tempArr.toString()} is required`);
    } else {
      if (tempObj["saarthi header"].length != tempObj["csv header"].length) {
        setError("Data with respect to CSV Header is required");
      } else {
        var objdata = Object.entries(datalist)?.map((each, i) => {
          return { [each[0]]: each[1] };
        });
        let lengthprop = Object.values(objdata).length;
        if (lengthprop >= 3) {
          if (path.name?.length > 0) {
            uploadCSV(datalist, "new", tempObj, resetFinalList);
          } else{
            uploadCSV(datalist, "uploaded", tempObj, resetFinalList);
          }
        } else {
          setError("Data with respect to CSV Header is required");
        }
      }
    }
  };
  const showHideChildDropdown = (data) => {
    setShowChildDropdown(prev=>data);
  };
  const handleSelectedChildItem = (data, i) => {
    setChildData(prev=>data);
    // let tempArr = Object.assign({},[...resetFinalList]);
    // let testarr =Object.assign([],[...resetFinalList]);
    let tempArr = { ...finalList };
    let testarr = [...finalList];
    let temp = Object.assign({}, selectedChild);
    temp[parentData][i] = data;
    temp[parentData]=temp[parentData].filter(e=>e)
    let parentIndex = testarr.findIndex(
      (obj) => Object.keys(obj)[0] == parentData
    );
    if (tempArr[parentIndex][parentData]) {
      tempArr[parentIndex][parentData] = resetFinalList[parentIndex][
        parentData
      ].filter((each) => {
        if (!selectedChild[parentData].includes(each)) {
          return each;
        }
      });
      setFinalList(prev=>Object.assign([], tempArr));
    }

    setSelectedChild(prev=>temp);
    let item = `${parentData}.${data}`;
    handleChange(item, "saarthi header", i);
  };

  useEffect(()=>{
    let dat ={...dropListData}
    let tVal={...selectedChild}

      let arr = dat["saarthi header"]
       let result = {}
        arr.map( each => {
            let [key,val] = each.split(".")
            if ( Object.keys(result).includes(key) ) {
                result[key].push(val)
            }else {
                result[key] = [val]
            }
        } )

      setSelectedChild({...tVal,...result})
    console.log(tVal,result,{...tVal,...result})
  },[dropListData])

  const onHoverData = (item) => {

    console.log(item,"pop")

    if (isArray(item) && item[0]?.length > 0) {
      let temp = item[0];
      setParentData(prev=>item[0]);
      setChildData("");
      let tempArr = [...resetFinalList]
        .map((each) => {
          if (Object.keys(each) == temp) {
            return each[temp];
          }
        })
        .filter((e) => {
          return e;
        });
        // console.log(dropListData["saarthi header"].map((each)=>{
        //   return each
        // }),"check")
      //  let val= tempArr[0].filter((x)=> !(selectedChild[item[0]].includes(x)))
      let fval=tempArr[0].map((each)=>{
        if(!selectedChild[item[0]]?.includes(each)){
          return each
        }
       }).filter(e=>e)
      //  console.log(selectedChild[item[0]],)
        // .filter((x)=> !(selectedChild[item[0]].includes(x))))
        setChildList(prev=>fval)
      // setResetChildList(prev=>tempArr[0]);
    }
  };

  const load = async () => {
    axios
      .get(
        "https://saarthistorage.blob.core.windows.net/connector/uploadFile/2022-04-13T10:32:47/Saarthi_Mock_Customer_Data_Final - Data.csv"
      )
      .then((res) => {});
  };

  let  tokenZx=props?.userLoginInfo?.userSessionDetails?.accessToken;
  let headers = {
        headers:{"Content-Type": "application/json" ,
     "x-access-token":tokenZx}
   };

  const getSaarthiField = () => {
    if (props.typeUploadClick == "uploadOne") {
      axios
        .get(
          `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerInfo/v1/fields`,headers
        )
        .then((res) => {

          if (res.data) {
            // let temp=[]
            // res.data.data.map((each)=>{
            //   return temp.push(...Object.keys(each))
            // })

            // let fchilarr=Object.assign({},temp)

            // let chr=Object.keys(fchilarr).map((ed)=>{
            //   return {[ed]:[]}
            // })
            // console.log(chr)
            // // setChildList(prev=>{return })

             setResetFinalList(prev=>[...res.data.data]);
            // setSelectedChild
          }
        }).catch(  (err)=>{
          if(err.response.status==401){
            history("/login");
          clearCacheData();
          window.location.reload();
          props.setLoggedInUserInfo();
          }

        });
    }
  };

  useEffect(() => {
    setFinalList([...props.responseData]);
    if (props.typeUploadClick != "uploadOne") {
      setResetChildList(prev=>[...props.responseData]);
    }
  }, [props.responseData]);

  useEffect(() => {
    load();
    getSaarthiField();
  }, []);

  const setMappedDatas=()=>{
    if (
      props.mappedCredentials &&
      props.mappedCredentials.mapping &&
      Object.keys(props.mappedCredentials.mapping).length > 0
    ) {
      // if( Object.keys(props.mappedCredentials.mapping).includes("Allocation")){
      //   setIsValid(true)
      // }else if( Object.keys(props.mappedCredentials.mapping).includes("Payment")){
      //   setIsValid(true)
      // }else{
      //   setIsValid(false)
      // }
      if (
        props.typeUploadClick === "uploadOne" &&
        Object.keys(props.mappedCredentials.mapping).includes("Allocation")
      ) {

        let tempObj = Object.assign({}, dropListData);
        tempObj["saarthi header"] = props.mappedCredentials.mapping["Allocation"] && props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]?.length>0?
        props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]:[];
        tempObj["csv header"] = props.mappedCredentials.mapping["Allocation"] && props.mappedCredentials.mapping["Allocation"]["csvHeaders"]?.length>0?
        props.mappedCredentials.mapping["Allocation"]["csvHeaders"]:[]

        setDropListData(prev=>tempObj);
        let data1 =props.mappedCredentials.mapping["Allocation"]&& props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]?.length>0 ?
          props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]:[];
        let data2 = props.mappedCredentials.mapping["Allocation"] &&props.mappedCredentials.mapping["Allocation"]["csvHeaders"]?.length>0?
        props.mappedCredentials.mapping["Allocation"]["csvHeaders"]:[];
        let headList1 = [...saarthiHeaderData];

        let fheadData1 = headList1.filter((x) => !data1.includes(x));
        saarthiHeaderList(fheadData1);
        setHeaderList2(prev=>fheadData1);
        let headList2 = [...csvHeaderData];
        let fheadData2 = headList2.filter((x) => !data2.includes(x));
        setHeaderList1(prev=>fheadData2);
        csvHeaderList(prev=>fheadData2);
        let value =props.mappedCredentials.mapping[
          "Allocation"
        ].csvHeaders?.length>0?props.mappedCredentials.mapping[
          "Allocation"
        ].csvHeaders.map((ea, i) => {
          return i;
        }):[0];
        let filledData = tempObj["saarthi header"].map((x) => {
          return x?.split(".");
        });
        console.log(filledData , "priya")
        let t = filledData.map((x, i) => {
          return { [x[0]]: x[1] };
        });

        let result = {};
        t.map((ar) => {
          Object.keys(ar).map((k) => {
            if (k in result) {
              result[k].push(ar[k]);
            } else {
              result[k] = [ar[k]];
            }
          });
        });
        const arrayOfObj = Object.entries(result).map((e) => ({ [e[0]]: e[1] }));

        setHeaderList(value);
      }
      if (
        props.typeUploadClick === "uploadTwo" &&
        Object.keys(props.mappedCredentials.mapping).includes("Payment")
      ) {

        let tempObj = Object.assign({}, dropListData);
        tempObj["saarthi header"] =props.mappedCredentials.mapping["Payment"] && props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]?.length>0?
          props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]:[];
        tempObj["csv header"] =props.mappedCredentials.mapping["Payment"] && props.mappedCredentials.mapping["Payment"]["csvHeaders"]?.length>0?
          props.mappedCredentials.mapping["Payment"]["csvHeaders"]:[];

        setDropListData(prev=>tempObj);
        let data1 = props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]?.length>0 ?
          props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]:[];
        let data2 = props.mappedCredentials.mapping["Payment"]["csvHeaders"]?.length>0?props.mappedCredentials.mapping["Payment"]["csvHeaders"]:[];
        let headList1 = [...saarthiHeaderData];

        let fheadData1 = headList1.filter((x) => !data1.includes(x));
        saarthiHeaderList(fheadData1);
        setHeaderList2(prev=>fheadData1);
        let headList2 = [...csvHeaderData];
        let fheadData2 = headList2.filter((x) => !data2.includes(x));
        setHeaderList1(prev=>fheadData2);
        csvHeaderList(prev=>fheadData2);
        let value = props.mappedCredentials.mapping["Payment"].csvHeaders?.length>0 ?
        props.mappedCredentials.mapping["Payment"].csvHeaders.map(
          (ea, i) => {
            return i;
          }
        ):[0];
        setHeaderList(prev=>value);
      }
    }
  }

  useEffect(() => {
    setMappedDatas()
  }, [props.mappedCredentials,props.mappedCredentials?.mapping, props.typeUploadClick]);

  useEffect(()=>{
    setMappedDatas()
  },[])

  const getDropdownDetails=(data)=>{
      setSearch(prev=>{ return {saarthi: "", csv: "", childData: "" }})
      setHeaderList2(prev=>saarthiHeaderData);
      setChildList(prev=>resetChildList)
  }

  const getValidateChanges=()=>{
    let headerData=csvHeaderData.map((ea)=>{
      return ea.toLowerCase()
    })
    if(props.typeUploadClick=="uploadOne"){
      let unmappedVal=props.mappedCredentials.mapping["Allocation"]["csvHeaders"].filter((x)=>{
        if( !(headerData.includes(x.toLowerCase()))){
          return x
        }})
        if(unmappedVal.length==0){
          setIsValid(true)
          toast.success("Validation successfull please proceed with uploading CSV")
        }
        setUnMappedCsvFields(prev=>unmappedVal.toString())
      }else{
      let unmappedVal=props.mappedCredentials.mapping["Payment"]["csvHeaders"].filter((x)=>{
        if( !(headerData.includes(x.toLowerCase()))){
          return x
        }})
        if(unmappedVal.length==0){
          setIsValid(true)
          toast.success("Validation successfull please proceed with uploading CSV")
        }
        setUnMappedCsvFields(prev=>unmappedVal.toString())

      }
    }
    let g=0
  return (
    <div className="admin-modal-wrapper">

        <div className="cursorDiv" onClick={() => onClose(resetFinalList)}>
            <img src={closeTag} className="cursorPointerBtn" />
          </div>

        <div className="addBtnField">
          <div className="headerContainerAddbtn">
          <div className="initial-div" >
            .csv Header
          </div>
          <div className="initial-div">
            Saarthi Header
          </div>

          </div>
        <div className={`addBtnCursor ${csvHeaderData.length - 1 > headerList.length - 1
                            ? ""
                            : "hide-it"}` }
        onClick={() => {
          AddHeadersList(g);
          g++;
        }}
        ><AddBtn
       extraStyle = "addButtonMapping"
       heading = "Add Field"
      /> </div> </div>
      <div className="admin-inner-div">
        {/* <div className="admin-div1">
          <div className="initial-div" style={{ marginLeft: "20px" }}>
            .csv Header
          </div>
          <div className="initial-div" style={{ marginRight: "-32px" }}>
            Saarthi Header
          </div>
           <divs style={{ height: "20px", width: "30px" }} >

          </divs>
        </div> */}
        <div className="header-list">
          {headerList?.map((each, i) => {
            return (
              <div className="admin-div1">
                <div
                  className={`admin-box ${
                    dropListData["saarthi header"][i] == "customerData"
                      ? "customer-data"
                      : ""
                  }`}
                >
                  {dropListData["saarthi header"][i] == "customerData" ? (
                    <>
                      <DropdownSaarthi
                        droplist={{
                          optionList: "filterData",
                          imgSrcRight: true,
                        }}
                        filterName={"customer-data"}
                        filterListData={{
                          language: true,
                          list:
                            customerDataType?.length > 0
                              ? [...customerDataType, ...headerList1]
                              : headerList1,
                        }}
                        selectedItem={(item) => {}}
                        isFilter={true}
                        placeHolderText={
                          customerDataType?.length > 0
                            ? `${customerDataType[0]} +${
                                customerDataType.length - 1
                              }`
                            : "Select Header"
                        }
                        // filterListData={{language:true}}
                        // searchUi={true}
                        ipName={"csv header"}
                      />
                    </>
                  ) : (
                    <DropdownSaarthi
                      droplist={{ optionList: headerList1, imgSrcRight: true }}
                      filterName={""}
                      selectedItem={(item) => {
                        if (item.length > 0) {
                          handleChange(item, "csv header", i);
                        }
                      }}
                      isFilter={true}
                      placeHolderText={
                        dropListData["csv header"] &&
                        dropListData["csv header"][i]
                          ? dropListData["csv header"][i]
                          : "Select Header"
                      }
                      filterListData={{ language: true }}
                      searchUi={true}
                      ipName={"csv header"}
                      ipValue={
                        Object.keys(search)?.length > 0 ? search.csv : ""
                      }
                      handleSearchItem={getInputData}
                    />
                  )}
                </div>

                <div className="admin-box">
                  {props.typeUploadClick === "uploadOne" ? (
                    <DropdownSaarthi
                      droplist={{ optionList: headerList2, imgSrcRight: true }}
                      filterName={""}
                      selectedItem={(item) => {
                        if (item.length > 0) {
                          return handleChange(item, "saarthi header", i);
                        }
                      }}
                      isFilter={true}
                      ipName={"saarthi header"}
                      ipValue={
                        Object.keys(search)?.length > 0 ? search.saarthi : ""
                      }
                      placeHolderText={
                        dropListData["saarthi header"] &&
                        dropListData["saarthi header"][i]
                          ? dropListData["saarthi header"][i].replace(
                              ".",
                              " - "
                            )
                          : "Select Header"
                      }
                      filterListData={{ language: true }}
                      searchUi={true}
                      handleSearchItem={getInputData}
                      onMouseEnter={(item) => {
                        showHideChildDropdown(true);
                        if(isArray(item)){
                          onHoverData(item)
                        }else{
                          onHoverData([item])
                        }
                      }}
                      onMouseLeave={() => {
                        showHideChildDropdown(true);
                      }}
                      hideAndShowDropdown={() => {
                        showHideChildDropdown(false);
                      }}
                      showChildDropdown={showChildDropdown}
                      handleSelectedChildItem={(data) =>
                        handleSelectedChildItem(data, i)
                      }
                      childDataList={childList}
                      childIpValue={
                        Object.keys(search)?.length > 0 ? search.childData : ""
                      }
                      isOpen={(val)=>{getDropdownDetails(val)}}
                      parent={parentData}
                    />
                  ) : (
                    <DropdownSaarthi
                      droplist={{ optionList: headerList2, imgSrcRight: true }}
                      filterName={""}
                      selectedItem={(item) => {
                        if (item.length > 0) {
                          return handleChange(item, "saarthi header", i);
                        }
                      }}
                      isFilter={true}
                      ipName={"saarthi header"}
                      // ipValue={
                      //   Object.keys(search)?.length > 0 ? search.saarthi : ""
                      // }
                      placeHolderText={
                        dropListData["saarthi header"] &&
                        dropListData["saarthi header"][i]
                          ? dropListData["saarthi header"][i]?.replace(
                              ".",
                              " - "
                            )
                          : "Select Header"
                      }
                      filterListData={{ language: true }}
                      searchUi={true}
                      handleSearchItem={getInputData}
                    />
                  )}
                </div>

                <div>
                  <>
                    <>
                      <img
                        className={`eyeIcon ${
                          customerDataType?.length > 0 &&
                          dropListData["saarthi header"][i] == "customerData"
                            ? ""
                            : "hide-it"
                        }`}
                        src={eyeIcon}
                        alt="Eye Icon"
                        data-tip=""
                        data-for="imgTip"
                        style={{ marginRight: "10px" }}
                      />

                      <ReactTooltip
                        className="toolTip"
                        id="imgTip"
                        place="top"
                        effect="solid"
                        arrowColor="#00000000"
                      >
                        {customerDataType?.join(", ")}
                      </ReactTooltip>
                    </>
                    {/* {
                      // headerList?.length <= totalItemToBeSelected &&
                      <img
                        src={plusIcon}
                        className={
                          headerList.length - 1 == i &&
                          csvHeaderData.length - 1 > i
                            ? ""
                            : "hide-it"
                        }
                        onClick={() => {
                          AddHeadersList(i);
                        }}
                        style={{
                          marginRight: "10px",
                          marginTop: "20px",
                          cursor: "pointer ",
                        }}
                      />
                    } */}
                    {/* <Button
                        text=" — "
                        extraClass={(i==0)?"removeButtonStyle hide-it":"removeButtonStyle"}
                        // className={(i==0)?"hide-it":""}

                        /> */}
                    {headerList?.length > 1 && (
                      <img
                        className="minusSignBtnnew"
                        onClick={() => {removeHeaderList(i)}}
                        src={minusIcon}

                      />
                    )}

                    {/* <img src={minusIcon}/> */}
                  </>
                </div>
              </div>
            );
          })}
        </div>
        <div className="admin-campaign-footer">
          <div className="error-field">
            {unMappedCsvFields?.length>0 &&
            <span>{unMappedCsvFields} CSV header is not there in the uploaded CSV file<br/> please update the corresponding fields in CSV.</span>}
            <span>{error}</span>
          </div>
          <div>
            {/* <button
              onClick={() => {
                onSaveClicked();
              }}
            >
              Upload .CSV
            </button> */}
             {
               props.mappedCredentials &&props.mappedCredentials.mapping &&
               ((Object.keys(props.mappedCredentials.mapping).includes("Allocation") && (props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]?.length>0 || props.mappedCredentials.mapping["Allocation"]["csvHeaders"]?.length>0)&&(props.typeUploadClick=="uploadOne") )||
               (Object.keys(props.mappedCredentials.mapping).includes("Payment") && (props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]?.length>0 ||props.mappedCredentials.mapping["Payment"]["csvHeaders"]?.length>0)&& (props.typeUploadClick=="uploadTwo"))) &&
               <Button
               // disabled={campaignName ? false : true}
               text=" Validate "
               extraClass="csvMUploadDataButtonStyleJp valid"
               onClick={() => getValidateChanges()}
              />
            }
            <Button
              disabled={isValid? false :
                props.mappedCredentials &&props.mappedCredentials.mapping &&
               ((Object.keys(props.mappedCredentials.mapping).includes("Allocation") &&  (props.mappedCredentials.mapping["Allocation"]["saarthiHeaders"]?.length>0 || props.mappedCredentials.mapping["Allocation"]["csvHeaders"]?.length>0) && (props.typeUploadClick=="uploadOne") )||
               (Object.keys(props.mappedCredentials.mapping).includes("Payment")&&(props.mappedCredentials.mapping["Payment"]["saarthiHeaders"]?.length>0 ||props.mappedCredentials.mapping["Payment"]["csvHeaders"]?.length>0)&& (props.typeUploadClick=="uploadTwo")))?
                true:false}
              text=" Upload .CSV "
              extraClass="csvMUploadDataButtonStyleJp"
              onClick={() => onSaveClicked()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    customerDataType: state.campaignReducer?.customerDataType,
    typeUploadClick: state.campaignReducer?.typeUploadClick,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    campaignIdName: state.campaignReducer?.campaignIdName,
    campaignDetails: state.campaignReducer.campaignCredentials,
    mappedCredentials: state.campaignReducer.mappedCredentials,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, campaignAction, loginAction),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FileMapping);