import { useEffect, useReducer, useRef } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  QUANTITY_REGEX,
} from '../../constants/regex';
import { returnAccessibleTextElements } from '../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnQuantityValidationText,
} from '../../utils';
import {
  initialRequestResourceState,
  requestResourceAction,
  requestResourceReducer,
} from './state';

function RequestResource() {
  const [requestResourceState, requestResourceDispatch] = useReducer(
    requestResourceReducer,
    initialRequestResourceState
  );
  const {
    additionalInformation,
    dateNeededBy,
    department,
    isAdditionalInformationFocused,
    isDateNeededByFocused,
    isReasonForRequestFocused,
    isResourceDescriptionFocused,
    isResourceQuantityFocused,
    isValidAdditionalInformation,
    isValidDateNeededBy,
    isValidReasonForRequest,
    isValidResourceDescription,
    isValidResourceQuantity,
    reasonForRequest,
    resourceDescription,
    resourceQuantity,
    resourceType,
    urgency,
  } = requestResourceState;

  const departmentInputRef = useRef<HTMLSelectElement>(null);
  // sets focus on department input on first render
  useEffect(() => {
    departmentInputRef.current?.focus();
  }, []);

  // validate resource quantity input on every change
  useEffect(() => {
    const isValid = QUANTITY_REGEX.test(resourceQuantity);

    requestResourceDispatch({
      type: requestResourceAction.setResourceQuantity,
      payload: isValid,
    });
  }, [resourceQuantity]);

  // validate resource description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(resourceDescription);

    requestResourceDispatch({
      type: requestResourceAction.setResourceDescription,
      payload: isValid,
    });
  }, [resourceDescription]);

  // validate reason for request input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(reasonForRequest);

    requestResourceDispatch({
      type: requestResourceAction.setReasonForRequest,
      payload: isValid,
    });
  }, [reasonForRequest]);

  // validate date needed by input on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(dateNeededBy);

    requestResourceDispatch({
      type: requestResourceAction.setDateNeededBy,
      payload: isValid,
    });
  }, [dateNeededBy]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalInformation);

    requestResourceDispatch({
      type: requestResourceAction.setAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [resourceQuantityInputErrorText, resourceQuantityInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'resource quantity',
      inputText: resourceQuantity,
      isInputTextFocused: isResourceQuantityFocused,
      isValidInputText: isValidResourceQuantity,
      regexValidationText: returnQuantityValidationText({
        content: resourceQuantity,
        contentKind: 'resource quantity',
        minLength: 1,
        maxLength: 9,
      }),
    });

  const [resourceDescriptionInputErrorText, resourceDescriptionInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'resource description',
      inputText: resourceDescription,
      isInputTextFocused: isResourceDescriptionFocused,
      isValidInputText: isValidResourceDescription,
      regexValidationText: returnGrammarValidationText({
        content: resourceDescription,
        contentKind: 'resource description',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [reasonForRequestInputErrorText, reasonForRequestInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'reason for request',
      inputText: reasonForRequest,
      isInputTextFocused: isReasonForRequestFocused,
      isValidInputText: isValidReasonForRequest,
      regexValidationText: returnGrammarValidationText({
        content: reasonForRequest,
        contentKind: 'reason for request',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [dateNeededByInputErrorText, dateNeededByInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'date needed by',
      inputText: dateNeededBy,
      isInputTextFocused: isDateNeededByFocused,
      isValidInputText: isValidDateNeededBy,
      regexValidationText: returnDateNearFutureValidationText(dateNeededBy),
    });

  const [
    additionalInformationInputErrorText,
    additionalInformationInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'additional information',
    inputText: additionalInformation,
    isInputTextFocused: isAdditionalInformationFocused,
    isValidInputText: isValidAdditionalInformation,
    regexValidationText: returnGrammarValidationText({
      content: additionalInformation,
      contentKind: 'additional information',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  return <></>;
}

export { RequestResource };
