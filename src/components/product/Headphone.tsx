import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import { HEADPHONE_INTERFACE_DATA, HEADPHONE_TYPE_DATA } from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { HeadphoneInterface, HeadphoneType } from "./types";

type HeadphoneProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
  headphoneColor: string;
  headphoneDriver: string;
  headphoneFrequencyResponse: string;
  headphoneImpedance: string;
  headphoneInterface: HeadphoneInterface;
  headphoneType: HeadphoneType;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Headphone({
  additionalFields,
  additionalFieldsFormData,
  headphoneColor,
  headphoneDriver,
  headphoneFrequencyResponse,
  headphoneImpedance,
  headphoneInterface,
  headphoneType,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: HeadphoneProps) {
  const headphoneColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "headphoneColor",
        stepperPages,
        validValueAction: parentAction.setHeadphoneColor,
        value: headphoneColor,
      }}
    />
  );

  const headphoneDriverTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "headphoneDriver",
        stepperPages,
        validValueAction: parentAction.setHeadphoneDriver,
        value: headphoneDriver,
      }}
    />
  );

  const headphoneFrequencyResponseTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "headphoneFrequencyResponse",
        stepperPages,
        validValueAction: parentAction.setHeadphoneFrequencyResponse,
        value: headphoneFrequencyResponse,
      }}
    />
  );

  const headphoneImpedanceTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "headphoneImpedance",
        stepperPages,
        validValueAction: parentAction.setHeadphoneImpedance,
        value: headphoneImpedance,
      }}
    />
  );

  const headphoneInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: HEADPHONE_INTERFACE_DATA,
        name: "headphoneInterface",
        parentDispatch,
        validValueAction: parentAction.setHeadphoneInterface,
        value: headphoneInterface,
      }}
    />
  );

  const headphoneTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: HEADPHONE_TYPE_DATA,
        name: "headphoneType",
        parentDispatch,
        validValueAction: parentAction.setHeadphoneType,
        value: headphoneType,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      additionalFieldsFormData={additionalFieldsFormData}
      page={6}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {headphoneColorTextInput}
      {headphoneDriverTextInput}
      {headphoneFrequencyResponseTextInput}
      {headphoneImpedanceTextInput}
      {headphoneInterfaceSelectInput}
      {headphoneTypeSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Headphone };
