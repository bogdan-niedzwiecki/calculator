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
  };

  handleButtonClick = (sign, type) => {
    if (type === "digit") {
      if (this.state.input.match(/^[0]/) && !this.state.input.match(/[.]/)) {
        this.setState(() => ({
          output: sign,
          input: sign,
        }));
      } else if (
        this.state.input.match(/^[+-/*//]/) &&
        !this.state.input.match(/[.]/)
      ) {
        this.setState((state) => ({
          output: state.output + sign,
          input: sign,
        }));
      } else {
        this.setState((state) => ({
          output: state.output + sign,
          input: state.input + sign,
        }));
      }
    } else if (type === "operator" && this.state.output.length) {
      if (this.state.output.match(/[+-/*//]$/)) {
        if (sign === "-" && !this.state.output.match(/[+-]$/)) {
          this.setState((state) => ({
            output: state.output + sign,
            input: sign,
          }));
        } else if (this.state.output.match(/[/*//][-]$/)) {
          this.setState((state) => ({
            output: state.output.slice(0, -2) + sign,
            input: sign,
          }));
        } else {
          this.setState((state) => ({
            output: state.output.replace(/.$/, sign),
            input: sign,
          }));
        }
      } else if (this.state.output.match(/[=]/)) {
        this.setState((state) => ({
          output: state.output.slice(state.output.indexOf("=") + 1) + sign,
          input: sign,
        }));
      } else {
        this.setState((state) => ({
          output: state.output + sign,
          input: sign,
        }));
      }
    } else if (
      type === "answer" &&
      this.state.output.match(/[+-/*//]/) &&
      !this.state.output.match(/[+-/*//]$/) &&
      !this.state.output.match(/[=]/)
    ) {
      this.setState((state) => {
        const answer = eval(state.output);
        return {
          output: state.output + "=" + answer,
          input: answer,
        };
      });
    } else if (type === "clear") {
      this.setState(() => ({
        output: "",
        input: "0",
      }));
    } else if (type === "decimal") {
      if (!this.state.output.length) {
        this.setState((state) => ({
          output: "0" + sign,
          input: state.input + sign,
        }));
      } else if (!this.state.output.match(/[.]$/)) {
        this.setState((state) => ({
          output: state.output + sign,
          input: state.input + sign,
        }));
      }
    }
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
