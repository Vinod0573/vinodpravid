import React from "react";
import "./Home.css";
import clientImg from "../../theme/assets/svg/onboarding/clientImg.svg";
import MobileViewClientImage from "../../theme/assets/svg/onboarding/mobileClientImg.svg";

import { useNavigate } from "react-router-dom";

import CollectionInfo from "../../components/moduleComponents/onBoarding/homePage/collectioninfo/CollectionInfo";
import EngageUser from "../../components/moduleComponents/onBoarding/homePage/engageUser/EngageUser";
import OurPromise from "../../components/moduleComponents/onBoarding/homePage/ourpromise/OurPromise";
import PravidFeature from "../../components/moduleComponents/onBoarding/homePage/pravidFeature/PravidFeature";
import RequestDemo from "../../components/moduleComponents/onBoarding/homePage/requestdemo/RequestDemo";

import pravidLogo from "../../theme/assets/svg/onboarding/pravidLogo.svg";
import AnimationCard from "../../components/moduleComponents/onBoarding/homePage/animationCard/AnimationCard";
import EngageMessage from "../../components/moduleComponents/onBoarding/homePage/engageMessage/EngageMessage";
import { useMediaQuery } from "./mediaQuery";
import Button from "../../components/generic/button/Button";

const HomePage = () => {
  const history = useNavigate();


  let isPageWide = useMediaQuery("(max-width: 480px)");

  var modal = document.getElementById("myModal");



  const handleClickMoveToLogin = () => {
    if (isPageWide) {
      modal.style.display = "block";
    } else {
      history("/login");
    }
  };

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClose = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <>
      <div className="homePageWrapperDej">
        <div className="homepageHeader-wrapper">
          <div className="homePageHeading">
            <div className="homePageLogo">
              <img className="pravidLogo" src={pravidLogo} alt="pravid logo" />
            </div>
            <div className="homePageLogin">
              <Button
                text="Login"
                extraClass="LoginMainButtonStyle"
                onClick={() => handleClickMoveToLogin()}
              />
              {isPageWide ? (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={() => handleClose()}>
                      &times;
                    </span>
                    <p>
                      To Login Please change to desktop vesion. Our Mobile
                      version is coming soon...
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <h2 className="saarthiEventDivH2">
            <a
              href="https://mailchi.mp/saarthi.ai/success_studypdf"
              target="_blank"
              rel="noreferrer noopener"
              className="acceleratingLink"
            >
              Hey Pravid know how a leading fintech accelerated collections with
              85% cost reduction? Download our Success Study.
            </a>
          </h2>
        </div>
        <div className="homePageLandingbackImg">
          <div className="homePageInfo">
            <h2 className="homePageInfoH2">
              {" "}
              Hassle-free Lending Meets <br></br>Hassle-free Collection
            </h2>
            <p className="homePageInfoPara">
              {" "}
              10X Cost-Effective <span style={{ color: "#14AC9C" }}>|</span> 25%
              Time Reduction
            </p>
          </div>

          <div className="bookDemoDiv">
            <Button
              text="Book a demo"
              extraClass="LoginHomeButtonStyle"
              onClick={() => handleScroll()}
            />
            {/* <Link className='signupLinkPo' to={"/signup"} > Sign up for free </Link> */}
          </div>

          {/* <div className="positionLogIn">
        <Button
                text="Login"
                extraClass="LoginMainButtonStyle"
                onClick={() => handleClickMoveToLogin()}/>
        </div>
        <div className="positionChangingLogin">
        <Button
                text="Book a demo"
                extraClass="LoginHomeButtonStyle"
                onClick={() => handleScroll()}/>
        </div> */}

          {/* <div>
            <img src={landingHomeImage}  alt="Landing Page Image"/>
        </div> */}
          <div className="clientDiv">
            <img
              className="clientImage"
              src={isPageWide ? MobileViewClientImage : clientImg}
            ></img>
          </div>
        </div>
        <div className="collectionDiv">
          <CollectionInfo />
        </div>
        {/* <div>
            <BlackPage/>
        </div> */}
        <div>
          <EngageMessage />
        </div>
        <div>
          <EngageUser />
        </div>
        <div>
          <PravidFeature />
        </div>
        <div>
          <AnimationCard />
        </div>
        {/* <div>
            <AnnimationScroll/>
        </div> */}
        {/* <div>
            <BlackPage/>
        </div> */}
        <div>
          <OurPromise />
        </div>
        <div>
          <RequestDemo />
        </div>
      </div>
    </>
  );
};
export default HomePage;
