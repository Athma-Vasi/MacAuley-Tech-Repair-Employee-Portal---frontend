import { useReducer } from 'react';

import { createRefermentReducer, initialCreateRefermentState } from './state';

function CreateReferment() {
  const [createRefermentState, createRefermentDispatch] = useReducer(
    createRefermentReducer,
    initialCreateRefermentState
  );
  const {
    candidateFullName,
    isValidCandidateFullName,
    isCandidateFullNameFocused,

    candidateEmail,
    isValidCandidateEmail,
    isCandidateEmailFocused,

    candidateContactNumber,
    isValidCandidateContactNumber,
    isCandidateContactNumberFocused,

    candidateCurrentJobTitle,
    isValidCandidateCurrentJobTitle,
    isCandidateCurrentJobTitleFocused,

    candidateCurrentCompany,
    isValidCandidateCurrentCompany,
    isCandidateCurrentCompanyFocused,

    candidateProfileUrl,
    isValidCandidateProfileUrl,
    isCandidateProfileUrlFocused,

    positionReferredFor,

    positionJobDescription,
    isValidPositionJobDescription,
    isPositionJobDescriptionFocused,

    referralReason,
    isValidReferralReason,
    isReferralReasonFocused,

    additionalInformation,
    isValidAdditionalInformation,
    isAdditionalInformationFocused,

    privacyConsent,

    currentStepperPosition,
    stepsInError,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRefermentState;

  //
  //
  //
  return (
    <>
      <h3>Create Referment</h3>
    </>
  );
}

export { CreateReferment };
