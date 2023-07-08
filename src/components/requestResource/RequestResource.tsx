import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, NativeSelect, Textarea, TextInput } from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';

import { DEPARTMENTS, URGENCY_DATA } from '../../constants/data';
import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  MONEY_REGEX,
} from '../../constants/regex';
import { returnAccessibleTextElements } from '../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnMoneyValidationText,
} from '../../utils';
import { REQUEST_RESOURCE_KIND_DATA } from './constants';
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
    // remove leading zeros
    const resourceQuantityWithoutLeadingZeros = resourceQuantity.replace(
      /^0+/,
      ''
    );

    requestResourceDispatch({
      type: requestResourceAction.setResourceQuantity,
      payload: resourceQuantityWithoutLeadingZeros,
    });

    const isValid = MONEY_REGEX.test(resourceQuantity);
    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceQuantity,
      payload: isValid,
    });
  }, [resourceQuantity]);

  // validate resource description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(resourceDescription);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceDescription,
      payload: isValid,
    });
  }, [resourceDescription]);

  // validate reason for request input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(reasonForRequest);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidReasonForRequest,
      payload: isValid,
    });
  }, [reasonForRequest]);

  // validate date needed by input on every change
  useEffect(() => {
    const dateRegexTest = DATE_NEAR_FUTURE_REGEX.test(dateNeededBy);
    const currentDate = new Date();
    const dateNeededByDate = new Date(dateNeededBy);
    const isValid =
      dateRegexTest && dateNeededByDate.getTime() > currentDate.getTime();

    requestResourceDispatch({
      type: requestResourceAction.setIsValidDateNeededBy,
      payload: isValid,
    });
  }, [dateNeededBy]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(additionalInformation);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidAdditionalInformation,
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
      regexValidationText: returnMoneyValidationText({
        kind: 'resource quantity',
        money: resourceQuantity,
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

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
    >
      {/* department select */}
      <NativeSelect
        size="sm"
        data={DEPARTMENTS}
        label="Department"
        description="
          Select the department for which you are requesting a resource."
        value={department}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setDepartment,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />
      {/* resource kind */}
      <NativeSelect
        size="sm"
        data={REQUEST_RESOURCE_KIND_DATA}
        label="Resource"
        description="
          Select the kind of resource you are requesting."
        value={resourceType}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceType,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />
      {/* resource quantity */}
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Resource quantity"
        placeholder="Enter resource amount"
        value={resourceQuantity}
        aria-required
        aria-describedby={
          isValidResourceQuantity
            ? 'resource-quantity-input-note-valid'
            : 'resource-quantity-input-note-error'
        }
        description={
          isValidResourceQuantity
            ? resourceQuantityInputValidText
            : resourceQuantityInputErrorText
        }
        aria-invalid={isValidResourceQuantity ? 'false' : 'true'}
        icon={
          isValidResourceQuantity ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidResourceQuantity && resourceQuantity !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceQuantity,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceQuantityFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceQuantityFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={9}
        required
        withAsterisk
      />
      {/* resource description */}
      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Resource description"
        placeholder="Enter description of resource requested"
        value={resourceDescription}
        aria-required
        aria-describedby={
          isValidResourceDescription
            ? 'resource-description-input-note-valid'
            : 'resource-description-input-note-error'
        }
        description={
          isValidResourceDescription
            ? resourceDescriptionInputValidText
            : resourceDescriptionInputErrorText
        }
        aria-invalid={isValidResourceDescription ? 'false' : 'true'}
        icon={
          isValidResourceDescription ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidResourceDescription && resourceDescription !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceDescription,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceDescriptionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceDescriptionFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={10}
        required
        withAsterisk
      />

      {/* reason for request text input */}
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Reason for request"
        placeholder="Enter reason for request"
        value={reasonForRequest}
        aria-required
        aria-describedby={
          isValidReasonForRequest
            ? 'reason-for-request-input-note-valid'
            : 'reason-for-request-input-note-error'
        }
        description={
          isValidReasonForRequest
            ? reasonForRequestInputValidText
            : reasonForRequestInputErrorText
        }
        aria-invalid={isValidReasonForRequest ? 'false' : 'true'}
        icon={
          isValidReasonForRequest ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidReasonForRequest && reasonForRequest !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setReasonForRequest,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsReasonForRequestFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsReasonForRequestFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={75}
        required
        withAsterisk
      />

      {/* urgency */}
      <NativeSelect
        size="sm"
        data={URGENCY_DATA}
        label="Urgency"
        description="
          Select the urgency of your request."
        value={urgency}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setUrgency,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />

      {/* additional information text area input */}
      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Additional information"
        placeholder="Enter additional information"
        value={additionalInformation}
        aria-required
        aria-describedby={
          isValidAdditionalInformation
            ? 'additional-information-input-note-valid'
            : 'additional-information-input-note-error'
        }
        description={
          isValidAdditionalInformation
            ? additionalInformationInputValidText
            : additionalInformationInputErrorText
        }
        aria-invalid={isValidAdditionalInformation ? 'false' : 'true'}
        icon={
          isValidAdditionalInformation ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAdditionalInformation && additionalInformation !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setAdditionalInformation,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsAdditionalInformationFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsAdditionalInformationFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={10}
        required
        withAsterisk
      />

      {/* date needed by */}
      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Date needed by"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter resource needed by date in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidDateNeededBy
            ? 'date-needed-by-input-note-valid'
            : 'date-needed-by-input-note-error'
        }
        aria-invalid={isValidDateNeededBy ? false : true}
        value={dateNeededBy}
        icon={
          isValidDateNeededBy ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidDateNeededBy && dateNeededBy !== ''}
        description={
          isValidDateNeededBy
            ? dateNeededByInputValidText
            : dateNeededByInputErrorText
        }
        // current date for min
        min={new Date().toISOString().split('T')[0]}
        max={new Date(2026, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setDateNeededBy,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsDateNeededByFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsDateNeededByFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      {/* submit button */}
      <Button
        type="button"
        variant="filled"
        disabled={
          !isValidResourceQuantity ||
          !isValidResourceDescription ||
          !isValidDateNeededBy
        }
      >
        Submit
      </Button>
    </Flex>
  );
}

export { RequestResource };
