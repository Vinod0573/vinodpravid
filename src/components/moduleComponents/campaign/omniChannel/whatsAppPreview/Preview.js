import React, { useEffect, useState } from 'react'
import "./Preview.css"
import logo from "../../../../../theme/assets/svg/campaign/saarthiLogo.svg"
import backArrow from "../../../../../theme/assets/svg/campaign/backArrow.svg"
import forwardArrow from "../../../../../theme/assets/svg/campaign/forwardArrow.svg"
import TemplateMsg from '../templatMsg/TemplateMsg'
import { useSelector } from "react-redux";
function Preview(props) {
    const [showTemplates , setShowTemplates] = useState()
    const [initial , setInitial] = useState(0)
    const [templateName , setTemplateName] = useState()

    const templatesArray = useSelector(
        store => store?.omniChannelReducer?.getTemplates
    )
   
    useEffect(
        () => {
         if(templatesArray){
             setShowTemplates(templatesArray?.[0]?.templates?.templateBody)
             setTemplateName(templatesArray?.[0]?.templates?.templateName)
         }
        },[templatesArray]
    )
    const moveImg = () => {
        if(initial < templatesArray?.length){
            setShowTemplates(templatesArray?.[initial +1]?.templates?.templateBody)
            setInitial(prev => (initial +1))
            setTemplateName(templatesArray?.[initial +1]?.templates?.templateName)
        }
    }
const moveToback =() => {
    if(initial >0){
        setShowTemplates(templatesArray?.[initial -1]?.templates?.templateBody)
            setInitial(prev => (initial -1))
            setTemplateName(templatesArray?.[initial -1]?.templates?.templateName)
    }
}
  return (
    <div className='outerPreviewDivWrapper '>
        <div className='previewNote'>
        <div className='cursor arrowbackwidth'  onClick={() => moveToback()}> {initial >0 ?<img src={backArrow}></img>: "" } </div>
          <div className='templateName'>  {templateName ?templateName : "Preview" }</div> 
          <div className='forwardArrow' onClick={() => moveImg()}>
                 {initial < templatesArray?.length-1 ? <img src={forwardArrow}  ></img> : ""}
               </div>
            </div>
        <div className='outerPreviewDiv'>
            <div className='header'>
               {/* <div className='cursor arrowbackwidth'  onClick={() => moveToback()}> {initial >0 ?<img src={backArrow}></img>: "" } </div> */}
               <div className='imgLogo'> <img src={logo}></img></div>
               <div className='tittle'>
                   <div className='tittleHead'>Saarthi</div>
                   <div className='tittleSecond'>tap here for contact info </div>
               </div>
               {/* <div className='forwardArrow' onClick={() => moveImg()}>
                 {initial < templatesArray?.length-1 ? <img src={forwardArrow}  ></img> : ""}
               </div> */}
            </div>
            <div className='backgroundWhatsApp' 
            > 
            <div className='todayDiv'>
                <div className='today'>Today</div>
            </div>
            {
                showTemplates?.length ?
                <TemplateMsg template ={showTemplates}/>:""
            }
      
            {/* {
              templatesArray?.map(data => 
                  {
                      if(data?.templates?.templateBody){
                          return <div className='tempArrays'>
                          <TemplateMsg template ={data?.templates?.templateBody}/>
                          </div>
                      }
                  }
                )  
            } */}
            
            </div>
        </div>
    </div>
  )
}

export default Preview