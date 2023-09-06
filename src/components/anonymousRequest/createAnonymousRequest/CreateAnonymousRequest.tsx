import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useReducer,
} from 'react';
import { TbUpload } from 'react-icons/tb';

import { URGENCY_DATA } from '../../../constants/data';
import {
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../constants/regex';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { PhoneNumber, Urgency } from '../../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  ANONYMOUS_REQUEST_KINDS,
  CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
} from '../constants';
import {
  createAnonymousRequestAction,
  createAnonymousRequestReducer,
  initialCreateAnonymousRequestState,
} from './state';
import { AnonymousRequestKind } from './types';
import { Group, Tooltip } from '@mantine/core';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';

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
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'secure contact number',
      inputText: secureContactNumber,
      isInputTextFocused: isSecureContactNumberFocused,
      isValidInputText: isValidSecureContactNumber,
      regexValidationText: returnPhoneNumberValidationText(secureContactNumber),
    });

  const [secureContactEmailInputErrorText, secureContactEmailInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'secure contact email',
      inputText: secureContactEmail,
      isInputTextFocused: isSecureContactEmailFocused,
      isValidInputText: isValidSecureContactEmail,
      regexValidationText: returnEmailValidationText(secureContactEmail),
    });

  const [requestDescriptionInputErrorText, requestDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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
      label: 'Secure Contact Number',
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
      label: 'Secure Contact Email',
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
    label: 'Request Kind',
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
      label: 'Additional Information',
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
      label: 'Urgency',
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
    leftIcon: <TbUpload />,
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
    currentStepperPosition === CREATE_ANON_REQUEST_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form'
            : 'Submit Anonymous Request form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

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

  const ANONYMOUS_REQUEST_REVIEW_OBJECT: FormReviewObject = {
    'Anonymous Request': [
      {
        inputName: 'Title',
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: 'Secure Contact Number',
        inputValue: secureContactNumber,
        isInputValueValid: isValidSecureContactNumber,
      },
      {
        inputName: 'Secure Contact Email',
        inputValue: secureContactEmail,
        isInputValueValid: isValidSecureContactEmail,
      },
      {
        inputName: 'Request Kind',
        inputValue: requestKind,
        isInputValueValid: true,
      },
    ],
    'Request Details': [
      {
        inputName: 'Description',
        inputValue: requestDescription,
        isInputValueValid: isValidRequestDescription,
      },
      {
        inputName: 'Additional Information',
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: 'Urgency',
        inputValue: urgency,
        isInputValueValid: true,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage
      formReviewObject={ANONYMOUS_REQUEST_REVIEW_OBJECT}
      formName="Anonymous Request"
    />
  );

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
      childrenTitle="Anonymous Request"
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
