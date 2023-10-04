import {
  Anchor,
  Avatar,
  ColorSwatch,
  Flex,
  Group,
  Modal,
  Popover,
  ScrollArea,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  TbCheck,
  TbColorFilter,
  TbLogout,
  TbMoon,
  TbSun,
  TbUserCircle,
} from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../../constants/data';
import { globalAction } from '../../../context/globalProvider/state';
import { Shade } from '../../../context/globalProvider/types';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleNavLinkElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { returnThemeColors, splitCamelCase, urlBuilder } from '../../../utils';
import { ChartsGraphsControlsStacker } from '../../displayStatistics/responsivePieChart/utils';
import { AccessibleNavLinkCreatorInfo } from '../../wrappers';
import { ProfileInfo } from '../profileInfo/ProfileInfo';
import { authAction } from '../../../context/authProvider';
import { InvalidTokenError } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { LOGOUT_URL, REFRESH_URL } from '../constants';
import axios, { AxiosRequestConfig } from 'axios';
import { LogoutResponse } from '../types';
import { axiosInstance } from '../../../api/axios';
import { NotificationModal } from '../../notificationModal';

function UserAvatar() {
  const {
    globalState: { userDocument, themeObject, rowGap, padding, width },
    globalDispatch,
  } = useGlobalState();
  const {
    colorScheme,
    respectReducedMotion,
    fontFamily,
    primaryColor,
    primaryShade,
  } = themeObject;

  const {
    authState: { accessToken, isLoggedIn },
    authDispatch,
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [openedThemeModal, { open: openThemeModal, close: closeThemeModal }] =
    useDisclosure(false);
  const [
    openedProfileInfoModal,
    { open: openProfileInfoModal, close: closeProfileInfoModal },
  ] = useDisclosure(false);

  const [colorSchemeSwitchChecked, setColorSchemeSwitchChecked] =
    useState<boolean>(colorScheme === 'light');

  const [triggerLogoutSubmit, setTriggerLogoutSubmit] =
    useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessfulLogout, setIsSuccessfulLogout] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function handleLogoutSubmit() {
      setIsSubmitting(() => true);

      const url: URL = new URL('http://localhost:5500/auth/logout');
      const request: Request = new Request(url.toString(), {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: { message: string } = await response.json();

        if (!isMounted) {
          return;
        }
        if (response.status !== 200) {
          throw new Error(
            data.message ?? 'Unable to log out. Please try again.'
          );
        }

        authDispatch({
          type: authAction.setAccessToken,
          payload: '',
        });
        authDispatch({
          type: authAction.setIsLoggedIn,
          payload: false,
        });

        setIsSubmitting(() => false);
        setIsSuccessfulLogout(() => true);
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        setIsSubmitting(() => false);
        setIsSuccessfulLogout(() => false);
        setTriggerLogoutSubmit(() => false);
      }
    }

    if (triggerLogoutSubmit) {
      handleLogoutSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
    // only run logout submit when triggerLogoutSubmit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLogoutSubmit]);

  const {
    appThemeColors: { borderColor },
    generalColors: { sliderLabelColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const colorSchemeSwitch = (
    <Switch
      checked={colorSchemeSwitchChecked}
      onChange={() => {
        setColorSchemeSwitchChecked(() =>
          colorScheme === 'light' ? false : true
        );
        globalDispatch({
          type: globalAction.setColorScheme,
          payload: colorScheme === 'light' ? 'dark' : 'light',
        });
      }}
      onLabel={<TbSun size={18} />}
      offLabel={<TbMoon size={18} />}
      size="lg"
    />
  );

  // color scheme switch
  const displayColorSchemeSwitch = (
    <ChartsGraphsControlsStacker
      input={colorSchemeSwitch}
      label="Color scheme"
      value={colorScheme}
      symbol=""
    />
  );

  // color swatches section
  const colorSwatches = Object.entries(COLORS_SWATCHES)
    .filter(([colorName, colorShades]) => colorName !== 'dark')
    .map(([colorName, colorShades], idx) => {
      const shade =
        colorScheme === 'light' ? primaryShade.light : primaryShade.dark;
      const colorValue = colorShades[shade];

      const colorSwatch = (
        <ColorSwatch color={colorValue}>
          {colorName === primaryColor ? (
            <TbCheck size={20} color="white" />
          ) : null}
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
              type: globalAction.setPrimaryColor,
              payload: colorName,
            });
          }}
        >
          <Group>
            {colorSwatch}
            <Text color={colorValue}>{`${colorName
              .charAt(0)
              .toUpperCase()}${colorName.slice(1)}`}</Text>
          </Group>
        </UnstyledButton>
      );

      const displayColorSwatch = (
        <Group key={`colorName-${idx}`}>{colorSwatchButton}</Group>
      );

      return displayColorSwatch;
    });

  const displayColorSwatches = (
    <Stack w="100%">
      <Stack px={padding}>
        <Text weight={500}>Primary color</Text>
        <Text
          aria-live="polite"
          style={{
            padding: '0.5rem 0.75rem',
            border: borderColor,
            borderRadius: '4px',
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
        rowGap={rowGap}
        columnGap={rowGap}
        py={padding}
        style={{ borderBottom: borderColor }}
      >
        {colorSwatches}
      </Flex>
    </Stack>
  );

  const SLIDER_WIDTH = width < 480 ? '217px' : '350px';
  const [lightSchemeShadeSlider, darkSchemeShadeSlider] =
    returnAccessibleSliderInputElements([
      // light scheme shade slider
      {
        ariaLabel: 'Select light scheme shade',
        disabled: colorScheme === 'dark',
        kind: 'slider',
        label: (value) => <Text color={sliderLabelColor}>{value}</Text>,
        max: 9,
        min: 0,
        onChangeSlider: (value: number) => {
          globalDispatch({
            type: globalAction.setPrimaryShade,
            payload: {
              light: value as Shade,
              dark: primaryShade.dark,
            },
          });
        },
        sliderDefaultValue: primaryShade.light,
        step: 1,
        value: primaryShade.light,
        width: SLIDER_WIDTH,
      },
      // dark scheme shade slider
      {
        ariaLabel: 'Select dark scheme shade',
        disabled: colorScheme === 'light',
        kind: 'slider',
        label: (value) => <Text color={sliderLabelColor}>{value}</Text>,
        max: 9,
        min: 0,
        onChangeSlider: (value: number) => {
          globalDispatch({
            type: globalAction.setPrimaryShade,
            payload: {
              light: primaryShade.light,
              dark: value as Shade,
            },
          });
        },
        sliderDefaultValue: primaryShade.dark,
        step: 1,
        value: primaryShade.dark,
        width: SLIDER_WIDTH,
      },
    ]);

  const displayLightShadeSlider = (
    <ChartsGraphsControlsStacker
      input={lightSchemeShadeSlider}
      label="Light shade"
      value={primaryShade.light}
      symbol=""
    />
  );

  const displayDarkShadeSlider = (
    <ChartsGraphsControlsStacker
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

  // font family section
  const fontFamilySegmentedControl = (
    <SegmentedControl
      data={[
        { value: 'sans-serif', label: 'Sans' },
        { value: 'serif', label: 'Serif' },
        { value: 'Open-Dyslexic', label: 'Dyslexic' },
      ]}
      value={fontFamily}
      onChange={(value) => {
        globalDispatch({
          type: globalAction.setFontFamily,
          payload: value,
        });
      }}
      color={primaryColor}
    />
  );

  const displayFontFamilySegmentedControl = (
    <ChartsGraphsControlsStacker
      input={fontFamilySegmentedControl}
      label="Font family"
      value={
        fontFamily === 'Open-Dyslexic' ? 'Dyslexic' : splitCamelCase(fontFamily)
      }
      symbol=""
    />
  );

  const appearanceNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    ariaLabel: 'Select color scheme, primary color, and font family',
    icon: <TbColorFilter />,
    label: 'Appearance',
    onClick: openThemeModal,
  };

  const profileNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    ariaLabel: 'View profile',
    icon: <TbUserCircle />,
    label: 'Profile',
    onClick: openProfileInfoModal,
  };

  const logoutNavLinkCreatorInfo: AccessibleNavLinkCreatorInfo = {
    ariaLabel: 'Sign out',
    icon: <TbLogout />,
    label: 'Sign out',
    onClick: () => {
      setTriggerLogoutSubmit(() => true);
    },
  };

  const [
    createdAppearanceNavLink,
    createdProfileNavLink,
    createdLogoutNavLink,
  ] = returnAccessibleNavLinkElements([
    appearanceNavLinkCreatorInfo,
    profileNavLinkCreatorInfo,
    logoutNavLinkCreatorInfo,
  ]);

  const modalSize =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width * 0.8
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.8
      : 900 - 40;

  // modal section
  const displayThemeModal = (
    <Modal
      opened={openedThemeModal}
      onClose={closeThemeModal}
      size={modalSize}
      title={<Text size="xl">Appearance options</Text>}
    >
      <Stack w="100%">
        {displayColorSchemeSwitch}
        {displayColorSwatches}
        {displayShadeSliders}
        {displayFontFamilySegmentedControl}
      </Stack>
    </Modal>
  );

  const displayProfileInfoModal = (
    <Modal
      opened={openedProfileInfoModal}
      onClose={closeProfileInfoModal}
      size={modalSize}
      title={<Text size="xl">Profile information</Text>}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <ProfileInfo closeProfileInfoModal={closeProfileInfoModal} />
    </Modal>
  );

  const displayAvatar = (
    <Group style={{ cursor: 'pointer' }}>
      {accessToken && isLoggedIn ? (
        <Avatar
          src={userDocument?.profilePictureUrl}
          alt="profile pic"
          radius={9999}
        />
      ) : null}
    </Group>
  );

  const profilePopover = (
    <Popover width={300} withArrow position="bottom" shadow="md">
      <Popover.Target>{displayAvatar}</Popover.Target>

      <Popover.Dropdown>
        <Flex direction="column">
          {createdAppearanceNavLink}
          {createdProfileNavLink}
          {createdLogoutNavLink}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeProfileInfoModal]}
      opened={isSubmitting}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? 'Logging out ...' : 'Successfully logged out.',
      }}
      title={
        <Title order={4}>
          {isSuccessfulLogout ? 'Success!' : 'Submitting ...'}
        </Title>
      }
    />
  );

  const displayUserAvatarComponent = (
    <Stack>
      {displaySubmitSuccessNotificationModal}
      {profilePopover}
      {displayThemeModal}
      {displayProfileInfoModal}
    </Stack>
  );

  return displayUserAvatarComponent;
}

export { UserAvatar };
