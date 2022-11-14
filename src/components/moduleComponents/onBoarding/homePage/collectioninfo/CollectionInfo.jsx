import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";

import "./CollectionInfo.css";

const CollectionInfo = () => {
  return (
    <>
      <div className="collectInfoWrapperjp">
        <div className="collectionInfoAreajp">
          <div className="cltInfFlexClassjp cltInfChildOnejp">
            <div className="cltInf">
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <h2 className="cltInfHead animate-reveal animate-first">
                  $100Mn+
                </h2>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-second">
                  {" "}
                  Loan amount{" "}
                </p>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-third">
                  {" "}
                  collected{" "}
                </p>
              </AnimationOnScroll>
            </div>
            <div className="cltInf">
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <h2 className="cltInfHead animate-reveal animate-first">
                  {" "}
                  4Mn+{" "}
                </h2>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-second">
                  {" "}
                  Customer{" "}
                </p>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-third">
                  {" "}
                  interactions{" "}
                </p>
              </AnimationOnScroll>
            </div>
          </div>

          <div className=" cltInfFlexClassjp cltInfChildTwojp">
            <div className="cltInf">
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <h2 className="cltInfHead animate-reveal animate-first">
                  {" "}
                  ~97%{" "}
                </h2>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-second">
                  {" "}
                  Payment rate{" "}
                </p>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-third">
                  {" "}
                  across buckets{" "}
                </p>
              </AnimationOnScroll>
            </div>
            <div className="cltInf">
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <h2 className="cltInfHead animate-reveal animate-first">
                  {" "}
                  ~90%{" "}
                </h2>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-second">
                  Rate of call
                </p>
              </AnimationOnScroll>
              <AnimationOnScroll
                animateIn="animate__fadeInUpBig"
                animateOnce="true"
              >
                <p className="cltInfPara animate-reveal animate-third">
                  connection
                </p>
              </AnimationOnScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionInfo;
