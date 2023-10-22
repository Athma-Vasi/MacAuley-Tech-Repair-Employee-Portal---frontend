import {
  Button,
  ColorInput,
  Divider,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Space,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ResponsiveSunburst } from '@nivo/sunburst';
import React, {
  ChangeEvent,
  Fragment,
  LegacyRef,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { BiDownload, BiReset } from 'react-icons/bi';
import { TbDownload } from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { useScreenshot } from '../../../hooks/useScreenshot';
import {
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { returnThemeColors } from '../../../utils';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../../wrappers';
import { ChartArcLabel } from '../chartControls/ChartArcLabel';
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
} from '../constants';
import {
  NivoArcLabel,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import { NIVO_SUNBURST_ARC_LABEL_DATA } from './constants';
import {
  initialResponsiveSunburstChartState,
  responsiveSunburstChartAction,
  responsiveSunburstChartReducer,
} from './state';
import {
  ResponsiveSunburstChartProps,
  ResponsiveSunburstChartState,
} from './types';
import { ChartOptions } from '../chartControls/ChartOptions';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';

function ResponsiveSunburstChart({
  sunburstChartData,
  chartHeight = 350,
  chartWidth = 350,
  hideControls = false,
}: ResponsiveSunburstChartProps) {
  const {
    globalState: {
      isPrefersReducedMotion,
      width,
      themeObject,
      padding,
      height,
    },
  } = useGlobalState();

  const {
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { chartTextColor, grayColorShade, textColor },
    appThemeColors: { borderColor },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // sets initial colors based on app theme
  const modifiedResponsiveSunburstChartState: ResponsiveSunburstChartState = {
    ...initialResponsiveSunburstChartState,
    chartBorderColor: grayColorShade,
    arcLabelsTextColor: chartTextColor,
    chartTitleColor: chartTextColor,
  };

  const [responsiveSunburstChartState, responsiveSunburstChartDispatch] =
    useReducer(
      responsiveSunburstChartReducer,
      initialResponsiveSunburstChartState
    );

  const chartRef = useRef(null);

  const {
    // base
    cornerRadius, // 0px - 45px default: 0 step: 1

    // margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    // style
    chartColors, // default: 'nivo'
    inheritColorFromParent, // default: true
    chartBorderWidth, // 0px - 20px default: 1 step: 1
    chartBorderColor, // default: 'white'
    enableFillPatterns, // default: false
    fillPatterns, // default: []

    // arc labels
    enableArcLabels, // default: false
    arcLabel, // default: 'formattedValue'
    arcLabelsRadiusOffset, // 0 - 2 default: 0.5 step: 0.05
    arcLabelsSkipAngle, // 0 - 45 default: 0 step: 1
    arcLabelsTextColor, // default: 'gray'

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'
    transitionMode, // default: 'innerRadius'

    // options
    chartTitle,
    chartTitleColor,
    chartTitlePosition,
    chartTitleSize,
    isChartTitleFocused,
    isChartTitleValid,

    // screenshot
    isScreenshotFilenameFocused,
    isScreenshotFilenameValid,
    screenshotFilename,
    screenshotImageQuality,
    screenshotImageType,
  } = responsiveSunburstChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveSunburstChartDispatch({
      type: responsiveSunburstChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  const data = {
    name: 'nivo',
    color: 'hsl(198, 70%, 50%)',
    children: [
      {
        name: 'viz',
        color: 'hsl(14, 70%, 50%)',
        children: [
          {
            name: 'stack',
            color: 'hsl(10, 70%, 50%)',
            children: [
              {
                name: 'cchart',
                color: 'hsl(36, 70%, 50%)',
                loc: 109430,
              },
              {
                name: 'xAxis',
                color: 'hsl(42, 70%, 50%)',
                loc: 66581,
              },
              {
                name: 'yAxis',
                color: 'hsl(194, 70%, 50%)',
                loc: 113045,
              },
              {
                name: 'layers',
                color: 'hsl(292, 70%, 50%)',
                loc: 19213,
              },
            ],
          },
          {
            name: 'ppie',
            color: 'hsl(47, 70%, 50%)',
            children: [
              {
                name: 'chart',
                color: 'hsl(77, 70%, 50%)',
                children: [
                  {
                    name: 'pie',
                    color: 'hsl(159, 70%, 50%)',
                    children: [
                      {
                        name: 'outline',
                        color: 'hsl(179, 70%, 50%)',
                        loc: 16504,
                      },
                      {
                        name: 'slices',
                        color: 'hsl(170, 70%, 50%)',
                        loc: 152646,
                      },
                      {
                        name: 'bbox',
                        color: 'hsl(337, 70%, 50%)',
                        loc: 117492,
                      },
                    ],
                  },
                  {
                    name: 'donut',
                    color: 'hsl(263, 70%, 50%)',
                    loc: 89684,
                  },
                  {
                    name: 'gauge',
                    color: 'hsl(224, 70%, 50%)',
                    loc: 194980,
                  },
                ],
              },
              {
                name: 'legends',
                color: 'hsl(329, 70%, 50%)',
                loc: 144411,
              },
            ],
          },
        ],
      },
      {
        name: 'colors',
        color: 'hsl(230, 70%, 50%)',
        children: [
          {
            name: 'rgb',
            color: 'hsl(26, 70%, 50%)',
            loc: 190169,
          },
          {
            name: 'hsl',
            color: 'hsl(161, 70%, 50%)',
            loc: 187122,
          },
        ],
      },
      {
        name: 'utils',
        color: 'hsl(116, 70%, 50%)',
        children: [
          {
            name: 'randomize',
            color: 'hsl(350, 70%, 50%)',
            loc: 69012,
          },
          {
            name: 'resetClock',
            color: 'hsl(184, 70%, 50%)',
            loc: 140857,
          },
          {
            name: 'noop',
            color: 'hsl(77, 70%, 50%)',
            loc: 33019,
          },
          {
            name: 'tick',
            color: 'hsl(164, 70%, 50%)',
            loc: 9672,
          },
          {
            name: 'forceGC',
            color: 'hsl(12, 70%, 50%)',
            loc: 45529,
          },
          {
            name: 'stackTrace',
            color: 'hsl(283, 70%, 50%)',
            loc: 65279,
          },
          {
            name: 'dbg',
            color: 'hsl(47, 70%, 50%)',
            loc: 2728,
          },
        ],
      },
      {
        name: 'generators',
        color: 'hsl(246, 70%, 50%)',
        children: [
          {
            name: 'address',
            color: 'hsl(313, 70%, 50%)',
            loc: 188524,
          },
          {
            name: 'city',
            color: 'hsl(40, 70%, 50%)',
            loc: 90680,
          },
          {
            name: 'animal',
            color: 'hsl(338, 70%, 50%)',
            loc: 101738,
          },
          {
            name: 'movie',
            color: 'hsl(162, 70%, 50%)',
            loc: 60008,
          },
          {
            name: 'user',
            color: 'hsl(216, 70%, 50%)',
            loc: 152949,
          },
        ],
      },
      {
        name: 'set',
        color: 'hsl(325, 70%, 50%)',
        children: [
          {
            name: 'clone',
            color: 'hsl(36, 70%, 50%)',
            loc: 120803,
          },
          {
            name: 'intersect',
            color: 'hsl(1, 70%, 50%)',
            loc: 40055,
          },
          {
            name: 'merge',
            color: 'hsl(133, 70%, 50%)',
            loc: 11039,
          },
          {
            name: 'reverse',
            color: 'hsl(355, 70%, 50%)',
            loc: 94880,
          },
          {
            name: 'toArray',
            color: 'hsl(341, 70%, 50%)',
            loc: 39845,
          },
          {
            name: 'toObject',
            color: 'hsl(171, 70%, 50%)',
            loc: 135755,
          },
          {
            name: 'fromCSV',
            color: 'hsl(351, 70%, 50%)',
            loc: 33381,
          },
          {
            name: 'slice',
            color: 'hsl(225, 70%, 50%)',
            loc: 77204,
          },
          {
            name: 'append',
            color: 'hsl(10, 70%, 50%)',
            loc: 139271,
          },
          {
            name: 'prepend',
            color: 'hsl(304, 70%, 50%)',
            loc: 193360,
          },
          {
            name: 'shuffle',
            color: 'hsl(18, 70%, 50%)',
            loc: 50026,
          },
          {
            name: 'pick',
            color: 'hsl(38, 70%, 50%)',
            loc: 92063,
          },
          {
            name: 'plouc',
            color: 'hsl(359, 70%, 50%)',
            loc: 157027,
          },
        ],
      },
      {
        name: 'text',
        color: 'hsl(128, 70%, 50%)',
        children: [
          {
            name: 'trim',
            color: 'hsl(274, 70%, 50%)',
            loc: 6254,
          },
          {
            name: 'slugify',
            color: 'hsl(46, 70%, 50%)',
            loc: 154459,
          },
          {
            name: 'snakeCase',
            color: 'hsl(329, 70%, 50%)',
            loc: 150270,
          },
          {
            name: 'camelCase',
            color: 'hsl(255, 70%, 50%)',
            loc: 184872,
          },
          {
            name: 'repeat',
            color: 'hsl(246, 70%, 50%)',
            loc: 113659,
          },
          {
            name: 'padLeft',
            color: 'hsl(194, 70%, 50%)',
            loc: 127167,
          },
          {
            name: 'padRight',
            color: 'hsl(340, 70%, 50%)',
            loc: 156292,
          },
          {
            name: 'sanitize',
            color: 'hsl(284, 70%, 50%)',
            loc: 26093,
          },
          {
            name: 'ploucify',
            color: 'hsl(120, 70%, 50%)',
            loc: 136977,
          },
        ],
      },
      {
        name: 'misc',
        color: 'hsl(97, 70%, 50%)',
        children: [
          {
            name: 'greetings',
            color: 'hsl(139, 70%, 50%)',
            children: [
              {
                name: 'hey',
                color: 'hsl(159, 70%, 50%)',
                loc: 250,
              },
              {
                name: 'HOWDY',
                color: 'hsl(97, 70%, 50%)',
                loc: 192019,
              },
              {
                name: 'aloha',
                color: 'hsl(239, 70%, 50%)',
                loc: 128889,
              },
              {
                name: 'AHOY',
                color: 'hsl(286, 70%, 50%)',
                loc: 83783,
              },
            ],
          },
          {
            name: 'other',
            color: 'hsl(105, 70%, 50%)',
            loc: 38124,
          },
          {
            name: 'path',
            color: 'hsl(340, 70%, 50%)',
            children: [
              {
                name: 'pathA',
                color: 'hsl(351, 70%, 50%)',
                loc: 115851,
              },
              {
                name: 'pathB',
                color: 'hsl(308, 70%, 50%)',
                children: [
                  {
                    name: 'pathB1',
                    color: 'hsl(313, 70%, 50%)',
                    loc: 21735,
                  },
                  {
                    name: 'pathB2',
                    color: 'hsl(70, 70%, 50%)',
                    loc: 165829,
                  },
                  {
                    name: 'pathB3',
                    color: 'hsl(255, 70%, 50%)',
                    loc: 18668,
                  },
                  {
                    name: 'pathB4',
                    color: 'hsl(99, 70%, 50%)',
                    loc: 138392,
                  },
                ],
              },
              {
                name: 'pathC',
                color: 'hsl(181, 70%, 50%)',
                children: [
                  {
                    name: 'pathC1',
                    color: 'hsl(352, 70%, 50%)',
                    loc: 31373,
                  },
                  {
                    name: 'pathC2',
                    color: 'hsl(74, 70%, 50%)',
                    loc: 197409,
                  },
                  {
                    name: 'pathC3',
                    color: 'hsl(322, 70%, 50%)',
                    loc: 84921,
                  },
                  {
                    name: 'pathC4',
                    color: 'hsl(308, 70%, 50%)',
                    loc: 98552,
                  },
                  {
                    name: 'pathC5',
                    color: 'hsl(129, 70%, 50%)',
                    loc: 54136,
                  },
                  {
                    name: 'pathC6',
                    color: 'hsl(294, 70%, 50%)',
                    loc: 121730,
                  },
                  {
                    name: 'pathC7',
                    color: 'hsl(256, 70%, 50%)',
                    loc: 171956,
                  },
                  {
                    name: 'pathC8',
                    color: 'hsl(330, 70%, 50%)',
                    loc: 65751,
                  },
                  {
                    name: 'pathC9',
                    color: 'hsl(322, 70%, 50%)',
                    loc: 167416,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const displayResponsiveSunburst = (
    <ResponsiveSunburst
      data={data}
      id="name"
      value="loc"
      // base
      cornerRadius={cornerRadius}
      // margin
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      // style
      colors={{ scheme: chartColors }}
      inheritColorFromParent={inheritColorFromParent}
      borderColor={chartBorderColor}
      borderWidth={chartBorderWidth}
      defs={NIVO_CHART_PATTERN_DEFS}
      fill={[{ match: { depth: 1 }, id: 'lines' }]}
      // arc labels
      enableArcLabels={enableArcLabels}
      arcLabel={arcLabel}
      arcLabelsRadiusOffset={arcLabelsRadiusOffset}
      arcLabelsSkipAngle={arcLabelsSkipAngle}
      arcLabelsTextColor={arcLabelsTextColor}
      // interactivity
      isInteractive={true}
      onClick={(node, event) => {
        console.log({ node, event });
      }}
      // motion
      animate={enableAnimate}
      motionConfig={motionConfig}
      transitionMode={transitionMode}

      //   effects: [
      //     {
      //         on: 'hover',
      //         style: {
      //             itemTextColor: '#000'
      //         }
      //     }
      // ]
    />
  );

  if (hideControls) {
    return (
      <Group w={chartWidth} h={chartHeight}>
        {displayResponsiveSunburst}
      </Group>
    );
  }

  const [
    inheritColorFromParentAccessibleSelectedText,
    inheritColorFromParentAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Colors will not be inherited from parent',
    isSelected: inheritColorFromParent,
    selectedDescription: 'Colors will be inherited from parent',
    semanticName: 'Inherit Color From Parent',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Fill patterns will not be displayed',
    isSelected: enableFillPatterns,
    selectedDescription: 'Fill patterns will be displayed',
    semanticName: 'Enable Fill Patterns',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not animate',
    isSelected: enableAnimate,
    selectedDescription: 'Chart will animate',
    semanticName: 'Enable Animate',
    theme: 'muted',
  });

  //
  const { gray } = COLORS_SWATCHES;
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[3];

  // base
  const cornerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'corner radius',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 45,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveSunburstChartDispatch({
        type: responsiveSunburstChartAction.setCornerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: cornerRadius,
    width: sliderWidth,
  };

  // style
  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: 'Define chart colors.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveSunburstChartDispatch({
        type: responsiveSunburstChartAction.setChartColors,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const createdInheritColorFromParentSwitchInput = (
    <Switch
      aria-describedby={
        inheritColorFromParent
          ? inheritColorFromParentAccessibleSelectedText.props.id
          : inheritColorFromParentAccessibleDeselectedText.props.id
      }
      checked={inheritColorFromParent}
      description={
        inheritColorFromParent
          ? inheritColorFromParentAccessibleSelectedText
          : inheritColorFromParentAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Inherit Color From Parent
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setInheritColorFromParent,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const chartBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'chart border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setChartBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: chartBorderWidth,
      width: sliderWidth,
    };

  const createdChartBorderColorInput = (
    <ColorInput
      aria-label="chart border color"
      color={chartBorderColor}
      onChange={(color: string) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setChartBorderColor,
          payload: color,
        });
      }}
      value={chartBorderColor}
      w={sliderWidth}
    />
  );

  const createdEnableFillPatternsSwitchInput = (
    <Switch
      aria-describedby={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText.props.id
          : enableFillPatternsAccessibleDeselectedText.props.id
      }
      checked={enableFillPatterns}
      description={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText
          : enableFillPatternsAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Enable Fill Patterns
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setEnableFillPatterns,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  // motion
  const createdEnableAnimateSwitchInput = (
    <Switch
      aria-describedby={
        enableAnimate
          ? enableAnimateAccessibleSelectedText.props.id
          : enableAnimateAccessibleDeselectedText.props.id
      }
      checked={enableAnimate}
      description={
        enableAnimate
          ? enableAnimateAccessibleSelectedText
          : enableAnimateAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Enable Animate
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setEnableAnimate,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const motionConfigSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_MOTION_CONFIG_DATA,
    description: 'Define motion config.',
    disabled: !enableAnimate,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveSunburstChartDispatch({
        type: responsiveSunburstChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
    width: sliderWidth,
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      description: 'Define transition mode.',
      disabled: !enableAnimate,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.setTransitionMode,
          payload: event.currentTarget.value as NivoTransitionMode,
        });
      },
      value: transitionMode,
      width: sliderWidth,
    };

  // reset all button
  const [createdResetAllButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Reset',
      leftIcon: <BiReset />,
      semanticDescription: 'Reset all inputs to their default values',
      semanticName: 'Reset All',
      buttonOnClick: () => {
        responsiveSunburstChartDispatch({
          type: responsiveSunburstChartAction.resetChartToDefault,
          payload: modifiedResponsiveSunburstChartState,
        });
      },
    },
  ]);

  // input creators

  const [
    createdCornerRadiusSliderInput,
    // style
    createdChartBorderWidthSliderInput,
  ] = returnAccessibleSliderInputElements([
    cornerRadiusSliderInputCreatorInfo,
    // style
    chartBorderWidthSliderInputCreatorInfo,
  ]);

  const [
    // style
    createdChartColorsSelectInput,
    // motion
    createdMotionConfigSelectInput,
    createdTransitionModeSelectInput,
  ] = returnAccessibleSelectInputElements([
    // style
    chartColorsSelectInputCreatorInfo,
    // motion
    motionConfigSelectInputCreatorInfo,
    transitionModeSelectInputCreatorInfo,
  ]);

  // input display

  // base
  const displayBaseHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdCornerRadiusSliderInput}
      label="Corner Radius"
      symbol="px"
      value={cornerRadius}
    />
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayCornerRadiusSliderInput}
    </Stack>
  );

  // margin
  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedResponsiveSunburstChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsiveSunburstChartAction}
      parentChartDispatch={responsiveSunburstChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // style
  const displayStyleHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayChartColorsSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdChartColorsSelectInput}
      label="Chart Colors"
      value={chartColors}
    />
  );

  const displayInheritColorFromParentSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdInheritColorFromParentSwitchInput}
    </Group>
  );

  const displayChartBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdChartBorderWidthSliderInput}
      label="Chart Border Width"
      symbol="px"
      value={chartBorderWidth}
    />
  );

  const displayChartBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdChartBorderColorInput}
      label="Chart Border Color"
      value={chartBorderColor}
    />
  );

  const displayEnableFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayChartColorsSelectInput}
      {displayInheritColorFromParentSwitchInput}
      {displayChartBorderWidthSliderInput}
      {displayChartBorderColorInput}
      {displayEnableFillPatternsSwitchInput}
    </Stack>
  );

  // arc labels
  const displayChartArcLabel = (
    <ChartArcLabel
      arcLabel={arcLabel}
      arcLabelsRadiusOffset={arcLabelsRadiusOffset}
      arcLabelsSkipAngle={arcLabelsSkipAngle}
      arcLabelsTextColor={arcLabelsTextColor}
      borderColor={borderColor}
      enableArcLabels={enableArcLabels}
      initialChartState={modifiedResponsiveSunburstChartState}
      padding={padding}
      parentChartAction={responsiveSunburstChartAction}
      parentChartDispatch={responsiveSunburstChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // motion
  const displayMotionHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Motion
      </Title>
    </Group>
  );

  const displayEnableAnimateSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion Config"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveSunburstChartState}
      input={createdTransitionModeSelectInput}
      isInputDisabled={!enableAnimate}
      label="Transition Mode"
      value={transitionMode}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayEnableAnimateSwitchInput}
      {displayMotionConfigSelectInput}
      {displayTransitionModeSelectInput}
    </Stack>
  );

  // options
  const displayChartOptions = (
    <ChartOptions
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      initialChartState={modifiedResponsiveSunburstChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsiveSunburstChartAction}
      parentChartDispatch={responsiveSunburstChartDispatch}
      screenshotFilename={screenshotFilename}
      screenshotImageQuality={screenshotImageQuality}
      screenshotImageType={screenshotImageType}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  const displayResetAllButton = (
    <Tooltip label="Reset all inputs to their default values">
      <Group>{createdResetAllButton}</Group>
    </Tooltip>
  );

  const displayResetAll = (
    <Stack w="100%" py={padding}>
      <ChartsAndGraphsControlsStacker
        initialChartState={modifiedResponsiveSunburstChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  const sunburstControlsStack = (
    <Flex direction="column" w="100%">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayChartArcLabel}
      {displayMotionSection}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
  );

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={sunburstControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayResponsiveSunburst}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveSunburstChart };
