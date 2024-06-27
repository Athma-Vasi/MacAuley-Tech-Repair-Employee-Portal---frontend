import { Stack, Text } from "@mantine/core";
import { VALIDATION_FUNCTIONS_TABLE, ValidationKey } from "../../constants/validations";
import { StepperPage } from "../../types";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { QUERY_SEARCH_CASE_DATA } from "./constants";
import { GeneralSearchCase, QueryDispatch } from "./types";
import { InputsValidationsMap } from "./utils";

type QueryGeneralSearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  generalSearchCase: GeneralSearchCase;
  queryAction: QueryAction;
  parentDispatch: React.Dispatch<QueryDispatch>;
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
  parentDispatch,
  inputsValidationsMap,
}: QueryGeneralSearchProps<ValidValueAction, InvalidValueAction>) {
  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: "inclusion",
          validationKey: "inclusion",
        },
        {
          inputType: "text",
          name: "exclusion",
          validationKey: "exclusion",
        },
      ],
      description: "",
    },
  ];

  const generalSearchInclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError,
        name: "inclusion",
        parentDispatch,
        stepperPages,
        validValueAction: queryAction.setGeneralSearchInclusionValue,
        value: generalSearchInclusionValue,
      }}
    />
  );

  const generalSearchExclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError,
        name: "exclusion",
        parentDispatch,
        stepperPages,
        validValueAction: queryAction.setGeneralSearchExclusionValue,
        value: generalSearchExclusionValue,
      }}
    />
  );

  const caseSensitiveSegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: QUERY_SEARCH_CASE_DATA,
        name: "case",
        parentDispatch,
        validValueAction: queryAction.setGeneralSearchCase,
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
