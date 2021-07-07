import { Component } from "react";
import "./Button.scss";

class Button extends Component {
  handleClick = () => {
    this.props.onButtonClick(this.props.sign, this.props.type);
  };

  render() {
    const { sign, id, pressedKeys, press } = this.props;

    let className = "button";
    if (pressedKeys.includes(press)) {
      className += " button--pressed";
    }

    return (
      <button id={id} className={className} onClick={this.handleClick}>
        {sign}
      </button>
    );
  }
}

export default Button;
