import {
  faDollarSign,
  faEuro,
  faJpy,
  faPoundSign,
  faYen,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Flex, Text } from '@mantine/core';
import { ChangeEvent, useEffect, useMemo, useReducer } from 'react';

import { DATE_REGEX, MONEY_REGEX } from '../../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnDateValidationText,
  returnGrammarValidationText,
  returnMoneyValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  BENEFIT_PLAN_DATA,
  CREATE_BENEFIT_DESCRIPTION_OBJECTS,
  CREATE_BENEFIT_MAX_STEPPER_POSITION,
  CURRENCY_DATA,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
} from '../constants';
import {
  createBenefitAction,
  createBenefitReducer,
  initialCreateBenefitState,
} from './state';
import { BenefitsPlanKind, Currency } from './types';

function CreateBenefit() {
  const [createBenefitState, createBenefitDispatch] = useReducer(
    createBenefitReducer,
    initialCreateBenefitState
  );
  const {
    planName,
    isValidPlanName,
    isPlanNameFocused,

    planDescription,
    isValidPlanDescription,
    isPlanDescriptionFocused,

    planStartDate,
    isValidPlanStartDate,
    isPlanStartDateFocused,

    planKind,
    isPlanActive,
    currency,

    employerContribution,
    isValidEmployerContribution,
    isEmployerContributionFocused,

    employeeContribution,
    isValidEmployeeContribution,
    isEmployeeContributionFocused,

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createBenefitState;

  // validate planName input on every change
  useEffect(() => {
    const isValid = PLAN_NAME_REGEX.test(planName);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidPlanName,
      payload: isValid,
    });
  }, [planName]);

  // validate planDescription input on every change
  useEffect(() => {
    const isValid = PLAN_DESCRIPTION_REGEX.test(planDescription);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidPlanDescription,
      payload: isValid,
    });
  }, [planDescription]);

  // validate planStartDate input on every change
  useEffect(() => {
    const isValid = DATE_REGEX.test(planStartDate);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidPlanStartDate,
      payload: isValid,
    });
  }, [planStartDate]);

  // validate employeeContribution input on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(employeeContribution);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidEmployeeContribution,
      payload: isValid,
    });
  }, [employeeContribution]);

  // validate employerContribution input on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(employerContribution);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidEmployerContribution,
      payload: isValid,
    });
  }, [employerContribution]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (currency === 'EUR') {
      const employeeContributionWithCommaAndNoLeadingZero = employeeContribution
        .replace('.', ',')
        .replace(/^0+/, '');
      const employerContributionWithCommaAndNoLeadingZero = employerContribution
        .replace('.', ',')
        .replace(/^0+/, '');

      createBenefitDispatch({
        type: createBenefitAction.setEmployeeContribution,
        payload: employeeContributionWithCommaAndNoLeadingZero,
      });

      createBenefitDispatch({
        type: createBenefitAction.setEmployerContribution,
        payload: employerContributionWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const employeeContributionWithDecimalAndNoLeadingZero =
        employeeContribution.replace(',', '.').replace(/^0+/, '');
      const employerContributionWithDecimalAndNoLeadingZero =
        employerContribution.replace(',', '.').replace(/^0+/, '');

      createBenefitDispatch({
        type: createBenefitAction.setEmployeeContribution,
        payload: employeeContributionWithDecimalAndNoLeadingZero,
      });

      createBenefitDispatch({
        type: createBenefitAction.setEmployerContribution,
        payload: employerContributionWithDecimalAndNoLeadingZero,
      });
    }
  }, [currency, employeeContribution, employerContribution]);

  // memoized total contribution calculation based on currency
  const totalContribution = useMemo(() => {
    if (currency === 'EUR') {
      // replace comma with decimal
      const employeeContributionWithDecimal = employeeContribution.replace(
        ',',
        '.'
      );
      const employerContributionWithDecimal = employerContribution.replace(
        ',',
        '.'
      );
      // safety check
      if (
        isNaN(Number(employeeContributionWithDecimal)) ||
        isNaN(Number(employerContributionWithDecimal))
      ) {
        return '0.00';
      }

      const totalContribution =
        Number(employeeContributionWithDecimal) +
        Number(employerContributionWithDecimal);
      const totalContributionFixed = totalContribution.toFixed(2);
      const totalContributionWithComma = totalContributionFixed.replace(
        '.',
        ','
      );
      return totalContributionWithComma;
    } else {
      // safety check
      if (
        isNaN(Number(employeeContribution)) ||
        isNaN(Number(employerContribution))
      ) {
        return '0.00';
      }

      const totalContribution =
        Number(employeeContribution) + Number(employerContribution);
      return totalContribution.toFixed(2);
    }
  }, [currency, employeeContribution, employerContribution]);

  // update stepper state if any input in the current step is invalid
  useEffect(() => {
    const areRequiredInputsInError = !isValidPlanName || !isValidPlanStartDate;
    const isOptionalInputInError =
      !isValidPlanDescription && planDescription !== '';

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    createBenefitDispatch({
      type: createBenefitAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isValidPlanName,
    isValidPlanDescription,
    isValidPlanStartDate,
    planDescription,
  ]);

  // update stepper state if any input in the current step is invalid
  useEffect(() => {
    const isStepInError =
      !isValidEmployeeContribution || !isValidEmployerContribution;

    createBenefitDispatch({
      type: createBenefitAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [isValidEmployeeContribution, isValidEmployerContribution]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [planNameInputErrorText, planNameInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'plan name',
      inputText: planName,
      isValidInputText: isValidPlanName,
      isInputTextFocused: isPlanNameFocused,
      regexValidationText: returnGrammarValidationText({
        content: planName,
        contentKind: 'plan name input',
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [planDescriptionInputErrorText, planDescriptionInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'plan description',
      inputText: planDescription,
      isValidInputText: isValidPlanDescription,
      isInputTextFocused: isPlanDescriptionFocused,
      regexValidationText: returnGrammarValidationText({
        content: planDescription,
        contentKind: 'plan description input',
        minLength: 1,
        maxLength: 300,
      }),
    });

  const [planStartDateInputErrorText, planStartDateInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'plan start date',
      inputText: planStartDate,
      isValidInputText: isValidPlanStartDate,
      isInputTextFocused: isPlanStartDateFocused,
      regexValidationText: returnDateValidationText(planStartDate),
    });

  const [
    employeeContributionInputErrorText,
    employeeContributionInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'employee contribution',
    inputText: employeeContribution,
    isValidInputText: isValidEmployeeContribution,
    isInputTextFocused: isEmployeeContributionFocused,
    regexValidationText: returnMoneyValidationText({
      money: employeeContribution,
      kind: 'employee contribution',
    }),
  });

  const [
    employerContributionInputErrorText,
    employerContributionInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'employer contribution',
    inputText: employerContribution,
    isValidInputText: isValidEmployerContribution,
    isInputTextFocused: isEmployerContributionFocused,
    regexValidationText: returnMoneyValidationText({
      money: employerContribution,
      kind: 'employer contribution',
    }),
  });

  const [planActiveInputSelectedText, planActiveInputDeselectedText] =
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: isPlanActive,
      semanticName: 'active status',
      selectedDescription: 'plan is active',
      deselectedDescription: 'plan is inactive',
    });

  // following are info objects for input creators
  const planNameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: planNameInputErrorText,
      valid: planNameInputValidText,
    },
    inputText: planName,
    isValidInputText: isValidPlanName,
    label: 'Plan name',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanNameFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setPlanName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanNameFocused,
        payload: true,
      });
    },
    placeholder: 'Enter plan name',
    semanticName: 'plan name',
    minLength: 1,
    maxLength: 50,
    required: true,
    withAsterisk: true,
  };

  const planDescriptionInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: planDescriptionInputErrorText,
      valid: planDescriptionInputValidText,
    },
    inputText: planDescription,
    isValidInputText: isValidPlanDescription,
    label: 'Plan description',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setPlanDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanDescriptionFocused,
        payload: true,
      });
    },
    placeholder: 'Enter plan description',
    semanticName: 'plan description',
    minLength: 1,
    maxLength: 300,
  };

  const planStartDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: planStartDateInputErrorText,
      valid: planStartDateInputValidText,
    },
    inputText: planStartDate,
    isValidInputText: isValidPlanStartDate,
    label: 'Plan start date',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setPlanStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanStartDateFocused,
        payload: true,
      });
    },
    placeholder: 'Enter plan start date',
    semanticName: 'plan start date',
    required: true,
    withAsterisk: true,
    inputKind: 'date',
    dateKind: 'full date',
  };

  const planKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: 'Select plan kind',
    data: BENEFIT_PLAN_DATA,
    label: 'Plan kind',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setPlanKind,
        payload: event.currentTarget.value as BenefitsPlanKind,
      });
    },
    value: planKind,
    required: true,
    withAsterisk: true,
  };

  const currencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: 'Select currency',
    data: CURRENCY_DATA,
    label: 'Currency',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setCurrency,
        payload: event.currentTarget.value as Currency,
      });
    },
    value: currency,
    required: true,
    withAsterisk: true,
  };

  const currencyIcon =
    currency === 'CNY'
      ? faYen
      : currency === 'GBP'
      ? faPoundSign
      : currency === 'EUR'
      ? faEuro
      : currency === 'JPY'
      ? faJpy
      : faDollarSign;

  const employeeContributionInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: employeeContributionInputErrorText,
      valid: employeeContributionInputValidText,
    },
    inputText: employeeContribution,
    isValidInputText: isValidEmployeeContribution,
    label: 'Employee contribution',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsEmployeeContributionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setEmployeeContribution,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsEmployeeContributionFocused,
        payload: true,
      });
    },
    rightSection: true,
    rightSectionIcon: currencyIcon,
    placeholder: 'Enter employee contribution',
    semanticName: 'employee contribution',
    minLength: 4,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const employerContributionInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: employerContributionInputErrorText,
      valid: employerContributionInputValidText,
    },
    inputText: employerContribution,
    isValidInputText: isValidEmployerContribution,
    label: 'Employer contribution',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsEmployerContributionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setEmployerContribution,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsEmployerContributionFocused,
        payload: true,
      });
    },
    rightSection: true,
    rightSectionIcon: currencyIcon,
    placeholder: 'Enter employer contribution',
    semanticName: 'employer contribution',
    minLength: 4,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const planStatusCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: planActiveInputSelectedText,
        deselected: planActiveInputDeselectedText,
      },
      label: 'Plan status',
      checked: isPlanActive,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createBenefitDispatch({
          type: createBenefitAction.setIsPlanActive,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: 'active status',
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create benefit form submit button',
    semanticName: 'submit button',
    buttonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [
    createdPlanNameTextInput,
    createdEmployeeContributionTextInput,
    createdEmployerContributionText,
  ] = returnAccessibleTextInputElements([
    planNameInputCreatorInfo,
    employeeContributionInputCreatorInfo,
    employerContributionInputCreatorInfo,
  ]);

  const [createdPlanStartDateInput] = returnAccessibleDateTimeElements([
    planStartDateInputCreatorInfo,
  ]);

  const [createdPlanDescriptionTextAreaInput] =
    returnAccessibleTextAreaInputElements([planDescriptionInputCreatorInfo]);

  const [createdPlanKindSelectInput, createdCurrencySelectInput] =
    returnAccessibleSelectInputElements([
      planKindSelectInputCreatorInfo,
      currencySelectInputCreatorInfo,
    ]);

  const [createdPlanStatusCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      planStatusCheckboxInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_BENEFIT_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayPlanDetailsFormPage = (
    <FormLayoutWrapper>
      {createdPlanNameTextInput}
      {createdPlanDescriptionTextAreaInput}
      {createdPlanStartDateInput}
      {createdPlanKindSelectInput}
    </FormLayoutWrapper>
  );

  const currencySymbol =
    currency === 'CNY'
      ? '¥'
      : currency === 'GBP'
      ? '£'
      : currency === 'EUR'
      ? '€'
      : currency === 'JPY'
      ? '¥'
      : '$';

  const displayTotalContributions = (
    <Flex w="100%" justify="space-between" align="center">
      <Text size="sm" color="dark">
        Total contribution
      </Text>
      <Flex justify="space-between" align="center" columnGap="xs">
        <Text size="sm">{currencySymbol}</Text>
        <Text size="sm" color="dark">
          {totalContribution}
        </Text>
      </Flex>
    </Flex>
  );

  const displayPlanContributionsFormPage = (
    <FormLayoutWrapper>
      {createdCurrencySelectInput}
      {createdEmployeeContributionTextInput}
      {createdEmployerContributionText}
      {createdPlanStatusCheckboxInput}
      {displayTotalContributions}
    </FormLayoutWrapper>
  );

  const displayReviewPage = <h4>review page</h4>;

  const displayCreateBenefitForm =
    currentStepperPosition === 0
      ? displayPlanDetailsFormPage
      : currentStepperPosition === 1
      ? displayPlanContributionsFormPage
      : currentStepperPosition === 2
      ? displayReviewPage
      : displaySubmitButton;

  const displayCreateBenefitComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_BENEFIT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_BENEFIT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createBenefitDispatch}
      setCurrentStepperPosition={createBenefitAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displayCreateBenefitForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function createBenefitFormSubmit() {
      console.log('create benefit form submit');
    }

    if (triggerFormSubmit) {
      createBenefitFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displayCreateBenefitComponent}</>;
}

export { CreateBenefit };

/**
 * <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Plan name"
        placeholder="Enter plan name"
        value={planName}
        aria-required
        aria-describedby={
          isValidPlanName
            ? 'plan-name-input-note-valid'
            : 'plan-name-input-note-error'
        }
        description={
          isValidPlanName ? planNameInputValidText : planNameInputErrorText
        }
        aria-invalid={isValidPlanName ? 'false' : 'true'}
        icon={
          isValidPlanName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPlanName && planName !== ''}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setPlanName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanNameFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={50}
        required
        withAsterisk
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Plan description"
        placeholder="Enter plan description"
        value={planDescription}
        aria-required
        aria-describedby={
          isValidPlanDescription
            ? 'plan-description-input-note-valid'
            : 'plan-description-input-note-error'
        }
        description={
          isValidPlanDescription
            ? planDescriptionInputValidText
            : planDescriptionInputErrorText
        }
        aria-invalid={isValidPlanDescription ? 'false' : 'true'}
        icon={
          isValidPlanDescription ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPlanDescription && planDescription !== ''}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setPlanDescription,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanDescriptionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanDescriptionFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={300}
        autosize
        minRows={3}
        maxRows={5}
        required
        withAsterisk
      />

      <NativeSelect
        size="sm"
        data={BENEFIT_PLAN_DATA}
        label="Benefit plan kind"
        value={planKind}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setPlanKind,
            payload: event.currentTarget.value as BenefitsPlanKind,
          });
        }}
        withAsterisk
        required
      />

      <Checkbox
        size="sm"
        color="dark"
        label="Status"
        aria-label={isPlanActive ? 'Plan is active' : 'Plan is inactive'}
        description={isPlanActive ? 'Plan is active' : 'Plan is inactive'}
        checked={isPlanActive}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanActive,
            payload: event.currentTarget.checked,
          });
        }}
      />

      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Plan start date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter start date of plan in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidPlanStartDate
            ? 'plan-start-date-input-note-valid'
            : 'plan-start-date-input-note-error'
        }
        aria-invalid={isValidPlanStartDate ? false : true}
        value={planStartDate}
        icon={
          isValidPlanStartDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPlanStartDate && planStartDate !== ''}
        description={
          isValidPlanStartDate
            ? planStartDateInputValidText
            : planStartDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setPlanStartDate,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanStartDateFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsPlanStartDateFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      <NativeSelect
        size="sm"
        data={CURRENCY_DATA}
        label="Currency"
        description="Select currency of plan."
        value={currency}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setCurrency,
            payload: event.currentTarget.value as Currency,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Employee contribution"
        placeholder="Enter employee contribution"
        value={employeeContribution}
        aria-required
        aria-describedby={
          isValidEmployeeContribution
            ? 'employee-contribution-input-note-valid'
            : 'employee-contribution-input-note-error'
        }
        description={
          isValidEmployeeContribution
            ? employeeContributionInputValidText
            : employeeContributionInputErrorText
        }
        aria-invalid={isValidEmployeeContribution ? 'false' : 'true'}
        icon={
          isValidEmployeeContribution ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        rightSection={currencyIcon}
        error={!isValidEmployeeContribution && employeeContribution !== ''}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setEmployeeContribution,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsEmployeeContributionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsEmployeeContributionFocused,
            payload: false,
          });
        }}
        required
        withAsterisk
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Employer contribution"
        placeholder="Enter employer contribution"
        value={employerContribution}
        aria-required
        aria-describedby={
          isValidEmployerContribution
            ? 'employer-contribution-input-note-valid'
            : 'employer-contribution-input-note-error'
        }
        description={
          isValidEmployerContribution
            ? employerContributionInputValidText
            : employerContributionInputErrorText
        }
        aria-invalid={isValidEmployerContribution ? 'false' : 'true'}
        icon={
          isValidEmployerContribution ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        rightSection={currencyIcon}
        error={!isValidEmployerContribution && employerContribution !== ''}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setEmployerContribution,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsEmployerContributionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createBenefitDispatch({
            type: createBenefitAction.setIsEmployerContributionFocused,
            payload: false,
          });
        }}
        required
        withAsterisk
      />

      <Flex w="100%" justify="space-between" align="center">
        <Text size="sm" color="dark">
          Total contribution
        </Text>
        <Flex justify="space-between" align="center" columnGap="sm">
          {currencyIcon}
          <Text size="sm" color="dark">
            {totalContribution}
          </Text>
        </Flex>
      </Flex>

      <Button
        size="sm"
        variant="filled"
        disabled={
          !isValidPlanName ||
          !isValidPlanStartDate ||
          !isValidEmployeeContribution ||
          !isValidEmployerContribution
        }
        type="button"
      >
        Submit
      </Button>
 */
