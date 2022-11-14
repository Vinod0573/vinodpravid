import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";

import './SeamlessCx.css';

import SeamlessCxImg from '../../../../../theme/assets/svg/onboarding/seamlesscxImg.svg'

const SeamlessCx = () => {
    return (
        <>
            <div className='seamlessCxWrapperjp'>
                <div className='superAgentAreajp'>
                    <div className='superAgentInfoflex'>
                        <div className='superAgentInfoChildOne'>
                            <AnimationOnScroll animateIn="animate__fadeInLeftBig" animateOnce="true">
                                <div className='info'>
                                    <h3 className='infoHeadh3'>Purpose-driven <span className='colorSpan'>Natural</span> <br></br><span className='colorSpan'>Dialogues</span> for Seamless CX</h3>
                                    {/* <br></br> <br></br> */}
                                    <p className='infoPara'>Have meaningful, two-way communication that delights
                                        <br></br>your customers while providing quick resolutions. </p>
                                </div>
                            </AnimationOnScroll>
                        </div>
                        <div className='superAgentInfoChildTwo'>
                            <div className='infoImg'>
                                <AnimationOnScroll animateIn="animate__fadeInRightBig" animateOnce="true">
                                    <img className='seamlessCX' src={SeamlessCxImg} alt='super Agent img' />
                                </AnimationOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeamlessCx;