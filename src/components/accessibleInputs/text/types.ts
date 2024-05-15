import { AccessibleTextInputAction } from "./actions";

type AccessibleTextInputState = {
  popoverOpened: boolean;
  valueBuffer: string;
  isInputFocused: boolean;
};

type AccessibleTextInputDispatch =
  | {
      type: AccessibleTextInputAction["setPopoverOpened"];
      payload: boolean;
    }
  | {
      type: AccessibleTextInputAction["setValueBuffer"];
      payload: string;
    }
  | {
      type: AccessibleTextInputAction["setIsInputFocused"];
      payload: boolean;
    };

export type { AccessibleTextInputDispatch, AccessibleTextInputState };
