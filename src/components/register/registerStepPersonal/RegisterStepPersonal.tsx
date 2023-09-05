import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, NativeSelect, TextInput } from '@mantine/core';
import { ChangeEvent, useCallback, useEffect } from 'react';

import {
  DATE_OF_BIRTH_REGEX,
  DATE_REGEX,
  NAME_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleDateTimeElements,
  AccessibleErrorValidTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnDateValidationText,
  returnNameValidationText,
  returnUrlValidationText,
} from '../../../utils';
import type { RegisterStepPersonalProps } from './types';
import { PreferredPronouns } from '../../../types';
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../wrappers';
import { PREFERRED_PRONOUNS_DATA } from '../constants';

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
}: RegisterStepPersonalProps) {
  // used to validate first name on every change
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
  }, [
    profilePictureUrl,
    registerAction.setIsValidProfilePictureUrl,
    registerDispatch,
  ]);

  // used to validate preferred name on every change
  useEffect(() => {
    const isValidPreferred = NAME_REGEX.test(preferredName);

    registerDispatch({
      type: registerAction.setIsValidPreferredName,
      payload: isValidPreferred,
    });
  }, [preferredName, registerAction.setIsValidPreferredName, registerDispatch]);

  // memoized function to check if the user is 18 years or older
  const isAgeOver18 = useCallback((dateString: string): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth() + 1;
    const inputDay = inputDate.getDate();

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);
    const eighteenYearsAgoYear = eighteenYearsAgo.getFullYear();
    const eighteenYearsAgoMonth = eighteenYearsAgo.getMonth() + 1;
    const eighteenYearsAgoDay = eighteenYearsAgo.getDate();

    if (inputYear < eighteenYearsAgoYear) {
      return true;
    } else if (inputYear === eighteenYearsAgoYear) {
      if (inputMonth < eighteenYearsAgoMonth) {
        return true;
      } else if (inputMonth === eighteenYearsAgoMonth) {
        if (inputDay <= eighteenYearsAgoDay) {
          return true;
        }
      }
    }

    return false;
  }, []);

  // used to validate date of birth on every change
  useEffect(() => {
    const isValidDob =
      DATE_OF_BIRTH_REGEX.test(dateOfBirth) && isAgeOver18(dateOfBirth);

    registerDispatch({
      type: registerAction.setIsValidDateOfBirth,
      payload: isValidDob,
    });
  }, [
    isAgeOver18,
    dateOfBirth,
    registerAction.setIsValidDateOfBirth,
    registerDispatch,
  ]);

  // update the corresponding stepsInError state if any of the inputs are in error
  useEffect(() => {
    const areOptionalInputsInError =
      (!isValidMiddleName && middleName.length > 0) ||
      (!isValidPreferredName && preferredName.length > 0) ||
      (!isValidProfilePictureUrl && profilePictureUrl.length > 0);
    const areRequiredInputsInError =
      !isValidFirstName || !isValidLastName || !isValidDateOfBirth;
    const isStepInError = areOptionalInputsInError || areRequiredInputsInError;

    registerDispatch({
      type: registerAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
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
    registerAction.setStepsInError,
    registerDispatch,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [firstNameInputErrorText, firstNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'first name',
      inputText: firstName,
      isValidInputText: isValidFirstName,
      isInputTextFocused: isFirstNameFocused,
      regexValidationText: returnNameValidationText({
        content: firstName,
        contentKind: 'first name',
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [middleNameInputErrorText, middleNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'middle name',
      inputText: middleName,
      isValidInputText: isValidMiddleName,
      isInputTextFocused: isMiddleNameFocused,
      regexValidationText: returnNameValidationText({
        content: middleName,
        contentKind: 'middle name',
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [lastNameInputErrorText, lastNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'last name',
      inputText: lastName,
      isValidInputText: isValidLastName,
      isInputTextFocused: isLastNameFocused,
      regexValidationText: returnNameValidationText({
        content: lastName,
        contentKind: 'last name',
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [preferredNameInputErrorText, preferredNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'preferred name',
      inputText: preferredName,
      isValidInputText: isValidPreferredName,
      isInputTextFocused: isPreferredNameFocused,
      regexValidationText: returnNameValidationText({
        content: preferredName,
        contentKind: 'preferred name',
        minLength: 2,
        maxLength: 30,
      }),
    });

  const [profilePictureUrlInputErrorText, profilePictureUrlInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'profile picture url',
      inputText: profilePictureUrl,
      isValidInputText: isValidProfilePictureUrl,
      isInputTextFocused: isProfilePictureUrlFocused,
      regexValidationText: returnUrlValidationText(profilePictureUrl),
    });

  // useCallback function of isAgeOver18

  const isLegalAdultMessage =
    isAgeOver18(dateOfBirth) || dateOfBirth === ''
      ? ''
      : 'You must be 18 years or older to register.';
  const [dateOfBirthInputErrorText, dateOfBirthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'date of birth',
      inputText: dateOfBirth,
      isValidInputText: isValidDateOfBirth,
      isInputTextFocused: isDateOfBirthFocused,
      regexValidationText: `${isLegalAdultMessage} ${returnDateValidationText(
        dateOfBirth
      )}`,
    });

  const firstNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: firstNameInputErrorText,
      valid: firstNameInputValidText,
    },
    inputText: firstName,
    isValidInputText: isValidFirstName,
    label: 'First name',
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
    placeholder: 'Enter first name',
    required: true,
    withAsterisk: true,
    semanticName: 'first name',
  };

  const middleNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: middleNameInputErrorText,
      valid: middleNameInputValidText,
    },
    inputText: middleName,
    isValidInputText: isValidMiddleName,
    label: 'Middle name',
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
    placeholder: 'Enter middle name',
    semanticName: 'middle name',
  };

  const lastNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: lastNameInputErrorText,
      valid: lastNameInputValidText,
    },
    inputText: lastName,
    isValidInputText: isValidLastName,
    label: 'Last name',
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
    placeholder: 'Enter last name',
    required: true,
    withAsterisk: true,
    semanticName: 'last name',
  };

  const preferredNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: preferredNameInputErrorText,
      valid: preferredNameInputValidText,
    },
    inputText: preferredName,
    isValidInputText: isValidPreferredName,
    label: 'Preferred name',
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
    placeholder: 'Enter preferred name',
    semanticName: 'preferred name',
  };

  const profilePictureUrlTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: profilePictureUrlInputErrorText,
        valid: profilePictureUrlInputValidText,
      },
      inputText: profilePictureUrl,
      isValidInputText: isValidProfilePictureUrl,
      label: 'Profile picture url',
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
      placeholder: 'Enter profile picture url',
      semanticName: 'profile picture url',
    };

  const preferredPronounsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      description: 'Select your preferred pronouns',
      label: 'Preferred pronouns',
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
    description: {
      error: dateOfBirthInputErrorText,
      valid: dateOfBirthInputValidText,
    },
    label: 'Date of birth',
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
    placeholder: 'Enter date of birth',
    semanticName: 'date of birth',
    inputKind: 'date',
    dateKind: 'full date',
    inputText: dateOfBirth,
    isValidInputText: isValidDateOfBirth,
    required: true,
    withAsterisk: true,
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

  const [createdPreferredPronounsSelectInput] =
    returnAccessibleSelectInputElements([
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
}

export { RegisterStepPersonal };

/**
 * <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="First name"
        placeholder="Enter first name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidFirstName
            ? 'first-name-input-note-valid'
            : 'first-name-input-note-error'
        }
        aria-invalid={isValidFirstName ? false : true}
        value={firstName}
        icon={
          isValidFirstName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidFirstName && firstName !== ''}
        description={
          isValidFirstName ? firstNameInputValidText : firstNameInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setFirstName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsFirstNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsFirstNameFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={30}
        withAsterisk
        required
      />
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Middle name"
        placeholder="Enter middle name"
        autoComplete="off"
        aria-describedby={
          isValidMiddleName
            ? 'middle-name-input-note-valid'
            : 'middle-name-input-note-error'
        }
        aria-invalid={isValidMiddleName ? false : true}
        value={middleName}
        icon={
          isValidMiddleName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidMiddleName && middleName !== ''}
        description={
          isValidMiddleName
            ? middleNameInputValidText
            : middleNameInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setMiddleName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsMiddleNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsMiddleNameFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={30}
      />
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Last name"
        placeholder="Enter last name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidLastName
            ? 'last-name-input-note-valid'
            : 'last-name-input-note-error'
        }
        aria-invalid={isValidLastName ? false : true}
        value={lastName}
        icon={
          isValidLastName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidLastName && lastName !== ''}
        description={
          isValidLastName ? lastNameInputValidText : lastNameInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setLastName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsLastNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsLastNameFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={30}
        withAsterisk
        required
      />
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Preferred name"
        placeholder="Enter preferred name"
        autoComplete="off"
        aria-describedby={
          isValidPreferredName
            ? 'preferred-name-input-note-valid'
            : 'preferred-name-input-note-error'
        }
        aria-invalid={isValidPreferredName ? false : true}
        value={preferredName}
        icon={
          isValidPreferredName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPreferredName && preferredName !== ''}
        description={
          isValidPreferredName
            ? preferredNameInputValidText
            : preferredNameInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setPreferredName,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsPreferredNameFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsPreferredNameFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={30}
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Profile picture url"
        placeholder="Enter profile picture url"
        autoComplete="off"
        aria-describedby={
          isValidProfilePictureUrl
            ? 'profile-picture-url-input-note-valid'
            : 'profile-picture-url-input-note-error'
        }
        aria-invalid={isValidProfilePictureUrl ? false : true}
        value={profilePictureUrl}
        icon={
          isValidProfilePictureUrl ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidProfilePictureUrl && profilePictureUrl !== ''}
        description={
          isValidProfilePictureUrl
            ? profilePictureUrlInputValidText
            : profilePictureUrlInputErrorText
        }
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setProfilePictureUrl,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsProfilePictureUrlFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsProfilePictureUrlFocused,
            payload: false,
          });
        }}
      />

      <NativeSelect
        size="sm"
        data={PREFERRED_PRONOUNS_DATA}
        description="This is entirely optional."
        aria-describedby="Choose your preferred pronouns"
        label="Preferred pronouns"
        value={preferredPronouns}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setPreferredPronouns,
            payload: event.currentTarget.value as PreferredPronouns,
          });
        }}
      />
    </Flex>
 */
