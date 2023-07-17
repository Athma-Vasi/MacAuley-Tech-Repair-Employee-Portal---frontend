import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useReducer,
} from 'react';

import { URGENCY_DATA } from '../../constants/data';
import {
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { PhoneNumber, Urgency } from '../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../wrappers';
import {
  ANONYMOUS_REQUEST_KINDS,
  CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
} from './constants';
import {
  createAnonymousRequestAction,
  createAnonymousRequestReducer,
  initialCreateAnonymousRequestState,
} from './state';
import { AnonymousRequestKind } from './types';

function CreateAnonymousRequest() {
  const [createAnonymousRequestState, createAnonymousRequestDispatch] =
    useReducer(
      createAnonymousRequestReducer,
      initialCreateAnonymousRequestState
    );
  const {
    title,
    isValidTitle,
    isTitleFocused,

    secureContactNumber,
    isValidSecureContactNumber,
    isSecureContactNumberFocused,

    secureContactEmail,
    isValidSecureContactEmail,
    isSecureContactEmailFocused,

    requestKind,

    requestDescription,
    isValidRequestDescription,
    isRequestDescriptionFocused,

    additionalInformation,
    isValidAdditionalInformation,
    isAdditionalInformationFocused,

    urgency,

    triggerFormSubmit,
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
  } = createAnonymousRequestState;

  // validate title on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate secure contact number on every input change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(secureContactNumber);

    const contactLength = secureContactNumber.length;
    if (isSecureContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          createAnonymousRequestDispatch({
            type: createAnonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          createAnonymousRequestDispatch({
            type: createAnonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          createAnonymousRequestDispatch({
            type: createAnonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}-` as PhoneNumber | string,
          });
          break;
        }

        default:
          break;
      }
    }

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidSecureContactNumber,
      payload: isValid,
    });
  }, [secureContactNumber, isSecureContactNumberFocused]);

  // validate secure contact email on every input change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(secureContactEmail);

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidSecureContactEmail,
      payload: isValid,
    });
  }, [secureContactEmail]);

  // validate request description on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(requestDescription);

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidRequestDescription,
      payload: isValid,
    });
  }, [requestDescription]);

  // validate additional information on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredInputsInError =
      !isValidTitle || !isValidSecureContactEmail;
    const isOptionalInputInError =
      !isValidSecureContactNumber && secureContactNumber !== '+(1)';

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    // if any of the steps are in error, set the stepper position 1
    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isValidTitle,
    isValidSecureContactEmail,
    isValidSecureContactNumber,
    secureContactNumber,
  ]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const isRequiredInputInError = !isValidRequestDescription;
    const isOptionalInputInError =
      !isValidAdditionalInformation && additionalInformation !== '';
    const isStepInError = isRequiredInputInError || isOptionalInputInError;

    // if any of the steps are in error, set the stepper position 2
    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidRequestDescription,
    isValidAdditionalInformation,
    additionalInformation,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'title',
      inputText: title,
      isInputTextFocused: isTitleFocused,
      isValidInputText: isValidTitle,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'title',
        content: title,
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [secureContactNumberInputErrorText, secureContactNumberInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'secure contact number',
      inputText: secureContactNumber,
      isInputTextFocused: isSecureContactNumberFocused,
      isValidInputText: isValidSecureContactNumber,
      regexValidationText: returnPhoneNumberValidationText(secureContactNumber),
    });

  const [secureContactEmailInputErrorText, secureContactEmailInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'secure contact email',
      inputText: secureContactEmail,
      isInputTextFocused: isSecureContactEmailFocused,
      isValidInputText: isValidSecureContactEmail,
      regexValidationText: returnEmailValidationText(secureContactEmail),
    });

  const [requestDescriptionInputErrorText, requestDescriptionInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'request description',
      inputText: requestDescription,
      isInputTextFocused: isRequestDescriptionFocused,
      isValidInputText: isValidRequestDescription,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'request description',
        content: requestDescription,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [
    additionalInformationInputErrorText,
    additionalInformationInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'additional information',
    inputText: additionalInformation,
    isInputTextFocused: isAdditionalInformationFocused,
    isValidInputText: isValidAdditionalInformation,
    regexValidationText: returnGrammarValidationText({
      contentKind: 'additional information',
      content: additionalInformation,
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: 'Title',
    onBlur: () => {
      createAnonymousRequestDispatch({
        type: createAnonymousRequestAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createAnonymousRequestDispatch({
        type: createAnonymousRequestAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createAnonymousRequestDispatch({
        type: createAnonymousRequestAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter title of request',
    semanticName: 'title',
    required: true,
    withAsterisk: true,
  };

  const secureContactNumberTextInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: secureContactNumberInputErrorText,
        valid: secureContactNumberInputValidText,
      },
      inputText: secureContactNumber,
      isValidInputText: isValidSecureContactNumber,
      label: 'Contact number',
      onBlur: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setSecureContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (
            secureContactNumber.length === 14 ||
            secureContactNumber.length === 9
          ) {
            createAnonymousRequestDispatch({
              type: createAnonymousRequestAction.setSecureContactNumber,
              payload: secureContactNumber.slice(0, -1) as PhoneNumber | string,
            });
          }
        }
      },
      placeholder: 'Enter secure contact number',
      rightSection: true,
      rightSectionOnClick: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setSecureContactNumber,
          payload: '+(1)',
        });
      },
      semanticName: 'secure contact number',
      maxLength: 18,
    };

  const secureContactEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: secureContactEmailInputErrorText,
        valid: secureContactEmailInputValidText,
      },
      inputText: secureContactEmail,
      isValidInputText: isValidSecureContactEmail,
      label: 'Contact email',
      onBlur: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactEmailFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setSecureContactEmail,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactEmailFocused,
          payload: true,
        });
      },
      placeholder: 'Enter secure contact email',
      semanticName: 'secure contact email',
      withAsterisk: true,
      required: true,
    };

  const requestKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: ANONYMOUS_REQUEST_KINDS,
    description: 'Select the kind of request',
    label: 'Request kind',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      createAnonymousRequestDispatch({
        type: createAnonymousRequestAction.setRequestKind,
        payload: event.currentTarget.value as AnonymousRequestKind,
      });
    },
    value: requestKind,
    required: true,
    withAsterisk: true,
  };

  const requestDescriptionTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: requestDescriptionInputErrorText,
        valid: requestDescriptionInputValidText,
      },
      inputText: requestDescription,
      isValidInputText: isValidRequestDescription,
      label: 'Description',
      onBlur: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsRequestDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setRequestDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsRequestDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter description of request',
      semanticName: 'request description',
      maxRows: 10,
      withAsterisk: true,
      required: true,
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
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: 'Enter any other relevant additional information',
      semanticName: 'additional information',
      maxRows: 10,
    };

  const requestUrgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: URGENCY_DATA,
      description: 'Select the urgency of request',
      label: 'Request urgency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setUrgency,
          payload: event.currentTarget.value as Urgency,
        });
      },
      value: urgency,
      withAsterisk: true,
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create anonymous request form submit button',
    semanticName: 'submit button',
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createAnonymousRequestDispatch({
        type: createAnonymousRequestAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdTitleTextInput, createdSecureContactEmailTextInput] =
    returnAccessibleTextInputElements([
      titleTextInputCreatorInfo,
      secureContactEmailTextInputCreatorInfo,
    ]);

  const [createdSecureContactNumberTextInput] =
    returnAccessiblePhoneNumberTextInputElements([
      secureContactNumberTextInputCreatorInfo,
    ]);

  const [createdRequestKindSelectInput, createdRequestUrgencySelectInput] =
    returnAccessibleSelectInputElements([
      requestKindSelectInputCreatorInfo,
      requestUrgencySelectInputCreatorInfo,
    ]);

  const [
    createdRequestDescriptionTextareaInput,
    createdAdditionalInformationTextareaInput,
  ] = returnAccessibleTextAreaInputElements([
    requestDescriptionTextareaInputCreatorInfo,
    additionalInformationTextareaInputCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ANON_REQUEST_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayAnonRequestFirstPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdSecureContactNumberTextInput}
      {createdSecureContactEmailTextInput}
      {createdRequestKindSelectInput}
    </FormLayoutWrapper>
  );

  const displayAnonRequestSecondPage = (
    <FormLayoutWrapper>
      {createdRequestDescriptionTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdRequestUrgencySelectInput}
    </FormLayoutWrapper>
  );

  const displayReviewFormPage = <h2>review page</h2>;

  const displayCreateAnonymousRequestForm =
    currentStepperPosition === 0
      ? displayAnonRequestFirstPage
      : currentStepperPosition === 1
      ? displayAnonRequestSecondPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  useEffect(() => {
    async function handleCreateAnonymousRequestFormSubmit() {
      console.log('anonymous form submitted');
    }

    if (triggerFormSubmit) {
      handleCreateAnonymousRequestFormSubmit();
    }
  }, [triggerFormSubmit]);

  const displayCreateAnonymousRequestComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ANON_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={createAnonymousRequestDispatch}
      setCurrentStepperPosition={
        createAnonymousRequestAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displayCreateAnonymousRequestForm}
    </StepperWrapper>
  );

  return <>{displayCreateAnonymousRequestComponent}</>;
}

export { CreateAnonymousRequest };

/**
 * const titleTextInput = (
    <TextInput
      size="sm"
      w="100%"
      color="dark"
      label="Title"
      aria-required
      aria-describedby={
        isValidTitle ? 'title-input-note-valid' : 'title-input-note-error'
      }
      description={isValidTitle ? titleInputValidText : titleInputErrorText}
      placeholder="Enter title of request"
      autoComplete="off"
      aria-invalid={isValidTitle ? false : true}
      value={title}
      icon={
        isValidTitle ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
      }
      error={!isValidTitle && title !== ''}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setTitle,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsTitleFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsTitleFocused,
          payload: false,
        });
      }}
      minLength={2}
      maxLength={75}
      withAsterisk
      required
    />
  );

 */

/**
 * const secureContactNumberTextInput = (
    <TextInput
      size="sm"
      w="100%"
      color="dark"
      label="Contact number"
      aria-required
      aria-describedby={
        isValidSecureContactNumber
          ? 'secure-contact-number-input-note-valid'
          : 'secure-contact-number-input-note-error'
      }
      description={
        isValidSecureContactNumber
          ? secureContactNumberInputValidText
          : secureContactNumberInputErrorText
      }
      placeholder="Enter secure contact number"
      autoComplete="off"
      aria-invalid={isValidSecureContactNumber ? false : true}
      value={secureContactNumber}
      onKeyDown={(event) => {
        if (event.key === 'Backspace') {
          if (secureContactNumber.length === 14) {
            createAnonymousRequestDispatch({
              type: createAnonymousRequestAction.setSecureContactNumber,
              payload: secureContactNumber.slice(0, -1) as PhoneNumber | string,
            });
          } else if (secureContactNumber.length === 9) {
            createAnonymousRequestDispatch({
              type: createAnonymousRequestAction.setSecureContactNumber,
              payload: secureContactNumber.slice(0, -1) as PhoneNumber | string,
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
            aria-label="Reset secure contact number value to +(1)"
            mr="md"
          >
            <FontAwesomeIcon
              icon={faRefresh}
              cursor="pointer"
              color="gray"
              onClick={() => {
                createAnonymousRequestDispatch({
                  type: createAnonymousRequestAction.setSecureContactNumber,
                  payload: '+(1)' as PhoneNumber | string,
                });
              }}
            />
          </Button>
        </Tooltip>
      }
      icon={
        isValidSecureContactNumber ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      error={!isValidSecureContactNumber && secureContactNumber !== '+(1)'}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setSecureContactNumber,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactNumberFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactNumberFocused,
          payload: false,
        });
      }}
      maxLength={18}
      withAsterisk
      required
    />
  );
 */

/**
 * const secureContactEmailTextInput = (
    <TextInput
      size="sm"
      w="100%"
      color="dark"
      label="Contact email"
      aria-required
      aria-describedby={
        isValidSecureContactEmail
          ? 'secure-contact-email-input-note-valid'
          : 'secure-contact-email-input-note-error'
      }
      description={
        isValidSecureContactEmail
          ? secureContactEmailInputValidText
          : secureContactEmailInputErrorText
      }
      placeholder="Enter secure contact email"
      autoComplete="off"
      aria-invalid={isValidSecureContactEmail ? false : true}
      value={secureContactEmail}
      icon={
        isValidSecureContactEmail ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      error={!isValidSecureContactEmail && secureContactEmail !== ''}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setSecureContactEmail,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactEmailFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsSecureContactEmailFocused,
          payload: false,
        });
      }}
      withAsterisk
      required
    />
  );
 */

/**
 * const requestDescriptionTextareaInput = (
    <Textarea
      size="sm"
      w="100%"
      color="dark"
      label="Description"
      aria-required
      aria-describedby={
        isValidRequestDescription
          ? 'request-description-input-note-valid'
          : 'request-description-input-note-error'
      }
      description={
        isValidRequestDescription
          ? requestDescriptionInputValidText
          : requestDescriptionInputErrorText
      }
      placeholder="Enter description of request"
      autoComplete="off"
      aria-invalid={isValidRequestDescription ? false : true}
      value={requestDescription}
      icon={
        isValidRequestDescription ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      error={!isValidRequestDescription && requestDescription !== ''}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setRequestDescription,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsRequestDescriptionFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsRequestDescriptionFocused,
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
  );
 */

/**
 * const additionalInformationTextareaInput = (
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
      placeholder="Enter any other relevant additional information"
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
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsAdditionalInformationFocused,
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
  );
 */

/**
 * const requestKindSelectInput = (
    <NativeSelect
      size="sm"
      data={ANONYMOUS_REQUEST_KINDS}
      label="Request kind"
      description="Select the kind of request"
      value={requestKind}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setRequestKind,
          payload: event.currentTarget.value as AnonymousRequestKind,
        });
      }}
      withAsterisk
      required
    />
  );
 */

/**
 * const requestUrgencySelectInput = (
    <NativeSelect
      size="sm"
      data={URGENCY_DATA}
      label="Request urgency"
      description="Select the urgency of request"
      value={urgency}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setUrgency,
          payload: event.currentTarget.value as Urgency,
        });
      }}
      withAsterisk
      required
    />
  );
 */
