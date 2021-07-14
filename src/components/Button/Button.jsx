import { Component } from "react";
import classNames from "classnames";
import "./Button.scss";

class Button extends Component {
  handleClick = () => {
    this.props.onButtonClick(this.props.button.sign, this.props.button.type);
  };

  render() {
    const { sign, id, key } = this.props.button;

    const isButtonPressed = () => {
      return this.props.pressedKeys.includes(key);
    };

    const isButtonBlocked = () => {
      return this.props.blockedButtons.includes(sign);
    };

    let className = classNames({
      button: true,
      "button--pressed": isButtonPressed(),
    });

    return (
      <button
        id={id}
        className={className}
        onClick={!isButtonBlocked() ? this.handleClick : null}
      >
        {sign}
      </button>
    );
  }
}

export default Button;
