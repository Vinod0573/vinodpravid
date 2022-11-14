import React from 'react'
import "./PopUpImg.css"

function PopUpImg(props) {
  return (
    <div className='generalWrapper'>
            <div className='center'>{props.children}</div>
    </div>
  )
}

export default PopUpImg