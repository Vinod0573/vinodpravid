import React from 'react'
import "./AddBtn.css"

function AddBtn(props) {
  return (
    <div className='AddBtnWrapper'>
          <div className={`${props.extraStyle ? props.extraStyle: "AddBtnDiv"}`}>
              <div className='plusDiv'>
                  <p>+</p>
              </div>
              <div className='heading'><p> {props.heading ? props.heading :"Add" }</p></div>
          </div>
    </div>
  )
}

export default AddBtn