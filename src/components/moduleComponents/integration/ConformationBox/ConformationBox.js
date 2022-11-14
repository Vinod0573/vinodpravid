import React from 'react';
import './ConformationBox.css'

function ConformationBox({message , setOpenBox , setDelete}) {
  return (
  <div className="modalBackground">
  <div className="modalContainer">
    <div className="titleCloseBtn">
      <button
        onClick={() => {
          setOpenBox(false);
        }}
      >
        X
      </button>
    </div>
    <div className="title">
      <h3>Are You Sure You Want to {message}?</h3>
    </div>
    
    <div className="footer">
      <button
        onClick={() => {
          setOpenBox(false);
        }}
        id="cancelBtn"
      >
        Cancel
      </button>
      <button 
       onClick={() => {return setDelete(true),
        setOpenBox(false)}}
      >Continue</button>
    </div>
  </div>
</div>
  )
}

export default ConformationBox;
