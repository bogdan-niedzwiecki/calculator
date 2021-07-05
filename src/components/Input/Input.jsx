import { Component } from "react";
import "./Input.scss";

class Input extends Component {
  state = {};

  render() {
    const { input } = this.props;

    return <div className="input">{input}</div>;
  }
}

export default Input;
