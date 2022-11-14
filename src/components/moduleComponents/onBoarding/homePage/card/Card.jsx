import React from 'react';

import './Card.css';

const Card = (props) => {
return(
    <>
    <div className='hPPravidFeatureCardWrapperjp'>
    <div className='hPPravidFeatureCardjp'>
    <img className='cardImg' src={props.info.imgSrc} alt="icon"/>
    <p className='cardPara'>{props.info.titleOne} <br></br>{props.info.titleTwo}</p>
    </div>
    </div>
    </>
)
}

export default Card;