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
import { filterFieldsFromObject, logState } from '../../../../utils';

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
