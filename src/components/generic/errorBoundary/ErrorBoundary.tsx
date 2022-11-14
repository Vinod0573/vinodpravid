import React from "react";

import styles from "./ErrorBoundary.module.scss";
type MyProps = {
  fullscreen?: boolean;
  children: JSX.Element;
};
type MyState = {
  error: Error | undefined;
  errorInfo: React.ErrorInfo | undefined;
};
/**
 *  ErrorBoundary
 * @property  {?boolean} fullscreen : optional
 * @author nithin <nithin.n@saarthi.ai>
 *
 */
class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //console.log("error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.errorInfo) {
      if (this.props.fullscreen) {
        return (
          <div className={styles.fullscreen}>
            <h1>Something went wrong</h1>
            {/* <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details> */}
            <h2>Please try again or refresh the page</h2>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              {" "}
              Try again
            </button>
          </div>
        );
      } else
        return (
          <div>
            <h2>Something went wrong.</h2>
            <div>{this.state.error && this.state.error.toString()}</div>
            <br />
            <div> {this.state.errorInfo.componentStack}</div>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              {" "}
              Try again
            </button>
          </div>
        );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
