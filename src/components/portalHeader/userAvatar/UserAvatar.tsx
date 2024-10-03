import {
  Avatar,
  ColorSwatch,
  Flex,
  Group,
  Modal,
  Popover,
  ScrollArea,
  SegmentedControl,
  Slider,
  Stack,
  Switch,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReducer } from "react";
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

import { COLORS_SWATCHES } from "../../../constants/data";
import { globalAction } from "../../../context/globalProvider/actions";
import type { Shade } from "../../../context/globalProvider/types";
import { useAuth, useGlobalState } from "../../../hooks";
import { logState, returnThemeColors, splitCamelCase } from "../../../utils";
import { AccessibleNavLink } from "../../accessibleInputs/AccessibleNavLink";
import { ChartsAndGraphsControlsStacker } from "../../charts/utils";
import { NotificationModal } from "../../notificationModal";
import { UserInfo } from "../userInfo/UserInfo";
import {
  initialUserAvatarState,
  userAvatarAction,
  userAvatarReducer,
} from "./state";

function UserAvatar() {
  const {
    globalState: { themeObject, width },
    globalDispatch,
  } = useGlobalState();

  const [userAvatarState, userAvatarDispatch] = useReducer(
    userAvatarReducer,
    initialUserAvatarState,
  );

  const {
    authState: { accessToken, isLoggedIn, userDocument, refreshToken },
    authDispatch,
  } = useAuth();

  console.group("UserAvatar: authState");
  console.log("accessToken", accessToken);
  console.log("isLoggedIn", isLoggedIn);
  console.log("refreshToken", refreshToken);
  console.log("userDocument", userDocument);
  console.groupEnd();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [openedThemeModal, { open: openThemeModal, close: closeThemeModal }] =
    useDisclosure(false);

  const [
    openedUserInfoModal,
    { open: openUserInfoModal, close: closeUserInfoModal },
  ] = useDisclosure(false);

  const {
    colorSchemeSwitchChecked,
    isAppearanceNavLinkActive,
    isLogoutNavLinkActive,
    isProfileNavLinkActive,
    isSubmitting,
    isSuccessful,
    prefersReducedMotionSwitchChecked,
    submitMessage,
    successMessage,
    triggerLogoutSubmit,
    triggerPrefersReducedMotionFormSubmit,
  } = userAvatarState;

  const { colorScheme, fontFamily, primaryColor, primaryShade } = themeObject;

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   async function handleLogoutSubmit() {
  //     userAvatarDispatch({
  //       type: userAvatarAction.setIsSubmitting,
  //       payload: true,
  //     });
  //     userAvatarDispatch({
  //       type: userAvatarAction.setSubmitMessage,
  //       payload: "Please wait while we securely log you out.",
  //     });

  //     const url: URL = new URL("http://localhost:5500/auth/logout");

  //     const requestInit: RequestInit = {
  //       body: JSON.stringify({ sessionId }),
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       mode: "cors",
  //     };

  //     try {
  //       // const response: Response = await wrappedFetch({
  //       //   isMounted,
  //       //   requestInit,
  //       //   signal: controller.signal,
  //       //   url,
  //       // });
  //       const response: Response = await fetch(url, requestInit);

  //       const data: { message: string } = await response.json();

  //       if (!isMounted) {
  //         return;
  //       }
  //       if (response.status !== 200) {
  //         throw new Error(data.message);
  //       }

  //       authDispatch({
  //         type: authAction.setIsLoggedIn,
  //         payload: false,
  //       });

  //       userAvatarDispatch({
  //         type: userAvatarAction.setIsSuccessful,
  //         payload: true,
  //       });
  //       userAvatarDispatch({
  //         type: userAvatarAction.setSuccessMessage,
  //         payload: "Successfully logged out!",
  //       });

  //       navigate("/");
  //     } catch (error: any) {
  //       if (!isMounted || error.name === "AbortError") {
  //         return;
  //       }

  //       const errorMessage = error instanceof InvalidTokenError
  //         ? "Invalid token. Please login again."
  //         : !error.response
  //         ? "Network error. Please try again."
  //         : error?.message ?? "Unknown error occurred. Please try again.";

  //       globalDispatch({
  //         type: globalAction.setErrorState,
  //         payload: {
  //           isError: true,
  //           errorMessage,
  //           errorCallback: () => {
  //             navigate("/");

  //             globalDispatch({
  //               type: globalAction.setErrorState,
  //               payload: {
  //                 isError: false,
  //                 errorMessage: "",
  //                 errorCallback: () => {},
  //               },
  //             });
  //           },
  //         },
  //       });

  //       showBoundary(error);
  //     } finally {
  //       userAvatarDispatch({
  //         type: userAvatarAction.setIsSubmitting,
  //         payload: false,
  //       });
  //       userAvatarDispatch({
  //         type: userAvatarAction.setSubmitMessage,
  //         payload: "",
  //       });
  //       userAvatarDispatch({
  //         type: userAvatarAction.setTriggerLogoutSubmit,
  //         payload: false,
  //       });

  //       // flush local forage
  //       localforage.clear();
  //     }
  //   }

  //   if (triggerLogoutSubmit) {
  //     handleLogoutSubmit();
  //   }

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  //   // only run logout submit when triggerLogoutSubmit changes
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [triggerLogoutSubmit]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   async function updatePrefersReducedMotion() {
  //     const url: URL = urlBuilder({
  //       path: "/user",
  //     });

  //     const body = JSON.stringify({
  //       userFields: {
  //         isPrefersReducedMotion: prefersReducedMotionSwitchChecked,
  //       },
  //     });

  //     const requestInit: RequestInit = {
  //       body,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "PATCH",
  //     };

  //     try {
  //       const response: Response = await wrappedFetch({
  //         isMounted,
  //         requestInit,
  //         signal: controller.signal,
  //         url,
  //       });

  //       const data: { message: string } = await response.json();

  //       if (!isMounted) {
  //         return;
  //       }
  //       if (response.status !== 200) {
  //         throw new Error(data.message);
  //       }

  //       globalDispatch({
  //         type: globalAction.setPrefersReducedMotion,
  //         payload: prefersReducedMotionSwitchChecked,
  //       });
  //     } catch (error: any) {
  //       if (!isMounted || error.name === "AbortError") {
  //         return;
  //       }

  //       const errorMessage = error instanceof InvalidTokenError
  //         ? "Invalid token. Please login again."
  //         : !error.response
  //         ? "Network error. Please try again."
  //         : error?.message ?? "Unknown error occurred. Please try again.";

  //       globalDispatch({
  //         type: globalAction.setErrorState,
  //         payload: {
  //           isError: true,
  //           errorMessage,
  //           errorCallback: () => {
  //             navigate("/");

  //             globalDispatch({
  //               type: globalAction.setErrorState,
  //               payload: {
  //                 isError: false,
  //                 errorMessage: "",
  //                 errorCallback: () => {},
  //               },
  //             });
  //           },
  //         },
  //       });

  //       showBoundary(error);
  //     } finally {
  //       userAvatarDispatch({
  //         type: userAvatarAction.triggerPrefersReducedMotionFormSubmit,
  //         payload: false,
  //       });
  //     }
  //   }

  //   if (triggerPrefersReducedMotionFormSubmit) {
  //     updatePrefersReducedMotion();
  //   }
  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  //   // only trigger when isAccessTokenExpired and prefersReducedMotionSwitchChecked changes
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [triggerPrefersReducedMotionFormSubmit]);

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
          type: userAvatarAction.setColorSchemeSwitchChecked,
          payload: colorScheme === "light",
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
    <Stack w="100%">
      <Stack>
        <Text weight={500}>Primary color</Text>
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
      <Flex
        w="100%"
        align="center"
        justify="center"
        wrap="wrap"
        style={{ borderBottom: borderColor }}
      >
        {colorSwatches}
      </Flex>
    </Stack>
  );

  const lightSchemeShadeSlider = (
    <Slider
      aria-label="Select light scheme shade"
      defaultValue={primaryShade.light}
      disabled={colorScheme === "dark"}
      label={(value) => <Text color={sliderLabelColor}>{value}</Text>}
      max={9}
      min={0}
      onChange={(value: number) => {
        globalDispatch({
          action: globalAction.setPrimaryShade,
          payload: {
            light: value as Shade,
            dark: primaryShade.dark,
          },
        });
      }}
      step={1}
      value={primaryShade.light}
    />
  );

  const darkSchemeShadeSlider = (
    <Slider
      aria-label="Select dark scheme shade"
      defaultValue={primaryShade.dark}
      disabled={colorScheme === "light"}
      label={(value) => <Text color={sliderLabelColor}>{value}</Text>}
      max={9}
      min={0}
      onChange={(value: number) => {
        globalDispatch({
          action: globalAction.setPrimaryShade,
          payload: {
            light: primaryShade.light,
            dark: value as Shade,
          },
        });
      }}
      step={1}
      value={primaryShade.dark}
    />
  );

  const displayLightShadeSlider = (
    <ChartsAndGraphsControlsStacker
      input={lightSchemeShadeSlider}
      label="Light shade"
      value={primaryShade.light}
      symbol=""
    />
  );

  const displayDarkShadeSlider = (
    <ChartsAndGraphsControlsStacker
      input={darkSchemeShadeSlider}
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

  const reducedMotionSwitch = (
    <Switch
      checked={prefersReducedMotionSwitchChecked}
      onChange={() => {
        userAvatarDispatch({
          type: userAvatarAction.setPrefersReducedMotionSwitchChecked,
          payload: !prefersReducedMotionSwitchChecked,
        });

        userAvatarDispatch({
          type: userAvatarAction.triggerPrefersReducedMotionFormSubmit,
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

  // font family section
  const fontFamilySegmentedControl = (
    <SegmentedControl
      data={[
        { value: "sans-serif", label: "Sans" },
        { value: "serif", label: "Serif" },
        { value: "Open-Dyslexic", label: "Dyslexic" },
      ]}
      value={fontFamily}
      onChange={(value) => {
        globalDispatch({
          action: globalAction.setFontFamily,
          payload: value,
        });
      }}
      color={primaryColor}
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
        icon: <TbColorFilter />,
        name: "appearance",
        onClick: () => {
          userAvatarDispatch({
            type: userAvatarAction.setIsAppearanceNavLinkActive,
            payload: !isAppearanceNavLinkActive,
          });
          openThemeModal();
        },
      }}
    />
  );

  const profileNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "View profile information",
        icon: <TbUserCircle />,
        name: "profile",
        onClick: () => {
          userAvatarDispatch({
            type: userAvatarAction.setIsProfileNavLinkActive,
            payload: !isProfileNavLinkActive,
          });
          openUserInfoModal();
        },
      }}
    />
  );

  const logoutNavLink = (
    <AccessibleNavLink
      attributes={{
        description: "Sign out",
        icon: <TbLogout />,
        name: "logout",
        onClick: () => {
          userAvatarDispatch({
            type: userAvatarAction.setTriggerLogoutSubmit,
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
  const displayThemeModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedThemeModal}
      onClose={() => {
        userAvatarDispatch({
          type: userAvatarAction.setIsAppearanceNavLinkActive,
          payload: false,
        });
        closeThemeModal();
      }}
      size={modalSize}
      title={<Text size="xl">Appearance options</Text>}
    >
      <Stack w="100%">
        {displayColorSchemeSwitch}
        {displayColorSwatches}
        {displayShadeSliders}
        {displayReducedMotionSwitch}
        {displayFontFamilySegmentedControl}
      </Stack>
    </Modal>
  );

  const displayUserInfoModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedUserInfoModal}
      onClose={() => {
        userAvatarDispatch({
          type: userAvatarAction.setIsProfileNavLinkActive,
          payload: false,
        });
        closeUserInfoModal();
      }}
      size={modalSize}
      scrollAreaComponent={ScrollArea.Autosize}
      title={<Text size="xl">Profile information</Text>}
    >
      <UserInfo closeUserInfoModal={closeUserInfoModal} />
    </Modal>
  );

  const displayAvatar = (
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
    <Popover width={300} withArrow position="bottom" shadow="md">
      <Popover.Target>{displayAvatar}</Popover.Target>

      <Popover.Dropdown>
        <Flex direction="column">
          {appearanceNavLink}
          {profileNavLink}
          {logoutNavLink}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeUserInfoModal]}
      opened={isSubmitting}
      notificationProps={{
        isLoading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? "Success!" : "Submitting..."}</Title>
      }
    />
  );

  const displayUserAvatarComponent = (
    <Stack>
      {displaySubmitSuccessNotificationModal}
      {profilePopover}
      {displayThemeModal}
      {displayUserInfoModal}
    </Stack>
  );

  logState({
    state: userAvatarState,
    groupLabel: "user avatar state in UserAvatar",
  });

  return displayUserAvatarComponent;
}

export { UserAvatar };
