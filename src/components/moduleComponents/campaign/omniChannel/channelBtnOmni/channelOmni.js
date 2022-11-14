import React, { useEffect } from 'react'
import { useState } from 'react'
import "./ChannelOmni.css"

function ChannelOmni(props) {
  const [selcted , setSelected ] = useState(false)
  const [selecteddata , setSelectedData] = useState()
  const clickedOmniChannelBtn =(data) => {
    setSelected(prev => !prev)
    if(selecteddata == data){
      setSelectedData()
    }
    else{
      setSelectedData(prev => data )
    }
    props.onselect(data)
  }
   useEffect(
     () => {
       setSelected(prev => props.outSideSelect)
     },[props.outSideSelect]
   )
 
  return (
    <div className='channelBtnWrapper'>
        <div className={`channelBtnDiv ${selcted ? "clickedHighlightOmni":""} ${props.disable ? "disablebtn" : ""} `}
        onClick={ () => clickedOmniChannelBtn(props.name)}
        
        >
            <div className='imgIconOmniBtn'><img src={ selcted ? props.imgActive : props.imgUnActive} ></img></div>
            <div className='namechannelBtnOmni'>{props.name} </div>
        </div>
    </div>
  )
}

export default ChannelOmni