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
import { useEffect, useReducer, useRef } from 'react';

import { URGENCY_DATA } from '../../../constants/data';
import {
  DATE_NEAR_PAST_REGEX,
  DATE_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  PRINTER_MAKE_MODEL_REGEX,
  PRINTER_SERIAL_NUMBER_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  returnAccessibleDateTimeElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { PhoneNumber, Urgency } from '../../../types';
import {
  returnDateNearPastValidationText,
  returnDateValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnTimeRailwayValidationText,
} from '../../../utils';
import { StepperWrapper } from '../../stepperWrapper';
import {
  CREATE_PRINTER_ISSUE_DESCRIPTION_MAP,
  CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION,
} from './constants';
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
            payload: `${contactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: `${contactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: `${contactNumber}-` as PhoneNumber | string,
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
    const isValid =
      DATE_NEAR_PAST_REGEX.test(dateOfOccurrence) &&
      new Date(dateOfOccurrence) <= new Date();

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidDateOfOccurrence,
      payload: isValid,
    });
  }, [dateOfOccurrence]);

  // validate time of occurrence input on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(timeOfOccurrence);

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
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(printerIssueDescription);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterIssueDescription,
      payload: isValid,
    });
  }, [printerIssueDescription]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredInputsInError =
      !isValidTitle ||
      !isValidContactEmail ||
      !isValidDateOfOccurrence ||
      !isValidTimeOfOccurrence;

    const isOptionalInputInError =
      contactNumber !== '' && !isValidContactNumber;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    // if current step is in error, add it to stepsInError Set else remove it
    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidTitle,
    isValidContactEmail,
    isValidDateOfOccurrence,
    isValidTimeOfOccurrence,
    isValidContactNumber,
    contactNumber,
  ]);

  // update for stepper wrapper state
  useEffect(() => {
    const areRequiredInputsInError =
      !isValidPrinterMake ||
      !isValidPrinterModel ||
      !isValidPrinterSerialNumber ||
      !isValidPrinterIssueDescription;

    const isOptionalInputInError =
      additionalInformation !== '' && !isValidAdditionalInformation;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidPrinterMake,
    isValidPrinterModel,
    isValidPrinterSerialNumber,
    isValidPrinterIssueDescription,
    isValidAdditionalInformation,
    additionalInformation,
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
      regexValidationText: returnEmailValidationText(contactEmail),
    });

  const [dateOfOccurrenceInputErrorText, dateOfOccurrenceInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'date of occurrence',
      inputText: dateOfOccurrence,
      isInputTextFocused: isDateOfOccurrenceFocused,
      isValidInputText: isValidDateOfOccurrence,
      regexValidationText: returnDateNearPastValidationText(dateOfOccurrence),
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

  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: 'Title',
    onBlur: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter a form title',
    semanticName: 'title',
    required: true,
    withAsterisk: true,
  };

  const contactNumberPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: contactNumberInputErrorText,
        valid: contactNumberInputValidText,
      },
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      label: 'Contact Number',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (contactNumber.length === 14 || contactNumber.length === 9) {
            createPrinterIssueDispatch({
              type: createPrinterIssueAction.setContactNumber,
              payload: contactNumber.slice(0, -1) as PhoneNumber | string,
            });
          }
        }
      },
      placeholder: 'Enter a contact number',
      semanticName: 'contact number',
    };

  const contactEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: contactEmailInputErrorText,
      valid: contactEmailInputValidText,
    },
    inputText: contactEmail,
    isValidInputText: isValidContactEmail,
    label: 'Contact Email',
    onBlur: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsContactEmailFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setContactEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsContactEmailFocused,
        payload: true,
      });
    },
    placeholder: 'Enter a contact email',
    semanticName: 'contact email',
    required: true,
    withAsterisk: true,
  };

  const dateOfOccurrenceDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo =
    {
      dateKind: 'date near future',
      description: {
        error: dateOfOccurrenceInputErrorText,
        valid: dateOfOccurrenceInputValidText,
      },
      inputKind: 'date',
      inputText: dateOfOccurrence,
      isValidInputText: isValidDateOfOccurrence,
      label: 'Date of Occurrence',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsDateOfOccurrenceFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setDateOfOccurrence,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsDateOfOccurrenceFocused,
          payload: true,
        });
      },
      placeholder: 'Enter a date of occurrence',
      semanticName: 'date of occurrence',
      required: true,
      withAsterisk: true,
    };

  const timeOfOccurrenceTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo =
    {
      description: {
        error: timeOfOccurrenceInputErrorText,
        valid: timeOfOccurrenceInputValidText,
      },
      inputKind: 'time',
      inputText: timeOfOccurrence,
      isValidInputText: isValidTimeOfOccurrence,
      label: 'Time of Occurrence',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsTimeOfOccurrenceFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setTimeOfOccurrence,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsTimeOfOccurrenceFocused,
          payload: true,
        });
      },
      placeholder: 'Enter a time of occurrence',
      semanticName: 'time of occurrence',
      required: true,
      withAsterisk: true,
    };

  const printerSerialNumberTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: printerSerialNumberInputErrorText,
        valid: printerSerialNumberInputValidText,
      },
      inputText: printerSerialNumber,
      isValidInputText: isValidPrinterSerialNumber,
      label: 'Printer Serial Number',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsPrinterSerialNumberFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setPrinterSerialNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsPrinterSerialNumberFocused,
          payload: true,
        });
      },
      placeholder: 'Enter a printer serial number',
      semanticName: 'printer serial number',
      required: true,
      withAsterisk: true,
    };

  const printerModelTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: printerModelInputErrorText,
      valid: printerModelInputValidText,
    },
    inputText: printerModel,
    isValidInputText: isValidPrinterModel,
    label: 'Printer Model',
    onBlur: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsPrinterModelFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setPrinterModel,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsPrinterModelFocused,
        payload: true,
      });
    },
    placeholder: 'Enter a printer model',
    semanticName: 'printer model',
    required: true,
    withAsterisk: true,
  };

  const printerMakeTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: printerMakeInputErrorText,
      valid: printerMakeInputValidText,
    },
    inputText: printerMake,
    isValidInputText: isValidPrinterMake,
    label: 'Printer Make',
    onBlur: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsPrinterMakeFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setPrinterMake,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsPrinterMakeFocused,
        payload: true,
      });
    },
    placeholder: 'Enter a printer make',
    semanticName: 'printer make',
    required: true,
    withAsterisk: true,
  };

  const printerIssueDescriptionTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: printerIssueDescriptionInputErrorText,
        valid: printerIssueDescriptionInputValidText,
      },
      inputText: printerIssueDescription,
      isValidInputText: isValidPrinterIssueDescription,
      label: 'Printer Issue Description',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsPrinterIssueDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setPrinterIssueDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsPrinterIssueDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter a printer issue description',
      semanticName: 'printer issue description',
      required: true,
      withAsterisk: true,
    };

  const additionalInformationTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalInformationInputErrorText,
        valid: additionalInformationInputValidText,
      },
      inputText: additionalInformation,
      isValidInputText: isValidAdditionalInformation,
      label: 'Additional Information',
      onBlur: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: 'Enter additional information',
      semanticName: 'additional information',
    };

  const urgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: 'Select an urgency',
    label: 'Urgency',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setUrgency,
        payload: event.currentTarget.value as Urgency,
      });
    },
    data: URGENCY_DATA,
    value: urgency,
    required: true,
    withAsterisk: true,
  };

  const [
    createdTitleTextInput,
    createdContactEmailTextInput,
    createdPrinterSerialNumberTextInput,
    createdPrinterModelTextInput,
    createdPrinterMakeTextInput,
  ] = returnAccessibleTextInputElements([
    titleTextInputCreatorInfo,
    contactEmailTextInputCreatorInfo,
    printerSerialNumberTextInputCreatorInfo,
    printerModelTextInputCreatorInfo,
    printerMakeTextInputCreatorInfo,
  ]);

  const [createdDateOfOccurrenceDateInput, createdTimeOfOccurrenceTimeInput] =
    returnAccessibleDateTimeElements([
      dateOfOccurrenceDateInputCreatorInfo,
      timeOfOccurrenceTimeInputCreatorInfo,
    ]);

  const [createdContactNumberPhoneInput] =
    returnAccessiblePhoneNumberTextInputElements([
      contactNumberPhoneInputCreatorInfo,
    ]);

  const [
    createdPrinterIssueDescriptionTextArea,
    createdAdditionalInformationTextArea,
  ] = returnAccessibleTextAreaInputElements([
    printerIssueDescriptionTextAreaCreatorInfo,
    additionalInformationTextAreaCreatorInfo,
  ]);

  const [createdUrgencySelectInput] = returnAccessibleSelectInputElements([
    urgencySelectInputCreatorInfo,
  ]);

  const displayPrinterIssueFormFirstPage = (
    <>
      {createdTitleTextInput}
      {createdContactEmailTextInput}
      {createdContactNumberPhoneInput}
      {createdDateOfOccurrenceDateInput}
      {createdTimeOfOccurrenceTimeInput}
    </>
  );

  const displayPrinterIssueFormSecondPage = (
    <>
      {createdPrinterSerialNumberTextInput}
      {createdPrinterModelTextInput}
      {createdPrinterMakeTextInput}
      {createdPrinterIssueDescriptionTextArea}
      {createdAdditionalInformationTextArea}
      {createdUrgencySelectInput}
    </>
  );

  const displayReviewFormPage = <h5>printer issue review page</h5>;

  const displayCreatePrinterIssueForm =
    currentStepperPosition === 0
      ? displayPrinterIssueFormFirstPage
      : currentStepperPosition === 1
      ? displayPrinterIssueFormSecondPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : null;

  const displaySubmitButton =
    currentStepperPosition === CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION ? (
      <Button type="button" variant="filled" disabled={stepsInError.size > 0}>
        Submit
      </Button>
    ) : null;

  const displayCreatePrinterIssueComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionMap={CREATE_PRINTER_ISSUE_DESCRIPTION_MAP}
      maxStepperPosition={CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION}
      parentComponentDispatch={createPrinterIssueDispatch}
      setCurrentStepperPosition={
        createPrinterIssueAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      <form onSubmit={handleCreatePrinterIssueFormSubmit}>
        {displayCreatePrinterIssueForm}
        {displaySubmitButton}
      </form>
    </StepperWrapper>
  );

  async function handleCreatePrinterIssueFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      <h3>create-printer-issue</h3>
      {displayCreatePrinterIssueComponent}
    </Flex>
  );
}

