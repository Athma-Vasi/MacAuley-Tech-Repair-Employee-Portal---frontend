import type {
  CreateRefermentAction,
  CreateRefermentDispatch,
  CreateRefermentState,
} from './types';

const initialCreateRefermentState: CreateRefermentState = {
  candidateFullName: '',
  isValidCandidateFullName: false,
  isCandidateFullNameFocused: false,

  candidateEmail: '',
  isValidCandidateEmail: false,
  isCandidateEmailFocused: false,

  candidateContactNumber: '+(1)',
  isValidCandidateContactNumber: false,
  isCandidateContactNumberFocused: false,

  candidateCurrentJobTitle: '',
  isValidCandidateCurrentJobTitle: false,
  isCandidateCurrentJobTitleFocused: false,

  candidateCurrentCompany: '',
  isValidCandidateCurrentCompany: false,
  isCandidateCurrentCompanyFocused: false,

  candidateProfileUrl: '',
  isValidCandidateProfileUrl: false,
  isCandidateProfileUrlFocused: false,

  positionReferredFor: 'Employee',

  positionJobDescription: '',
  isValidPositionJobDescription: false,
  isPositionJobDescriptionFocused: false,

  referralReason: '',
  isValidReferralReason: false,
  isReferralReasonFocused: false,

  additionalInformation: '',
  isValidAdditionalInformation: false,
  isAdditionalInformationFocused: false,

  privacyConsent: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const createRefermentAction: CreateRefermentAction = {
  setCandidateFullName: 'setCandidateFullName',
  setIsValidCandidateFullName: 'setIsValidCandidateFullName',
  setIsCandidateFullNameFocused: 'setIsCandidateFullNameFocused',

  setCandidateEmail: 'setCandidateEmail',
  setIsValidCandidateEmail: 'setIsValidCandidateEmail',
  setIsCandidateEmailFocused: 'setIsCandidateEmailFocused',

  setCandidateContactNumber: 'setCandidateContactNumber',
  setIsValidCandidateContactNumber: 'setIsValidCandidateContactNumber',
  setIsCandidateContactNumberFocused: 'setIsCandidateContactNumberFocused',

  setCandidateCurrentJobTitle: 'setCandidateCurrentJobTitle',
  setIsValidCandidateCurrentJobTitle: 'setIsValidCandidateCurrentJobTitle',
  setIsCandidateCurrentJobTitleFocused: 'setIsCandidateCurrentJobTitleFocused',

  setCandidateCurrentCompany: 'setCandidateCurrentCompany',
  setIsValidCandidateCurrentCompany: 'setIsValidCandidateCurrentCompany',
  setIsCandidateCurrentCompanyFocused: 'setIsCandidateCurrentCompanyFocused',

  setCandidateProfileUrl: 'setCandidateProfileUrl',
  setIsValidCandidateProfileUrl: 'setIsValidCandidateProfileUrl',
  setIsCandidateProfileUrlFocused: 'setIsCandidateProfileUrlFocused',

  setPositionReferredFor: 'setPositionReferredFor',

  setPositionJobDescription: 'setPositionJobDescription',
  setIsValidPositionJobDescription: 'setIsValidPositionJobDescription',
  setIsPositionJobDescriptionFocused: 'setIsPositionJobDescriptionFocused',

  setReferralReason: 'setReferralReason',
  setIsValidReferralReason: 'setIsValidReferralReason',
  setIsReferralReasonFocused: 'setIsReferralReasonFocused',

  setAdditionalInformation: 'setAdditionalInformation',
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation',
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused',

  setPrivacyConsent: 'setPrivacyConsent',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createRefermentReducer(
  state: CreateRefermentState,
  action: CreateRefermentDispatch
): CreateRefermentState {
  switch (action.type) {
    case createRefermentAction.setCandidateFullName:
      return {
        ...state,
        candidateFullName: action.payload,
      };
    case createRefermentAction.setIsValidCandidateFullName:
      return {
        ...state,
        isValidCandidateFullName: action.payload,
      };
    case createRefermentAction.setIsCandidateFullNameFocused:
      return {
        ...state,
        isCandidateFullNameFocused: action.payload,
      };
    case createRefermentAction.setCandidateEmail:
      return {
        ...state,
        candidateEmail: action.payload,
      };
    case createRefermentAction.setIsValidCandidateEmail:
      return {
        ...state,
        isValidCandidateEmail: action.payload,
      };
    case createRefermentAction.setIsCandidateEmailFocused:
      return {
        ...state,
        isCandidateEmailFocused: action.payload,
      };
    case createRefermentAction.setCandidateContactNumber:
      return {
        ...state,
        candidateContactNumber: action.payload,
      };
    case createRefermentAction.setIsValidCandidateContactNumber:
      return {
        ...state,
        isValidCandidateContactNumber: action.payload,
      };
    case createRefermentAction.setIsCandidateContactNumberFocused:
      return {
        ...state,
        isCandidateContactNumberFocused: action.payload,
      };
    case createRefermentAction.setCandidateCurrentJobTitle:
      return {
        ...state,
        candidateCurrentJobTitle: action.payload,
      };
    case createRefermentAction.setIsValidCandidateCurrentJobTitle:
      return {
        ...state,
        isValidCandidateCurrentJobTitle: action.payload,
      };
    case createRefermentAction.setIsCandidateCurrentJobTitleFocused:
      return {
        ...state,
        isCandidateCurrentJobTitleFocused: action.payload,
      };
    case createRefermentAction.setCandidateCurrentCompany:
      return {
        ...state,
        candidateCurrentCompany: action.payload,
      };
    case createRefermentAction.setIsValidCandidateCurrentCompany:
      return {
        ...state,
        isValidCandidateCurrentCompany: action.payload,
      };
    case createRefermentAction.setIsCandidateCurrentCompanyFocused:
      return {
        ...state,
        isCandidateCurrentCompanyFocused: action.payload,
      };
    case createRefermentAction.setCandidateProfileUrl:
      return {
        ...state,
        candidateProfileUrl: action.payload,
      };
    case createRefermentAction.setIsValidCandidateProfileUrl:
      return {
        ...state,
        isValidCandidateProfileUrl: action.payload,
      };
    case createRefermentAction.setIsCandidateProfileUrlFocused:
      return {
        ...state,
        isCandidateProfileUrlFocused: action.payload,
      };
    case createRefermentAction.setPositionReferredFor:
      return {
        ...state,
        positionReferredFor: action.payload,
      };
    case createRefermentAction.setPositionJobDescription:
      return {
        ...state,
        positionJobDescription: action.payload,
      };
    case createRefermentAction.setIsValidPositionJobDescription:
      return {
        ...state,
        isValidPositionJobDescription: action.payload,
      };
    case createRefermentAction.setIsPositionJobDescriptionFocused:
      return {
        ...state,
        isPositionJobDescriptionFocused: action.payload,
      };
    case createRefermentAction.setReferralReason:
      return {
        ...state,
        referralReason: action.payload,
      };
    case createRefermentAction.setIsValidReferralReason:
      return {
        ...state,
        isValidReferralReason: action.payload,
      };
    case createRefermentAction.setIsReferralReasonFocused:
      return {
        ...state,
        isReferralReasonFocused: action.payload,
      };
    case createRefermentAction.setAdditionalInformation:
      return {
        ...state,
        additionalInformation: action.payload,
      };
    case createRefermentAction.setIsValidAdditionalInformation:
      return {
        ...state,
        isValidAdditionalInformation: action.payload,
      };
    case createRefermentAction.setIsAdditionalInformationFocused:
      return {
        ...state,
        isAdditionalInformationFocused: action.payload,
      };
    case createRefermentAction.setPrivacyConsent:
      return {
        ...state,
        privacyConsent: action.payload,
      };

    case createRefermentAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createRefermentAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createRefermentAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }
    case createRefermentAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createRefermentAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createRefermentAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createRefermentAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createRefermentAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createRefermentAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createRefermentAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createRefermentAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  createRefermentAction,
  createRefermentReducer,
  initialCreateRefermentState,
};
