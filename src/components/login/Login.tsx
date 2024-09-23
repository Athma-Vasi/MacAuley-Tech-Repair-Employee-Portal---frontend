import {
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../constants/data";
import { authAction } from "../../context/authProvider";
import { useGlobalState } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import {
  decodeJWTSafe,
  fetchRequestPOSTSafe,
  logState,
  returnThemeColors,
} from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { NotificationModal } from "../notificationModal";
import { useStyles } from "../styles";
import { loginAction } from "./actions";
import { loginReducer } from "./reducers";
import { initialLoginState } from "./state";

function Login() {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState,
  );
  const {
    isLoading,
    isSubmitting,
    isSuccessful,
    password,
    triggerFormSubmit,
    username,
  } = loginState;

  const { authDispatch } = useAuth();
  const {
    globalState: { themeObject },
  } = useGlobalState();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitFormModal,
    {
      open: openSubmitFormModal,
      close: closeSubmitFormModal,
    },
  ] = useDisclosure(false);

  const { classes } = useStyles({});

  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    logState({
      state: loginState,
      groupLabel: "loginState",
    });
  }, [loginState]);

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    async function loginFormSubmit() {
      const schema = { username, password };

      const loginResult = await fetchRequestPOSTSafe({
        closeSubmitFormModal,
        customUrl: "http://localhost:5500/auth/login",
        dispatch: loginDispatch,
        fetchAbortController,
        isComponentMounted,
        isSubmittingAction: loginAction.setIsSubmitting,
        isSuccessfulAction: loginAction.setIsSuccessful,
        openSubmitFormModal,
        roles: ["Employee"], // public route, no roles required
        schema,
        triggerFormSubmitAction: loginAction.setTriggerFormSubmit,
      });

      if (loginResult.err) {
        showBoundary(loginResult.val.data);
        return;
      }

      const safeBox = loginResult.safeUnwrap();
      if (safeBox.kind === "error") {
        showBoundary(new Error("Error logging in"));
        return;
      }

      const serverResponse = safeBox.data;
      if (serverResponse === undefined) {
        showBoundary(new Error("Network error"));
        return;
      }

      const { accessToken } = serverResponse;

      const decodedTokenResult = await decodeJWTSafe(accessToken);
      if (decodedTokenResult.err) {
        showBoundary(decodedTokenResult.val.data);
        return;
      }

      const decodedToken = decodedTokenResult.safeUnwrap().data;
      if (decodedToken === undefined) {
        showBoundary(new Error("Invalid token"));
        return;
      }

      authDispatch({
        action: authAction.setAccessToken,
        payload: accessToken,
      });
      authDispatch({
        action: authAction.setDecodedToken,
        payload: decodedToken,
      });
      authDispatch({
        action: authAction.setUserDocument,
        payload: serverResponse.data[0],
      });

      navigate("/home");
    }

    if (triggerFormSubmit) {
      loginFormSubmit();
    }

    return () => {
      isComponentMounted = false;
      fetchAbortController.abort();
    };
  }, [triggerFormSubmit]);

  const usernameTextInput = (
    <TextInput
      label="Username"
      placeholder="Enter your username"
      value={username}
      onChange={(event) => {
        loginDispatch({
          action: loginAction.setUsername,
          payload: event.currentTarget.value,
        });
      }}
      required
    />
  );

  const passwordTextInput = (
    <PasswordInput
      label="Password"
      placeholder="Enter your password"
      value={password}
      onChange={(event) => {
        loginDispatch({
          action: loginAction.setPassword,
          payload: event.currentTarget.value,
        });
      }}
      required
    />
  );

  const loginButton = (
    <AccessibleButton
      attributes={{
        kind: "submit",
        name: "login",
        onClick: () => {
          loginDispatch({
            action: loginAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const {
    generalColors: { themeColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const displayTitle = (
    <Stack>
      <Center>
        <Title order={3} color="dark" style={{ letterSpacing: "0.30rem" }}>
          MACAULEY
        </Title>
        <Title order={3} color="red">
          TECH
        </Title>
        <Title order={3} color="green">
          REPAIR
        </Title>
      </Center>

      <Center>
        <Text size="lg" color="dark">
          Employee Portal
        </Text>
      </Center>
    </Stack>
  );

  const displayInputs = (
    <Stack>
      {usernameTextInput}
      {passwordTextInput}
    </Stack>
  );

  const displayLoginButton = (
    <Center>
      {loginButton}
    </Center>
  );

  const displayLinkToRegister = (
    <Flex align="center" justify="center" columnGap="sm">
      <Text color="dark">Don&apos;t have an account?</Text>
      <Text>
        <Link to="/register" style={{ color: themeColorShade }}>
          Create one!
        </Link>
      </Text>
    </Flex>
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitFormModal]}
      opened={openedSubmitFormModal}
      notificationProps={{
        loading: isSubmitting,
        text: "Login successful!",
      }}
      title={<Title order={4}>Submitting ...</Title>}
      withCloseButton={false}
    />
  );

  const login = (
    <div className={classes.wrapper}>
      <Stack>
        {displaySubmitSuccessNotificationModal}
        {displayTitle}
        {displayInputs}
        {displayLoginButton}
        {displayLinkToRegister}
      </Stack>
    </div>
  );

  return login;
}

export default Login;
