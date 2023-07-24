import { ChangeEvent, useEffect } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  MONEY_REGEX,
  NOTE_TEXT_REGEX,
} from '../../../../constants/regex';
import {
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
} from '../../../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnNoteTextValidationText,
  returnNumberAmountValidationText,
} from '../../../../utils';
import { RepairNoteStepDetailsProps } from './types';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../../wrappers';
import {
  PARTS_NEEDED_CHECKBOX_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
} from '../../constants';
import { PartsNeeded, RequiredRepairs } from '../../types';
import {
  faYen,
  faPoundSign,
  faEuro,
  faJpy,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { CURRENCY_DATA } from '../../../benefits/constants';
import { Currency, Urgency } from '../../../../types';
import { URGENCY_DATA } from '../../../../constants/data';

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

  /** ------------- input validation ------------- */
  // validate partsNeededModels on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(partsNeededModels);

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
        .replace(/^0+/, '');

      createRepairNoteDispatch({
        type: createRepairNoteAction.setEstimatedRepairCost,
        payload: estimatedRepairCostWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const estimatedRepairCostWithDecimalAndNoLeadingZero = estimatedRepairCost
        .replace(',', '.')
        .replace(/^0+/, '');

      createRepairNoteDispatch({
        type: createRepairNoteAction.setEstimatedRepairCost,
        payload: estimatedRepairCostWithDecimalAndNoLeadingZero,
      });
    }
  });

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

  // const [partNameInputErrorText, partNameInputValidText] =
  //   returnAccessibleErrorValidTextElements({
  //     inputElementKind: 'part name',
  //     inputText: partName,
  //     isValidInputText: isValidPartName,
  //     isInputTextFocused: isPartNameFocused,
  //     regexValidationText: returnNoteTextValidationText({
  //       content: partName,
  //       contentKind: 'part name',
  //       minLength: 2,
  //       maxLength: 75,
  //     }),
  //   });

  const [requiredRepairsSelectedText, requiredRepairsDeselectedText] =
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: requiredRepairs.length > 0,
      semanticName: 'required repairs',
      deselectedDescription: 'No required repairs selected. Nothing to repair!',
      selectedDescription: `Required repairs selected: ${requiredRepairs.join(
        ', '
      )}`,
    });

  const [partsNeededSelectedText, partsNeededDeselectedText] =
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: partsNeeded.length > 0,
      semanticName: 'parts needed',
      deselectedDescription: 'No parts needed selected. Nothing to do!',
      selectedDescription: `Parts needed selected: ${partsNeeded.join(', ')}`,
    });

  const [partsNeededModelsInputErrorText, partsNeededModelsInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'parts needed models',
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      isInputTextFocused: isPartsNeededModelsFocused,
      regexValidationText: returnNoteTextValidationText({
        content: partsNeededModels,
        contentKind: 'parts needed models',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [partUnderWarrantySelectedText, partUnderWarrantyDeselectedText] =
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: partUnderWarranty,
      semanticName: 'part under warranty',
      deselectedDescription: 'Part is not under warranty',
      selectedDescription: 'Part is under warranty',
    });

  const [estimatedRepairCostInputErrorText, estimatedRepairCostInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'estimated repair cost',
      inputText: estimatedRepairCost,
      isValidInputText: isValidEstimatedRepairCost,
      isInputTextFocused: isEstimatedRepairCostFocused,
      regexValidationText: returnNumberAmountValidationText({
        kind: 'estimated repair cost',
        amount: estimatedRepairCost,
      }),
    });

  const [
    estimatedCompletionDateInputErrorText,
    estimatedCompletionDateInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'estimated completion date',
    inputText: estimatedCompletionDate,
    isValidInputText: isValidEstimatedCompletionDate,
    isInputTextFocused: isEstimatedCompletionDateFocused,
    regexValidationText: returnDateNearFutureValidationText(
      estimatedCompletionDate
    ),
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
      label: 'Required repairs',
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
      label: 'Parts needed',
      semanticName: 'parts needed',
      value: partsNeeded,
      required: true,
      withAsterisk: true,
    };

  const partsNeededModelsTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: partsNeededModelsInputErrorText,
        valid: partsNeededModelsInputValidText,
      },
      inputText: partsNeededModels,
      isValidInputText: isValidPartsNeededModels,
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsPartsNeededModelsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      semanticName: 'parts needed models',
      required: true,
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
      required: true,
    };

  const currencyIcon =
    estimatedRepairCostCurrency === 'CNY'
      ? faYen
      : estimatedRepairCostCurrency === 'GBP'
      ? faPoundSign
      : estimatedRepairCostCurrency === 'EUR'
      ? faEuro
      : estimatedRepairCostCurrency === 'JPY'
      ? faJpy
      : faDollarSign;

  const estimatedRepairCostCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CURRENCY_DATA,
      description: 'Select the currency for estimated repair cost.',
      label: 'Estimated repair cost currency',
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
      label: 'Estimated repair cost',
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
      label: 'Estimated completion date',
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
      label: 'Repair priority',
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

  return <></>;
}

export { RepairNoteStepDetail };
