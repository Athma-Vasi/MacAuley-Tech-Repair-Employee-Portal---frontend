import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  createBenefitAction,
  createBenefitReducer,
  initialCreateBenefitState,
} from './state';
import {
  BENEFIT_PLAN_DATA,
  CURRENCY_DATA,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
} from '../constants';
import { DATE_REGEX } from '../../register/constants';
import { returnAccessibleTextElem } from '../../../jsxCreators';
import {
  returnGenericGrammarValidationText,
  returnMoneyValidationText,
} from '../../../utils';
import { returnDateValidationText } from '../../register/utils';
import {
  Checkbox,
  Flex,
  NativeSelect,
  NumberInput,
  Radio,
  Space,
  Switch,
  TextInput,
  Textarea,
  Text,
  Button,
} from '@mantine/core';
import {
  faCheck,
  faDollarSign,
  faEuro,
  faJpy,
  faPoundSign,
  faYen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { title } from 'process';
import { createAnnouncementAction } from '../../announcements/createAnnouncement/state';
import { MONEY_REGEX } from '../../../constants';
import { RadioGroup } from '@mantine/core/lib/Radio/RadioGroup/RadioGroup';

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
    planKind,
    isPlanActive,
    currency,
    planStartDate,
    isValidPlanStartDate,
    isPlanStartDateFocused,
    employeeContribution,
    employerContribution,
    isEmployeeContributionFocused,
    isEmployerContributionFocused,
    isValidEmployeeContribution,
    isValidEmployerContribution,
  } = createBenefitState;

  const planNameRef = useRef<HTMLInputElement>(null);
  // sets focus on plan name input on page load
  useEffect(() => {
    planNameRef.current?.focus();
  }, []);

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

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const planNameInputValidText = returnAccessibleTextElem({
    inputElementKind: 'plan name',
    inputText: planName,
    kind: 'valid',
    isValidInputText: isValidPlanName,
    isInputTextFocused: isPlanNameFocused,
  });

  const planNameInputErrorText = returnAccessibleTextElem({
    inputElementKind: 'plan name',
    inputText: planName,
    kind: 'error',
    isValidInputText: isValidPlanName,
    isInputTextFocused: isPlanNameFocused,
    regexValidationText: returnGenericGrammarValidationText({
      content: planName,
      contentKind: 'plan name input',
      minLength: 1,
      maxLength: 50,
    }),
  });

  const planDescriptionInputValidText = returnAccessibleTextElem({
    inputElementKind: 'plan description',
    inputText: planDescription,
    kind: 'valid',
    isValidInputText: isValidPlanDescription,
    isInputTextFocused: isPlanDescriptionFocused,
  });

  const planDescriptionInputErrorText = returnAccessibleTextElem({
    inputElementKind: 'plan description',
    inputText: planDescription,
    kind: 'error',
    isValidInputText: isValidPlanDescription,
    isInputTextFocused: isPlanDescriptionFocused,
    regexValidationText: returnGenericGrammarValidationText({
      content: planDescription,
      contentKind: 'plan description input',
      minLength: 1,
      maxLength: 300,
    }),
  });

  const planStartDateInputValidText = returnAccessibleTextElem({
    inputElementKind: 'plan start date',
    inputText: planStartDate,
    kind: 'valid',
    isValidInputText: isValidPlanStartDate,
    isInputTextFocused: isPlanStartDateFocused,
  });

  const planStartDateInputErrorText = returnAccessibleTextElem({
    inputElementKind: 'plan start date',
    inputText: planStartDate,
    kind: 'error',
    isValidInputText: isValidPlanStartDate,
    isInputTextFocused: isPlanStartDateFocused,
    regexValidationText: returnDateValidationText(planStartDate),
  });

  const employeeContributionInputValidText = returnAccessibleTextElem({
    inputElementKind: 'employee contribution',
    inputText: employeeContribution,
    kind: 'valid',
    isValidInputText: isValidEmployeeContribution,
    isInputTextFocused: isEmployeeContributionFocused,
  });

  const employeeContributionInputErrorText = returnAccessibleTextElem({
    inputElementKind: 'employee contribution',
    inputText: employeeContribution,
    kind: 'error',
    isValidInputText: isValidEmployeeContribution,
    isInputTextFocused: isEmployeeContributionFocused,
    regexValidationText: returnMoneyValidationText({
      money: employeeContribution,
      kind: 'employee contribution',
    }),
  });

  const employerContributionInputValidText = returnAccessibleTextElem({
    inputElementKind: 'employer contribution',
    inputText: employerContribution,
    kind: 'valid',
    isValidInputText: isValidEmployerContribution,
    isInputTextFocused: isEmployerContributionFocused,
  });

  const employerContributionInputErrorText = returnAccessibleTextElem({
    inputElementKind: 'employer contribution',
    inputText: employerContribution,
    kind: 'error',
    isValidInputText: isValidEmployerContribution,
    isInputTextFocused: isEmployerContributionFocused,
    regexValidationText: returnMoneyValidationText({
      money: employerContribution,
      kind: 'employer contribution',
    }),
  });

  const currencyIcon =
    currency === 'CNY' ? (
      <FontAwesomeIcon icon={faYen} color="gray" />
    ) : currency === 'GBP' ? (
      <FontAwesomeIcon icon={faPoundSign} color="gray" />
    ) : currency === 'EUR' ? (
      <FontAwesomeIcon icon={faEuro} color="gray" />
    ) : currency === 'JPY' ? (
      <FontAwesomeIcon icon={faJpy} color="gray" />
    ) : (
      <FontAwesomeIcon icon={faDollarSign} color="gray" />
    );

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

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      {/* plan name text input */}
      <TextInput
        size="md"
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
        ref={planNameRef}
        minLength={1}
        maxLength={50}
        required
        withAsterisk
      />

      {/* plan description text input */}
      <Textarea
        size="md"
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
      {/* plan kind select input */}
      <NativeSelect
        size="md"
        data={BENEFIT_PLAN_DATA}
        label="Benefit plan kind"
        value={planKind}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setPlanKind,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />
      {/* plan active checkbox input */}
      <Checkbox
        size="md"
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

      {/* plan start date input */}
      <TextInput
        type="date"
        size="md"
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

      {/* currency select input */}
      <NativeSelect
        size="md"
        data={CURRENCY_DATA}
        label="Currency"
        description="Select currency of plan."
        value={currency}
        onChange={(event) => {
          createBenefitDispatch({
            type: createBenefitAction.setCurrency,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />

      {/* employee contribution text input */}
      <TextInput
        size="md"
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

      {/* employer contribution text input */}
      <TextInput
        size="md"
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
      {/* computed total contribution */}
      <Flex w="100%" justify="space-between" align="center">
        <Text size="md" color="dark">
          Total contribution
        </Text>
        <Flex justify="space-between" align="center" columnGap="sm">
          {currencyIcon}
          <Text size="md" color="dark">
            {totalContribution}
          </Text>
        </Flex>
      </Flex>

      {/* submit button */}
      <Button
        size="md"
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
    </Flex>
  );
}

export { CreateBenefit };
