import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { DEPARTMENT_DATA, URGENCY_DATA } from "../../../constants/data";
import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  REQUEST_RESOURCE_ROLE_PATHS,
  REQUEST_RESOURCE_TYPE_DATA,
  returnRequestResourceStepperPages,
} from "../constants";
import { RequestResourceAction, requestResourceAction } from "./actions";
import { requestResourceReducer } from "./reducers";
import { initialRequestResourceState } from "./state";
import { RequestResourceSchema, RequestResourceType, Urgency } from "./types";

function RequestResource() {
  const [requestResourceState, requestResourceDispatch] = useReducer(
    requestResourceReducer,
    initialRequestResourceState
  );

  const {
    department,
    resourceType,
    resourceQuantity,
    resourceDescription,
    reasonForRequest,
    urgency,
    dateNeededBy,
    additionalInformation,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = requestResourceState;

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
      const requestResourceSchema: RequestResourceSchema = {
        additionalInformation,
        dateNeededBy,
        department,
        reasonForRequest,
        requestStatus: "pending",
        resourceDescription,
        resourceQuantity: parseFloat(resourceQuantity),
        resourceType,
        urgency,
        userId,
        username,
      };

      formSubmitPOST({
        dispatch: requestResourceDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: requestResourceAction.setIsSubmitting,
        isSuccessfulAction: requestResourceAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: REQUEST_RESOURCE_ROLE_PATHS,
        schema: requestResourceSchema,
        schemaName: "requestResourceSchema",
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

  useEffect(() => {
    logState({
      state: requestResourceState,
      groupLabel: "Request Resource State",
    });
  }, [requestResourceState]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting benefit! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Benefit submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const RESOURCE_REQUEST_STEPPER_PAGES: StepperPage[] =
    returnRequestResourceStepperPages();

  /**
     * 
type RequestResourceState = {
  additionalInformation: string;
  dateNeededBy: string;
  department: Department;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  reasonForRequest: string;
  resourceDescription: string;
  resourceQuantity: string;
  resourceType: RequestResourceType;
  triggerFormSubmit: boolean;
  urgency: Urgency;
};
     */

  const additionalInformationTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: requestResourceAction.setPageInError,
        name: "additionalInformation",
        parentDispatch: requestResourceDispatch,
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        validValueAction: requestResourceAction.setAdditionalInformation,
        value: additionalInformation,
      }}
    />
  );

  const dateNeededByDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: requestResourceAction.setPageInError,
        name: "dateNeededBy",
        parentDispatch: requestResourceDispatch,
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        validValueAction: requestResourceAction.setDateNeededBy,
        value: dateNeededBy,
      }}
    />
  );

  const departmentSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DEPARTMENT_DATA,
        name: "department",
        parentDispatch: requestResourceDispatch,
        value: department,
        validValueAction: requestResourceAction.setDepartment,
      }}
    />
  );

  const reasonForRequestTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: requestResourceAction.setPageInError,
        name: "reasonForRequest",
        parentDispatch: requestResourceDispatch,
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        validValueAction: requestResourceAction.setReasonForRequest,
        value: reasonForRequest,
      }}
    />
  );

  const resourceDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: requestResourceAction.setPageInError,
        name: "resourceDescription",
        parentDispatch: requestResourceDispatch,
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        validValueAction: requestResourceAction.setResourceDescription,
        value: resourceDescription,
      }}
    />
  );

  const resourceQuantityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: requestResourceAction.setPageInError,
        name: "resourceQuantity",
        parentDispatch: requestResourceDispatch,
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        validValueAction: requestResourceAction.setResourceQuantity,
        value: resourceQuantity,
      }}
    />
  );

  const resourceTypeSelectInput = (
    <AccessibleSelectInput<RequestResourceAction["setResourceType"], RequestResourceType>
      attributes={{
        data: REQUEST_RESOURCE_TYPE_DATA,
        name: "resourceType",
        parentDispatch: requestResourceDispatch,
        value: resourceType,
        validValueAction: requestResourceAction.setResourceType,
      }}
    />
  );

  const urgencySelectInput = (
    <AccessibleSelectInput<RequestResourceAction["setUrgency"], Urgency>
      attributes={{
        data: URGENCY_DATA,
        name: "urgency",
        parentDispatch: requestResourceDispatch,
        value: urgency,
        validValueAction: requestResourceAction.setUrgency,
      }}
    />
  );

  const firstPage = (
    <Stack>
      {additionalInformationTextAreaInput}
      {dateNeededByDateInput}
      {reasonForRequestTextInput}
      {departmentSelectInput}
      {resourceTypeSelectInput}
      {resourceQuantityTextInput}
      {resourceDescriptionTextAreaInput}
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
          requestResourceDispatch({
            action: requestResourceAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: requestResourceState,
        pageElements: [firstPage],
        stepperPages: RESOURCE_REQUEST_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default RequestResource;

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

    async function handleRequestResourceFormSubmit() {
      requestResourceDispatch({
        type: requestResourceAction.setIsSubmitting,
        payload: true,
      });
      requestResourceDispatch({
        type: requestResourceAction.setSubmitMessage,
        payload: `Submitting Request ${resourceType} Resource form ...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: "actions/company/request-resource" });

      const body = JSON.stringify({
        requestResourceSchema: {
          department,
          resourceType,
          resourceQuantity,
          resourceDescription,
          reasonForRequest,
          urgency,
          dateNeededBy,
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

        const data: ResourceRequestServerResponse<RequestResourceDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        requestResourceDispatch({
          type: requestResourceAction.setIsSuccessful,
          payload: false,
        });
        requestResourceDispatch({
          type: requestResourceAction.setSuccessMessage,
          payload:
            data.message ??
            `New request resource of kind ${resourceType} for ${department} created`,
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
          requestResourceDispatch({
            type: requestResourceAction.setIsSubmitting,
            payload: false,
          });
          requestResourceDispatch({
            type: requestResourceAction.setSubmitMessage,
            payload: "",
          });
          requestResourceDispatch({
            type: requestResourceAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleRequestResourceFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  const departmentInputRef = useRef<HTMLSelectElement>(null);
  // sets focus on department input on first render
  useEffect(() => {
    departmentInputRef.current?.focus();
  }, []);

  // validate resource quantity input on every change
  useEffect(() => {
    // remove leading zeros
    const resourceQuantityWithoutLeadingZeros = resourceQuantity.replace(/^0+(?=\d)/, ""); // removes leading zeros if amount !== '0.00'

    requestResourceDispatch({
      type: requestResourceAction.setResourceQuantity,
      payload: resourceQuantityWithoutLeadingZeros,
    });

    const isValid = MONEY_REGEX.test(resourceQuantity);
    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceQuantity,
      payload: isValid,
    });
  }, [resourceQuantity]);

  // validate resource description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(resourceDescription);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceDescription,
      payload: isValid,
    });
  }, [resourceDescription]);

  // validate reason for request input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(reasonForRequest);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidReasonForRequest,
      payload: isValid,
    });
  }, [reasonForRequest]);

  // validate date needed by input on every change
  useEffect(() => {
    const dateRegexTest = DATE_NEAR_FUTURE_REGEX.test(dateNeededBy);
    const currentDate = new Date();
    const dateNeededByDate = new Date(dateNeededBy);
    const isValid = dateRegexTest && dateNeededByDate.getTime() > currentDate.getTime();

    requestResourceDispatch({
      type: requestResourceAction.setIsValidDateNeededBy,
      payload: isValid,
    });
  }, [dateNeededBy]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // update stepper state on every change
  useEffect(() => {
    const isStepInError = !isValidResourceQuantity || !isValidResourceDescription;

    requestResourceDispatch({
      type: requestResourceAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [isValidResourceQuantity, isValidResourceDescription]);

  // update stepper state on every change
  useEffect(() => {
    const areOptionalStepsInError =
      (reasonForRequest.length > 0 && !isValidReasonForRequest) ||
      (additionalInformation.length > 0 && !isValidAdditionalInformation);
    const isRequiredStepInError = !isValidDateNeededBy;
    const isStepInError = isRequiredStepInError || areOptionalStepsInError;

    requestResourceDispatch({
      type: requestResourceAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isValidDateNeededBy,
    isValidReasonForRequest,
    isValidAdditionalInformation,
    reasonForRequest,
    additionalInformation,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [resourceQuantityInputErrorText, resourceQuantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "resource quantity",
      inputText: resourceQuantity,
      isInputTextFocused: isResourceQuantityFocused,
      isValidInputText: isValidResourceQuantity,
      regexValidationText: returnFloatAmountValidationText({
        content: resourceQuantity,
        contentKind: "resource quantity",
      }),
    });

  const [resourceDescriptionInputErrorText, resourceDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "resource description",
      inputText: resourceDescription,
      isInputTextFocused: isResourceDescriptionFocused,
      isValidInputText: isValidResourceDescription,
      regexValidationText: returnGrammarValidationText({
        content: resourceDescription,
        contentKind: "resource description",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [reasonForRequestInputErrorText, reasonForRequestInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "reason for request",
      inputText: reasonForRequest,
      isInputTextFocused: isReasonForRequestFocused,
      isValidInputText: isValidReasonForRequest,
      regexValidationText: returnGrammarValidationText({
        content: reasonForRequest,
        contentKind: "reason for request",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [dateNeededByInputErrorText, dateNeededByInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "date needed by",
      inputText: dateNeededBy,
      isInputTextFocused: isDateNeededByFocused,
      isValidInputText: isValidDateNeededBy,
      regexValidationText: returnDateNearFutureValidationText({
        content: dateNeededBy,
        contentKind: "date needed by",
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

  const departmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DEPARTMENT_DATA,
    description: "Select the department for which you are requesting a resource.",
    label: "Department",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setDepartment,
        payload: event.currentTarget.value as Department,
      });
    },
    value: department,
    withAsterisk: true,
    required: true,
  };

  const resourceKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REQUEST_RESOURCE_TYPE_DATA,
    description: "Select the kind of resource you are requesting.",
    label: "Resource",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setResourceType,
        payload: event.currentTarget.value as RequestResourceType,
      });
    },
    value: resourceType,
    withAsterisk: true,
    required: true,
  };

  const resourceQuantityInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: resourceQuantityInputErrorText,
      valid: resourceQuantityInputValidText,
    },
    inputText: resourceQuantity,
    isValidInputText: isValidResourceQuantity,
    label: "Quantity",
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceQuantityFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setResourceQuantity,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceQuantityFocused,
        payload: true,
      });
    },
    placeholder: "Enter resource amount",
    semanticName: "resource quantity",
    minLength: 3,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const resourceDescriptionTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: resourceDescriptionInputErrorText,
      valid: resourceDescriptionInputValidText,
    },
    inputText: resourceDescription,
    isValidInputText: isValidResourceDescription,
    label: "Description",
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setResourceDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter resource description",
    semanticName: "resource description",
    required: true,
    withAsterisk: true,
  };

  const reasonForRequestTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: reasonForRequestInputErrorText,
      valid: reasonForRequestInputValidText,
    },
    inputText: reasonForRequest,
    isValidInputText: isValidReasonForRequest,
    label: "Reason for Request",
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsReasonForRequestFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setReasonForRequest,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsReasonForRequestFocused,
        payload: true,
      });
    },
    placeholder: "Enter reason for request",
    semanticName: "reason for request",
  };

  const urgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: URGENCY_DATA,
    description: "Select the urgency of your request.",
    label: "Urgency",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setUrgency,
        payload: event.currentTarget.value as Urgency,
      });
    },
    value: urgency,
    withAsterisk: true,
    required: true,
  };

  const additionalInformationTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalInformationInputErrorText,
        valid: additionalInformationInputValidText,
      },
      inputText: additionalInformation,
      isValidInputText: isValidAdditionalInformation,
      label: "Additional Information",
      onBlur: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        requestResourceDispatch({
          type: requestResourceAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: "Enter additional information",
      semanticName: "additional information",
    };

  const dateNeededByDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: dateNeededByInputErrorText,
      valid: dateNeededByInputValidText,
    },
    inputText: dateNeededBy,
    isValidInputText: isValidDateNeededBy,
    label: "Date Needed by",
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsDateNeededByFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setDateNeededBy,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsDateNeededByFocused,
        payload: true,
      });
    },
    placeholder: "Enter date needed by",
    semanticName: "date needed by",
    inputKind: "date",
    dateKind: "date near future",
    required: true,
    withAsterisk: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "request resource form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [
    createdDepartmentSelectInput,
    createdResourceKindSelectInput,
    createdUrgencySelectInput,
  ] = returnAccessibleSelectInputElements([
    departmentSelectInputCreatorInfo,
    resourceKindSelectInputCreatorInfo,
    urgencySelectInputCreatorInfo,
  ]);

  const [createdResourceQuantityTextInput, createdReasonForRequestTextInput] =
    returnAccessibleTextInputElements([
      resourceQuantityInputCreatorInfo,
      reasonForRequestTextInputCreatorInfo,
    ]);

  const [
    createdResourceDescriptionTextAreaInput,
    createdAdditionalInformationTextAreaInput,
  ] = returnAccessibleTextAreaInputElements([
    resourceDescriptionTextAreaCreatorInfo,
    additionalInformationTextAreaInputCreatorInfo,
  ]);

  const [createdDateNeededByDateInput] = returnAccessibleDateTimeElements([
    dateNeededByDateInputCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === REQUEST_RESOURCE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting form"
            : "Submit Request Resource form"
        }
      >
        <Group position="center" w="100%">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayRequestResourceFormPageOne = (
    <FormLayoutWrapper>
      {createdDepartmentSelectInput}
      {createdResourceKindSelectInput}
      {createdResourceQuantityTextInput}
      {createdResourceDescriptionTextAreaInput}
    </FormLayoutWrapper>
  );

  const displayRequestResourceFormPageTwo = (
    <FormLayoutWrapper>
      {createdReasonForRequestTextInput}
      {createdUrgencySelectInput}
      {createdAdditionalInformationTextAreaInput}
      {createdDateNeededByDateInput}
    </FormLayoutWrapper>
  );

  const REQUEST_RESOURCE_REVIEW_OBJECT: FormReviewObjectArray = {
    "Resource Details": [
      {
        inputName: "Department",
        inputValue: department,
        isInputValueValid: true,
      },
      {
        inputName: "Resource",
        inputValue: resourceType,
        isInputValueValid: true,
      },
      {
        inputName: "Quantity",
        inputValue: resourceQuantity,
        isInputValueValid: isValidResourceQuantity,
      },
      {
        inputName: "Description",
        inputValue: resourceDescription,
        isInputValueValid: isValidResourceDescription,
      },
    ],
    "Reason and Urgency": [
      {
        inputName: "Reason for Request",
        inputValue: reasonForRequest,
        isInputValueValid: isValidReasonForRequest,
      },
      {
        inputName: "Urgency",
        inputValue: urgency,
        isInputValueValid: true,
      },
      {
        inputName: "Additional Information",
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: "Date Needed by",
        inputValue: dateNeededBy,
        isInputValueValid: isValidDateNeededBy,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage
      formReviewObject={REQUEST_RESOURCE_REVIEW_OBJECT}
      formName="Request Resource"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/company/request-resource/display");
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

  const displayRequestResourceForm =
    currentStepperPosition === 0
      ? displayRequestResourceFormPageOne
      : currentStepperPosition === 1
      ? displayRequestResourceFormPageTwo
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayRequestResourceComponent = (
    <StepperWrapper
      childrenTitle="Request resource"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={REQUEST_RESOURCE_DESCRIPTION_OBJECTS}
      maxStepperPosition={REQUEST_RESOURCE_MAX_STEPPER_POSITION}
      parentComponentDispatch={requestResourceDispatch}
      setCurrentStepperPosition={requestResourceAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayRequestResourceForm}
    </StepperWrapper>
  );

  return displayRequestResourceComponent;

 */
