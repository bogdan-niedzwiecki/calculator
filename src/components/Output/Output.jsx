import { Component } from "react";
import "./Output.scss";

class Output extends Component {
  state = {};

  render() {
    const { output } = this.props;

    return <div className="output">{output}</div>;
  }
}

export default Output;
