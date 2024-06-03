import { ChangeEvent, useCallback, useEffect } from "react";

import { DATE_OF_BIRTH_REGEX, NAME_REGEX, URL_REGEX } from "../../../constants/regex";
import {
  AccessibleErrorValidTextElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import { PreferredPronouns } from "../../../types";
import {
  isAgeOver18,
  returnDateOfBirthValidationText,
  returnDateValidationText,
  returnNameValidationText,
  returnUrlValidationText,
} from "../../../utils";
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../wrappers";
import { PREFERRED_PRONOUNS_DATA } from "../constants";
import type { RegisterStepPersonalProps } from "./types";

function RegisterStepPersonal({
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
  profilePictureUrl,
  isValidProfilePictureUrl,
  isProfilePictureUrlFocused,
  dateOfBirth,
  isValidDateOfBirth,
  isDateOfBirthFocused,
  registerDispatch,
  registerAction,
}: RegisterStepPersonalProps) {}

export { RegisterStepPersonal };

/**
 * // used to validate first name on every change
  useEffect(() => {
    const isValidFirst = NAME_REGEX.test(firstName);

    registerDispatch({
      type: registerAction.setIsValidFirstName,
      payload: isValidFirst,
    });
  }, [firstName, registerAction.setIsValidFirstName, registerDispatch]);

  // used to validate middle name on every change
  useEffect(() => {
    const isValidMiddle = NAME_REGEX.test(middleName);

    registerDispatch({
      type: registerAction.setIsValidMiddleName,
      payload: isValidMiddle,
    });
  }, [middleName, registerAction.setIsValidMiddleName, registerDispatch]);

  // used to validate last name on every change
  useEffect(() => {
    const isValidLast = NAME_REGEX.test(lastName);

    registerDispatch({
      type: registerAction.setIsValidLastName,
      payload: isValidLast,
    });
  }, [lastName, registerAction.setIsValidLastName, registerDispatch]);

  // used to validate profile picture url on every change
  useEffect(() => {
    const isValidPfp = URL_REGEX.test(profilePictureUrl);

    registerDispatch({
      type: registerAction.setIsValidProfilePictureUrl,
      payload: isValidPfp,
    });
  }, [profilePictureUrl, registerAction.setIsValidProfilePictureUrl, registerDispatch]);

  // used to validate preferred name on every change
  useEffect(() => {
    const isValidPreferred = NAME_REGEX.test(preferredName);

    registerDispatch({
      type: registerAction.setIsValidPreferredName,
      payload: isValidPreferred,
    });
  }, [preferredName, registerAction.setIsValidPreferredName, registerDispatch]);

  // used to validate date of birth on every change
  useEffect(() => {
    const isValidDob = DATE_OF_BIRTH_REGEX.test(dateOfBirth) && isAgeOver18(dateOfBirth);

    registerDispatch({
      type: registerAction.setIsValidDateOfBirth,
      payload: isValidDob,
    });
  }, [dateOfBirth, registerAction.setIsValidDateOfBirth, registerDispatch]);

  // update the corresponding pagesInError state if any of the inputs are in error
  useEffect(() => {
    const areOptionalInputsInError =
      (!isValidMiddleName && middleName.length > 0) ||
      (!isValidPreferredName && preferredName.length > 0) ||
      (!isValidProfilePictureUrl && profilePictureUrl.length > 0);
    const areRequiredInputsInError =
      !isValidFirstName || !isValidLastName || !isValidDateOfBirth;
    const isStepInError = areOptionalInputsInError || areRequiredInputsInError;

    registerDispatch({
      type: registerAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isValidFirstName,
    isValidLastName,
    isValidMiddleName,
    isValidPreferredName,
    isValidProfilePictureUrl,
    isValidDateOfBirth,
    middleName.length,
    preferredName.length,
    profilePictureUrl.length,
    registerAction.setPageInError,
    registerDispatch,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [firstNameInputErrorText, firstNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "first name",
      inputText: firstName,
      isValidInputText: isValidFirstName,
      isInputTextFocused: isFirstNameFocused,
      regexValidationText: returnNameValidationText({
        content: firstName,
        contentKind: "first name",
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [middleNameInputErrorText, middleNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "middle name",
      inputText: middleName,
      isValidInputText: isValidMiddleName,
      isInputTextFocused: isMiddleNameFocused,
      regexValidationText: returnNameValidationText({
        content: middleName,
        contentKind: "middle name",
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [lastNameInputErrorText, lastNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "last name",
      inputText: lastName,
      isValidInputText: isValidLastName,
      isInputTextFocused: isLastNameFocused,
      regexValidationText: returnNameValidationText({
        content: lastName,
        contentKind: "last name",
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [preferredNameInputErrorText, preferredNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "preferred name",
      inputText: preferredName,
      isValidInputText: isValidPreferredName,
      isInputTextFocused: isPreferredNameFocused,
      regexValidationText: returnNameValidationText({
        content: preferredName,
        contentKind: "preferred name",
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [profilePictureUrlInputErrorText, profilePictureUrlInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "profile picture url",
      inputText: profilePictureUrl,
      isValidInputText: isValidProfilePictureUrl,
      isInputTextFocused: isProfilePictureUrlFocused,
      regexValidationText: returnUrlValidationText({
        content: profilePictureUrl,
        contentKind: "profile picture url",
      }),
    });

  // useCallback function of isAgeOver18

  const isLegalAdultMessage =
    isAgeOver18(dateOfBirth) || dateOfBirth === ""
      ? ""
      : "You must be 18 years or older to register.";

  const [dateOfBirthInputErrorText, dateOfBirthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "date of birth",
      inputText: dateOfBirth,
      isValidInputText: isValidDateOfBirth,
      isInputTextFocused: isDateOfBirthFocused,
      regexValidationText: `${isLegalAdultMessage} ${returnDateOfBirthValidationText({
        content: dateOfBirth,
        contentKind: "date of birth",
      })}`,
    });

  const firstNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: firstNameInputErrorText,
      valid: firstNameInputValidText,
    },
    inputText: firstName,
    isValidInputText: isValidFirstName,
    label: "First name",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsFirstNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setFirstName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsFirstNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter first name",
    required: true,
    withAsterisk: true,
    semanticName: "first name",
  };

  const middleNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: middleNameInputErrorText,
      valid: middleNameInputValidText,
    },
    inputText: middleName,
    isValidInputText: isValidMiddleName,
    label: "Middle name",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsMiddleNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setMiddleName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsMiddleNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter middle name",
    semanticName: "middle name",
  };

  const lastNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: lastNameInputErrorText,
      valid: lastNameInputValidText,
    },
    inputText: lastName,
    isValidInputText: isValidLastName,
    label: "Last name",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsLastNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setLastName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsLastNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter last name",
    required: true,
    withAsterisk: true,
    semanticName: "last name",
  };

  const preferredNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: preferredNameInputErrorText,
      valid: preferredNameInputValidText,
    },
    inputText: preferredName,
    isValidInputText: isValidPreferredName,
    label: "Preferred name",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsPreferredNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setPreferredName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsPreferredNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter preferred name",
    semanticName: "preferred name",
  };

  const profilePictureUrlTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: profilePictureUrlInputErrorText,
      valid: profilePictureUrlInputValidText,
    },
    inputText: profilePictureUrl,
    isValidInputText: isValidProfilePictureUrl,
    label: "Profile picture url",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsProfilePictureUrlFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setProfilePictureUrl,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsProfilePictureUrlFocused,
        payload: true,
      });
    },
    placeholder: "Enter profile picture url",
    semanticName: "profile picture url",
  };

  const preferredPronounsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select your preferred pronouns",
    label: "Preferred pronouns",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      registerDispatch({
        type: registerAction.setPreferredPronouns,
        payload: event.currentTarget.value as PreferredPronouns,
      });
    },
    data: PREFERRED_PRONOUNS_DATA,
    value: preferredPronouns,
  };

  const dateOfBirthInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: "full date",
    description: {
      error: dateOfBirthInputErrorText,
      valid: dateOfBirthInputValidText,
    },
    inputKind: "date",
    inputText: dateOfBirth,
    isValidInputText: isValidDateOfBirth,
    label: "Date of birth",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsDateOfBirthFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setDateOfBirth,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsDateOfBirthFocused,
        payload: true,
      });
    },
    placeholder: "Enter date of birth",
    required: true,
    semanticName: "date of birth",
  };

  const [
    createdFirstNameTextInput,
    createdMiddleNameTextInput,
    createdLastNameTextInput,
    createdPreferredNameTextInput,
    createdProfilePictureUrlTextInput,
  ] = returnAccessibleTextInputElements([
    firstNameTextInputCreatorInfo,
    middleNameTextInputCreatorInfo,
    lastNameTextInputCreatorInfo,
    preferredNameTextInputCreatorInfo,
    profilePictureUrlTextInputCreatorInfo,
  ]);

  const [createdPreferredPronounsSelectInput] = returnAccessibleSelectInputElements([
    preferredPronounsSelectInputCreatorInfo,
  ]);

  const [createdDateOfBirthInput] = returnAccessibleDateTimeElements([
    dateOfBirthInputCreatorInfo,
  ]);

  const createdPersonalInfoForm = (
    <FormLayoutWrapper>
      {createdFirstNameTextInput}
      {createdMiddleNameTextInput}
      {createdLastNameTextInput}
      {createdPreferredNameTextInput}
      {createdProfilePictureUrlTextInput}
      {createdPreferredPronounsSelectInput}
      {createdDateOfBirthInput}
    </FormLayoutWrapper>
  );

  return <>{createdPersonalInfoForm}</>;

 */
