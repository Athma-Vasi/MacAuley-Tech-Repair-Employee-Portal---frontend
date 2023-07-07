import {
  faCheck,
  faInfoCircle,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Flex,
  NativeSelect,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useEffect, useRef } from 'react';

import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  PROVINCES,
  STATES_US,
} from '../constants';
import {
  returnAddressLineValidationText,
  returnCityValidationText,
  returnPhoneNumberInputValidationText,
  returnPostalCodeValidationText,
} from '../utils';
import { RegisterStepAddressProps } from './types';

function RegisterStepAddress({
  contactNumber,
  isValidContactNumber,
  isContactNumberFocused,
  addressLine,
  isValidAddressLine,
  isAddressLineFocused,
  city,
  isValidCity,
  isCityFocused,
  state,
  province,
  country,
  postalCode,
  isValidPostalCode,
  isPostalCodeFocused,
  registerAction,
  registerDispatch,
}: RegisterStepAddressProps) {
  // used to validate address line on every change
  useEffect(() => {
    const isValidAddress = ADDRESS_LINE_REGEX.test(addressLine);

    registerDispatch({
      type: registerAction.setIsValidAddressLine,
      payload: isValidAddress,
    });
  }, [addressLine]);

  // used to validate city on every change
  useEffect(() => {
    const isValidPlace = CITY_REGEX.test(city);

    registerDispatch({
      type: registerAction.setIsValidCity,
      payload: isValidPlace,
    });
  }, [city]);

  // resets address if country is changed
  useEffect(() => {
    registerDispatch({
      type: registerAction.setAddressLine,
      payload: '',
    });
    registerDispatch({
      type: registerAction.setCity,
      payload: '',
    });
    registerDispatch({
      type: registerAction.setPostalCode,
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
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        case 8:
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        case 13:
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;

        default:
          break;
      }
    }

    registerDispatch({
      type: registerAction.setIsValidContactNumber,
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
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }

    registerDispatch({
      type: registerAction.setIsValidPostalCode,
      payload: isValidPostal,
    });
  }, [postalCode, country]);

  const contactNumberInputErrorText = (
    <Text
      id="contact-number-note-error"
      style={{
        display:
          isContactNumberFocused && contactNumber && !isValidContactNumber
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPhoneNumberInputValidationText(contactNumber)}
    </Text>
  );

  const contactNumberInputValidText = (
    <Text
      id="contact-number-note-valid"
      style={{
        display:
          isContactNumberFocused && contactNumber && isValidContactNumber
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Phone number is valid
    </Text>
  );

  const addressLineInputErrorText = (
    <Text
      id="address-line-note-error"
      style={{
        display:
          isAddressLineFocused && addressLine && !isValidAddressLine
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnAddressLineValidationText(addressLine)}
    </Text>
  );

  const addressLineInputValidText = (
    <Text
      id="address-line-note-valid"
      style={{
        display:
          isAddressLineFocused && addressLine && isValidAddressLine
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Address line is valid
    </Text>
  );

  const cityInputErrorText = (
    <Text
      id="city-note-error"
      style={{
        display: isCityFocused && city && !isValidCity ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {returnCityValidationText(city)}
    </Text>
  );

  const cityInputValidText = (
    <Text
      id="city-note-valid"
      style={{
        display: isCityFocused && city && isValidCity ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> City is valid
    </Text>
  );

  const postalCodeInputErrorText = (
    <Text
      id="postal-code-note-error"
      style={{
        display:
          isPostalCodeFocused && postalCode && !isValidPostalCode
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPostalCodeValidationText({
        postalCode,
        country,
      })}
    </Text>
  );

  const postalCodeInputValidText = (
    <Text
      id="postal-code-note-valid"
      style={{
        display:
          isPostalCodeFocused && postalCode && isValidPostalCode
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Postal code is valid
    </Text>
  );

  const displayProvinceOrStateInput =
    country === 'Canada' ? (
      <NativeSelect
        size="md"
        data={PROVINCES}
        label="Select your province"
        // description="Select your province"
        value={province}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setProvince,
            payload: event.currentTarget.value,
          });
        }}
        required
        withAsterisk
      />
    ) : (
      <NativeSelect
        size="md"
        data={STATES_US}
        // description="Select your state"
        label="Select your state"
        value={state}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setState,
            payload: event.currentTarget.value,
          });
        }}
        required
        withAsterisk
      />
    );

  const selectCanadianPostalCodeInput = (
    <TextInput
      size="md"
      w="100%"
      color="dark"
      label="Postal code"
      placeholder="Enter Canadian postal code"
      autoComplete="off"
      aria-required
      aria-describedby={
        isValidPostalCode ? 'postal-code-note-valid' : 'postal-code-note-error'
      }
      aria-invalid={isValidPostalCode ? false : true}
      icon={
        isValidPostalCode ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      onKeyDown={(event) => {
        if (event.key === 'Backspace' && postalCode.length === 4) {
          registerDispatch({
            type: registerAction.setPostalCode,
            payload: postalCode.slice(0, 3),
          });
        }
      }}
      value={postalCode}
      error={!isValidPostalCode && postalCode !== ''}
      description={
        isValidPostalCode ? postalCodeInputValidText : postalCodeInputErrorText
      }
      onChange={(event) => {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: event.currentTarget.value.toUpperCase(),
        });
      }}
      onFocus={() => {
        registerDispatch({
          type: registerAction.setIsPostalCodeFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        registerDispatch({
          type: registerAction.setIsPostalCodeFocused,
          payload: false,
        });
      }}
      withAsterisk
      required
      maxLength={7}
    />
  );

  const selectUSPostalCodeInput = (
    <TextInput
      size="md"
      w="100%"
      color="dark"
      label="Postal code"
      placeholder="Enter US postal code"
      autoComplete="off"
      aria-required
      aria-describedby={
        isValidPostalCode ? 'postal-code-note-valid' : 'postal-code-note-error'
      }
      aria-invalid={isValidPostalCode ? false : true}
      icon={
        isValidPostalCode ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      value={postalCode}
      error={!isValidPostalCode && postalCode !== ''}
      description={
        isValidPostalCode ? postalCodeInputValidText : postalCodeInputErrorText
      }
      onChange={(event) => {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        registerDispatch({
          type: registerAction.setIsPostalCodeFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        registerDispatch({
          type: registerAction.setIsPostalCodeFocused,
          payload: false,
        });
      }}
      onKeyDown={(event) => {
        if (event.key === 'Backspace' && postalCode.length === 7) {
          registerDispatch({
            type: registerAction.setPostalCode,
            payload: postalCode.slice(0, 6),
          });
        }
      }}
      withAsterisk
      required
      minLength={5}
      maxLength={10}
    />
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Personal contact number"
        aria-required
        aria-describedby={
          isValidContactNumber
            ? 'contact-number-note-valid'
            : 'contact-number-note-error'
        }
        description={
          isValidContactNumber
            ? contactNumberInputValidText
            : contactNumberInputErrorText
        }
        placeholder="Enter contact number"
        autoComplete="off"
        aria-invalid={isValidContactNumber ? false : true}
        value={contactNumber}
        onKeyDown={(event) => {
          if (event.key === 'Backspace') {
            if (contactNumber.length === 14) {
              registerDispatch({
                type: registerAction.setContactNumber,
                payload: contactNumber.slice(0, -1),
              });
            } else if (contactNumber.length === 9) {
              registerDispatch({
                type: registerAction.setContactNumber,
                payload: contactNumber.slice(0, -1),
              });
            }
          }
        }}
        rightSection={
          <Tooltip label="Reset value to +(1)">
            <Button
              type="button"
              size="xs"
              variant="white"
              aria-label="Reset personal contact number value to +(1)"
              mr="md"
            >
              <FontAwesomeIcon
                icon={faRefresh}
                cursor="pointer"
                color="gray"
                onClick={() => {
                  registerDispatch({
                    type: registerAction.setContactNumber,
                    payload: '+(1)',
                  });
                }}
              />
            </Button>
          </Tooltip>
        }
        icon={
          isValidContactNumber ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidContactNumber && contactNumber !== '+(1)'}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsContactNumberFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsContactNumberFocused,
            payload: false,
          });
        }}
        maxLength={18}
      />
      {/* country */}
      <NativeSelect
        size="md"
        data={['Canada', 'United States']}
        label="Country"
        value={country}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setCountry,
            payload: event.currentTarget.value,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Address line"
        placeholder="Enter address line"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidAddressLine
            ? 'address-line-note-valid'
            : 'address-line-note-error'
        }
        aria-invalid={isValidAddressLine ? false : true}
        value={addressLine}
        icon={
          isValidAddressLine ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAddressLine && addressLine !== ''}
        description={
          isValidAddressLine
            ? addressLineInputValidText
            : addressLineInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setAddressLine,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsAddressLineFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsAddressLineFocused,
            payload: false,
          });
        }}
        withAsterisk
        required
        minLength={2}
        maxLength={75}
      />
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="City"
        placeholder="Enter city"
        autoComplete="off"
        aria-required
        aria-describedby={isValidCity ? 'city-note-valid' : 'city-note-error'}
        aria-invalid={isValidCity ? false : true}
        value={city}
        icon={
          isValidCity ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
        }
        error={!isValidCity && city !== ''}
        description={isValidCity ? cityInputValidText : cityInputErrorText}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setCity,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsCityFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsCityFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={75}
        withAsterisk
        required
      />
      {/* province / state */}
      {displayProvinceOrStateInput}

      {/* postal code */}
      {country === 'Canada'
        ? selectCanadianPostalCodeInput
        : selectUSPostalCodeInput}
    </Flex>
  );
}

export { RegisterStepAddress };
