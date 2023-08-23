import { ChangeEvent, useEffect } from 'react';
import { RepairNoteStepPartProps } from './types';
import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  NOTE_TEXT_REGEX,
  SERIAL_ID_REGEX,
} from '../../../../constants/regex';
import {
  filterFieldsFromObject,
  logState,
  returnDateNearPastValidationText,
  returnGrammarValidationText,
  returnNoteTextValidationText,
  returnSerialIdValidationText,
} from '../../../../utils';
import {
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../../wrappers';

function RepairNoteStepPart(parentState: RepairNoteStepPartProps) {
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

    createRepairNoteAction,
    createRepairNoteDispatch,
  } = parentState;

  /** ------------- input validation ------------- */

  // validate part name on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(partName);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidPartName,
      payload: isValid,
    });
  }, [partName, createRepairNoteDispatch, createRepairNoteAction]);

  // validate part serial id on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(partSerialId);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidPartSerialId,
      payload: isValid,
    });
  }, [partSerialId, createRepairNoteDispatch, createRepairNoteAction]);

  // validate date received on every change
  useEffect(() => {
    // date must be valid regex and it must be present or near past

    const isValid =
      DATE_NEAR_PAST_REGEX.test(dateReceived) &&
      new Date(dateReceived).getTime() <= new Date().getTime();

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidDateReceived,
      payload: isValid,
    });
  }, [dateReceived, createRepairNoteDispatch, createRepairNoteAction]);

  // validate description of issue on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(descriptionOfIssue);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidDescriptionOfIssue,
      payload: isValid,
    });
  }, [descriptionOfIssue, createRepairNoteDispatch, createRepairNoteAction]);

  // validate initial inspection notes on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(initialInspectionNotes);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidInitialInspectionNotes,
      payload: isValid,
    });
  }, [
    initialInspectionNotes,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);

  // update corresponding stepsInError state when inputs change
  useEffect(() => {
    const isStepInError =
      !isValidPartName ||
      !isValidPartSerialId ||
      !isValidDateReceived ||
      !isValidDescriptionOfIssue ||
      !isValidInitialInspectionNotes;

    createRepairNoteDispatch({
      type: createRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidPartName,
    isValidPartSerialId,
    isValidDateReceived,
    isValidDescriptionOfIssue,
    isValidInitialInspectionNotes,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);
  /** ------------- end input validation ------------- */

  /** ------------- accessible error and valid texts ------------- */

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const [partNameInputErrorText, partNameInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'part name',
      inputText: partName,
      isValidInputText: isValidPartName,
      isInputTextFocused: isPartNameFocused,
      regexValidationText: returnNoteTextValidationText({
        content: partName,
        contentKind: 'part name',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [partSerialIdInputErrorText, partSerialIdInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'part serial id',
      inputText: partSerialId,
      isValidInputText: isValidPartSerialId,
      isInputTextFocused: isPartSerialIdFocused,
      regexValidationText: returnSerialIdValidationText({
        content: partSerialId,
        contentKind: 'part serial Id',
        minLength: 1,
        maxLength: 100,
      }),
    });

  const dateReceivedInvalidText =
    new Date(dateReceived).getTime() > new Date().getTime()
      ? 'Date received must be in the past'
      : '';
  const [dateReceivedInputErrorText, dateReceivedInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'date received',
      inputText: dateReceived,
      isValidInputText: isValidDateReceived,
      isInputTextFocused: isDateReceivedFocused,
      regexValidationText: `${dateReceivedInvalidText}${returnDateNearPastValidationText(
        dateReceived
      )}`,
    });

  const [descriptionOfIssueInputErrorText, descriptionOfIssueInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'description of issue',
      inputText: descriptionOfIssue,
      isValidInputText: isValidDescriptionOfIssue,
      isInputTextFocused: isDescriptionOfIssueFocused,
      regexValidationText: returnGrammarValidationText({
        content: descriptionOfIssue,
        contentKind: 'description of issue',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [
    initialInspectionNotesInputErrorText,
    initialInspectionNotesInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'initial inspection notes',
    inputText: initialInspectionNotes,
    isValidInputText: isValidInitialInspectionNotes,
    isInputTextFocused: isInitialInspectionNotesFocused,
    regexValidationText: returnGrammarValidationText({
      content: initialInspectionNotes,
      contentKind: 'initial inspection notes',
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
    label: 'Part name',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsPartNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setPartName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsPartNameFocused,
        payload: true,
      });
    },
    placeholder: 'Enter part name',
    required: true,
    withAsterisk: true,
    semanticName: 'part name',
  };

  const partSerialIdTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: partSerialIdInputErrorText,
      valid: partSerialIdInputValidText,
    },
    inputText: partSerialId,
    isValidInputText: isValidPartSerialId,
    label: 'Part serial Id',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsPartSerialIdFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setPartSerialId,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsPartSerialIdFocused,
        payload: true,
      });
    },
    placeholder: 'Enter part serial id',
    required: true,
    withAsterisk: true,
    semanticName: 'part serial Id',
  };

  const dateReceivedInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: dateReceivedInputErrorText,
      valid: dateReceivedInputValidText,
    },
    inputText: dateReceived,
    isValidInputText: isValidDateReceived,
    label: 'Date received',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsDateReceivedFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setDateReceived,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsDateReceivedFocused,
        payload: true,
      });
    },
    placeholder: 'Enter date received',
    required: true,
    withAsterisk: true,
    semanticName: 'date received',
    inputKind: 'date',
    dateKind: 'date near past',
  };

  const descriptionOfIssueInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: descriptionOfIssueInputErrorText,
      valid: descriptionOfIssueInputValidText,
    },
    inputText: descriptionOfIssue,
    isValidInputText: isValidDescriptionOfIssue,
    label: 'Description of issue',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsDescriptionOfIssueFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setDescriptionOfIssue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsDescriptionOfIssueFocused,
        payload: true,
      });
    },
    placeholder: 'Enter description of issue',
    required: true,
    withAsterisk: true,
    semanticName: 'description of issue',
  };

  const initialInspectionNotesInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: initialInspectionNotesInputErrorText,
        valid: initialInspectionNotesInputValidText,
      },
      inputText: initialInspectionNotes,
      isValidInputText: isValidInitialInspectionNotes,
      label: 'Initial inspection notes',
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsInitialInspectionNotesFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setInitialInspectionNotes,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsInitialInspectionNotesFocused,
          payload: true,
        });
      },
      placeholder: 'Enter initial inspection notes',
      required: true,
      withAsterisk: true,
      semanticName: 'initial inspection notes',
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

  const [createdInitialInspectionNotesInput] =
    returnAccessibleTextAreaInputElements([
      initialInspectionNotesInputCreatorInfo,
    ]);
  /** ------------- end created inputs ------------- */

  /** ------------- display created inputs ------------- */

  const displayRepairNoteStepPart = (
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
      fieldsToFilter: ['createRepairNoteAction', 'createRepairNoteDispatch'],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: 'RepairNoteStepPart',
    });
  }, [parentState]);

  return <>{displayRepairNoteStepPart}</>;
}

export { RepairNoteStepPart };
