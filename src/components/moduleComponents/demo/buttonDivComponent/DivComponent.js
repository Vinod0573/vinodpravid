import React from 'react'
import {useNavigate} from "react-router-dom"
import "./DivComponent.css"
import coming from "../../../../theme/assets/svg/demo/comingsoon.svg"

function DivComponent(props) {
  return (
    <div className='DivComponentWrapper' >
           
           {props.img ? <div 
              className ={`DivComponent ${props.extraClass ? props.extraClass : "" }
                  ${props.coming ? "coming" : ""}
               ${props.img ? "hoverImgDiv" : ""}`}
               > 
              {props.coming ? <div className='comingsoonDiv'> <img className = "imgcoming" src = {coming}></img></div> :null}
               <div className='ImgDiv'>
               <img src={props.img}></img>
           </div>
            <div className='heading'>
               <p>{props.heading}</p>
            </div></div>
             : <div className ={`DivComponent ${props.extraClass ? props.extraClass : ""}
             ${props.img ? "" : "hoverDiv"}`}>
                 <div className='heading'>
               <p> {props.heading} </p>
            </div>
            </div> }
    
     
    </div>
  )
}

export default DivComponent