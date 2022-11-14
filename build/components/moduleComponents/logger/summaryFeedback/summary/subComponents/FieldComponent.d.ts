/// <reference types="react" />
interface props {
    fieldKey: string;
    object: Record<string, string>;
    extraClassField: string;
}
export default function FieldComponent(props: props): JSX.Element;
export {};
