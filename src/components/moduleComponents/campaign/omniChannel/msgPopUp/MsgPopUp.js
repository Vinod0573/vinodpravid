import React from 'react'
import "./MsgPopUp.css"
import Button from "../../ui-kit/Button/button";

function MsgPopUp(props) {
  return (
    <div className='msgWraapperOmni'>
        <div className='msgOmniOuterDiv'>
            <div className='crossBtnOmni'>X</div>
            <div className='headingOmniPopup'>
               <p>Notification</p> 
            </div>
            <div className='containOmniMsgPopup'>
             <p> {props.firstMsg}WhatsApp campaign creation not completed , are you sure</p>
             <p>to switch on  {props.secondMsg}call campaign creation.</p>
            </div>
            <div className='submitBtnOmnipop'>
                <Button 
                 text="Yes"
                 extraClass={
                   "submitOmniMsgPop"
                 }
                //  onClick={() => {
                //    showSummaryPage(true)
                //  }}
                />
            </div>
        </div>
    </div>
  )
}

export default MsgPopUp