/// <reference types="react" />
interface props {
    searchIcon: any;
    onChange: (e: any) => void;
    placeholder: string;
    inputType?: string;
    value?: string | number;
    extraClassWrapper?: string;
    extraClassImg?: string;
    extraClassInput?: string;
}
export default function SearchInputBox(props: props): JSX.Element;
export {};
