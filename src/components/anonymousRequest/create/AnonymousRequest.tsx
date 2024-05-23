import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { URGENCY_DATA } from "../../../constants/data";
import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage, Urgency } from "../../../types";
import { formSubmitPOST } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  ANONYMOUS_REQUEST_KINDS,
  ANONYMOUS_REQUEST_ROLE_PATHS,
  returnAnonymousRequestStepperPages,
} from "../constants";
import { AnonymousRequestAction, anonymousRequestAction } from "./actions";
import { anonymousRequestReducer } from "./reducers";
import { initialAnonymousRequestState } from "./state";
import { AnonymousRequestKind, AnonymousRequestSchema } from "./types";

function AnonymousRequest() {
  const [anonymousRequestState, anonymousRequestDispatch] = useReducer(
    anonymousRequestReducer,
    initialAnonymousRequestState
  );

  const {
    title,
    secureContactNumber,
    secureContactEmail,
    requestKind,
    requestDescription,
    additionalInformation,
    urgency,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = anonymousRequestState;

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
      const anonymousRequestSchema: AnonymousRequestSchema = {
        additionalInformation,
        requestDescription,
        requestKind,
        requestStatus: "pending",
        secureContactEmail,
        secureContactNumber,
        title,
        urgency,
      };

      formSubmitPOST({
        dispatch: anonymousRequestDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: anonymousRequestAction.setIsSubmitting,
        isSuccessfulAction: anonymousRequestAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: ANONYMOUS_REQUEST_ROLE_PATHS,
        schema: anonymousRequestSchema,
        schemaName: "anonymousRequestSchema",
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

  const ANONYMOUS_REQUEST_STEPPER_PAGES: StepperPage[] =
    returnAnonymousRequestStepperPages();

  /**
   * type AnonymousRequestState = {
  additionalInformation: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  requestDescription: string;
  requestKind: AnonymousRequestKind;
  secureContactEmail: string;
  secureContactNumber: PhoneNumber | string;
  title: string;
  triggerFormSubmit: boolean;
  urgency: Urgency;
};
   */

  const additionalInformationTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: anonymousRequestAction.setPageInError,
        name: "additionalInformation",
        parentDispatch: anonymousRequestDispatch,
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        validValueAction: anonymousRequestAction.setAdditionalInformation,
        value: additionalInformation,
      }}
    />
  );

  const requestDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: anonymousRequestAction.setPageInError,
        name: "requestDescription",
        parentDispatch: anonymousRequestDispatch,
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        validValueAction: anonymousRequestAction.setRequestDescription,
        value: requestDescription,
      }}
    />
  );

  const requestKindSelectInput = (
    <AccessibleSelectInput<AnonymousRequestAction["setRequestKind"], AnonymousRequestKind>
      attributes={{
        data: ANONYMOUS_REQUEST_KINDS,
        name: "requestKind",
        parentDispatch: anonymousRequestDispatch,
        value: requestKind,
        validValueAction: anonymousRequestAction.setRequestKind,
      }}
    />
  );

  const secureContactEmailTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: anonymousRequestAction.setPageInError,
        name: "secureContactEmail",
        parentDispatch: anonymousRequestDispatch,
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        validValueAction: anonymousRequestAction.setSecureContactEmail,
        value: secureContactEmail,
      }}
    />
  );

  const secureContactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: anonymousRequestAction.setPageInError,
        name: "secureContactNumber",
        parentDispatch: anonymousRequestDispatch,
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        validValueAction: anonymousRequestAction.setSecureContactNumber,
        value: secureContactNumber,
      }}
    />
  );

  const titleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: anonymousRequestAction.setPageInError,
        name: "title",
        parentDispatch: anonymousRequestDispatch,
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        validValueAction: anonymousRequestAction.setTitle,
        value: title,
      }}
    />
  );

  const urgencySelectInput = (
    <AccessibleSelectInput<AnonymousRequestAction["setUrgency"], Urgency>
      attributes={{
        data: URGENCY_DATA,
        name: "urgency",
        parentDispatch: anonymousRequestDispatch,
        value: urgency,
        validValueAction: anonymousRequestAction.setUrgency,
      }}
    />
  );

  const anonymousRequest = (
    <Stack>
      {titleTextInput}
      {secureContactNumberTextInput}
      {secureContactEmailTextInput}
      {requestKindSelectInput}
      {requestDescriptionTextAreaInput}
      {additionalInformationTextAreaInput}
      {urgencySelectInput}
    </Stack>
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
          anonymousRequestDispatch({
            action: anonymousRequestAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: anonymousRequestState,
        pageElements: [anonymousRequest],
        stepperPages: ANONYMOUS_REQUEST_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return <Container w={750}>{stepper}</Container>;
}

export default AnonymousRequest;

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

    async function handleAnonymousRequestFormSubmit() {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsSubmitting,
        payload: true,
      });
      anonymousRequestDispatch({
        type: anonymousRequestAction.setSubmitMessage,
        payload: "Your anonymous request is being submitted...",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/general/anonymous-request",
      });

      const body = JSON.stringify({
        anonymousRequestSchema: {
          title,
          secureContactNumber,
          secureContactEmail,
          requestKind,
          requestDescription,
          additionalInformation,
          urgency,
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

        const data: ResourceRequestServerResponse<AnonymousRequestDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        anonymousRequestDispatch({
          type: anonymousRequestAction.setIsSuccessful,
          payload: true,
        });
        anonymousRequestDispatch({
          type: anonymousRequestAction.setSuccessMessage,
          payload:
            data.message ?? "Your anonymous request has been submitted successfully!",
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
          anonymousRequestDispatch({
            type: anonymousRequestAction.setIsSubmitting,
            payload: false,
          });
          anonymousRequestDispatch({
            type: anonymousRequestAction.setSubmitMessage,
            payload: "",
          });
          anonymousRequestDispatch({
            type: anonymousRequestAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleAnonymousRequestFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate title on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);

    anonymousRequestDispatch({
      type: anonymousRequestAction.setIsValidTitle,
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
          anonymousRequestDispatch({
            type: anonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          anonymousRequestDispatch({
            type: anonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          anonymousRequestDispatch({
            type: anonymousRequestAction.setSecureContactNumber,
            payload: `${secureContactNumber}-` as PhoneNumber | string,
          });
          break;
        }

        default:
          break;
      }
    }

    anonymousRequestDispatch({
      type: anonymousRequestAction.setIsValidSecureContactNumber,
      payload: isValid,
    });
  }, [secureContactNumber, isSecureContactNumberFocused]);

  // validate secure contact email on every input change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(secureContactEmail);

    anonymousRequestDispatch({
      type: anonymousRequestAction.setIsValidSecureContactEmail,
      payload: isValid,
    });
  }, [secureContactEmail]);

  // validate request description on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(requestDescription);

    anonymousRequestDispatch({
      type: anonymousRequestAction.setIsValidRequestDescription,
      payload: isValid,
    });
  }, [requestDescription]);

  // validate additional information on every input change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    anonymousRequestDispatch({
      type: anonymousRequestAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredInputsInError = !isValidTitle || !isValidSecureContactEmail;
    const isOptionalInputInError =
      !isValidSecureContactNumber && secureContactNumber !== "+(1)";

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    // if any of the steps are in error, set the stepper position 1
    anonymousRequestDispatch({
      type: anonymousRequestAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
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
      !isValidAdditionalInformation && additionalInformation !== "";
    const isStepInError = isRequiredInputInError || isOptionalInputInError;

    // if any of the steps are in error, set the stepper position 2
    anonymousRequestDispatch({
      type: anonymousRequestAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [isValidRequestDescription, isValidAdditionalInformation, additionalInformation]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "title",
    inputText: title,
    isInputTextFocused: isTitleFocused,
    isValidInputText: isValidTitle,
    regexValidationText: returnGrammarValidationText({
      contentKind: "title",
      content: title,
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [secureContactNumberInputErrorText, secureContactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "secure contact number",
      inputText: secureContactNumber,
      isInputTextFocused: isSecureContactNumberFocused,
      isValidInputText: isValidSecureContactNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: secureContactNumber,
        contentKind: "secure contact number",
      }),
    });

  const [secureContactEmailInputErrorText, secureContactEmailInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "secure contact email",
      inputText: secureContactEmail,
      isInputTextFocused: isSecureContactEmailFocused,
      isValidInputText: isValidSecureContactEmail,
      regexValidationText: returnEmailValidationText({
        content: secureContactEmail,
        contentKind: "secure contact email",
      }),
    });

  const [requestDescriptionInputErrorText, requestDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "request description",
      inputText: requestDescription,
      isInputTextFocused: isRequestDescriptionFocused,
      isValidInputText: isValidRequestDescription,
      regexValidationText: returnGrammarValidationText({
        contentKind: "request description",
        content: requestDescription,
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
        contentKind: "additional information",
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
    label: "Title",
    onBlur: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter title of request",
    semanticName: "title",
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
      label: "Secure Contact Number",
      onBlur: () => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setIsSecureContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setSecureContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setIsSecureContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
          if (secureContactNumber.length === 14 || secureContactNumber.length === 9) {
            anonymousRequestDispatch({
              type: anonymousRequestAction.setSecureContactNumber,
              payload: secureContactNumber.slice(0, -1) as PhoneNumber | string,
            });
          }
        }
      },
      placeholder: "Enter secure contact number",
      rightSection: true,
      rightSectionOnClick: () => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setSecureContactNumber,
          payload: "+(1)",
        });
      },
      semanticName: "secure contact number",
      maxLength: 18,
    };

  const secureContactEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: secureContactEmailInputErrorText,
      valid: secureContactEmailInputValidText,
    },
    inputText: secureContactEmail,
    isValidInputText: isValidSecureContactEmail,
    label: "Secure Contact Email",
    onBlur: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsSecureContactEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setSecureContactEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsSecureContactEmailFocused,
        payload: true,
      });
    },
    placeholder: "Enter secure contact email",
    semanticName: "secure contact email",
    withAsterisk: true,
    required: true,
  };

  const requestKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: ANONYMOUS_REQUEST_KINDS,
    description: "Select the kind of request",
    label: "Request Kind",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setRequestKind,
        payload: event.currentTarget.value as AnonymousRequestKind,
      });
    },
    value: requestKind,
    required: true,
    withAsterisk: true,
  };

  const requestDescriptionTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: requestDescriptionInputErrorText,
      valid: requestDescriptionInputValidText,
    },
    inputText: requestDescription,
    isValidInputText: isValidRequestDescription,
    label: "Description",
    onBlur: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsRequestDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setRequestDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setIsRequestDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter description of request",
    semanticName: "request description",
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
      label: "Additional Information",
      onBlur: () => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        anonymousRequestDispatch({
          type: anonymousRequestAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: "Enter any other relevant additional information",
      semanticName: "additional information",
      maxRows: 10,
    };

  const requestUrgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: URGENCY_DATA,
    description: "Select the urgency of request",
    label: "Urgency",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setUrgency,
        payload: event.currentTarget.value as Urgency,
      });
    },
    value: urgency,
    withAsterisk: true,
    required: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "create anonymous request form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      anonymousRequestDispatch({
        type: anonymousRequestAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
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

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ANON_REQUEST_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting form"
            : "Submit Anonymous Request form"
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

  const ANONYMOUS_REQUEST_REVIEW_OBJECT: FormReviewObjectArray = {
    "Anonymous Request": [
      {
        inputName: "Title",
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: "Secure Contact Number",
        inputValue: secureContactNumber,
        isInputValueValid: isValidSecureContactNumber,
      },
      {
        inputName: "Secure Contact Email",
        inputValue: secureContactEmail,
        isInputValueValid: isValidSecureContactEmail,
      },
      {
        inputName: "Request Kind",
        inputValue: requestKind,
        isInputValueValid: true,
      },
    ],
    "Request Details": [
      {
        inputName: "Description",
        inputValue: requestDescription,
        isInputValueValid: isValidRequestDescription,
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
      formReviewObject={ANONYMOUS_REQUEST_REVIEW_OBJECT}
      formName="Anonymous Request"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/general/anonymous-request/display");
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

  const displayAnonymousRequestForm =
    currentStepperPosition === 0
      ? displayAnonRequestFirstPage
      : currentStepperPosition === 1
      ? displayAnonRequestSecondPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayAnonymousRequestComponent = (
    <StepperWrapper
      childrenTitle="Anonymous Request"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ANON_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={anonymousRequestDispatch}
      setCurrentStepperPosition={anonymousRequestAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayAnonymousRequestForm}
    </StepperWrapper>
  );

  return displayAnonymousRequestComponent;

 */
