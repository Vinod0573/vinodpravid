import React from "react";
import { useMediaQuery } from "../../../../../screens/onBoarding/mediaQuery";

import "./OurPromise.css";

const OurPromise = () => {
  let isPageWide = useMediaQuery("(max-width: 480px)");

  return (
    <div className="ourPromiseWrapper">
      <div className="ourPromiseBox">
        <p className="heading">Our Promise</p>
        {isPageWide ? (
          <div>
            <div className="nextParaDiv">
              <p>We strive to bring enterprises closer </p>
              <p className="secondPara"> to their customers by enabling </p>
              <p className="secondPara"> automated customer journeys in </p>
              <p className="secondPara">the user&apos;s language.</p>
            </div>
            <div className="nextParaDiv">
              <p>This will bridge the language divide </p>
              <p className="secondPara">in services and unify customer </p>
              <p className="secondPara"> experinces across all channels.</p>
            </div>
            <div className="nextParaDiv">
              <p>We are commited to enabling </p>
              <p className="secondPara">purposeful communications that</p>
              <p className="secondPara">help enterprices foster hyper- </p>
              <p className="secondPara">personalized experiences</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="nextParaDiv">
              <p>
                We strive to bring enterprises closer to their customers by
                enabling{" "}
              </p>
              <p className="secondPara">
                {" "}
                automated customer journeys in the user&apos;s language.
              </p>
            </div>
            <div className="nextParaDiv">
              <p>This will bridge the language divide in services and unify</p>
              <p className="secondPara">
                {" "}
                customer experinces across all channels.
              </p>
            </div>
            <div className="nextParaDiv">
              <p>We are commited to enabling purposeful communications that</p>
              <p className="secondPara">
                help enterprices foster hyper-personalized experiences
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurPromise;
