import { eachDayOfInterval } from "date-fns";
import React from "react";
import "./CardComponent.css";
import PravidIcons from "../../../generic/icon/PravidIcons";
const CardComponent = ({ heading, data, icon }) => {
  return (
    <div>
      <div className="containerACard" style={{ padding: "20px" }}>
        <div style={{ width: "20%" }}>
          {/* <img src={icon} style={{ height: "32px" }} /> */}
          {/* {console.log(icon, "icon")} */}
          <PravidIcons extraClass="cardAIcon" activeIcon={icon} />
        </div>
        <div className="boxACard" style={{ width: "80%" }}>
          <div className="headACard">{heading}</div>
          {heading === "Call In Progress" ? (
            data.map((each, i) => {
              return (
                <div className="dataACard" key={i}>
                  <div>
                    {
                      <div className="cardDataACard">
                        {`${Object.keys(each)}:`} &nbsp;&nbsp;
                        <p className="innerDataACard">{`${Object.values(
                          each
                        )}`}</p>
                      </div>
                      // })
                    }
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dataACard">
              <p>{data}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
