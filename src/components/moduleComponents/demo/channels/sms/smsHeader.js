import React from 'react';
import BackIcon from "../../../../../theme/assets/svg/demo/backIcon.svg";
import SmsIcon from "../../../../../theme/assets/svg/demo/smsIcon1.svg";


function SMSHeader(props) {
    return (
        <>
        <div className='wh-initial'>
        <div>
            <img src={SmsIcon} />
        </div>
        <div className='title'>
            SMS
        </div>
        </div>
        <div onClick={()=>{props.goBack()}}>
            <img src={BackIcon}/>
        </div>
        </>
    )
}

export default SMSHeader
