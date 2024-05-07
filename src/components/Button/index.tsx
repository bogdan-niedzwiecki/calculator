import classNames from "classnames";
import "./Button.scss";
import { ButtonProps } from "./Button.types";

const Button = ({
  pressedKeys,
  blockedButtons,
  button,
  onButtonClick,
}: ButtonProps) => {
  const handleClick = () => {
    onButtonClick(button.sign, button.type);
  };

  const className = classNames({
    button: true,
    "button--pressed": pressedKeys.includes(button.key),
  });

  return (
    <button
      data-testid={button.id}
      id={button.id}
      className={className}
      onClick={blockedButtons.includes(button.sign) ? undefined : handleClick}
    >
      {button.sign}
    </button>
  );
};

export default Button;
