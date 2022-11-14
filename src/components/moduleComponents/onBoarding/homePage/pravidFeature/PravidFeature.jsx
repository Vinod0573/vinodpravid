import React from "react";

import "./PravidFeature.css";

import loggerImg from "../../../../../theme/assets/svg/onboarding/loggerImg.svg";
import analyticsImg from "../../../../../theme/assets/svg/onboarding/analyticsImg.svg";
import campaignImg from "../../../../../theme/assets/svg/onboarding/campaignImg.svg";
import integrationImg from "../../../../../theme/assets/svg/onboarding/integrationImg.svg";
import strategyImg from "../../../../../theme/assets/svg/onboarding/strategyImg.svg";
import billingImg from "../../../../../theme/assets/svg/onboarding/billingImg.svg";

import Card from "../card/Card";

const PravidFeature = () => {
  const cardDetails = [
    {
      imgSrc: loggerImg,
      titleOne: "Conversation",
      titleTwo: "Logger",
      id: 0,
    },
    {
      imgSrc: analyticsImg,
      titleOne: "360° Campaign",
      titleTwo: "Analytics",
      id: 1,
    },
    {
      imgSrc: campaignImg,
      titleOne: "Campaign",
      titleTwo: "Mangement",
      id: 2,
    },
    {
      imgSrc: integrationImg,
      titleOne: "System",
      titleTwo: "Integration",
      id: 3,
    },
    {
      imgSrc: strategyImg,
      titleOne: "Collection",
      titleTwo: "Strategy",
      id: 4,
    },
    {
      imgSrc: billingImg,
      titleOne: "Billing and",
      titleTwo: "Admin",
      id: 5,
    },
  ];

  return (
    <>
      <div className="pravidFeatureWrapperjp">
        <div className="pravidFeatureCardArea">
          <div>
            <p className="pravidTestinghead">
              {" "}
              Features of{" "}
              <span style={{ fontWeight: "bold", color: "#3DF9D3" }}>
                Pravid
              </span>
            </p>
          </div>
          <div className="cardFlex">
            {cardDetails?.map((info, i) => {
              return (
                <>
                  <div key={info.id.toString()} className="cardTopDivphf">
                    <Card info={info} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PravidFeature;
