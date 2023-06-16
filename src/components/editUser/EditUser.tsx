import {
  Alert,
  Flex,
  TextInput,
  Title,
  Text,
  Checkbox,
  Group,
  Radio,
  Button,
  Loader,
} from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';
import { editUserAction, editUserReducer, initialEditUserState } from './state';
import { EditUserProps, EditUserResponse } from './types';
import { EMAIL_REGEX, USERNAME_REGEX } from '../../constants';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { PATCH_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider';

function EditUser({ user }: EditUserProps) {
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

  const usernameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // set initial values
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

  // allows error message to be read by screen reader instead of removing it from the DOM
  const displayError = (
    <Alert
      title="Warning!"
      color="yellow"
      className={errorMessage ? '' : 'offscreen'}
    >
      <Text ref={errorRef} aria-live="assertive">
        {errorMessage}
      </Text>
    </Alert>
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

  async function handleEditUserFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    editUserDispatch({
      type: editUserAction.setIsSubmitting,
      payload: true,
    });

    try {
      const { accessToken } = authState;
      const axiosConfig = {
        method: 'patch',
        url: PATCH_URL,
        data: {
          id,
          username,
          email,
          active,
          roles,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };

      const response = await axiosInstance<EditUserResponse>(axiosConfig);
      const { status } = response;

      if (status === 200) {
        editUserDispatch({
          type: editUserAction.setIsSuccessful,
          payload: true,
        });

        authDispatch({
          type: authAction.setAllAuthState,
          payload: {
            ...authState,
            username,
            roles,
            errorMessage: '',
          },
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
    }
  }

  const displaySubmitting = (
    <Alert
      title="Loading..."
      color="violet"
      className={isSubmitting ? '' : 'offscreen'}
    >
      <Loader color="violet" />
    </Alert>
  );

  const displaySuccess = (
    <Alert
      title="Success!"
      color="green"
      className={isSuccessful ? '' : 'offscreen'}
    >
      <Text aria-live="assertive">User successfully updated.</Text>
    </Alert>
  );

  useEffect(() => {
    console.log({ editUserState });
  }, [editUserState]);

  return (
    <Flex direction="column" align="center" justify="center">
      <Title>Edit User</Title>

      <form onSubmit={handleEditUserFormSubmit}>
        <TextInput
          label="Username"
          placeholder={`${username}`}
          autoComplete="off"
          aria-describedby="usernameNote"
          aria-invalid={isValidUsername ? 'false' : 'true'}
          icon={
            isValidEmail ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : null
          }
          value={username}
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
          defaultValue={['Employee']}
          value={roles}
          onChange={(event) => {
            editUserDispatch({
              type: editUserAction.setRoles,
              payload: event as ('Employee' | 'Admin' | 'Manager')[],
            });
          }}
          label="Select roles for the User"
          description="Determines access to user actions in the application."
          withAsterisk
        >
          <Group mt="xs">
            <Checkbox value="Employee" label="Employee" />
            <Checkbox value="Admin" label="Admin" />
            <Checkbox value="Manager" label="Manager" />
          </Group>
        </Checkbox.Group>

        <Radio.Group
          label="Select user's status"
          description="Determines whether user can log in the application"
          value={active ? 'active' : 'inactive'}
          onChange={(event) => {
            editUserDispatch({
              type: editUserAction.setActive,
              payload: event === 'active' ? true : false,
            });
          }}
        >
          <Group mt="xs">
            <Radio value={'active'} label="Active" />
            <Radio value={'inactive'} label="Inactive" />
          </Group>
        </Radio.Group>

        <Button type="submit">Update</Button>
      </form>

      {isSubmitting ? displaySubmitting : null}
      {isSuccessful ? displaySuccess : null}
    </Flex>
  );
}

export { EditUser };
