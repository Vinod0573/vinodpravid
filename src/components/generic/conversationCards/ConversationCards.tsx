import React from "react";

import styles from "./ConversationCards.module.scss";
import IntentsTranscript from "./intents/IntentsTranscript";
import { props } from "./types";
import moment from "moment";
import NoDatamodel from "../noDatamodel/NoDatamodel";
import { noTranscriptDataIcon } from "../../../theme/assets/svg";
//import DivComponent from "../../moduleComponents/demo/buttonDivComponent/DivComponent";
/**
 * @example
 *   <ConversationCards
          conversation={[
            {
              user: "bot",
              message:
                "hello how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoa",
            },
            {
              user: "customer",
              message:
                "hello how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjolo how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoalo how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoa",
              intents: [
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay", variable: "60%" },
                { title: "intent", data: "disagree_to_pay" },
              ],
            },
          ]}
        ></ConversationCards>
 * @param props 
 * @returns 
 */

export default function ConversationCards(props: props) {
  return (
    <div className={styles.wrapper}>
      {props.conversation.length === 0 ? (
        <div className={styles.noConversation}></div>
      ) : (
        props.conversation.map((conversation, i) => {
          return conversation.user === "bot" ? (
            <div key={i} className={styles.bot}>
              <span className={styles.span}></span>
              <div className={styles.botMessage}>
                {conversation.message}
                <div>{moment(conversation.time).local().format("h:mmA")}</div>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className={`${styles.customer} ${
                conversation.intents !== undefined &&
                conversation.intents.length > 0
                  ? ""
                  : styles.background2
              }`}
            >
              <div className={styles.customerMessage}>
                {conversation.message}
              </div>
              <div className={styles.time}>
                {moment(conversation.time).local().format("h:mmA")}
              </div>
              {conversation.intents !== undefined &&
              conversation.intents.length > 0 ? (
                <IntentsTranscript
                  intents={conversation.intents}
                ></IntentsTranscript>
              ) : (
                ""
              )}
              <span
                className={`${styles.span} ${
                  conversation.intents !== undefined &&
                  conversation.intents.length > 0
                    ? styles.backgroundWhite
                    : ""
                }`}
              ></span>
            </div>
          );
        })
      )}
    </div>
  );
}
