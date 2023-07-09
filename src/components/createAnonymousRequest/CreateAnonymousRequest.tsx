import { useEffect, useReducer } from 'react';
import {
  createAnonymousRequestAction,
  createAnonymousRequestReducer,
  initialCreateAnonymousRequestState,
} from './state';
import {
  EMAIL_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../constants/regex';
import { PhoneNumber } from '../../types';

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
