import React from 'react';
import BackIcon from "../../../../../theme/assets/svg/demo/backIcon.svg";
import EmailIcon from "../../../../../theme/assets/svg/demo/emailIcon1.svg";
function EmailHeader(props) {
    return (
        <>
        <div className='wh-initial'>
        <div>
            <img src={EmailIcon} />
        </div>
        <div className='title'>
            Email
        </div>
        </div>
        <div onClick={()=>{props.goBack()}}>
            <img src={BackIcon}/>
        </div>
        </>
    )
}

export default EmailHeader