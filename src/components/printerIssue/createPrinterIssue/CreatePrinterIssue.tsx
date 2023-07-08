import { useEffect, useReducer, useRef } from 'react';

import {
  DATE_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  PHONE_NUMBER_REGEX,
  PRINTER_MAKE_MODEL_REGEX,
  PRINTER_SERIAL_NUMBER_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import { returnAccessibleTextElements } from '../../../jsxCreators';
import {
  returnDateValidationText,
  returnEmailRegexValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnTimeRailwayValidationText,
} from '../../../utils';
import {
  createPrinterIssueAction,
  createPrinterIssueReducer,
  initialCreatePrinterIssueState,
} from './state';

function CreatePrinterIssue() {
  const [createPrinterIssueState, createPrinterIssueDispatch] = useReducer(
    createPrinterIssueReducer,
    initialCreatePrinterIssueState
  );
  const {
    title,
    isValidTitle,
    isTitleFocused,

    contactNumber,
    isValidContactNumber,
    isContactNumberFocused,

    contactEmail,
    isValidContactEmail,
    isContactEmailFocused,

    dateOfOccurrence,
    isValidDateOfOccurrence,
    isDateOfOccurrenceFocused,

    timeOfOccurrence,
    isValidTimeOfOccurrence,
    isTimeOfOccurrenceFocused,

    printerMake,
    isValidPrinterMake,
    isPrinterMakeFocused,

    printerModel,
    isValidPrinterModel,
    isPrinterModelFocused,

    printerSerialNumber,
    isValidPrinterSerialNumber,
    isPrinterSerialNumberFocused,

    printerIssueDescription,
    isValidPrinterIssueDescription,
    isPrinterIssueDescriptionFocused,

    urgency,

    additionalInformation,
    isValidAdditionalInformation,
    isAdditionalInformationFocused,

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
  } = createPrinterIssueState;

  const titleInputRef = useRef<HTMLInputElement>(null);
  // sets focus on title input on load
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // validate title input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate contact number input on every change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidContactNumber,
      payload: isValid,
    });
  }, [contactNumber, isContactNumberFocused]);

  // validate contact email input on every change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(contactEmail);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidContactEmail,
      payload: isValid,
    });
  }, [contactEmail]);

  // validate date of occurrence input on every change
  useEffect(() => {
    const isValid = DATE_REGEX.test(dateOfOccurrence);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidDateOfOccurrence,
      payload: isValid,
    });
  }, [dateOfOccurrence]);

  // validate time of occurrence input on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(timeOfOccurrence);

    const timeLength = timeOfOccurrence.length;
    if (isTimeOfOccurrenceFocused) {
      switch (timeLength) {
        case 2: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setTimeOfOccurrence,
            payload: `${timeOfOccurrence}:`,
          });
          break;
        }
        default:
          break;
      }
    }

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidTimeOfOccurrence,
      payload: isValid,
    });
  }, [timeOfOccurrence, isTimeOfOccurrenceFocused]);

  // validate printer make input on every change
  useEffect(() => {
    const isValid = PRINTER_MAKE_MODEL_REGEX.test(printerMake);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterMake,
      payload: isValid,
    });
  }, [printerMake]);

  // validate printer model input on every change
  useEffect(() => {
    const isValid = PRINTER_MAKE_MODEL_REGEX.test(printerModel);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterModel,
      payload: isValid,
    });
  }, [printerModel]);

  // validate printer serial number input on every change
  useEffect(() => {
    const isValid = PRINTER_SERIAL_NUMBER_REGEX.test(printerSerialNumber);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterSerialNumber,
      payload: isValid,
    });
  }, [printerSerialNumber]);

  // validate printer issue description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(printerIssueDescription);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterIssueDescription,
      payload: isValid,
    });
  }, [printerIssueDescription]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalInformation);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidTitle ||
      !isValidContactNumber ||
      !isValidContactEmail ||
      !isValidDateOfOccurrence ||
      !isValidTimeOfOccurrence;

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidTitle,
    isValidContactNumber,
    isValidContactEmail,
    isValidDateOfOccurrence,
    isValidTimeOfOccurrence,
  ]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidPrinterMake ||
      !isValidPrinterModel ||
      !isValidPrinterSerialNumber ||
      !isValidPrinterIssueDescription ||
      !isValidAdditionalInformation;

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidPrinterIssueDescription,
    isValidAdditionalInformation,
    isValidPrinterMake,
    isValidPrinterModel,
    isValidPrinterSerialNumber,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'title',
      inputText: title,
      isInputTextFocused: isTitleFocused,
      isValidInputText: isValidTitle,
      regexValidationText: returnGrammarValidationText({
        content: title,
        contentKind: 'title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'contact number',
      inputText: contactNumber,
      isInputTextFocused: isContactNumberFocused,
      isValidInputText: isValidContactNumber,
      regexValidationText: returnPhoneNumberValidationText(contactNumber),
    });

  const [contactEmailInputErrorText, contactEmailInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'contact email',
      inputText: contactEmail,
      isInputTextFocused: isContactEmailFocused,
      isValidInputText: isValidContactEmail,
      regexValidationText: returnEmailRegexValidationText(contactEmail),
    });

  const [dateOfOccurrenceInputErrorText, dateOfOccurrenceInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'date of occurrence',
      inputText: dateOfOccurrence,
      isInputTextFocused: isDateOfOccurrenceFocused,
      isValidInputText: isValidDateOfOccurrence,
      regexValidationText: returnDateValidationText(dateOfOccurrence),
    });

  const [timeOfOccurrenceInputErrorText, timeOfOccurrenceInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'time of occurrence',
      inputText: timeOfOccurrence,
      isInputTextFocused: isTimeOfOccurrenceFocused,
      isValidInputText: isValidTimeOfOccurrence,
      regexValidationText: returnTimeRailwayValidationText({
        content: timeOfOccurrence,
        contentKind: 'time of occurrence',
        minLength: 4,
        maxLength: 5,
      }),
    });

  const [printerMakeInputErrorText, printerMakeInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'printer make',
      inputText: printerMake,
      isInputTextFocused: isPrinterMakeFocused,
      isValidInputText: isValidPrinterMake,
      regexValidationText: returnPrinterMakeModelValidationText({
        content: printerMake,
        contentKind: 'printer make',
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [printerModelInputErrorText, printerModelInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'printer model',
      inputText: printerModel,
      isInputTextFocused: isPrinterModelFocused,
      isValidInputText: isValidPrinterModel,
      regexValidationText: returnPrinterMakeModelValidationText({
        content: printerModel,
        contentKind: 'printer model',
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [printerSerialNumberInputErrorText, printerSerialNumberInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'printer serial number',
      inputText: printerSerialNumber,
      isInputTextFocused: isPrinterSerialNumberFocused,
      isValidInputText: isValidPrinterSerialNumber,
      regexValidationText: returnPrinterSerialNumberValidationText({
        content: printerSerialNumber,
        contentKind: 'printer serial number',
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [
    printerIssueDescriptionInputErrorText,
    printerIssueDescriptionInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'printer issue description',
    inputText: printerIssueDescription,
    isInputTextFocused: isPrinterIssueDescriptionFocused,
    isValidInputText: isValidPrinterIssueDescription,
    regexValidationText: returnGrammarValidationText({
      content: printerIssueDescription,
      contentKind: 'printer issue description',
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

  return (
    <>
      <h3>create-printer-issue</h3>
    </>
  );
}

export { CreatePrinterIssue };
