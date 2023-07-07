import { faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, NativeSelect, TextInput, Tooltip } from '@mantine/core';
import { useEffect } from 'react';

import { PROVINCES, STATES_US } from '../../../constants/data';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from '../../../constants/regex';
import { returnAccessibleTextElements } from '../../../jsxCreators';
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
} from '../../../utils';
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
        case 4: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

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

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [addressLineInputErrorText, addressLineInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'address line',
      inputText: addressLine,
      isValidInputText: isValidAddressLine,
      isInputTextFocused: isAddressLineFocused,
      regexValidationText: returnAddressValidationText({
        content: addressLine,
        contentKind: 'address line',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [cityInputErrorText, cityInputValidText] = returnAccessibleTextElements(
    {
      inputElementKind: 'city',
      inputText: city,
      isValidInputText: isValidCity,
      isInputTextFocused: isCityFocused,
      regexValidationText: returnCityValidationText({
        content: city,
        contentKind: 'city',
        minLength: 2,
        maxLength: 75,
      }),
    }
  );

  const [postalCodeInputErrorText, postalCodeInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'postal code',
      inputText: postalCode,
      isValidInputText: isValidPostalCode,
      isInputTextFocused: isPostalCodeFocused,
      regexValidationText: returnPostalCodeValidationText({
        postalCode,
        country,
      }),
    });

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'contact number',
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      isInputTextFocused: isContactNumberFocused,
      regexValidationText: returnPhoneNumberValidationText(contactNumber),
    });

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
        isValidPostalCode
          ? 'postal-code-input-note-valid'
          : 'postal-code-input-note-error'
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
        isValidPostalCode
          ? 'postal-code-input-note-valid'
          : 'postal-code-input-note-error'
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
            ? 'contact-number-input-note-valid'
            : 'contact-number-input-note-error'
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
            ? 'address-line-input-note-valid'
            : 'address-line-input-note-error'
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
        aria-describedby={
          isValidCity ? 'city-input-note-valid' : 'city-input-note-error'
        }
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
