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
  const emailRef = useRef<HTMLInputElement>(null);

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

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
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
        aria-invalid={isValidFullName ? false : true}
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
    </Flex>
  );
}

export { RegisterStepAdditional };
