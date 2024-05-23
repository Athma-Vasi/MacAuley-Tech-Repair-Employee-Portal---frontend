import { Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { LEAVE_REQUESTS_ROLE_PATHS, returnLeaveRequestStepperPages } from "../constants";
import { LeaveRequestSchema, ReasonForLeave } from "../types";
import { LeaveRequestAction, leaveRequestAction } from "./actions";
import { REASON_FOR_LEAVE_DATA } from "./constants";
import { leaveRequestReducer } from "./reducers";
import { initialLeaveRequestState } from "./state";

function LeaveRequest() {
  const [leaveRequestState, leaveRequestDispatch] = useReducer(
    leaveRequestReducer,
    initialLeaveRequestState
  );

  const {
    startDate,
    endDate,
    areValidLeaveDates,
    reasonForLeave,
    delegatedToEmployee,
    delegatedResponsibilities,
    additionalComments,
    acknowledgement,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = leaveRequestState;

  useEffect(() => {
    logState({
      state: leaveRequestState,
      groupLabel: "Leave Request",
    });
  }, [leaveRequestState]);

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
      const leaveRequestSchema: LeaveRequestSchema = {
        acknowledgement,
        additionalComments,
        delegatedResponsibilities,
        delegatedToEmployee,
        endDate,
        reasonForLeave,
        requestStatus: "pending",
        startDate,
        userId,
        username,
      };

      formSubmitPOST({
        dispatch: leaveRequestDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: leaveRequestAction.setIsSubmitting,
        isSuccessfulAction: leaveRequestAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: LEAVE_REQUESTS_ROLE_PATHS,
        schema: leaveRequestSchema,
        schemaName: "leaveRequestSchema",
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

  const CREATE_LEAVE_REQUEST_PAGES: StepperPage[] = returnLeaveRequestStepperPages();

  const acknowledgementSwitch = (
    <AccessibleSwitchInput
      attributes={{
        checked: acknowledgement,
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "acknowledgement",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch: leaveRequestDispatch,
        switchOffDescription: "I do not acknowledge",
        switchOnDescription: "I acknowledge that the information is correct",
        validValueAction: leaveRequestAction.setAcknowledgement,
        value: acknowledgement.toString(),
      }}
    />
  );

  const additionalCommentsTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "additionalComments",
        parentDispatch: leaveRequestDispatch,
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        validValueAction: leaveRequestAction.setAdditionalComments,
        value: additionalComments,
      }}
    />
  );

  const delegatedResponsibilitiesTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "delegatedResponsibilities",
        parentDispatch: leaveRequestDispatch,
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        validValueAction: leaveRequestAction.setDelegatedResponsibilities,
        value: delegatedResponsibilities,
      }}
    />
  );

  const delegatedToEmployeeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "delegatedToEmployee",
        parentDispatch: leaveRequestDispatch,
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        validValueAction: leaveRequestAction.setDelegatedToEmployee,
        value: delegatedToEmployee,
      }}
    />
  );

  const endDateTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "endDate",
        parentDispatch: leaveRequestDispatch,
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        validValueAction: leaveRequestAction.setEndDate,
        value: endDate,
      }}
    />
  );

  const reasonForLeaveSelectInput = (
    <AccessibleSelectInput<LeaveRequestAction["setReasonForLeave"], ReasonForLeave>
      attributes={{
        data: REASON_FOR_LEAVE_DATA,
        name: "reasonForLeave",
        parentDispatch: leaveRequestDispatch,
        validValueAction: leaveRequestAction.setReasonForLeave,
      }}
    />
  );

  const startDateTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: leaveRequestAction.setPageInError,
        name: "startDate",
        parentDispatch: leaveRequestDispatch,
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        validValueAction: leaveRequestAction.setStartDate,
        value: startDate,
      }}
    />
  );

  const firstPage = (
    <Stack>
      {startDateTextInput}
      {endDateTextInput}
      {reasonForLeaveSelectInput}
      {delegatedToEmployeeTextInput}
      {delegatedResponsibilitiesTextAreaInput}
      {additionalCommentsTextAreaInput}
      {acknowledgementSwitch}
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
          leaveRequestDispatch({
            action: leaveRequestAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: leaveRequestState,
        pageElements: [firstPage],
        stepperPages: CREATE_LEAVE_REQUEST_PAGES,
        submitButton,
      }}
    />
  );

  return stepper;
}

