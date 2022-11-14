import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import DivComponent from '../../demo/buttonDivComponent/DivComponent'
import "./CrmPage.css"
import { useNavigate } from "react-router-dom";
import Salesforce from '../../../moduleComponents/integration/salesforces/salesforce';
import hubspotIcon from "../../../../theme/assets/svg/demo/hubspot.svg"
import freshworks from "../../../../theme/assets/svg/demo/freshworks.svg"
import zoho from "../../../../theme/assets/svg/demo/zoho.svg"
import sugarCrm from "../../../../theme/assets/svg/demo/sugarCrm.svg"
import salesforceIcon from "../../../../theme/assets/svg/demo/salesforceIconDemo.svg"
import ReactTooltip from "react-tooltip";
import Breadcrum from '../../../generic/breadcrum/Breadcrum';
import demoConfig from "../demoConfig";

function CrmPage(props) {
  const history = useNavigate()
  const userLoginInfo = useSelector(
    (store ) => store.loginReducer.userLoginInfo
  )
  const  selectedTab =  useSelector(
    (store ) => store.integrationReducer?.selectedTab
  )
    let arr = [    {
           name : "Salesforce",
           img : salesforceIcon ,
           
               } ,
               {
                 name : "Hubspot",
                 img : hubspotIcon,
                 coming : "coming"
               },
               {
                 name : "Zoho",
                 img : zoho,
                 coming : "coming"
               },
               {
                 name : "Freshworks",
                 img : freshworks,
                 coming : "coming"
               },
               {
                 name :"SugarCRM",
                 img :sugarCrm ,
                 coming : "coming"
               }
  
     
    
    ]
    const [showPage,setShowPage]=useState(false)
    const onNextpage = () => {
      
      setShowPage(true)
    }
    let Pogressarr = ["Onboarding" , "Agent Configuration" ,"Connector" , "Campaign Manager" , "Campaign Execution"]
    const moveToPrevious=()=>{
      setShowPage(false)
    }

    useEffect(()=>{
      if(selectedTab=="CRM"){
        
        moveToPrevious()
      }
    },[selectedTab])

    let accountName = userLoginInfo?.userDetail?.accountDetails[0]?.name?.toString().toLowerCase()
    let role = userLoginInfo?.userDetail?.role
    role = role?.toString().toLowerCase();
     let demoCon = demoConfig() 
    //  console.log("crmPage" , demoCon[accountName][role]['crm']['filters']['hidden'] )
    
      let tempArrHide 
      try{ tempArrHide = demoCon[accountName][role]['crm']['filters']['hidden']  }
      catch{
         tempArrHide = []
      }
   
  return (
    
      showPage?
      <Salesforce previousPage={moveToPrevious}/>
      :
       <>
      <div className='crmPageWrapper'>
        {/* <div className='backArrow' onClick={()=>{props.getData()}}><img src={backIcon}></img></div>
       <div className='connectorIconDiv' onClick={()=>{props.getData()}}> 
         <img src={connectorIcon}></img>
       </div> */}
       <div className='backArrow'>
           <div className='iconBack' >
           {/* <img src={connectorIcon}
           data-tip data-for="registerTip"
           onClick = {()=>{props.getData()}}
           ></img> */}
            <ReactTooltip id="registerTip" place="top" effect="solid">
            Press to go to Integration Page
          </ReactTooltip>

          
           </div>
           {/* <div className='iconBack'
            onClick = {()=>{props.getData()}}
            >
          <img src={backIcon} 
          ></img>
          </div> */}
          </div>
         <div className=''>
             {/* <p className='heading'>CRM</p> */}
             <Breadcrum 
           highlightSelected={"CRM"} 
           listData={["Integration","CRM"]}
           setNext={"Salesforce"}
          />
         </div>
         <div className='componentContainer'>
             { arr.map((e,i )=> {
                 if(!tempArrHide.includes(e.name)){
                
                  return <div  key={i} onClick ={ e.name==="Salesforce" ? onNextpage : ""}>
                  <DivComponent 
                  heading = {e.name} 
                  img= {e.img}
                   coming = {e.coming ? e.coming :null}
                  />
                  </div>
                 }
               
             })}
        
         </div>
    </div> 
        <div className='progressBar'>
         {/* <ProgressBar 
         arr = {Pogressarr}
        currentStep = {3}
         /> */}
         </div>
       </>      
  )
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     selectedTab :state.dashboardReducer.selectedTab,
//     userLoginInfo:state.loginReducer.userLoginInfo,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//       Object.assign({},dashboardActions, loginAction),
//       dispatch
//   );
// };
export default CrmPage;