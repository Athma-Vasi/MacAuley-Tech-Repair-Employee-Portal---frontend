import { useEffect } from 'react';
import { RepairNoteStepDetailsProps } from './types';
import {
  DATE_NEAR_FUTURE_REGEX,
  MONEY_REGEX,
  NOTE_TEXT_REGEX,
} from '../../../../constants/regex';

function RepairNoteStepDetail(parentState: RepairNoteStepDetailsProps) {
  const {
    requiredRepairs,
    partsNeeded,
    partsNeededModels,
    isValidPartsNeededModels,
    isPartsNeededModelsFocused,

    partUnderWarranty,
    estimatedRepairCost,
    isValidEstimatedRepairCost,
    isEstimatedRepairCostFocused,

    estimatedCompletionDate,
    isValidEstimatedCompletionDate,
    isEstimatedCompletionDateFocused,

    repairPriority,

    createRepairNoteAction,
    createRepairNoteDispatch,
  } = parentState;

  /** ------------- input validation ------------- */
  // validate partsNeededModels on every change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(partsNeededModels);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidPartsNeededModels,
      payload: isValid,
    });
  }, [partsNeededModels, createRepairNoteDispatch, createRepairNoteAction]);

  // validate estimatedRepairCost on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(estimatedRepairCost.toString());

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidEstimatedRepairCost,
      payload: isValid,
    });
  }, [estimatedRepairCost, createRepairNoteDispatch, createRepairNoteAction]);

  // validate estimatedCompletionDate on every change
  useEffect(() => {
    // date must be in the near future and not in past
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(estimatedCompletionDate) &&
      new Date(estimatedCompletionDate) > new Date();

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidEstimatedCompletionDate,
      payload: isValid,
    });
  }, [
    estimatedCompletionDate,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);

  // update corresponding stepsInError when inputs change
  useEffect(() => {
    const isStepInError =
      !isValidEstimatedRepairCost ||
      !isValidPartsNeededModels ||
      !isValidEstimatedCompletionDate;

    createRepairNoteDispatch({
      type: createRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidEstimatedRepairCost,
    isValidPartsNeededModels,
    isValidEstimatedCompletionDate,
    createRepairNoteDispatch,
    createRepairNoteAction,
  ]);
  /** ------------- end input validation ------------- */

  return <></>;
}

export { RepairNoteStepDetail };
