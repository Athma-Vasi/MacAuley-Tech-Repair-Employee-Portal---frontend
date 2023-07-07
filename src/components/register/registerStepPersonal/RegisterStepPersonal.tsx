import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, NativeSelect, Text, TextInput } from '@mantine/core';
import { useEffect } from 'react';

import {
  returnNameValidationText,
  returnUrlValidationText,
} from '../../../utils';
import { NAME_REGEX, URL_REGEX } from '../constants';
import type { RegisterStepPersonalProps } from './types';

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
  }, [firstName]);

  // used to validate middle name on every change
  useEffect(() => {
    const isValidMiddle = NAME_REGEX.test(middleName);

    registerDispatch({
      type: registerAction.setIsValidMiddleName,
      payload: isValidMiddle,
    });
  }, [middleName]);

  // used to validate last name on every change
  useEffect(() => {
    const isValidLast = NAME_REGEX.test(lastName);

    registerDispatch({
      type: registerAction.setIsValidLastName,
      payload: isValidLast,
    });
  }, [lastName]);

  // used to validate profile picture url on every change
  useEffect(() => {
    const isValidPfp = URL_REGEX.test(profilePictureUrl);

    registerDispatch({
      type: registerAction.setIsValidProfilePictureUrl,
      payload: isValidPfp,
    });
  }, [profilePictureUrl]);

  // used to validate preferred name on every change
  useEffect(() => {
    const isValidPreferred = NAME_REGEX.test(preferredName);

    registerDispatch({
      type: registerAction.setIsValidPreferredName,
      payload: isValidPreferred,
    });
  }, [preferredName]);

  const firstNameInputErrorText = (
    <Text
      id="first-name-note-error"
      style={{
        display:
          isFirstNameFocused && firstName && !isValidFirstName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText({
        content: firstName,
        contentKind: 'first name',
        minLength: 2,
        maxLength: 30,
      })}
    </Text>
  );

  const firstNameInputValidText = (
    <Text
      id="first-name-note-valid"
      style={{
        display:
          isFirstNameFocused && firstName && isValidFirstName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> First name is valid
    </Text>
  );

  const middleNameInputErrorText = (
    <Text
      id="middle-name-note-error"
      style={{
        display:
          isMiddleNameFocused && middleName && !isValidMiddleName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText({
        content: middleName,
        contentKind: 'middle name',
        minLength: 2,
        maxLength: 30,
      })}
    </Text>
  );

  const middleNameInputValidText = (
    <Text
      id="middle-name-note-valid"
      style={{
        display:
          isMiddleNameFocused && middleName && isValidMiddleName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Middle name is valid
    </Text>
  );

  const lastNameInputErrorText = (
    <Text
      id="last-name-note-error"
      style={{
        display:
          isLastNameFocused && lastName && !isValidLastName ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText({
        content: lastName,
        contentKind: 'last name',
        minLength: 2,
        maxLength: 30,
      })}
    </Text>
  );

  const lastNameInputValidText = (
    <Text
      id="last-name-note-valid"
      style={{
        display:
          isLastNameFocused && lastName && isValidLastName ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Last name is valid
    </Text>
  );

  const preferredNameInputErrorText = (
    <Text
      id="preferred-name-note-error"
      style={{
        display:
          isPreferredNameFocused && preferredName && !isValidPreferredName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText({
        content: preferredName,
        contentKind: 'preferred name',
        minLength: 2,
        maxLength: 30,
      })}
    </Text>
  );

  const preferredNameInputValidText = (
    <Text
      id="preferred-name-note-valid"
      style={{
        display:
          isPreferredNameFocused && preferredName && isValidPreferredName
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Preferred name is valid
    </Text>
  );

  const profilePictureUrlInputErrorText = (
    <Text
      id="profile-picture-url-note-error"
      style={{
        display:
          isProfilePictureUrlFocused &&
          profilePictureUrl &&
          !isValidProfilePictureUrl
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUrlValidationText(profilePictureUrl)}
    </Text>
  );

  const profilePictureUrlInputValidText = (
    <Text
      id="profile-picture-url-note-valid"
      style={{
        display:
          isProfilePictureUrlFocused &&
          profilePictureUrl &&
          isValidProfilePictureUrl
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Profile picture URL is valid
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
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="First name"
        placeholder="Enter first name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidFirstName ? 'first-name-note-valid' : 'first-name-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Middle name"
        placeholder="Enter middle name"
        autoComplete="off"
        aria-describedby={
          isValidMiddleName
            ? 'middle-name-note-valid'
            : 'middle-name-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Last name"
        placeholder="Enter last name"
        autoComplete="off"
        aria-required
        aria-describedby={
          isValidLastName ? 'last-name-note-valid' : 'last-name-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Preferred name"
        placeholder="Enter preferred name"
        autoComplete="off"
        aria-describedby={
          isValidPreferredName
            ? 'preferred-name-note-valid'
            : 'preferred-name-note-error'
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

      {/* profile pic */}
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Profile picture url"
        placeholder="Enter profile picture url"
        autoComplete="off"
        aria-describedby={
          isValidProfilePictureUrl
            ? 'profile-picture-url-note-valid'
            : 'profile-picture-url-note-error'
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
        size="md"
        data={['Prefer not to say', 'He/Him', 'She/Her', 'They/Them', 'Other']}
        description="This is entirely optional."
        aria-describedby="Choose your preferred pronouns"
        label="Preferred pronouns"
        value={preferredPronouns}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setPreferredPronouns,
            payload: event.currentTarget.value,
          });
        }}
      />
    </Flex>
  );
}

export { RegisterStepPersonal };
