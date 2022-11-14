import { Dispatch } from "react";
import { SetStateAction } from "react";
interface props {
    selectedIcon: string | null;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}
export default function RightSidebarpop(props: props): JSX.Element;
export {};
