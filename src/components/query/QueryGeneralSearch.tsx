import { Stack, Text } from "@mantine/core";
import { ValidationKey } from "../../constants/validations";
import { StepperPage } from "../../types";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { QUERY_SEARCH_CASE_DATA } from "./constants";
import { QuerySearchDispatch } from "./QuerySearch";
import { GeneralSearchCase } from "./types";

type QueryGeneralSearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  generalSearchCase: GeneralSearchCase;
  queryAction: QueryAction;
  querySearchDispatch: QuerySearchDispatch<ValidValueAction, InvalidValueAction>;
  validatedInputsKeyMap: Map<string, ValidationKey>;
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
  validatedInputsKeyMap,
}: QueryGeneralSearchProps<ValidValueAction, InvalidValueAction>) {
  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: "include",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
        },
        {
          inputType: "text",
          name: "exclude",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
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
