import { useEffect, useReducer, useRef } from 'react';
import {
  initialRequestResourceState,
  requestResourceAction,
  requestResourceReducer,
} from './state';
import {
  DATE_NEAR_FUTURE_REGEX,
  DATE_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  QUANTITY_REGEX,
} from '../../constants/regex';

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
}

export { RequestResource };
