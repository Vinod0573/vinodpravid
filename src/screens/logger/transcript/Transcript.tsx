import React from "react";
import { useSelector } from "react-redux";
import ConversationCardsWrapper from "../../../components/generic/conversationCards/ConversationCardsWrapper";
import TranscriptLeft from "../../../components/moduleComponents/transcriptLeft/TranscriptLeft";
import AudioPlayerWrapper from "../../../components/generic/audioPlayer/AudioPlayerWrapper";
import SummaryFeedback from "../../../components/moduleComponents/logger/summaryFeedback/SummaryFeedback";
import "./Transcript.scss";
import { RootState } from "../../../redux";
import Loader from "../../../components/generic/loader/Loader";

export default function Transcript() {
  const summary = useSelector(
    (store: RootState) => store.loggerReducer?.loggerState?.summaryData[0]
  );
  const channelTab = useSelector((store: any) => {
    return store.dashboardReducer?.channelTab;
  });
  const url2 = useSelector(
    (state: RootState) =>
      state.loggerReducer?.loggerState?.summaryData[0]?.information
        ?.recording_file_url
  );

  return (
    <div className="wrapper__transcript">
      <div className="transcript__left">
        <TranscriptLeft />
      </div>

      <div className="transcript__center">
        {channelTab.toLowerCase() === "call"
          ? url2 &&
            url2 !== "" && (
              <div className="audio-player">
                <AudioPlayerWrapper url={url2} />
              </div>
            )
          : ""}
        <div className="conversation">
          <ConversationCardsWrapper />
        </div>
      </div>

      <div className="transcript__right">
        <SummaryFeedback summary={summary} />
      </div>
    </div>
  );
}
