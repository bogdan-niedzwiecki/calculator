import { useEffect, useState } from "react";
import Button from "@components/Button";
import "./App.scss";
import { buttons } from "./App.constants";
import { Key, LastTouched, Sign, Type } from "./App.types";

const App = () => {
  const [output, setOutput] = useState<string>(Sign.Zero);
  const [input, setInput] = useState<string>(Sign.Zero);
  const [answer, setAnswer] = useState<string>("");
  const [pressedKeys, setPressedKeys] = useState<Key[]>([]);
  const [blockedButtons, setBlockedButtons] = useState<Sign[]>([
    Sign.Zero,
    Sign.Add,
    Sign.Multiply,
    Sign.Divide,
    Sign.Equals,
  ]);
  const [initialState, setInitialState] = useState<boolean>(true);
  const [lastTouched, setLastTouched] = useState<LastTouched>({
    sign: "",
    type: "",
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    const button = buttons.find((button) => button.key === event.key);

    if (button) {
      if (!blockedButtons.includes(button.sign)) {
        handleButtonClick(button.sign, button.type);
      }

      setPressedKeys((pressedKeys) => [
        ...new Set([...pressedKeys, button.key]),
      ]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setPressedKeys((pressedKeys) => [
      ...new Set(pressedKeys.filter((key) => key !== event.key)),
    ]);
  };

  const handleButtonClick = (sign: Sign, type: Type) => {
    switch (type) {
      case Type.Clear:
        onClear();
        break;
      case Type.Digit:
        onDigit(sign, type);
        break;
      case Type.Operator:
        onOperator(sign, type);
        break;
      case Type.Decimal:
        onDecimal(sign, type);
        break;
      case Type.Equals:
        onEquals();
        break;
    }
  };

  const onClear = () => {
    setOutput(Sign.Zero);
    setInput(Sign.Zero);
    setAnswer("");
    setPressedKeys([]);
    setBlockedButtons([
      Sign.Zero,
      Sign.Add,
      Sign.Multiply,
      Sign.Divide,
      Sign.Equals,
    ]);
    setInitialState(true);
    setLastTouched({ sign: "", type: "" });
  };

  const onDigit = (sign: Sign, type: Type) => {
    setOutput((output) =>
      initialState ? output.slice(0, -1) + sign : output + sign
    );
    setInput((input) =>
      initialState || lastTouched.type === Type.Operator
        ? input.slice(0, -1) + sign
        : input + sign
    );
    setInitialState(false);
    setBlockedButtons((blockedButtons) => [
      ...new Set([
        ...blockedButtons.filter(
          (blockedButton) =>
            ![
              Sign.Zero,
              Sign.Add,
              Sign.Subtract,
              Sign.Multiply,
              Sign.Divide,
              Sign.Equals,
            ].includes(blockedButton)
        ),
        ...blockDigitsOnFirstZeroSign(sign, lastTouched.type),
      ]),
    ]);
    setLastTouched({ sign, type });
  };

  const onOperator = (sign: Sign, type: Type) => {
    setOutput((output) =>
      initialState ||
      lastTouched.sign === Sign.Add ||
      lastTouched.sign === Sign.Subtract ||
      ((lastTouched.sign === Sign.Multiply ||
        lastTouched.sign === Sign.Divide) &&
        sign !== Sign.Subtract)
        ? output.slice(0, -1) + sign
        : answer !== ""
        ? answer + sign
        : output + sign
    );
    setInput(sign);
    setInitialState(false);
    setBlockedButtons((blockedButtons) => [
      ...new Set([
        ...blockedButtons.filter(
          (blockedButton) =>
            ![
              Sign.Decimal,
              Sign.Zero,
              Sign.One,
              Sign.Two,
              Sign.Three,
              Sign.Four,
              Sign.Five,
              Sign.Six,
              Sign.Seven,
              Sign.Eight,
              Sign.Nine,
            ].includes(blockedButton)
        ),
        Sign.Equals,
        ...blockMultiplyAndDivideOnLastMinusSign(lastTouched.sign, sign),
      ]),
    ]);
    setLastTouched({ sign, type });
    setAnswer("");
  };

  const onDecimal = (sign: Sign, type: Type) => {
    setOutput((output) => output + sign);
    setInput((input) =>
      lastTouched.type === Type.Operator ? sign : input + sign
    );
    setInitialState(false);
    setBlockedButtons((blockedButtons) => [
      ...new Set([
        ...blockedButtons.filter(
          (blockedButton) =>
            ![
              Sign.Zero,
              Sign.One,
              Sign.Two,
              Sign.Three,
              Sign.Four,
              Sign.Five,
              Sign.Six,
              Sign.Seven,
              Sign.Eight,
              Sign.Nine,
            ].includes(blockedButton)
        ),
        Sign.Decimal,
        Sign.Add,
        Sign.Subtract,
        Sign.Multiply,
        Sign.Divide,
      ]),
    ]);
    setLastTouched({ sign, type });
  };

  const onEquals = () => {
    const answer = Math.round(eval(output) * 100) / 100;

    setOutput((output) => output + Sign.Equals + answer);
    setInput(String(answer));
    setBlockedButtons((blockedButtons) => [
      ...new Set([
        ...blockedButtons.filter(
          (blockedButton) =>
            ![Sign.Add, Sign.Subtract, Sign.Multiply, Sign.Divide].includes(
              blockedButton
            )
        ),
        Sign.Equals,
        Sign.Decimal,
        Sign.Zero,
        Sign.One,
        Sign.Two,
        Sign.Three,
        Sign.Four,
        Sign.Five,
        Sign.Six,
        Sign.Seven,
        Sign.Eight,
        Sign.Nine,
      ]),
    ]);
    setAnswer(String(answer));
  };

  const blockDigitsOnFirstZeroSign = (sign: Sign, type: Type | "") => {
    if (sign === Sign.Zero && type === Type.Operator) {
      return [
        Sign.Zero,
        Sign.One,
        Sign.Two,
        Sign.Three,
        Sign.Four,
        Sign.Five,
        Sign.Six,
        Sign.Seven,
        Sign.Eight,
        Sign.Nine,
      ];
    }

    return [];
  };

  const blockMultiplyAndDivideOnLastMinusSign = (
    lastTouchedSign: Sign | "",
    sign: Sign
  ) => {
    if (
      (lastTouchedSign === Sign.Multiply || lastTouchedSign === Sign.Divide) &&
      sign === Sign.Subtract
    ) {
      return [Sign.Multiply, Sign.Divide];
    }

    return [];
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="calculator__screen">
          <div data-testid="output" className="calculator__screen-output">
            {output}
          </div>
          <div className="calculator__screen-input">{input}</div>
        </div>
        <div className="calculator__buttons">
          {buttons.map((button) => (
            <Button
              button={button}
              key={button.id}
              pressedKeys={pressedKeys}
              blockedButtons={blockedButtons}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
