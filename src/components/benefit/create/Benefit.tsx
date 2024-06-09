import { Container, Group, Stack, Text } from "@mantine/core";
import { MouseEvent, useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  BENEFIT_PLAN_DATA,
  BENEFIT_ROLE_PATHS,
  returnBenefitStepperPages,
} from "../constants";
import { BenefitAction, benefitAction } from "./actions";
import { benefitReducer } from "./reducers";
import { initialBenefitState } from "./state";
import { BenefitsPlanKind, BenefitsSchema } from "./types";
import { CURRENCY_DATA } from "../../../constants/data";

function Benefit() {
  const [benefitState, benefitDispatch] = useReducer(benefitReducer, initialBenefitState);

  const {
    planName,
    planDescription,
    planStartDate,
    planKind,
    isPlanActive,
    currency,
    employerContribution,
    employeeContribution,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = benefitState;

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    if (triggerFormSubmit) {
      const benefitsSchema: BenefitsSchema = {
        currency,
        employeeContribution: parseFloat(employeeContribution),
        employerContribution: parseFloat(employerContribution),
        isPlanActive,
        monthlyPremium:
          parseFloat(employeeContribution) + parseFloat(employerContribution),
        planDescription,
        planKind,
        planName,
        planStartDate,
        requestStatus: "pending",
        userId,
        username,
      };

      formSubmitPOST({
        dispatch: benefitDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: benefitAction.setIsSubmitting,
        isSuccessfulAction: benefitAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: BENEFIT_ROLE_PATHS,
        schema: benefitsSchema,
        schemaName: "benefitSchema",
        sessionId,
        showBoundary,
        userId,
        username,
        userRole: "manager",
      });
    }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    logState({
      state: benefitState,
      groupLabel: "Create Benefit State",
    });
  }, [benefitState]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting benefit! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Benefit submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const BENEFIT_STEPPER_PAGES: StepperPage[] = returnBenefitStepperPages();

  const currencySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CURRENCY_DATA,
        name: "currency",
        parentDispatch: benefitDispatch,
        value: currency,
        validValueAction: benefitAction.setCurrency,
      }}
    />
  );

  const employeeContributionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: benefitAction.setPageInError,
        name: "employeeContribution",
        parentDispatch: benefitDispatch,
        stepperPages: BENEFIT_STEPPER_PAGES,
        validValueAction: benefitAction.setEmployeeContribution,
        value: employeeContribution,
      }}
    />
  );

  const employerContributionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: benefitAction.setPageInError,
        name: "employerContribution",
        parentDispatch: benefitDispatch,
        stepperPages: BENEFIT_STEPPER_PAGES,
        validValueAction: benefitAction.setEmployerContribution,
        value: employerContribution,
      }}
    />
  );

  const isPlanActiveCheckbox = (
    <AccessibleSwitchInput
      attributes={{
        checked: isPlanActive,
        invalidValueAction: benefitAction.setPageInError,
        name: "isPlanActive",
        offLabel: "Inactive",
        onLabel: "Active",
        parentDispatch: benefitDispatch,
        preventErrorStateWhenOff: true,
        validValueAction: benefitAction.setIsPlanActive,
        value: isPlanActive.toString(),
      }}
    />
  );

  const planDescriptionTextArea = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: benefitAction.setPageInError,
        name: "planDescription",
        parentDispatch: benefitDispatch,
        stepperPages: BENEFIT_STEPPER_PAGES,
        validValueAction: benefitAction.setPlanDescription,
        value: planDescription,
      }}
    />
  );

  const planKindSelectInput = (
    <AccessibleSelectInput<BenefitAction["setPlanKind"], BenefitsPlanKind>
      attributes={{
        data: BENEFIT_PLAN_DATA,
        name: "planKind",
        parentDispatch: benefitDispatch,
        value: planKind,
        validValueAction: benefitAction.setPlanKind,
      }}
    />
  );

  const planNameTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: benefitAction.setPageInError,
        name: "planName",
        parentDispatch: benefitDispatch,
        stepperPages: BENEFIT_STEPPER_PAGES,
        validValueAction: benefitAction.setPlanName,
        value: planName,
      }}
    />
  );

  const planStartDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "full date",
        inputKind: "date",
        invalidValueAction: benefitAction.setPageInError,
        name: "planStartDate",
        parentDispatch: benefitDispatch,
        stepperPages: BENEFIT_STEPPER_PAGES,
        validValueAction: benefitAction.setPlanStartDate,
        value: planStartDate,
      }}
    />
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: MouseEvent<HTMLButtonElement>) => {
          benefitDispatch({
            action: benefitAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const benefitForm = (
    <Group>
      {planNameTextInput}
      {planDescriptionTextArea}
      {planStartDateInput}
      {planKindSelectInput}
    </Group>
  );

  const benefitContributionsForm = (
    <Group>
      {currencySelectInput}
      {employeeContributionTextInput}
      {employerContributionTextInput}
      {isPlanActiveCheckbox}
    </Group>
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: benefitState,
        pageElements: [benefitForm, benefitContributionsForm],
        stepperPages: BENEFIT_STEPPER_PAGES,
        submitButton,
        title: "Create Benefit",
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default Benefit;

/**
 * const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function benefitFormSubmit() {
      benefitDispatch({
        type: benefitAction.setIsSubmitting,
        payload: true,
      });
      benefitDispatch({
        type: benefitAction.setSubmitMessage,
        payload: "Submitting new benefit to be created...",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/company/benefit",
      });

      const body = JSON.stringify({
        benefitSchema: {
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

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: abortControllerRef.current?.signal,
          url,
        });

        const data: ResourceRequestServerResponse<BenefitsDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        benefitDispatch({
          type: benefitAction.setIsSuccessful,
          payload: true,
        });
        benefitDispatch({
          type: benefitAction.setSuccessMessage,
          payload: data.message ?? "Benefit successfully created!",
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          benefitDispatch({
            type: benefitAction.setIsSubmitting,
            payload: false,
          });
          benefitDispatch({
            type: benefitAction.setSubmitMessage,
            payload: "",
          });
          benefitDispatch({
            type: benefitAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      benefitFormSubmit();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate benefitUsername input on every change
  useEffect(() => {
    const isValid = USERNAME_REGEX.test(benefitUsername);

    benefitDispatch({
      type: benefitAction.setIsValidBenefitUsername,
      payload: isValid,
    });
  }, [benefitUsername]);

  // validate planName input on every change
  useEffect(() => {
    const isValid = PLAN_NAME_REGEX.test(planName);

    benefitDispatch({
      type: benefitAction.setIsValidPlanName,
      payload: isValid,
    });
  }, [planName]);

  // validate planDescription input on every change
  useEffect(() => {
    const isValid = PLAN_DESCRIPTION_REGEX.test(planDescription);

    benefitDispatch({
      type: benefitAction.setIsValidPlanDescription,
      payload: isValid,
    });
  }, [planDescription]);

  // validate planStartDate input on every change
  useEffect(() => {
    const isValid = DATE_REGEX.test(planStartDate);

    benefitDispatch({
      type: benefitAction.setIsValidPlanStartDate,
      payload: isValid,
    });
  }, [planStartDate]);

  // validate employeeContribution input on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(employeeContribution);

    benefitDispatch({
      type: benefitAction.setIsValidEmployeeContribution,
      payload: isValid,
    });
  }, [employeeContribution]);

  // validate employerContribution input on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(employerContribution);

    benefitDispatch({
      type: benefitAction.setIsValidEmployerContribution,
      payload: isValid,
    });
  }, [employerContribution]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (currency === "EUR") {
      const employeeContributionWithCommaAndNoLeadingZero = employeeContribution
        .replace(".", ",")
        .replace(/^0+(?=\d)/, ""); // removes leading zeros if amount !== '0.00'
      const employerContributionWithCommaAndNoLeadingZero = employerContribution
        .replace(".", ",")
        .replace(/^0+(?=\d)/, "");

      benefitDispatch({
        type: benefitAction.setEmployeeContribution,
        payload: employeeContributionWithCommaAndNoLeadingZero,
      });

      benefitDispatch({
        type: benefitAction.setEmployerContribution,
        payload: employerContributionWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const employeeContributionWithDecimalAndNoLeadingZero = employeeContribution
        .replace(",", ".")
        .replace(/^0+(?=\d)/, "");
      const employerContributionWithDecimalAndNoLeadingZero = employerContribution
        .replace(",", ".")
        .replace(/^0+(?=\d)/, "");

      benefitDispatch({
        type: benefitAction.setEmployeeContribution,
        payload: employeeContributionWithDecimalAndNoLeadingZero,
      });

      benefitDispatch({
        type: benefitAction.setEmployerContribution,
        payload: employerContributionWithDecimalAndNoLeadingZero,
      });
    }
  }, [currency, employeeContribution, employerContribution]);

  // memoized total contribution calculation based on currency
  const totalContribution = useMemo(() => {
    if (currency === "EUR") {
      // replace comma with decimal
      const employeeContributionWithDecimal = employeeContribution.replace(",", ".");
      const employerContributionWithDecimal = employerContribution.replace(",", ".");
      // safety check
      if (
        isNaN(Number(employeeContributionWithDecimal)) ||
        isNaN(Number(employerContributionWithDecimal))
      ) {
        return "0.00";
      }

      const totalContribution =
        Number(employeeContributionWithDecimal) + Number(employerContributionWithDecimal);
      const totalContributionFixed = totalContribution.toFixed(2);
      const totalContributionWithComma = totalContributionFixed.replace(".", ",");
      return totalContributionWithComma;
    } else {
      // safety check
      if (isNaN(Number(employeeContribution)) || isNaN(Number(employerContribution))) {
        return "0.00";
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
    const isOptionalInputInError = !isValidPlanDescription && planDescription !== "";

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    benefitDispatch({
      type: benefitAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
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
    const isStepInError = !isValidEmployeeContribution || !isValidEmployerContribution;

    benefitDispatch({
      type: benefitAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [isValidEmployeeContribution, isValidEmployerContribution]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [benefitUsernameInputErrorText, benefitUsernameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "benefit username",
      inputText: benefitUsername,
      isValidInputText: isValidBenefitUsername,
      isInputTextFocused: isBenefitUsernameFocused,
      regexValidationText: returnUsernameRegexValidationText({
        content: benefitUsername,
        contentKind: "benefit username input",
      }),
    });

  const [planNameInputErrorText, planNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "plan name",
      inputText: planName,
      isValidInputText: isValidPlanName,
      isInputTextFocused: isPlanNameFocused,
      regexValidationText: returnGrammarValidationText({
        content: planName,
        contentKind: "plan name input",
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [planDescriptionInputErrorText, planDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "plan description",
      inputText: planDescription,
      isValidInputText: isValidPlanDescription,
      isInputTextFocused: isPlanDescriptionFocused,
      regexValidationText: returnGrammarValidationText({
        content: planDescription,
        contentKind: "plan description input",
        minLength: 1,
        maxLength: 300,
      }),
    });

  const [planStartDateInputErrorText, planStartDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "plan start date",
      inputText: planStartDate,
      isValidInputText: isValidPlanStartDate,
      isInputTextFocused: isPlanStartDateFocused,
      regexValidationText: returnDateValidationText({
        content: planStartDate,
        contentKind: "plan start date input",
      }),
    });

  const [employeeContributionInputErrorText, employeeContributionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "employee contribution",
      inputText: employeeContribution,
      isValidInputText: isValidEmployeeContribution,
      isInputTextFocused: isEmployeeContributionFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: employeeContribution,
        contentKind: "employee contribution input",
      }),
    });

  const [employerContributionInputErrorText, employerContributionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "employer contribution",
      inputText: employerContribution,
      isValidInputText: isValidEmployerContribution,
      isInputTextFocused: isEmployerContributionFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: employerContribution,
        contentKind: "employer contribution input",
      }),
    });

  const [planActiveInputSelectedText, planActiveInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isPlanActive,
      semanticName: "active status",
      selectedDescription: "Plan is active",
      deselectedDescription: "Plan is inactive",
    });

  // following are info objects for input creators
  const benefitUsernameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: benefitUsernameInputErrorText,
      valid: benefitUsernameInputValidText,
    },
    inputText: benefitUsername,
    isValidInputText: isValidBenefitUsername,
    label: "Benefit Username",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsBenefitUsernameFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setBenefitUsername,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsBenefitUsernameFocused,
        payload: true,
      });
    },
    placeholder: "Enter username",
    semanticName: "benefit username",
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
    label: "Plan Name",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanNameFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setPlanName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter plan name",
    semanticName: "plan name",
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
    label: "Plan Description",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      benefitDispatch({
        type: benefitAction.setPlanDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter plan description",
    semanticName: "plan description",
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
    label: "Plan Start Date",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setPlanStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsPlanStartDateFocused,
        payload: true,
      });
    },
    placeholder: "Enter plan start date",
    semanticName: "plan start date",
    required: true,
    withAsterisk: true,
    inputKind: "date",
    dateKind: "full date",
  };

  const planKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select plan kind",
    data: BENEFIT_PLAN_DATA,
    label: "Plan Kind",
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      benefitDispatch({
        type: benefitAction.setPlanKind,
        payload: event.currentTarget.value as BenefitsPlanKind,
      });
    },
    value: planKind,
    required: true,
    withAsterisk: true,
  };

  const currencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select currency",
    data: CURRENCY_DATA,
    label: "Currency",
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      benefitDispatch({
        type: benefitAction.setCurrency,
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
    currency === "CNY" ? (
      <TbCurrencyRenminbi size={14} color={grayColorShade} />
    ) : currency === "GBP" ? (
      <TbCurrencyPound size={14} color={grayColorShade} />
    ) : currency === "EUR" ? (
      <TbCurrencyEuro size={14} color={grayColorShade} />
    ) : currency === "JPY" ? (
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
    label: "Employee Contribution",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsEmployeeContributionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setEmployeeContribution,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsEmployeeContributionFocused,
        payload: true,
      });
    },
    rightSection: true,
    rightSectionIcon: currencyIcon,
    placeholder: "Enter employee contribution",
    semanticName: "employee contribution",
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
    label: "Employer Contribution",
    onBlur: () => {
      benefitDispatch({
        type: benefitAction.setIsEmployerContributionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setEmployerContribution,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      benefitDispatch({
        type: benefitAction.setIsEmployerContributionFocused,
        payload: true,
      });
    },
    rightSection: true,
    rightSectionIcon: currencyIcon,
    placeholder: "Enter employer contribution",
    semanticName: "employer contribution",
    minLength: 4,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const planStatusCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo = {
    description: {
      selected: planActiveInputSelectedText,
      deselected: planActiveInputDeselectedText,
    },
    label: "Plan Status",
    checked: isPlanActive,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      benefitDispatch({
        type: benefitAction.setIsPlanActive,
        payload: event.currentTarget.checked,
      });
    },
    semanticName: "active status",
    required: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "create benefit form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      benefitDispatch({
        type: benefitAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
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

  const [createdPlanDescriptionTextAreaInput] = returnAccessibleTextAreaInputElements([
    planDescriptionInputCreatorInfo,
  ]);

  const [createdPlanKindSelectInput, createdCurrencySelectInput] =
    returnAccessibleSelectInputElements([
      planKindSelectInputCreatorInfo,
      currencySelectInputCreatorInfo,
    ]);

  const [createdPlanStatusCheckboxInput] = returnAccessibleCheckboxSingleInputElements([
    planStatusCheckboxInputCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === BENEFIT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting form"
            : "Submit Benefit form"
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
    currency === "CNY"
      ? "元"
      : currency === "GBP"
      ? "£"
      : currency === "EUR"
      ? "€"
      : currency === "JPY"
      ? "¥"
      : "$";

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

  const BENEFIT_REVIEW_OBJECT: FormReviewObjectArray = {
    "Plan Details": [
      {
        inputName: "Benefit Username",
        inputValue: benefitUsername,
        isInputValueValid: isValidBenefitUsername,
      },
      {
        inputName: "Plan Name",
        inputValue: planName,
        isInputValueValid: isValidPlanName,
      },
      {
        inputName: "Plan Description",
        inputValue: planDescription,
        isInputValueValid: isValidPlanDescription,
      },
      {
        inputName: "Plan Start Date",
        inputValue: planStartDate,
        isInputValueValid: isValidPlanStartDate,
      },
      {
        inputName: "Plan Kind",
        inputValue: planKind,
        isInputValueValid: planKind.length > 0,
      },
    ],
    "Plan Contributions": [
      {
        inputName: "Currency",
        inputValue: currency,
        isInputValueValid: true,
      },
      {
        inputName: "Employee Contribution",
        inputValue: employeeContribution,
        isInputValueValid: isValidEmployeeContribution,
      },
      {
        inputName: "Employer Contribution",
        inputValue: employerContribution,
        isInputValueValid: isValidEmployerContribution,
      },
      {
        inputName: "Plan Status",
        inputValue: isPlanActive ? "Active" : "Inactive",
        isInputValueValid: true,
      },
    ],
  };

  const displayReviewPage = (
    <FormReviewPage
      formReviewObject={BENEFIT_REVIEW_OBJECT}
      formName="Create Benefit"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/company/benefit/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displayBenefitForm =
    currentStepperPosition === 0
      ? displayPlanDetailsFormPage
      : currentStepperPosition === 1
      ? displayPlanContributionsFormPage
      : currentStepperPosition === 2
      ? displayReviewPage
      : displaySubmitButton;

  const displayBenefitComponent = (
    <StepperWrapper
      childrenTitle="Create Benefit"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={BENEFIT_DESCRIPTION_OBJECTS}
      maxStepperPosition={BENEFIT_MAX_STEPPER_POSITION}
      parentComponentDispatch={benefitDispatch}
      setCurrentStepperPosition={benefitAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayBenefitForm}
    </StepperWrapper>
  );

  return displayBenefitComponent;
 */
