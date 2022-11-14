import React from "react";
import "./SummaryPortal.scss";
interface propsInteface {
    sessionId: string;
    setShowSummaryPortal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SummaryPortal(props: propsInteface): React.ReactPortal;
export {};
