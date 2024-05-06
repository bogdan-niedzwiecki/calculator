import { Id, Key, Sign, Type } from "./App.types";

export const buttons = [
  { sign: Sign.Zero, id: Id.Zero, type: Type.Digit, key: Key.Zero },
  { sign: Sign.One, id: Id.One, type: Type.Digit, key: Key.One },
  { sign: Sign.Two, id: Id.Two, type: Type.Digit, key: Key.Two },
  { sign: Sign.Three, id: Id.Three, type: Type.Digit, key: Key.Three },
  { sign: Sign.Four, id: Id.Four, type: Type.Digit, key: Key.Four },
  { sign: Sign.Five, id: Id.Five, type: Type.Digit, key: Key.Five },
  { sign: Sign.Six, id: Id.Six, type: Type.Digit, key: Key.Six },
  { sign: Sign.Seven, id: Id.Seven, type: Type.Digit, key: Key.Seven },
  { sign: Sign.Eight, id: Id.Eight, type: Type.Digit, key: Key.Eight },
  { sign: Sign.Nine, id: Id.Nine, type: Type.Digit, key: Key.Nine },
  { sign: Sign.Decimal, id: Id.Decimal, type: Type.Decimal, key: Key.Decimal },
  { sign: Sign.Add, id: Id.Add, type: Type.Operator, key: Key.Add },
  {
    sign: Sign.Subtract,
    id: Id.Subtract,
    type: Type.Operator,
    key: Key.Subtract,
  },
  {
    sign: Sign.Multiply,
    id: Id.Multiply,
    type: Type.Operator,
    key: Key.Multiply,
  },
  { sign: Sign.Divide, id: Id.Divide, type: Type.Operator, key: Key.Divide },
  { sign: Sign.Equals, id: Id.Equals, type: Type.Equals, key: Key.Enter },
  { sign: Sign.Clear, id: Id.Clear, type: Type.Clear, key: Key.Escape },
];
