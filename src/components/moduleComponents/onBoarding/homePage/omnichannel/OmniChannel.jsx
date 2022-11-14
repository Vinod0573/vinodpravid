import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";

import './OmniChannel.css';
import {
  omniChannelImage1,
  omniChannelImg,
} from "../../../../../theme/assets/svg";
import { useMediaQuery } from '../../../../../screens/onBoarding/mediaQuery';

const OmniChannel = () => {

    let isPageWide = useMediaQuery('(max-width: 480px)');

return (
  <>
    <div className="omniChannelWrapper">
      <div className="superAgentAreajp">
        <div className="superAgentInfoflex">
          <div className="superAgentInfoChildTwo">
            <div className="infoImg">
              <AnimationOnScroll
                animateIn="animate__fadeInLeftBig"
                animateOnce="true"
              >
                <img
                  className="omniChannelImg"
                  src={isPageWide ? omniChannelImage1 : omniChannelImg}
                  alt="Omni Channel img"
                />
              </AnimationOnScroll>
            </div>
          </div>
          <div className="superAgentInfoChildOne">
            <AnimationOnScroll
              animateIn="animate__fadeInRightBig"
              animateOnce="true"
            >
              <div className="info">
                <h3 className="infoHeadh3">
                  Omnichannel <span className="colorSpan">Agility</span>{" "}
                  <br></br> <span className="colorSpan">& Control</span> at
                  Scale
                </h3>
                {/* <br></br>
                        <br></br> */}
                <p className="infoPara">
                  Access real-time critical insights across channels<br></br>
                  to have complete agility and control.
                </p>
              </div>
            </AnimationOnScroll>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default OmniChannel;