import { useRef, useEffect } from 'react';
import { Flex, NativeSelect, Text, TextInput, Tooltip } from '@mantine/core';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  PROVINCES,
  STATES_US,
} from '../constants';
import { RegisterStepAddressProps } from './types';
import {
  faCheck,
  faInfoCircle,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  returnPhoneNumberInputValidationText,
  returnAddressLineValidationText,
  returnCityValidationText,
  returnPostalCodeValidationText,
} from '../utils';

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
  const errorRef = useRef<HTMLDivElement>(null);

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
    }

    registerDispatch({
      type: registerAction.setIsValidPostalCode,
      payload: isValidPostal,
    });
  }, [postalCode, country]);

  const contactNumberInputValidationText = (
    <Text
      id="contact-number-note"
      className={
        isContactNumberFocused &&
        contactNumber !== '+(1)' &&
        !isValidContactNumber
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPhoneNumberInputValidationText(contactNumber)}
    </Text>
  );

  const addressLineInputValidationText = (
    <Text
      id="address-line-note"
      className={
        isAddressLineFocused && addressLine && !isValidAddressLine
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnAddressLineValidationText(addressLine)}
    </Text>
  );

  const cityInputValidationText = (
    <Text
      id="city-note"
      className={isCityFocused && city && !isValidCity ? '' : 'offscreen'}
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {returnCityValidationText(city)}
    </Text>
  );

  const postalCodeInputValidationText = (
    <Text
      id="postal-code-note"
      className={
        isPostalCodeFocused && postalCode && !isValidPostalCode
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPostalCodeValidationText({
        postalCode,
        country,
      })}
    </Text>
  );

  const displayProvinceOrStateInput =
    country === 'Canada' ? (
      <NativeSelect
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
      w="100%"
      color="dark"
      label="Postal code"
      placeholder="Enter Canadian postal code"
      autoComplete="off"
      aria-describedby="postal-code-note"
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
      description={postalCodeInputValidationText}
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
      w="100%"
      color="dark"
      label="Postal code"
      placeholder="Enter US postal code"
      autoComplete="off"
      aria-describedby="postal-code-note"
      aria-invalid={isValidPostalCode ? false : true}
      icon={
        isValidPostalCode ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null
      }
      rightSection={
        <Tooltip label="Reset value to empty">
          <FontAwesomeIcon
            icon={faRefresh}
            cursor="pointer"
            color="gray"
            onClick={() => {
              registerDispatch({
                type: registerAction.setPostalCode,
                payload: '',
              });
            }}
          />
        </Tooltip>
      }
      value={postalCode}
      error={!isValidPostalCode && postalCode !== ''}
      description={postalCodeInputValidationText}
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
        w="100%"
        color="dark"
        label="Personal contact number"
        description={contactNumberInputValidationText}
        placeholder="Enter contact number"
        autoComplete="off"
        aria-describedby="contact-number-note"
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
        w="100%"
        color="dark"
        label="Address line"
        placeholder="Enter address line"
        autoComplete="off"
        aria-describedby="address-line-note"
        aria-invalid={isValidAddressLine ? false : true}
        value={addressLine}
        icon={
          isValidAddressLine ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAddressLine && addressLine !== ''}
        description={addressLineInputValidationText}
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
        minLength={2}
        maxLength={75}
      />
      <TextInput
        w="100%"
        color="dark"
        label="City"
        placeholder="Enter city"
        autoComplete="off"
        aria-describedby="city-note"
        aria-invalid={isValidCity ? false : true}
        value={city}
        icon={
          isValidCity ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
        }
        error={!isValidCity && city !== ''}
        description={cityInputValidationText}
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
