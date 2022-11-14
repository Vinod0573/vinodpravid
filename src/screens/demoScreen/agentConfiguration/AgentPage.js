import React, { useEffect, useState } from 'react'
import AgentConfigurationModal from "../../../components/moduleComponents/demo/agentConfiguration/AgentConfigurationModal"
import backIcon from "../../../theme/assets/svg/demo/backIcon.svg"
import ConnectorPage from '../../../components/moduleComponents/demo/connectorPage/ConnectorPage'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {setDemoAgentConfigurationData} from "../../../redux/demo/actions";
import ProgressBar from '../../../components/generic/progressBar/ProgressBar'
import { DEMO_SERVER_URL , DEMO_URL} from "../../../services/ApiRoutes"
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AgentPage.css"

 
function AgentPage(props) {
    const[nextPage , setNextPage] = useState(false)
    const[fetchData , setFetchData] = useState()
    const[postEmiName , setPostEmiName] = useState([])
    const[eyeIcon , setEyeIcon] = useState(false)
    const[disButton , setDisButton] = useState(true)
    const[dataset , setDataSet] = useState()
   const[imgMap , setImgMap] =useState()

    const onAgentPage = (data) => {
        setNextPage(prev => data)
    }
    let arr = ["Onboarding" , "Agent Configuration" ,"Integration" , "Campaign Manager" , "Campaign Execution"]
    let fetchUrl = `${DEMO_SERVER_URL}${DEMO_URL.FETCH_POSTEMI}`
    const dispatch = useDispatch()

    // useEffect(
    //   async() =>  {await axios.post(fetchUrl ,{"flowName":["Post-Due"]}).then(
    //     data => {return setFetchData(data.data.data[0].subFlow)}
    //   ).catch(e => console.log("error" , e))}
    //   ,[]
    // )
    useEffect(
       () => {
        if(!nextPage){
            axios.post(fetchUrl ,{"flowName":["Post-Due"]})?.then(
              result => setFetchData(result?.data?.data?.[0]?.subFlow)
            )
          // console.log("abhi2" , result)
          //  if(result?.data?.data?.[0]?.subFlow){
          //   return  setFetchData(result.data.data[0].subFlow)
          //  }
         
          }
      },[nextPage]
    )
    useEffect(
      () => {  let temp = fetchData?.length && fetchData.map(e => {
           return  e.name
          
      })
         setPostEmiName(prev => temp)
      }
      ,[fetchData]
    )

   const viewImage =(data ) => {
          setEyeIcon(data)
       
   }
   const setmapImg = (data) => {
    setImgMap(prev => data)
   }
   const datacall =(e) => {
     setDataSet(e)
   }
   useEffect(() =>  dispatch(setDemoAgentConfigurationData(dataset) )
           ,[nextPage]
   )  
  

  return ( 
    <div> 
    
      {nextPage ? 
      <ConnectorPage prevPage = {onAgentPage}/>
       : 
    <div className='AgentWrapper'>
         {props.visibleBack ? <div className='backIconDiv' 
           >
             <img src={backIcon} className= "iconbackAgentpage" onClick={() => props.call(false)}></img>
         </div> : null
     }
        <div className='headingDiv'>
            <p> Agent Configuration</p>
        </div>
        <div className='agentModal'>
            <AgentConfigurationModal 
             postEmiName = {postEmiName}
             fetchData = {fetchData}
            eyeCall = { (data) => viewImage(data)}
             url = {fetchUrl}
             disableButton = {setDisButton}
             agentdata = {datacall}
             togetImg = {setmapImg}
            />
        </div>
        <div
           className = {`btnContainer ${disButton ? 'disablePointerEventUniversal' : ""}`}
          >
         
         <button className='donebtn' onClick={() => setNextPage(prev=> true)}>Done</button>
          
        </div>
         <div className='progressBarDiv'>
           <ProgressBar 
             arr = {arr}
             currentStep = {1}/>
            </div>
            {eyeIcon ? 
            <div className='mindMapContainer'>
               <div className='crossBtn' 
               onClick={() => setEyeIcon(false)}
               
               > X</div>
               <div className='imgInMindMapContainer'>
              <img  className ="imgflow" src={imgMap} 
                // width={"80%"}
                // height ={"40%"}
              ></img>
              </div>
            </div>
            : null}
    </div>
    }
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
  )
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//       demoAgent :  state.dashboardReducer.demoAgentConfigurationData,
//   languagee: state.dashboardReducer.demoAgentConfigurationData?.demoLanguage,
//    postEmi: state.dashboardReducer.demoAgentConfigurationData?.postEmiData,
//    preDue: state.dashboardReducer.demoAgentConfigurationData?.preEMiData,
//    channel: state.dashboardReducer.demoAgentConfigurationData?.demoChannel,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//       Object.assign({}, dashboardAction),
//       dispatch
//   );
// };
export default AgentPage;
