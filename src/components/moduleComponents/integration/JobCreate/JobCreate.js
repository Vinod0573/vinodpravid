import React ,{useState , useEffect}from 'react';
import "./JobCreate.css"
import {useNavigate} from "react-router-dom";

function JobCreate() {
  const [visit , setVisit] = useState(false)
    const history = useNavigate()
  const onnext =() => {
      setVisit(true)
  }
  // useEffect(
  //   () =>{
  //     if(visit){
  //       history.push("/jobcreate")
  //     }
  //   }
  // )
  return <div>
       <div className='JobCreate-div'
        onClick={onnext}
       >
           Create Job
       </div>
  </div>;
}

export default JobCreate;
