import { Stack } from "@mantine/core";
import { CURRENCY_DATA, URGENCY_DATA } from "../../../constants/data";
import type { Currency, StepperPage, Urgency } from "../../../types";
import {
  AccessibleCheckboxInputGroup,
  AccessibleCheckboxInputSingle,
} from "../../accessibleInputs/AccessibleCheckboxInput";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import type { PartsNeeded, RequiredRepairs } from "../types";
import type { CreateRepairTicketAction } from "./actions";
import { PARTS_NEEDED_DATA, REQUIRED_REPAIRS_DATA } from "./constants";
import type { CreateRepairTicketDispatch } from "./types";

type RepairTicketStepDetailsProps = {
  requiredRepairs: RequiredRepairs[];
  partsNeeded: PartsNeeded[];
  partsNeededModels: string;
  partUnderWarranty: boolean;
  estimatedRepairCost: string;
  estimatedRepairCostCurrency: Currency;
  estimatedCompletionDate: string;
  repairPriority: Urgency;

  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
  stepperPages: StepperPage[];
};

function RepairTicketStepDetails({
  createRepairTicketAction,
  createRepairTicketDispatch,
  estimatedCompletionDate,
  estimatedRepairCost,
  estimatedRepairCostCurrency,
  partUnderWarranty,
  partsNeeded,
  partsNeededModels,
  repairPriority,
  requiredRepairs,
  stepperPages,
}: RepairTicketStepDetailsProps) {
  const requiredRepairsCheckboxInput = (
    <AccessibleCheckboxInputGroup
      attributes={{
        inputData: REQUIRED_REPAIRS_DATA,
        name: "requiredRepairs",
        parentDispatch: createRepairTicketDispatch,
        validValueAction: createRepairTicketAction.setRequiredRepairs,
        value: requiredRepairs,
      }}
    />
  );

  const partsNeededCheckboxInput = (
    <AccessibleCheckboxInputGroup
      attributes={{
        inputData: PARTS_NEEDED_DATA,
        name: "requiredRepairs",
        parentDispatch: createRepairTicketDispatch,
        validValueAction: createRepairTicketAction.setPartsNeeded,
        value: partsNeeded,
      }}
    />
  );

  const partsNeededModelsTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: createRepairTicketAction.setPageInError,
        name: "partsNeededModels",
        parentDispatch: createRepairTicketDispatch,
        stepperPages,
        validValueAction: createRepairTicketAction.setPartsNeededModels,
        value: partsNeededModels,
      }}
    />
  );

  const partUnderWarrantyCheckboxInput = (
    <AccessibleCheckboxInputSingle
      attributes={{
        checked: partUnderWarranty,
        deselectedDescription: "No is selected. Part is not under warranty",
        invalidValueAction: createRepairTicketAction.setPageInError,
        name: "partUnderWarranty",
        parentDispatch: createRepairTicketDispatch,
        selectedDescription: "Yes is selected. Part is under warranty",
        validValueAction: createRepairTicketAction.setPartUnderWarranty,
        value: partUnderWarranty ? "Yes" : "No",
      }}
    />
  );

  const estimatedRepairCostTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: createRepairTicketAction.setPageInError,
        name: "estimatedRepairCost",
        parentDispatch: createRepairTicketDispatch,
        stepperPages,
        validValueAction: createRepairTicketAction.setEstimatedRepairCost,
        value: estimatedRepairCost,
      }}
    />
  );

  const estimatedRepairCostCurrencySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CURRENCY_DATA,
        name: "estimatedRepairCostCurrency",
        parentDispatch: createRepairTicketDispatch,
        validValueAction:
          createRepairTicketAction.setEstimatedRepairCostCurrency,
        value: estimatedRepairCostCurrency,
      }}
    />
  );

  const estimatedCompletionDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: createRepairTicketAction.setPageInError,
        name: "estimatedCompletionDate",
        stepperPages,
        validValueAction: createRepairTicketAction.setEstimatedCompletionDate,
        value: estimatedCompletionDate,
      }}
    />
  );

  const repairPrioritySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: URGENCY_DATA,
        name: "repairPriority",
        parentDispatch: createRepairTicketDispatch,
        validValueAction: createRepairTicketAction.setRepairPriority,
        value: repairPriority,
      }}
    />
  );

  return (
    <Stack>
      {requiredRepairsCheckboxInput}
      {partsNeededCheckboxInput}
      {partsNeededModelsTextAreaInput}
      {partUnderWarrantyCheckboxInput}
      {estimatedRepairCostTextInput}
      {estimatedRepairCostCurrencySelectInput}
      {estimatedCompletionDateInput}
      {repairPrioritySelectInput}
    </Stack>
  );
}

