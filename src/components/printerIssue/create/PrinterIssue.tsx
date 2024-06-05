import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage, TimeRailway } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { PRINTER_ISSUE_ROLE_PATHS, returnPrinterIssueStepperPages } from "../constants";
import { printerIssueAction } from "./actions";
import { PrinterIssueContact } from "./PrinterIssueContact";
import { PrinterIssueDetails } from "./PrinterIssueDetails";
import { printerIssueReducer } from "./reducers";
import { initialPrinterIssueState } from "./state";
import { PrinterIssueSchema } from "./types";

function PrinterIssue() {
  const [printerIssueState, printerIssueDispatch] = useReducer(
    printerIssueReducer,
    initialPrinterIssueState
  );
  const {
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
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = printerIssueState;

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    if (triggerFormSubmit) {
      const printerIssueSchema: PrinterIssueSchema = {
        additionalInformation,
        contactEmail,
        contactNumber,
        dateOfOccurrence,
        printerIssueDescription,
        printerMake,
        printerModel,
        printerSerialNumber,
        requestStatus: "pending",
        timeOfOccurrence: timeOfOccurrence as TimeRailway,
        title,
        urgency,
        userId,
        username,
      };

      formSubmitPOST({
        dispatch: printerIssueDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: printerIssueAction.setIsSubmitting,
        isSuccessfulAction: printerIssueAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: PRINTER_ISSUE_ROLE_PATHS,
        schema: printerIssueSchema,
        schemaName: "printerIssueSchema",
        sessionId,
        showBoundary,
        userId,
        username,
        userRole: "manager",
      });
    }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting address changes! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Address changes submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const PRINTER_ISSUE_STEPPER_PAGES: StepperPage[] = returnPrinterIssueStepperPages();

  const detailsPage = (
    <PrinterIssueDetails
      additionalInformation={additionalInformation}
      parentDispatch={printerIssueDispatch}
      printerIssueDescription={printerIssueDescription}
      printerMake={printerMake}
      printerModel={printerModel}
      printerSerialNumber={printerSerialNumber}
      urgency={urgency}
      parentAction={printerIssueAction}
      stepperPages={PRINTER_ISSUE_STEPPER_PAGES}
    />
  );

  const contactPage = (
    <PrinterIssueContact
      contactEmail={contactEmail}
      contactNumber={contactNumber}
      dateOfOccurrence={dateOfOccurrence}
      parentDispatch={printerIssueDispatch}
      parentAction={printerIssueAction}
      stepperPages={PRINTER_ISSUE_STEPPER_PAGES}
      timeOfOccurrence={timeOfOccurrence}
      title={title}
    />
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          printerIssueDispatch({
            action: printerIssueAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: printerIssueState,
        pageElements: [detailsPage, contactPage],
        stepperPages: PRINTER_ISSUE_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  logState({
    state: printerIssueState,
    groupLabel: "Printer Issue State",
  });

  return <Container w={700}>{stepper}</Container>;
}

export default PrinterIssue;

/**
 * 
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

    async function handlePrinterIssueFormSubmit() {
      printerIssueDispatch({
        type: printerIssueAction.setIsSubmitting,
        payload: true,
      });
      printerIssueDispatch({
        type: printerIssueAction.setSubmitMessage,
        payload: `Submitting ${title} printer issue form...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: "actions/general/printer-issue" });

      const body = JSON.stringify({
        printerIssueSchema: {
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
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

        printerIssueDispatch({
          type: printerIssueAction.setIsSuccessful,
          payload: true,
        });
        printerIssueDispatch({
          type: printerIssueAction.setSuccessMessage,
          payload: data.message ?? `Successfully submitted: ${title} form`,
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          printerIssueDispatch({
            type: printerIssueAction.setIsSubmitting,
            payload: false,
          });
          printerIssueDispatch({
            type: printerIssueAction.setSubmitMessage,
            payload: "",
          });
          printerIssueDispatch({
            type: printerIssueAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handlePrinterIssueFormSubmit();
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

    printerIssueDispatch({
      type: printerIssueAction.setIsValidTitle,
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
          printerIssueDispatch({
            type: printerIssueAction.setContactNumber,
            payload: `${contactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          printerIssueDispatch({
            type: printerIssueAction.setContactNumber,
            payload: `${contactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          printerIssueDispatch({
            type: printerIssueAction.setContactNumber,
            payload: `${contactNumber}-` as PhoneNumber | string,
          });
          break;
        }

        default:
          break;
      }
    }

    printerIssueDispatch({
      type: printerIssueAction.setIsValidContactNumber,
      payload: isValid,
    });
  }, [contactNumber, isContactNumberFocused]);

  // validate contact email input on every change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(contactEmail);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidContactEmail,
      payload: isValid,
    });
  }, [contactEmail]);

  // validate date of occurrence input on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_PAST_REGEX.test(dateOfOccurrence) &&
      new Date(dateOfOccurrence) <= new Date();

    printerIssueDispatch({
      type: printerIssueAction.setIsValidDateOfOccurrence,
      payload: isValid,
    });
  }, [dateOfOccurrence]);

  // validate time of occurrence input on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(timeOfOccurrence);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidTimeOfOccurrence,
      payload: isValid,
    });
  }, [timeOfOccurrence, isTimeOfOccurrenceFocused]);

  // validate printer serial number input on every change
  useEffect(() => {
    const isValid = PRINTER_SERIAL_NUMBER_REGEX.test(printerSerialNumber);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidPrinterSerialNumber,
      payload: isValid,
    });
  }, [printerSerialNumber]);

  // validate printer model input on every change
  useEffect(() => {
    const isValid = PRINTER_MAKE_MODEL_REGEX.test(printerModel);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidPrinterModel,
      payload: isValid,
    });
  }, [printerModel]);

  // validate printer issue description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(printerIssueDescription);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidPrinterIssueDescription,
      payload: isValid,
    });
  }, [printerIssueDescription]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    printerIssueDispatch({
      type: printerIssueAction.setIsValidAdditionalInformation,
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

    const isOptionalInputInError = contactNumber !== "+(1)" && !isValidContactNumber;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    // if current step is in error, add it to pagesInError Set else remove it
    printerIssueDispatch({
      type: printerIssueAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
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
      additionalInformation !== "" && !isValidAdditionalInformation;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    printerIssueDispatch({
      type: printerIssueAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
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
  const [titleInputErrorText, titleInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "title",
    inputText: title,
    isInputTextFocused: isTitleFocused,
    isValidInputText: isValidTitle,
    regexValidationText: returnGrammarValidationText({
      content: title,
      contentKind: "title",
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "contact number",
      inputText: contactNumber,
      isInputTextFocused: isContactNumberFocused,
      isValidInputText: isValidContactNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: contactNumber,
        contentKind: "contact number",
      }),
    });

  const [contactEmailInputErrorText, contactEmailInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "contact email",
      inputText: contactEmail,
      isInputTextFocused: isContactEmailFocused,
      isValidInputText: isValidContactEmail,
      regexValidationText: returnEmailValidationText({
        content: contactEmail,
        contentKind: "contact email",
      }),
    });

  const [dateOfOccurrenceInputErrorText, dateOfOccurrenceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "date of occurrence",
      inputText: dateOfOccurrence,
      isInputTextFocused: isDateOfOccurrenceFocused,
      isValidInputText: isValidDateOfOccurrence,
      regexValidationText: returnDateNearPastValidationText({
        content: dateOfOccurrence,
        contentKind: "date of occurrence",
      }),
    });

  const [timeOfOccurrenceInputErrorText, timeOfOccurrenceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "time of occurrence",
      inputText: timeOfOccurrence,
      isInputTextFocused: isTimeOfOccurrenceFocused,
      isValidInputText: isValidTimeOfOccurrence,
      regexValidationText: returnTimeRailwayValidationText({
        content: timeOfOccurrence,
        contentKind: "time of occurrence",
        minLength: 4,
        maxLength: 5,
      }),
    });

  const [printerModelInputErrorText, printerModelInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "printer model",
      inputText: printerModel,
      isInputTextFocused: isPrinterModelFocused,
      isValidInputText: isValidPrinterModel,
      regexValidationText: returnPrinterMakeModelValidationText({
        content: printerModel,
        contentKind: "printer model",
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [printerSerialNumberInputErrorText, printerSerialNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "printer serial number",
      inputText: printerSerialNumber,
      isInputTextFocused: isPrinterSerialNumberFocused,
      isValidInputText: isValidPrinterSerialNumber,
      regexValidationText: returnPrinterSerialNumberValidationText({
        content: printerSerialNumber,
        contentKind: "printer serial number",
        minLength: 1,
        maxLength: 50,
      }),
    });

  const [printerIssueDescriptionInputErrorText, printerIssueDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "printer issue description",
      inputText: printerIssueDescription,
      isInputTextFocused: isPrinterIssueDescriptionFocused,
      isValidInputText: isValidPrinterIssueDescription,
      regexValidationText: returnGrammarValidationText({
        content: printerIssueDescription,
        contentKind: "printer issue description",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [additionalInformationInputErrorText, additionalInformationInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "additional information",
      inputText: additionalInformation,
      isInputTextFocused: isAdditionalInformationFocused,
      isValidInputText: isValidAdditionalInformation,
      regexValidationText: returnGrammarValidationText({
        content: additionalInformation,
        contentKind: "additional information",
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
    label: "Title",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter a form title",
    semanticName: "title",
    required: true,
    withAsterisk: true,
  };

  const contactNumberPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo = {
    description: {
      error: contactNumberInputErrorText,
      valid: contactNumberInputValidText,
    },
    inputText: contactNumber,
    isValidInputText: isValidContactNumber,
    label: "Contact Number",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsContactNumberFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setContactNumber,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsContactNumberFocused,
        payload: true,
      });
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        if (contactNumber.length === 14 || contactNumber.length === 9) {
          printerIssueDispatch({
            type: printerIssueAction.setContactNumber,
            payload: contactNumber.slice(0, -1) as PhoneNumber | string,
          });
        }
      }
    },
    placeholder: "Enter a contact number",
    semanticName: "contact number",
  };

  const contactEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: contactEmailInputErrorText,
      valid: contactEmailInputValidText,
    },
    inputText: contactEmail,
    isValidInputText: isValidContactEmail,
    label: "Contact Email",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsContactEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setContactEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsContactEmailFocused,
        payload: true,
      });
    },
    placeholder: "Enter a contact email",
    semanticName: "contact email",
    required: true,
    withAsterisk: true,
  };

  const dateOfOccurrenceDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: "date near future",
    description: {
      error: dateOfOccurrenceInputErrorText,
      valid: dateOfOccurrenceInputValidText,
    },
    inputKind: "date",
    inputText: dateOfOccurrence,
    isValidInputText: isValidDateOfOccurrence,
    label: "Date of Occurrence",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsDateOfOccurrenceFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setDateOfOccurrence,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsDateOfOccurrenceFocused,
        payload: true,
      });
    },
    placeholder: "Enter a date of occurrence",
    semanticName: "date of occurrence",
    required: true,
    withAsterisk: true,
  };

  const timeOfOccurrenceTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: timeOfOccurrenceInputErrorText,
      valid: timeOfOccurrenceInputValidText,
    },
    inputKind: "time",
    inputText: timeOfOccurrence,
    isValidInputText: isValidTimeOfOccurrence,
    label: "Time of Occurrence",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsTimeOfOccurrenceFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setTimeOfOccurrence,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsTimeOfOccurrenceFocused,
        payload: true,
      });
    },
    placeholder: "Enter a time of occurrence",
    semanticName: "time of occurrence",
    required: true,
    withAsterisk: true,
  };

  const printerSerialNumberTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: printerSerialNumberInputErrorText,
      valid: printerSerialNumberInputValidText,
    },
    inputText: printerSerialNumber,
    isValidInputText: isValidPrinterSerialNumber,
    label: "Printer Serial Number",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterSerialNumberFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setPrinterSerialNumber,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterSerialNumberFocused,
        payload: true,
      });
    },
    placeholder: "Enter a printer serial number",
    semanticName: "printer serial number",
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
    label: "Printer Model",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterModelFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setPrinterModel,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterModelFocused,
        payload: true,
      });
    },
    placeholder: "Enter a printer model",
    semanticName: "printer model",
    required: true,
    withAsterisk: true,
  };

  const printerMakeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select a printer make",
    data: PRINTER_MAKE_SELECT_OPTIONS,
    label: "Printer Make",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setPrinterMake,
        payload: event.currentTarget.value as PrinterMake,
      });
    },
    value: printerMake,
    required: true,
    withAsterisk: true,
  };

  const printerIssueDescriptionTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: printerIssueDescriptionInputErrorText,
      valid: printerIssueDescriptionInputValidText,
    },
    inputText: printerIssueDescription,
    isValidInputText: isValidPrinterIssueDescription,
    label: "Printer Issue Description",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterIssueDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setPrinterIssueDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsPrinterIssueDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter a printer issue description",
    semanticName: "printer issue description",
    required: true,
    withAsterisk: true,
  };

  const additionalInformationTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: additionalInformationInputErrorText,
      valid: additionalInformationInputValidText,
    },
    inputText: additionalInformation,
    isValidInputText: isValidAdditionalInformation,
    label: "Additional Information",
    onBlur: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsAdditionalInformationFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setAdditionalInformation,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      printerIssueDispatch({
        type: printerIssueAction.setIsAdditionalInformationFocused,
        payload: true,
      });
    },
    placeholder: "Enter additional information",
    semanticName: "additional information",
  };

  const urgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select an urgency",
    label: "Urgency",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setUrgency,
        payload: event.currentTarget.value as Urgency,
      });
    },
    data: URGENCY_DATA,
    value: urgency,
    required: true,
    withAsterisk: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "printer issue form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      printerIssueDispatch({
        type: printerIssueAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
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

  const [createdContactNumberPhoneInput] = returnAccessiblePhoneNumberTextInputElements([
    contactNumberPhoneInputCreatorInfo,
  ]);

  const [createdPrinterIssueDescriptionTextArea, createdAdditionalInformationTextArea] =
    returnAccessibleTextAreaInputElements([
      printerIssueDescriptionTextAreaCreatorInfo,
      additionalInformationTextAreaCreatorInfo,
    ]);

  const [createdUrgencySelectInput, createdPrinterMakeSelectInput] =
    returnAccessibleSelectInputElements([
      urgencySelectInputCreatorInfo,
      printerMakeSelectInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === PRINTER_ISSUE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting"
            : "Submit Printer Issue form"
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
    "Personal and Contact Details": [
      {
        inputName: "Title",
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: "Contact Number",
        inputValue: contactNumber,
        isInputValueValid: isValidContactNumber,
      },
      {
        inputName: "Contact Email",
        inputValue: contactEmail,
        isInputValueValid: isValidContactEmail,
      },
      {
        inputName: "Date of Occurrence",
        inputValue: dateOfOccurrence,
        isInputValueValid: isValidDateOfOccurrence,
      },
      {
        inputName: "Time of Occurrence",
        inputValue: timeOfOccurrence,
        isInputValueValid: isValidTimeOfOccurrence,
      },
    ],
    "Printer Details": [
      {
        inputName: "Printer Serial Number",
        inputValue: printerSerialNumber,
        isInputValueValid: isValidPrinterSerialNumber,
      },
      {
        inputName: "Printer Model",
        inputValue: printerModel,
        isInputValueValid: isValidPrinterModel,
      },
      {
        inputName: "Printer Make",
        inputValue: printerMake,
        isInputValueValid: true,
      },
      {
        inputName: "Printer Issue Description",
        inputValue: printerIssueDescription,
        isInputValueValid: isValidPrinterIssueDescription,
      },
      {
        inputName: "Additional Information",
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: "Urgency",
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
          navigate("/home/general/printer-issue/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displayPrinterIssueForm =
    currentStepperPosition === 0
      ? displayPrinterIssueFormFirstPage
      : currentStepperPosition === 1
      ? displayPrinterIssueFormSecondPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayPrinterIssueComponent = (
    <StepperWrapper
      childrenTitle="Printer issue"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={PRINTER_ISSUE_DESCRIPTION_OBJECTS}
      maxStepperPosition={PRINTER_ISSUE_MAX_STEPPER_POSITION}
      parentComponentDispatch={printerIssueDispatch}
      setCurrentStepperPosition={printerIssueAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayPrinterIssueForm}
    </StepperWrapper>
  );

  return displayPrinterIssueComponent;

 */
