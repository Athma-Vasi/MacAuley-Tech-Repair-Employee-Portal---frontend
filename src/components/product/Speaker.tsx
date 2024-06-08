import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import { SPEAKER_INTERFACE_DATA, SPEAKER_TYPE_DATA } from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { SpeakerInterface, SpeakerType } from "./types";

type SpeakerProps = {
  additionalFieldsFormData: FormData;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  speakerColor: string;
  speakerFrequencyResponse: string;
  speakerInterface: SpeakerInterface;
  speakerTotalWattage: string;
  speakerType: SpeakerType;
  additionalFields: Array<[string, string]>;
  stepperPages: StepperPage[];
};

function Speaker({
  additionalFieldsFormData,
  parentAction,
  parentDispatch,
  productCategory,
  speakerColor,
  speakerFrequencyResponse,
  speakerInterface,
  speakerTotalWattage,
  speakerType,
  additionalFields,
  stepperPages,
}: SpeakerProps) {
  const speakerColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "speakerColor",
        stepperPages,
        validValueAction: parentAction.setSpeakerColor,
        value: speakerColor,
      }}
    />
  );

  const speakerFrequencyResponseTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "speakerFrequencyResponse",
        stepperPages,
        validValueAction: parentAction.setSpeakerFrequencyResponse,
        value: speakerFrequencyResponse,
      }}
    />
  );

  const speakerInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: SPEAKER_INTERFACE_DATA,
        name: "speakerInterface",
        parentDispatch,
        validValueAction: parentAction.setSpeakerInterface,
        value: speakerInterface,
      }}
    />
  );

  const speakerTotalWattageTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "speakerTotalWattage",
        stepperPages,
        validValueAction: parentAction.setSpeakerTotalWattage,
        value: speakerTotalWattage,
      }}
    />
  );

  const speakerTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: SPEAKER_TYPE_DATA,
        name: "speakerType",
        parentDispatch,
        validValueAction: parentAction.setSpeakerType,
        value: speakerType,
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
      {speakerColorTextInput}
      {speakerFrequencyResponseTextInput}
      {speakerInterfaceSelectInput}
      {speakerTotalWattageTextInput}
      {speakerTypeSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Speaker };
