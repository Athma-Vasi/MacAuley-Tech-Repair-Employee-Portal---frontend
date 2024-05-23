import { AccessibleTextInputAction } from "./actions";

type AccessibleTextInputState = {
  valueBuffer: string;
};

type AccessibleTextInputDispatch = {
  action: AccessibleTextInputAction["setValueBuffer"];
  payload: string;
};

export type { AccessibleTextInputDispatch, AccessibleTextInputState };
