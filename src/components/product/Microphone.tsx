import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import {
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { MicrophoneInterface, MicrophonePolarPattern, MicrophoneType } from "./types";

type MicrophoneProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
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
  additionalFieldsFormData,
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
      additionalFieldsFormData={additionalFieldsFormData}
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
