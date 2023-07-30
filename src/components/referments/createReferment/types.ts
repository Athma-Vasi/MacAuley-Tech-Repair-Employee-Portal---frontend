import {
  Action,
  ActionsGeneral,
  Department,
  JobPosition,
  PhoneNumber,
  SetStepsInErrorPayload,
} from '../../../types';

type RefermentSchema = {
  referrerUserId: string;
  referrerUsername: string;
  action: Action;
  category: ActionsGeneral;

  candidateFullName: string;
  candidateEmail: string;
  candidateContactNumber: PhoneNumber;
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

  departmentReferredFor: Department;
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

  triggerFormSubmit: boolean;
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

  setDepartmentReferredFor: 'setDepartmentReferredFor';
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

  setTriggerFormSubmit: 'setTriggerFormSubmit';
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

type CreateRefermentDispatch =
  | {
      type:
        | CreateRefermentAction['setCandidateFullName']
        | CreateRefermentAction['setCandidateEmail']
        | CreateRefermentAction['setCandidateCurrentJobTitle']
        | CreateRefermentAction['setCandidateCurrentCompany']
        | CreateRefermentAction['setCandidateProfileUrl']
        | CreateRefermentAction['setPositionJobDescription']
        | CreateRefermentAction['setReferralReason']
        | CreateRefermentAction['setAdditionalInformation']
        | CreateRefermentAction['setErrorMessage']
        | CreateRefermentAction['setSubmitMessage']
        | CreateRefermentAction['setSuccessMessage']
        | CreateRefermentAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | CreateRefermentAction['setIsValidCandidateFullName']
        | CreateRefermentAction['setIsCandidateFullNameFocused']
        | CreateRefermentAction['setIsValidCandidateEmail']
        | CreateRefermentAction['setIsCandidateEmailFocused']
        | CreateRefermentAction['setIsValidCandidateContactNumber']
        | CreateRefermentAction['setIsCandidateContactNumberFocused']
        | CreateRefermentAction['setIsValidCandidateCurrentJobTitle']
        | CreateRefermentAction['setIsCandidateCurrentJobTitleFocused']
        | CreateRefermentAction['setIsValidCandidateCurrentCompany']
        | CreateRefermentAction['setIsCandidateCurrentCompanyFocused']
        | CreateRefermentAction['setIsValidCandidateProfileUrl']
        | CreateRefermentAction['setIsCandidateProfileUrlFocused']
        | CreateRefermentAction['setIsValidPositionJobDescription']
        | CreateRefermentAction['setIsPositionJobDescriptionFocused']
        | CreateRefermentAction['setIsValidReferralReason']
        | CreateRefermentAction['setIsReferralReasonFocused']
        | CreateRefermentAction['setIsValidAdditionalInformation']
        | CreateRefermentAction['setIsAdditionalInformationFocused']
        | CreateRefermentAction['setPrivacyConsent']
        | CreateRefermentAction['setTriggerFormSubmit']
        | CreateRefermentAction['setIsError']
        | CreateRefermentAction['setIsSubmitting']
        | CreateRefermentAction['setIsSuccessful']
        | CreateRefermentAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateRefermentAction['setCandidateContactNumber'];
      payload: PhoneNumber | string;
    }
  | {
      type: CreateRefermentAction['setDepartmentReferredFor'];
      payload: Department;
    }
  | {
      type: CreateRefermentAction['setPositionReferredFor'];
      payload: JobPosition;
    }
  | {
      type: CreateRefermentAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateRefermentAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
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
};