export { RepairTicketStepDetails };

/**
import { useMantineTheme } from "@mantine/core";
import { ChangeEvent, useEffect } from "react";

import { CURRENCY_DATA, URGENCY_DATA } from "../../../../constants/data";
import {
  DATE_NEAR_FUTURE_REGEX,
  MONEY_REGEX,
  NOTE_TEXT_AREA_REGEX,
} from "../../../../constants/regex";
import { useGlobalState } from "../../../../hooks";
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../../../jsxCreators";
import { Currency, Urgency } from "../../../../types";
import {
  filterFieldsFromObject,
  logState,
  replaceLastCommaWithAnd,
  returnDateNearFutureValidationText,
  returnFloatAmountValidationText,
  returnNoteTextValidationText,
} from "../../../../utils";
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../../wrappers";
import {
  PARTS_NEEDED_CHECKBOX_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
} from "../../constants";
import { PartsNeeded, RequiredRepairs } from "../../types";
import { RepairTicketStepDetailsProps } from "./types";

function RepairTicketStepDetail(parentState: RepairTicketStepDetailsProps) {
  const {
    requiredRepairs,
    partsNeeded,
    partsNeededModels,
    isValidPartsNeededModels,
    isPartsNeededModelsFocused,

    partUnderWarranty,
    estimatedRepairCost,
    isValidEstimatedRepairCost,
    isEstimatedRepairCostFocused,

    estimatedRepairCostCurrency,
    estimatedCompletionDate,
    isValidEstimatedCompletionDate,
    isEstimatedCompletionDateFocused,

    repairPriority,

    createRepairTicketAction,
    createRepairTicketDispatch,
  } = parentState;

  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      width,
    },
  } = useGlobalState();

  const { colors } = useMantineTheme();

  // validate partsNeededModels on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(partsNeededModels);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidPartsNeededModels,
      payload: isValid,
    });
  }, [partsNeededModels, createRepairTicketDispatch, createRepairTicketAction]);

  // validate estimatedRepairCost on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(estimatedRepairCost);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidEstimatedRepairCost,
      payload: isValid,
    });
  }, [
    estimatedRepairCost,
    createRepairTicketDispatch,
    createRepairTicketAction,
  ]);

  // validate estimatedCompletionDate on every change
  useEffect(() => {
    // date must be in the near future and not in past
    const isValid = DATE_NEAR_FUTURE_REGEX.test(estimatedCompletionDate) &&
      new Date(estimatedCompletionDate) > new Date();

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidEstimatedCompletionDate,
      payload: isValid,
    });
  }, [
    estimatedCompletionDate,
    createRepairTicketDispatch,
    createRepairTicketAction,
  ]);

  // update corresponding stepsInError when inputs change
  useEffect(() => {
    const isStepInError = !isValidEstimatedRepairCost ||
      !isValidPartsNeededModels ||
      !isValidEstimatedCompletionDate;

    createRepairTicketDispatch({
      type: createRepairTicketAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 2,
      },
    });
  }, [
    isValidEstimatedRepairCost,
    isValidPartsNeededModels,
    isValidEstimatedCompletionDate,
    createRepairTicketDispatch,
    createRepairTicketAction,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const [requiredRepairsSelectedText, requiredRepairsDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: requiredRepairs.length > 0,
      semanticName: "required repairs",
      deselectedDescription: "Nothing to repair!",
      selectedDescription: `${
        replaceLastCommaWithAnd(requiredRepairs.join(", "))
      }`,
      theme: "muted",
    });

  const [partsNeededSelectedText, partsNeededDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: partsNeeded.length > 0,
      semanticName: "parts needed",
      deselectedDescription: "No parts required!",
      selectedDescription: `${replaceLastCommaWithAnd(partsNeeded.join(", "))}`,
      theme: "muted",
    });

  const [partsNeededModelsInputErrorText, partsNeededModelsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "parts needed models",
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      isInputTextFocused: isPartsNeededModelsFocused,
      regexValidationText: returnNoteTextValidationText({
        content: partsNeededModels,
        contentKind: "parts needed models",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [partUnderWarrantySelectedText, partUnderWarrantyDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: partUnderWarranty,
      semanticName: "part under warranty",
      deselectedDescription: "Part is not under warranty",
      selectedDescription: "Part is under warranty",
      theme: "muted",
    });

  const [estimatedRepairCostInputErrorText, estimatedRepairCostInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "estimated repair cost",
      inputText: estimatedRepairCost,
      isValidInputText: isValidEstimatedRepairCost,
      isInputTextFocused: isEstimatedRepairCostFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: estimatedRepairCost,
        contentKind: "estimated repair cost",
      }),
    });

  const [
    estimatedCompletionDateInputErrorText,
    estimatedCompletionDateInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "estimated completion date",
    inputText: estimatedCompletionDate,
    isValidInputText: isValidEstimatedCompletionDate,
    isInputTextFocused: isEstimatedCompletionDateFocused,
    regexValidationText: returnDateNearFutureValidationText({
      content: estimatedCompletionDate,
      contentKind: "estimated completion date",
    }),
  });

  const requiredRepairsCheckboxCreatorInfo:
    AccessibleCheckboxGroupInputCreatorInfo = {
      dataObjectArray: REQUIRED_REPAIRS_CHECKBOX_DATA,
      description: {
        selected: requiredRepairsSelectedText,
        deselected: requiredRepairsDeselectedText,
      },
      onChange: (event: string[]) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setRequiredRepairs,
          payload: event as RequiredRepairs[],
        });
      },
      label: "Required Repairs",
      semanticName: "required repairs",
      value: requiredRepairs,
      required: true,
      withAsterisk: true,
    };

  const partsNeededCheckboxCreatorInfo:
    AccessibleCheckboxGroupInputCreatorInfo = {
      dataObjectArray: PARTS_NEEDED_CHECKBOX_DATA,
      description: {
        selected: partsNeededSelectedText,
        deselected: partsNeededDeselectedText,
      },
      onChange: (event: string[]) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPartsNeeded,
          payload: event as PartsNeeded[],
        });
      },
      label: "Parts Needed",
      semanticName: "parts needed",
      value: partsNeeded,
      required: true,
      withAsterisk: true,
    };

  const textAreaWidth = width < 480 // for iPhone 5/SE
    ? 330
    : width < 768 // for iPhone 6/7/8
    ? width * 0.8 - 44
    // at 768vw the navbar appears at width of 225px
    : width < 1024
    ? (width - 225 - 44) * 0.8
    // at >= 1200vw the navbar width is 300px
    : width < 1200
    ? (width - 300 - 44) * 0.8
    : 900 - 74;

  const partsNeededModelsTextAreaInputCreatorInfo:
    AccessibleTextAreaInputCreatorInfo = {
      description: {
        error: partsNeededModelsInputErrorText,
        valid: partsNeededModelsInputValidText,
      },
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      label: "Parts Needed Models",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPartsNeededModelsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPartsNeededModels,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPartsNeededModelsFocused,
          payload: true,
        });
      },
      placeholder: "Enter models of parts needed",
      required: true,
      semanticName: "parts needed models",
      textAreaWidth,
      withAsterisk: true,
    };

  const partUnderWarrantySwitchInputCreatorInfo:
    AccessibleCheckboxSingleInputCreatorInfo = {
      checked: partUnderWarranty,
      description: {
        selected: partUnderWarrantySelectedText,
        deselected: partUnderWarrantyDeselectedText,
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPartUnderWarranty,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: "part under warranty",
      label: "Part Under Warranty",
      required: true,
    };

  const estimatedRepairCostCurrencySelectInputCreatorInfo:
    AccessibleSelectInputCreatorInfo = {
      data: CURRENCY_DATA,
      description: "Select the currency for estimated repair cost.",
      label: "Estimated Repair Cost Currency",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setEstimatedRepairCostCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: estimatedRepairCostCurrency,
      required: true,
      withAsterisk: true,
    };

  const estimatedRepairCostTextInputCreatorInfo:
    AccessibleTextInputCreatorInfo = {
      description: {
        error: estimatedRepairCostInputErrorText,
        valid: estimatedRepairCostInputValidText,
      },
      inputText: estimatedRepairCost,
      isValidInputText: isValidEstimatedRepairCost,
      label: "Estimated Repair Cost",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEstimatedRepairCostFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setEstimatedRepairCost,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEstimatedRepairCostFocused,
          payload: true,
        });
      },
      rightSection: true,
      placeholder: "Enter estimated repair cost",
      semanticName: "estimated repair cost",
      minLength: 3,
      maxLength: 9,
      required: true,
      withAsterisk: true,
    };

  const estimatedCompletionDateTextInputCreatorInfo:
    AccessibleDateTimeInputCreatorInfo = {
      description: {
        error: estimatedCompletionDateInputErrorText,
        valid: estimatedCompletionDateInputValidText,
      },
      inputText: estimatedCompletionDate,
      isValidInputText: isValidEstimatedCompletionDate,
      label: "Estimated Completion Date",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEstimatedCompletionDateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setEstimatedCompletionDate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEstimatedCompletionDateFocused,
          payload: true,
        });
      },
      placeholder: "Enter estimated completion date",
      semanticName: "estimated completion date",
      inputKind: "date",
      dateKind: "date near future",
      required: true,
      withAsterisk: true,
    };

  const repairPrioritySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: URGENCY_DATA,
      description: "Select the urgency of the repair.",
      label: "Repair Priority",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setRepairPriority,
          payload: event.currentTarget.value as Urgency,
        });
      },
      value: repairPriority,
      required: true,
      withAsterisk: true,
    };

  const [
    createdRequiredRepairsCheckboxGroupInput,
    createdPartsNeededCheckboxGroupInput,
  ] = returnAccessibleCheckboxGroupInputsElements([
    requiredRepairsCheckboxCreatorInfo,
    partsNeededCheckboxCreatorInfo,
  ]);

  const [createdEstimatedRepairCostTextInput] =
    returnAccessibleTextInputElements([
      estimatedRepairCostTextInputCreatorInfo,
    ]);

  const [createdPartsNeededModelsTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      partsNeededModelsTextAreaInputCreatorInfo,
    ]);

  const [createdPartUnderWarrantyCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      partUnderWarrantySwitchInputCreatorInfo,
    ]);

  const [
    createdEstimatedRepairCostCurrencySelectInput,
    createdRepairPrioritySelectInput,
  ] = returnAccessibleSelectInputElements([
    estimatedRepairCostCurrencySelectInputCreatorInfo,
    repairPrioritySelectInputCreatorInfo,
  ]);

  const [createdEstimatedCompletionDateTextInput] =
    returnAccessibleDateTimeElements([
      estimatedCompletionDateTextInputCreatorInfo,
    ]);

  const displayRepairTicketStepDetails = (
    <FormLayoutWrapper>
      {createdRequiredRepairsCheckboxGroupInput}
      {createdPartsNeededCheckboxGroupInput}
      {createdPartsNeededModelsTextAreaInput}
      {createdPartUnderWarrantyCheckboxInput}
      {createdEstimatedRepairCostCurrencySelectInput}
      {createdEstimatedRepairCostTextInput}
      {createdEstimatedCompletionDateTextInput}
      {createdRepairPrioritySelectInput}
    </FormLayoutWrapper>
  );

  useEffect(() => {
    const fieldsOmittedState = filterFieldsFromObject({
      object: parentState,
      fieldsToFilter: [
        "createRepairTicketAction",
        "createRepairTicketDispatch",
      ],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: "RepairTicketStepDetails",
    });
  }, [parentState]);

  return <>{displayRepairTicketStepDetails}</>;
}

export { RepairTicketStepDetail };
*/
