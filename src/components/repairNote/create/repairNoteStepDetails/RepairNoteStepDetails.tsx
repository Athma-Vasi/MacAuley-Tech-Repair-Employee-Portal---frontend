import { useMantineTheme } from '@mantine/core';
import { ChangeEvent, useEffect } from 'react';
import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
  TbCurrencyRenminbi,
  TbCurrencyYen,
} from 'react-icons/tb';

import { URGENCY_DATA } from '../../../../constants/data';
import {
  DATE_NEAR_FUTURE_REGEX,
  MONEY_REGEX,
  NOTE_TEXT_AREA_REGEX,
} from '../../../../constants/regex';
import { useGlobalState } from '../../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import { Currency, Urgency } from '../../../../types';
import {
  filterFieldsFromObject,
  logState,
  replaceLastCommaWithAnd,
  returnDateNearFutureValidationText,
  returnFloatAmountValidationText,
  returnNoteTextValidationText,
} from '../../../../utils';
import { CURRENCY_DATA } from '../../../benefits/constants';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../../wrappers';
import {
  PARTS_NEEDED_CHECKBOX_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
} from '../../constants';
import { PartsNeeded, RequiredRepairs } from '../../types';
import { RepairNoteStepDetailsProps } from './types';

function RepairNoteStepDetail(parentState: RepairNoteStepDetailsProps) {
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

    createRepairNoteAction,
    createRepairNoteDispatch,
  } = parentState;

  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      width,
    },
  } = useGlobalState();

  const { colors } = useMantineTheme();

  /** ------------- input validation ------------- */

  // validate partsNeededModels on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(partsNeededModels);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidPartsNeededModels,
      payload: isValid,
    });
  }, [partsNeededModels, createRepairNoteDispatch, createRepairNoteAction]);

  // validate estimatedRepairCost on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(estimatedRepairCost);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidEstimatedRepairCost,
      payload: isValid,
    });
  }, [estimatedRepairCost, createRepairNoteDispatch, createRepairNoteAction]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (estimatedRepairCostCurrency === 'EUR') {
      const estimatedRepairCostWithCommaAndNoLeadingZero = estimatedRepairCost
        .replace('.', ',')
        .replace(/^0+(?=\d)/, ''); // removes leading zeros if amount !== '0.00'

      createRepairNoteDispatch({
        type: createRepairNoteAction.setEstimatedRepairCost,
        payload: estimatedRepairCostWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const estimatedRepairCostWithDecimalAndNoLeadingZero = estimatedRepairCost
        .replace(',', '.')
        .replace(/^0+(?=\d)/, '');

      createRepairNoteDispatch({
        type: createRepairNoteAction.setEstimatedRepairCost,
        payload: estimatedRepairCostWithDecimalAndNoLeadingZero,
      });
    }
  }, [
    estimatedRepairCost,
    estimatedRepairCostCurrency,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);

  // validate estimatedCompletionDate on every change
  useEffect(() => {
    // date must be in the near future and not in past
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(estimatedCompletionDate) &&
      new Date(estimatedCompletionDate) > new Date();

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidEstimatedCompletionDate,
      payload: isValid,
    });
  }, [
    estimatedCompletionDate,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);

  // update corresponding stepsInError when inputs change
  useEffect(() => {
    const isStepInError =
      !isValidEstimatedRepairCost ||
      !isValidPartsNeededModels ||
      !isValidEstimatedCompletionDate;

    createRepairNoteDispatch({
      type: createRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidEstimatedRepairCost,
    isValidPartsNeededModels,
    isValidEstimatedCompletionDate,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);
  /** ------------- end input validation ------------- */

  /** ------------- accessible error and valid texts ------------- */

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const [requiredRepairsSelectedText, requiredRepairsDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: requiredRepairs.length > 0,
      semanticName: 'required repairs',
      deselectedDescription: 'Nothing to repair!',
      selectedDescription: `${replaceLastCommaWithAnd(
        requiredRepairs.join(', ')
      )}`,
      theme: 'muted',
    });

  const [partsNeededSelectedText, partsNeededDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: partsNeeded.length > 0,
      semanticName: 'parts needed',
      deselectedDescription: 'No parts required!',
      selectedDescription: `${replaceLastCommaWithAnd(partsNeeded.join(', '))}`,
      theme: 'muted',
    });

  const [partsNeededModelsInputErrorText, partsNeededModelsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'parts needed models',
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      isInputTextFocused: isPartsNeededModelsFocused,
      regexValidationText: returnNoteTextValidationText({
        content: partsNeededModels,
        contentKind: 'parts needed models',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [partUnderWarrantySelectedText, partUnderWarrantyDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: partUnderWarranty,
      semanticName: 'part under warranty',
      deselectedDescription: 'Part is not under warranty',
      selectedDescription: 'Part is under warranty',
      theme: 'muted',
    });

  const [estimatedRepairCostInputErrorText, estimatedRepairCostInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'estimated repair cost',
      inputText: estimatedRepairCost,
      isValidInputText: isValidEstimatedRepairCost,
      isInputTextFocused: isEstimatedRepairCostFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: estimatedRepairCost,
        contentKind: 'estimated repair cost',
      }),
    });

  const [
    estimatedCompletionDateInputErrorText,
    estimatedCompletionDateInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'estimated completion date',
    inputText: estimatedCompletionDate,
    isValidInputText: isValidEstimatedCompletionDate,
    isInputTextFocused: isEstimatedCompletionDateFocused,
    regexValidationText: returnDateNearFutureValidationText({
      content: estimatedCompletionDate,
      contentKind: 'estimated completion date',
    }),
  });
  /** ------------- end accessible error and valid texts ------------- */

  /** ------------- input creator info objects ------------- */

  const requiredRepairsCheckboxCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo =
    {
      dataObjectArray: REQUIRED_REPAIRS_CHECKBOX_DATA,
      description: {
        selected: requiredRepairsSelectedText,
        deselected: requiredRepairsDeselectedText,
      },
      onChange: (event: string[]) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setRequiredRepairs,
          payload: event as RequiredRepairs[],
        });
      },
      label: 'Required Repairs',
      semanticName: 'required repairs',
      value: requiredRepairs,
      required: true,
      withAsterisk: true,
    };

  const partsNeededCheckboxCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo =
    {
      dataObjectArray: PARTS_NEEDED_CHECKBOX_DATA,
      description: {
        selected: partsNeededSelectedText,
        deselected: partsNeededDeselectedText,
      },
      onChange: (event: string[]) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setPartsNeeded,
          payload: event as PartsNeeded[],
        });
      },
      label: 'Parts Needed',
      semanticName: 'parts needed',
      value: partsNeeded,
      required: true,
      withAsterisk: true,
    };

  const textAreaWidth =
    width < 480 // for iPhone 5/SE
      ? 330
      : width < 768 // for iPhone 6/7/8
      ? width * 0.8 - 44
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225 - 44) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300 - 44) * 0.8
      : 900 - 74;

  const partsNeededModelsTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: partsNeededModelsInputErrorText,
        valid: partsNeededModelsInputValidText,
      },
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      label: 'Parts Needed Models',
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsPartsNeededModelsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setPartsNeededModels,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsPartsNeededModelsFocused,
          payload: true,
        });
      },
      placeholder: 'Enter models of parts needed',
      required: true,
      semanticName: 'parts needed models',
      textAreaWidth,
      withAsterisk: true,
    };

  const partUnderWarrantyCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      checked: partUnderWarranty,
      description: {
        selected: partUnderWarrantySelectedText,
        deselected: partUnderWarrantyDeselectedText,
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setPartUnderWarranty,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: 'part under warranty',
      label: 'Part Under Warranty',
      required: true,
    };

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;
  const currencyIcon =
    estimatedRepairCostCurrency === 'CNY' ? (
      <TbCurrencyRenminbi size={14} color={colors.gray[colorShade]} />
    ) : estimatedRepairCostCurrency === 'GBP' ? (
      <TbCurrencyPound size={14} color={colors.gray[colorShade]} />
    ) : estimatedRepairCostCurrency === 'EUR' ? (
      <TbCurrencyEuro size={14} color={colors.gray[colorShade]} />
    ) : estimatedRepairCostCurrency === 'JPY' ? (
      <TbCurrencyYen size={14} color={colors.gray[colorShade]} />
    ) : (
      <TbCurrencyDollar size={14} color={colors.gray[colorShade]} />
    );

  const estimatedRepairCostCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CURRENCY_DATA,
      description: 'Select the currency for estimated repair cost.',
      label: 'Estimated Repair Cost Currency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setEstimatedRepairCostCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: estimatedRepairCostCurrency,
      required: true,
      withAsterisk: true,
    };

  const estimatedRepairCostTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: estimatedRepairCostInputErrorText,
        valid: estimatedRepairCostInputValidText,
      },
      inputText: estimatedRepairCost,
      isValidInputText: isValidEstimatedRepairCost,
      label: 'Estimated Repair Cost',
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsEstimatedRepairCostFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setEstimatedRepairCost,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsEstimatedRepairCostFocused,
          payload: true,
        });
      },
      rightSection: true,
      rightSectionIcon: currencyIcon,
      placeholder: 'Enter estimated repair cost',
      semanticName: 'estimated repair cost',
      minLength: 3,
      maxLength: 9,
      required: true,
      withAsterisk: true,
    };

  const estimatedCompletionDateTextInputCreatorInfo: AccessibleDateTimeInputCreatorInfo =
    {
      description: {
        error: estimatedCompletionDateInputErrorText,
        valid: estimatedCompletionDateInputValidText,
      },
      inputText: estimatedCompletionDate,
      isValidInputText: isValidEstimatedCompletionDate,
      label: 'Estimated Completion Date',
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsEstimatedCompletionDateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setEstimatedCompletionDate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsEstimatedCompletionDateFocused,
          payload: true,
        });
      },
      placeholder: 'Enter estimated completion date',
      semanticName: 'estimated completion date',
      inputKind: 'date',
      dateKind: 'date near future',
      required: true,
      withAsterisk: true,
    };

  const repairPrioritySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: URGENCY_DATA,
      description: 'Select the urgency of the repair.',
      label: 'Repair Priority',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setRepairPriority,
          payload: event.currentTarget.value as Urgency,
        });
      },
      value: repairPriority,
      required: true,
      withAsterisk: true,
    };
  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs ------------- */

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
      partUnderWarrantyCheckboxInputCreatorInfo,
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
  /** ------------- end created inputs ------------- */

  /** ------------- display created inputs ------------- */
  const displayRepairNoteStepDetails = (
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
  /** ------------- end display created inputs ------------- */

  useEffect(() => {
    const fieldsOmittedState = filterFieldsFromObject({
      object: parentState,
      fieldsToFilter: ['createRepairNoteAction', 'createRepairNoteDispatch'],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: 'RepairNoteStepDetails',
    });
  }, [parentState]);

  return <>{displayRepairNoteStepDetails}</>;
}

export { RepairNoteStepDetail };
