import { useRef, useEffect } from 'react';
import {
  Flex,
  Input,
  NativeSelect,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import {
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
  DATE_REGEX,
  DEPARTMENTS,
  JOB_POSITIONS,
} from '../constants';
import { RegisterStepAdditionalProps } from './types';
import {
  faCheck,
  faInfoCircle,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  returnFullNameValidationText,
  returnPhoneNumberInputValidationText,
  returnDateValidationText,
} from '../utils';
import { kMaxLength } from 'buffer';

function RegisterStepAdditional({
  jobPosition,
  department,
  fullName,
  isValidFullName,
  isFullNameFocused,
  phoneNumber,
  isValidPhoneNumber,
  isPhoneNumberFocused,
  startDate,
  isValidStartDate,
  isStartDateFocused,
  registerAction,
  registerDispatch,
}: RegisterStepAdditionalProps) {
  // used to validate emergency contact full name on every change
  useEffect(() => {
    const isValidEmergencyName = FULL_NAME_REGEX.test(fullName);

    registerDispatch({
      type: registerAction.setIsValidEmergencyContactFullName,
      payload: isValidEmergencyName,
    });
  }, [
    fullName,
    registerAction.setIsValidEmergencyContactFullName,
    registerDispatch,
  ]);

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

  // used to validate start date on every change
  useEffect(() => {
    const isValidDate = DATE_REGEX.test(startDate);

    registerDispatch({
      type: registerAction.setIsValidStartDate,
      payload: isValidDate,
    });

    console.log({ startDate });
  }, [startDate]);

  const emergencyContactFullNameInputErrorText = (
    <Text
      id="emergency-contact-full-name-note-error"
      style={{
        display:
          isFullNameFocused && fullName && !isValidFullName ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnFullNameValidationText(fullName)}
    </Text>
  );

  const emergencyContactFullNameInputValidText = (
    <Text
      id="emergency-contact-full-name-note-valid"
      style={{
        display:
          isFullNameFocused && fullName && isValidFullName ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Full name is valid
    </Text>
  );

  const emergencyPhoneNumberInputErrorText = (
    <Text
      id="emergency-phone-number-note-error"
      style={{
        display:
          isPhoneNumberFocused && phoneNumber && !isValidPhoneNumber
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPhoneNumberInputValidationText(phoneNumber)}
    </Text>
  );

  const emergencyPhoneNumberInputValidText = (
    <Text
      id="emergency-phone-number-note-valid"
      style={{
        display:
          isPhoneNumberFocused && phoneNumber && isValidPhoneNumber
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Emergency contact number is valid
    </Text>
  );

  const startDateInputErrorText = (
    <Text
      id="start-date-note-error"
      style={{
        display:
          isStartDateFocused && startDate && !isValidStartDate
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      size="sm"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnDateValidationText(startDate)}
    </Text>
  );

  const startDateInputValidText = (
    <Text
      id="start-date-note-valid"
      style={{
        display:
          isStartDateFocused && startDate && isValidStartDate
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      size="sm"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Start date is valid
    </Text>
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <NativeSelect
        size="md"
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
        size="md"
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
        size="md"
        w="100%"
        color="dark"
        label="Emergency contact name"
        placeholder="Enter full name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidFullName
            ? 'emergency-contact-full-name-note-valid'
            : 'emergency-contact-full-name-note-error'
        }
        aria-invalid={isValidFullName ? false : true}
        value={fullName}
        icon={
          isValidFullName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidFullName && fullName !== ''}
        description={
          isValidFullName
            ? emergencyContactFullNameInputValidText
            : emergencyContactFullNameInputErrorText
        }
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
        size="md"
        w="100%"
        color="dark"
        label="Emergency contact number"
        placeholder="Enter phone number"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidPhoneNumber
            ? 'emergency-phone-number-note-valid'
            : 'emergency-phone-number-note-error'
        }
        description={
          isValidPhoneNumber
            ? emergencyPhoneNumberInputValidText
            : emergencyPhoneNumberInputErrorText
        }
        aria-invalid={isValidPhoneNumber ? false : true}
        value={phoneNumber}
        onKeyDown={(event) => {
          if (event.key === 'Backspace') {
            if (phoneNumber.length === 9 || phoneNumber.length === 14) {
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
      <TextInput
        type="date"
        size="md"
        w="100%"
        color="dark"
        label="Start date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter start date in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidStartDate ? 'start-date-note-valid' : 'start-date-note-error'
        }
        aria-invalid={isValidStartDate ? false : true}
        value={startDate}
        icon={
          isValidStartDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidStartDate && startDate !== ''}
        description={
          isValidStartDate ? startDateInputValidText : startDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
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
        maxLength={10}
        withAsterisk
        required
      />
    </Flex>
  );
}

export { RegisterStepAdditional };
