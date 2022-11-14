/// <reference types="react" />
import "./DownloadComponent.scss";
interface EachObj {
    name: string;
    about: string;
}
interface Props {
    radioOptions: Array<EachObj>;
    downloadFormats: Array<string>;
}
export default function DownloadComponent(props: Props): JSX.Element;
export {};
