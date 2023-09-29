import { Group, Title, Tooltip } from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useReducer,
} from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
} from '../../../constants/data';
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  Department,
  JobPosition,
  PhoneNumber,
  ResourceRequestServerResponse,
} from '../../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnUrlValidationText,
  urlBuilder,
} from '../../../utils';
import { NotificationModal } from '../../notificationModal';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  CREATE_REFERMENT_DESCRIPTION_OBJECTS,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
} from '../constants';
import {
  createRefermentAction,
  createRefermentReducer,
  initialCreateRefermentState,
} from './state';
import { RefermentDocument } from './types';
import { useDisclosure } from '@mantine/hooks';

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

    departmentReferredFor,
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

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRefermentState;

  const { globalDispatch } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function handleCreateRefermentFormSubmit() {
      createRefermentDispatch({
        type: createRefermentAction.setIsSubmitting,
        payload: true,
      });
      createRefermentDispatch({
        type: createRefermentAction.setSubmitMessage,
        payload: `Submitting candidate ${candidateFullName} for referment...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: 'actions/general/referment' });

      const body = JSON.stringify({
        referment: {
          candidateFullName,
          candidateEmail,
          candidateContactNumber,
          candidateCurrentJobTitle,
          candidateCurrentCompany,
          candidateProfileUrl,
          departmentReferredFor,
          positionReferredFor,
          positionJobDescription,
          referralReason,
          additionalInformation,
          privacyConsent,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ResourceRequestServerResponse<RefermentDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createRefermentDispatch({
          type: createRefermentAction.setIsSuccessful,
          payload: true,
        });
        createRefermentDispatch({
          type: createRefermentAction.setSuccessMessage,
          payload:
            data.message ??
            `Successfully submitted candidate ${candidateFullName} for referment.`,
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          createRefermentDispatch({
            type: createRefermentAction.setIsSubmitting,
            payload: false,
          });
          createRefermentDispatch({
            type: createRefermentAction.setSubmitMessage,
            payload: '',
          });
          createRefermentDispatch({
            type: createRefermentAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleCreateRefermentFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only run on triggerFormSubmit change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

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
        step: 0,
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
        step: 1,
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
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'candidate email',
      inputText: candidateEmail,
      isInputTextFocused: isCandidateEmailFocused,
      isValidInputText: isValidCandidateEmail,
      regexValidationText: returnEmailValidationText({
        content: candidateEmail,
        contentKind: 'candidate email',
      }),
    });

  const [
    candidateContactNumberInputErrorText,
    candidateContactNumberInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'candidate contact number',
    inputText: candidateContactNumber,
    isInputTextFocused: isCandidateContactNumberFocused,
    isValidInputText: isValidCandidateContactNumber,
    regexValidationText: returnPhoneNumberValidationText({
      content: candidateContactNumber,
      contentKind: 'candidate contact number',
    }),
  });

  const [
    candidateCurrentJobTitleInputErrorText,
    candidateCurrentJobTitleInputValidText,
  ] = AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'candidate profile url',
      inputText: candidateProfileUrl,
      isInputTextFocused: isCandidateProfileUrlFocused,
      isValidInputText: isValidCandidateProfileUrl,
      regexValidationText: returnUrlValidationText({
        content: candidateProfileUrl,
        contentKind: 'candidate profile url',
      }),
    });

  const [
    positionJobDescriptionInputErrorText,
    positionJobDescriptionInputValidText,
  ] = AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: privacyConsent,
      semanticName: 'privacy consent',
      selectedDescription:
        'I acknowledge that the candidate has given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
      deselectedDescription:
        'I have not received consent from the candidate to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.',
    });

  const candidateNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateFullNameInputErrorText,
      valid: candidateFullNameInputValidText,
    },
    inputText: candidateFullName,
    isValidInputText: isValidCandidateFullName,
    label: 'Candidate Name',
    onBlur: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateFullNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRefermentDispatch({
        type: createRefermentAction.setCandidateFullName,
        payload: event.currentTarget.value,
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
    label: 'Candidate Email',
    onBlur: () => {
      createRefermentDispatch({
        type: createRefermentAction.setIsCandidateEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRefermentDispatch({
        type: createRefermentAction.setCandidateEmail,
        payload: event.currentTarget.value,
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
      label: 'Candidate Contact Number',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
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
      label: 'Candidate Profile URL',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateProfileUrlFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateProfileUrl,
          payload: event.currentTarget.value,
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
      label: 'Candidate Current Job Title',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentJobTitleFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateCurrentJobTitle,
          payload: event.currentTarget.value,
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
      label: 'Candidate Current Company',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsCandidateCurrentCompanyFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setCandidateCurrentCompany,
          payload: event.currentTarget.value,
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

  const departmentReferredForSelectCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      description: 'Department referred for',
      label: 'Department',
      data: DEPARTMENT_DATA,
      value: departmentReferredFor,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setDepartmentReferredFor,
          payload: event.currentTarget.value as Department,
        });
      },
      required: true,
      withAsterisk: true,
    };

  const positionReferredForSelectCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      description: 'Position referred for',
      label: 'Job Position',
      data: DEPARTMENT_JOB_POSITION_MAP.get(departmentReferredFor) ?? [],
      value: positionReferredFor,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
      label: 'Job Description',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsPositionJobDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setPositionJobDescription,
          payload: event.currentTarget.value,
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
      label: 'Referral Reason',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsReferralReasonFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setReferralReason,
          payload: event.currentTarget.value,
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
      label: 'Additional Information',
      onBlur: () => {
        createRefermentDispatch({
          type: createRefermentAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setAdditionalInformation,
          payload: event.currentTarget.value,
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

  const privacyConsentCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: acknowledgementInputSelectedText,
        deselected: acknowledgementInputDeselectedText,
      },
      checked: privacyConsent,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRefermentDispatch({
          type: createRefermentAction.setPrivacyConsent,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: 'privacy consent',
      label: 'Privacy consent',
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create referment form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createRefermentDispatch({
        type: createRefermentAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
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
    returnAccessibleCheckboxSingleInputElements([
      privacyConsentCheckboxInputCreatorInfo,
    ]);

  const [
    createdDepartmentReferredForSelectInput,
    createdPositionReferredForSelectInput,
  ] = returnAccessibleSelectInputElements([
    departmentReferredForSelectCreatorInfo,
    positionReferredForSelectCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_REFERMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting'
            : 'Submit Referment form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayCandidateDetailsFormPage = (
    <FormLayoutWrapper>
      {createdCandidateNameTextInput}
      {createdCandidateEmailTextInput}
      {createdCandidateContactNumberPhoneInput}
      {createdCandidateProfileUrlTextInput}
      {createdCandidateCurrentJobTitleTextInput}
      {createdCandidateCurrentCompanyTextInput}
    </FormLayoutWrapper>
  );

  const displayPositionDetailsFormPage = (
    <FormLayoutWrapper>
      {createdDepartmentReferredForSelectInput}
      {createdPositionReferredForSelectInput}
      {createdPositionJobDescriptionTextareaInput}
      {createdReferralReasonTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdPrivacyConsentCheckboxInput}
    </FormLayoutWrapper>
  );

  const REFERMENT_REVIEW_OBJECT: FormReviewObject = {
    'Candidate Details': [
      {
        inputName: 'Candidate Name',
        inputValue: candidateFullName,
        isInputValueValid: isValidCandidateFullName,
      },
      {
        inputName: 'Candidate Email',
        inputValue: candidateEmail,
        isInputValueValid: isValidCandidateEmail,
      },
      {
        inputName: 'Candidate Contact Number',
        inputValue: candidateContactNumber,
        isInputValueValid: isValidCandidateContactNumber,
      },
      {
        inputName: 'Candidate Profile URL',
        inputValue: candidateProfileUrl,
        isInputValueValid: isValidCandidateProfileUrl,
      },
      {
        inputName: 'Candidate Current Job Title',
        inputValue: candidateCurrentJobTitle,
        isInputValueValid: isValidCandidateCurrentJobTitle,
      },
      {
        inputName: 'Candidate Current Company',
        inputValue: candidateCurrentCompany,
        isInputValueValid: isValidCandidateCurrentCompany,
      },
    ],
    'Position Details': [
      {
        inputName: 'Department',
        inputValue: departmentReferredFor,
        isInputValueValid: true,
      },
      {
        inputName: 'Job Position',
        inputValue: positionReferredFor,
        isInputValueValid: true,
      },
      {
        inputName: 'Job Description',
        inputValue: positionJobDescription,
        isInputValueValid: isValidPositionJobDescription,
      },
      {
        inputName: 'Referral Reason',
        inputValue: referralReason,
        isInputValueValid: isValidReferralReason,
      },
      {
        inputName: 'Additional Information',
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: 'Privacy Consent',
        inputValue: privacyConsent ? 'Yes' : 'No',
        isInputValueValid: privacyConsent,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage
      formReviewObject={REFERMENT_REVIEW_OBJECT}
      formName="Referment"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/general/referment/display');
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

  const displayCreateRefermentForm =
    currentStepperPosition === 0
      ? displayCandidateDetailsFormPage
      : currentStepperPosition === 1
      ? displayPositionDetailsFormPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayCreateRefermentComponent = (
    <StepperWrapper
      childrenTitle="Referment"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_REFERMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_REFERMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createRefermentDispatch}
      setCurrentStepperPosition={
        createRefermentAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateRefermentForm}
    </StepperWrapper>
  );

  return displayCreateRefermentComponent;
}

export default CreateReferment;
