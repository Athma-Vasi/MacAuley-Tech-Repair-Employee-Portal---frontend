import { useEffect, useReducer, useRef } from 'react';
import {
  createBenefitAction,
  createBenefitReducer,
  initialCreateBenefitState,
} from './state';
import {
  MONEY_REGEX,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
} from '../constants';
import { DATE_REGEX } from '../../register/constants';
import { returnAccessibleTextElem } from '../../../jsxCreators';

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

  const planNameInputValidText = returnAccessibleTextElem({
    inputElementKind: 'plan name',
    inputText: planName,
    kind: 'valid',
    isValidInputText: isValidPlanName,
    isInputTextFocused: isPlanNameFocused,
    regexValidationTextFn: () => '',
  });

  return <></>;
}

export { CreateBenefit };
