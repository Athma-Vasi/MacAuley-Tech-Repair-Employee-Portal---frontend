import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { SPEAKER_INTERFACE_DATA, SPEAKER_TYPE_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { SpeakerInterface, SpeakerType } from "./types";

type SpeakerProps = {
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
        parentDispatch,
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
        parentDispatch,
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
        parentDispatch,
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
      page={13}
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
