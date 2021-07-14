import { Component } from "react";
import "./App.scss";
import Button from "./components/Button/Button.jsx";
import { buttons } from "./buttons";

class App extends Component {
  state = {
    output: "0",
    input: "0",
    answer: "",
    pressedKeys: [],
    blockedButtons: ["0", "+", "*", "/", "="],
    initialState: true,
    lastTouched: { sign: "", type: "" },
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }

  handleKeydown = (event) => {
    const button = buttons.find((button) => button.key === event.key);
    if (button) {
      if (!this.state.blockedButtons.includes(button.sign)) {
        this.handleButtonClick(button.sign, button.type);
      }
      this.setState((state) => ({
        ...state,
        pressedKeys: [...state.pressedKeys, button.key],
      }));
    }
  };

  handleKeyup = (event) => {
    this.setState((state) => ({
      ...state,
      pressedKeys: state.pressedKeys.filter((key) => key !== event.key),
    }));
  };

  handleButtonClick = (sign, type) => {
    switch (type) {
      case "clear":
        this.onClear(sign, type);
        break;
      case "digit":
        this.onDigit(sign, type);
        break;
      case "operator":
        this.onOperator(sign, type);
        break;
      case "decimal":
        this.onDecimal(sign, type);
        break;
      case "equals":
        this.onEquals(sign, type);
        break;
      default:
        console.log("Sorry, we are out of " + type + ".");
    }
  };

  onClear = () => {
    this.setState(() => ({
      output: "0",
      input: "0",
      answer: "",
      pressedKeys: [],
      blockedButtons: ["0", "+", "*", "/", "="],
      initialState: true,
      lastTouched: { sign: "", type: "" },
    }));
  };

  onDigit = (sign, type) => {
    this.setState((state) => ({
      ...state,
      output: state.initialState
        ? state.output.slice(0, -1) + sign
        : state.output + sign,
      input:
        state.initialState || state.lastTouched.type === "operator"
          ? state.input.slice(0, -1) + sign
          : state.input + sign,
      initialState: false,
      blockedButtons: [
        ...state.blockedButtons.filter(
          (blockedButton) =>
            blockedButton !== "0" &&
            blockedButton !== "+" &&
            blockedButton !== "-" &&
            blockedButton !== "*" &&
            blockedButton !== "/" &&
            blockedButton !== "="
        ),
        ...this.blockDigitsOnFirstZeroSign(state, sign),
      ],
      lastTouched: { sign, type },
    }));
  };

  onOperator = (sign, type) => {
    this.setState((state) => ({
      ...state,
      output:
        state.initialState ||
        state.lastTouched.sign === "+" ||
        state.lastTouched.sign === "-" ||
        ((state.lastTouched.sign === "*" || state.lastTouched.sign === "/") &&
          sign !== "-")
          ? state.output.slice(0, -1) + sign
          : state.answer !== ""
          ? state.answer + sign
          : state.output + sign,
      input: sign,
      initialState: false,
      blockedButtons: [
        ...state.blockedButtons.filter(
          (blockedButton) =>
            blockedButton !== "." &&
            blockedButton !== "0" &&
            blockedButton !== "1" &&
            blockedButton !== "2" &&
            blockedButton !== "3" &&
            blockedButton !== "4" &&
            blockedButton !== "5" &&
            blockedButton !== "6" &&
            blockedButton !== "7" &&
            blockedButton !== "8" &&
            blockedButton !== "9"
        ),
        "=",
        ...this.blockMultiplyAndDivideOnLastMinusSign(state, sign),
      ],
      lastTouched: { sign, type },
      answer: "",
    }));
  };

  onDecimal = (sign, type) => {
    this.setState((state) => ({
      ...state,
      output: state.output + sign,
      input: state.lastTouched.type === "operator" ? sign : state.input + sign,
      initialState: false,
      blockedButtons: [
        ...state.blockedButtons.filter(
          (blockedButton) =>
            blockedButton !== "0" &&
            blockedButton !== "1" &&
            blockedButton !== "2" &&
            blockedButton !== "3" &&
            blockedButton !== "4" &&
            blockedButton !== "5" &&
            blockedButton !== "6" &&
            blockedButton !== "7" &&
            blockedButton !== "8" &&
            blockedButton !== "9"
        ),
        ".",
        "+",
        "-",
        "*",
        "/",
      ],
      lastTouched: { sign, type },
    }));
  };

  onEquals = () => {
    this.setState((state) => {
      const answer = Math.round(eval(state.output) * 100) / 100;
      return {
        output: state.output + "=" + answer,
        input: answer,
        blockedButtons: [
          ...state.blockedButtons.filter(
            (blockedButton) =>
              blockedButton !== "+" &&
              blockedButton !== "-" &&
              blockedButton !== "*" &&
              blockedButton !== "/"
          ),
          "=",
          ".",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ],
        answer: answer,
      };
    });
  };

  blockDigitsOnFirstZeroSign = (state, sign) => {
    if (sign === "0" && state.lastTouched.type === "operator") {
      return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    } else {
      return [];
    }
  };

  blockMultiplyAndDivideOnLastMinusSign = (state, sign) => {
    if (
      (state.lastTouched.sign === "*" || state.lastTouched.sign === "/") &&
      sign === "-"
    ) {
      return ["*", "/"];
    } else {
      return [];
    }
  };

  render() {
    const { input, output } = this.state;

    return (
      <div className="app">
        <div className="calculator">
          <div className="calculator__screen">
            <div className="calculator__screen-output">{output}</div>
            <div className="calculator__screen-input">{input.toString()}</div>
          </div>
          <div className="calculator__buttons">
            {buttons.map((button) => (
              <Button
                button={button}
                key={button.id}
                pressedKeys={this.state.pressedKeys}
                blockedButtons={this.state.blockedButtons}
                onButtonClick={this.handleButtonClick}
              ></Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
