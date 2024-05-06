import { Id, Key, Sign, Type } from "../../App.types";

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
