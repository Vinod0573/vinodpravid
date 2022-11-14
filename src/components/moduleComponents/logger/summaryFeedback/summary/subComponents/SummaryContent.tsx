import React from "react";
import { useState } from "react";
import {
  phoneBlue,
  dropdownUpArrow,
  dropdownDownArrow,
} from "../../../../../../theme/assets/svg";
import FieldComponent from "./FieldComponent";
import "./SummaryContent.scss";

interface props {
  customerProfile: { [key: string]: string };
  conversation: { [key: string]: string };
}
// width 302px or 20.9vw
export default function SummaryContent({
  customerProfile,
  conversation,
}: props) {
  // useSate
  const [showSummary, setShowSummary] = useState<boolean>(true);

  // handlers
  const handleHeadClick = () => {
    setShowSummary((prev) => !prev);
  };
  return (
    <div className="wrapper-summary">
      <div className="summary__content">
        <div className="summary__head" onClick={handleHeadClick}>
          <img className="phone icon" src={phoneBlue} alt="phone icon" />
          <span className="summary__heading">Summary</span>
          {showSummary ? (
            <img
              src={dropdownUpArrow}
              alt="up arrow icon"
              className="up-arrow icon"
            />
          ) : (
            <img
              src={dropdownDownArrow}
              alt="down arrow icon"
              className="down-arrow icon"
            />
          )}
        </div>
        {showSummary && (
          <div className="summary__body">
            <div className="body__customer-profile">
              <div className="heading">Customer Profile:</div>
              <div>
                {Object.keys(customerProfile).map((item: string, index) => {
                  return (
                    <FieldComponent
                      key={index}
                      extraClassField={"customer-profile__fields"}
                      object={customerProfile}
                      fieldKey={item}
                    />
                  );
                })}
              </div>
            </div>
            <div className="body__conversation">
              <div className="heading">Conversation:</div>
              <div>
                {Object.keys(conversation).map((item: string, index) => {
                  return (
                    <FieldComponent
                      key={index}
                      extraClassField={"customer-conversation__fields"}
                      object={conversation}
                      fieldKey={item}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
