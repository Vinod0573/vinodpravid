import React, { useState, useEffect } from 'react';
import axios from "axios";
import JobName from './JobName';
import Button from "../../../generic/button/Button";
import TableHistory from './TableHistory'
import "./JobNav.css"
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { SALESFORCE_SERVER_URL, SALESFORCE_URL, RUN_SAVE_DATA_URL } from '../../../../services/ApiRoutes';
// import * as dashboardAction from "../../../actions/dashboardActions";
// import BackIcon from '../../../assets/back.png'
import BackIcon from "../../../../theme/assets/genericSvg/backIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import ConnectorObj from '../ConnectorObject/ConnectorObj';



function JobNav(props) {
  const [isExeHis, setIsExeHis] = useState(props.editabe ? true : true);
  // const[disableHis , setDisableHis] =useState(false)
  const [disableJobNav, setDisableJobNav] = useState(props.editable ? true : false);
  const [btn, Setbtn] = useState(props.editable ? false : true);
  const [btn1, Setbtn1] = useState(props.editable ? false : true);
  const [editData, setEditData] = useState({});
  const [nameOfJob, setNameOfJob] = useState();
  const [multiSelectOne, setMultiSelectOne] = useState(true);
  const [fetchSourceObject, setFetchSourceObject] = useState();
  const [fetchTargetObject, setFetchTargetObject] = useState();
  const [fetchSourceObjectField, setFetchSourceObjectField] = useState({});
  const [fetchTargetObjectField, setFetchTargetObjectField] = useState({});
  const [pushSourceObject, setPushSourceObject] = useState();
  const [pushTargetObject, setPushTargetObject] = useState();
  const [pushSourceObjectField, setPushSourceObjectField] = useState([]);
  const [pushTargetObjectField, setPushTargetObjectField] = useState([]);
  const [editdataobj, setEditDataObj] = useState({});
  const [editFetchSourceFields, setEditFetchSourceFields] = useState([]);
  const [editPushSourceFields, setEditPushSourceFields] = useState([]);
  const[editConnetorData , setEditConnectorData] = useState({})


  const arr = ["Job Name", "Connector Name", "Client Name", "Job Fetch Status"]

  const headers = {
    'Content-Type': 'application/json'
  };

  const saveFetchData = async (fetchedData) => {
    const saveFetchRecordsUrl = `${SALESFORCE_SERVER_URL}${SALESFORCE_URL.SAVE_FETCH_RECORDS_URL}`
    // let allConnectors = [];
    // for (const key in fetchSourceObjectField) {
    //   fetchSourceObjectField[key].forEach(data => {
    //     allConnectors.push(data);
    //   });
    // }

    // let targetArr = [];
    // for (const key in fetchTargetObjectField) {
    //   targetArr.push(fetchTargetObjectField[key]);
    // }

    // const fetchRecordData = {
    //   "fetchData": {
    //     "sourceObject": fetchSourceObject,
    //     "sourceFields": allConnectors,
    //     "targetObject": fetchTargetObject,
    //     "targetFields": targetArr,
    //     "fieldMapping": {}
    //   },
    //   "jobName": props.jobName
    // };

    // targetArr.forEach((t, i, a) => {
    //   fetchRecordData.fetchData.fieldMapping[t] = fetchSourceObjectField[i];
    // });

    await axios.post(saveFetchRecordsUrl, fetchedData, headers)
      .then((response) => {
        toast.success("Fetch data saved!");
      }).catch(err => {
        console.log(err);
      });
  };

  const savePushData = async (pushedData) => {
    const savePushRecordsUrl = `${SALESFORCE_SERVER_URL}${SALESFORCE_URL.SAVE_PUSH_RECORDS_URL}`
  
    await axios.post(savePushRecordsUrl, pushedData, headers)
      .then((response) => {
        toast.success("Push data saved!");
      }).catch(err => {
        console.log(err);
      });
  };

  const fetchAllSaleForceData = async () => {
    const runSaveDataUrl = `${SALESFORCE_SERVER_URL}${SALESFORCE_URL.RUN_SAVE_DATA_URL}`
    const headers = {
      "content-type": "application/json"
    }
    const runData = {
      "jobName": nameOfJob
    }
    await axios.post(runSaveDataUrl, runData, headers)
      .then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      });
  }
  const handleClickRunDownloadData = () => {
    fetchAllSaleForceData();
  }

  const handleSaveFetchData = (fetchedData) => {
    saveFetchData(fetchedData)
    Setbtn(false);
  }

  const handleSavePushData = (pushedData) => {
    savePushData(pushedData);
    Setbtn1(false);
  }

  // useEffect(() => {
  //   console.log("job nav rendered");
  //   setEditData({});
  // }, []);

  useEffect(() => {
    //console.log(props.log);
    if (props.data) {
      setEditData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (editData ) {
      setEditDataObj({ ...editData });
      //  let editdataobj = {...editData}
      //  console.log(editdataobj , "me hu edit ka obj")
      //  console.log(editdataobj.jobName)
      if(editData.fetchMapping){
     // let tempSourceFields = [];
      // editData.fetchMapping.targetFields.forEach(key => {
      //   tempSourceFields.push(editData.fetchMapping.fieldMapping[key]);
      // });
        let tempSourceFields = editData.fetchMapping.targetFields
      setEditFetchSourceFields( prev => tempSourceFields); }
    }
  }, [editData]);

  useEffect(() => {

    if(props.jobName?.length > 0)
     axios.get(`http://connectors.saarthi.ai/api/connectors/job/v1/job?jobName=${props.jobName}`).then(
       responce => {
         return setEditConnectorData( prev => responce.data.data)
      }
     ).catch((err) => console.log("error ") )

  }, [props.editable]
  )


  // useEffect(() => {
  //   if (editData ) {
  //     setEditDataObj({ ...editData });
  //     //  let editdataobj = {...editData}
  //     //  console.log(editdataobj , "me hu edit ka obj")
  //     //  console.log(editdataobj.jobName)
  //     //console.log(editData, "me hu edit ka obj")
  //     if(editData.pushMapping){
  //     let tempSourceFields = [];
  //     editData.pushMapping.targetFields.forEach(key => {
  //       tempSourceFields.push(editData.pushMapping.fieldMapping[key]);
  //     });
  //     setEditPushSourceFields( prev => tempSourceFields); }
  //   }
  // }, [editData]);

  // console.log(editData, "me hu edit ka obj")
  useEffect(() => {
   
    let allConnectors = [];
   
    for (const key in fetchSourceObjectField) {
      fetchSourceObjectField[key].forEach(data => {
        allConnectors.push(data);
      
      });
  
    }

    let targetArr = [];
    for (const key in fetchTargetObjectField) {
      targetArr.push(fetchTargetObjectField[key]);
    }
   console.log(editData,"eeee")
  
   if(editData.fetchMapping && Object.keys(editData.fetchMapping)?.length>0){
       let fetchSourceField =  editData.fetchMapping.sourceFields?editData.fetchMapping.sourceFields :[]//array i8d ,isDeeleted
       setFetchSourceObjectField(fetchSourceField)
       let fetchSourceObject1 = editData.fetchMapping.sourceObject?editData.fetchMapping.sourceObject:""//fetch source acc, apex
       let allConnectors = [fetchSourceObject1];
      //  for (const key in fetchSourceObject1) {
      //   fetchSourceObject1[key].forEach(data => {
      //      allConnectors.push(data);
      //    });
      //  }
       setFetchSourceObject(allConnectors)
       let fetchTargetObject1 =  editData.fetchMapping.targetObject?editData.fetchMapping.targetObject:""//fetch target onject1, 2...
       setFetchTargetObject(fetchTargetObject1)
       let fetchTargetField = editData.fetchMapping.targetFields?editData.fetchMapping.targetFields:[]//tomly 4 disposition object..
       setFetchTargetObjectField(fetchTargetField)
       props.setFetchSourceObject("SET_FETCHSOURCEOBJECT_TYPE", fetchSourceObject1);
       props.setFetchSourceField("SET_FETCH SOURCEFIELD_TYPE", fetchSourceField);
       props.setFetchTargetObject("SET_FETCHTARGETOBJECT_TYPE", fetchTargetObject1);
       props.setFetchTargetField("SET_FETCHTARGETFIELD_TYPE", fetchTargetField );
        
      }
  }, [editData.fetchMapping]);
  // useEffect(() => {
  //   if(editData.pushMapping) {
  //      let pushSourceField =  editData.pushMapping ? editData.pushMapping.sourceFields :''
  //      let pushSourceObject = editData.pushMapping ? editData.pushMapping.sourceObject : ''
  //      let pushTargetObject =  editData.pushMapping ? editData.pushMapping.targetObject : ''
  //      let pushTargetField = editData.pushMapping ? editData.pushMapping.targetFields : ''
    
  //      props.setPushSourceObject("SET_PUSHSOURCEOBJECT_TYPE", pushSourceObject);
  //      props.setPushSourceField("SET_PUSHSOURCEFIELD_TYPE", pushSourceField);
  //      props.setPushTargetObject("SET_PUSHTARGETOBJECT_TYPE", pushTargetObject);
  //      props.setPushTargetField("SET_PUSHTARGETFIELD_TYPE", pushTargetField );
         
  //   }
  // }, [editData.pushMapping]);
   

  return (
    <div className='JobNav'>
      {/* <Navigationbar/> */}
      <div style={{ display: "flex", width: "100%" }}>
        {/* <Sidebar /> */}
        <div style={{ width: "100%" }}>
          
          <div className='gobackbtn'
           >
             {/* <img width="30px" height="30px" src={BackIcon} 
           onClick={() => {
            props.goback(false)
            props.gobackforce(false)
            props.setFetchConnectorField("SET_FETCHCONNECTOR_TYPE",[])
          }} /> */}
           <div >
            <JobName name="Job Name" dis={setDisableJobNav} edit={editdataobj} editable={props.editable}
            clientName={props.clientName} setName={setNameOfJob} />
             
            </div>
           
            </div>
            <div className='backIconJobNav'>
            <img width="30px" height="30px" src={BackIcon} 
           onClick={() => {
            props.goback(false)
            props.gobackforce(false)
            props.setFetchConnectorField("SET_FETCHCONNECTOR_TYPE",[])
          }} />
          </div>
           
          {/* <JobName name="Job Name" dis={setDisableJobNav} edit={editdataobj} editable={props.editable}
            clientName={props.clientName} setName={setNameOfJob} /> */}
          <div className="JobNav-div">
            <div className={`JobNav-innerdiv  innerdiv ${disableJobNav ? "" : "disablePointerEvent "} ${isExeHis ? "" : "isExeHisBlur"} `}
              onClick={() => setIsExeHis(true)}
            >Execution</div>
            <div className={`JobNav-innerdiv  innerdiv ${disableJobNav ? "" : "disablePointerEvent"}  ${isExeHis ? "isExeHisBlur" : ""}`}
              onClick={() => setIsExeHis(false)}
            >History</div>
          </div>
          <div>
            {
              isExeHis ?

                <div className="">
                  <div className='div-outer-connector'>
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
                    <div className={` sfdc-div ${disableJobNav ? "" : "btn-hidden"}`} style={{ height: "40%" }}>
                      <ConnectorObj 
                        heading = "Fetch data from SFDC" 
                        sfName="SF Object" 
                        stName="Saarthi Object"
                        multiselect = {true}
                        handleSaveFetchData={(fetchedData) => { handleSaveFetchData(fetchedData) }}
                        isEdit={props.editable}
                        editData={editData}
                      />
                      {/* <ConnectorObject name="Fetch data from SFDC" sfName="SF Object" stName="Saarthi Object"
                        sourceObjectData={(data) => { setFetchSourceObject(data) }}
                        targetObjectData={(data) => { setFetchTargetObject(data) }}
                        sourceObjectFields={(index, data) => {
                          let sourceObjFields = fetchSourceObjectField;
                          sourceObjFields[index] = data;
                          setFetchSourceObjectField(sourceObjFields);
                        }}
                        targetObjectFields={(index, data) => {
                          let targetObjFields = fetchTargetObjectField;
                          targetObjFields[index] = data;
                          setFetchTargetObjectField(targetObjFields);
                        }}
                        disable={disableJobNav}
                        isExeHis={isExeHis}
                        btn={btn}
                        btn1={btn1}
                        handleSaveData={() => { handleSaveFetchData() }}
                        run={Setbtn}
                        editDataSource={editData && editData.fetchMapping ? props.fetchSourceObject1 : ''}
                        editDataTarget={editData && editData.fetchMapping ? props.fetchTargetObject1 : ''}
                        editDataSourceFields={editData && editData.fetchMapping ? editFetchSourceFields  : ''}
                        editDataTargetFields={editData && editData.fetchMapping ? props.fetchTargetField1 : ''}
                        editButton={props.editable}
                        jobName={props.jobName}
                        multiselect={multiSelectOne}

                      /> */}
                    </div>
                    <div className={` sfdc-div ${disableJobNav ? "" : "btn-hidden"}`} style={{ height: "40%" }}>
                    <ConnectorObj 
                    heading = "Push data from SFDC" 
                    sfName="Saarthi Object" 
                    stName="SF Object"
                    handleSavePushData={(pushedData) => { handleSavePushData(pushedData) }}
                    isEdit={props.editable}
                    editData={editData}
                    />
                      {/* <ConnectorObject name="Push data to SFDC" sfName="Saarthi Object" stName="SF Object"
                        sourceObjectData={(data) => { setPushSourceObject(data) }}
                        targetObjectData={(data) => { setPushTargetObject(data) }}
                        sourceObjectFields={(index, data) => {
                          let sourceObjFields = pushSourceObjectField;
                          sourceObjFields[index] = data;
                          setPushSourceObjectField(sourceObjFields);
                        }}
                        targetObjectFields={(index, data) => {
                          let targetObjFields = pushTargetObjectField;
                          targetObjFields[index] = data;
                          setPushTargetObjectField(targetObjFields);
                        }}
                        handleSaveData={() => { handleSavePushData() }}
                        disable={disableJobNav}
                        isExeHis={isExeHis}
                        btn={btn}
                        btn1={btn1}
                        run={Setbtn}
                        editDataSource={editData && editData.pushMapping ? props.pushTargetObject1: ''}
                        editDataTarget={editData && editData.pushMapping ? props.pushSourceObject1 : ''}
                        editDataSourceFields={editData && editData.pushMapping ? props.pushTargetField1 : ''}
                        editDataTargetFields={editData && editData.pushMapping ? props.pushSourceField1  : ''}
                        editButton={props.editable}
                        jobName={props.jobName}
                       // multiselect={multiSelectOne}
                      /> */}
                    </div>

                  </div>
                  {/* <div className='btn-savejobNav'>
            <button
              className={`${disableJobNav ? "" : "disablePointerEvent btn-hidden "} 
                                   ${isExeHis ? "" : "disablePointerEvent btn-hidden"} 
                                   ${(!btn && !btn1) ? "disablePointerEvent btn-hidden" : ""}`}
              onClick={handleSaveFetchData}
            >
              Save
            </button>
            <button className={`${disableJobNav ? "" : "disablePointerEvent btn-hidden"} 
                            ${isExeHis ? "" : "disablePointerEvent btn-hidden"} 
                            ${(!btn && !btn1) ? "disablePointerEvent btn-hidden" : ""} `}
              onClick={handleSavePushData}>
              Save
            </button>
          </div> */}
                  {(!btn && !btn1) ?
                    <div style={{ position: "relative", marginTop : "2%" ,display: "flex", justifyContent: "center" }}
                      className={`${disableJobNav ? "" : "btn-hidden"}`}>
                      <Button
                        text=" Run "
                        extraClass="jobNameRunButton"
                        onClick={() => handleClickRunDownloadData()}
                      ></Button>
                    </div> : null
                  }
                </div>
                : <div className={`div-tablehistory-jobNav ${disableJobNav ? "" : "btn-hidden"}`}><TableHistory url="" array={arr} namejob={nameOfJob} /> </div>

            }


          </div>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    //  jobName: state.dashboardReducer.jobName,
    //  fetchSourceObject1 :state.dashboardReducer.fetchsourceobject,
    //  fetchSourceField1: state.dashboardReducer.fetchsourcefield,
    //  fetchTargetObject1: state.dashboardReducer.fetchtargetobject,
    //  fetchTargetField1: state.dashboardReducer.fetchtargetfield,
    //  pushSourceObject1 :state.dashboardReducer.pushsourceobject,
    //  pushSourceField1: state.dashboardReducer.pushsourcefield,
    //  pushTargetObject1: state.dashboardReducer.pushtargetobject,
    //  pushTargetField1: state.dashboardReducer.pushtargetfield,
    
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JobNav);