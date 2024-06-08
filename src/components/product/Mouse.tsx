import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import { MOUSE_SENSOR_DATA, PERIPHERALS_INTERFACE_DATA } from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { MouseSensor, PeripheralsInterface } from "./types";

type MouseProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
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
  additionalFieldsFormData,
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
        name: "mouseButtons",
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
        name: "mouseColor",
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
        name: "mouseDpi",
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
      additionalFieldsFormData={additionalFieldsFormData}
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
