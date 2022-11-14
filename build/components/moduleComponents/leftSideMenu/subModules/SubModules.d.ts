/// <reference types="react" />
import "./SubModules.scss";
interface props {
    subModulesArr: Array<any>;
    setActiveOption: (optionData: any) => void;
    activeSubModule: string;
    setActiveSubModule: (value: string) => void;
}
export default function SubModules(props: props): JSX.Element;
export {};
