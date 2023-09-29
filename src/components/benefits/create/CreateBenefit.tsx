import { Group, Text, Title, Tooltip } from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
  TbCurrencyRenminbi,
  TbCurrencyYen,
  TbUpload,
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../constants/data';
import {
  DATE_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { ResourceRequestServerResponse } from '../../../types';
import {
  returnDateValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
  returnThemeColors,
  returnUsernameRegexValidationText,
  urlBuilder,
} from '../../../utils';
import { NotificationModal } from '../../notificationModal';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
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
import { BenefitsDocument, BenefitsPlanKind, Currency } from './types';
import { useDisclosure } from '@mantine/hooks';

function CreateBenefit() {
  const [createBenefitState, createBenefitDispatch] = useReducer(
    createBenefitReducer,
    initialCreateBenefitState
  );
  const {
    benefitUsername,
    isValidBenefitUsername,
    isBenefitUsernameFocused,

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

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createBenefitState;

  const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function createBenefitFormSubmit() {
      createBenefitDispatch({
        type: createBenefitAction.setIsSubmitting,
        payload: true,
      });
      createBenefitDispatch({
        type: createBenefitAction.setSubmitMessage,
        payload: 'Submitting new benefit to be created...',
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: 'actions/company/benefit',
      });

      const body = JSON.stringify({
        benefit: {
          username: benefitUsername,
          planName,
          planDescription,
          planKind,
          planStartDate,
          isPlanActive,
          currency,
          monthlyPremium: employeeContribution + employerContribution,
          employeeContribution,
          employerContribution,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ResourceRequestServerResponse<BenefitsDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createBenefitDispatch({
          type: createBenefitAction.setIsSuccessful,
          payload: true,
        });
        createBenefitDispatch({
          type: createBenefitAction.setSuccessMessage,
          payload: data.message ?? 'Benefit successfully created!',
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          createBenefitDispatch({
            type: createBenefitAction.setIsSubmitting,
            payload: false,
          });
          createBenefitDispatch({
            type: createBenefitAction.setSubmitMessage,
            payload: '',
          });
          createBenefitDispatch({
            type: createBenefitAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }

      console.log('create benefit form submit');
    }

    if (triggerFormSubmit) {
      createBenefitFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only run when triggerFormSubmit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate benefitUsername input on every change
  useEffect(() => {
    const isValid = USERNAME_REGEX.test(benefitUsername);

    createBenefitDispatch({
      type: createBenefitAction.setIsValidBenefitUsername,
      payload: isValid,
    });
  }, [benefitUsername]);

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
        .replace(/^0+(?=\d)/, ''); // removes leading zeros if amount !== '0.00'
      const employerContributionWithCommaAndNoLeadingZero = employerContribution
        .replace('.', ',')
        .replace(/^0+(?=\d)/, '');

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
        employeeContribution.replace(',', '.').replace(/^0+(?=\d)/, '');
      const employerContributionWithDecimalAndNoLeadingZero =
        employerContribution.replace(',', '.').replace(/^0+(?=\d)/, '');

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
    const areRequiredInputsInError =
      !isValidBenefitUsername || !isValidPlanName || !isValidPlanStartDate;
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
    isValidBenefitUsername,
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
        step: 1,
      },
    });
  }, [isValidEmployeeContribution, isValidEmployerContribution]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [benefitUsernameInputErrorText, benefitUsernameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'benefit username',
      inputText: benefitUsername,
      isValidInputText: isValidBenefitUsername,
      isInputTextFocused: isBenefitUsernameFocused,
      regexValidationText: returnUsernameRegexValidationText({
        content: benefitUsername,
        contentKind: 'benefit username input',
      }),
    });

  const [planNameInputErrorText, planNameInputValidText] =
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'plan start date',
      inputText: planStartDate,
      isValidInputText: isValidPlanStartDate,
      isInputTextFocused: isPlanStartDateFocused,
      regexValidationText: returnDateValidationText({
        content: planStartDate,
        contentKind: 'plan start date input',
      }),
    });

  const [
    employeeContributionInputErrorText,
    employeeContributionInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'employee contribution',
    inputText: employeeContribution,
    isValidInputText: isValidEmployeeContribution,
    isInputTextFocused: isEmployeeContributionFocused,
    regexValidationText: returnNumberAmountValidationText({
      content: employeeContribution,
      contentKind: 'employee contribution input',
    }),
  });

  const [
    employerContributionInputErrorText,
    employerContributionInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'employer contribution',
    inputText: employerContribution,
    isValidInputText: isValidEmployerContribution,
    isInputTextFocused: isEmployerContributionFocused,
    regexValidationText: returnNumberAmountValidationText({
      content: employerContribution,
      contentKind: 'employer contribution input',
    }),
  });

  const [planActiveInputSelectedText, planActiveInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isPlanActive,
      semanticName: 'active status',
      selectedDescription: 'Plan is active',
      deselectedDescription: 'Plan is inactive',
    });

  // following are info objects for input creators
  const benefitUsernameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: benefitUsernameInputErrorText,
      valid: benefitUsernameInputValidText,
    },
    inputText: benefitUsername,
    isValidInputText: isValidBenefitUsername,
    label: 'Benefit Username',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsBenefitUsernameFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setBenefitUsername,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsBenefitUsernameFocused,
        payload: true,
      });
    },
    placeholder: 'Enter username',
    semanticName: 'benefit username',
    minLength: 3,
    maxLength: 20,
    required: true,
    withAsterisk: true,
  };

  const planNameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: planNameInputErrorText,
      valid: planNameInputValidText,
    },
    inputText: planName,
    isValidInputText: isValidPlanName,
    label: 'Plan Name',
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
    label: 'Plan Description',
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
    label: 'Plan Start Date',
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
    label: 'Plan Kind',
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

  const {
    generalColors: { grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });
  const currencyIcon =
    currency === 'CNY' ? (
      <TbCurrencyRenminbi size={14} color={grayColorShade} />
    ) : currency === 'GBP' ? (
      <TbCurrencyPound size={14} color={grayColorShade} />
    ) : currency === 'EUR' ? (
      <TbCurrencyEuro size={14} color={grayColorShade} />
    ) : currency === 'JPY' ? (
      <TbCurrencyYen size={14} color={grayColorShade} />
    ) : (
      <TbCurrencyDollar size={14} color={grayColorShade} />
    );

  const employeeContributionInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: employeeContributionInputErrorText,
      valid: employeeContributionInputValidText,
    },
    inputText: employeeContribution,
    isValidInputText: isValidEmployeeContribution,
    label: 'Employee Contribution',
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
    label: 'Employer Contribution',
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
      label: 'Plan Status',
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
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [
    createdBenefitUsernameTextInput,
    createdPlanNameTextInput,
    createdEmployeeContributionTextInput,
    createdEmployerContributionText,
  ] = returnAccessibleTextInputElements([
    benefitUsernameInputCreatorInfo,
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
    currentStepperPosition === CREATE_BENEFIT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form'
            : 'Submit Benefit form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayPlanDetailsFormPage = (
    <FormLayoutWrapper>
      {createdBenefitUsernameTextInput}
      {createdPlanNameTextInput}
      {createdPlanDescriptionTextAreaInput}
      {createdPlanStartDateInput}
      {createdPlanKindSelectInput}
    </FormLayoutWrapper>
  );

  const currencySymbol =
    currency === 'CNY'
      ? '元'
      : currency === 'GBP'
      ? '£'
      : currency === 'EUR'
      ? '€'
      : currency === 'JPY'
      ? '¥'
      : '$';

  const displayTotalContributions = (
    <Group position="right" w="100%">
      <Text>Total contribution</Text>
      <Group spacing="lg">
        <Text>{currencySymbol}</Text>
        <Text>{totalContribution}</Text>
      </Group>
    </Group>
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

  const CREATE_BENEFIT_REVIEW_OBJECT: FormReviewObject = {
    'Plan Details': [
      {
        inputName: 'Benefit Username',
        inputValue: benefitUsername,
        isInputValueValid: isValidBenefitUsername,
      },
      {
        inputName: 'Plan Name',
        inputValue: planName,
        isInputValueValid: isValidPlanName,
      },
      {
        inputName: 'Plan Description',
        inputValue: planDescription,
        isInputValueValid: isValidPlanDescription,
      },
      {
        inputName: 'Plan Start Date',
        inputValue: planStartDate,
        isInputValueValid: isValidPlanStartDate,
      },
      {
        inputName: 'Plan Kind',
        inputValue: planKind,
        isInputValueValid: planKind.length > 0,
      },
    ],
    'Plan Contributions': [
      {
        inputName: 'Currency',
        inputValue: currency,
        isInputValueValid: true,
      },
      {
        inputName: 'Employee Contribution',
        inputValue: employeeContribution,
        isInputValueValid: isValidEmployeeContribution,
      },
      {
        inputName: 'Employer Contribution',
        inputValue: employerContribution,
        isInputValueValid: isValidEmployerContribution,
      },
      {
        inputName: 'Plan Status',
        inputValue: isPlanActive ? 'Active' : 'Inactive',
        isInputValueValid: true,
      },
    ],
  };

  const displayReviewPage = (
    <FormReviewPage
      formReviewObject={CREATE_BENEFIT_REVIEW_OBJECT}
      formName="Create Benefit"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/company/benefit/display');
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

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
      childrenTitle="Create Benefit"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_BENEFIT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_BENEFIT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createBenefitDispatch}
      setCurrentStepperPosition={createBenefitAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateBenefitForm}
    </StepperWrapper>
  );

  return displayCreateBenefitComponent;
}

export default CreateBenefit;
