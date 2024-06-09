import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleCheckboxInputGroup } from "../../accessibleInputs/AccessibleCheckboxInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  EMPLOYEE_ATTRIBUTES_DATA,
  ENDORSEMENT_ROLE_PATHS,
  returnEndorsementStepperPages,
} from "../constants";
import { endorsementAction } from "./actions";
import { endorsementReducer } from "./reducers";
import { initialEndorsementState } from "./state";
import { EndorsementSchema } from "./types";

function Endorsement() {
  const [endorsementState, endorsementDispatch] = useReducer(
    endorsementReducer,
    initialEndorsementState
  );

  const {
    attributeEndorsed,
    isSubmitting,
    isSuccessful,
    pagesInError,
    summaryOfEndorsement,
    title,
    triggerFormSubmit,
    personToBeEndorsed,
  } = endorsementState;

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
      const endorsementSchema: EndorsementSchema = {
        attributeEndorsed,
        personToBeEndorsed,
        requestStatus: "pending",
        summaryOfEndorsement,
        title,
        userId,
        username,
      };

      formSubmitPOST({
        dispatch: endorsementDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: endorsementAction.setIsSubmitting,
        isSuccessfulAction: endorsementAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: ENDORSEMENT_ROLE_PATHS,
        schema: endorsementSchema,
        schemaName: "endorsementSchema",
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
      state: endorsementState,
      groupLabel: "Endorsement State",
    });
  }, [endorsementState]);

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

  const ENDORSEMENT_STEPPER_PAGES: StepperPage[] = returnEndorsementStepperPages();

  /**
   * type EndorsementState = {
  attributeEndorsed: EmployeeAttributes;
  personToBeEndorsed: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  summaryOfEndorsement: string;
  title: string;
  triggerFormSubmit: boolean;
};

   */

  const attributeEndorsedSelectInput = (
    <AccessibleCheckboxInputGroup
      attributes={{
        inputData: EMPLOYEE_ATTRIBUTES_DATA,
        name: "attributeEndorsed",
        parentDispatch: endorsementDispatch,
        validValueAction: endorsementAction.setAttributeEndorsed,
        value: attributeEndorsed,
      }}
    />
  );

  const personToBeEndorsedTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: endorsementAction.setPageInError,
        name: "personToBeEndorsed",
        parentDispatch: endorsementDispatch,
        stepperPages: ENDORSEMENT_STEPPER_PAGES,
        validValueAction: endorsementAction.setPersonToBeEndorsed,
        value: personToBeEndorsed,
      }}
    />
  );

  const summaryOfEndorsementTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: endorsementAction.setPageInError,
        name: "summaryOfEndorsement",
        parentDispatch: endorsementDispatch,
        stepperPages: ENDORSEMENT_STEPPER_PAGES,
        validValueAction: endorsementAction.setSummaryOfEndorsement,
        value: summaryOfEndorsement,
      }}
    />
  );

  const titleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: endorsementAction.setPageInError,
        name: "title",
        parentDispatch: endorsementDispatch,
        stepperPages: ENDORSEMENT_STEPPER_PAGES,
        validValueAction: endorsementAction.setTitle,
        value: title,
      }}
    />
  );

  const firstPage = (
    <Stack>
      {titleTextInput}
      {personToBeEndorsedTextInput}
      {summaryOfEndorsementTextAreaInput}
      {attributeEndorsedSelectInput}
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
          endorsementDispatch({
            action: endorsementAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: endorsementState,
        invalidValueAction: endorsementAction.setPageInError,
        pageElements: [firstPage],
        parentDispatch: endorsementDispatch,
        stepperPages: ENDORSEMENT_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default Endorsement;

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

    async function handleEndorsementFormSubmit() {
      endorsementDispatch({
        type: endorsementAction.setIsSubmitting,
        payload: true,
      });
      endorsementDispatch({
        type: endorsementAction.setSubmitMessage,
        payload: "Submitting Endorsement form ...",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/general/endorsement",
      });

      const body = JSON.stringify({
        endorsementSchema: {
          title,
          personToBeEndorsed: personToBeEndorsed,
          summaryOfEndorsement,
          attributeEndorsed,
          requestStatus: "pending",
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

        const data: ResourceRequestServerResponse<EndorsementDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        endorsementDispatch({
          type: endorsementAction.setIsSuccessful,
          payload: true,
        });
        endorsementDispatch({
          type: endorsementAction.setSuccessMessage,
          payload: data.message ?? "Endorsement form submitted successfully!",
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
          endorsementDispatch({
            type: endorsementAction.setIsSubmitting,
            payload: false,
          });
          endorsementDispatch({
            type: endorsementAction.setSubmitMessage,
            payload: "",
          });
          endorsementDispatch({
            type: endorsementAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleEndorsementFormSubmit();
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
    endorsementDispatch({
      type: endorsementAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate personToBeEndorsed input on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(personToBeEndorsed);

    endorsementDispatch({
      type: endorsementAction.setIsValidEmployeeToBeEndorsed,
      payload: isValid,
    });
  }, [personToBeEndorsed]);

  // validate summaryOfEndorsement input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(summaryOfEndorsement);

    endorsementDispatch({
      type: endorsementAction.setIsValidSummaryOfEndorsement,
      payload: isValid,
    });
  }, [summaryOfEndorsement]);

  // update stepsInError for stepper wrapper
  useEffect(() => {
    const isStepInError =
      !isValidTitle || !isValidEmployeeToBeEndorsed || !isValidSummaryOfEndorsement;

    endorsementDispatch({
      type: endorsementAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [isValidTitle, isValidEmployeeToBeEndorsed, isValidSummaryOfEndorsement]);

  // update currentStepperPosition for stepper wrapper
  useEffect(() => {
    const isStepInError = attributeEndorsed?.length === 0;

    endorsementDispatch({
      type: endorsementAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [attributeEndorsed]);

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

  const [personToBeEndorsedInputErrorText, personToBeEndorsedInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "employee to be endorsed",
      inputText: personToBeEndorsed,
      isInputTextFocused: isEmployeeToBeEndorsedFocused,
      isValidInputText: isValidEmployeeToBeEndorsed,
      regexValidationText: returnNameValidationText({
        content: personToBeEndorsed,
        contentKind: "employee to be endorsed",
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [summaryOfEndorsementInputErrorText, summaryOfEndorsementInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "summary of endorsement",
      inputText: summaryOfEndorsement,
      isInputTextFocused: isSummaryOfEndorsementFocused,
      isValidInputText: isValidSummaryOfEndorsement,
      regexValidationText: returnGrammarValidationText({
        content: summaryOfEndorsement,
        contentKind: "summary of endorsement",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const attributeEndorsedStrCapitalized = attributeEndorsed.map((str) => {
    const splitStr = str.split(" and ");
    if (splitStr.length > 1) {
      return splitStr
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" and ");
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const attributeEndorsedStr = replaceLastCommaWithAnd(
    attributeEndorsedStrCapitalized.join(", ")
  );

  const [attributeEndorsedInputSelectedText, attributeEndorsedInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: attributeEndorsed.length > 0,
      semanticName: "attributes endorsed",
      selectedDescription: `You have chosen: ${attributeEndorsedStr} attribute${
        attributeEndorsed.length > 1 ? "s" : ""
      } to endorse`,
      deselectedDescription: "Please select one or more attributes to endorse",
      theme: "muted",
    });

  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: "Endorsement Title",
    onBlur: () => {
      endorsementDispatch({
        type: endorsementAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      endorsementDispatch({
        type: endorsementAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      endorsementDispatch({
        type: endorsementAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter title of endorsement",
    semanticName: "title",
    withAsterisk: true,
    required: true,
  };

  const personToBeEndorsedInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: personToBeEndorsedInputErrorText,
      valid: personToBeEndorsedInputValidText,
    },
    inputText: personToBeEndorsed,
    isValidInputText: isValidEmployeeToBeEndorsed,
    label: "Employee to be Endorsed",
    onBlur: () => {
      endorsementDispatch({
        type: endorsementAction.setIsEmployeeToBeEndorsedFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      endorsementDispatch({
        type: endorsementAction.setPersonToBeEndorsed,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      endorsementDispatch({
        type: endorsementAction.setIsEmployeeToBeEndorsedFocused,
        payload: true,
      });
    },
    placeholder: "Enter name of employee to be endorsed",
    semanticName: "employee to be endorsed",
    minLength: 2,
    maxLength: 100,
    withAsterisk: true,
    required: true,
  };

  const summaryOfEndorsementInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: summaryOfEndorsementInputErrorText,
      valid: summaryOfEndorsementInputValidText,
    },
    inputText: summaryOfEndorsement,
    isValidInputText: isValidSummaryOfEndorsement,
    label: "Summary of Endorsement",
    onBlur: () => {
      endorsementDispatch({
        type: endorsementAction.setIsSummaryOfEndorsementFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      endorsementDispatch({
        type: endorsementAction.setSummaryOfEndorsement,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      endorsementDispatch({
        type: endorsementAction.setIsSummaryOfEndorsementFocused,
        payload: true,
      });
    },
    placeholder: "Enter summary of endorsement",
    semanticName: "summary of endorsement",
    required: true,
    withAsterisk: true,
  };

  const employeeAttributesInputCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo = {
    dataObjectArray: EMPLOYEE_ATTRIBUTES_DATA,
    description: {
      selected: attributeEndorsedInputSelectedText,
      deselected: attributeEndorsedInputDeselectedText,
    },
    label: "Employee Attribute(s)",
    semanticName: "employee attributes",
    value: attributeEndorsed,
    required: true,
    onChange: (event: string[]) => {
      endorsementDispatch({
        type: endorsementAction.setAttributeEndorsed,
        payload: event as EmployeeAttributes,
      });
    },
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "create endorsement form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      endorsementDispatch({
        type: endorsementAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdTitleTextInput, createdEmployeeToBeEndorsedTextInput] =
    returnAccessibleTextInputElements([
      titleTextInputCreatorInfo,
      personToBeEndorsedInputCreatorInfo,
    ]);

  const [createdSummaryOfEndorsementTextAreaInput] =
    returnAccessibleTextAreaInputElements([summaryOfEndorsementInputCreatorInfo]);

  const [createdEmployeeAttributesCheckboxInput] =
    returnAccessibleCheckboxGroupInputsElements([employeeAttributesInputCreatorInfo]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ENDORSEMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please correct errors before submitting"
            : "Submit Endorsement form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayEndorsementFirstPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdEmployeeToBeEndorsedTextInput}
      {createdSummaryOfEndorsementTextAreaInput}
    </FormLayoutWrapper>
  );

  const displayEndorsementSecondPage = (
    <FormLayoutWrapper>{createdEmployeeAttributesCheckboxInput}</FormLayoutWrapper>
  );

  const CREATE_ENDORSEMENT_REVIEW_OBJECT: FormReviewObjectArray = {
    "Employee Endorsement": [
      {
        inputName: "Endorsement Title",
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: "Employee to be Endorsed",
        inputValue: personToBeEndorsed,
        isInputValueValid: isValidEmployeeToBeEndorsed,
      },
      {
        inputName: "Summary of Endorsement",
        inputValue: summaryOfEndorsement,
        isInputValueValid: isValidSummaryOfEndorsement,
      },
    ],
    "Attribute(s) Endorsed": [
      {
        inputName: "Employee Attribute(s)",
        inputValue: attributeEndorsedStr,
        isInputValueValid: attributeEndorsed.length > 0,
      },
    ],
  };

  const displayEndorsementReview = (
    <FormReviewPage
      formReviewObject={CREATE_ENDORSEMENT_REVIEW_OBJECT}
      formName="Endorsement"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/general/endorsement/display");
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

  const displayEndorsementForm =
    currentStepperPosition === 0
      ? displayEndorsementFirstPage
      : currentStepperPosition === 1
      ? displayEndorsementSecondPage
      : currentStepperPosition === 2
      ? displayEndorsementReview
      : displaySubmitButton;

  const displayEndorsementComponent = (
    <StepperWrapper
      childrenTitle="Endorsement"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ENDORSEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={endorsementDispatch}
      setCurrentStepperPosition="setCurrentStepperPosition"
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayEndorsementForm}
    </StepperWrapper>
  );

  return displayEndorsementComponent;

 */
