import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";

import "./SuperAgent.css";

import SuperAgentImg from "../../../../../theme/assets/svg/onboarding/superAgentImg.svg";

const SuperAgent = () => {
  return (
    <>
      <div className="superAgentWrapperjp">
        <div className="superAgentAreajp" style={{ paddingBottom: "3vmax" }}>
          <div className="superAgentInfoflex">
            <div className="superAgentInfoChildOne">
              <AnimationOnScroll
                animateIn="animate__fadeInLeftBig"
                animateOnce="true"
              >
                <div className="info">
                  <h3 className="infoHeadh3">
                    Pre-trained, Blended<br></br>
                    <span className="colorSpan">AI-powered SuperAgents</span>
                  </h3>
                  {/* <br></br>
                                    <br></br> */}
                  <p className="infoPara">
                    Communicate purposefully 24x7 with your customers,<br></br>
                    and provide assistance quickly and efficiently.
                  </p>
                </div>
              </AnimationOnScroll>
            </div>
            <div className="superAgentInfoChildTwo">
              <div className="infoImg">
                <AnimationOnScroll
                  animateIn="animate__fadeInRightBig"
                  animateOnce="true"
                >
                  <img
                    className="superAgentImg"
                    src={SuperAgentImg}
                    alt="super Agent img"
                  />
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAgent;
