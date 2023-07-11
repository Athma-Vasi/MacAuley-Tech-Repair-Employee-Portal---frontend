import { SetStepsInErrorPayload } from '../../../types';

type BenefitsPlanKind =
  | 'Health'
  | 'Dental'
  | 'Vision'
  | 'Life'
  | 'Disability'
  | 'Retirement'
  | 'Education'
  | 'Other';

type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY';

type BenefitsSchema = {
  userId: string;
  username: string;
  planName: string;
  planDescription: string;
  planKind: BenefitsPlanKind;
  planStartDate: string;
  isPlanActive: boolean;
  currency: Currency;
  monthlyPremium: number;
  employerContribution: number;
  employeeContribution: number;
};

type BenefitsDocument = BenefitsSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateBenefitState = {
  planName: string;
  isValidPlanName: boolean;
  isPlanNameFocused: boolean;

  planDescription: string;
  isValidPlanDescription: boolean;
  isPlanDescriptionFocused: boolean;

  planStartDate: string;
  isValidPlanStartDate: boolean;
  isPlanStartDateFocused: boolean;

  planKind: BenefitsPlanKind | '';
  isPlanActive: boolean;
  currency: Currency;

  employerContribution: string;
  isValidEmployerContribution: boolean;
  isEmployerContributionFocused: boolean;

  employeeContribution: string;
  isValidEmployeeContribution: boolean;
  isEmployeeContributionFocused: boolean;

  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreateBenefitAction = {
  setPlanName: 'setPlanName';
  setIsValidPlanName: 'setIsValidPlanName';
  setIsPlanNameFocused: 'setIsPlanNameFocused';

  setPlanDescription: 'setPlanDescription';
  setIsValidPlanDescription: 'setIsValidPlanDescription';
  setIsPlanDescriptionFocused: 'setIsPlanDescriptionFocused';

  setPlanStartDate: 'setPlanStartDate';
  setIsValidPlanStartDate: 'setIsValidPlanStartDate';
  setIsPlanStartDateFocused: 'setIsPlanStartDateFocused';

  setPlanKind: 'setPlanKind';
  setIsPlanActive: 'setIsPlanActive';
  setCurrency: 'setCurrency';

  setEmployerContribution: 'setEmployerContribution';
  setIsValidEmployerContribution: 'setIsValidEmployerContribution';
  setIsEmployerContributionFocused: 'setIsEmployerContributionFocused';

  setEmployeeContribution: 'setEmployeeContribution';
  setIsValidEmployeeContribution: 'setIsValidEmployeeContribution';
  setIsEmployeeContributionFocused: 'setIsEmployeeContributionFocused';

  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

// type CreateBenefitPayload = CreateBenefitState[keyof CreateBenefitState];

// type CreateBenefitDispatch = {
//   type: CreateBenefitAction[keyof CreateBenefitAction];
//   payload: CreateBenefitPayload;
// };

type CreateBenefitDispatch =
  | {
      type:
        | CreateBenefitAction['setPlanName']
        | CreateBenefitAction['setPlanDescription']
        | CreateBenefitAction['setPlanStartDate']
        | CreateBenefitAction['setEmployeeContribution']
        | CreateBenefitAction['setEmployerContribution'];
      payload: string;
    }
  | {
      type:
        | CreateBenefitAction['setIsValidPlanName']
        | CreateBenefitAction['setIsValidPlanDescription']
        | CreateBenefitAction['setIsValidPlanStartDate']
        | CreateBenefitAction['setIsValidEmployeeContribution']
        | CreateBenefitAction['setIsValidEmployerContribution'];
      payload: boolean;
    }
  | {
      type:
        | CreateBenefitAction['setIsPlanNameFocused']
        | CreateBenefitAction['setIsPlanDescriptionFocused']
        | CreateBenefitAction['setIsPlanStartDateFocused']
        | CreateBenefitAction['setIsEmployeeContributionFocused']
        | CreateBenefitAction['setIsEmployerContributionFocused'];
      payload: boolean;
    }
  | {
      type: CreateBenefitAction['setPlanKind'];
      payload: BenefitsPlanKind | '';
    }
  | {
      type: CreateBenefitAction['setIsPlanActive'];
      payload: boolean;
    }
  | {
      type: CreateBenefitAction['setCurrency'];
      payload: Currency;
    }
  | {
      type: CreateBenefitAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateBenefitAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | CreateBenefitAction['setIsError']
        | CreateBenefitAction['setIsSubmitting']
        | CreateBenefitAction['setIsSuccessful']
        | CreateBenefitAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | CreateBenefitAction['setErrorMessage']
        | CreateBenefitAction['setSubmitMessage']
        | CreateBenefitAction['setSuccessMessage']
        | CreateBenefitAction['setLoadingMessage'];
      payload: string;
    };

type CreateBenefitReducer = (
  state: CreateBenefitState,
  action: CreateBenefitDispatch
) => CreateBenefitState;

export type {
  BenefitsDocument,
  BenefitsPlanKind,
  BenefitsSchema,
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitReducer,
  CreateBenefitState,
  Currency,
};
