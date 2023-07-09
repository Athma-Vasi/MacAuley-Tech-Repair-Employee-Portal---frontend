import { faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Flex,
  NativeSelect,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { URGENCY_DATA } from '../../constants/data';
import {
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../constants/regex';
import { returnAccessibleTextElements } from '../../jsxCreators';
import { PhoneNumber, Urgency } from '../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
} from '../../utils';
import { StepperWrapper } from '../stepperWrapper';
import {
  ANONYMOUS_REQUEST_KINDS,
  CREATE_ANON_REQUEST_DESCRIPTION_MAP,
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
    const isStepInError =
      !isValidTitle ||
      !isValidSecureContactNumber ||
      !isValidSecureContactEmail ||
      !isValidRequestDescription ||
      !isValidAdditionalInformation;

    // if any of the steps are in error, set the stepper position 1
    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidTitle,
    isValidSecureContactNumber,
    isValidSecureContactEmail,
    isValidRequestDescription,
    isValidAdditionalInformation,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleTextElements({
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
    returnAccessibleTextElements({
      inputElementKind: 'secure contact number',
      inputText: secureContactNumber,
      isInputTextFocused: isSecureContactNumberFocused,
      isValidInputText: isValidSecureContactNumber,
      regexValidationText: returnPhoneNumberValidationText(secureContactNumber),
    });

  const [secureContactEmailInputErrorText, secureContactEmailInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'secure contact email',
      inputText: secureContactEmail,
      isInputTextFocused: isSecureContactEmailFocused,
      isValidInputText: isValidSecureContactEmail,
      regexValidationText: returnEmailValidationText(secureContactEmail),
    });

  const [requestDescriptionInputErrorText, requestDescriptionInputValidText] =
    returnAccessibleTextElements({
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
  ] = returnAccessibleTextElements({
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

  const titleTextInput = (
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

  const secureContactNumberTextInput = (
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
                  payload: secureContactNumber,
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

  const secureContactEmailTextInput = (
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

  const requestKindSelectInput = (
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

  const requestDescriptionTextareaInput = (
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

  const additionalInformationTextareaInput = (
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

  const requestUrgencySelectInput = (
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

  const displayAnonRequestDetailsFormPage = (
    <>
      {titleTextInput}
      {secureContactNumberTextInput}
      {secureContactEmailTextInput}
      {requestKindSelectInput}
      {requestDescriptionTextareaInput}
      {additionalInformationTextareaInput}
      {requestUrgencySelectInput}
    </>
  );

  const displayReviewFormPage = <h2>review page</h2>;

  const displayCreateAnonymousRequestForm =
    currentStepperPosition === 0
      ? displayAnonRequestDetailsFormPage
      : currentStepperPosition === 1
      ? displayReviewFormPage
      : null;

  const displayFormSubmitButton =
    currentStepperPosition === CREATE_ANON_REQUEST_MAX_STEPPER_POSITION ? (
      <Button type="button" variant="filled" disabled={stepsInError.size > 0}>
        Submit
      </Button>
    ) : null;

  async function handleCreateAnonymousRequestFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  const displayCreateAnonymousRequestComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionMap={CREATE_ANON_REQUEST_DESCRIPTION_MAP}
      maxStepperPosition={CREATE_ANON_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={createAnonymousRequestDispatch}
      setCurrentStepperPosition={
        createAnonymousRequestAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      <form onSubmit={handleCreateAnonymousRequestFormSubmit}>
        {displayCreateAnonymousRequestForm}
        {displayFormSubmitButton}
      </form>
    </StepperWrapper>
  );

  //
  //
  //
  return (
    <Flex direction="column" align="center" justify="center" w="400px">
      {displayCreateAnonymousRequestComponent}
    </Flex>
  );
}

export { CreateAnonymousRequest };
