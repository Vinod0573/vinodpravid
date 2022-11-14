export default DndComponent;
declare class DndComponent extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        items: any;
    };
    componentDidUpdate(prevProps: any): void;
    onDragEnd: (e: any) => void;
    reorder: (list: any, startIndex: any, endIndex: any) => any[];
    render(): JSX.Element;
}
import React from "react";
