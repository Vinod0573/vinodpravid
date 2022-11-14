/// <reference types="react" />
interface props {
    srcImg: string;
    message?: string;
    button?: {
        message: string;
        onClick?: CallableFunction;
    };
    extraCss?: {
        img?: string;
        message?: string;
        button?: string;
    };
}
export default function NoDatamodel(props: props): JSX.Element;
export {};
