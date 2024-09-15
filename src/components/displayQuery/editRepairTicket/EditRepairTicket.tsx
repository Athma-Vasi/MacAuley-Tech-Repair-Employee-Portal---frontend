function EditRepairTicket() {
  return null;
}

export default EditRepairTicket;

/**
import { Group, Title, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InvalidTokenError } from "jwt-decode";
import { ChangeEvent, MouseEvent, useEffect, useReducer } from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
  TbCurrencyRenminbi,
  TbCurrencyYen,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES, CURRENCY_DATA } from "../../../constants/data";
import { MONEY_REGEX, NOTE_TEXT_AREA_REGEX } from "../../../constants/regex";
import { globalAction } from "../../../context/globalProvider/state";
import { useAuth, useGlobalState } from "../../../hooks";
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import { Currency, ResourceRequestServerResponse } from "../../../types";
import {
  returnNoteTextValidationText,
  returnFloatAmountValidationText,
  returnThemeColors,
  urlBuilder,
} from "../../../utils";
import FormReviewPage, {
  FormReviewObjectArray,
} from "../../formReviewPage/FormReviewPage";
import { NotificationModal } from "../../notificationModal";
import { RepairTicketDocument, RepairStatus } from "../../repairTicket/types";
import {
  AccessibleButtonCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from "../../wrappers";
import { EditRepairTicketInput } from "../displayQueryDesktop/types";
import {
  EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS,
  EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION,
  REPAIR_NOTE_REPAIR_STATUS_DATA,
} from "./constants";
import { editRepairTicketAction, editRepairTicketReducer } from "./state";
import { EditRepairTicketState } from "./types";

type EditRepairTicketProps = {
  editRepairTicketInput: EditRepairTicketInput;
  parentComponentCallbacks?: Array<() => void>;
};

function EditRepairTicket({
  editRepairTicketInput,
  parentComponentCallbacks,
}: EditRepairTicketProps) {
  const { repairTicketFormId } = editRepairTicketInput;

  const initialEditRepairTicketState: EditRepairTicketState = {
    repairNotes: editRepairTicketInput.repairNotes ?? "",
    isRepairNotesValid: false,
    isRepairNotesFocused: false,

    testingResults: editRepairTicketInput.testingResults ?? "",
    isTestingResultsValid: false,
    isTestingResultsFocused: false,

    finalRepairCost: editRepairTicketInput.finalRepairCost ?? "",
    isFinalRepairCostValid: false,
    isFinalRepairCostFocused: false,

    finalRepairCostCurrency: editRepairTicketInput.finalRepairCostCurrency ?? "CAD",
    repairStatus: editRepairTicketInput.repairStatus ?? "In progress",

    currentStepperPosition: 0,
    stepsInError: new Set<number>(),

    triggerFormSubmit: false,

    isLoading: false,
    loadingMessage: "",
    isSubmitting: false,
    submitMessage: "",
    isSuccessful: false,
    successMessage: "",
  };

  const [editRepairTicketState, editRepairTicketDispatch] = useReducer(
    editRepairTicketReducer,
    initialEditRepairTicketState
  );
  const {
    repairNotes,
    isRepairNotesValid,
    isRepairNotesFocused,
    testingResults,
    isTestingResultsValid,
    isTestingResultsFocused,
    finalRepairCost,
    isFinalRepairCostValid,
    isFinalRepairCostFocused,
    finalRepairCostCurrency,
    repairStatus,
    currentStepperPosition,
    stepsInError,
    triggerFormSubmit,
    isLoading,
    loadingMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = editRepairTicketState;

  const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

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

    async function handleEditRepairTicketFormSubmit() {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsSubmitting,
        payload: true,
      });
      editRepairTicketDispatch({
        type: editRepairTicketAction.setSubmitMessage,
        payload: "Submitting Edit Repair Note form ...",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: `repair-ticket/${repairTicketFormId}` });

      const body = JSON.stringify({
        documentUpdate: {
          updateKind: "field",
          updateOperator: "$set",
          fields: {
            repairNotes,
            testingResults,
            finalRepairCost,
            finalRepairCostCurrency,
            repairStatus,
          },
        },
      });

      const request: Request = new Request(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ResourceRequestServerResponse<RepairTicketDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        editRepairTicketDispatch({
          type: editRepairTicketAction.setIsSuccessful,
          payload: true,
        });
        editRepairTicketDispatch({
          type: editRepairTicketAction.setSuccessMessage,
          payload: data.message ?? "Edit Repair Note form submitted successfully!",
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
          editRepairTicketDispatch({
            type: editRepairTicketAction.setIsSubmitting,
            payload: false,
          });
          editRepairTicketDispatch({
            type: editRepairTicketAction.setSubmitMessage,
            payload: "",
          });
          editRepairTicketDispatch({
            type: editRepairTicketAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleEditRepairTicketFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFormSubmit]);

  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(repairNotes);

    editRepairTicketDispatch({
      type: editRepairTicketAction.setIsRepairNotesValid,
      payload: isValid,
    });
  }, [repairNotes]);

  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(testingResults);

    editRepairTicketDispatch({
      type: editRepairTicketAction.setIsTestingResultsValid,
      payload: isValid,
    });
  }, [testingResults]);

  useEffect(() => {
    const isValid = MONEY_REGEX.test(finalRepairCost);

    editRepairTicketDispatch({
      type: editRepairTicketAction.setIsFinalRepairCostValid,
      payload: isValid,
    });
  }, [finalRepairCost]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const areOptionalInputsInError =
      (repairNotes.length > 0 && !isRepairNotesValid) ||
      (testingResults.length > 0 && !isTestingResultsValid) ||
      (finalRepairCost.length > 0 && !isFinalRepairCostValid);

    // has any input been modified
    const isAnyInputModified =
      repairNotes === editRepairTicketInput.repairNotes &&
      testingResults === editRepairTicketInput.testingResults &&
      finalRepairCost === editRepairTicketInput.finalRepairCost &&
      finalRepairCostCurrency === editRepairTicketInput.finalRepairCostCurrency &&
      repairStatus === editRepairTicketInput.repairStatus
        ? false
        : true;

    const isStepInError = areOptionalInputsInError || !isAnyInputModified;

    editRepairTicketDispatch({
      type: editRepairTicketAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    isRepairNotesValid,
    isTestingResultsValid,
    isFinalRepairCostValid,
    repairNotes.length,
    testingResults.length,
    finalRepairCost.length,
    repairNotes,
    testingResults,
    finalRepairCost,
    editRepairTicketInput.repairNotes,
    editRepairTicketInput.testingResults,
    editRepairTicketInput.finalRepairCost,
    editRepairTicketInput.finalRepairCostCurrency,
    editRepairTicketInput.repairStatus,
    finalRepairCostCurrency,
    repairStatus,
  ]);

  const [repairTicketsInputErrorText, repairTicketsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "repair notes",
      inputText: repairNotes,
      isValidInputText: isRepairNotesValid,
      isInputTextFocused: isRepairNotesFocused,
      regexValidationText: returnNoteTextValidationText({
        content: repairNotes,
        contentKind: "repair notes",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [testingResultsInputErrorText, testingResultsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "testing results",
      inputText: testingResults,
      isValidInputText: isTestingResultsValid,
      isInputTextFocused: isTestingResultsFocused,
      regexValidationText: returnNoteTextValidationText({
        content: testingResults,
        contentKind: "testing results",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [finalRepairCostInputErrorText, finalRepairCostInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "final repair cost",
      inputText: finalRepairCost,
      isValidInputText: isFinalRepairCostValid,
      isInputTextFocused: isFinalRepairCostFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: finalRepairCost,
        contentKind: "final repair cost",
      }),
    });

  const repairTicketsTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: repairTicketsInputErrorText,
      valid: repairTicketsInputValidText,
    },
    inputText: repairNotes,
    isValidInputText: isRepairNotesValid,
    label: "Repair Notes",
    onBlur: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsRepairNotesFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setRepairNotes,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsRepairNotesFocused,
        payload: true,
      });
    },
    placeholder: "Enter repair notes",
    semanticName: "repair notes",
    minLength: 2,
    maxLength: 2000,
  };

  const testingResultsTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: testingResultsInputErrorText,
      valid: testingResultsInputValidText,
    },
    inputText: testingResults,
    isValidInputText: isTestingResultsValid,
    label: "Testing Results",
    onBlur: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsTestingResultsFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setTestingResults,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsTestingResultsFocused,
        payload: true,
      });
    },
    placeholder: "Enter testing results",
    semanticName: "testing results",
    minLength: 2,
    maxLength: 2000,
  };

  const {
    generalColors: { grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const finalRepairCostTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: finalRepairCostInputErrorText,
      valid: finalRepairCostInputValidText,
    },
    inputText: finalRepairCost,
    isValidInputText: isFinalRepairCostValid,
    label: "Final Repair Cost",
    onBlur: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsFinalRepairCostFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setFinalRepairCost,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setIsFinalRepairCostFocused,
        payload: true,
      });
    },
    rightSection: true,
    placeholder: "Enter final repair cost",
    semanticName: "final repair cost",
    minLength: 3,
    maxLength: 9,
  };

  const finalRepairCostCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CURRENCY_DATA,
      description: "Select the currency for final repair cost.",
      label: "Final Repair Cost Currency",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        editRepairTicketDispatch({
          type: editRepairTicketAction.setFinalRepairCostCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: finalRepairCostCurrency,
    };

  const repairStatusSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REPAIR_NOTE_REPAIR_STATUS_DATA,
    description: "Select the repair status.",
    label: "Repair Status",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setRepairStatus,
        payload: event.currentTarget.value as RepairStatus,
      });
    },
    value: repairStatus,
  };

  const [createdRepairTicketsTextAreaInput, createdTestingResultsTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      repairTicketsTextAreaInputCreatorInfo,
      testingResultsTextAreaInputCreatorInfo,
    ]);

  const [createdFinalRepairCostTextInput] = returnAccessibleTextInputElements([
    finalRepairCostTextInputCreatorInfo,
  ]);

  const [createdFinalRepairCostCurrencySelectInput, createdRepairStatusSelectInput] =
    returnAccessibleSelectInputElements([
      finalRepairCostCurrencySelectInputCreatorInfo,
      repairStatusSelectInputCreatorInfo,
    ]);

  // has any input been modified
  const isAnyInputModified =
    repairNotes === editRepairTicketInput.repairNotes &&
    testingResults === editRepairTicketInput.testingResults &&
    finalRepairCost.toString() === editRepairTicketInput.finalRepairCost.toString() &&
    finalRepairCostCurrency === editRepairTicketInput.finalRepairCostCurrency &&
    repairStatus === editRepairTicketInput.repairStatus
      ? false
      : true;

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "repair note form submit button",
    semanticName: "submit button",
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      editRepairTicketDispatch({
        type: editRepairTicketAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit || !isAnyInputModified,
  };

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);

  const displaySubmitButton =
    currentStepperPosition === EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          !isAnyInputModified
            ? "Please modify at least one input before submitting form."
            : stepsInError.size > 0
            ? "Please fix errors before submitting form."
            : "Submit edit repair note form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const EDIT_REPAIR_NOTE_REVIEW_OBJECT: FormReviewObjectArray = {
    "Repair Note Details": [
      {
        inputName: "Repair Notes",
        inputValue: repairNotes,
        isInputValueValid: isRepairNotesValid,
      },
      {
        inputName: "Testing Results",
        inputValue: testingResults,
        isInputValueValid: isTestingResultsValid,
      },
      {
        inputName: "Final Repair Cost",
        inputValue: finalRepairCost,
        isInputValueValid: isFinalRepairCostValid,
      },
      {
        inputName: "Final Repair Cost Currency",
        inputValue: finalRepairCostCurrency,
        isInputValueValid: true,
      },
      {
        inputName: "Repair Status",
        inputValue: repairStatus,
        isInputValueValid: true,
      },
    ],
  };

  const displayEditRepairTicketReviewPage = (
    <FormReviewPage
      formReviewObject={EDIT_REPAIR_NOTE_REVIEW_OBJECT}
      formName="Repair Note"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/repair-ticket/display");
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

  const displayEditRepairTicketFirstPage = (
    <FormLayoutWrapper>
      {createdRepairTicketsTextAreaInput}
      {createdTestingResultsTextAreaInput}
      {createdFinalRepairCostTextInput}
      {createdFinalRepairCostCurrencySelectInput}
      {createdRepairStatusSelectInput}
    </FormLayoutWrapper>
  );

  const displayEditRepairTicketForm =
    currentStepperPosition === 0
      ? displayEditRepairTicketFirstPage
      : currentStepperPosition === 1
      ? displayEditRepairTicketReviewPage
      : displaySubmitButton;

  const displayEditRepairTicketComponent = (
    <StepperWrapper
      childrenTitle="Repair Note"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS}
      maxStepperPosition={EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION}
      parentComponentDispatch={editRepairTicketDispatch}
      setCurrentStepperPosition={editRepairTicketAction.setCurrentStepperPosition}
      stepsInError={!isAnyInputModified ? stepsInError.add(0) : stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayEditRepairTicketForm}
    </StepperWrapper>
  );

  return displayEditRepairTicketComponent;
}

export default EditRepairTicket;
*/
