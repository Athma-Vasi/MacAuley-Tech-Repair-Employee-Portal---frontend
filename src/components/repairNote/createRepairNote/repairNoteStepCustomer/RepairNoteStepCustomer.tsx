import { Text, Title } from '@mantine/core';
import type { RepairNoteStepCustomerProps } from './types';
import { useEffect } from 'react';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from '../../../../constants/regex';
import {
  filterFieldsFromObject,
  logState,
  returnAddressValidationText,
  returnCityValidationText,
  returnEmailValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
} from '../../../../utils';
import { returnAccessibleErrorValidTextElements } from '../../../../jsxCreators';

function RepairNoteStepCustomer(parentState: RepairNoteStepCustomerProps) {
  const {
    customerName,
    isValidCustomerName,
    isCustomerNameFocused,

    customerPhone,
    isValidCustomerPhone,
    isCustomerPhoneFocused,

    customerEmail,
    isValidCustomerEmail,
    isCustomerEmailFocused,

    customerAddressLine,
    isValidCustomerAddressLine,
    isCustomerAddressLineFocused,

    customerCity,
    isValidCustomerCity,
    isCustomerCityFocused,

    customerState,
    customerProvince,
    customerCountry,

    customerPostalCode,
    isValidCustomerPostalCode,
    isCustomerPostalCodeFocused,

    createRepairNoteAction,
    createRepairNoteDispatch,
  } = parentState;

  // ------------- input validation ------------- //

  // validate customer name on every input change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(customerName);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerName,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerName,
    createRepairNoteDispatch,
    customerName,
  ]);

  // validate customer phone on every input change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(customerPhone);

    const contactLength = customerPhone.length;
    if (isCustomerPhoneFocused) {
      switch (contactLength) {
        case 4: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}(`,
          });
          break;
        }
        case 8: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}) `,
          });
          break;
        }
        case 13: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerPhone,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setCustomerPhone,
    createRepairNoteAction.setIsValidCustomerPhone,
    createRepairNoteDispatch,
    customerPhone,
    isCustomerPhoneFocused,
  ]);

  // validate customer email on every input change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(customerEmail);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerEmail,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerEmail,
    createRepairNoteDispatch,
    customerEmail,
  ]);

  // validate customer address line on every input change
  useEffect(() => {
    const isValid = ADDRESS_LINE_REGEX.test(customerAddressLine);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerAddressLine,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerAddressLine,
    createRepairNoteDispatch,
    customerAddressLine,
  ]);

  // validate customer city on every input change
  useEffect(() => {
    const isValid = CITY_REGEX.test(customerCity);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerCity,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerCity,
    createRepairNoteDispatch,
    customerCity,
  ]);

  // validate customer postal code on every input change
  useEffect(() => {
    const isValidPostal =
      customerCountry === 'Canada'
        ? POSTAL_CODE_REGEX_CANADA.test(customerPostalCode)
        : POSTAL_CODE_REGEX_US.test(customerPostalCode);

    if (customerCountry === 'Canada') {
      const customerPostalCodeLength = customerPostalCode.length;
      if (customerPostalCodeLength === 3) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: `${customerPostalCode} `,
        });
      } else if (customerPostalCodeLength === 7) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: customerPostalCode.trim(),
        });
      }
    } else {
      const customerPostalCodeLength = customerPostalCode.length;
      if (customerPostalCodeLength === 6) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: `${customerPostalCode.slice(
            0,
            5
          )}-${customerPostalCode.slice(5)}`,
        });
      }
    }

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerPostalCode,
      payload: isValidPostal,
    });
  }, [
    createRepairNoteAction.setCustomerPostalCode,
    createRepairNoteAction.setIsValidCustomerPostalCode,
    createRepairNoteDispatch,
    customerCountry,
    customerPostalCode,
  ]);

  // reset address line, city, and postal code when country changes
  useEffect(() => {
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerAddressLine,
      payload: '',
    });
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerCity,
      payload: '',
    });
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerPostalCode,
      payload: '',
    });
  }, [
    createRepairNoteAction.setCustomerAddressLine,
    createRepairNoteAction.setCustomerCity,
    createRepairNoteAction.setCustomerPostalCode,
    createRepairNoteDispatch,
    customerCountry,
  ]);

  // update corresponding stepsInError state when customer info changes
  useEffect(() => {
    const isStepInError =
      !isValidCustomerName ||
      !isValidCustomerPhone ||
      !isValidCustomerEmail ||
      !isValidCustomerAddressLine ||
      !isValidCustomerCity ||
      !isValidCustomerPostalCode;

    createRepairNoteDispatch({
      type: createRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    createRepairNoteAction.setStepsInError,
    createRepairNoteDispatch,
    isValidCustomerName,
    isValidCustomerPhone,
    isValidCustomerEmail,
    isValidCustomerAddressLine,
    isValidCustomerCity,
    isValidCustomerPostalCode,
  ]);
  // ------------- end input validation ------------- //

  // ------------- accessible error and valid texts ------------- //

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [customerNameInputErrorText, customerNameInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer name',
      inputText: customerName,
      isValidInputText: isValidCustomerName,
      isInputTextFocused: isCustomerNameFocused,
      regexValidationText: returnNameValidationText({
        content: customerName,
        contentKind: 'customer name',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [customerPhoneInputErrorText, customerPhoneInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer phone',
      inputText: customerPhone,
      isValidInputText: isValidCustomerPhone,
      isInputTextFocused: isCustomerPhoneFocused,
      regexValidationText: returnPhoneNumberValidationText(customerPhone),
    });

  const [customerEmailInputErrorText, customerEmailInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer email',
      inputText: customerEmail,
      isValidInputText: isValidCustomerEmail,
      isInputTextFocused: isCustomerEmailFocused,
      regexValidationText: returnEmailValidationText(customerEmail),
    });

  const [customerAddressLineInputErrorText, customerAddressLineInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer address line',
      inputText: customerAddressLine,
      isValidInputText: isValidCustomerAddressLine,
      isInputTextFocused: isCustomerAddressLineFocused,
      regexValidationText: returnAddressValidationText({
        content: customerAddressLine,
        contentKind: 'customer address line',
        maxLength: 75,
        minLength: 2,
      }),
    });

  const [customerCityInputErrorText, customerCityInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer city',
      inputText: customerCity,
      isValidInputText: isValidCustomerCity,
      isInputTextFocused: isCustomerCityFocused,
      regexValidationText: returnCityValidationText({
        content: customerCity,
        contentKind: 'customer city',
        maxLength: 75,
        minLength: 2,
      }),
    });

  const [customerPostalCodeInputErrorText, customerPostalCodeInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer postal code',
      inputText: customerPostalCode,
      isValidInputText: isValidCustomerPostalCode,
      isInputTextFocused: isCustomerPostalCodeFocused,
      regexValidationText: returnPostalCodeValidationText({
        country: customerCountry,
        postalCode: customerPostalCode,
      }),
    });

  useEffect(() => {
    const fieldsOmittedState = filterFieldsFromObject({
      object: parentState,
      fieldsToFilter: ['createRepairNoteAction', 'createRepairNoteDispatch'],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: 'RepairNoteStepCustomer',
    });
  }, [parentState]);

  return (
    <>
      <Title>Repair note step customer</Title>
    </>
  );
}

export { RepairNoteStepCustomer };
