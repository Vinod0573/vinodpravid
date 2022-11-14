import React from "react";

import styles from "./IntentsTranscript.module.scss";
import { intents } from "../types";
// import { breaKtop } from "../../../../theme/assets/svg";
import PravidIcons from "../../icon/PravidIcons";
export default function IntentsTranscript(props: { intents: intents[] }) {
  return (
    <div className={styles.wrapper}>
      {props.intents.map((list, i) => {
        return (
          <span key={i} className={styles.each}>
            <p className={styles.title}>{list.title}</p>
            <div className={styles.message}>
              <PravidIcons activeIcon={"break_top"} />
              {list.data}

              <span className={styles.variable}>{list.variable}</span>
            </div>
          </span>
        );
      })}
    </div>
  );
}
