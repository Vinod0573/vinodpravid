import React from "react";
declare type MyProps = {
    message: string;
};
declare type MyState = {
    count: number;
};
/**
 * # description
 *
 * @example
 * <ComponentName message="this is prop" ></ComponentName>
 */
declare class ComponentName extends React.Component<MyProps, MyState> {
    state: MyState;
    render(): JSX.Element;
}
export default ComponentName;
