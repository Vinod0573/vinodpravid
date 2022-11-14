import React, { useEffect, useState } from "react";
import "./AnalyticsCard.css";
// import { totalicon2 } from "../../../theme/assets/analyticsLoggerHeaderSvg/index";
import CardComponent from "./cardComponent/CardComponent";

const AnalyticsCard = (props) => {
  const deepCardDetails = JSON.parse(JSON.stringify(props.cardDetails));
  const cardDetails =
    deepCardDetails && Object.values(deepCardDetails)?.length > 0
      ? Object.values(
          deepCardDetails.sort((a, b) => {
            return a?.position - b?.position;
          })
        )
      : [];
  // console.log(cardDetails, "details");
  return (
    <>
      <div className="containerAnalyticsDBTop">
        {cardDetails?.map((each, i) => {
          let refernceKey = each?.referenceKey?.split(".");
          if (!each.isActive) return <></>;
          return (
            <div key={i}>
              <CardComponent
                heading={each.name}
                data={
                  props.data && props.data[refernceKey[0]]
                    ? props.data[refernceKey[0]][refernceKey[1]]
                    : 0
                }
                icon={each.icon}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnalyticsCard;
