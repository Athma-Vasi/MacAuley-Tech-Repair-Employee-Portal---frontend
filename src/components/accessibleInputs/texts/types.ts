import { Dispatch, FocusEvent, MouseEvent, ReactNode } from "react";

import { SetPageInErrorPayload, StepperChild, StepperPage } from "../../../types";
import { AccessibleTextInputsAction } from "./actions";

type AccessibleTextInputsAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
  AddStepperChildAction extends string = string
> = {
  disableds?: boolean[];
  parentIndex?: number;
  invalidValueAction: InvalidValueAction;
  labels?: ReactNode[];
  maxInputsAmount?: number;
  name: string;
  onBlurs?: Array<(event: FocusEvent<HTMLInputElement>) => void>;
  onClicks?: Array<(event: MouseEvent<HTMLInputElement>) => void>;
  onFocuses?: Array<(event: FocusEvent<HTMLInputElement>) => void>;
  page: number;
  parentDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: {
          inputIndex: number;
          value: string;
        };
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
    | {
        action: AddStepperChildAction;
        payload: StepperChild[];
      }
  >;
  parentDynamicDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: { parentIndex: number; inputIndex: number; value: string };
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
    | {
        action: AddStepperChildAction;
        payload: {
          parentIndex: number;
          value: StepperChild[];
        };
      }
  >;
  stepperPages: StepperPage[];
  addStepperChildAction: AddStepperChildAction;
  validValueAction: ValidValueAction;
  values: string[];
};

type AccessibleTextInputsProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
  AddStepperChildAction extends string = string
> = {
  attributes: AccessibleTextInputsAttributes<
    ValidValueAction,
    InvalidValueAction,
    AddStepperChildAction
  >;
};

type AccessibleTextInputsState = {
  textValues: string[];
  pagesInError: Set<number>;
};

type AccessibleTextInputsDispatch =
  | {
      action: AccessibleTextInputsAction["addInput"];
      payload: undefined;
    }
  | {
      action: AccessibleTextInputsAction["deleteInput"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsAction["setInputValue"];
      payload: { index: number; value: string };
    }
  | {
      action: AccessibleTextInputsAction["slideInputUp"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsAction["slideInputDown"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsAction["insertInput"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: AccessibleTextInputsAction["addStepperChild"];
      payload: StepperPage[];
    };

export type {
  AccessibleTextInputsAttributes,
  AccessibleTextInputsDispatch,
  AccessibleTextInputsProps,
  AccessibleTextInputsState,
};
