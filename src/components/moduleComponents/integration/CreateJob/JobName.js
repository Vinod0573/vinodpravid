import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobName.css";
import ErrorMessage from "../../../generic/errorMessage/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Button from "../../../generic/button/Button";

import {setJobNameRedux} from "../../../../redux/integration/actions";
import editIcon from "../../../../theme/assets/svg/integration/editIcon.svg";
import saveIcon from "../../../../theme/assets/svg/integration/save.svg";

function JobName(props) {
  const [job, setJob] = useState("");
  const [err, SetErr] = useState(false);
  const [btn3, setbtn3] = useState(props.editable ? false : true);
  const [pressForEdit, setPressForEdit] = useState(false);
  const [jobEditId, setJobEditId] = useState();
  const [saveEnable, setSaveEnable] = useState(false);
  const [edits, setEdits] = useState(false);
  const [makeEdit, setMakeEdit] = useState(false);
  const [connect, setConnect] = useState(false);
  const [editJobName , setEditJobName] = useState(false)

  const dispatch = useDispatch()

  // const jobName = useSelector(
  //   (store) => store.integartionReducer.jobName
  // )

  const data = {
    jobName: job,
    connectorName: "SFDC",
    clientName: props.clientName,
    area : "Allocation"
  };
  let url = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/createJob`;

  function postJobName() {
    dispatch(setJobNameRedux(job));
    if (job !== "" && !props.editable && !pressForEdit) {

      axios
        .post(url, data)
        .then((response) => {
          let createJobId = response.data.data.id;
          setJobEditId(createJobId);
          toast.success("Job Name created successfully!");
        })
        .catch((e) => console.log(e));
      // props.dis(true)
      setbtn3(false);
    } else if (props.editable ) {
      let value = {
        id: props.edit.id,
        jobName: job,
      };
      axios
        .put(
          `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/editJob`,
          value
        )
        .then((res) => {
          return (
           toast.success("Job Name edited successfully!")
          );
        });
      setbtn3(false);
    } else if (pressForEdit  && editJobName ) {
      let value = {
        id: jobEditId,
        jobName: job,
      };
      axios
        .put(
          `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/editJob`,
          value
        )
        .then((res) => {
          return (
            toast.success("Job Name edited successfully!")
          );
        });
      setbtn3(false);
    }else if(!editJobName ){
        true  
    }
     else {
      SetErr(true);
    }
  }

  function connectorApiIntr() {
    let dataToPass = {
      // "clientName": props.clientName.toString().toLowerCase(),
      clientName: "test",
      jobName: props.jobName,
    };

    axios
      .post(
        `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/connect`,
        dataToPass
      )
      .then((res) => {
        props.setIsConnected("SET_CONNECTED",true)
      })
      .catch((err) => console.log("error in connector api"));
    props.dis(true);
  }
  let nameforset = props.editable ? props.edit.jobName : job;
  useEffect(() => {
    let data = props.edit?.jobName ? props.edit.jobName : job;
    dispatch(setJobNameRedux("SET_JOBNAME_TYPE", data));
    
  }, [job, props.edit.jobName]);
 
   useEffect(
        () => {
          if(btn3 === false){
            setEditJobName(prev => false)
          }

        },[btn3]
   )

  return (
    <div className="job-name-wrap">
      {/* {creat ? <div className='msgDiv'> <h2> Job Creating.....</h2> </div> : null}
        {edits ? <div className='msgDiv'> <h2>Job Editing....</h2></div> : null } */}

      <div className="job-name-wrap-first-child">
        <div>
          <input
            className={`JobName-div ${err ? "JobName-div-err" : ""}`}
            type="text"
            value={props.editable && !btn3 ? job || props.edit.jobName : job}
            placeholder={props.editable ? props.edit.jobName : "Job Name"}
            onChange={(e) => {
              return setJob(e.target.value), SetErr(false), setSaveEnable(e.target.value ? true : false) , setEditJobName(prev => true)
            }}
          />
          <div className={`errDiv ${err ? "" : "err-div-visibility"}`}>
            {err ? <ErrorMessage errorMessage="Enter Job Name " /> : null}
          </div>
        </div>
        {  btn3 ? (
          <span
            onClick={() => {
              return postJobName(), setbtn3(false);
            }}
            className={`edit-btn ${ saveEnable ? "" : "disablePointerEvent"}`}
          >
            <img
              src={saveIcon}
              width="70px"
              style={{ position: "relative", top: "-17px", left: "-13px" }}
            />
          </span>
        ) : (
          <span
            onClick={() => {
              return (
                setbtn3(true),
                props.dis(props.editable ? true : false),
                setPressForEdit(err ? false : true),
                setConnect(false)
              );
            }}
            className={`edit-btn ${btn3 ? "btn-edit-icon" : ""}`}
          >
            <img src={editIcon} width="30px" />
          </span>
        ) }
      </div>
      {/* <button className='JobName-btn'
        onClick ={  
         postJobName
        }
       >Save</button> */}
      {/* <div className='job-name-button'>
        <Button
                text=" Save "
                extraClass="JobName-btn"
                onClick={() => postJobName()}
              ></Button>
        </div>: */}
      <div className="job-name-button">
        <button
          className={` ${
            connect ? `connectedmsg disablePointerEvent ` : "JobName-btn "
          }${btn3 || err  ? "disablePointerEvent" : ""}`}
          onClick={() => {
            connectorApiIntr();
            setConnect(true);
          }}
        >
          {connect ? "Connected" : "Connect"}
        </button>
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
  );
}
// const mapStateToProps = (state, ownProps) => {
//   return {
//     jobName: state.dashboardReducer.jobName,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     Object.assign({}, dashboardAction),

//     dispatch
//   );
// };

export default JobName;
