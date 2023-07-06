import { useEffect, useReducer, useRef } from 'react';
import {
  createBenefitAction,
  createBenefitReducer,
  initialCreateBenefitState,
} from './state';
import { PLAN_NAME_REGEX } from '../constants';

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
        const isValid = 

  return <></>;
}

export { CreateBenefit };
