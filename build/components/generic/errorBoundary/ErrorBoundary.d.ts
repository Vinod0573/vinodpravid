import React from "react";
declare type MyProps = {
    fullscreen?: boolean;
    children: JSX.Element;
};
declare type MyState = {
    error: Error | undefined;
    errorInfo: React.ErrorInfo | undefined;
};
/**
 *  ErrorBoundary
 * @property  {?boolean} fullscreen : optional
 * @author nithin <nithin.n@saarthi.ai>
 *
 */
declare class ErrorBoundary extends React.Component<MyProps, MyState> {
    constructor(props: any);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): JSX.Element;
}
export default ErrorBoundary;
