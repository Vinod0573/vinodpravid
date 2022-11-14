/// <reference types="react" />
import { optionType } from "../leftSideMenu.interface";
interface props {
    optionData: optionType;
    setActiveOption: (pageName: string, url: string) => void;
    isOnlyIcons: boolean;
    activePage: string;
}
export default function Option({ optionData, setActiveOption, activePage, }: props): JSX.Element;
export {};
