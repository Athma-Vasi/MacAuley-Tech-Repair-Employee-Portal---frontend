import {
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
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
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
import {
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
} from '../constants';
import {
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  initialResponsiveRadialBarChartState,
  responsiveRadialBarChartAction,
  responsiveRadialBarChartReducer,
} from './state';
import { ResponsiveRadialBarChartState } from './types';
import { BiReset } from 'react-icons/bi';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartLegend } from '../chartControls/ChartLegend';
import { ChartOptions } from '../chartControls/ChartOptions';
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';

function ResponsiveRadialBarChart() {
  const {
    globalState: { isPrefersReducedMotion, themeObject, width, padding },
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

  // sets initial colors based on color scheme
  const modifiedResponsiveRadialBarChartState: ResponsiveRadialBarChartState = {
    ...initialResponsiveRadialBarChartState,
    ringBorderColor: chartTextColor,
    tracksColor: grayColorShade,
    labelsTextColor: chartTextColor,
    chartTitleColor: chartTextColor,
  };

  const [responsiveRadialBarChartState, responsiveRadialBarChartDispatch] =
    useReducer(
      responsiveRadialBarChartReducer,
      modifiedResponsiveRadialBarChartState
    );

  const chartRef = useRef(null);

  const {
    // base
    // base -> margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1
    // base -> angles
    startAngle, // -360 - 360 default: 0 step: 1
    endAngle, // -360 - 360 default: 270 step: 1
    innerRadius, // 0 - 0.95 default: 0.3 step: 0.05
    paddingRing, // 0 - 0.9 default: 0.2 step: 0.1
    padAngle, // 0 - 45 default: 0 step: 1
    cornerRadius, // 0px - 45px default: 0 step: 1

    // style
    chartColors, // default: 'nivo'
    ringBorderWidth, // 0px - 20px default: 0 step: 1
    ringBorderColor, // default: #ffffff

    // tracks
    enableTracks, // default: true
    tracksColor, // default: #333333

    // grids
    enableRadialGrid, // default: true
    enableCircularGrid, // default: true

    // axes
    // radial axis start
    enableRadialAxisStart, // default: true
    radialAxisStartTickSize, // 0 - 20 default: 5 step: 1
    radialAxisStartTickPadding, // 0 - 20 default: 5 step: 1
    radialAxisStartTickRotation, // -90 - 90 default: 0 step: 1

    // radial axis end
    enableRadialAxisEnd, // default: false
    radialAxisEndTickSize, // 0 - 20 default: 5 step: 1
    radialAxisEndTickPadding, // 0 - 20 default: 5 step: 1
    radialAxisEndTickRotation, // -90 - 90 default: 0 step: 1

    // circular axis inner
    enableCircularAxisInner, // default: false
    circularAxisInnerTickSize, // 0 - 20 default: 5 step: 1
    circularAxisInnerTickPadding, // 0 - 20 default: 5 step: 1
    circularAxisInnerTickRotation, // -90 - 90 default: 0 step: 1

    // circular axis outer
    enableCircularAxisOuter, // default: true
    circularAxisOuterTickSize, // 0 - 20 default: 5 step: 1
    circularAxisOuterTickPadding, // 0 - 20 default: 5 step: 1
    circularAxisOuterTickRotation, // -90 - 90 default: 0 step: 1

    // labels
    enableLabels, // default: false
    labelsSkipAngle, // 0 - 45 default: 10 step: 1
    labelsRadiusOffset, // 0 - 2 default: 0.5 step: 0.05
    labelsTextColor, // default: #333333

    // legend
    enableLegend, // default: false
    enableLegendJustify, // default: false
    legendAnchor, // default: bottom-right
    legendDirection, // default: column
    legendItemBackground, // default: rgba(0, 0, 0, 0)
    legendItemDirection, // default: left-to-right
    legendItemHeight, // 10px - 200px default: 20 step: 1
    legendItemOpacity, // 0 - 1 default: 1 step: 0.05
    legendItemTextColor, // default: #ffffff
    legendItemWidth, // 10px - 200px default: 60 step: 1
    legendItemsSpacing, // 0px - 60px default: 2 step: 1
    legendSymbolBorderColor, // default: #ffffff
    legendSymbolBorderWidth, // 0px - 20px default: 0 step: 1
    legendSymbolShape, // default: square
    legendSymbolSize, // 2px - 60px default: 12 step: 1
    legendSymbolSpacing, // 0px - 60px default: 8 step: 1
    legendTranslateX, // -200px - 200px default: 0 step: 1
    legendTranslateY, // -200px - 200px default: 0 step: 1

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'
    transitionMode, // default: 'centerRadius'

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
  } = responsiveRadialBarChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveRadialBarChartDispatch({
      type: responsiveRadialBarChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  const [
    enableTracksAccessibleSelectedText,
    enableTracksAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Tracks will be hidden.',
    isSelected: enableTracks,
    selectedDescription: 'Tracks will be shown.',
    semanticName: 'tracks',
    theme: 'muted',
  });

  const [
    enableRadialGridAccessibleSelectedText,
    enableRadialGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial grid will be hidden.',
    isSelected: enableRadialGrid,
    selectedDescription: 'Radial grid will be shown.',
    semanticName: 'radial grid',
    theme: 'muted',
  });

  const [
    enableCircularGridAccessibleSelectedText,
    enableCircularGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular grid will be hidden.',
    isSelected: enableCircularGrid,
    selectedDescription: 'Circular grid will be shown.',
    semanticName: 'circular grid',
    theme: 'muted',
  });

  const [
    enableRadialAxisStartAccessibleSelectedText,
    enableRadialAxisStartAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis start will be hidden.',
    isSelected: enableRadialAxisStart,
    selectedDescription: 'Radial axis start will be shown.',
    semanticName: 'radial axis start',
    theme: 'muted',
  });

  const [
    enableRadialAxisEndAccessibleSelectedText,
    enableRadialAxisEndAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis end will be hidden.',
    isSelected: enableRadialAxisEnd,
    selectedDescription: 'Radial axis end will be shown.',
    semanticName: 'radial axis end',
    theme: 'muted',
  });

  const [
    enableCircularAxisInnerAccessibleSelectedText,
    enableCircularAxisInnerAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis inner will be hidden.',
    isSelected: enableCircularAxisInner,
    selectedDescription: 'Circular axis inner will be shown.',
    semanticName: 'circular axis inner',
    theme: 'muted',
  });

  const [
    enableCircularAxisOuterAccessibleSelectedText,
    enableCircularAxisOuterAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis outer will be hidden.',
    isSelected: enableCircularAxisOuter,
    selectedDescription: 'Circular axis outer will be shown.',
    semanticName: 'circular axis outer',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Labels will be hidden.',
    isSelected: enableLabels,
    selectedDescription: 'Labels will be shown.',
    semanticName: 'labels',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Animation will be disabled.',
    isSelected: enableAnimate,
    selectedDescription: 'Animation will be enabled.',
    semanticName: 'animate',
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

  // base -> angles
  const startAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'start angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 360,
    min: -360,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setStartAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: startAngle,
    width: sliderWidth,
  };

  const endAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'end angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 360,
    min: -360,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setEndAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 270,
    step: 1,
    value: endAngle,
    width: sliderWidth,
  };

  const innerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'inner radius',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 0.95,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setInnerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0.3,
    step: 0.05,
    value: innerRadius,
    width: sliderWidth,
  };

  const paddingRingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'padding ring',
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 0.9,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setPaddingRing,
        payload: value,
      });
    },
    sliderDefaultValue: 0.2,
    step: 0.1,
    value: paddingRing,
    width: sliderWidth,
  };

  const padAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'pad angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 45,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setPadAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: padAngle,
    width: sliderWidth,
  };

  const cornerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'corner radius',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 45,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setCornerRadius,
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
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setChartColors,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const createdRingBorderColorsInput = (
    <ColorInput
      aria-label="Ring border color"
      color={ringBorderColor}
      onChange={(color: string) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRingBorderColor,
          payload: color,
        });
      }}
      value={ringBorderColor}
      w={sliderWidth}
    />
  );

  const ringBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'ring border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRingBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: ringBorderWidth,
      width: sliderWidth,
    };

  // tracks
  const createdEnableTracksSwitchInput = (
    <Switch
      aria-describedby={
        enableTracks
          ? enableTracksAccessibleSelectedText.props.id
          : enableTracksAccessibleDeselectedText.props.id
      }
      checked={enableTracks}
      description={
        enableTracks
          ? enableTracksAccessibleSelectedText
          : enableTracksAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Tracks
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableTracks,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdTracksColorInput = (
    <ColorInput
      aria-label="Tracks color"
      color={tracksColor}
      disabled={!enableTracks}
      onChange={(color: string) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setTracksColor,
          payload: color,
        });
      }}
      value={tracksColor}
      w={sliderWidth}
    />
  );

  // grids
  const createdEnableRadialGridSwitchInput = (
    <Switch
      aria-describedby={
        enableRadialGrid
          ? enableRadialGridAccessibleSelectedText.props.id
          : enableRadialGridAccessibleDeselectedText.props.id
      }
      checked={enableRadialGrid}
      description={
        enableRadialGrid
          ? enableRadialGridAccessibleSelectedText
          : enableRadialGridAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Radial Grid
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableRadialGrid,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdEnableCircularGridSwitchInput = (
    <Switch
      aria-describedby={
        enableCircularGrid
          ? enableCircularGridAccessibleSelectedText.props.id
          : enableCircularGridAccessibleDeselectedText.props.id
      }
      checked={enableCircularGrid}
      description={
        enableCircularGrid
          ? enableCircularGridAccessibleSelectedText
          : enableCircularGridAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Circular Grid
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableCircularGrid,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  // axes
  // radial axis start
  const createdEnableRadialAxisStartSwitchInput = (
    <Switch
      aria-describedby={
        enableRadialAxisStart
          ? enableRadialAxisStartAccessibleSelectedText.props.id
          : enableRadialAxisStartAccessibleDeselectedText.props.id
      }
      checked={enableRadialAxisStart}
      description={
        enableRadialAxisStart
          ? enableRadialAxisStartAccessibleSelectedText
          : enableRadialAxisStartAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Radial Axis Start
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableRadialAxisStart,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const radialAxisStartTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis start tick size',
      disabled: !enableRadialAxisStart,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisStartTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: radialAxisStartTickSize,
      width: sliderWidth,
    };

  const radialAxisStartTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis start tick padding',
      disabled: !enableRadialAxisStart,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisStartTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: radialAxisStartTickPadding,
      width: sliderWidth,
    };

  const radialAxisStartTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis start tick rotation',
      disabled: !enableRadialAxisStart,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisStartTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: radialAxisStartTickRotation,
      width: sliderWidth,
    };

  // radial axis end
  const createdEnableRadialAxisEndSwitchInput = (
    <Switch
      aria-describedby={
        enableRadialAxisEnd
          ? enableRadialAxisEndAccessibleSelectedText.props.id
          : enableRadialAxisEndAccessibleDeselectedText.props.id
      }
      checked={enableRadialAxisEnd}
      description={
        enableRadialAxisEnd
          ? enableRadialAxisEndAccessibleSelectedText
          : enableRadialAxisEndAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Radial Axis End
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableRadialAxisEnd,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const radialAxisEndTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis end tick size',
      disabled: !enableRadialAxisEnd,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisEndTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: radialAxisEndTickSize,
      width: sliderWidth,
    };

  const radialAxisEndTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis end tick padding',
      disabled: !enableRadialAxisEnd,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisEndTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: radialAxisEndTickPadding,
      width: sliderWidth,
    };

  const radialAxisEndTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'radial axis end tick rotation',
      disabled: !enableRadialAxisEnd,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setRadialAxisEndTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: radialAxisEndTickRotation,
      width: sliderWidth,
    };

  // circular axis inner
  const createdEnableCircularAxisInnerSwitchInput = (
    <Switch
      aria-describedby={
        enableCircularAxisInner
          ? enableCircularAxisInnerAccessibleSelectedText.props.id
          : enableCircularAxisInnerAccessibleDeselectedText.props.id
      }
      checked={enableCircularAxisInner}
      description={
        enableCircularAxisInner
          ? enableCircularAxisInnerAccessibleSelectedText
          : enableCircularAxisInnerAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Circular Axis Inner
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableCircularAxisInner,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const circularAxisInnerTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis inner tick size',
      disabled: !enableCircularAxisInner,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisInnerTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: circularAxisInnerTickSize,
      width: sliderWidth,
    };

  const circularAxisInnerTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis inner tick padding',
      disabled: !enableCircularAxisInner,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisInnerTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: circularAxisInnerTickPadding,
      width: sliderWidth,
    };

  const circularAxisInnerTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis inner tick rotation',
      disabled: !enableCircularAxisInner,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisInnerTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: circularAxisInnerTickRotation,
      width: sliderWidth,
    };

  // circular axis outer
  const createdEnableCircularAxisOuterSwitchInput = (
    <Switch
      aria-describedby={
        enableCircularAxisOuter
          ? enableCircularAxisOuterAccessibleSelectedText.props.id
          : enableCircularAxisOuterAccessibleDeselectedText.props.id
      }
      checked={enableCircularAxisOuter}
      description={
        enableCircularAxisOuter
          ? enableCircularAxisOuterAccessibleSelectedText
          : enableCircularAxisOuterAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Circular Axis Outer
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableCircularAxisOuter,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const circularAxisOuterTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis outer tick size',
      disabled: !enableCircularAxisOuter,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisOuterTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: circularAxisOuterTickSize,
      width: sliderWidth,
    };

  const circularAxisOuterTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis outer tick padding',
      disabled: !enableCircularAxisOuter,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisOuterTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: circularAxisOuterTickPadding,
      width: sliderWidth,
    };

  const circularAxisOuterTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'circular axis outer tick rotation',
      disabled: !enableCircularAxisOuter,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setCircularAxisOuterTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: circularAxisOuterTickRotation,
      width: sliderWidth,
    };

  // labels
  const createdEnableLabelsSwitchInput = (
    <Switch
      aria-describedby={
        enableLabels
          ? enableLabelsAccessibleSelectedText.props.id
          : enableLabelsAccessibleDeselectedText.props.id
      }
      checked={enableLabels}
      description={
        enableLabels
          ? enableLabelsAccessibleSelectedText
          : enableLabelsAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Labels
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const labelsSkipAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'labels skip angle',
      disabled: !enableLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 45,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 10,
      step: 1,
      value: labelsSkipAngle,
      width: sliderWidth,
    };

  const labelsRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'labels radius offset',
      disabled: !enableLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 2,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLabelsRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0.5,
      step: 0.05,
      value: labelsRadiusOffset,
      width: sliderWidth,
    };

  const createdLabelsTextColorInput = (
    <ColorInput
      aria-label="Labels text color"
      color={labelsTextColor}
      disabled={!enableLabels}
      onChange={(color: string) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLabelsTextColor,
          payload: color,
        });
      }}
      value={labelsTextColor}
      w={sliderWidth}
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
          Toggle Animate
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableAnimate,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const motionConfigSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_MOTION_CONFIG_DATA,
    disabled: !enableAnimate,
    description: 'Define motion config.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
    width: sliderWidth,
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      disabled: !enableAnimate,
      description: 'Define transition mode.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setTransitionMode,
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
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.resetChartToDefault,
          payload: modifiedResponsiveRadialBarChartState,
        });
      },
    },
  ]);

  // input creation

  // base
  const [
    createdStartAngleSliderInput,
    createdEndAngleSliderInput,
    createdInnerRadiusSliderInput,
    createdPaddingRingSliderInput,
    createdPadAngleSliderInput,
    createdCornerRadiusSliderInput,
  ] = returnAccessibleSliderInputElements([
    startAngleSliderInputCreatorInfo,
    endAngleSliderInputCreatorInfo,
    innerRadiusSliderInputCreatorInfo,
    paddingRingSliderInputCreatorInfo,
    padAngleSliderInputCreatorInfo,
    cornerRadiusSliderInputCreatorInfo,
  ]);

  // style
  const [createdChartColorsSelectInput] = returnAccessibleSelectInputElements([
    chartColorsSelectInputCreatorInfo,
  ]);

  const [createdRingBorderWidthSliderInput] =
    returnAccessibleSliderInputElements([
      ringBorderWidthSliderInputCreatorInfo,
    ]);

  // axes
  const [
    // radial axis start
    createdRadialAxisStartTickSizeSliderInput,
    createdRadialAxisStartTickPaddingSliderInput,
    createdRadialAxisStartTickRotationSliderInput,
    // radial axis end
    createdRadialAxisEndTickSizeSliderInput,
    createdRadialAxisEndTickPaddingSliderInput,
    createdRadialAxisEndTickRotationSliderInput,
    // circular axis inner
    createdCircularAxisInnerTickSizeSliderInput,
    createdCircularAxisInnerTickPaddingSliderInput,
    createdCircularAxisInnerTickRotationSliderInput,
    // circular axis outer
    createdCircularAxisOuterTickSizeSliderInput,
    createdCircularAxisOuterTickPaddingSliderInput,
    createdCircularAxisOuterTickRotationSliderInput,
  ] = returnAccessibleSliderInputElements([
    // radial axis start
    radialAxisStartTickSizeSliderInputCreatorInfo,
    radialAxisStartTickPaddingSliderInputCreatorInfo,
    radialAxisStartTickRotationSliderInputCreatorInfo,
    // radial axis end
    radialAxisEndTickSizeSliderInputCreatorInfo,
    radialAxisEndTickPaddingSliderInputCreatorInfo,
    radialAxisEndTickRotationSliderInputCreatorInfo,
    // circular axis inner
    circularAxisInnerTickSizeSliderInputCreatorInfo,
    circularAxisInnerTickPaddingSliderInputCreatorInfo,
    circularAxisInnerTickRotationSliderInputCreatorInfo,
    // circular axis outer
    circularAxisOuterTickSizeSliderInputCreatorInfo,
    circularAxisOuterTickPaddingSliderInputCreatorInfo,
    circularAxisOuterTickRotationSliderInputCreatorInfo,
  ]);

  // labels
  const [
    createdLabelsSkipAngleSliderInput,
    createdLabelsRadiusOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    labelsSkipAngleSliderInputCreatorInfo,
    labelsRadiusOffsetSliderInputCreatorInfo,
  ]);

  // motion
  const [createdMotionConfigSelectInput, createdTransitionModeSelectInput] =
    returnAccessibleSelectInputElements([
      motionConfigSelectInputCreatorInfo,
      transitionModeSelectInputCreatorInfo,
    ]);

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

  const displayStartAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdStartAngleSliderInput}
      label="Start angle"
      symbol="°"
      value={startAngle}
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdEndAngleSliderInput}
      label="End angle"
      symbol="°"
      value={endAngle}
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      symbol="px"
      value={innerRadius}
    />
  );

  const displayPaddingRingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdPaddingRingSliderInput}
      label="Padding ring"
      value={paddingRing}
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdPadAngleSliderInput}
      label="Pad angle"
      symbol="°"
      value={padAngle}
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      symbol="px"
      value={cornerRadius}
    />
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayStartAngleSliderInput}
      {displayEndAngleSliderInput}
      {displayInnerRadiusSliderInput}
      {displayPaddingRingSliderInput}
      {displayPadAngleSliderInput}
      {displayCornerRadiusSliderInput}
    </Stack>
  );

  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedResponsiveRadialBarChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsiveRadialBarChartAction}
      parentChartDispatch={responsiveRadialBarChartDispatch}
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
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdChartColorsSelectInput}
      isInputDisabled={false}
      label="Chart colors"
      value={chartColors}
    />
  );

  const displayRingBorderColorsInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRingBorderColorsInput}
      isInputDisabled={false}
      label="Ring border color"
      value={ringBorderColor}
    />
  );

  const displayRingBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRingBorderWidthSliderInput}
      isInputDisabled={false}
      label="Ring border width"
      symbol="px"
      value={ringBorderWidth}
    />
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayChartColorsSelectInput}
      {displayRingBorderColorsInput}
      {displayRingBorderWidthSliderInput}
    </Stack>
  );

  // tracks
  const displayTracksHeading = (
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
        Tracks
      </Title>
    </Group>
  );

  const displayEnableTracksSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableTracksSwitchInput}
    </Group>
  );

  const displayTracksColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdTracksColorInput}
      isInputDisabled={!enableTracks}
      label="Tracks color"
      value={tracksColor}
    />
  );

  const displayTracksSection = (
    <Stack w="100%">
      {displayTracksHeading}
      {displayEnableTracksSwitchInput}
      {displayTracksColorInput}
    </Stack>
  );

  // grids
  const displayGridsHeading = (
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
        Grids
      </Title>
    </Group>
  );

  const displayEnableRadialGridSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableRadialGridSwitchInput}
    </Group>
  );

  const displayEnableCircularGridSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableCircularGridSwitchInput}
    </Group>
  );

  const displayGridsSection = (
    <Stack w="100%">
      {displayGridsHeading}
      {displayEnableRadialGridSwitchInput}
      {displayEnableCircularGridSwitchInput}
    </Stack>
  );

  // axes
  // radial axis start
  const displayRadialAxisStartHeading = (
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
        Radial axis start
      </Title>
    </Group>
  );

  const displayEnableRadialAxisStartSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableRadialAxisStartSwitchInput}
    </Group>
  );

  const displayRadialAxisStartTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisStartTickSizeSliderInput}
      isInputDisabled={!enableRadialAxisStart}
      label="Radial axis start tick size"
      symbol="px"
      value={radialAxisStartTickSize}
    />
  );

  const displayRadialAxisStartTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisStartTickPaddingSliderInput}
      isInputDisabled={!enableRadialAxisStart}
      label="Radial axis start tick padding"
      symbol="px"
      value={radialAxisStartTickPadding}
    />
  );

  const displayRadialAxisStartTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisStartTickRotationSliderInput}
      isInputDisabled={!enableRadialAxisStart}
      label="Radial axis start tick rotation"
      symbol="°"
      value={radialAxisStartTickRotation}
    />
  );

  const displayRadialAxisStartSection = (
    <Stack w="100%">
      {displayRadialAxisStartHeading}
      {displayEnableRadialAxisStartSwitchInput}
      {displayRadialAxisStartTickSizeSliderInput}
      {displayRadialAxisStartTickPaddingSliderInput}
      {displayRadialAxisStartTickRotationSliderInput}
    </Stack>
  );

  // radial axis end
  const displayRadialAxisEndHeading = (
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
        Radial axis end
      </Title>
    </Group>
  );

  const displayEnableRadialAxisEndSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableRadialAxisEndSwitchInput}
    </Group>
  );

  const displayRadialAxisEndTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisEndTickSizeSliderInput}
      isInputDisabled={!enableRadialAxisEnd}
      label="Radial axis end tick size"
      symbol="px"
      value={radialAxisEndTickSize}
    />
  );

  const displayRadialAxisEndTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisEndTickPaddingSliderInput}
      isInputDisabled={!enableRadialAxisEnd}
      label="Radial axis end tick padding"
      symbol="px"
      value={radialAxisEndTickPadding}
    />
  );

  const displayRadialAxisEndTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdRadialAxisEndTickRotationSliderInput}
      isInputDisabled={!enableRadialAxisEnd}
      label="Radial axis end tick rotation"
      symbol="°"
      value={radialAxisEndTickRotation}
    />
  );

  const displayRadialAxisEndSection = (
    <Stack w="100%">
      {displayRadialAxisEndHeading}
      {displayEnableRadialAxisEndSwitchInput}
      {displayRadialAxisEndTickSizeSliderInput}
      {displayRadialAxisEndTickPaddingSliderInput}
      {displayRadialAxisEndTickRotationSliderInput}
    </Stack>
  );

  // circular axis inner
  const displayCircularAxisInnerHeading = (
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
        Circular axis inner
      </Title>
    </Group>
  );

  const displayEnableCircularAxisInnerSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableCircularAxisInnerSwitchInput}
    </Group>
  );

  const displayCircularAxisInnerTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisInnerTickSizeSliderInput}
      isInputDisabled={!enableCircularAxisInner}
      label="Circular axis inner tick size"
      symbol="px"
      value={circularAxisInnerTickSize}
    />
  );

  const displayCircularAxisInnerTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisInnerTickPaddingSliderInput}
      isInputDisabled={!enableCircularAxisInner}
      label="Circular axis inner tick padding"
      symbol="px"
      value={circularAxisInnerTickPadding}
    />
  );

  const displayCircularAxisInnerTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisInnerTickRotationSliderInput}
      isInputDisabled={!enableCircularAxisInner}
      label="Circular axis inner tick rotation"
      symbol="°"
      value={circularAxisInnerTickRotation}
    />
  );

  const displayCircularAxisInnerSection = (
    <Stack w="100%">
      {displayCircularAxisInnerHeading}
      {displayEnableCircularAxisInnerSwitchInput}
      {displayCircularAxisInnerTickSizeSliderInput}
      {displayCircularAxisInnerTickPaddingSliderInput}
      {displayCircularAxisInnerTickRotationSliderInput}
    </Stack>
  );

  // circular axis outer
  const displayCircularAxisOuterHeading = (
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
        Circular axis outer
      </Title>
    </Group>
  );

  const displayEnableCircularAxisOuterSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableCircularAxisOuterSwitchInput}
    </Group>
  );

  const displayCircularAxisOuterTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisOuterTickSizeSliderInput}
      isInputDisabled={!enableCircularAxisOuter}
      label="Circular axis outer tick size"
      symbol="px"
      value={circularAxisOuterTickSize}
    />
  );

  const displayCircularAxisOuterTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisOuterTickPaddingSliderInput}
      isInputDisabled={!enableCircularAxisOuter}
      label="Circular axis outer tick padding"
      symbol="px"
      value={circularAxisOuterTickPadding}
    />
  );

  const displayCircularAxisOuterTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdCircularAxisOuterTickRotationSliderInput}
      isInputDisabled={!enableCircularAxisOuter}
      label="Circular axis outer tick rotation"
      symbol="°"
      value={circularAxisOuterTickRotation}
    />
  );

  const displayCircularAxisOuterSection = (
    <Stack w="100%">
      {displayCircularAxisOuterHeading}
      {displayEnableCircularAxisOuterSwitchInput}
      {displayCircularAxisOuterTickSizeSliderInput}
      {displayCircularAxisOuterTickPaddingSliderInput}
      {displayCircularAxisOuterTickRotationSliderInput}
    </Stack>
  );

  // labels
  const displayLabelsHeading = (
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
        Labels
      </Title>
    </Group>
  );

  const displayEnableLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLabelsSwitchInput}
    </Group>
  );

  const displayLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdLabelsSkipAngleSliderInput}
      isInputDisabled={!enableLabels}
      label="Labels skip angle"
      symbol="°"
      value={labelsSkipAngle}
    />
  );

  const displayLabelsRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdLabelsRadiusOffsetSliderInput}
      isInputDisabled={!enableLabels}
      label="Labels radius offset"
      symbol="px"
      value={labelsRadiusOffset}
    />
  );

  const displayLabelsTextColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdLabelsTextColorInput}
      isInputDisabled={!enableLabels}
      label="Labels text color"
      value={labelsTextColor}
    />
  );

  const displayLabelsSection = (
    <Stack w="100%">
      {displayLabelsHeading}
      {displayEnableLabelsSwitchInput}
      {displayLabelsSkipAngleSliderInput}
      {displayLabelsRadiusOffsetSliderInput}
      {displayLabelsTextColorInput}
    </Stack>
  );

  const displayChartLegend = (
    <ChartLegend
      borderColor={borderColor}
      enableLegend={enableLegend}
      enableLegendJustify={enableLegendJustify}
      grayColorShade={grayColorShade}
      initialChartState={modifiedResponsiveRadialBarChartState}
      legendAnchor={legendAnchor}
      legendDirection={legendDirection}
      legendItemBackground={legendItemBackground}
      legendItemDirection={legendItemDirection}
      legendItemHeight={legendItemHeight}
      legendItemOpacity={legendItemOpacity}
      legendItemTextColor={legendItemTextColor}
      legendItemWidth={legendItemWidth}
      legendItemsSpacing={legendItemsSpacing}
      legendSymbolBorderColor={legendSymbolBorderColor}
      legendSymbolBorderWidth={legendSymbolBorderWidth}
      legendSymbolShape={legendSymbolShape}
      legendSymbolSize={legendSymbolSize}
      legendSymbolSpacing={legendSymbolSpacing}
      legendTranslateX={legendTranslateX}
      legendTranslateY={legendTranslateY}
      padding={padding}
      parentChartAction={responsiveRadialBarChartAction}
      parentChartDispatch={responsiveRadialBarChartDispatch}
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
      mb={padding}
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
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveRadialBarChartState}
      input={createdTransitionModeSelectInput}
      isInputDisabled={!enableAnimate}
      label="Transition mode"
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
      initialChartState={modifiedResponsiveRadialBarChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsiveRadialBarChartAction}
      parentChartDispatch={responsiveRadialBarChartDispatch}
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
        initialChartState={modifiedResponsiveRadialBarChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  const radialBarChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayTracksSection}
      {displayGridsSection}
      {displayRadialAxisStartSection}
      {displayRadialAxisEndSection}
      {displayCircularAxisInnerSection}
      {displayCircularAxisOuterSection}
      {displayLabelsSection}
      {displayChartLegend}
      {displayMotionSection}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
  );

  const data = [
    {
      id: 'Supermarket',
      data: [
        {
          x: 'Vegetables',
          y: 74,
        },
        {
          x: 'Fruits',
          y: 98,
        },
        {
          x: 'Meat',
          y: 38,
        },
      ],
    },
    {
      id: 'Combini',
      data: [
        {
          x: 'Vegetables',
          y: 180,
        },
        {
          x: 'Fruits',
          y: 29,
        },
        {
          x: 'Meat',
          y: 235,
        },
      ],
    },
    {
      id: 'Online',
      data: [
        {
          x: 'Vegetables',
          y: 168,
        },
        {
          x: 'Fruits',
          y: 67,
        },
        {
          x: 'Meat',
          y: 146,
        },
      ],
    },
    {
      id: 'Marché',
      data: [
        {
          x: 'Vegetables',
          y: 89,
        },
        {
          x: 'Fruits',
          y: 77,
        },
        {
          x: 'Meat',
          y: 231,
        },
      ],
    },
  ];

  const displayResponsiveRadialBar = (
    <ResponsiveRadialBar
      data={data}
      // base
      maxValue="auto"
      valueFormat=">-.2f"
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      padding={paddingRing}
      padAngle={padAngle}
      cornerRadius={cornerRadius}
      // style
      colors={{ scheme: chartColors }}
      borderWidth={ringBorderWidth}
      borderColor={ringBorderColor}
      // tracks
      enableTracks={enableTracks}
      tracksColor={tracksColor}
      // grids
      enableRadialGrid={enableRadialGrid}
      enableCircularGrid={enableCircularGrid}
      // axes
      radialAxisStart={
        enableRadialAxisStart
          ? {
              tickSize: radialAxisStartTickSize,
              tickPadding: radialAxisStartTickPadding,
              tickRotation: radialAxisStartTickRotation,
            }
          : void 0
      }
      radialAxisEnd={
        enableRadialAxisEnd
          ? {
              tickSize: radialAxisEndTickSize,
              tickPadding: radialAxisEndTickPadding,
              tickRotation: radialAxisEndTickRotation,
            }
          : void 0
      }
      circularAxisInner={
        enableCircularAxisInner
          ? {
              tickSize: circularAxisInnerTickSize,
              tickPadding: circularAxisInnerTickPadding,
              tickRotation: circularAxisInnerTickRotation,
            }
          : void 0
      }
      circularAxisOuter={
        enableCircularAxisOuter
          ? {
              tickSize: circularAxisOuterTickSize,
              tickPadding: circularAxisOuterTickPadding,
              tickRotation: circularAxisOuterTickRotation,
            }
          : void 0
      }
      // labels
      enableLabels={enableLabels}
      labelsSkipAngle={labelsSkipAngle}
      labelsRadiusOffset={labelsRadiusOffset}
      labelsTextColor={labelsTextColor}
      // legends
      legends={
        enableLegend
          ? [
              {
                anchor: legendAnchor,
                direction: legendDirection,
                justify: enableLegendJustify,
                translateX: legendTranslateX,
                translateY: legendTranslateY,
                itemWidth: legendItemWidth,
                itemHeight: legendItemHeight,
                itemsSpacing: legendItemsSpacing,
                itemOpacity: legendItemOpacity,
                symbolSize: legendSymbolSize,
                itemDirection: legendItemDirection,
                itemBackground: legendItemBackground,
                itemTextColor: legendItemTextColor,
                symbolShape: legendSymbolShape,
                symbolBorderColor: legendSymbolBorderColor,
                symbolBorderWidth: legendSymbolBorderWidth,
                symbolSpacing: legendSymbolSpacing,
                // padding: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : []
      }
      // motion
      animate={enableAnimate}
      motionConfig={motionConfig}
      transitionMode={transitionMode}
      isInteractive={true}
      role="application"
      ariaLabel="Nivo radial bar chart"
    />
  );

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={radialBarChartControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayResponsiveRadialBar}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveRadialBarChart };
