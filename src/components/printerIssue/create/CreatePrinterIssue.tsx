import { Group, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

import { URGENCY_DATA } from '../../../constants/data';
import {
  DATE_NEAR_PAST_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  PRINTER_MAKE_MODEL_REGEX,
  PRINTER_SERIAL_NUMBER_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useGlobalState, useWrapFetch } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleDateTimeElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  PhoneNumber,
  ResourceRequestServerResponse,
  Urgency,
} from '../../../types';
import {
  returnDateNearPastValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnTimeRailwayValidationText,
  urlBuilder,
} from '../../../utils';
import FormReviewPage, {
  FormReviewObjectArray,
} from '../../formReviewPage/FormReviewPage';
import { NotificationModal } from '../../notificationModal';
import {
  AccessibleButtonCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  CREATE_PRINTER_ISSUE_DESCRIPTION_OBJECTS,
  CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION,
  PRINTER_MAKE_SELECT_OPTIONS,
} from '../constants';
import {
  createPrinterIssueAction,
  createPrinterIssueReducer,
  initialCreatePrinterIssueState,
} from './state';
import { PrinterIssueDocument, PrinterMake } from './types';

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

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createPrinterIssueState;

  const { globalDispatch } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

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

    async function handleCreatePrinterIssueFormSubmit() {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setIsSubmitting,
        payload: true,
      });
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setSubmitMessage,
        payload: `Submitting ${title} printer issue form...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: 'actions/general/printer-issue' });

      const body = JSON.stringify({
        title,
        contactNumber,
        contactEmail,
        dateOfOccurrence,
        timeOfOccurrence,
        printerMake,
        printerModel,
        printerSerialNumber,
        printerIssueDescription,
        urgency,
        additionalInformation,
      });

      const requestInit: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<PrinterIssueDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setIsSuccessful,
          payload: true,
        });
        createPrinterIssueDispatch({
          type: createPrinterIssueAction.setSuccessMessage,
          payload: data.message ?? `Successfully submitted: ${title} form`,
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
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setIsSubmitting,
            payload: false,
          });
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setSubmitMessage,
            payload: '',
          });
          createPrinterIssueDispatch({
            type: createPrinterIssueAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleCreatePrinterIssueFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

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

  // validate printer serial number input on every change
  useEffect(() => {
    const isValid = PRINTER_SERIAL_NUMBER_REGEX.test(printerSerialNumber);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterSerialNumber,
      payload: isValid,
    });
  }, [printerSerialNumber]);

  // validate printer model input on every change
  useEffect(() => {
    const isValid = PRINTER_MAKE_MODEL_REGEX.test(printerModel);

    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setIsValidPrinterModel,
      payload: isValid,
    });
  }, [printerModel]);

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
      contactNumber !== '+(1)' && !isValidContactNumber;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    // if current step is in error, add it to stepsInError Set else remove it
    createPrinterIssueDispatch({
      type: createPrinterIssueAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
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
        step: 1,
      },
    });
  }, [
    isValidPrinterModel,
    isValidPrinterSerialNumber,
    isValidPrinterIssueDescription,
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
        content: title,
        contentKind: 'title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'contact number',
      inputText: contactNumber,
      isInputTextFocused: isContactNumberFocused,
      isValidInputText: isValidContactNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: contactNumber,
        contentKind: 'contact number',
      }),
    });

  const [contactEmailInputErrorText, contactEmailInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'contact email',
      inputText: contactEmail,
      isInputTextFocused: isContactEmailFocused,
      isValidInputText: isValidContactEmail,
      regexValidationText: returnEmailValidationText({
        content: contactEmail,
        contentKind: 'contact email',
      }),
    });

  const [dateOfOccurrenceInputErrorText, dateOfOccurrenceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'date of occurrence',
      inputText: dateOfOccurrence,
      isInputTextFocused: isDateOfOccurrenceFocused,
      isValidInputText: isValidDateOfOccurrence,
      regexValidationText: returnDateNearPastValidationText({
        content: dateOfOccurrence,
        contentKind: 'date of occurrence',
      }),
    });

  const [timeOfOccurrenceInputErrorText, timeOfOccurrenceInputValidText] =
    AccessibleErrorValidTextElements({
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

  const [printerModelInputErrorText, printerModelInputValidText] =
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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

  const printerMakeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: 'Select a printer make',
    data: PRINTER_MAKE_SELECT_OPTIONS,
    label: 'Printer Make',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setPrinterMake,
        payload: event.currentTarget.value as PrinterMake,
      });
    },
    value: printerMake,
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
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'printer issue form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createPrinterIssueDispatch({
        type: createPrinterIssueAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [
    createdTitleTextInput,
    createdContactEmailTextInput,
    createdPrinterSerialNumberTextInput,
    createdPrinterModelTextInput,
  ] = returnAccessibleTextInputElements([
    titleTextInputCreatorInfo,
    contactEmailTextInputCreatorInfo,
    printerSerialNumberTextInputCreatorInfo,
    printerModelTextInputCreatorInfo,
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

  const [createdUrgencySelectInput, createdPrinterMakeSelectInput] =
    returnAccessibleSelectInputElements([
      urgencySelectInputCreatorInfo,
      printerMakeSelectInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting'
            : 'Submit Printer Issue form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayPrinterIssueFormFirstPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdContactEmailTextInput}
      {createdContactNumberPhoneInput}
      {createdDateOfOccurrenceDateInput}
      {createdTimeOfOccurrenceTimeInput}
    </FormLayoutWrapper>
  );

  const displayPrinterIssueFormSecondPage = (
    <FormLayoutWrapper>
      {createdPrinterSerialNumberTextInput}
      {createdPrinterModelTextInput}
      {createdPrinterMakeSelectInput}
      {createdPrinterIssueDescriptionTextArea}
      {createdAdditionalInformationTextArea}
      {createdUrgencySelectInput}
    </FormLayoutWrapper>
  );

  const PRINTER_ISSUE_REVIEW_OBJECT: FormReviewObjectArray = {
    'Personal and Contact Details': [
      {
        inputName: 'Title',
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: 'Contact Number',
        inputValue: contactNumber,
        isInputValueValid: isValidContactNumber,
      },
      {
        inputName: 'Contact Email',
        inputValue: contactEmail,
        isInputValueValid: isValidContactEmail,
      },
      {
        inputName: 'Date of Occurrence',
        inputValue: dateOfOccurrence,
        isInputValueValid: isValidDateOfOccurrence,
      },
      {
        inputName: 'Time of Occurrence',
        inputValue: timeOfOccurrence,
        isInputValueValid: isValidTimeOfOccurrence,
      },
    ],
    'Printer Details': [
      {
        inputName: 'Printer Serial Number',
        inputValue: printerSerialNumber,
        isInputValueValid: isValidPrinterSerialNumber,
      },
      {
        inputName: 'Printer Model',
        inputValue: printerModel,
        isInputValueValid: isValidPrinterModel,
      },
      {
        inputName: 'Printer Make',
        inputValue: printerMake,
        isInputValueValid: true,
      },
      {
        inputName: 'Printer Issue Description',
        inputValue: printerIssueDescription,
        isInputValueValid: isValidPrinterIssueDescription,
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
      formReviewObject={PRINTER_ISSUE_REVIEW_OBJECT}
      formName="Printer Issue"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/general/printer-issue/display');
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

  const displayCreatePrinterIssueForm =
    currentStepperPosition === 0
      ? displayPrinterIssueFormFirstPage
      : currentStepperPosition === 1
      ? displayPrinterIssueFormSecondPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayCreatePrinterIssueComponent = (
    <StepperWrapper
      childrenTitle="Printer issue"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_PRINTER_ISSUE_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION}
      parentComponentDispatch={createPrinterIssueDispatch}
      setCurrentStepperPosition={
        createPrinterIssueAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreatePrinterIssueForm}
    </StepperWrapper>
  );

  return displayCreatePrinterIssueComponent;
}

export default CreatePrinterIssue;
