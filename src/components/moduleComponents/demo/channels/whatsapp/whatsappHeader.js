import React from 'react'
import BackIcon from "../../../../../theme/assets/svg/demo/backIcon.svg";
import whatsappIcon from "../../../../../theme/assets/svg/demo/whatsappIcon.svg";


function WhatsappHeader(props) {
    return (
        <>
        <div className='wh-initial'>
        <div>
            <img src={whatsappIcon} />
        </div>
        <div className='title'>
            Whatsapp
        </div>
        </div>
        <div onClick={()=>{props.goBack()}}>
            <img src={BackIcon}/>
        </div>
        </>

    )
}

export default WhatsappHeader