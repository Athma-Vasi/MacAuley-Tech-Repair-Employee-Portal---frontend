import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, NativeSelect, TextInput } from '@mantine/core';
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
import { REASON_FOR_LEAVE_DATA } from './constants';
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
  const [startDateInputErrorText, startDateInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'start date',
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate,
      regexValidationText: returnDateValidationText(startDate),
    });

  const [endDateInputErrorText, endDateInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'end date',
      inputText: endDate,
      isInputTextFocused: isEndDateFocused,
      isValidInputText: isValidEndDate,
      regexValidationText: returnDateValidationText(endDate),
    });

  const [delegatedToEmployeeInputErrorText, delegatedToEmployeeInputValidText] =
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
    delegatedResponsibilitiesInputErrorText,
    delegatedResponsibilitiesInputValidText,
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

  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
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

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
    >
      {/* start date input */}
      <TextInput
        type="date"
        size="md"
        w="100%"
        color="dark"
        label="Leave start date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter start date of leave in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidStartDate
            ? 'start-date-input-note-valid'
            : 'start-date-input-note-error'
        }
        aria-invalid={isValidStartDate ? false : true}
        value={startDate}
        icon={
          isValidStartDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidStartDate && startDate !== ''}
        description={
          isValidStartDate ? startDateInputValidText : startDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setStartDate,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsStartDateFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsStartDateFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      {/* end date input */}
      <TextInput
        type="date"
        size="md"
        w="100%"
        color="dark"
        label="Leave end date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter end date of leave in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidEndDate
            ? 'end-date-input-note-valid'
            : 'end-date-input-note-error'
        }
        aria-invalid={isValidEndDate ? false : true}
        value={endDate}
        icon={
          isValidEndDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidEndDate && endDate !== ''}
        description={
          isValidEndDate ? endDateInputValidText : endDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setEndDate,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsEndDateFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsEndDateFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      {/* reason for leave select */}
      <NativeSelect
        size="md"
        data={REASON_FOR_LEAVE_DATA}
        label="Reason for leave"
        description="Select reason for leave"
        value={reasonForLeave}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setReasonForLeave,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />
    </Flex>
  );
}

export { LeaveRequest };
