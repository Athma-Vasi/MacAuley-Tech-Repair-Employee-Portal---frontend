import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import {
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  PERIPHERALS_INTERFACE_DATA,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import {
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  PeripheralsInterface,
} from "./types";

type KeyboardProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
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
  additionalFieldsFormData,
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
      additionalFieldsFormData={additionalFieldsFormData}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {keyboardBacklightSelectInput}
      {keyboardInterfaceSelectInput}
      {keyboardLayoutSelectInput}
      {keyboardSwitchSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Keyboard };
