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

  employerContribution: number;
  isValidEmployerContribution: boolean;
  isEmployerContributionFocused: boolean;

  employeeContribution: number;
  isValidEmployeeContribution: boolean;
  isEmployeeContributionFocused: boolean;
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
};

type CreateBenefitPayload = CreateBenefitState[keyof CreateBenefitState];

type CreateBenefitDispatch = {
  type: CreateBenefitAction[keyof CreateBenefitAction];
  payload: CreateBenefitPayload;
};

type CreateBenefitReducer = (
  state: CreateBenefitState,
  action: CreateBenefitDispatch
) => CreateBenefitState;

export type {
  BenefitsPlanKind,
  Currency,
  BenefitsSchema,
  BenefitsDocument,
  CreateBenefitState,
  CreateBenefitAction,
  CreateBenefitPayload,
  CreateBenefitDispatch,
  CreateBenefitReducer,
};
