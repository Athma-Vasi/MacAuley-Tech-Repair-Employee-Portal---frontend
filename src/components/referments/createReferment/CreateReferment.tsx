import { faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Flex,
  NativeSelect,
  Radio,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { RadioGroup } from '@mantine/core/lib/Radio/RadioGroup/RadioGroup';
import { useEffect, useReducer } from 'react';

import { JOB_POSITIONS } from '../../../constants/data';
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleCheckboxInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { JobPosition, PhoneNumber } from '../../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnUrlValidationText,
} from '../../../utils';
import {
  AccessibleCheckboxInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  StepperWrapper,
} from '../../wrappers';
import {
  CREATE_REFERMENT_DESCRIPTION_MAP,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
} from './constants';
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

    const contactLength = candidateContactNumber.length;
    if (isCandidateContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}-` as PhoneNumber | string,
          });
          break;
        }

        default:
          break;
      }
    }

    createRefermentDispatch({
      type: createRefermentAction.setIsValidCandidateContactNumber,
      payload: isValid,
    });
  }, [candidateContactNumber, isCandidateContactNumberFocused]);

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
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(positionJobDescription);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidPositionJobDescription,
      payload: isValid,
    });
  }, [positionJobDescription]);

  // validate referralReason on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(referralReason);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidReferralReason,
      payload: isValid,
    });
  }, [referralReason]);

  // validate additionalInformation on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    createRefermentDispatch({
      type: createRefermentAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredStepsInError =
      !isValidCandidateFullName ||
      !isValidCandidateEmail ||
      !isValidCandidateContactNumber ||
      !isValidCandidateCurrentJobTitle ||
      !isValidCandidateCurrentCompany;

    const isOptionalStepInError =
      candidateProfileUrl !== '' && !isValidCandidateProfileUrl;

    const isStepInError = areRequiredStepsInError || isOptionalStepInError;

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
    candidateProfileUrl,
  ]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredStepsInError = !isValidReferralReason || !privacyConsent;

    const areOptionalStepsInError =
      (positionJobDescription !== '' && !isValidPositionJobDescription) ||
      (additionalInformation !== '' && !isValidAdditionalInformation);

    const isStepInError = areRequiredStepsInError || areOptionalStepsInError;

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
    positionJobDescription,
    additionalInformation,
    privacyConsent,
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

  const candidateNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateFullNameInputErrorText,
      valid: candidateFullNameInputValidText,
    },
    inputText: candidateFullName,
    isValidInputText: isValidCandidateFullName,
    label: 'Candidate name',
    onBlur: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateFullNameFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createRefermentDispatch({
        type: createRefermentAction.setCandidateFullName,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateFullNameFocused,
        payload: true,
      });
    },
    placeholder: 'Enter full name',
    semanticName: 'candidate full name',
    minLength: 2,
    maxLength: 100,
    required: true,
    withAsterisk: true,
  };

  const candidateEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateEmailInputErrorText,
      valid: candidateEmailInputValidText,
    },
    inputText: candidateEmail,
    isValidInputText: isValidCandidateEmail,
    label: 'Candidate email',
    onBlur: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateEmailFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createRefermentDispatch({
        type: createRefermentAction.setCandidateEmail,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateEmailFocused,
        payload: true,
      });
    },
    placeholder: 'Enter email',
    semanticName: 'candidate email',
    required: true,
    withAsterisk: true,
  };

  const candidateContactNumberPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: candidateContactNumberInputErrorText,
        valid: candidateContactNumberInputValidText,
      },
      inputText: candidateContactNumber,
      isValidInputText: isValidCandidateContactNumber,
      label: 'Candidate contact number',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateContactNumber,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (
            candidateContactNumber.length === 14 ||
            candidateContactNumber.length === 9
          ) {
            createRefermentDispatch({
              type: createRefermentAction.setCandidateContactNumber,
              payload: candidateContactNumber.slice(0, -1) as
                | PhoneNumber
                | string,
            });
          }
        }
      },
      placeholder: 'Enter contact number',
      semanticName: 'candidate contact number',
      required: true,
      withAsterisk: true,
    };

  const candidateProfileUrlTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: candidateProfileUrlInputErrorText,
        valid: candidateProfileUrlInputValidText,
      },
      inputText: candidateProfileUrl,
      isValidInputText: isValidCandidateProfileUrl,
      label: 'Candidate profile URL',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateProfileUrlFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateProfileUrl,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateProfileUrlFocused,
          payload: true,
        });
      },
      placeholder: 'Enter profile URL',
      semanticName: 'candidate profile URL',
    };

  const candidateCurrentJobTitleTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: candidateCurrentJobTitleInputErrorText,
        valid: candidateCurrentJobTitleInputValidText,
      },
      inputText: candidateCurrentJobTitle,
      isValidInputText: isValidCandidateCurrentJobTitle,
      label: 'Candidate current job title',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentJobTitleFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateCurrentJobTitle,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentJobTitleFocused,
          payload: true,
        });
      },
      placeholder: 'Enter current job title',
      semanticName: 'candidate current job title',
      required: true,
      withAsterisk: true,
    };

  const candidateCurrentCompanyTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: candidateCurrentCompanyInputErrorText,
        valid: candidateCurrentCompanyInputValidText,
      },
      inputText: candidateCurrentCompany,
      isValidInputText: isValidCandidateCurrentCompany,
      label: 'Candidate current company',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentCompanyFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateCurrentCompany,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentCompanyFocused,
          payload: true,
        });
      },
      placeholder: 'Enter current company',
      semanticName: 'candidate current company',
      required: true,
      withAsterisk: true,
    };

  const positionReferredForNativeSelectCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      description: 'Position referred for',
      label: 'Job position',
      data: JOB_POSITIONS,
      value: positionReferredFor,
      onChange: (event) => {
        createRefermentDispatch({
          type: createRefermentAction.setPositionReferredFor,
          payload: event.currentTarget.value as JobPosition,
        });
      },
      required: true,
      withAsterisk: true,
    };

  const positionJobDescriptionTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: positionJobDescriptionInputErrorText,
        valid: positionJobDescriptionInputValidText,
      },
      inputText: positionJobDescription,
      isValidInputText: isValidPositionJobDescription,
      label: 'Job description',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsPositionJobDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setPositionJobDescription,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsPositionJobDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter job description',
      semanticName: 'job description',
    };

  const referralReasonTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: referralReasonInputErrorText,
        valid: referralReasonInputValidText,
      },
      inputText: referralReason,
      isValidInputText: isValidReferralReason,
      label: 'Referral reason',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsReferralReasonFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setReferralReason,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsReferralReasonFocused,
          payload: true,
        });
      },
      placeholder: 'Enter referral reason',
      semanticName: 'referral reason',
      required: true,
      withAsterisk: true,
    };

  const additionalInformationTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalInformationInputErrorText,
        valid: additionalInformationInputValidText,
      },
      inputText: additionalInformation,
      isValidInputText: isValidAdditionalInformation,
      label: 'Additional information',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setAdditionalInformation,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: 'Enter additional information',
      semanticName: 'additional information',
    };

  const privacyConsentCheckboxInputCreatorInfo: AccessibleCheckboxInputCreatorInfo =
    {
      description: {
        selected:
          'I acknowledge that the candidate has given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
        deselected:
          'I have not received consent from the candidate to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
      },
      checkboxKind: 'single',
      label: 'Privacy consent',
      semanticName: 'privacy consent',
      accessibleDescription: {
        selected:
          'Privacy consent selected. I acknowledge that the candidate has given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
        deselected:
          'Privacy consent deselected. I have not received consent from the candidate to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
      },
      onChangeSingle: () => {
        createRefermentDispatch({
          type: createRefermentAction.setPrivacyConsent,
          payload: !privacyConsent,
        });
      },
      onClick: () => {
        createRefermentDispatch({
          type: createRefermentAction.setPrivacyConsent,
          payload: true,
        });
      },
      checked: privacyConsent,
      required: true,
    };

  const [
    createdCandidateNameTextInput,
    createdCandidateEmailTextInput,
    createdCandidateProfileUrlTextInput,
    createdCandidateCurrentJobTitleTextInput,
    createdCandidateCurrentCompanyTextInput,
  ] = returnAccessibleTextInputElements([
    candidateNameTextInputCreatorInfo,
    candidateEmailTextInputCreatorInfo,
    candidateProfileUrlTextInputCreatorInfo,
    candidateCurrentJobTitleTextInputCreatorInfo,
    candidateCurrentCompanyTextInputCreatorInfo,
  ]);

  const [createdCandidateContactNumberPhoneInput] =
    returnAccessiblePhoneNumberTextInputElements([
      candidateContactNumberPhoneInputCreatorInfo,
    ]);

  const [
    createdPositionJobDescriptionTextareaInput,
    createdReferralReasonTextareaInput,
    createdAdditionalInformationTextareaInput,
  ] = returnAccessibleTextAreaInputElements([
    positionJobDescriptionTextareaInputCreatorInfo,
    referralReasonTextareaInputCreatorInfo,
    additionalInformationTextareaInputCreatorInfo,
  ]);

  const [createdPrivacyConsentCheckboxInput] =
    returnAccessibleCheckboxInputElements([
      privacyConsentCheckboxInputCreatorInfo,
    ]);

  const [createdPositionReferredForNativeSelectInput] =
    returnAccessibleSelectInputElements([
      positionReferredForNativeSelectCreatorInfo,
    ]);

  const displayCandidateDetailsFormPage = (
    <>
      {createdCandidateNameTextInput}
      {createdCandidateEmailTextInput}
      {createdCandidateContactNumberPhoneInput}
      {createdCandidateProfileUrlTextInput}
      {createdCandidateCurrentJobTitleTextInput}
      {createdCandidateCurrentCompanyTextInput}
    </>
  );

  const displayPositionDetailsFormPage = (
    <>
      {createdPositionReferredForNativeSelectInput}
      {createdPositionJobDescriptionTextareaInput}
      {createdReferralReasonTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdPrivacyConsentCheckboxInput}
    </>
  );

  const displayReviewFormPage = <h4>review</h4>;

  const displayCreateRefermentForm =
    currentStepperPosition === 0
      ? displayCandidateDetailsFormPage
      : currentStepperPosition === 1
      ? displayPositionDetailsFormPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : null;

  const displayFormSubmitButton =
    currentStepperPosition === CREATE_REFERMENT_MAX_STEPPER_POSITION ? (
      <Button type="button" variant="filled" disabled={stepsInError.size > 0}>
        Submit
      </Button>
    ) : null;

  const displayCreateRefermentComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionMap={CREATE_REFERMENT_DESCRIPTION_MAP}
      maxStepperPosition={CREATE_REFERMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createRefermentDispatch}
      setCurrentStepperPosition={
        createRefermentAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      <form onSubmit={handleCreateRefermentFormSubmit}>
        {displayCreateRefermentForm}
        {displayFormSubmitButton}
      </form>
    </StepperWrapper>
  );

  async function handleCreateRefermentFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <Flex direction="column" align="center" justify="center" w="400px">
      {displayCreateRefermentComponent}
    </Flex>
  );
}

export { CreateReferment };

/**
 * const displayCandidateDetailsFormPage = (
    <Flex direction="column" align="center" justify="center" w={400}>
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate name"
        aria-required
        aria-describedby={
          isValidCandidateFullName
            ? 'candidate-full-name-input-note-valid'
            : 'candidate-full-name-input-note-error'
        }
        description={
          isValidCandidateFullName
            ? candidateFullNameInputValidText
            : candidateFullNameInputErrorText
        }
        placeholder="Enter full name"
        autoComplete="off"
        aria-invalid={isValidCandidateFullName ? false : true}
        value={candidateFullName}
        icon={
          isValidCandidateFullName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidCandidateFullName && candidateFullName !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateFullName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateFullNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateFullNameFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={100}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate email"
        aria-required
        aria-describedby={
          isValidCandidateEmail
            ? 'candidate-email-input-note-valid'
            : 'candidate-email-input-note-error'
        }
        description={
          isValidCandidateEmail
            ? candidateEmailInputValidText
            : candidateEmailInputErrorText
        }
        placeholder="Enter email"
        autoComplete="off"
        aria-invalid={isValidCandidateEmail ? false : true}
        value={candidateEmail}
        icon={
          isValidCandidateEmail ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidCandidateEmail && candidateEmail !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateEmail,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateEmailFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateEmailFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate contact number"
        aria-required
        aria-describedby={
          isValidCandidateContactNumber
            ? 'candidate-contact-number-input-note-valid'
            : 'candidate-contact-number-input-note-error'
        }
        description={
          isValidCandidateContactNumber
            ? candidateContactNumberInputValidText
            : candidateContactNumberInputErrorText
        }
        placeholder="Enter contact number"
        autoComplete="off"
        aria-invalid={isValidCandidateContactNumber ? false : true}
        value={candidateContactNumber}
        onKeyDown={(event) => {
          if (event.key === 'Backspace') {
            if (candidateContactNumber.length === 14) {
              createRefermentDispatch({
                type: createRefermentAction.setCandidateContactNumber,
                payload: candidateContactNumber.slice(0, -1) as
                  | PhoneNumber
                  | string,
              });
            } else if (candidateContactNumber.length === 9) {
              createRefermentDispatch({
                type: createRefermentAction.setCandidateContactNumber,
                payload: candidateContactNumber.slice(0, -1) as
                  | PhoneNumber
                  | string,
              });
            }
          }
        }}
        rightSection={
          <Tooltip label="Reset value to +(1)">
            <Button
              type="button"
              size="xs"
              variant="white"
              aria-label="Reset personal contact number value to +(1)"
              mr="md"
            >
              <FontAwesomeIcon
                icon={faRefresh}
                cursor="pointer"
                color="gray"
                onClick={() => {
                  createRefermentDispatch({
                    type: createRefermentAction.setCandidateContactNumber,
                    payload: candidateContactNumber,
                  });
                }}
              />
            </Button>
          </Tooltip>
        }
        icon={
          isValidCandidateContactNumber ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={
          !isValidCandidateContactNumber && candidateContactNumber !== '+(1)'
        }
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateContactNumber,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateContactNumberFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateContactNumberFocused,
            payload: false,
          });
        }}
        maxLength={18}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate current job title"
        aria-required
        aria-describedby={
          isValidCandidateCurrentJobTitle
            ? 'candidate-current-job-title-input-note-valid'
            : 'candidate-current-job-title-input-note-error'
        }
        description={
          isValidCandidateCurrentJobTitle
            ? candidateCurrentJobTitleInputValidText
            : candidateCurrentJobTitleInputErrorText
        }
        placeholder="Enter current job title"
        autoComplete="off"
        aria-invalid={isValidCandidateCurrentJobTitle ? false : true}
        value={candidateCurrentJobTitle}
        icon={
          isValidCandidateCurrentJobTitle ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={
          !isValidCandidateCurrentJobTitle && candidateCurrentJobTitle !== ''
        }
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateCurrentJobTitle,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateCurrentJobTitleFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateCurrentJobTitleFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={50}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate current company"
        aria-required
        aria-describedby={
          isValidCandidateCurrentCompany
            ? 'candidate-current-company-input-note-valid'
            : 'candidate-current-company-input-note-error'
        }
        description={
          isValidCandidateCurrentCompany
            ? candidateCurrentCompanyInputValidText
            : candidateCurrentCompanyInputErrorText
        }
        placeholder="Enter current company"
        autoComplete="off"
        aria-invalid={isValidCandidateCurrentCompany ? false : true}
        value={candidateCurrentCompany}
        icon={
          isValidCandidateCurrentCompany ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={
          !isValidCandidateCurrentCompany && candidateCurrentCompany !== ''
        }
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateCurrentCompany,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateCurrentCompanyFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateCurrentCompanyFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={50}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Candidate profile url"
        aria-required
        aria-describedby={
          isValidCandidateProfileUrl
            ? 'candidate-profile-url-input-note-valid'
            : 'candidate-profile-url-input-note-error'
        }
        description={
          isValidCandidateProfileUrl
            ? candidateProfileUrlInputValidText
            : candidateProfileUrlInputErrorText
        }
        placeholder="Enter profile url"
        autoComplete="off"
        aria-invalid={isValidCandidateProfileUrl ? false : true}
        value={candidateProfileUrl}
        icon={
          isValidCandidateProfileUrl ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidCandidateProfileUrl && candidateProfileUrl !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setCandidateProfileUrl,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateProfileUrlFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsCandidateProfileUrlFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
      />
    </Flex>
  );

  const displayPositionDetailsFormPage = (
    <Flex direction="column" align="center" justify="center" w={400}>
      <NativeSelect
        size="sm"
        data={JOB_POSITIONS}
        label="Job position"
        description="Position referred for"
        value={positionReferredFor}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setPositionReferredFor,
            payload: event.currentTarget.value as JobPosition,
          });
        }}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Job description"
        aria-required
        aria-describedby={
          isValidPositionJobDescription
            ? 'position-job-description-input-note-valid'
            : 'position-job-description-input-note-error'
        }
        description={
          isValidPositionJobDescription
            ? positionJobDescriptionInputValidText
            : positionJobDescriptionInputErrorText
        }
        placeholder="Enter job description"
        autoComplete="off"
        aria-invalid={isValidPositionJobDescription ? false : true}
        value={positionJobDescription}
        icon={
          isValidPositionJobDescription ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPositionJobDescription && positionJobDescription !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setPositionJobDescription,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsPositionJobDescriptionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsPositionJobDescriptionFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={5}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Referral reason"
        aria-required
        aria-describedby={
          isValidReferralReason
            ? 'referral-reason-input-note-valid'
            : 'referral-reason-input-note-error'
        }
        description={
          isValidReferralReason
            ? referralReasonInputValidText
            : referralReasonInputErrorText
        }
        placeholder="Enter referral reason"
        autoComplete="off"
        aria-invalid={isValidReferralReason ? false : true}
        value={referralReason}
        icon={
          isValidReferralReason ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidReferralReason && referralReason !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setReferralReason,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsReferralReasonFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsReferralReasonFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={5}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Additional information"
        aria-required
        aria-describedby={
          isValidAdditionalInformation
            ? 'additional-information-input-note-valid'
            : 'additional-information-input-note-error'
        }
        description={
          isValidAdditionalInformation
            ? additionalInformationInputValidText
            : additionalInformationInputErrorText
        }
        placeholder="Enter additional information"
        autoComplete="off"
        aria-invalid={isValidAdditionalInformation ? false : true}
        value={additionalInformation}
        icon={
          isValidAdditionalInformation ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAdditionalInformation && additionalInformation !== ''}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setAdditionalInformation,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsAdditionalInformationFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createRefermentDispatch({
            type: createRefermentAction.setIsAdditionalInformationFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={5}
      />

      <Radio
        size="sm"
        label="Privacy consent"
        description={
          privacyConsent
            ? 'I acknowledge that the candidate has given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.'
            : 'The candidate has not given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.'
        }
        aria-required
        aria-label={
          privacyConsent ? 'Privacy consent given' : 'Privacy consent not given'
        }
        checked={privacyConsent}
        onChange={(event) => {
          createRefermentDispatch({
            type: createRefermentAction.setPrivacyConsent,
            payload: event.currentTarget.checked,
          });
        }}
        onClick={() => {
          createRefermentDispatch({
            type: createRefermentAction.setPrivacyConsent,
            payload: !privacyConsent,
          });
        }}
      />
    </Flex>
  );
 */
