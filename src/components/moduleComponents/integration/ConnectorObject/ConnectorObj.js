import React, { useEffect, useState,useRef } from "react";
import DropdownSaarthi from "../../../generic/dropdownsaarthi2/DropdownSaarthi";
import saveIcon from "../../../../theme/assets/svg/integration/save.svg";
import axios from "axios";
import dropdownRightIcon from "../../../../theme/assets/svg/integration/dropdownIcon.svg";
import DropdownSaarthi2 from "../../../moduleComponents/integration/dropdownSaarthi/DropdownSaarthi";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import "./ConnectorObj.css";
import eyeIcon from "../../../../theme/assets/svg/integration/visibility.png";
import ReactTooltip from "react-tooltip";




function ConnectorObj(props) {
  const [sfJobName, setSfJobName] = useState();
  const [fetchSfObject, setFetchSfObject] = useState([]);
  const [fetchSaarthiObject, setFetchSaarthiObject] = useState([]);
 
  const [headerList,setHeaderList]=useState([])
  const [saarthiObjectName,setSaarthiObjectName]=useState([])
  const [saarthiObjectField,setSaarthiObjectField]= useState([])
  const [resetSaarthiObjectField,setResetSaarthiObjectField]=useState([])
  const [sfObjectName,setSfObjectName]=useState([])
  const [fetchSfObjectField,setFetchSfObjectField]=useState([])
 
  const [fetchList,setFetchList]=useState({"fetch sf field":[props.fetchConnectorFieldData],"fetch Saarthi field":[]})
  const [pushList,setPushList]=useState({"push sf field":[props.fetchConnectorFieldData],"push Saarthi field":[]})
  const [editData,setEditData]=useState({})
  useEffect(()=>{
    console.log(sfObjectName,saarthiObjectName,"ssss")
    if(sfObjectName?.length>0 && saarthiObjectName?.length>0){
   
      let temp=[]
      temp.push(0)
      // if(props.heading=="Fetch data from SFDC"){
      //   if(props.isEdit==false || (fetchList["fetch Saarthi field"]?.length==0 && fetchList["fetch sf field"]?.length>0)){
         
      //     setHeaderList(temp)
      //   }
      // }else{
      //   if(props.isEdit==false || (pushList["fetch Saarthi field"]?.length==0 && fetchList["fetch sf field"]?.length>0)){
       
      //     setHeaderList(temp)
      //   }
      // }
      if(props.isEdit===false){
             setHeaderList(temp)
          }
      // alert(sfObjectName)
      // alert(saarthiObjectName)
     
      getSaarthiFieldData()
      getsfFieldData()
    }
  
  },[sfObjectName ,saarthiObjectName])

  useEffect(() => {
    if (props.jobName?.length > 0) {
      setSfJobName(props.jobName);
    }
  }, [props.jobName]);
  const getSfObject = async (jobname) => {
    const getSfObjectUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/fetchObjects?jobName=${props.jobName}`;
 
    await axios
      .get(getSfObjectUrl)
      .then((response) => {
        let responseData = response.data.data;
        setFetchSfObject(responseData);
       
      })
      .catch((err) => {
        console.log((err) => console.log("error in api sfobject"));
      });
  };


  const getSaarthiObject = async (jobname) => {
    const getSaarthiObjectUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/v1/fetchObjects?jobName=${props.jobName}`;
    await axios
      .get(getSaarthiObjectUrl)
      .then((response) => {
     
        let responseData = response.data.data;
        setFetchSaarthiObject(responseData);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getsfFieldData = async (jobName) => {
    const getsfFieldDataUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/fetchObjectFields?objectName=${sfObjectName}&jobName=${props.jobName}`;
    await axios
      .get(getsfFieldDataUrl)
      .then((response) => {
      
        let responseData = response.data.data;
        setFetchSfObjectField((prev) => responseData);
        
      })
      .catch((err) => console.log("err in the getfield url"));
  };

  const getSaarthiFieldData = async (jobName) => {
    const getSaarthiFielDataUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/v1/fetchObjectFields?objectName=${saarthiObjectName}&jobName=${props.jobName}`;
    await axios
      .get(getSaarthiFielDataUrl)
      .then((responce) => {
       
        let responceData = responce.data.data;
        setSaarthiObjectField((prev) => responceData);
        setResetSaarthiObjectField((prev)=>responceData)
      })
      .catch((err) => console.log("error in saarthi field url"));
  };


  //To hit the api for dropdown
  useEffect(() => {
    if (sfJobName?.length > 0 && props.isConnected && props.jobName) {
     
      getSfObject(props.jobName);
      getSaarthiObject(props.jobName);
    }
  }, [props.isConnected,props.jobName]);

  const propsForDropdown1 = {
    // optionList: ["test1", "test2", "test3", "test4", "test1", "test2", "test3", "test4"],
    optionList: fetchSfObject,
    imgSrcRight: dropdownRightIcon,
    placeHolderText: sfObjectName?.length>0?sfObjectName:props.stName === "SF Object" ? props.stName : props.sfName,
  };

  const propsForDropdown2 = {
    // optionList: ["test1", "test2", "test3", "test4"],
    optionList: fetchSaarthiObject,
    imgSrcRight: dropdownRightIcon,
    placeHolderText:
    saarthiObjectName?.length>0?saarthiObjectName:
      props.sfName === "Saarthi Object" ? props.sfName : props.stName,
  };

  const onChangeSelectedSfObject = (selectedItem) => {
   
    setSfObjectName(selectedItem);
  };
  const onChangeSelectedSaarthiObject = (selectedItem) => {
  
    setSaarthiObjectName(selectedItem);
  };

  const searchFilter=(e)=>{
    let toSearch = (e.target.value).toLowerCase()
    // setSearchData(e.target.value)
    // let finalData = resetBodydata.map((dat, i) => {
    //     if (dat.accountId.toLowerCase().match(toSearch) && toSearch) {
    //         return dat
    //     }
    // })
    // let data = finalData.filter(e => { return e })
    // if(e.target.value?.length>0){
      
    // }else{
       
    // }
  }

  useEffect(() => {
    if (
      sfJobName?.length > 0 &&
      sfObjectName?.length >0 &&
      saarthiObjectName?.length >0 
    ) {
      getSaarthiFieldData(sfJobName);
      getsfFieldData(sfJobName);
    }
  }, [sfJobName, sfObjectName, saarthiObjectName]);


  const addMoreDropDown = (i) => {
   
    let temp = headerList
    temp.push(i + 1)
    setHeaderList([...temp])
   
  }
  const removeDropDown = (index) => {
    let temp = headerList
        if (index > -1) {
            temp.splice(index, 1);
        }
        if([props.heading]==="Fetch data from SFDC"){
          let tempObj =Object.assign({}, fetchList)
          tempObj["fetch sf field"].splice(index, 1)
          tempObj["fetch Saarthi field"].splice(index, 1)
          setHeaderList([...temp])
          setFetchList(tempObj)
        }else{
          let tempObj =Object.assign({}, pushList)
          tempObj["push sf field"].splice(index, 1)
          tempObj["push Saarthi field"].splice(index, 1)
          setHeaderList([...temp])
          setPushList(tempObj)
        }
       
  }

  const handleFetchChange=(item,name,i)=>{
    
    let temp= props.heading==="Fetch data from SFDC"?Object.assign({},fetchList):Object.assign({},pushList)
    if(typeof i === 'number'){
      if(item){
        if(temp[name][i]?.length>0){
          temp[name][i].push(item)
        }else{
          temp[name][i]=item
        }
       
      
     }
     let datalist=Object.assign([],resetSaarthiObjectField)
     let fadata=datalist.filter((each)=> item !==each)
    
     setSaarthiObjectField(fadata)
    }else{
      
      if(item){
          temp[name]=item
      }
    }
    setFetchList(temp)
    setPushList(temp)
  
  
  
  }

  

  useEffect(() => {
    if(props.fetchConnectorFieldData?.length>0){
      handleFetchChange(props.fetchConnectorFieldData,"fetch sf field")
    }else{
      let temp=Object.assign({},fetchList)
      temp["fetch sf field"]=[]
      setFetchList(temp)
      let tempPush=Object.assign({},pushList)
      tempPush["push sf field"]=[]
      setPushList(tempPush)
    }
  
  }, [props.fetchConnectorFieldData]);

  const onSave=(title)=>{
    if(title==="Fetch data from SFDC"){
    
      let MappedFields=Object.keys(fetchList["fetch Saarthi field"]).map((each,i)=>{
        return  {[fetchList["fetch Saarthi field"][i]]: fetchList["fetch sf field"][i]}
      })
      
      const fetchRecordData = {
        "fetchData": {
          "sourceObject": sfObjectName,
          "sourceFields": fetchList["fetch sf field"],
          "targetObject": saarthiObjectName,
          "targetFields": fetchList["fetch Saarthi field"],
          "fieldMapping": MappedFields
        },
        "jobName": props.jobName
      };
       props.handleSaveFetchData(fetchRecordData)
    }else{
 let MappedFields=Object.keys(pushList["push Saarthi field"]).map((each,i)=>{
        return  {[pushList["push Saarthi field"][i]]: pushList["push sf field"][i]}
      })
      let mapped = MappedFields.map(item => ({ [item.key]: item.value }) );
    let newObj = Object.assign({}, ...mapped );
      
      const pushRecordData = {
        "pushData": {
          "sourceObject": saarthiObjectName,
          "sourceFields": pushList["push Saarthi field"],
          "targetObject": sfObjectName,
          "targetFields": pushList["push sf field"],
          "fieldMapping": MappedFields
        },
        "jobName": props.jobName
      };
       props.handleSavePushData(pushRecordData)
    }
  }

  useEffect(()=>{
    if(props.isEdit){
      let temp={}
      if(props.jobName?.length > 0)
       axios.get(`http://connectors.saarthi.ai/api/connectors/job/v1/job?jobName=${props.jobName}`).then(
         responce => {
              temp=responce.data.data
              setEditData(temp)
              if(props.heading==="Fetch data from SFDC"){
                let fieldData= Object.assign({}, ...temp["fetchMapping"]["fieldMapping"]);
                let saarthiField=Object.keys(fieldData)
                let sfField =Object.values(fieldData)
                let mArr= Array.from({length: temp["fetchMapping"]["fieldMapping"].length},(dat,i)=>{return i});
                setHeaderList(mArr)
                setSfObjectName(temp["fetchMapping"]["sourceObject"])
                setSaarthiObjectName(temp["fetchMapping"]["targetObject"])
                setFetchList({"fetch sf field":sfField,"fetch Saarthi field":saarthiField})
                props.setFetchConnectorField("SET_FETCHCONNECTOR_TYPE",sfField)
              }else{
                let fieldData= Object.assign({}, ...temp["pushMapping"]["fieldMapping"]);
                let saarthiField=Object.keys(fieldData)
                let sfField =Object.values(fieldData)
                let mArr= Array.from({length: temp["pushMapping"]["fieldMapping"].length},(dat,i)=>{return i});
                setHeaderList(mArr)
                setSfObjectName(temp["pushMapping"]["sourceObject"])
                setSaarthiObjectName(temp["pushMapping"]["targetObject"])
                setPushList({"push sf field":sfField,"push Saarthi field":saarthiField})
              }
        }
       ).catch((err) => console.log("error ") )
  
    }
  },[props.isEdit])


  return (
    <div className="myConnectorobjWrapper">
      <div className="ConnectorObjectOuterDiv">
        <div className="HeadingDiv">
          <p className="heading">{props.heading}</p>
        </div>
        <div className="firstDropDownDiv">
          <div className="dropdownDiv">
            <div>
              <DropdownSaarthi
                droplist={
                  props.sfName === "Saarthi Object"
                    ? propsForDropdown2
                    : propsForDropdown1
                }
                placeHolderText={"-select-"}
                loading={() => false}
                selectedItem={
                  (item) =>
                    props.sfName === "Saarthi Object"
                      ? onChangeSelectedSaarthiObject(item)
                      : onChangeSelectedSfObject(item)
                  // onChangeSelectedSfObject(item)
                }
                extraClassSelectedArea={"extraStyleSfObject"}
                extraClassToBeSelectedArea={"dropdownStyling"}
                extraClassDropdownSearchArea={"searchIconStyle"}
              />
            </div>
            <div>
              <DropdownSaarthi
                droplist={
                  props.stName === "SF Object"
                    ? propsForDropdown1
                    : propsForDropdown2
                }
                placeHolderText="-select-"
                loading={() => false}
                selectedItem={(item) =>
                  //onChangeSelectedSaarthiObject(item)
                  props.stName === "SF Object"
                    ? onChangeSelectedSfObject(item)
                    : onChangeSelectedSaarthiObject(item)
                }
                extraClassSelectedArea={"extraStyleSfObject"}
                extraClassToBeSelectedArea={"dropdownStyling"}
                extraClassDropdownSearchArea={"searchIconStyle"}
              />
            </div>
          </div>
          <div className="saveIcon" onClick={()=>{onSave(props.heading)}}>
            <img src={saveIcon}></img>
          </div>
        </div>
        <div className="droplist-div">
        {headerList.map((each, i) => {
         
          return (
            <div key = {i} >
              {props.heading === "Fetch data from SFDC" ? (
                //fetch dropdown
                <div className="firstDropDownDiv">
                  <div className="dropdownDiv">
                    <div>
                      <DropdownSaarthi2
                          droplist={{ optionList: "filterData", imgSrcRight: true }}
                          filterName={"fetch sf field"}
                          filterListData={{ language: true, list:fetchSfObjectField, id:i}}
                          selectedItem={{ }}
                          isFilter={true}
                          placeHolderText={(fetchList["fetch sf field"].length>0) && (fetchList["fetch sf field"][i])?(fetchList["fetch sf field"][i]).length>1?`${fetchList["fetch sf field"][i][0]} +${(fetchList["fetch sf field"][i].length)-1}`:fetchList["fetch sf field"][i]:"-Select-"}
                      
                          // filterListData={{language:true}}
                          // searchUi={true}
                          ipName={"fetch sf field"}
                          selectedItems={props.fetchConnectorFieldData[i]}
                          idData={i}
                          handleSearchItem={(e)=>searchFilter(e)}
                         
                      />
                     
                    </div>
                    <div>
                    <DropdownSaarthi2
                      droplist={{ optionList: fetchList["fetch Saarthi field"]?saarthiObjectField.filter(e=> !fetchList["fetch Saarthi field"].includes(e)):saarthiObjectField, imgSrcRight: true }}
                      filterName={"fetch Saarthi field"}
                      selectedItem={(item) => {handleFetchChange(item,"fetch Saarthi field",i)}}
                      isFilter={true}
                      placeHolderText={fetchList["fetch Saarthi field"].length>0 && fetchList["fetch Saarthi field"][i]?fetchList["fetch Saarthi field"][i]:"-Select-"}
                      filterListData={{ language: true }}
                      searchUi={true}
                      handleSearchItem={(e)=>searchFilter(e)}
                      />
                    </div>
                  </div>
                  <div className="AddBtnDiv">
                  <div  className="btn">
                    { 
                  <p data-tip={props.fetchConnectorFieldData[i]?.toString()} 
                  style={props.fetchConnectorFieldData[i]?.length>0?{}:{visibility:"hidden"}}
                  >
                        <img
                          className={`eyeIcon`}
                          src={eyeIcon}
                          alt="Eye Icon"
                          data-tip=""
                          data-for="imgTip"
                         
                        />
                  
                       </p>}
                        {/* <ReactTooltip 
                          className='toolTip'
                          id={i}
                          place="top"
                          effect="solid"
                          arrowColor="#00000000"
                         >
                        {fetchList["fetch sf field"].join(",")}
                         </ReactTooltip> */}
                          <ReactTooltip />
                       
                      </div>
                    <div
                      // className="btn"
                      className={((fetchSaarthiObject.length) === i) ? "hide-it":(headerList.length-1===i)?"btn":"hide-it" }
                      onClick={() => {
                        addMoreDropDown(i);
                      }}
                      
                    >
                     
                      +
                    </div>
                    <div
                      // className="btn"
                      className={(i === 0)  ? "hide-it" : "btn"}
                      onClick={() => {
                        removeDropDown(i);
                      }}
                      
                    >
                    
                      -
                    </div>
                  </div>
                </div>
              ) : (
                //push dropdown
                <div className="firstDropDownDiv">
                  <div className="dropdownDiv">
                    <div>
                 
                      <DropdownSaarthi2
                        droplist={{
                          optionList:pushList["push Saarthi field"]?
                          saarthiObjectField.filter(e=> !pushList["push Saarthi field"].includes(e)):
                          saarthiObjectField,
                         imgSrcRight: true,
                        }}
                        filterName={"push Saarthi field"}
                        isFilter={true}
                        searchUi={true}
                        filterListData={{ language: true, id: i }}
                        placeHolderText={ (pushList["push Saarthi field"].length>0 && pushList["push Saarthi field"][i])?pushList["push Saarthi field"][i]:"-Select-"}
                        handleSearchItem={(e)=>searchFilter(e)}
                        selectedItem={(item) => {
                          handleFetchChange(item,"push Saarthi field",i)}
                        }
                      />
                    </div>
                    <div>
                      <DropdownSaarthi2
                        droplist={{
                          optionList:
                          pushList["push sf field"]?
                          fetchSfObjectField.filter(e=> !pushList["push sf field"].includes(e)):
                          fetchSfObjectField,
                          imgSrcRight: true,
                        }}
                        filterName={"push sf field"}
                        isFilter={true}
                        searchUi={true}
                        filterListData={{ language: true, id: i }}
                        handleSearchItem={(e)=>searchFilter(e)}
                        placeHolderText={(pushList["push sf field"].length>0 && pushList["push sf field"][i])?pushList["push sf field"][i]:"-select-"}
                        selectedItem={(item) => {
                           handleFetchChange(item,"push sf field",i)}}
                      />
                    </div>
                  </div>
                  <div className="AddBtnDiv">
                    <div
                      // className="btn"
                      className={((fetchSaarthiObject.length) === i) ? "hide-it":(headerList.length-1===i)?"btn":"hide-it" }
                      onClick={() => {
                        addMoreDropDown(i);
                      }}
                      style={{width:"30px"}}
                    >
                      {" "}
                      +
                    </div>
                    <div
                      // className="btn"
                      className={i === 0 ? "hide-it" : "btn"}
                      onClick={() => {
                        removeDropDown(i);
                      }}
                      style={{width:"30px"}}
                    >
                      {" "}
                      -{" "}
                    </div>
                  </div>
                </div>
              )}
            
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    // jobName: state.dashboardReducer.jobName,
    // fetchConnectorFieldData: state.dashboardReducer.fetchConnectordata,
    // isConnected: state.dashboardReducer.isConnectionDone
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectorObj);