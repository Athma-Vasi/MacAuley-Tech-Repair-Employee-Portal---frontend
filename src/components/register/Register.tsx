import { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import {
  faCheck,
  faInfoCircle,
  faRefresh,
  faWrench,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Center,
  Flex,
  Group,
  Input,
  Loader,
  NativeSelect,
  PasswordInput,
  Stepper,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';

import {
  COLORS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../constants';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_REGEX,
  DEPARTMENTS,
  FULL_NAME_REGEX,
  JOB_POSITIONS,
  NAME_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  PROVINCES,
  REGISTER_URL,
  STATES_US,
} from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import {
  returnAddressLineValidationText,
  returnCityValidationText,
  returnDateValidationText,
  returnFullNameValidationText,
  returnNameValidationText,
  returnPasswordRegexValidationText,
  returnPhoneNumberInputValidationText,
  returnPostalCodeValidationText,
} from './utils';
import { axiosInstance } from '../../api/axios';
import { RegisterResponse } from './types';
import { screenReaderPasswordSpecialCharacters } from '../../domElements';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { Success } from '../success';
import { StepperWrapper } from './stepperWrapper/StepperWrapper';
import { RegisterStepAuthentication } from './registerStepAuthentication/RegisterStepAuthentication';
import { RegisterStepPersonal } from './registerStepPersonal/RegisterStepPersonal';

function Register() {
  const [
    {
      email,
      isValidEmail,
      isEmailFocused,

      username,
      isValidUsername,
      isUsernameFocused,

      password,
      isValidPassword,
      isPasswordFocused,

      confirmPassword,
      isValidConfirmPassword,
      isConfirmPasswordFocused,

      firstName,
      isValidFirstName,
      isFirstNameFocused,

      middleName,
      isValidMiddleName,
      isMiddleNameFocused,

      lastName,
      isValidLastName,
      isLastNameFocused,

      preferredName,
      isValidPreferredName,
      isPreferredNameFocused,

      preferredPronouns,

      address,
      contactNumber,
      isValidContactNumber,
      isContactNumberFocused,

      jobPosition,
      department,
      emergencyContact,

      startDate,
      isValidStartDate,
      isStartDateFocused,

      currentStepperPosition,
      isError,
      errorMessage,
      isSuccessful,
      successMessage,
      isLoading,
      loadingMessage,
      isSubmitting,
      submitMessage,
    },
    registerDispatch,
  ] = useReducer(registerReducer, initialRegisterState);
  const {
    addressLine,
    isValidAddressLine,
    isAddressLineFocused,
    city,
    isValidCity,
    isCityFocused,
    province,
    state,
    country,
    postalCode,
    isValidPostalCode,
    isPostalCodeFocused,
  } = address;
  const {
    fullName,
    isValidFullName,
    isFullNameFocused,
    phoneNumber,
    isValidPhoneNumber,
    isPhoneNumberFocused,
  } = emergencyContact;

  const emailRef = useRef<HTMLInputElement>(null);
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

  // used to validate emergency contact full name on every change
  useEffect(() => {
    const isValidEmergencyName =
      FULL_NAME_REGEX.test(fullName) && fullName.length >= 5;

    registerDispatch({
      type: registerAction.setIsValidEmergencyContactFullName,
      payload: isValidEmergencyName,
    });
  }, [fullName]);

  // used to validate emergency contact phone number on every change
  useEffect(() => {
    const isValidEmergencyNumber = PHONE_NUMBER_REGEX.test(phoneNumber);

    const phoneNumberLength = phoneNumber.length;
    if (isPhoneNumberFocused) {
      switch (phoneNumberLength) {
        case 4:
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}(`,
          });
          break;
        case 8:
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}) `,
          });
          break;
        case 13:
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}-`,
          });
          break;

        default:
          break;
      }
    }

    registerDispatch({
      type: registerAction.setIsValidEmergencyContactPhoneNumber,
      payload: isValidEmergencyNumber,
    });
  }, [phoneNumber, isPhoneNumberFocused]);

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

  // used to validate start date on every change
  useEffect(() => {
    const isValidDate = DATE_REGEX.test(startDate);

    registerDispatch({
      type: registerAction.setIsValidStartDate,
      payload: isValidDate,
    });

    console.log({ startDate });
  }, [startDate]);

  // removes error message after every change in values of input fields in dependency array
  useEffect(() => {
    registerDispatch({
      type: registerAction.setErrorMessage,
      payload: '',
    });
  }, [
    email,
    username,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    preferredName,
    addressLine,
    city,
    postalCode,
    contactNumber,
    fullName,
    phoneNumber,
    startDate,
  ]);

  const displayError = (
    <CustomError
      ref={errorRef}
      message={errorMessage}
      link={{
        address: '/login',
        text: 'Back to login',
      }}
      isError={errorMessage ? true : false}
    />
  );

  const displaySuccess = (
    <Success
      message="You have successfully registered!"
      link={{ address: '/login', text: 'Click here to login' }}
      isSuccessful={isSuccessful}
    />
  );

  const displayLoading = <Loading dataDirection="load" />;

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

  const emergencyContactFullNameInputValidationText = (
    <Text
      id="emergency-contact-full-name-note"
      className={
        isFullNameFocused && fullName && !isValidFullName ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnFullNameValidationText(fullName)}
    </Text>
  );

  const emergencyPhoneNumberInputValidationText = (
    <Text
      id="emergency-phone-number-note"
      className={
        isPhoneNumberFocused && phoneNumber !== '+(1)' && !isValidPhoneNumber
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPhoneNumberInputValidationText(phoneNumber)}
    </Text>
  );

  const startDateInputValidationText = (
    <Text
      id="start-date-note"
      className={
        isStartDateFocused && startDate && !isValidStartDate ? '' : 'offscreen'
      }
      w="100%"
      color="red"
      size="xs"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnDateValidationText(startDate)}
    </Text>
  );

  async function handleRegisterFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // ~sanity~ safety check
    const testEmail = EMAIL_REGEX.test(email);
    const testUsername = USERNAME_REGEX.test(username);
    const testPassword = PASSWORD_REGEX.test(password);
    const testConfirmPassword = password === confirmPassword;
    const testFirstName = NAME_REGEX.test(firstName);
    const testMiddleName = NAME_REGEX.test(middleName);
    const testLastName = NAME_REGEX.test(lastName);
    const testCity = CITY_REGEX.test(city);

    // if any field is invalid, display error message and return
    if (
      !testEmail ||
      !testUsername ||
      !testPassword ||
      !testConfirmPassword ||
      !testFirstName ||
      !testMiddleName ||
      !testLastName ||
      !testCity
    ) {
      registerDispatch({
        type: registerAction.setErrorMessage,
        payload: 'Please fill out all fields correctly',
      });
      return;
    }

    const newUserObj = {
      email,
      username,
      password,
    };

    const controller = new AbortController();
    const { signal } = controller;

    try {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const axiosConfig = {
        method: 'post',
        signal,
        url: REGISTER_URL,
        data: newUserObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axiosInstance<RegisterResponse>(axiosConfig);

      const { status } = response;

      if (status === 201) {
        registerDispatch({
          type: registerAction.setIsSuccessful,
          payload: true,
        });
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: '',
        });
        return;
      }
    } catch (error: any) {
      if (!error.response) {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: 'Network error',
        });
      } else {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: error.response.data.message,
        });
      }

      errorRef.current?.focus();
    } finally {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: false,
      });

      controller.abort();
    }
  }

  const selectProvinceInput = (
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
  );

  const selectStateInput = (
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

  const displayAuthenticationStep =
    currentStepperPosition === 1 ? (
      <RegisterStepAuthentication
        email={email}
        isValidEmail={isValidEmail}
        isEmailFocused={isEmailFocused}
        username={username}
        isValidUsername={isValidUsername}
        isUsernameFocused={isUsernameFocused}
        password={password}
        isValidPassword={isValidPassword}
        isPasswordFocused={isPasswordFocused}
        confirmPassword={confirmPassword}
        isValidConfirmPassword={isValidConfirmPassword}
        isConfirmPasswordFocused={isConfirmPasswordFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : null;

  const displayPersonalStep =
    currentStepperPosition === 2 ? (
      <RegisterStepPersonal
        firstName={firstName}
        isValidFirstName={isValidFirstName}
        isFirstNameFocused={isFirstNameFocused}
        middleName={middleName}
        isValidMiddleName={isValidMiddleName}
        isMiddleNameFocused={isMiddleNameFocused}
        lastName={lastName}
        isValidLastName={isValidLastName}
        isLastNameFocused={isLastNameFocused}
        preferredName={preferredName}
        isValidPreferredName={isValidPreferredName}
        isPreferredNameFocused={isPreferredNameFocused}
        preferredPronouns={preferredPronouns}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : null;

  const { buttonTextColor } = COLORS;

  const displayRegisterForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
      rowGap="lg"
      w="100%"
      h="100%"
    >
      <StepperWrapper
        currentStepperPosition={currentStepperPosition}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
      <form onSubmit={handleRegisterFormSubmit} style={{ width: '100%' }}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="lg"
          w="100%"
        >
          <Title
            order={3}
            color={buttonTextColor}
            style={{ letterSpacing: '0.10rem' }}
          >
            Register
          </Title>
          {/* first step authentication */}
          {displayAuthenticationStep}

          {/* second step */}
          {displayPersonalStep}

          {/* third step : address*/}
          {/* contact number */}
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
              isValidCity ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
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
          {country === 'Canada' ? selectProvinceInput : selectStateInput}

          {/* postal code */}
          {country === 'Canada'
            ? selectCanadianPostalCodeInput
            : selectUSPostalCodeInput}

          {/* step three */}
          {/* job position */}
          <NativeSelect
            data={JOB_POSITIONS}
            label="Job position"
            value={jobPosition}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setJobPosition,
                payload: event.currentTarget.value,
              });
            }}
            withAsterisk
            required
          />
          {/* department */}
          <NativeSelect
            data={DEPARTMENTS}
            label="Department"
            value={department}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setDepartment,
                payload: event.currentTarget.value,
              });
            }}
            withAsterisk
            required
          />
          {/* emergency contact */}
          <TextInput
            w="100%"
            color="dark"
            label="Full name"
            placeholder="Enter contact name"
            autoComplete="off"
            aria-describedby="emergency-contact-full-name-note"
            aria-invalid={isValidFirstName ? false : true}
            value={fullName}
            icon={
              isValidFullName ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidFullName && fullName !== ''}
            description={emergencyContactFullNameInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setEmergencyContactFullName,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsEmergencyContactFullNameFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsEmergencyContactFullNameFocused,
                payload: false,
              });
            }}
            minLength={2}
            maxLength={100}
          />
          {/* emergency contact number */}
          <TextInput
            w="100%"
            color="dark"
            label="Emergency phone number"
            description={emergencyPhoneNumberInputValidationText}
            placeholder="Enter phone number"
            autoComplete="off"
            aria-describedby="emergency-phone-number-note"
            aria-invalid={isValidPhoneNumber ? false : true}
            value={phoneNumber}
            onKeyDown={(event) => {
              if (event.key === 'Backspace') {
                if (phoneNumber.length === 14) {
                  registerDispatch({
                    type: registerAction.setEmergencyContactPhoneNumber,
                    payload: phoneNumber.slice(0, -1),
                  });
                } else if (phoneNumber.length === 9) {
                  registerDispatch({
                    type: registerAction.setEmergencyContactPhoneNumber,
                    payload: phoneNumber.slice(0, -1),
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
                      type: registerAction.setEmergencyContactPhoneNumber,
                      payload: '+(1)',
                    });
                  }}
                />
              </Tooltip>
            }
            icon={
              isValidPhoneNumber ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidPhoneNumber && phoneNumber !== '+(1)'}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setEmergencyContactPhoneNumber,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsEmergencyContactPhoneNumberFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsEmergencyContactPhoneNumberFocused,
                payload: false,
              });
            }}
            maxLength={18}
          />
          {/* start date */}
          <label htmlFor="start-date">
            <Text color="dark">Start date</Text>
          </label>
          {startDateInputValidationText}
          <Input
            w="100%"
            color="dark"
            type="date"
            id="start-date"
            min={new Date(1900, 0, 1).toISOString().split('T')[0]}
            max={new Date(2024, 11, 31).toISOString().split('T')[0]}
            aria-describedby="start-date-note"
            error={!isValidStartDate && startDate !== ''}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setStartDate,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsStartDateFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsStartDateFocused,
                payload: false,
              });
            }}
          />

          {/* stepper nav buttons */}
          <Group position="center" mt="xl">
            <Button
              variant="default"
              disabled={currentStepperPosition === 1}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep > 0 ? currentStep - 1 : currentStep + 1,
                });
              }}
            >
              Back
            </Button>
            <Button
              disabled={currentStepperPosition === 4}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep < 4 ? currentStep + 1 : currentStep - 1,
                });
              }}
            >
              Next step
            </Button>
          </Group>

          {/* register button */}
          <Flex w="100%" justify="flex-end">
            <Button
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.click();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
              tabIndex={0}
              type="submit"
              disabled={
                !isValidEmail ||
                !isValidUsername ||
                !isValidPassword ||
                !isValidConfirmPassword
                  ? true
                  : false
              }
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </form>

      {/*  */}
      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Flex w={375} p="sm" h="100%">
      {errorMessage
        ? displayError
        : isSubmitting
        ? displayLoading
        : isSuccessful
        ? displaySuccess
        : displayRegisterForm}
    </Flex>
  );
}

export { Register };
