import {
  Avatar,
  ColorSwatch,
  Group,
  Modal,
  Popover,
  ScrollArea,
  Stack,
  Switch,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  TbCheck,
  TbColorFilter,
  TbLogout,
  TbMoon,
  TbSun,
  TbUserCircle,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import localforage from "localforage";
import {
  COLORS_SWATCHES,
  FETCH_REQUEST_TIMEOUT,
  USER_RESOURCE_ROUTE_PATHS,
} from "../../../constants/data";
import { authAction } from "../../../context/authProvider";
import {
  type GlobalAction,
  globalAction,
} from "../../../context/globalProvider/actions";
import type { Shade } from "../../../context/globalProvider/types";
import { useAuth, useGlobalState } from "../../../hooks";
import { DocumentFieldUpdateOperation, UserDocument } from "../../../types";
import {
  fetchRequestPATCHSafe,
  fetchSafe,
  logState,
  returnThemeColors,
  splitCamelCase,
} from "../../../utils";
import { AccessibleNavLink } from "../../accessibleInputs/AccessibleNavLink";
import { AccessibleSegmentedControl } from "../../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleSliderInput } from "../../accessibleInputs/AccessibleSliderInput";
import { ChartsAndGraphsControlsStacker } from "../../charts/utils";
import { NotificationModal } from "../../notificationModal";
import { LOGOUT_URL } from "../constants";
import { UserInfo } from "../userInfo/UserInfo";
import { UserAvatarAction, userAvatarAction } from "./actions";
import { FONT_FAMILY_DATA } from "./constants";
import { userAvatarReducer } from "./reducers";
import { returnInitialUserAvatarState } from "./state";

function UserAvatar() {
  const {
    globalState: { themeObject, width },
    globalDispatch,
  } = useGlobalState();
  const { colorScheme, fontFamily, primaryColor, primaryShade } = themeObject;

  const [userAvatarState, userAvatarDispatch] = useReducer(
    userAvatarReducer,
    returnInitialUserAvatarState(colorScheme),
  );

  const {
    colorSchemeSwitchChecked,
    errorMessage,
    isError,
    isSubmitting,
    isSuccessful,
    prefersReducedMotionSwitchChecked,
    triggerLogoutSubmit,
    triggerPrefersReducedMotionFormSubmit,
  } = userAvatarState;

  const { authState, authDispatch } = useAuth();
  const {
    accessToken,
    decodedToken: { sessionId, userInfo: { roles, userId, username } },
    isLoggedIn,
    userDocument,
  } = authState;

  console.group("UserAvatar: authState");
  console.log("accessToken", accessToken);
  console.log("isLoggedIn", isLoggedIn);
  console.log("userDocument", userDocument);
  console.groupEnd();

  const navigateFn = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [openedThemeModal, { open: openThemeModal, close: closeThemeModal }] =
    useDisclosure(false);

  const [
    openedUserInfoModal,
    { open: openUserInfoModal, close: closeUserInfoModal },
  ] = useDisclosure(false);

  const [
    openedSubmitFormModal,
    { open: openSubmitFormModal, close: closeSubmitFormModal },
  ] = useDisclosure(
    false,
  );
  const [openedErrorModal, { open: openErrorModal, close: closeErrorModal }] =
    useDisclosure(false);

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort("Previous request cancelled");
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handleLogoutSubmit() {
      userAvatarDispatch({
        action: userAvatarAction.setIsSubmitting,
        payload: true,
      });

      const url = LOGOUT_URL;

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: "",
        signal: fetchAbortController.signal,
      };

      try {
        const responseResult = await fetchSafe(url, requestInit);

        if (!isComponentMounted) {
          return;
        }

        if (responseResult.err) {
          showBoundary(responseResult.val.data);
          return;
        }

        authDispatch({
          action: authAction.setAccessToken,
          payload: "",
        });
        authDispatch({
          action: authAction.setDecodedToken,
          payload: Object.create(null),
        });
        authDispatch({
          action: authAction.setIsLoggedIn,
          payload: false,
        });
        authDispatch({
          action: authAction.setUserDocument,
          payload: Object.create(null),
        });

        userAvatarDispatch({
          action: userAvatarAction.setIsSuccessful,
          payload: true,
        });
        userAvatarDispatch({
          action: userAvatarAction.setIsSubmitting,
          payload: false,
        });
      } catch (error: unknown) {
        if (!isComponentMounted || fetchAbortController?.signal.aborted) {
          return;
        }
        showBoundary(error);
      } finally {
        navigateFn("/");
        localforage.clear();
      }
    }

    if (triggerLogoutSubmit) {
      handleLogoutSubmit();
    }

    const timerId = setTimeout(() => {
      fetchAbortController?.abort("Request timed out");
    }, FETCH_REQUEST_TIMEOUT);

    return () => {
      clearTimeout(timerId);
      fetchAbortController?.abort("Component unmounted");
      isComponentMountedRef.current = false;
    };
  }, [triggerLogoutSubmit]);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort("Previous request cancelled");
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handlePrefersReducedMotionSubmit() {
      const documentUpdate: DocumentFieldUpdateOperation<UserDocument> = {
        updateKind: "field",
        updateOperator: "$set",
        fields: { isPrefersReducedMotion: prefersReducedMotionSwitchChecked },
      };
      try {
        const prefersReducedMotionResult = await fetchRequestPATCHSafe<
          UserDocument,
          UserAvatarAction["setIsSubmitting"],
          UserAvatarAction["setSubmittingMessage"]
        >({
          accessToken,
          authAction,
          authDispatch,
          closeSubmitFormModal,
          customUrl: `http://localhost:5500/api/v1/user/${userId}`,
          fetchAbortController,
          isComponentMounted,
          navigateFn,
          openSubmitFormModal,
          parentDispatch: userAvatarDispatch as any,
          requestBody: JSON.stringify({ documentUpdate }),
          roles,
          roleResourceRoutePaths: USER_RESOURCE_ROUTE_PATHS,
          setIsSubmittingAction: userAvatarAction.setIsSubmitting,
          setSubmittingMessageAction: userAvatarAction.setSubmittingMessage,
          submitMessage: "Updating prefers reduced motion setting...",
          triggerFormSubmitAction:
            userAvatarAction.triggerPrefersReducedMotionFormSubmit,
        });

        if (prefersReducedMotionResult.err) {
          showBoundary(prefersReducedMotionResult.val.data);
          return;
        }

        const unwrappedResult = prefersReducedMotionResult.safeUnwrap();

        if (unwrappedResult.kind === "error") {
          userAvatarDispatch({
            action: userAvatarAction.setIsError,
            payload: true,
          });
          userAvatarDispatch({
            action: userAvatarAction.setErrorMessage,
            payload: unwrappedResult.message ?? "Unknown error occurred",
          });

          openErrorModal();
          return;
        }

        const serverResponse = unwrappedResult.data;
        if (serverResponse === undefined) {
          userAvatarDispatch({
            action: userAvatarAction.setIsError,
            payload: true,
          });
          userAvatarDispatch({
            action: userAvatarAction.setErrorMessage,
            payload: "Network error",
          });

          openErrorModal();
          return;
        }
      } catch (error: unknown) {
        if (!isComponentMounted || fetchAbortController.signal.aborted) {
          return;
        }
        showBoundary(error);
      }
    }

    if (triggerPrefersReducedMotionFormSubmit) {
      handlePrefersReducedMotionSubmit();
    }

    const timerId = setTimeout(() => {
      fetchAbortController?.abort("Request timed out");
    }, FETCH_REQUEST_TIMEOUT);

    return () => {
      clearTimeout(timerId);
      fetchAbortController?.abort("Component unmounted");
      isComponentMountedRef.current = false;
    };
  }, [triggerPrefersReducedMotionFormSubmit]);

  const {
    appThemeColors: { borderColor },
    generalColors: {
      sliderLabelColor,
      grayColorShade,
      themeColorShade,
      iconGray,
    },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const colorSchemeSwitch = (
    <Switch
      checked={colorSchemeSwitchChecked}
      onChange={() => {
        userAvatarDispatch({
          action: userAvatarAction.setColorSchemeSwitchChecked,
          payload: colorScheme === "dark",
        });
        globalDispatch({
          action: globalAction.setColorScheme,
          payload: colorScheme === "light" ? "dark" : "light",
        });
      }}
      onLabel={<TbSun size={18} />}
      offLabel={<TbMoon size={18} />}
      size="lg"
    />
  );

  // color scheme switch
  const displayColorSchemeSwitch = (
    <ChartsAndGraphsControlsStacker
      input={colorSchemeSwitch}
      label="Color scheme"
      value={colorScheme}
      symbol=""
    />
  );

  // color swatches section
  const colorSwatches = Object.entries(COLORS_SWATCHES)
    .filter(([colorName, colorShades]) => colorName !== "dark")
    .map(([colorName, colorShades], idx) => {
      const shade = colorScheme === "light"
        ? primaryShade.light
        : primaryShade.dark;
      const colorValue = colorShades[shade];

      const colorSwatch = (
        <ColorSwatch color={colorValue} key={`colorName-${idx.toString()}`}>
          {colorName === primaryColor
            ? <TbCheck size={20} color="white" />
            : null}
        </ColorSwatch>
      );

      const colorSwatchButton = (
        <UnstyledButton
          variant="outline"
          style={{
            color: colorValue,
            borderRadius: 4,
            border: `1px solid ${colorValue}`,
          }}
          color={colorValue}
          p="xs"
          aria-label={`Select ${colorName} color. ${
            colorName === primaryColor
              ? `${colorName} is currently selected`
              : `${colorName} is not currently selected`
          }`}
          onClick={() => {
            globalDispatch({
              action: globalAction.setPrimaryColor,
              payload: colorName,
            });
          }}
          key={`colorName-${idx.toString()}`}
        >
          <Group>
            {colorSwatch}
            <Text color={colorValue}>
              {`${
                colorName
                  .charAt(0)
                  .toUpperCase()
              }${colorName.slice(1)}`}
            </Text>
          </Group>
        </UnstyledButton>
      );

      const displayColorSwatch = (
        <Group key={`colorName-${idx.toString()}`}>{colorSwatchButton}</Group>
      );

      return displayColorSwatch;
    });

  const displayColorSwatches = (
    <Stack style={{ borderBottom: borderColor }} pb="md">
      <Stack>
        <Title order={5}>Primary color</Title>
        <Text
          aria-live="polite"
          style={{
            padding: "0.5rem 0.75rem",
            border: borderColor,
            borderRadius: "4px",
          }}
          w="fit-content"
        >
          {`${primaryColor.charAt(0).toUpperCase()}${primaryColor.slice(1)}`}
        </Text>
      </Stack>
      <Group spacing="xs">{colorSwatches}</Group>
    </Stack>
  );

  const lightSchemeShadeSliderInput = (
    <AccessibleSliderInput<
      GlobalAction["setPrimaryShadeLight"],
      Shade
    >
      attributes={{
        disabled: colorScheme === "dark",
        label: "Select light scheme shade",
        max: 9,
        min: 0,
        name: "lightSchemeShadeSlider",
        parentDispatch: globalDispatch,
        step: 1,
        validValueAction: globalAction.setPrimaryShadeLight,
        value: primaryShade.light,
      }}
    />
  );

  const darkSchemeShadeSliderInput = (
    <AccessibleSliderInput<
      GlobalAction["setPrimaryShadeDark"],
      Shade
    >
      attributes={{
        disabled: colorScheme === "light",
        label: "Select dark scheme shade",
        max: 9,
        min: 0,
        name: "darkSchemeShadeSlider",
        parentDispatch: globalDispatch,
        step: 1,
        validValueAction: globalAction.setPrimaryShadeDark,
        value: primaryShade.dark,
      }}
    />
  );

  const displayLightShadeSlider = (
    <ChartsAndGraphsControlsStacker
      input={lightSchemeShadeSliderInput}
      label="Light shade"
      value={primaryShade.light}
      symbol=""
    />
  );

  const displayDarkShadeSlider = (
    <ChartsAndGraphsControlsStacker
      input={darkSchemeShadeSliderInput}
      label="Dark shade"
      value={primaryShade.dark}
      symbol=""
    />
  );

  const displayShadeSliders = (
    <Stack spacing="xs" w="100%">
      {displayLightShadeSlider}
      {displayDarkShadeSlider}
    </Stack>
  );

  // const colorSchemeSwitchInput = (
  //   <AccessibleSwitchInput
  //     attributes={{
  //       checked: colorScheme === "light",
  //       label: "Select color scheme",
  //       name: "colorSchemeSwitch",
  //       parentDispatch: globalDispatch,
  //       validValueAction: globalAction.setColorScheme,
  //       invalidValueAction: globalAction.setPageInError,
  //       preventErrorStateWhenOff: true,
  //       value: colorScheme === "dark",
  //       offLabel: <TbMoon size={18} />,
  //       onLabel: <TbSun size={18} />,
  //     }}
  //   />
  // );

  const reducedMotionSwitch = (
    <Switch
      checked={prefersReducedMotionSwitchChecked}
      onChange={() => {
        userAvatarDispatch({
          action: userAvatarAction.setPrefersReducedMotionSwitchChecked,
          payload: !prefersReducedMotionSwitchChecked,
        });

        userAvatarDispatch({
          action: userAvatarAction.triggerPrefersReducedMotionFormSubmit,
          payload: true,
        });
      }}
      onLabel={<Text color="#f5f5f5">On</Text>}
      offLabel={<Text color={grayColorShade}>Off</Text>}
      size="lg"
    />
  );

  const displayReducedMotionSwitch = (
    <ChartsAndGraphsControlsStacker
      input={reducedMotionSwitch}
      label="Reduced motion"
      value={prefersReducedMotionSwitchChecked ? "On" : "Off"}
      symbol=""
    />
  );

  // const fontFamilySegmentedControl = (
  //   <SegmentedControl
  //     data={[
  //       { value: "sans-serif", label: "Sans" },
  //       { value: "serif", label: "Serif" },
  //       { value: "Open-Dyslexic", label: "Dyslexic" },
  //     ]}
  //     value={fontFamily}
  //     onChange={(value) => {
  //       globalDispatch({
  //         action: globalAction.setFontFamily,
  //         payload: value,
  //       });
  //     }}
  //     color={primaryColor}
  //   />
  // );

  const fontFamilySegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: FONT_FAMILY_DATA,
        name: "fontFamily",
        parentDispatch: globalDispatch,
        validValueAction: globalAction.setFontFamily,
        value: fontFamily,
        defaultValue: "sans-serif",
      }}
    />
  );

  const displayFontFamilySegmentedControl = (
    <ChartsAndGraphsControlsStacker
      input={fontFamilySegmentedControl}
      label="Font family"
      value={fontFamily === "Open-Dyslexic"
        ? "Dyslexic"
        : splitCamelCase(fontFamily)}
      symbol=""
    />
  );

  const appearanceNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Select color scheme, primary color, and font family",
        icon: <TbColorFilter color={themeColorShade} />,
        name: "appearance",
        onClick: () => openThemeModal(),
      }}
    />
  );

  const profileNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "View profile information",
        icon: <TbUserCircle color={themeColorShade} />,
        name: "profile",
        onClick: () => openUserInfoModal(),
      }}
    />
  );

  const logoutNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Sign out",
        icon: <TbLogout color={themeColorShade} />,
        name: "logout",
        onClick: () => {
          userAvatarDispatch({
            action: userAvatarAction.setTriggerLogoutSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const modalSize = width < 480 // for iPhone 5/SE
    ? 375 - 20
    : width < 768 // for iPhone 6/7/8
    ? width * 0.8
    // at 768vw the navbar appears at width of 225px
    : width < 1024
    ? (width - 225) * 0.8
    // at >= 1200vw the navbar width is 300px
    : width < 1200
    ? (width - 300) * 0.8
    : 900 - 40;

  // modal section
  const appearanceModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedThemeModal}
      onClose={() => closeThemeModal()}
      size={375}
      title={<Text size="xl">Appearance options</Text>}
    >
      <Stack>
        {displayColorSchemeSwitch}
        {displayColorSwatches}
        {displayShadeSliders}
        {displayReducedMotionSwitch}
        {displayFontFamilySegmentedControl}
      </Stack>
    </Modal>
  );

  const userInfoModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedUserInfoModal}
      onClose={() => {
        // userAvatarDispatch({
        //   action: userAvatarAction.setIsProfileNavLinkActive,
        //   payload: false,
        // });
        closeUserInfoModal();
      }}
      scrollAreaComponent={ScrollArea.Autosize}
      size={modalSize}
      title={<Text size="xl">Profile information</Text>}
    >
      <UserInfo closeUserInfoModal={closeUserInfoModal} />
    </Modal>
  );

  const avatar = (
    <Group style={{ cursor: "pointer" }}>
      {accessToken && isLoggedIn
        ? (
          <Avatar
            src={userDocument?.profilePictureUrl as string}
            alt="profile pic"
            radius={9999}
          />
        )
        : null}
    </Group>
  );

  const profilePopover = (
    <Stack>
      <Popover width={225} withArrow position="bottom-end" shadow="md">
        <Popover.Target>{avatar}</Popover.Target>

        <Popover.Dropdown>
          {appearanceNavLink}
          {profileNavLink}
          {logoutNavLink}
        </Popover.Dropdown>
      </Popover>
    </Stack>
  );

  const submitSuccessModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitFormModal, closeUserInfoModal]}
      opened={isSubmitting}
      notificationProps={{ isLoading: isSubmitting }}
      title={
        <Title order={4}>{isSuccessful ? "Success!" : "Submitting..."}</Title>
      }
    />
  );

  const displayUserAvatarComponent = (
    <Stack>
      {submitSuccessModal}
      {profilePopover}
      {appearanceModal}
      {userInfoModal}
    </Stack>
  );

  logState({
    state: userAvatarState,
    groupLabel: "user avatar state in UserAvatar",
  });

  return displayUserAvatarComponent;
}

export { UserAvatar };
