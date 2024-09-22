import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type {
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
} from "./types";

type MicrophoneProps = {
  additionalFields: Array<[string, string]>;
  microphoneColor: string;
  microphoneFrequencyResponse: string;
  microphoneInterface: MicrophoneInterface;
  microphonePolarPattern: MicrophonePolarPattern;
  microphoneType: MicrophoneType;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Microphone({
  additionalFields,
  microphoneColor,
  microphoneFrequencyResponse,
  microphoneInterface,
  microphonePolarPattern,
  microphoneType,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: MicrophoneProps) {
  const microphoneColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "microphoneColor",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMicrophoneColor,
        value: microphoneColor,
      }}
    />
  );

  const microphoneFrequencyResponseTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "microphoneFrequencyResponse",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMicrophoneFrequencyResponse,
        value: microphoneFrequencyResponse,
      }}
    />
  );

  const microphoneInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MICROPHONE_INTERFACE_DATA,
        name: "microphoneInterface",
        parentDispatch,
        validValueAction: parentAction.setMicrophoneInterface,
        value: microphoneInterface,
      }}
    />
  );

  const microphonePolarPatternSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MICROPHONE_POLAR_PATTERN_DATA,
        name: "microphonePolarPattern",
        parentDispatch,
        validValueAction: parentAction.setMicrophonePolarPattern,
        value: microphonePolarPattern,
      }}
    />
  );

  const microphoneTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MICROPHONE_TYPE_DATA,
        name: "microphoneType",
        parentDispatch,
        validValueAction: parentAction.setMicrophoneType,
        value: microphoneType,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={8}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {microphoneColorTextInput}
      {microphoneFrequencyResponseTextInput}
      {microphoneInterfaceSelectInput}
      {microphonePolarPatternSelectInput}
      {microphoneTypeSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Microphone };
