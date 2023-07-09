import { useEffect, useReducer } from 'react';

import {
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../constants/regex';
import { returnAccessibleTextElements } from '../../jsxCreators';
import { PhoneNumber } from '../../types';
import {
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
} from '../../utils';
import {
  createAnonymousRequestAction,
  createAnonymousRequestReducer,
  initialCreateAnonymousRequestState,
} from './state';

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
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(requestDescription);

    createAnonymousRequestDispatch({
      type: createAnonymousRequestAction.setIsValidRequestDescription,
      payload: isValid,
    });
  }, [requestDescription]);

  // validate additional information on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalInformation);

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

  //
  //
  //
  return (
    <>
      <h3>CreateAnonymousRequest</h3>
    </>
  );
}

export { CreateAnonymousRequest };
