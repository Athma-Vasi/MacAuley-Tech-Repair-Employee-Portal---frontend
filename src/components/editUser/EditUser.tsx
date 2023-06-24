import {
  Flex,
  TextInput,
  Title,
  Text,
  Checkbox,
  Group,
  Radio,
  Button,
  Center,
} from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';
import { editUserAction, editUserReducer, initialEditUserState } from './state';
import { EditUserProps, EditUserResponse } from './types';
import { COLORS, EMAIL_REGEX, USERNAME_REGEX } from '../../constants';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { PATCH_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider';
import { Success } from '../success';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { AxiosRequestConfig } from 'axios';
import { useGlobalState } from '../../hooks/useGlobalState';

function EditUser({ user, closeModalCallback }: EditUserProps) {
  const [editUserState, editUserDispatch] = useReducer(
    editUserReducer,
    initialEditUserState
  );
  const {
    id,
    username,
    isValidUsername,
    isUsernameFocused,
    email,
    isValidEmail,
    isEmailFocused,
    active,
    roles,
    errorMessage,
    isSubmitting,
    isSuccessful,
  } = editUserState;

  const { authState, authDispatch } = useAuth();
  const { accessToken } = authState;
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  const usernameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // set initial values for edit user form on first render
  useEffect(() => {
    editUserDispatch({
      type: editUserAction.setAll,
      payload: {
        id: user._id,
        username: user.username,
        isValidUsername: true,
        isUsernameFocused: false,

        email: user.email,
        isValidEmail: true,
        isEmailFocused: false,

        active: user.active,
        roles: user.roles,
        errorMessage: '',
        isSubmitting: false,
        isSuccessful: false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set focus on username input on first render
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // clear error message on username or password change
  useEffect(() => {
    editUserDispatch({
      type: editUserAction.setErrorMessage,
      payload: '',
    });
  }, [username, email, active, roles]);

  // check username is valid on every keystroke
  useEffect(() => {
    const usernameTest = USERNAME_REGEX.test(username);
    editUserDispatch({
      type: editUserAction.setIsValidUsername,
      payload: usernameTest,
    });
  }, [username]);

  // check email is valid on every keystroke
  useEffect(() => {
    const emailTest = EMAIL_REGEX.test(email);
    editUserDispatch({
      type: editUserAction.setIsValidEmail,
      payload: emailTest,
    });
  }, [email]);

  async function handleEditUserFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    editUserDispatch({
      type: editUserAction.setIsSubmitting,
      payload: true,
    });

    const controller = new AbortController();
    const { signal } = controller;

    const editUserObj = {
      id,
      username,
      email,
      active,
      roles,
    };

    const axiosRequestConfig: AxiosRequestConfig = {
      method: 'patch',
      signal,
      url: PATCH_URL,
      data: editUserObj,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axiosInstance<EditUserResponse>(
        axiosRequestConfig
      );
      const { status } = response;

      if (status === 200) {
        editUserDispatch({
          type: editUserAction.setIsSuccessful,
          payload: true,
        });
      }
    } catch (error: any) {
      // if there is no response object, it means the server is down
      editUserDispatch({
        type: editUserAction.setIsSuccessful,
        payload: false,
      });

      if (!error?.response) {
        editUserDispatch({
          type: editUserAction.setErrorMessage,
          payload: 'Network Error',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'Network Error',
        });
      }
      // if there is a response object, it means the server is up
      else if (error.response) {
        const {
          response: {
            data: { message },
          },
        } = error;

        editUserDispatch({
          type: editUserAction.setErrorMessage,
          payload: message,
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: message,
        });
      }
      // catch all errors
      else {
        editUserDispatch({
          type: editUserAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });
      }
    } finally {
      editUserDispatch({
        type: editUserAction.setIsSubmitting,
        payload: false,
      });

      controller.abort();
    }
  }

  const displayError = (
    <CustomError
      message={errorMessage}
      isError={errorMessage ? true : false}
      ref={errorRef}
      closeErrorCallback={closeModalCallback}
    />
  );

  const displayEmailValidationText = (
    <Text
      id="emailNote"
      className={isEmailFocused && email && !isValidEmail ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnEmailRegexValidationText(email)}
    </Text>
  );

  const displayUsernameValidationText = (
    <Text
      id="usernameNote"
      className={
        isUsernameFocused && username && !isValidUsername ? '' : 'offscreen'
      }
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUsernameRegexValidationText(username)}
    </Text>
  );

  const displaySubmitting = <Loading dataDirection="submit" />;

  const displaySuccess = (
    <Success
      closeSuccessCallback={closeModalCallback}
      message="User successfully updated."
      isSuccessful
    />
  );

  useEffect(() => {
    console.log({ editUserState });
  }, [editUserState]);

  const { darkTextColor, lightTextColor, buttonTextColor, buttonOutlineColor } =
    COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const buttonOutline = colorScheme === 'dark' ? buttonOutlineColor : '';
  const buttonText = colorScheme === 'dark' ? buttonTextColor : '';
  const buttonBackground = colorScheme === 'dark' ? 'transparent' : '';

  const displayEditUserForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="flex-start"
      w="100%"
      rowGap="lg"
      p="xs"
    >
      <Title
        order={3}
        color={buttonTextColor}
        style={{ letterSpacing: '0.10rem' }}
      >
        Edit user
      </Title>

      <form onSubmit={handleEditUserFormSubmit} style={{ width: '100%' }}>
        <Flex
          direction="column"
          align="center"
          justify="space-between"
          rowGap="lg"
          w="100%"
        >
          <TextInput
            w="100%"
            color={textColor}
            label="Username"
            placeholder={`${username}`}
            autoComplete="off"
            aria-describedby="usernameNote"
            aria-invalid={isValidUsername ? 'false' : 'true'}
            icon={
              isValidUsername ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            value={username}
            error={!isValidUsername}
            description={displayUsernameValidationText}
            onChange={(event) =>
              editUserDispatch({
                type: editUserAction.setUsername,
                payload: event.currentTarget.value,
              })
            }
            onFocus={() =>
              editUserDispatch({
                type: editUserAction.setIsUsernameFocused,
                payload: true,
              })
            }
            onBlur={() =>
              editUserDispatch({
                type: editUserAction.setIsUsernameFocused,
                payload: false,
              })
            }
            ref={usernameRef}
            withAsterisk
            required
          />

          <TextInput
            w="100%"
            color={textColor}
            label="Email"
            placeholder={`${email}`}
            autoComplete="off"
            aria-describedby="emailNote"
            aria-invalid={isValidEmail ? 'false' : 'true'}
            icon={
              isValidEmail ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            value={email}
            description={displayEmailValidationText}
            error={!isValidEmail}
            onChange={(event) =>
              editUserDispatch({
                type: editUserAction.setEmail,
                payload: event.currentTarget.value,
              })
            }
            onFocus={() =>
              editUserDispatch({
                type: editUserAction.setIsEmailFocused,
                payload: true,
              })
            }
            onBlur={() =>
              editUserDispatch({
                type: editUserAction.setIsEmailFocused,
                payload: false,
              })
            }
            withAsterisk
            required
          />

          <Checkbox.Group
            w="100%"
            color={textColor}
            defaultValue={['Employee']}
            value={roles}
            onChange={(event) => {
              editUserDispatch({
                type: editUserAction.setRoles,
                payload: event as ('Employee' | 'Admin' | 'Manager')[],
              });
            }}
            label="Select roles for the User"
            description="Determines access to user actions in the application"
            withAsterisk
          >
            <Group mt="xs">
              <Checkbox value="Employee" label="Employee" />
              <Checkbox value="Admin" label="Admin" />
              <Checkbox value="Manager" label="Manager" />
            </Group>
          </Checkbox.Group>

          <Radio.Group
            w="100%"
            color={textColor}
            label="Select user's status"
            description="Determines whether user can log in to the application"
            value={active ? 'active' : 'inactive'}
            onChange={(event) => {
              editUserDispatch({
                type: editUserAction.setActive,
                payload: event === 'active' ? true : false,
              });
            }}
            withAsterisk
            required
          >
            <Group mt="xs" w="100%" color={textColor}>
              <Radio value={'active'} label="Active" />
              <Radio value={'inactive'} label="Inactive" />
            </Group>
          </Radio.Group>

          <Flex w="100%" align="center" justify="flex-end" columnGap="lg">
            <Button
              type="submit"
              disabled={!isValidUsername || !isValidEmail}
              style={{
                backgroundColor: buttonBackground,
                color: isValidUsername && isValidEmail ? buttonText : textColor,
                border:
                  isValidUsername && isValidEmail
                    ? buttonOutline
                    : `1px solid ${textColor}`,
              }}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="outline"
              color="red"
              onClick={closeModalCallback}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );

  return (
    <Flex w="100%">
      {isSubmitting
        ? displaySubmitting
        : errorMessage
        ? displayError
        : isSuccessful
        ? displaySuccess
        : displayEditUserForm}
    </Flex>
  );
}

export { EditUser };
