import { Dispatch, FocusEvent, MouseEvent, ReactNode } from "react";

import { SetPageInErrorPayload, StepperPage } from "../../../types";
import { AccessibleTextInputsDynamicAction } from "./actions";

type AccessibleTextInputsDynamicAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  disableds?: boolean[];
  index?: number;
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
        payload: string[];
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  parentDynamicDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: { index: number; payload: string[] };
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  stepperPages: StepperPage[];
  validValueAction: ValidValueAction;
  values: string[];
};

type AccessibleTextInputsDynamicProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextInputsDynamicAttributes<ValidValueAction, InvalidValueAction>;
};

type AccessibleTextInputsDynamicState = {
  textValues: string[];
  pagesInError: Set<number>;
};

type AccessibleTextInputsDynamicDispatch =
  | {
      action: AccessibleTextInputsDynamicAction["addInput"];
      payload: undefined;
    }
  | {
      action: AccessibleTextInputsDynamicAction["deleteInput"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsDynamicAction["setInputValue"];
      payload: { index: number; value: string };
    }
  | {
      action: AccessibleTextInputsDynamicAction["slideInputUp"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsDynamicAction["slideInputDown"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsDynamicAction["insertInput"];
      payload: number;
    }
  | {
      action: AccessibleTextInputsDynamicAction["setPageInError"];
      payload: SetPageInErrorPayload;
    };

export type {
  AccessibleTextInputsDynamicAttributes,
  AccessibleTextInputsDynamicDispatch,
  AccessibleTextInputsDynamicProps,
  AccessibleTextInputsDynamicState,
};
