import {
  Anchor,
  Avatar,
  ColorSwatch,
  Flex,
  Group,
  Modal,
  Popover,
  SegmentedControl,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Fragment } from 'react';
import { TbArrowBarDown, TbCheck } from 'react-icons/tb';

import { globalAction } from '../../../context/globalProvider/state';
import { Shade } from '../../../context/globalProvider/types';
import { useGlobalState } from '../../../hooks';
import { returnAccessibleSliderInputElements } from '../../../jsxCreators';
import { ColorSchemeSwitch } from '../../colorSchemeSwitch/ColorSchemeSwitch';
import { ChartsGraphsControlsStacker } from '../../displayStatistics/responsivePieChart/utils';
import { TextWrapper } from '../../wrappers';
import { splitCamelCase } from '../../../utils';

function ProfileInfo() {
  const {
    globalState: { userDocument, themeObject, rowGap, padding },
    globalDispatch,
  } = useGlobalState();
  const {
    colorScheme,
    respectReducedMotion,
    black,
    components,
    defaultGradient,
    fontFamily,
    primaryColor,
    primaryShade,
    white,
  } = themeObject;

  const mantineTheme = useMantineTheme();

  const [openedThemeModal, { open: openThemeModal, close: closeThemeModal }] =
    useDisclosure(false);

  // color scheme switch
  const displayColorSchemeSwitch = (
    <ChartsGraphsControlsStacker
      input={<ColorSchemeSwitch />}
      label="Color scheme"
      value={colorScheme}
      symbol=""
    />
  );

  // color swatches section
  const colorSwatches = Object.entries(mantineTheme.colors).map(
    ([colorName, colorShades], idx) => {
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
    }
  );

  const displayColorSwatches = (
    <Stack w="100%">
      <Stack px={padding}>
        <Text weight={500}>Primary color</Text>
        <Text
          aria-live="polite"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #e0e0e0',
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
        style={{ borderBottom: '1px solid #e0e0e0' }}
      >
        {colorSwatches}
      </Flex>
    </Stack>
  );

  const [lightSchemeShadeSlider, darkSchemeShadeSlider] =
    returnAccessibleSliderInputElements([
      // light scheme shade slider
      {
        ariaLabel: 'Select light scheme shade',
        disabled: colorScheme === 'dark',
        kind: 'slider',
        label: (value) => (
          <Text color={colorScheme === 'light' ? 'gray.2' : 'gray.8'}>
            {value}
          </Text>
        ),
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
        width: '217px',
      },
      // dark scheme shade slider
      {
        ariaLabel: 'Select dark scheme shade',
        disabled: colorScheme === 'light',
        kind: 'slider',
        label: (value) => (
          <Text color={colorScheme === 'light' ? 'gray.2' : 'gray.4'}>
            {value}
          </Text>
        ),
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
        width: '217px',
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

  // modal section
  const displayThemeModal = (
    <Modal
      opened={openedThemeModal}
      onClose={closeThemeModal}
      size="sm"
      title={<Text size="xl">Theme options</Text>}
    >
      <Stack w="100%">
        {displayColorSchemeSwitch}
        {displayColorSwatches}
        {displayShadeSliders}
        {displayFontFamilySegmentedControl}
      </Stack>
    </Modal>
  );

  const displayThemeSelection = <Anchor onClick={openThemeModal}>Theme</Anchor>;
  const displayProfile = <Text color="dark">Profile</Text>;

  const displayAvatar = (
    <Group style={{ cursor: 'pointer' }}>
      <Avatar
        src={userDocument?.profilePictureUrl}
        alt="profile pic"
        radius={9999}
      />
      <TbArrowBarDown />
    </Group>
  );

  const profilePopover = (
    <Popover width={300} withArrow position="bottom" shadow="md">
      <Popover.Target>{displayAvatar}</Popover.Target>

      <Popover.Dropdown>
        {displayThemeSelection}
        {displayProfile}
      </Popover.Dropdown>
    </Popover>
  );

  const displayProfileInfoComponent = (
    <Fragment>
      {profilePopover}
      {displayThemeModal}
    </Fragment>
  );

  return displayProfileInfoComponent;
}

export default ProfileInfo;
