import React, { useEffect, useRef, useState } from "react";

import "./Accord.css";
import downicon from "../../../../assets/dialler/downicon.svg";
import sideicon from "../../../../assets/dialler/sideicon.svg";
import { Checkbox } from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/ui-kit";
import { useSelector } from "react-redux";
import ToggleSwitch from "../../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/ui-kit/ToggleSwitch/ToggleSwitch";
import warning from "../../../../assets/warning.svg";

function Accord(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");
  const [toggle, setToggle] = useState(false);

  //   useEffect(() => {
  //     console.log("Height for ", props.title, ": ", height);
  //   }, [height]);

  const handleDisableToggleSwitch = (checked) => {
    setToggle((prev) => checked);
    props.isTogglChecked(checked);
  };

  function toggleAccordion() {
    if (
      preferredTimeData === true &&
      props.title === "Calling Condition"
    ) {
      setActive(true);
      }
    if (!props.isHideContent) {
      setActive(!active);
      setHeight(active ? "0px" : `${content.current.scrollHeight + 100}px`);
    }
  }

  const selectedData = useSelector((store) => {
    return store.schedulerReducer?.selectedScheduler;
  });

  const preferredTimeData = useSelector((store) => {
    return store.schedulerReducer?.dialtimeData;
  });

  useEffect(() => {
    if(preferredTimeData?.preferedTime){
      setToggle((prev) => preferredTimeData.preferedTime);
    } 
  }, [preferredTimeData]);

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${
          props.title === "Calling Condition" && props.isHideContent
            ? "disable-pointer-events"
            : ""
        } ${active ? "accord-active" : ""}`}
        onClick={() => {
          toggleAccordion();
        }}
      >
        <p className="accordion__title">
          {" "}
          {active ? (
            <img className="" src={downicon} />
          ) : (
            <img className="" src={sideicon} />
          )}
          <span>{props.title}</span>
        </p>
        <span
          style={{ marginLeft: "20px", alignItems: "center", display: "flex" }}
          className={toggle ? "spanAccordian accordian" : "spanAccordian"}
        >
             {toggle && preferredTimeData?.preferedTime===true &&
            props.title === "Disposition Based Calling" && active &&  (
              <div>
                <span className="dcb-note-tag">
                  <img className="dcb-note-tag-image" src={warning} /> Current
                  Campaign Setting is disabled because of preferred time
                  selection
                </span>
              </div>
            )}
          {props.isToggle ? (
            <>
              <ToggleSwitch
                id="preferedTime"
                checked={toggle}
                optionLabels={["on", "off"]}
                small={true}
                onChange={(checked) => handleDisableToggleSwitch(checked)}
              />
              <span>{toggle ? "On" : "Off"}</span>
            </>
          ) : (
            <Checkbox
              checked={props.isChecked ? true : false}
              onChange={(e) => {}}
              extraSpan={
                props.isChecked
                  ? "multi-border"
                  : "multi-border-bs"
              }
            />
          )}
        </span>
      </div>
      <div></div>
      {props.content && (
        <div
          ref={content}
          style={{ maxHeight: `${height}` }}
          className="accordion__content"
        >
          <div
            className="accordion__text"
            // dangerouslySetInnerHTML={{ __html: props.content }}
          >
            {props.content}
          </div>
        </div>
      )}
    </div>
  );
}

export default Accord;
