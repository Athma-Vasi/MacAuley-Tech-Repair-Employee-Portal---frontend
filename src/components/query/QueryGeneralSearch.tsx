import { Stack, Text } from "@mantine/core";
import { VALIDATION_FUNCTIONS_TABLE, ValidationKey } from "../../constants/validations";
import { StepperPage } from "../../types";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { QUERY_SEARCH_CASE_DATA } from "./constants";
import { QuerySearchDispatch } from "./QuerySearch";
import { GeneralSearchCase } from "./types";
import { InputsValidationsMap } from "./utils";

type QueryGeneralSearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  generalSearchCase: GeneralSearchCase;
  queryAction: QueryAction;
  querySearchDispatch: QuerySearchDispatch<ValidValueAction, InvalidValueAction>;
  inputsValidationsMap: InputsValidationsMap;
};

function QueryGeneralSearch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  generalSearchCase,
  generalSearchExclusionValue,
  generalSearchInclusionValue,
  queryAction,
  querySearchDispatch,
  inputsValidationsMap,
}: QueryGeneralSearchProps<ValidValueAction, InvalidValueAction>) {
  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: "include",
          validationKey: "include",
        },
        {
          inputType: "text",
          name: "exclude",
          validationKey: "exclude",
        },
      ],
      description: "",
    },
  ];

  const generalSearchInclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "include",
        parentDispatch: querySearchDispatch,
        stepperPages,
        validValueAction: queryAction.setGeneralSearchInclusionValue as ValidValueAction,
        value: generalSearchInclusionValue,
      }}
    />
  );

  const generalSearchExclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "exclude",
        parentDispatch: querySearchDispatch,
        stepperPages,
        validValueAction: queryAction.setGeneralSearchExclusionValue as ValidValueAction,
        value: generalSearchExclusionValue,
      }}
    />
  );

  const caseSensitiveSegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: QUERY_SEARCH_CASE_DATA,
        name: "case",
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setGeneralSearchCase as ValidValueAction,
        value: generalSearchCase,
      }}
    />
  );

  const generalSearchSection = (
    <Stack>
      <Text size="md">General Search</Text>
      {caseSensitiveSegmentedControl}
      {generalSearchInclusionTextInput}
      {generalSearchExclusionTextInput}
    </Stack>
  );

  return generalSearchSection;
}

export { QueryGeneralSearch };
