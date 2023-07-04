import { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import {
  faCheck,
  faInfoCircle,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  NativeSelect,
  PasswordInput,
  Stepper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import {
  CITY_REGEX,
  COLORS,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../constants';
import { REGISTER_URL } from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import {
  returnCityValidationText,
  returnEmailRegexValidationText,
  returnNameValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { returnPasswordRegexValidationText } from './utils';
import { axiosInstance } from '../../api/axios';
import { RegisterResponse } from './types';
import { screenReaderPasswordSpecialCharacters } from '../../domElements';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { Success } from '../success';
import { StepperWrapper } from './stepperWrapper/StepperWrapper';

function Register() {
  const [
    {
      email,
      isValidEmail,
      isEmailFocused,

      username,
      isValidUsername,
      isUsernameFocused,

      password,
      isValidPassword,
      isPasswordFocused,

      confirmPassword,
      isValidConfirmPassword,
      isConfirmPasswordFocused,

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

      address,
      contactNumber,
      jobPosition,
      department,
      emergencyContact,
      startDate,

      currentStepperPosition,
      isError,
      errorMessage,
      isSuccessful,
      successMessage,
      isLoading,
      loadingMessage,
      isSubmitting,
      submitMessage,
    },
    registerDispatch,
  ] = useReducer(registerReducer, initialRegisterState);
  const {
    addressLine,
    isValidAddressLine,
    isAddressLineFocused,
    city,
    isValidCity,
    isCityFocused,
    province,
    state,
    country,
    postalCode,
  } = address;
  const {
    contactNumber: emergencyContactNumber,
    fullName: emergencyContactFullName,
  } = emergencyContact;

  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // sets focus on email input on first render
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // used to validate email on every change
  useEffect(() => {
    const isValidMail = EMAIL_REGEX.test(email);

    registerDispatch({
      type: registerAction.setIsValidEmail,
      payload: isValidMail,
    });
  }, [email]);

  // used to validate username on every change
  useEffect(() => {
    const isValidUsr = USERNAME_REGEX.test(username);

    registerDispatch({
      type: registerAction.setIsValidUsername,
      payload: isValidUsr,
    });
  }, [username]);

  // used to validate password on every change and confirm password on every change
  useEffect(() => {
    const isValidPwd = PASSWORD_REGEX.test(password);

    registerDispatch({
      type: registerAction.setIsValidPassword,
      payload: isValidPwd,
    });

    const matchPassword = password === confirmPassword;
    registerDispatch({
      type: registerAction.setIsValidConfirmPassword,
      payload: matchPassword,
    });
  }, [password, confirmPassword]);

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

  // used to validate city on every change
  useEffect(() => {
    const isValidPlace = CITY_REGEX.test(city);

    registerDispatch({
      type: registerAction.setIsValidCity,
      payload: isValidPlace,
    });
  }, [city]);

  // removes error message after every change in email, username, password, confirm password or (first, middle, last)Name
  useEffect(() => {
    registerDispatch({
      type: registerAction.setErrorMessage,
      payload: '',
    });
  }, [
    email,
    username,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
  ]);

  const displayError = (
    <CustomError
      ref={errorRef}
      message={errorMessage}
      link={{
        address: '/login',
        text: 'Back to login',
      }}
      isError={errorMessage ? true : false}
    />
  );

  const displaySuccess = (
    <Success
      message="You have successfully registered!"
      link={{ address: '/login', text: 'Click here to login' }}
      isSuccessful={isSuccessful}
    />
  );

  const displayLoading = <Loading dataDirection="load" />;

  const emailValidationText = (
    <Text
      id="email-note"
      className={isEmailFocused && email && !isValidEmail ? '' : 'offscreen'}
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnEmailRegexValidationText(email)}
    </Text>
  );

  const usernameInputValidationText = (
    <Text
      id="username-note"
      className={
        isUsernameFocused && username && !isValidUsername ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUsernameRegexValidationText(username)}
    </Text>
  );

  const passwordRegexValidationText =
    returnPasswordRegexValidationText(password);

  const passwordInputValidationText = (
    <Text
      id="password-note"
      className={
        isPasswordFocused && password && !isValidPassword ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {passwordRegexValidationText}
      {passwordRegexValidationText.includes('special')
        ? screenReaderPasswordSpecialCharacters
        : ''}
    </Text>
  );

  const confirmPasswordInputValidationText = (
    <Text
      id="confirm-password-note"
      className={
        isConfirmPasswordFocused && confirmPassword && !isValidConfirmPassword
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {isValidPassword && !isValidConfirmPassword
        ? 'Passwords do not match'
        : ''}
    </Text>
  );

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

  const cityInputValidationText = (
    <Text
      id="city-note"
      className={isCityFocused && city && !isValidCity ? '' : 'offscreen'}
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {returnCityValidationText(city)}
    </Text>
  );

  async function handleRegisterFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // ~sanity~ safety check
    const testEmail = EMAIL_REGEX.test(email);
    const testUsername = USERNAME_REGEX.test(username);
    const testPassword = PASSWORD_REGEX.test(password);
    const testConfirmPassword = password === confirmPassword;
    const testFirstName = NAME_REGEX.test(firstName);
    const testMiddleName = NAME_REGEX.test(middleName);
    const testLastName = NAME_REGEX.test(lastName);
    const testCity = CITY_REGEX.test(city);

    // if any field is invalid, display error message and return
    if (
      !testEmail ||
      !testUsername ||
      !testPassword ||
      !testConfirmPassword ||
      !testFirstName ||
      !testMiddleName ||
      !testLastName ||
      !testCity
    ) {
      registerDispatch({
        type: registerAction.setErrorMessage,
        payload: 'Please fill out all fields correctly',
      });
      return;
    }

    const newUserObj = {
      email,
      username,
      password,
    };

    const controller = new AbortController();
    const { signal } = controller;

    try {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const axiosConfig = {
        method: 'post',
        signal,
        url: REGISTER_URL,
        data: newUserObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axiosInstance<RegisterResponse>(axiosConfig);

      const { status } = response;

      if (status === 201) {
        registerDispatch({
          type: registerAction.setIsSuccessful,
          payload: true,
        });
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: '',
        });
        return;
      }
    } catch (error: any) {
      if (!error.response) {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: 'Network error',
        });
      } else {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: error.response.data.message,
        });
      }

      errorRef.current?.focus();
    } finally {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: false,
      });

      controller.abort();
    }
  }

  const { buttonTextColor } = COLORS;

  const displayRegisterForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
      rowGap="lg"
      w="100%"
      h="100%"
    >
      <StepperWrapper
        currentStepperPosition={currentStepperPosition}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
      <form onSubmit={handleRegisterFormSubmit} style={{ width: '100%' }}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="lg"
          w="100%"
        >
          <Title
            order={3}
            color={buttonTextColor}
            style={{ letterSpacing: '0.10rem' }}
          >
            Register
          </Title>
          <TextInput
            w="100%"
            color="dark"
            label="Email"
            placeholder="Enter email address"
            autoComplete="off"
            aria-describedby="email-note"
            aria-invalid={isValidEmail ? false : true}
            icon={
              isValidEmail ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            value={email}
            error={!isValidEmail && email !== ''}
            description={emailValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setEmail,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsEmailFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsEmailFocused,
                payload: false,
              });
            }}
            withAsterisk
            required
          />
          <TextInput
            w="100%"
            color="dark"
            label="Username"
            placeholder="Enter username"
            autoComplete="off"
            aria-describedby="username-note"
            aria-invalid={isValidUsername ? false : true}
            value={username}
            icon={
              isValidUsername ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidUsername && username !== ''}
            description={usernameInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setUsername,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsUsernameFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsUsernameFocused,
                payload: false,
              });
            }}
            minLength={3}
            maxLength={20}
            withAsterisk
            required
          />
          <PasswordInput
            w="100%"
            color="dark"
            label="Password"
            placeholder="Enter password"
            aria-describedby="password-note"
            aria-invalid={isValidPassword ? false : true}
            value={password}
            icon={
              isValidPassword ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidPassword && password !== ''}
            description={passwordInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setPassword,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsPasswordFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsPasswordFocused,
                payload: false,
              });
            }}
            minLength={8}
            maxLength={32}
            withAsterisk
            required
          />
          <PasswordInput
            w="100%"
            color="dark"
            label="Confirm Password"
            placeholder="Confirm password"
            aria-describedby="confirm-password-note"
            aria-invalid={isValidConfirmPassword ? false : true}
            value={confirmPassword}
            icon={
              isValidPassword && isValidConfirmPassword ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidConfirmPassword && confirmPassword !== ''}
            description={confirmPasswordInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setConfirmPassword,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsConfirmPasswordFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsConfirmPasswordFocused,
                payload: false,
              });
            }}
            minLength={8}
            maxLength={32}
            withAsterisk
            required
          />

          {/* second step */}
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
            data={[
              'Prefer not to say',
              'He/Him',
              'She/Her',
              'They/Them',
              'Other',
            ]}
            description="This is optional."
            label="Preferred pronouns"
            value={preferredPronouns}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setPreferredPronouns,
                payload: event.currentTarget.value,
              });
            }}
          />

          {/* third step : address*/}
          <TextInput
            w="100%"
            color="dark"
            label="Address line 1"
            placeholder="Enter address line 1"
            autoComplete="off"
            // aria-describedby="address-line-1-note"
            // aria-invalid={isValidAddressLine1 ? false : true}
            value={addressLine1}
            // icon={
            //   isValidAddressLine1 ? (
            //     <FontAwesomeIcon icon={faCheck} color="green" />
            //   ) : null
            // }
            // error={!isValidAddressLine1 && addressLine1 !== ''}
            // description={addressLine1InputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setAddressLine1,
                payload: event.currentTarget.value,
              });
            }}
            minLength={2}
            maxLength={30}
            withAsterisk
            required
          />

          {/* stepper nav buttons */}
          <Group position="center" mt="xl">
            <Button
              variant="default"
              disabled={currentStepperPosition === 1}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep > 0 ? currentStep - 1 : currentStep + 1,
                });
              }}
            >
              Back
            </Button>
            <Button
              disabled={currentStepperPosition === 4}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep < 4 ? currentStep + 1 : currentStep - 1,
                });
              }}
            >
              Next step
            </Button>
          </Group>

          {/* register button */}
          <Flex w="100%" justify="flex-end">
            <Button
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.click();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
              tabIndex={0}
              type="submit"
              disabled={
                !isValidEmail ||
                !isValidUsername ||
                !isValidPassword ||
                !isValidConfirmPassword
                  ? true
                  : false
              }
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </form>

      {/*  */}
      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Flex w={375} p="sm">
      {errorMessage
        ? displayError
        : isSubmitting
        ? displayLoading
        : isSuccessful
        ? displaySuccess
        : displayRegisterForm}
    </Flex>
  );
}

export { Register };
