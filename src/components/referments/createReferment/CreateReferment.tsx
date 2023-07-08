import { useEffect, useReducer } from 'react';

import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import {
  createRefermentAction,
  createRefermentReducer,
  initialCreateRefermentState,
} from './state';

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

  // validate candidateFullName on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(candidateFullName);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateFullName,
      payload: isValid,
    });
  }, [candidateFullName]);

  // validate candidateEmail on every change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(candidateEmail);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateEmail,
      payload: isValid,
    });
  }, [candidateEmail]);

  // validate candidateContactNumber on every change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(candidateContactNumber);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateContactNumber,
      payload: isValid,
    });
  }, [candidateContactNumber]);

  // validate candidateCurrentJobTitle on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(candidateCurrentJobTitle);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateCurrentJobTitle,
      payload: isValid,
    });
  }, [candidateCurrentJobTitle]);

  // validate candidateCurrentCompany on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(candidateCurrentCompany);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateCurrentCompany,
      payload: isValid,
    });
  }, [candidateCurrentCompany]);

  // validate candidateProfileUrl on every change
  useEffect(() => {
    const isValid = URL_REGEX.test(candidateProfileUrl);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateProfileUrl,
      payload: isValid,
    });
  }, [candidateProfileUrl]);

  // validate positionJobDescription on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(positionJobDescription);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidPositionJobDescription,
      payload: isValid,
    });
  }, [positionJobDescription]);

  // validate referralReason on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(referralReason);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidReferralReason,
      payload: isValid,
    });
  }, [referralReason]);

  // validate additionalInformation on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalInformation);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const isStepInError =
      isValidCandidateFullName ||
      isValidCandidateEmail ||
      isValidCandidateContactNumber ||
      isValidCandidateCurrentJobTitle ||
      isValidCandidateCurrentCompany ||
      isValidCandidateProfileUrl;

    // if any of the steps are in error, add step 1 to the stepsInError set
    createRefermentDispatch({
      type: createRefermentAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidCandidateFullName,
    isValidCandidateEmail,
    isValidCandidateContactNumber,
    isValidCandidateCurrentJobTitle,
    isValidCandidateCurrentCompany,
    isValidCandidateProfileUrl,
  ]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const isStepInError =
      isValidPositionJobDescription ||
      isValidReferralReason ||
      isValidAdditionalInformation;

    // if any of the steps are in error, add step 2 to the stepsInError set
    createRefermentDispatch({
      type: createRefermentAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidPositionJobDescription,
    isValidReferralReason,
    isValidAdditionalInformation,
  ]);

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
