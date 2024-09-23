import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  PERIPHERALS_INTERFACE_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type {
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  PeripheralsInterface,
} from "./types";

type KeyboardProps = {
  additionalFields: Array<[string, string]>;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;
  keyboardLayout: KeyboardLayout;
  keyboardSwitch: KeyboardSwitch;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Keyboard({
  additionalFields,
  keyboardBacklight,
  keyboardInterface,
  keyboardLayout,
  keyboardSwitch,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: KeyboardProps) {
  const keyboardBacklightSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: KEYBOARD_BACKLIGHT_DATA,
        label: "Backlight",
        name: "keyboardBacklight",
        parentDispatch,
        validValueAction: parentAction.setKeyboardBacklight,
        value: keyboardBacklight,
      }}
    />
  );

  const keyboardInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PERIPHERALS_INTERFACE_DATA,
        label: "Interface",
        name: "keyboardInterface",
        parentDispatch,
        validValueAction: parentAction.setKeyboardInterface,
        value: keyboardInterface,
      }}
    />
  );

  const keyboardLayoutSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: KEYBOARD_LAYOUT_DATA,
        label: "Layout",
        name: "keyboardLayout",
        parentDispatch,
        validValueAction: parentAction.setKeyboardLayout,
        value: keyboardLayout,
      }}
    />
  );

  const keyboardSwitchSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: KEYBOARD_SWITCH_DATA,
        label: "Switch",
        name: "keyboardSwitch",
        parentDispatch,
        validValueAction: parentAction.setKeyboardSwitch,
        value: keyboardSwitch,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={7}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {keyboardSwitchSelectInput}
      {keyboardLayoutSelectInput}
      {keyboardBacklightSelectInput}
      {keyboardInterfaceSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Keyboard };
