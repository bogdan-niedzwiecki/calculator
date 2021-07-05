import { Component } from "react";
import "./Button.scss";

class Button extends Component {
  state = {};

  handleClick = () => {
    this.props.onButtonClick(this.props.sign, this.props.type);
  };

  render() {
    const { sign, id } = this.props;

    return (
      <button id={id} className="button" onClick={this.handleClick}>
        {sign}
      </button>
    );
  }
}

export default Button;
