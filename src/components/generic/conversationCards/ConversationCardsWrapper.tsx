import React, { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
//import { RootState } from "../../../redux";
import ConversationCards from "./ConversationCards";
import { conversations, intents } from "./types";
import Loader from "../loader/Loader";
import { truncateDecimals } from "../../../utils/math";
import NoDatamodel from "../noDatamodel/NoDatamodel";
import { noTranscriptDataIcon } from "../../../theme/assets/svg";
import style from "./wrapper.module.scss";
export default function ConversationCardsWrapper() {
  const userRole: any = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.role;
  });
  const messages: any[] = useSelector((state: any) => {
    return state.loggerReducer?.loggerState?.transcriptData;
  });

  const [conversations, setConversations] = useState<
    conversations[] | undefined
  >(undefined);
  const transcriptLoading = useSelector(
    (state: any) => state.loggerReducer.loggerState.transcriptLoading
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    setIsPending(true);
    //console.log(messages, "inside components");
    const filteredMessages: conversations[] = messages.map(
      (e: any, index: number) => {
        const showEntities =
          userRole.toString().toLowerCase() === "campaign analyst";
        let intents: intents[] = [];

        //should show intents
        if (showEntities && e.speaker === "User") {
          // is nextmessage is from bot
          if (
            messages.length > index + 1 &&
            messages[index + 1]?.speaker === "Bot"
          ) {
            const hash = [
              "intent",
              "context",
              "signal",
              "third_person",
              "sub_intent",
              "sub_context",
              "delay_reason",
              "Humiliate",
              "sentiment",
              "entities",
              "status code",
            ];
            const hash_alias: { [index: string]: string } = {
              intent: "Intent",
              context: "Context",
              signal: "Signal",
              third_person: "Third Person",
              sub_intent: "Sub Intent",
              sub_context: "Sub Context",
              delay_reason: "Delay Reason",
              Humiliate: "Humilate",
              sentiment: "Sentiment",
              entities: "Entities",
              "status code": "Status Code",
            };
            const next_nlu = messages[index + 1].tags.nlu_data;

            intents = hash
              .filter((each) => {
                if (next_nlu[each]) {
                  return true;
                }
                return false;
              })
              .flatMap((nlu: any) => {
                if (nlu === "entities") {
                  const entity = next_nlu[nlu].map((myEntity: any) => {
                    return {
                      title: hash_alias[nlu],
                      data: myEntity["entity"] ? myEntity["entity"] : "",
                      variable: myEntity["value"] ? myEntity["value"] : "NA",
                    };
                  });
                  if (entity.length > 0) {
                    console.log(entity, next_nlu[nlu], "nithin entity");
                    return entity;
                  } else {
                    return {
                      title: hash_alias[nlu],
                      data: "",
                      variable: "NA",
                    };
                  }
                } else {
                  return {
                    title: hash_alias[nlu],
                    data: next_nlu[nlu].name,
                    variable: next_nlu[nlu]["confidence"]
                      ? `${truncateDecimals(
                          next_nlu[nlu]["confidence"] * 100,
                          2
                        )}%`
                      : "",
                  };
                }
              });
          }
        }
        const message = e.text.join(" ");

        return {
          user: e.speaker === "Bot" ? "bot" : "customer",
          message,
          time: e.updatedAt,
          intents,
        };
      }
    );

    setTimeout(() => setConversations(() => [...filteredMessages]), 100);

    // setIsPending(false);
  }, [messages]);
  useEffect(() => {
    setTimeout(() => setIsPending(false), 600);
  }, [conversations]);
  // reducer will be used here.
  // const conversation: conversations[] = [
  //   {
  //     user: "bot",
  //     message:
  //       "hello how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoa",
  //   },
  //   {
  //     user: "customer",
  //     message:
  //       "hello how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjolo how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoalo how are you doing I hope yoyu ae doin gfine . hope you are enjouingkj frandon randonm random random random random reandjoa",
  //     intents: [
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay", variable: "60%" },
  //       { title: "intent", data: "disagree_to_pay" },
  //     ],
  //   },
  // ];

  // return transcriptDataLoading === true ? (
  //   <Loader />
  // ) : (
  //   <ConversationCards conversation={conversations} />
  // );
  // useEffect(() => {
  //   setIsPending(true)
  //   setTimeout
  // }, [conversations]);
  return transcriptLoading || isPending ? (
    <Loader></Loader>
  ) : conversations ? (
    conversations.length > 0 ? (
      <ConversationCards conversation={conversations} />
    ) : (
      <div className={style.noConversation}>
        <NoDatamodel
          message="No conversations to show"
          srcImg={noTranscriptDataIcon}
          extraCss={{ message: style.message }}
        ></NoDatamodel>
      </div>
    )
  ) : (
    <></>
  );
}
