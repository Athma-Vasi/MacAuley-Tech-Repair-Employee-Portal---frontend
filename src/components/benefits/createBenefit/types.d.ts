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

type CreateBenefitsState = {
  planName: string;
  isValidPlanName: boolean;
  isPlanNameFocused: boolean;

  planDescription: string;
  isValidPlanDescription: boolean;
  isPlanDescriptionFocused: boolean;

  planKind: BenefitsPlanKind;

  planStartDate: string;
  isValidPlanStartDate: boolean;
  isPlanStartDateFocused: boolean;

  isPlanActive: boolean;
  currency: Currency;

  employerContribution: number;
  isValidEmployerContribution: boolean;
  isEmployerContributionFocused: boolean;

  employeeContribution: number;
  isValidEmployeeContribution: boolean;
  isEmployeeContributionFocused: boolean;
};

type CreateBenefitsAction = {
  setPlanName: 'setPlanName';
  setIsValidPlanName: 'setIsValidPlanName';
  setIsPlanNameFocused: 'setIsPlanNameFocused';

  setPlanDescription: 'setPlanDescription';
  setIsValidPlanDescription: 'setIsValidPlanDescription';
  setIsPlanDescriptionFocused: 'setIsPlanDescriptionFocused';

  setPlanKind: 'setPlanKind';
  setIsValidPlanKind: 'setIsValidPlanKind';
  setIsPlanKindFocused: 'setIsPlanKindFocused';

  setPlanStartDate: 'setPlanStartDate';
  setIsValidPlanStartDate: 'setIsValidPlanStartDate';
  setIsPlanStartDateFocused: 'setIsPlanStartDateFocused';

  setIsPlanActive: 'setIsPlanActive';
  setCurrency: 'setCurrency';

  setEmployerContribution: 'setEmployerContribution';
  setIsValidEmployerContribution: 'setIsValidEmployerContribution';
  setIsEmployerContributionFocused: 'setIsEmployerContributionFocused';

  setEmployeeContribution: 'setEmployeeContribution';
  setIsValidEmployeeContribution: 'setIsValidEmployeeContribution';
  setIsEmployeeContributionFocused: 'setIsEmployeeContributionFocused';
};

type CreateBenefitsPayload = CreateBenefitsState[keyof CreateBenefitsState];

type CreateBenefitsDispatch = {
  type: CreateBenefitsAction[keyof CreateBenefitsAction];
  payload: CreateBenefitsPayload;
};

type CreateBenefitsReducer = (
  state: CreateBenefitsState,
  action: CreateBenefitsDispatch
) => CreateBenefitsState;

export type {
  BenefitsPlanKind,
  Currency,
  BenefitsSchema,
  BenefitsDocument,
  CreateBenefitsState,
  CreateBenefitsAction,
  CreateBenefitsPayload,
  CreateBenefitsDispatch,
  CreateBenefitsReducer,
};
