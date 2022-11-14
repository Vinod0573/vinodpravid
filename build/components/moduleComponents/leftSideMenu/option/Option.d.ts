/// <reference types="react" />
interface props {
    optionData: any;
    setActiveOption: (optionData: any) => void;
    isOnlyIcons?: boolean;
    highlightedModule?: string;
    hideIcon?: boolean;
}
export default function Option({ optionData, setActiveOption, highlightedModule, hideIcon, }: props): JSX.Element;
export {};
