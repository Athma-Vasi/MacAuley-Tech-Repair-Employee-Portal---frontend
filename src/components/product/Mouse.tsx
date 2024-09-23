import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { MOUSE_SENSOR_DATA, PERIPHERALS_INTERFACE_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { MouseSensor, PeripheralsInterface } from "./types";

type MouseProps = {
  additionalFields: Array<[string, string]>;
  mouseButtons: string;
  mouseColor: string;
  mouseDpi: string;
  mouseInterface: PeripheralsInterface;
  mouseSensor: MouseSensor;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Mouse({
  additionalFields,
  mouseButtons,
  mouseColor,
  mouseDpi,
  mouseInterface,
  mouseSensor,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: MouseProps) {
  const mouseButtonsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Buttons",
        name: "mouseButtons",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMouseButtons,
        value: mouseButtons,
      }}
    />
  );

  const mouseColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Color",
        name: "mouseColor",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMouseColor,
        value: mouseColor,
      }}
    />
  );

  const mouseDpiTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Dots Per Inch (DPI)",
        name: "mouseDpi",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMouseDpi,
        value: mouseDpi,
      }}
    />
  );

  const mouseInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PERIPHERALS_INTERFACE_DATA,
        label: "Interface",
        name: "mouseInterface",
        parentDispatch,
        validValueAction: parentAction.setMouseInterface,
        value: mouseInterface,
      }}
    />
  );

  const mouseSensorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MOUSE_SENSOR_DATA,
        label: "Sensor",
        name: "mouseSensor",
        parentDispatch,
        validValueAction: parentAction.setMouseSensor,
        value: mouseSensor,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={10}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {mouseButtonsTextInput}
      {mouseColorTextInput}
      {mouseDpiTextInput}
      {mouseInterfaceSelectInput}
      {mouseSensorSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Mouse };
