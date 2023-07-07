import { useEffect, useReducer, useRef } from 'react';

import {
  DATE_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  NAME_REGEX,
} from '../../constants/regex';
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
    const isValid = NAME_REGEX.test(delegatedToEmployee);

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

  return <></>;
}

export { LeaveRequest };
