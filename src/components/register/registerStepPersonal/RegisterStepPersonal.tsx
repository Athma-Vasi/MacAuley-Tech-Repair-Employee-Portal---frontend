import { useRef, useEffect } from 'react';
import { Flex, NativeSelect, Text, TextInput } from '@mantine/core';
import { NAME_REGEX } from '../constants';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { returnNameValidationText } from '../utils';

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
  registerDispatch,
  registerAction,
}: RegisterStepPersonalProps) {
  const errorRef = useRef<HTMLParagraphElement>(null);

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

  // used to validate preferred name on every change
  useEffect(() => {
    const isValidPreferred = NAME_REGEX.test(preferredName);

    registerDispatch({
      type: registerAction.setIsValidPreferredName,
      payload: isValidPreferred,
    });
  }, [preferredName]);

  const firstNameInputValidationText = (
    <Text
      id="first-name-note"
      className={
        isFirstNameFocused && firstName && !isValidFirstName ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText(firstName)}
    </Text>
  );

  const middleNameInputValidationText = (
    <Text
      id="middle-name-note"
      className={
        isMiddleNameFocused && middleName && !isValidMiddleName
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText(middleName)}
    </Text>
  );

  const lastNameInputValidationText = (
    <Text
      id="last-name-note"
      className={
        isLastNameFocused && lastName && !isValidLastName ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText(lastName)}
    </Text>
  );

  const preferredNameInputValidationText = (
    <Text
      id="preferred-name-note"
      className={
        isPreferredNameFocused && preferredName && !isValidPreferredName
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNameValidationText(preferredName)}
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
        w="100%"
        color="dark"
        label="First name"
        placeholder="Enter first name"
        autoComplete="off"
        aria-describedby="first-name-note"
        aria-invalid={isValidFirstName ? false : true}
        value={firstName}
        icon={
          isValidFirstName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidFirstName && firstName !== ''}
        description={firstNameInputValidationText}
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
        w="100%"
        color="dark"
        label="Middle name"
        placeholder="Enter middle name"
        autoComplete="off"
        aria-describedby="middle-name-note"
        aria-invalid={isValidMiddleName ? false : true}
        value={middleName}
        icon={
          isValidMiddleName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidMiddleName && middleName !== ''}
        description={middleNameInputValidationText}
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
        w="100%"
        color="dark"
        label="Last name"
        placeholder="Enter last name"
        autoComplete="off"
        aria-describedby="last-name-note"
        aria-invalid={isValidLastName ? false : true}
        value={lastName}
        icon={
          isValidLastName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidLastName && lastName !== ''}
        description={lastNameInputValidationText}
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
        w="100%"
        color="dark"
        label="Preferred name"
        placeholder="Enter preferred name"
        autoComplete="off"
        aria-describedby="preferred-name-note"
        aria-invalid={isValidPreferredName ? false : true}
        value={preferredName}
        icon={
          isValidPreferredName ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPreferredName && preferredName !== ''}
        description={preferredNameInputValidationText}
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

      <NativeSelect
        data={['Prefer not to say', 'He/Him', 'She/Her', 'They/Them', 'Other']}
        description="This is entirely optional."
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
