import { ChangeEvent, KeyboardEvent, useEffect } from 'react';

import {
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
  JOB_POSITION_DATA,
} from '../../../constants/data';
import {
  DATE_REGEX,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { Department, JobPosition, StoreLocation } from '../../../types';
import {
  returnDateValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
} from '../../../utils';
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../wrappers';
import type { RegisterStepAdditionalProps } from './types';
import { STORE_LOCATION_DATA } from '../constants';

function RegisterStepAdditional({
  jobPosition,
  department,
  storeLocation,
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
        case 4: {
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}(`,
          });
          break;
        }
        case 8: {
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}) `,
          });
          break;
        }
        case 13: {
          registerDispatch({
            type: registerAction.setEmergencyContactPhoneNumber,
            payload: `${phoneNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    registerDispatch({
      type: registerAction.setIsValidEmergencyContactPhoneNumber,
      payload: isValidEmergencyNumber,
    });
  }, [
    phoneNumber,
    isPhoneNumberFocused,
    registerDispatch,
    registerAction.setIsValidEmergencyContactPhoneNumber,
    registerAction.setEmergencyContactPhoneNumber,
  ]);

  // used to validate start date on every change
  useEffect(() => {
    const isValidDate = DATE_REGEX.test(startDate);

    registerDispatch({
      type: registerAction.setIsValidStartDate,
      payload: isValidDate,
    });
  }, [registerAction.setIsValidStartDate, registerDispatch, startDate]);

  // update the corresponding stepsInError state if any of the inputs are in error
  useEffect(() => {
    const isStepInError =
      !isValidFullName || !isValidPhoneNumber || !isValidStartDate;

    registerDispatch({
      type: registerAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 3,
      },
    });
  }, [
    isValidFullName,
    isValidPhoneNumber,
    isValidStartDate,
    registerAction.setStepsInError,
    registerDispatch,
  ]);

  const [
    emergencyContactFullNameInputErrorText,
    emergencyContactFullNameInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'full name',
    inputText: fullName,
    isInputTextFocused: isFullNameFocused,
    isValidInputText: isValidFullName,
    regexValidationText: returnNameValidationText({
      content: fullName,
      contentKind: 'full name',
      minLength: 2,
      maxLength: 100,
    }),
  });

  const [
    emergencyPhoneNumberInputErrorText,
    emergencyPhoneNumberInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'phone number',
    inputText: phoneNumber,
    isInputTextFocused: isPhoneNumberFocused,
    isValidInputText: isValidPhoneNumber,
    regexValidationText: returnPhoneNumberValidationText(phoneNumber),
  });

  const [startDateInputErrorText, startDateInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'start date',
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate,
      regexValidationText: returnDateValidationText(startDate),
    });

  const departmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DEPARTMENT_DATA,
    description: 'Select your department',
    label: 'Department',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      registerDispatch({
        type: registerAction.setDepartment,
        payload: event.currentTarget.value as Department,
      });
    },
    required: true,
    value: department,
    withAsterisk: true,
  };

  const jobPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DEPARTMENT_JOB_POSITION_MAP.get(department) ?? [],
    description: 'Select your job position',
    label: 'Job position',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      registerDispatch({
        type: registerAction.setJobPosition,
        payload: event.currentTarget.value as JobPosition,
      });
    },
    required: true,
    value: jobPosition,
    withAsterisk: true,
  };

  const storeLocationSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: STORE_LOCATION_DATA,
      description: 'Select your store location',
      label: 'Store location',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        registerDispatch({
          type: registerAction.setStoreLocation,
          payload: event.currentTarget.value as StoreLocation,
        });
      },
      required: true,
      value: storeLocation,
      withAsterisk: true,
    };

  const emergencyContactFullNameInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: emergencyContactFullNameInputErrorText,
        valid: emergencyContactFullNameInputValidText,
      },
      inputText: fullName,
      isValidInputText: isValidFullName,
      label: 'Full name',
      onBlur: () => {
        registerDispatch({
          type: registerAction.setIsEmergencyContactFullNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        registerDispatch({
          type: registerAction.setEmergencyContactFullName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        registerDispatch({
          type: registerAction.setIsEmergencyContactFullNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter contact's full name",
      required: true,
      withAsterisk: true,
      semanticName: 'full name',
    };

  const emergencyPhoneNumberInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: emergencyPhoneNumberInputErrorText,
        valid: emergencyPhoneNumberInputValidText,
      },
      inputText: phoneNumber,
      isValidInputText: isValidPhoneNumber,
      label: 'Emergency contact number',
      onBlur: () => {
        registerDispatch({
          type: registerAction.setIsEmergencyContactPhoneNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        registerDispatch({
          type: registerAction.setEmergencyContactPhoneNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        registerDispatch({
          type: registerAction.setIsEmergencyContactPhoneNumberFocused,
          payload: true,
        });
      },
      placeholder: "Enter your contact's number",
      rightSection: true,
      rightSectionOnClick: () => {
        registerDispatch({
          type: registerAction.setEmergencyContactPhoneNumber,
          payload: '+(1)',
        });
      },
      required: true,
      withAsterisk: true,
      semanticName: 'phone number',
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (phoneNumber.length === 14 || phoneNumber.length === 9) {
            registerDispatch({
              type: registerAction.setEmergencyContactPhoneNumber,
              payload: phoneNumber.slice(0, -1),
            });
          }
        }
      },
    };

  const startDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: startDateInputErrorText,
      valid: startDateInputValidText,
    },
    inputText: startDate,
    isValidInputText: isValidStartDate,
    label: 'Start date',
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsStartDateFocused,
        payload: true,
      });
    },
    placeholder: 'Enter your start date',
    required: true,
    withAsterisk: true,
    semanticName: 'start date',
    inputKind: 'date',
    dateKind: 'full date',
  };

  const [
    createdJobPositionSelectInput,
    createdDepartmentSelectInput,
    createdStoreLocationSelectInput,
  ] = returnAccessibleSelectInputElements([
    jobPositionSelectInputCreatorInfo,
    departmentSelectInputCreatorInfo,
    storeLocationSelectInputCreatorInfo,
  ]);

  const [createdEmergencyContactFullNameInput] =
    returnAccessibleTextInputElements([
      emergencyContactFullNameInputCreatorInfo,
    ]);

  const [createdEmergencyPhoneNumberInput] =
    returnAccessiblePhoneNumberTextInputElements([
      emergencyPhoneNumberInputCreatorInfo,
    ]);

  const [createdStartDateInput] = returnAccessibleDateTimeElements([
    startDateInputCreatorInfo,
  ]);

  const displayRegisterStepAdditional = (
    <FormLayoutWrapper>
      {createdDepartmentSelectInput}
      {createdJobPositionSelectInput}
      {createdStoreLocationSelectInput}
      {createdEmergencyContactFullNameInput}
      {createdEmergencyPhoneNumberInput}
      {createdStartDateInput}
    </FormLayoutWrapper>
  );

  return <>{displayRegisterStepAdditional}</>;
}

export { RegisterStepAdditional };

/**
 * <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <NativeSelect
        size="sm"
        data={JOB_POSITIONS}
        label="Job position"
        value={jobPosition}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setJobPosition,
            payload: event.currentTarget.value as JobPosition,
          });
        }}
        withAsterisk
        required
      />
      
      <NativeSelect
        size="sm"
        data={DEPARTMENTS}
        label="Department"
        value={department}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setDepartment,
            payload: event.currentTarget.value as Department,
          });
        }}
        withAsterisk
        required
      />
      
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Emergency contact name"
        placeholder="Enter full name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidFullName
            ? 'full-name-input-note-valid'
            : 'full-name-input-note-error'
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
      
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Emergency contact number"
        placeholder="Enter phone number"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidPhoneNumber
            ? 'phone-number-input-note-valid'
            : 'phone-number-input-note-error'
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
      
      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Start date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter start date in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidStartDate
            ? 'start-date-input-note-valid'
            : 'start-date-input-note-error'
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
 */
