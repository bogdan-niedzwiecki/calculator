import { Id, Key } from "../../App.types";

export enum Sign {
  Zero = "0",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Decimal = ".",
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = "/",
  Equals = "=",
  Clear = "AC",
}

export enum Type {
  Digit = "digit",
  Decimal = "decimal",
  Operator = "operator",
  Equals = "equals",
  Clear = "clear",
}

export interface ButtonProps {
  pressedKeys: Key[];
  blockedButtons: Sign[];
  button: {
    sign: Sign;
    type: Type;
    key: Key;
    id: Id;
  };
  onButtonClick: (sign: Sign, type: Type) => void;
}
