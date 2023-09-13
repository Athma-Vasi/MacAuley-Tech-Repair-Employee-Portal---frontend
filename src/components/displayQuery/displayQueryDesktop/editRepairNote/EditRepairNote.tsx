import { useState } from 'react';
import {
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
} from '../../../wrappers';
import { EditRepairNoteInput } from '../types';

type EditRepairNoteProps = {
  editRepairNoteInput: EditRepairNoteInput;
};

function EditRepairNote({ editRepairNoteInput }: EditRepairNoteProps) {
  /**
   * const planDescriptionInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: planDescriptionInputErrorText,
      valid: planDescriptionInputValidText,
    },
    inputText: planDescription,
    isValidInputText: isValidPlanDescription,
    label: 'Plan Description',
    onBlur: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      createBenefitDispatch({
        type: createBenefitAction.setPlanDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createBenefitDispatch({
        type: createBenefitAction.setIsPlanDescriptionFocused,
        payload: true,
      });
    },
    placeholder: 'Enter plan description',
    semanticName: 'plan description',
    minLength: 1,
    maxLength: 300,
  };
   */

  /**
   * const [planDescriptionInputErrorText, planDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'plan description',
      inputText: planDescription,
      isValidInputText: isValidPlanDescription,
      isInputTextFocused: isPlanDescriptionFocused,
      regexValidationText: returnGrammarValidationText({
        content: planDescription,
        contentKind: 'plan description input',
        minLength: 1,
        maxLength: 300,
      }),
    });
   */

  //   let repairNotesTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo | null =
  //     null;
  //   let testingResultsTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo | null =
  //     null;
  //   let finalRepairCostTextInputCreatorInfo: AccessibleTextInputCreatorInfo | null =
  //     null;
  //   let finalRepairCostCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo | null =
  //     null;
  //   let repairStatusRadioGroupInputCreatorInfo: AccessibleRadioGroupInputCreatorInfo | null =
  //     null;

  switch (field) {
    case 'repairNotes': {
      const [repairNotesInputErrorText, repairNotesInputValidText] =
        AccessibleErrorValidTextElements({
          inputElementKind: 'repair notes',
          inputText: repairNotes,
          isValidInputText: isValidRepairNotes,
          isInputTextFocused: isRepairNotesFocused,
          regexValidationText: returnGrammarValidationText({
            content: repairNotes,
            contentKind: 'repair notes input',
            minLength: 1,
            maxLength: 300,
          }),
        });
    }
  }
  return <></>;
}

export default EditRepairNote;
