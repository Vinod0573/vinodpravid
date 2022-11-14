import React from "react";
//import styles from "./ComponentName.module.css";
type MyProps = {
  message: string;
};
type MyState = {
  count: number; // like this
};
/**
 * # description
 *
 * @example
 * <ComponentName message="this is prop" ></ComponentName>
 */
class ComponentName extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
export default ComponentName;
