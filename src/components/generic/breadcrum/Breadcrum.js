import React,{useEffect, useState} from 'react';
import "./Breadcrum.css";
import { useSelector, useDispatch } from "react-redux";
import {setSelectedTab} from "../../../redux/breadcrum/actions"

function Breadcrum(props) {
    const [breadcrum,setBreadCrum]=useState([])
    const [selectedData,setSelectedData]=useState("")

    const dispatch = useDispatch()
    const setSelectedItem=(data)=>{
        if(props.setNext===""){
            dispatch(setSelectedTab(props.setNext))
        }else{
            dispatch(setSelectedTab(data))
        }
       
    }

    useEffect(()=>{
       
        if((props.listData?.length>0 )&& (props.highlightSelected?.length>0)){
           
            setBreadCrum(props.listData)
            setSelectedData(props.highlightSelected)
        }
    },[props.listData,props.highlightSelected])

    return (
        <div className='breadcrum-wrapper'>
           { breadcrum?.map((each,i)=>{
                return <><div className={`breadcrum ${props.highlightSelected===each?"active":""}`} onClick={()=>{setSelectedItem(each)}}>{each}</div>
               { breadcrum.length!==i+1 &&
               <div className="breadcrum-icon forward-icon">
               <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.40068 17.1884C7.81972 17.6074 8.3586 17.817 8.89726 17.817C9.43593 17.817 9.9748 17.6074 10.3938 17.1884C11.2021 16.3802 11.2021 15.0333 10.3938 14.2251L5.03609 8.89726L10.3639 3.56944C11.1721 2.76123 11.1721 1.41436 10.3639 0.606155C9.55571 -0.202052 8.20884 -0.202052 7.40063 0.606155L0.606155 7.43056C-0.202052 8.23877 -0.202052 9.58564 0.606155 10.3938L7.40068 17.1884Z" fill="black"/>
                </svg>
                </div>}</>

            })}
            </div>
    )
}

export default Breadcrum;
