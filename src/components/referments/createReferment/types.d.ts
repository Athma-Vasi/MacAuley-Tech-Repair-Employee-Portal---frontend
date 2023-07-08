import { JobPosition, PhoneNumber } from '../../../types';

type RefermentSchema = {
  referrerUserId: string;
  referrerUsername: string;

  candidateFullName: string;
  candidateEmail: string;
  candidateContactNumber: PhoneNumber | string;
  candidateCurrentJobTitle: string;
  candidateCurrentCompany: string;
  candidateProfileUrl: string;

  positionReferredFor: JobPosition;
  positionJobDescription: string;
  referralReason: string;
  additionalInformation: string;
  privacyConsent: boolean;
};

type RefermentDocument = RefermentSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateRefermentState = {
  candidateFullName: string;
  isValidCandidateFullName: boolean;
  isCandidateFullNameFocused: boolean;

  candidateEmail: string;
  isValidCandidateEmail: boolean;
  isCandidateEmailFocused: boolean;

  candidateContactNumber: PhoneNumber | string;
  isValidCandidateContactNumber: boolean;
  isCandidateContactNumberFocused: boolean;

  candidateCurrentJobTitle: string;
  isValidCandidateCurrentJobTitle: boolean;
  isCandidateCurrentJobTitleFocused: boolean;

  candidateCurrentCompany: string;
  isValidCandidateCurrentCompany: boolean;
  isCandidateCurrentCompanyFocused: boolean;

  candidateProfileUrl: string;
  isValidCandidateProfileUrl: boolean;
  isCandidateProfileUrlFocused: boolean;

  positionReferredFor: JobPosition;

  positionJobDescription: string;
  isValidPositionJobDescription: boolean;
  isPositionJobDescriptionFocused: boolean;

  referralReason: string;
  isValidReferralReason: boolean;
  isReferralReasonFocused: boolean;

  additionalInformation: string;
  isValidAdditionalInformation: boolean;
  isAdditionalInformationFocused: boolean;

  privacyConsent: boolean;

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

type CreateRefermentAction = {
  setCandidateFullName: 'setCandidateFullName';
  setIsValidCandidateFullName: 'setIsValidCandidateFullName';
  setIsCandidateFullNameFocused: 'setIsCandidateFullNameFocused';

  setCandidateEmail: 'setCandidateEmail';
  setIsValidCandidateEmail: 'setIsValidCandidateEmail';
  setIsCandidateEmailFocused: 'setIsCandidateEmailFocused';

  setCandidateContactNumber: 'setCandidateContactNumber';
  setIsValidCandidateContactNumber: 'setIsValidCandidateContactNumber';
  setIsCandidateContactNumberFocused: 'setIsCandidateContactNumberFocused';

  setCandidateCurrentJobTitle: 'setCandidateCurrentJobTitle';
  setIsValidCandidateCurrentJobTitle: 'setIsValidCandidateCurrentJobTitle';
  setIsCandidateCurrentJobTitleFocused: 'setIsCandidateCurrentJobTitleFocused';

  setCandidateCurrentCompany: 'setCandidateCurrentCompany';
  setIsValidCandidateCurrentCompany: 'setIsValidCandidateCurrentCompany';
  setIsCandidateCurrentCompanyFocused: 'setIsCandidateCurrentCompanyFocused';

  setCandidateProfileUrl: 'setCandidateProfileUrl';
  setIsValidCandidateProfileUrl: 'setIsValidCandidateProfileUrl';
  setIsCandidateProfileUrlFocused: 'setIsCandidateProfileUrlFocused';

  setPositionReferredFor: 'setPositionReferredFor';

  setPositionJobDescription: 'setPositionJobDescription';
  setIsValidPositionJobDescription: 'setIsValidPositionJobDescription';
  setIsPositionJobDescriptionFocused: 'setIsPositionJobDescriptionFocused';

  setReferralReason: 'setReferralReason';
  setIsValidReferralReason: 'setIsValidReferralReason';
  setIsReferralReasonFocused: 'setIsReferralReasonFocused';

  setAdditionalInformation: 'setAdditionalInformation';
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation';
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused';

  setPrivacyConsent: 'setPrivacyConsent';

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

type SetStepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type CreateRefermentDispatch =
  | {
      type:
        | 'setCandidateFullName'
        | 'setCandidateEmail'
        | 'setCandidateCurrentJobTitle'
        | 'setCandidateCurrentCompany'
        | 'setCandidateProfileUrl'
        | 'setPositionJobDescription'
        | 'setReferralReason'
        | 'setAdditionalInformation'
        | 'setErrorMessage'
        | 'setSubmitMessage'
        | 'setSuccessMessage'
        | 'setLoadingMessage';
      payload: string;
    }
  | {
      type:
        | 'setIsValidCandidateFullName'
        | 'setIsValidCandidateEmail'
        | 'setIsValidCandidateContactNumber'
        | 'setIsValidCandidateCurrentJobTitle'
        | 'setIsValidCandidateCurrentCompany'
        | 'setIsValidCandidateProfileUrl'
        | 'setIsValidPositionJobDescription'
        | 'setIsValidReferralReason'
        | 'setIsValidAdditionalInformation';
      payload: boolean;
    }
  | {
      type:
        | 'setIsCandidateFullNameFocused'
        | 'setIsCandidateEmailFocused'
        | 'setIsCandidateContactNumberFocused'
        | 'setIsCandidateCurrentJobTitleFocused'
        | 'setIsCandidateCurrentCompanyFocused'
        | 'setIsCandidateProfileUrlFocused'
        | 'setIsPositionJobDescriptionFocused'
        | 'setIsReferralReasonFocused'
        | 'setIsAdditionalInformationFocused';
      payload: boolean;
    }
  | { type: 'setCandidateContactNumber'; payload: PhoneNumber | string }
  | { type: 'setPositionReferredFor'; payload: JobPosition }
  | { type: 'setPrivacyConsent'; payload: boolean }
  | { type: 'setCurrentStepperPosition'; payload: number }
  | { type: 'setStepsInError'; payload: SetStepsInErrorPayload }
  | {
      type:
        | 'setIsError'
        | 'setIsSubmitting'
        | 'setIsSuccessful'
        | 'setIsLoading';
      payload: boolean;
    };

type CreateRefermentReducer = (
  state: CreateRefermentState,
  action: CreateRefermentDispatch
) => CreateRefermentState;

export type {
  CreateRefermentAction,
  CreateRefermentDispatch,
  CreateRefermentReducer,
  CreateRefermentState,
  RefermentDocument,
  RefermentSchema,
  SetStepsInErrorPayload,
};