export default LeaveRequest;

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

    async function handleCreateLeaveRequestFormSubmit() {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsSubmitting,
        payload: true,
      });
      leaveRequestDispatch({
        type: leaveRequestAction.setSubmitMessage,
        payload: `Submitting ${reasonForLeave} leave request form`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: "actions/company/leave-request" });

      const body = JSON.stringify({
        leaveRequestSchema: {
          startDate,
          endDate,
          reasonForLeave,
          delegatedToEmployee,
          delegatedResponsibilities,
          additionalComments,
          acknowledgement: isAcknowledged,
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

        const data: ResourceRequestServerResponse<LeaveRequestDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        leaveRequestDispatch({
          type: leaveRequestAction.setIsSuccessful,
          payload: true,
        });
        leaveRequestDispatch({
          type: leaveRequestAction.setSuccessMessage,
          payload:
            data.message ?? `Successfully created ${reasonForLeave} leave request form`,
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
          leaveRequestDispatch({
            type: leaveRequestAction.setIsSubmitting,
            payload: false,
          });
          leaveRequestDispatch({
            type: leaveRequestAction.setSubmitMessage,
            payload: "",
          });
          leaveRequestDispatch({
            type: leaveRequestAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleCreateLeaveRequestFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate start date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(startDate);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidStartDate,
      payload: isValid,
    });
  }, [startDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(endDate);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidEndDate,
      payload: isValid,
    });
  }, [endDate]);

  // validate leave dates on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currDate = new Date(currentMonth);
    const isValid =
      new Date(startDate) < new Date(endDate) && new Date(endDate) > currDate;

    leaveRequestDispatch({
      type: leaveRequestAction.setAreValidLeaveDates,
      payload: isValid,
    });
  }, [startDate, endDate, isValidStartDate, isValidEndDate]);

  // validate delegated to employee on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(delegatedToEmployee);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidDelegatedToEmployee,
      payload: isValid,
    });
  }, [delegatedToEmployee]);

  // validate delegated responsibilities on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(delegatedResponsibilities);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidDelegatedResponsibilities,
      payload: isValid,
    });
  }, [delegatedResponsibilities]);

  // validate additional comments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidAdditionalComments,
      payload: isValid,
    });
  }, [additionalComments]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const areRequiredInputsInError = !areValidLeaveDates || !isAcknowledged;

    const areOptionalInputsInError =
      (delegatedToEmployee !== "" && !isValidDelegatedToEmployee) ||
      (delegatedResponsibilities !== "" && !isValidDelegatedResponsibilities) ||
      (additionalComments !== "" && !isValidAdditionalComments);

    const isStepInError = areRequiredInputsInError || areOptionalInputsInError;

    leaveRequestDispatch({
      type: leaveRequestAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    areValidLeaveDates,
    isAcknowledged,
    delegatedToEmployee,
    isValidDelegatedToEmployee,
    delegatedResponsibilities,
    isValidDelegatedResponsibilities,
    additionalComments,
    isValidAdditionalComments,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const leaveDatesInvalidText = areValidLeaveDates
    ? ""
    : "The leave start date must be before the leave end date and both must be in the future. ";
  const [startDateInputErrorText, startDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "start date",
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText({
        content: startDate,
        contentKind: "start date",
      })}`,
    });

  const [endDateInputErrorText, endDateInputValidText] = AccessibleErrorValidTextElements(
    {
      inputElementKind: "end date",
      inputText: endDate,
      isInputTextFocused: isEndDateFocused,
      isValidInputText: isValidEndDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText({
        content: endDate,
        contentKind: "end date",
      })}`,
    }
  );

  const [delegatedToEmployeeInputErrorText, delegatedToEmployeeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "delegated to employee",
      inputText: delegatedToEmployee,
      isInputTextFocused: isDelegatedToEmployeeFocused,
      isValidInputText: isValidDelegatedToEmployee,
      regexValidationText: returnGrammarValidationText({
        content: delegatedToEmployee,
        contentKind: "delegated to employee",
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [
    delegatedResponsibilitiesInputErrorText,
    delegatedResponsibilitiesInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "delegated responsibilities",
    inputText: delegatedResponsibilities,
    isInputTextFocused: isDelegatedResponsibilitiesFocused,
    isValidInputText: isValidDelegatedResponsibilities,
    regexValidationText: returnGrammarValidationText({
      content: delegatedResponsibilities,
      contentKind: "delegated responsibilities",
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "additional comments",
      inputText: additionalComments,
      isInputTextFocused: isAdditionalCommentsFocused,
      isValidInputText: isValidAdditionalComments,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: "additional comments",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isAcknowledged,
      semanticName: "acknowledgement",
      selectedDescription: "I acknowledge that the information is correct",
      deselectedDescription: "I do not acknowledge",
    });

  const startDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: "date near future",
    description: {
      error: startDateInputErrorText,
      valid: startDateInputValidText,
    },
    inputKind: "date",
    inputText: startDate,
    isValidInputText: isValidStartDate && areValidLeaveDates,
    label: "Leave start date",
    onBlur: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsStartDateFocused,
        payload: true,
      });
    },
    placeholder: "DD-MM-YYYY",
    semanticName: "start date",
    required: true,
    withAsterisk: true,
  };

  const endDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: "date near future",
    description: {
      error: endDateInputErrorText,
      valid: endDateInputValidText,
    },
    inputKind: "date",
    inputText: endDate,
    isValidInputText: isValidEndDate && areValidLeaveDates,
    label: "Leave end date",
    onBlur: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsEndDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setEndDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsEndDateFocused,
        payload: true,
      });
    },
    placeholder: "DD-MM-YYYY",
    semanticName: "end date",
    required: true,
    withAsterisk: true,
  };

  const reasonForLeaveSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REASON_FOR_LEAVE_DATA,
    description: "Select reason for leave",
    label: "Reason for leave",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setReasonForLeave,
        payload: event.currentTarget.value as ReasonForLeave,
      });
    },
    value: reasonForLeave,
    required: true,
    withAsterisk: true,
  };

  const delegatedToEmployeeTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: delegatedToEmployeeInputErrorText,
      valid: delegatedToEmployeeInputValidText,
    },
    inputText: delegatedToEmployee,
    isValidInputText: isValidDelegatedToEmployee,
    label: "Delegated to employee",
    onBlur: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setDelegatedToEmployee,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
        payload: true,
      });
    },
    placeholder: "Enter name of employee",
    semanticName: "delegated to employee",
    minLength: 2,
    maxLength: 100,
  };

  const delegatedResponsibilitiesTextareaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: delegatedResponsibilitiesInputErrorText,
        valid: delegatedResponsibilitiesInputValidText,
      },
      inputText: delegatedResponsibilities,
      isValidInputText: isValidDelegatedResponsibilities,
      label: "Delegated responsibilities",
      onBlur: () => {
        leaveRequestDispatch({
          type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        leaveRequestDispatch({
          type: leaveRequestAction.setDelegatedResponsibilities,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
          payload: true,
        });
      },
      placeholder: "Enter delegated responsibilities",
      semanticName: "delegated responsibilities",
    };

  const additionalCommentsTextareaCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: additionalCommentsInputErrorText,
      valid: additionalCommentsInputValidText,
    },
    inputText: additionalComments,
    isValidInputText: isValidAdditionalComments,
    label: "Additional comments",
    onBlur: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsAdditionalCommentsFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setAdditionalComments,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsAdditionalCommentsFocused,
        payload: true,
      });
    },
    placeholder: "Enter additional comments",
    semanticName: "additional comments",
  };

  const acknowledgementCheckboxCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo = {
    description: {
      selected: acknowledgementInputSelectedText,
      deselected: acknowledgementInputDeselectedText,
    },
    checked: isAcknowledged,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setAcknowledgement,
        payload: event.currentTarget.checked,
      });
    },
    semanticName: "acknowledgement",
    label: "Acknowledgement",
    required: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "leave request form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdDelegatedToEmployeeTextInput] = returnAccessibleTextInputElements([
    delegatedToEmployeeTextInputCreatorInfo,
  ]);

  const [
    createdDelegatedResponsibilitiesTextareaInput,
    createdAdditionalInformationTextareaInput,
  ] = returnAccessibleTextAreaInputElements([
    delegatedResponsibilitiesTextareaCreatorInfo,
    additionalCommentsTextareaCreatorInfo,
  ]);

  const [createdStartDateInput, createdEndDateInput] = returnAccessibleDateTimeElements([
    startDateInputCreatorInfo,
    endDateInputCreatorInfo,
  ]);

  const [createdReasonForLeaveSelectInput] = returnAccessibleSelectInputElements([
    reasonForLeaveSelectInputCreatorInfo,
  ]);

  const [createdAcknowledgementCheckbox] = returnAccessibleCheckboxSingleInputElements([
    acknowledgementCheckboxCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === LEAVE_REQUEST_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting"
            : "Submit Leave Request form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayCreateLeaveRequestFirstPage = (
    <FormLayoutWrapper>
      {createdStartDateInput}
      {createdEndDateInput}
      {createdReasonForLeaveSelectInput}
      {createdDelegatedToEmployeeTextInput}
      {createdDelegatedResponsibilitiesTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdAcknowledgementCheckbox}
    </FormLayoutWrapper>
  );

  const LEAVE_REQUEST_REVIEW_OBJECT: FormReviewObjectArray = {
    "Leave request details": [
      {
        inputName: "Leave start date",
        inputValue: startDate,
        isInputValueValid: isValidStartDate,
      },
      {
        inputName: "Leave end date",
        inputValue: endDate,
        isInputValueValid: isValidEndDate,
      },
      {
        inputName: "Reason for leave",
        inputValue: reasonForLeave,
      },
      {
        inputName: "Delegated to employee",
        inputValue: delegatedToEmployee,
        isInputValueValid: isValidDelegatedToEmployee,
      },
      {
        inputName: "Delegated responsibilities",
        inputValue: delegatedResponsibilities,
        isInputValueValid: isValidDelegatedResponsibilities,
      },
      {
        inputName: "Additional comments",
        inputValue: additionalComments,
        isInputValueValid: isValidAdditionalComments,
      },
      {
        inputName: "Acknowledgement",
        isInputValueValid: isAcknowledged,
      },
    ],
  };

  const displayReviewPage = (
    <FormReviewPage
      formReviewObject={LEAVE_REQUEST_REVIEW_OBJECT}
      formName="Leave request"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/company/leave-request/display");
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

  const displayCreateLeaveRequestForm =
    currentStepperPosition === 0
      ? displayCreateLeaveRequestFirstPage
      : currentStepperPosition === 1
      ? displayReviewPage
      : displaySubmitButton;

  const displayCreateLeaveRequestComponent = (
    <StepperWrapper
      childrenTitle="Create leave request"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={LEAVE_REQUEST_DESCRIPTION_OBJECTS}
      maxStepperPosition={LEAVE_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={leaveRequestDispatch}
      setCurrentStepperPosition={leaveRequestAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateLeaveRequestForm}
    </StepperWrapper>
  );

  return displayCreateLeaveRequestComponent;

 */
