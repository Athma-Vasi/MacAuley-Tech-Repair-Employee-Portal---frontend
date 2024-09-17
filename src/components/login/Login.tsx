import { Flex, Group, Stack, Text, Title } from "@mantine/core";
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
import { AccessiblePasswordInput } from "../accessibleInputs/AccessiblePasswordInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { NotificationModal } from "../notificationModal";
import { loginAction } from "./actions";
import { LOGIN_ROUTE_PATHS, returnLoginStepperPages } from "./constants";
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
    globalState: { width, themeObject },
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
        dispatch: loginDispatch,
        fetchAbortController,
        isComponentMounted,
        isSubmittingAction: loginAction.setIsSubmitting,
        isSuccessfulAction: loginAction.setIsSuccessful,
        roleResourceRoutePaths: LOGIN_ROUTE_PATHS,
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

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting benefit! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">ExpenseClaim submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const loginStepperPages = returnLoginStepperPages();

  const usernameTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: loginAction.setPageInError,
        name: "username",
        parentDispatch: loginDispatch,
        required: true,
        stepperPages: loginStepperPages,
        value: username,
        validValueAction: loginAction.setUsername,
      }}
    />
  );

  const passwordTextInput = (
    <AccessiblePasswordInput
      attributes={{
        invalidValueAction: loginAction.setPageInError,
        name: "password",
        parentDispatch: loginDispatch,
        required: true,
        stepperPages: loginStepperPages,
        value: password,
        validValueAction: loginAction.setPassword,
      }}
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
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const displayTitle = (
    <Stack>
      <Flex align="center" justify="center">
        <Title order={3} color="dark" style={{ letterSpacing: "0.30rem" }}>
          MACAULEY
        </Title>
        <Title order={3} color="red">
          TECH
        </Title>
        <Title order={3} color="green">
          REPAIR
        </Title>
      </Flex>

      <Text size="lg" color="dark">
        Employee Portal
      </Text>
    </Stack>
  );

  const displayInputs = (
    <Stack w="100%">
      {usernameTextInput}
      {passwordTextInput}
    </Stack>
  );

  const displayLoginButton = (
    <Group w="100%" position="right">
      {loginButton}
    </Group>
  );

  const displayLinkToRegister = (
    <Flex align="center" justify="center" columnGap="sm" w="100%">
      <Text color="dark">Don&apos;t have an account?</Text>
      <Text color={themeColorShade}>
        <Link to="/register">Create one!</Link>
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

  const displayLoginComponent = (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w={width < 480 ? 350 : width <= 1024 ? 480 : 640}
    >
      {displaySubmitSuccessNotificationModal}
      {displayTitle}
      {displayInputs}
      {displayLoginButton}
      {displayLinkToRegister}
    </Flex>
  );

  return (
    <Flex
      bg={backgroundColor}
      w="100%"
      h="100vh"
      align="center"
      justify="center"
    >
      {displayLoginComponent}
    </Flex>
  );
}

export default Login;
