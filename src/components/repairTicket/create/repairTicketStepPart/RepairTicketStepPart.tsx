import { ChangeEvent, useEffect } from "react";

import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  NOTE_TEXT_REGEX,
  SERIAL_ID_REGEX,
} from "../../../../constants/regex";
import { useGlobalState } from "../../../../hooks";
import {
  AccessibleErrorValidTextElements,
  returnAccessibleDateTimeElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../../../jsxCreators";
import {
  filterFieldsFromObject,
  logState,
  returnDateNearPastValidationText,
  returnGrammarValidationText,
  returnNoteTextValidationText,
  returnSerialIdValidationText,
} from "../../../../utils";
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../../wrappers";
import { RepairTicketStepPartProps } from "./types";

function RepairTicketStepPart(parentState: RepairTicketStepPartProps) {
  const {
    partName,
    isValidPartName,
    isPartNameFocused,

    partSerialId,
    isValidPartSerialId,
    isPartSerialIdFocused,

    dateReceived,
    isValidDateReceived,
    isDateReceivedFocused,

    descriptionOfIssue,
    isValidDescriptionOfIssue,
    isDescriptionOfIssueFocused,

    initialInspectionNotes,
    isValidInitialInspectionNotes,
    isInitialInspectionNotesFocused,

    createRepairTicketAction,
    createRepairTicketDispatch,
  } = parentState;

  const {
    globalState: { width },
  } = useGlobalState();
  /** ------------- input validation ------------- */

  // validate part name on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(partName);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidPartName,
      payload: isValid,
    });
  }, [partName, createRepairTicketDispatch, createRepairTicketAction]);

  // validate part serial id on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(partSerialId);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidPartSerialId,
      payload: isValid,
    });
  }, [partSerialId, createRepairTicketDispatch, createRepairTicketAction]);

  // validate date received on every change
  useEffect(() => {
    // date must be valid regex and it must be present or near past

    const isValid =
      DATE_NEAR_PAST_REGEX.test(dateReceived) &&
      new Date(dateReceived).getTime() <= new Date().getTime();

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidDateReceived,
      payload: isValid,
    });
  }, [dateReceived, createRepairTicketDispatch, createRepairTicketAction]);

  // validate description of issue on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(descriptionOfIssue);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidDescriptionOfIssue,
      payload: isValid,
    });
  }, [descriptionOfIssue, createRepairTicketDispatch, createRepairTicketAction]);

  // validate initial inspection notes on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(initialInspectionNotes);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidInitialInspectionNotes,
      payload: isValid,
    });
  }, [initialInspectionNotes, createRepairTicketDispatch, createRepairTicketAction]);

  // update corresponding stepsInError state when inputs change
  useEffect(() => {
    const isStepInError =
      !isValidPartName ||
      !isValidPartSerialId ||
      !isValidDateReceived ||
      !isValidDescriptionOfIssue ||
      !isValidInitialInspectionNotes;

    createRepairTicketDispatch({
      type: createRepairTicketAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isValidPartName,
    isValidPartSerialId,
    isValidDateReceived,
    isValidDescriptionOfIssue,
    isValidInitialInspectionNotes,
    createRepairTicketDispatch,
    createRepairTicketAction,
  ]);
  /** ------------- end input validation ------------- */

  /** ------------- accessible error and valid texts ------------- */

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const [partNameInputErrorText, partNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "part name",
      inputText: partName,
      isValidInputText: isValidPartName,
      isInputTextFocused: isPartNameFocused,
      regexValidationText: returnNoteTextValidationText({
        content: partName,
        contentKind: "part name",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [partSerialIdInputErrorText, partSerialIdInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "part serial id",
      inputText: partSerialId,
      isValidInputText: isValidPartSerialId,
      isInputTextFocused: isPartSerialIdFocused,
      regexValidationText: returnSerialIdValidationText({
        content: partSerialId,
        contentKind: "part serial Id",
        minLength: 1,
        maxLength: 100,
      }),
    });

  const dateReceivedInvalidText =
    new Date(dateReceived).getTime() > new Date().getTime()
      ? "Date received must be in the past. "
      : "";
  const [dateReceivedInputErrorText, dateReceivedInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "date received",
      inputText: dateReceived,
      isValidInputText: isValidDateReceived,
      isInputTextFocused: isDateReceivedFocused,
      regexValidationText: `${dateReceivedInvalidText}${returnDateNearPastValidationText({
        content: dateReceived,
        contentKind: "date received",
      })}`,
    });

  const [descriptionOfIssueInputErrorText, descriptionOfIssueInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "description of issue",
      inputText: descriptionOfIssue,
      isValidInputText: isValidDescriptionOfIssue,
      isInputTextFocused: isDescriptionOfIssueFocused,
      regexValidationText: returnGrammarValidationText({
        content: descriptionOfIssue,
        contentKind: "description of issue",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [initialInspectionNotesInputErrorText, initialInspectionNotesInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "initial inspection notes",
      inputText: initialInspectionNotes,
      isValidInputText: isValidInitialInspectionNotes,
      isInputTextFocused: isInitialInspectionNotesFocused,
      regexValidationText: returnGrammarValidationText({
        content: initialInspectionNotes,
        contentKind: "initial inspection notes",
        minLength: 2,
        maxLength: 2000,
      }),
    });
  /** ------------- end accessible error and valid texts ------------- */

  /** ------------- input creator info objects ------------- */

  const partNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: partNameInputErrorText,
      valid: partNameInputValidText,
    },
    inputText: partName,
    isValidInputText: isValidPartName,
    label: "Part Name",
    onBlur: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsPartNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setPartName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsPartNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter part name",
    required: true,
    withAsterisk: true,
    semanticName: "part name",
  };

  const partSerialIdTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: partSerialIdInputErrorText,
      valid: partSerialIdInputValidText,
    },
    inputText: partSerialId,
    isValidInputText: isValidPartSerialId,
    label: "Part Serial Id",
    onBlur: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsPartSerialIdFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setPartSerialId,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsPartSerialIdFocused,
        payload: true,
      });
    },
    placeholder: "Enter part serial id",
    required: true,
    withAsterisk: true,
    semanticName: "part serial Id",
  };

  const dateReceivedInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: dateReceivedInputErrorText,
      valid: dateReceivedInputValidText,
    },
    inputText: dateReceived,
    isValidInputText: isValidDateReceived,
    label: "Date Received",
    onBlur: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsDateReceivedFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setDateReceived,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsDateReceivedFocused,
        payload: true,
      });
    },
    placeholder: "Enter date received",
    required: true,
    withAsterisk: true,
    semanticName: "date received",
    inputKind: "date",
    dateKind: "date near past",
  };

  const descriptionOfIssueInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: descriptionOfIssueInputErrorText,
      valid: descriptionOfIssueInputValidText,
    },
    inputText: descriptionOfIssue,
    isValidInputText: isValidDescriptionOfIssue,
    label: "Description of Issue",
    onBlur: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsDescriptionOfIssueFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setDescriptionOfIssue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsDescriptionOfIssueFocused,
        payload: true,
      });
    },
    placeholder: "Enter description of issue",
    required: true,
    withAsterisk: true,
    semanticName: "description of issue",
  };

  const textAreaWidth =
    width < 480 // for iPhone 5/SE
      ? 330
      : width < 768 // for iPhone 6/7/8
      ? width * 0.8 - 44
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225 - 44) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300 - 44) * 0.8
      : 900 - 74;

  const initialInspectionNotesInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: initialInspectionNotesInputErrorText,
      valid: initialInspectionNotesInputValidText,
    },
    inputText: initialInspectionNotes,
    isValidInputText: isValidInitialInspectionNotes,
    label: "Initial Inspection Notes",
    onBlur: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsInitialInspectionNotesFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setInitialInspectionNotes,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsInitialInspectionNotesFocused,
        payload: true,
      });
    },
    placeholder: "Enter initial inspection notes",
    required: true,
    semanticName: "initial inspection notes",
    textAreaWidth,
    withAsterisk: true,
  };
  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs ------------- */

  const [
    createdPartNameTextInput,
    createdPartSerialIdTextInput,
    createdDescriptionOfIssueInput,
  ] = returnAccessibleTextInputElements([
    partNameTextInputCreatorInfo,
    partSerialIdTextInputCreatorInfo,
    descriptionOfIssueInputCreatorInfo,
  ]);

  const [createdDateReceivedInput] = returnAccessibleDateTimeElements([
    dateReceivedInputCreatorInfo,
  ]);

  const [createdInitialInspectionNotesInput] = returnAccessibleTextAreaInputElements([
    initialInspectionNotesInputCreatorInfo,
  ]);
  /** ------------- end created inputs ------------- */

  /** ------------- display created inputs ------------- */

  const displayRepairTicketStepPart = (
    <FormLayoutWrapper>
      {createdPartNameTextInput}
      {createdPartSerialIdTextInput}
      {createdDateReceivedInput}
      {createdDescriptionOfIssueInput}
      {createdInitialInspectionNotesInput}
    </FormLayoutWrapper>
  );
  /** ------------- end display created inputs ------------- */

  useEffect(() => {
    const fieldsOmittedState = filterFieldsFromObject({
      object: parentState,
      fieldsToFilter: ["createRepairTicketAction", "createRepairTicketDispatch"],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: "RepairTicketStepPart",
    });
  }, [parentState]);

  return <>{displayRepairTicketStepPart}</>;
}

export { RepairTicketStepPart };
