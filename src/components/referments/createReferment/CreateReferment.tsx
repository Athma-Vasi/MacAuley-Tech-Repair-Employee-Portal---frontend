import { useEffect, useReducer } from 'react';

import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import { returnAccessibleTextElements } from '../../../jsxCreators';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnUrlValidationText,
} from '../../../utils';
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

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [candidateFullNameInputErrorText, candidateFullNameInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'candidate full name',
      inputText: candidateFullName,
      isInputTextFocused: isCandidateFullNameFocused,
      isValidInputText: isValidCandidateFullName,
      regexValidationText: returnGrammarValidationText({
        content: candidateFullName,
        contentKind: 'candidate full name',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [candidateEmailInputErrorText, candidateEmailInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'candidate email',
      inputText: candidateEmail,
      isInputTextFocused: isCandidateEmailFocused,
      isValidInputText: isValidCandidateEmail,
      regexValidationText: returnEmailValidationText(candidateEmail),
    });

  const [
    candidateContactNumberInputErrorText,
    candidateContactNumberInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'candidate contact number',
    inputText: candidateContactNumber,
    isInputTextFocused: isCandidateContactNumberFocused,
    isValidInputText: isValidCandidateContactNumber,
    regexValidationText: returnPhoneNumberValidationText(
      candidateContactNumber
    ),
  });

  const [
    candidateCurrentJobTitleInputErrorText,
    candidateCurrentJobTitleInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'candidate current job title',
    inputText: candidateCurrentJobTitle,
    isInputTextFocused: isCandidateCurrentJobTitleFocused,
    isValidInputText: isValidCandidateCurrentJobTitle,
    regexValidationText: returnGrammarValidationText({
      content: candidateCurrentJobTitle,
      contentKind: 'candidate current job title',
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [
    candidateCurrentCompanyInputErrorText,
    candidateCurrentCompanyInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'candidate current company',
    inputText: candidateCurrentCompany,
    isInputTextFocused: isCandidateCurrentCompanyFocused,
    isValidInputText: isValidCandidateCurrentCompany,
    regexValidationText: returnGrammarValidationText({
      content: candidateCurrentCompany,
      contentKind: 'candidate current company',
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [candidateProfileUrlInputErrorText, candidateProfileUrlInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'candidate profile url',
      inputText: candidateProfileUrl,
      isInputTextFocused: isCandidateProfileUrlFocused,
      isValidInputText: isValidCandidateProfileUrl,
      regexValidationText: returnUrlValidationText(candidateProfileUrl),
    });

  const [
    positionJobDescriptionInputErrorText,
    positionJobDescriptionInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'position job description',
    inputText: positionJobDescription,
    isInputTextFocused: isPositionJobDescriptionFocused,
    isValidInputText: isValidPositionJobDescription,
    regexValidationText: returnGrammarValidationText({
      content: positionJobDescription,
      contentKind: 'position job description',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const [referralReasonInputErrorText, referralReasonInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'referral reason',
      inputText: referralReason,
      isInputTextFocused: isReferralReasonFocused,
      isValidInputText: isValidReferralReason,
      regexValidationText: returnGrammarValidationText({
        content: referralReason,
        contentKind: 'referral reason',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [
    additionalInformationInputErrorText,
    additionalInformationInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'additional information',
    inputText: additionalInformation,
    isInputTextFocused: isAdditionalInformationFocused,
    isValidInputText: isValidAdditionalInformation,
    regexValidationText: returnGrammarValidationText({
      content: additionalInformation,
      contentKind: 'additional information',
      minLength: 2,
      maxLength: 2000,
    }),
  });

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
