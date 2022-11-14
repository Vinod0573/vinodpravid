import React,{useEffect,useRef, useState} from 'react'
import "./tooltipSection.css";
import {useOnClickOutside} from "../useOnClickOutside/UseOnClickOutside"

function TooltipSection(props) {
    const [ allTitle, setAllTitle ] = useState([])

    useEffect(() => {
        setAllTitle(prev => props.title)
    },[props.title])
    const myRef=useRef()
    useOnClickOutside(myRef, () => {props.closeToolTip()});
    const isSelected=window.sessionStorage.getItem("isActive")
    return (
        <div className='tooltip-section' ref={myRef} >
            <div className='tooltip-group'>
                {/* <div className={`tooltip-data ${isSelected==props.title[0] ?"active":""}`} onClick={()=>props.setActive(props.title[0])}>
                    <p style={{textTransform: "capitalize"}}> {props.title[0]} </p>
                </div>
                
                <div className={`tooltip-data ${isSelected==props.title[1] ?"active":""}`} onClick={()=>props.setActive(props.title[1])}>
                   <p style={{textTransform: "capitalize"}}> {props.title[1]} </p>
                </div> */}

                {
                    allTitle?.map( (item,i) =>{
                        return(
                            <>
                            <div className={`tooltip-data ${isSelected==props.title[i] ?"active":""}`} onClick={()=>props.setActive(props.title[i])}>
                                <p style={{textTransform: "capitalize"}}> {props.title[i]} </p>
                            </div>
                            </>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default TooltipSection

