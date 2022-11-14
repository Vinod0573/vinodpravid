/// <reference types="react" />
import "./DownloadComponent.scss";
interface EachObj {
    name: string;
    about: string;
    format: string;
}
interface Props {
    radioOptions: Array<EachObj>;
    setSelectedIcon: any;
}
export default function DownloadComponent(props: Props): JSX.Element;
export {};
