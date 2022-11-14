import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";

import './MultiLingual.css';

import MultiLingualImg from '../../../../../theme/assets/svg/onboarding/multilingualImg.svg'

const MultiLingual = () => {
return(
    <>
    <div className='multiLingualWrapperjp'>
        <div className='superAgentAreajp'>
            <div className='superAgentInfoflex'>
            <div className='superAgentInfoChildTwo'>
                        <div className='infoImg'>
                        <AnimationOnScroll animateIn="animate__fadeInLeftBig" animateOnce="true">
                        <img className='multilingualImg' src={MultiLingualImg} alt='Multilingual img'/>
                        </AnimationOnScroll>
                           
                        </div>
                </div>
                <div className='superAgentInfoChildOne'>
                <AnimationOnScroll animateIn="animate__fadeInRightBig" animateOnce="true">
                <div className='info'>
                        <h3 className='infoHeadh3'> <span className='colorSpan'>Multilingual Capability </span> <br></br> for Hyper-personalised  <br></br> Communications </h3>
                        {/* <br></br>  <br></br> */}
                        <p className='infoPara'>Foster deeper communications by speaking to <br></br> your customers in their preferred language.</p>
                    </div>
                        </AnimationOnScroll>

                </div>
            </div>
        </div>
    </div>
    </>
)
}

export default MultiLingual;