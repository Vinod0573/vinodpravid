/// <reference types="react" />
interface IconObj {
    name: string;
    firstIcon: any;
    secondIcon?: any;
    isActive?: boolean;
}
interface props {
    icons: Array<IconObj>;
}
export default function RightSidebar(props: props): JSX.Element;
export {};
