import { Flex, Text } from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';

import { returnAccessibleTextElem } from '../../jsxCreators';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from '../register/constants';
import {
  addressChangeAction,
  addressChangeReducer,
  initialAddressChangeState,
} from './state';

function AddressChange() {
  const [addressChangeState, addressChangeDispatch] = useReducer(
    addressChangeReducer,
    initialAddressChangeState
  );
  const {
    addressLine,
    city,
    contactNumber,
    isContactNumberFocused,
    isValidContactNumber,
    country,
    isAddressLineFocused,
    isCityFocused,
    isPostalCodeFocused,
    isValidAddressLine,
    isValidCity,
    isValidPostalCode,
    postalCode,
    province,
    state,
  } = addressChangeState;

  // sets focus on address line input on page load
  const addressLineRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    addressLineRef.current?.focus();
  }, []);

  // used to validate address line on every change
  useEffect(() => {
    const isValidAddress = ADDRESS_LINE_REGEX.test(addressLine);

    addressChangeDispatch({
      type: addressChangeAction.setIsValidAddressLine,
      payload: isValidAddress,
    });
  }, [addressLine]);

  // used to validate city on every change
  useEffect(() => {
    const isValidPlace = CITY_REGEX.test(city);

    addressChangeDispatch({
      type: addressChangeAction.setIsValidCity,
      payload: isValidPlace,
    });
  }, [city]);

  // resets address if country is changed
  useEffect(() => {
    addressChangeDispatch({
      type: addressChangeAction.setAddressLine,
      payload: '',
    });
    addressChangeDispatch({
      type: addressChangeAction.setCity,
      payload: '',
    });
    addressChangeDispatch({
      type: addressChangeAction.setPostalCode,
      payload: '',
    });
  }, [country]);

  // used to validate contact number on every change
  useEffect(() => {
    const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4:
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        case 8:
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        case 13:
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;

        default:
          break;
      }
    }

    addressChangeDispatch({
      type: addressChangeAction.setIsValidContactNumber,
      payload: isValidContact,
    });
  }, [contactNumber, isContactNumberFocused]);

  // used to validate postal code on every change
  useEffect(() => {
    const isValidPostal =
      country === 'Canada'
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode);

    if (country === 'Canada') {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 3) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }

    addressChangeDispatch({
      type: addressChangeAction.setIsValidPostalCode,
      payload: isValidPostal,
    });
  }, [postalCode, country]);

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const [addressLineInputErrorText, addressLineInputValidText] =
    returnAccessibleTextElem({
      inputElementKind: 'address line',
      inputText: addressLine,
      isValidInputText: isValidAddressLine,
      isInputTextFocused: isAddressLineFocused,
    });

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      <Text>Address change</Text>
    </Flex>
  );
}

export { AddressChange };
