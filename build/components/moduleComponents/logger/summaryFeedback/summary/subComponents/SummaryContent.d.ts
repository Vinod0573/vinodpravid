/// <reference types="react" />
import "./SummaryContent.scss";
interface props {
    customerProfile: {
        [key: string]: string;
    };
    conversation: {
        [key: string]: string;
    };
}
export default function SummaryContent({ customerProfile, conversation, }: props): JSX.Element;
export {};
