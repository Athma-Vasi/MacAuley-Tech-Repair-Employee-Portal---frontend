import { ChangeEvent, KeyboardEvent, useEffect } from "react";

import {
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
  JOB_POSITION_DATA,
} from "../../../constants/data";
import {
  DATE_REGEX,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
} from "../../../constants/regex";
import {
  returnAccessibleDateTimeElements,
  AccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import { Department, JobPosition, StoreLocation } from "../../../types";
import {
  returnDateValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
} from "../../../utils";
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../wrappers";
import type { RegisterStepAdditionalProps } from "./types";

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
}: RegisterStepAdditionalProps) {}

export { RegisterStepAdditional };

/**
 * // used to validate emergency contact full name on every change
  useEffect(() => {
    const isValidEmergencyName = FULL_NAME_REGEX.test(fullName);

    registerDispatch({
      type: registerAction.setIsValidEmergencyContactFullName,
      payload: isValidEmergencyName,
    });
  }, [fullName, registerAction.setIsValidEmergencyContactFullName, registerDispatch]);

  // used to validate emergency contact phone number on every change
  useEffect(() => {
    const isValidEmergencyNumber = PHONE_NUMBER_REGEX.test(phoneNumber);

    const phoneNumberLength = phoneNumber.length;
    if (isPhoneNumberFocused) {
      switch (phoneNumberLength) {
        case 4: {
          registerDispatch({
            type: registerAction.setEmergencyContactNumber,
            payload: `${phoneNumber}(`,
          });
          break;
        }
        case 8: {
          registerDispatch({
            type: registerAction.setEmergencyContactNumber,
            payload: `${phoneNumber}) `,
          });
          break;
        }
        case 13: {
          registerDispatch({
            type: registerAction.setEmergencyContactNumber,
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
    registerAction.setEmergencyContactNumber,
  ]);

  // used to validate start date on every change
  useEffect(() => {
    const isValidDate = DATE_REGEX.test(startDate);

    registerDispatch({
      type: registerAction.setIsValidStartDate,
      payload: isValidDate,
    });
  }, [registerAction.setIsValidStartDate, registerDispatch, startDate]);

  // update the corresponding pagesInError state if any of the inputs are in error
  useEffect(() => {
    const isStepInError = !isValidFullName || !isValidPhoneNumber || !isValidStartDate;

    registerDispatch({
      type: registerAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 3,
      },
    });
  }, [
    isValidFullName,
    isValidPhoneNumber,
    isValidStartDate,
    registerAction.setPageInError,
    registerDispatch,
  ]);

  const [emergencyContactFullNameInputErrorText, emergencyContactFullNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "full name",
      inputText: fullName,
      isInputTextFocused: isFullNameFocused,
      isValidInputText: isValidFullName,
      regexValidationText: returnNameValidationText({
        content: fullName,
        contentKind: "full name",
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [emergencyPhoneNumberInputErrorText, emergencyPhoneNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "phone number",
      inputText: phoneNumber,
      isInputTextFocused: isPhoneNumberFocused,
      isValidInputText: isValidPhoneNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: phoneNumber,
        contentKind: "phone number",
      }),
    });

  const [startDateInputErrorText, startDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "start date",
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate,
      regexValidationText: returnDateValidationText({
        content: startDate,
        contentKind: "start date",
      }),
    });

  const departmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DEPARTMENT_DATA,
    description: "Select your department",
    label: "Department",
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
    description: "Select your job position",
    label: "Job position",
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

  const isStoreLocationSelectInputDisabled = [
    "Executive Management",
    "Accounting",
    "Sales",
    "Marketing",
    "Human Resources",
    "Information Technology",
  ].includes(department);

  const storeLocationSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: STORE_LOCATION_DATA,
    disabled: isStoreLocationSelectInputDisabled,
    description: "Select your store location",
    label: "Store location",
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

  const emergencyContactFullNameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: emergencyContactFullNameInputErrorText,
      valid: emergencyContactFullNameInputValidText,
    },
    inputText: fullName,
    isValidInputText: isValidFullName,
    label: "Full name",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsEmergencyContactFullNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setEmergencyContactName,
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
    semanticName: "full name",
  };

  const emergencyPhoneNumberInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: emergencyPhoneNumberInputErrorText,
        valid: emergencyPhoneNumberInputValidText,
      },
      inputText: phoneNumber,
      isValidInputText: isValidPhoneNumber,
      label: "Emergency contact number",
      onBlur: () => {
        registerDispatch({
          type: registerAction.setIsEmergencyContactPhoneNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        registerDispatch({
          type: registerAction.setEmergencyContactNumber,
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
          type: registerAction.setEmergencyContactNumber,
          payload: "+(1)",
        });
      },
      required: true,
      withAsterisk: true,
      semanticName: "phone number",
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
          if (phoneNumber.length === 14 || phoneNumber.length === 9) {
            registerDispatch({
              type: registerAction.setEmergencyContactNumber,
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
    label: "Start date",
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
    placeholder: "Enter your start date",
    required: true,
    withAsterisk: true,
    semanticName: "start date",
    inputKind: "date",
    dateKind: "full date",
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

  const [createdEmergencyContactFullNameInput] = returnAccessibleTextInputElements([
    emergencyContactFullNameInputCreatorInfo,
  ]);

  const [createdEmergencyPhoneNumberInput] = returnAccessiblePhoneNumberTextInputElements(
    [emergencyPhoneNumberInputCreatorInfo]
  );

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

 */
