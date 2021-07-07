import { Component } from "react";
import "./App.scss";
import Button from "./components/Button/Button.jsx";
import Input from "./components/Input/Input.jsx";
import Output from "./components/Output/Output.jsx";
import { buttons } from "./buttons";

class App extends Component {
  state = {
    output: "",
    input: "0",
    answer: "",
    pressedKeys: [],
  };

  isInputZero = () => {
    return this.state.input === "0" || this.state.input === "-0";
  };

  isInputDecimal = () => {
    return this.state.input.indexOf(".") !== -1;
  };

  isInputOperator = () => {
    return this.state.input.match(/^[+-/*//]$/);
  };

  isOutputEmpty = () => {
    return this.state.output === "";
  };

  isOutputZeroOrEmpty = () => {
    return this.state.output === "0" || this.state.output === "";
  };

  isOutputEndsWithDigital = () => {
    return this.state.output.match(/\d$/);
  };

  isOutputEndsWithDivideOrMultiply = () => {
    return this.state.output.match(/[*/]$/);
  };

  isOutputEndsWithDivideOrMultiplyAndMinus = () => {
    return this.state.output.match(/[*/][-]$/);
  };

  isOutputHasOperator = () => {
    return this.state.output.match(/[*/+-]/);
  };

  isAnswer = () => {
    return this.state.answer;
  };

  onClear = () => {
    this.setState(() => ({
      output: "",
      input: "0",
    }));
  };

  onDigit = (sign) => {
    if (this.state.answer !== "") {
      this.setState((state) => ({
        ...state,
        output: sign,
        input: sign,
        answer: "",
      }));
    } else {
      if (this.isInputZero() && this.isOutputZeroOrEmpty()) {
        this.setState((state) => ({
          ...state,
          output: sign,
          input: sign,
        }));
      } else if (
        this.isInputOperator() &&
        !this.isOutputEndsWithDivideOrMultiplyAndMinus()
      ) {
        this.setState((state) => ({
          ...state,
          output: state.output + sign,
          input: sign,
        }));
      } else if (!this.isInputZero()) {
        this.setState((state) => ({
          ...state,
          output: state.output + sign,
          input: state.input + sign,
        }));
      } else {
        this.setState((state) => ({
          ...state,
          output: state.output.slice(0, -1) + sign,
          input: sign,
        }));
      }
    }
  };

  onDecimal = (sign) => {
    if (this.state.answer !== "") {
      this.setState((state) => ({
        ...state,
        output: state.answer + sign,
        input: state.input + sign,
        answer: "",
      }));
    } else {
      if (this.isOutputEmpty()) {
        this.setState((state) => ({
          ...state,
          output: "0" + sign,
          input: state.input + sign,
        }));
      } else if (!this.isInputDecimal() && !this.isInputOperator()) {
        this.setState((state) => ({
          ...state,
          output: state.output + sign,
          input: state.input + sign,
        }));
      }
    }
  };

  onOperator = (sign) => {
    if (this.state.answer !== "") {
      this.setState((state) => ({
        ...state,
        output: state.answer + sign,
        input: sign,
        answer: "",
      }));
    } else {
      if (this.isOutputEndsWithDigital()) {
        this.setState((state) => ({
          ...state,
          output: state.output + sign,
          input: sign,
        }));
      } else if (sign === "-" && this.isOutputEndsWithDivideOrMultiply()) {
        this.setState((state) => ({
          ...state,
          output: state.output + sign,
          input: sign,
        }));
      } else if (this.isOutputEndsWithDivideOrMultiplyAndMinus()) {
        this.setState((state) => ({
          ...state,
          output: state.output.slice(0, -2) + sign,
          input: sign,
        }));
      } else {
        this.setState((state) => ({
          ...state,
          output: state.output.slice(0, -1) + sign,
          input: sign,
        }));
      }
    }
  };

  onEquals = () => {
    if (
      this.isOutputEndsWithDigital() &&
      this.isOutputHasOperator() &&
      !this.isAnswer()
    ) {
      this.setState((state) => {
        const answer = Math.round(eval(state.output) * 100) / 100;
        return {
          output: state.output + "=" + answer,
          input: answer,
          answer: answer,
        };
      });
    }
  };

  handleButtonClick = (sign, type) => {
    switch (type) {
      case "clear":
        this.onClear();
        break;
      case "digit":
        this.onDigit(sign);
        break;
      case "operator":
        this.onOperator(sign);
        break;
      case "decimal":
        this.onDecimal(sign);
        break;
      case "equals":
        this.onEquals();
        break;
      default:
        console.log("Sorry, we are out of " + type + ".");
    }
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
      this.handleButtonClick(button.sign, button.type);
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

  render() {
    const { input, output } = this.state;

    return (
      <div className="app">
        <div className="calculator">
          <div className="calculator__screen">
            <Output output={output}></Output>
            <Input input={input}></Input>
          </div>
          <div className="calculator__buttons">
            {buttons.map((button) => (
              <Button
                key={button.id}
                pressedKeys={this.state.pressedKeys}
                press={button.key}
                sign={button.sign}
                type={button.type}
                id={button.id}
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
