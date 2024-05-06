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

export enum Id {
  Zero = "zero",
  One = "one",
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
  Six = "six",
  Seven = "seven",
  Eight = "eight",
  Nine = "nine",
  Decimal = "decimal",
  Equals = "equals",
  Add = "add",
  Subtract = "subtract",
  Multiply = "multiply",
  Divide = "divide",
  Clear = "clear",
}

export enum Type {
  Digit = "digit",
  Decimal = "decimal",
  Operator = "operator",
  Equals = "equals",
  Clear = "clear",
}

export enum Key {
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
  Enter = "Enter",
  Escape = "Escape",
}

export interface LastTouched {
  sign: Sign | "";
  type: Type | "";
}
