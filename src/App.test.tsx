import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("Should calculate 0.5 + 0.5 and display 1", async () => {
    await act(async () => {
      render(<App />);
    });

    const output = screen.getByTestId("output");
    const decimalButton = screen.getByTestId("decimal");
    const zeroButton = screen.getByTestId("zero");
    const fiveButton = screen.getByTestId("five");
    const addButton = screen.getByTestId("add");
    const equalsButton = screen.getByTestId("equals");

    fireEvent.click(decimalButton);
    fireEvent.click(fiveButton);
    fireEvent.click(addButton);
    fireEvent.click(zeroButton);
    fireEvent.click(decimalButton);
    fireEvent.click(fiveButton);
    fireEvent.click(equalsButton);

    expect(output).toHaveTextContent("1");
  });

  it("Should clear output", async () => {
    await act(async () => {
      render(<App />);
    });

    const output = screen.getByTestId("output");
    const fiveButton = screen.getByTestId("five");
    const clearButton = screen.getByTestId("clear");

    fireEvent.click(fiveButton);
    fireEvent.click(clearButton);

    expect(output).toHaveTextContent("0");
  });

  it("Should be pressed on '1' keydown", async () => {
    await act(async () => {
      render(<App />);
    });
    const oneButton = screen.getByTestId("one");

    fireEvent.keyDown(document, { key: "1" });

    expect(oneButton).toHaveClass("button--pressed");
  });

  it("Should be unpressed on '1' keyup", async () => {
    await act(async () => {
      render(<App />);
    });
    const oneButton = screen.getByTestId("one");

    fireEvent.keyDown(document, { key: "1" });
    fireEvent.keyUp(document, { key: "1" });

    expect(oneButton).not.toHaveClass("button--pressed");
  });
});
