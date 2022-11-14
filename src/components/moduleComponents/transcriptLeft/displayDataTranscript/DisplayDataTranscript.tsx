import { props } from "./types";
import { copyIcon } from "../../../../theme/assets/svg";
import moment from "moment";

import React, { useState } from "react";
import styles from "./DisplayDataTranscript.module.scss";

// import { greenTickIcon, redCrossIcon } from "../../../../theme/assets/svg";
import PravidIcons from "../../../generic/icon/PravidIcons";
export default function DisplayDataTranscript(props: props) {
  function copyId(data: string) {
    navigator.clipboard.writeText(data);
    setDisplayCopy(styles.activeCopy);
    setTimeout(() => {
      setDisplayCopy("");
    }, 1000);
  }
  const [displayCopy, setDisplayCopy] = useState("");

  const formatTime = (time: string) => {
    return moment(time).format("DD MMM YY | hh:mm a");
  };

  return (
    <div className={styles.wrapper}>
      <span id="copyTag" className={`${styles.copy} ${displayCopy}`}>
        Copied
      </span>
      {props.data.map((e, index) => {
        return (
          <div key={index} className={styles.mainOptionWrapper}>
            <div
              className={`${styles.mainOption} ${
                e.phoneNo === props.selected?.phoneNo ? styles.active : ""
              }`}
              onClick={() => {
                props.handleSelectOption(
                  e.phoneNo,
                  e.dropDown[0].sessionId,
                  e.dropDown[0].id
                );
              }}
            >
              <span className={styles.index}>{String(e.index)}. </span>
              <span className={styles.phoneNo}>{e.phoneNo}</span>
            </div>
            {e.phoneNo === props.selected?.phoneNo ? (
              <div className={styles.mainOptionWrapper}>
                {e.dropDown.map((dropDown) => {
                  return (
                    <div
                      key={dropDown.id}
                      className={`${styles.mainOption} ${styles.subOption} ${
                        props.selected?.sessionId === dropDown.sessionId
                          ? styles.subActive
                          : ""
                      }`}
                      onClick={() => {
                        props.handleSelectOption(
                          e.phoneNo,
                          dropDown.sessionId,
                          dropDown.id
                        );
                      }}
                    >
                      {dropDown.issue !== undefined ? (
                        // <img
                        //   className={styles.issue}
                        //   src={dropDown.issue ? redCrossIcon : greenTickIcon}
                        // ></img>
                        <PravidIcons
                          activeIcon={dropDown.issue ? "redcross" : "greentick"}
                          extraClass={styles.issue}
                        />
                      ) : (
                        ""
                      )}

                      <div className={styles.timeId}>
                        <div className={styles.time}>
                          {formatTime(dropDown.time)}
                        </div>
                        <div className={styles.id}>{dropDown.sessionId}</div>
                      </div>
                      {/* <img
                        className={styles.img}
                        src={copyIcon}
                        onClick={(e) => {
                          e.preventDefault();
                          const copy: any = document.querySelector("#copyTag");
                          // console.log(e.pageX, e.pageY);
                          if (copy) {
                            copy.style.left = e.pageX + 10 + "px";
                            copy.style.top = e.pageY + -10 + "px";
                          }
                          copyId(dropDown.sessionId);
                        }}
                      /> */}
                      <PravidIcons
                        activeIcon={"copyIcon"}
                        onClick={(e: any) => {
                          const copy: any = document.querySelector("#copyTag");
                          // console.log(e.pageX, e.pageY);
                          if (copy) {
                            copy.style.left = e.pageX + 10 + "px";
                            copy.style.top = e.pageY + -10 + "px";
                          }
                          copyId(dropDown.sessionId);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