export { CreatePrinterIssue };

/**
 * const displayPersonalDetailsFormPage = (
    <>
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Title"
        placeholder="Enter a form title"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidTitle ? 'title-input-note-valid' : 'title-input-note-error'
        }
        aria-invalid={isValidTitle ? false : true}
        value={title}
        icon={
          isValidTitle ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
        }
        error={!isValidTitle && title !== ''}
        description={isValidTitle ? titleInputValidText : titleInputErrorText}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setTitle,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsTitleFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsTitleFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={75}
        withAsterisk
        required
      />
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Contact number"
        aria-required
        aria-describedby={
          isValidContactNumber
            ? 'contact-number-input-note-valid'
            : 'contact-number-input-note-error'
        }
        description={
          isValidContactNumber
            ? contactNumberInputValidText
            : contactNumberInputErrorText
        }
        placeholder="Enter contact number"
        autoComplete="off"
        aria-invalid={isValidContactNumber ? false : true}
        value={contactNumber}
        onKeyDown={(event) => {
          if (event.key === 'Backspace') {
            if (contactNumber.length === 14) {
              createPrinterIssueDispatch({
                type: createPrinterIssueAction.setContactNumber,
                payload: contactNumber.slice(0, -1) as PhoneNumber | string,
              });
            } else if (contactNumber.length === 9) {
              createPrinterIssueDispatch({
                type: createPrinterIssueAction.setContactNumber,
                payload: contactNumber.slice(0, -1) as PhoneNumber | string,
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
                  createPrinterIssueDispatch({
                    type: createPrinterIssueAction.setContactNumber,
                    payload: contactNumber,
                  });
                }}
              />
            </Button>
          </Tooltip>
        }
        icon={
          isValidContactNumber ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidContactNumber && contactNumber !== '+(1)'}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactNumber,
            payload: event.currentTarget.value as PhoneNumber | string,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsContactNumberFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsContactNumberFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
        maxLength={18}
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Contact email"
        aria-required
        aria-describedby={
          isValidContactEmail
            ? 'contact-email-input-note-valid'
            : 'contact-email-input-note-error'
        }
        description={
          isValidContactEmail
            ? contactEmailInputValidText
            : contactEmailInputErrorText
        }
        placeholder="Enter contact email"
        autoComplete="off"
        aria-invalid={isValidContactEmail ? false : true}
        value={contactEmail}
        icon={
          isValidContactEmail ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidContactEmail && contactEmail !== ''}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setContactEmail,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsContactEmailFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsContactEmailFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Date of occurrence"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter date of occurrence in format "date-date-month-month-year-year-year-year" from start year 2020 to current year'
        aria-describedby={
          isValidDateOfOccurrence
            ? 'date-of-occurrence-input-note-valid'
            : 'date-of-occurrence-input-note-error'
        }
        aria-invalid={isValidDateOfOccurrence ? false : true}
        value={dateOfOccurrence}
        icon={
          isValidDateOfOccurrence ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidDateOfOccurrence && dateOfOccurrence !== ''}
        description={
          isValidDateOfOccurrence
            ? dateOfOccurrenceInputValidText
            : dateOfOccurrenceInputErrorText
        }
        min={new Date(2020, 0, 1).toISOString().split('T')[0]}
        max={new Date().toISOString().split('T')[0]}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setDateOfOccurrence,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsDateOfOccurrenceFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsDateOfOccurrenceFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      <TextInput
        type="time"
        size="sm"
        w="100%"
        color="dark"
        label="Time of occurrence"
        placeholder="HH:MM"
        autoComplete="off"
        aria-required
        aria-label='Please enter time of occurrence in format "hour-hour-minute-minute" from start hour 00 to end hour 23'
        aria-describedby={
          isValidTimeOfOccurrence
            ? 'time-of-occurrence-input-note-valid'
            : 'time-of-occurrence-input-note-error'
        }
        aria-invalid={isValidTimeOfOccurrence ? false : true}
        value={timeOfOccurrence}
        icon={
          isValidTimeOfOccurrence ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidTimeOfOccurrence && timeOfOccurrence !== ''}
        description={
          isValidTimeOfOccurrence
            ? timeOfOccurrenceInputValidText
            : timeOfOccurrenceInputErrorText
        }
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setTimeOfOccurrence,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsTimeOfOccurrenceFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsTimeOfOccurrenceFocused,
            payload: false,
          });
        }}
        maxLength={5}
        withAsterisk
        required
      />
    </>
  );

  const displayPrinterDetailsFormPage = (
    <>
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Printer serial number"
        aria-required
        aria-describedby={
          isValidPrinterSerialNumber
            ? 'printer-serial-number-input-note-valid'
            : 'printer-serial-number-input-note-error'
        }
        description={
          isValidPrinterSerialNumber
            ? printerSerialNumberInputValidText
            : printerSerialNumberInputErrorText
        }
        placeholder="Enter printer serial number"
        autoComplete="off"
        aria-invalid={isValidPrinterSerialNumber ? false : true}
        value={printerSerialNumber}
        icon={
          isValidPrinterSerialNumber ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPrinterSerialNumber && printerSerialNumber !== ''}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setPrinterSerialNumber,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterSerialNumberFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterSerialNumberFocused,
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
        label="Printer model"
        aria-required
        aria-describedby={
          isValidPrinterModel
            ? 'printer-model-input-note-valid'
            : 'printer-model-input-note-error'
        }
        description={
          isValidPrinterModel
            ? printerModelInputValidText
            : printerModelInputErrorText
        }
        placeholder="Enter printer model"
        autoComplete="off"
        aria-invalid={isValidPrinterModel ? false : true}
        value={printerModel}
        icon={
          isValidPrinterModel ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPrinterModel && printerModel !== ''}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setPrinterModel,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterModelFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterModelFocused,
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
        label="Printer make"
        aria-required
        aria-describedby={
          isValidPrinterMake
            ? 'printer-make-input-note-valid'
            : 'printer-make-input-note-error'
        }
        description={
          isValidPrinterMake
            ? printerMakeInputValidText
            : printerMakeInputErrorText
        }
        placeholder="Enter printer make"
        autoComplete="off"
        aria-invalid={isValidPrinterMake ? false : true}
        value={printerMake}
        icon={
          isValidPrinterMake ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPrinterMake && printerMake !== ''}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setPrinterMake,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterMakeFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterMakeFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={50}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Printer issue description"
        aria-required
        aria-describedby={
          isValidPrinterIssueDescription
            ? 'printer-issue-description-input-note-valid'
            : 'printer-issue-description-input-note-error'
        }
        description={
          isValidPrinterIssueDescription
            ? printerIssueDescriptionInputValidText
            : printerIssueDescriptionInputErrorText
        }
        placeholder="Enter printer issue description"
        autoComplete="off"
        aria-invalid={isValidPrinterIssueDescription ? false : true}
        value={printerIssueDescription}
        icon={
          isValidPrinterIssueDescription ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={
          !isValidPrinterIssueDescription && printerIssueDescription !== ''
        }
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setPrinterIssueDescription,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterIssueDescriptionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsPrinterIssueDescriptionFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
        autosize
        minRows={3}
        maxRows={5}
        minLength={2}
        maxLength={2000}
      />

      <NativeSelect
        size="sm"
        data={URGENCY_DATA}
        label="Urgency"
        description="Select urgency of printer issue"
        value={urgency}
        onChange={(event) => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setUrgency,
            payload: event.currentTarget.value as Urgency,
          });
        }}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Additional information"
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
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setAdditionalInformation,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsAdditionalInformationFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsAdditionalInformationFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
        autosize
        minRows={3}
        maxRows={5}
        minLength={2}
        maxLength={2000}
      />
    </>
  );
 */
