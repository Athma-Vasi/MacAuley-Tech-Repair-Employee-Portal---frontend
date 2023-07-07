import { useEffect, useReducer, useRef } from 'react';

import {
  DATE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  NAME_REGEX,
} from '../../constants/regex';
import { returnAccessibleTextElements } from '../../jsxCreators';
import {
  returnDateValidationText,
  returnGrammarValidationText,
} from '../../utils';
import {
  initialLeaveRequestState,
  leaveRequestAction,
  leaveRequestReducer,
} from './state';

function LeaveRequest() {
  const [leaveRequestState, leaveRequestDispatch] = useReducer(
    leaveRequestReducer,
    initialLeaveRequestState
  );
  const {
    additionalComments,
    delegatedResponsibilities,
    delegatedToEmployee,
    endDate,
    isAcknowledged,
    isAdditionalCommentsFocused,
    isDelegatedResponsibilitiesFocused,
    isDelegatedToEmployeeFocused,
    isEndDateFocused,
    isStartDateFocused,
    reasonForLeave,
    startDate,
    isValidAdditionalComments,
    isValidDelegatedResponsibilities,
    isValidDelegatedToEmployee,
    isValidEndDate,
    isValidStartDate,
  } = leaveRequestState;

  const startDateInputRef = useRef<HTMLInputElement>(null);
  // sets focus on start date input on page load
  useEffect(() => {
    startDateInputRef.current?.focus();
  }, []);

  // validate start date on every change
  useEffect(() => {
    const isValid = DATE_REGEX.test(startDate);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidStartDate,
      payload: isValid,
    });
  }, [startDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_REGEX.test(endDate);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidEndDate,
      payload: isValid,
    });
  }, [endDate]);

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
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(delegatedResponsibilities);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidDelegatedResponsibilities,
      payload: isValid,
    });
  }, [delegatedResponsibilities]);

  // validate additional comments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalComments);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidAdditionalComments,
      payload: isValid,
    });
  }, [additionalComments]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [startDateInputError, startDateInputValid] =
    returnAccessibleTextElements({
      inputElementKind: 'start date',
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate,
      regexValidationText: returnDateValidationText(startDate),
    });

  const [endDateInputError, endDateInputValid] = returnAccessibleTextElements({
    inputElementKind: 'end date',
    inputText: endDate,
    isInputTextFocused: isEndDateFocused,
    isValidInputText: isValidEndDate,
    regexValidationText: returnDateValidationText(endDate),
  });

  const [delegatedToEmployeeInputError, delegatedToEmployeeInputValid] =
    returnAccessibleTextElements({
      inputElementKind: 'delegated to employee',
      inputText: delegatedToEmployee,
      isInputTextFocused: isDelegatedToEmployeeFocused,
      isValidInputText: isValidDelegatedToEmployee,
      regexValidationText: returnGrammarValidationText({
        content: delegatedToEmployee,
        contentKind: 'delegated to employee',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [
    delegatedResponsibilitiesInputError,
    delegatedResponsibilitiesInputValid,
  ] = returnAccessibleTextElements({
    inputElementKind: 'delegated responsibilities',
    inputText: delegatedResponsibilities,
    isInputTextFocused: isDelegatedResponsibilitiesFocused,
    isValidInputText: isValidDelegatedResponsibilities,
    regexValidationText: returnGrammarValidationText({
      content: delegatedResponsibilities,
      contentKind: 'delegated responsibilities',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const [additionalCommentsInputError, additionalCommentsInputValid] =
    returnAccessibleTextElements({
      inputElementKind: 'additional comments',
      inputText: additionalComments,
      isInputTextFocused: isAdditionalCommentsFocused,
      isValidInputText: isValidAdditionalComments,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: 'additional comments',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  return <></>;
}

export { LeaveRequest };
