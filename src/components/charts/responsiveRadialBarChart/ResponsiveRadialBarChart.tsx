import {
  ColorInput,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Space,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { ChangeEvent, useEffect, useReducer } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleSelectedDeselectedTextElements,
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
  };

  const [responsiveRadialBarChartState, responsiveRadialBarChartDispatch] =
    useReducer(
      responsiveRadialBarChartReducer,
      modifiedResponsiveRadialBarChartState
    );

  const {
    // base
    enableMaxValue, // default: false ? 'auto'
    maxValue, // 0 - 1000 default: 1000 step: 1
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
    legendAnchor, // default: bottom-right
    legendDirection, // default: column
    enableLegendJustify, // default: false
    legendTranslateX, // -200px - 200px default: 0 step: 1
    legendTranslateY, // -200px - 200px default: 0 step: 1
    legendItemWidth, // 10px - 200px default: 60 step: 1
    legendItemHeight, // 10px - 200px default: 20 step: 1
    legendItemsSpacing, // 0px - 60px default: 2 step: 1
    legendItemDirection, // default: left-to-right
    legendItemOpacity, // 0 - 1 default: 1 step: 0.05
    legendSymbolSize, // 2px - 60px default: 12 step: 1

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'
    transitionMode, // default: 'centerRadius'
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
    enableMaxValueAccessibleSelectedText,
    enableMaxValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Max value will be automatically calculated.',
    isSelected: enableMaxValue,
    selectedDescription: 'Max value is user defined.',
    semanticName: 'enable max value',
    theme: 'muted',
  });

  const [
    enableTracksAccessibleSelectedText,
    enableTracksAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Tracks will be hidden.',
    isSelected: enableTracks,
    selectedDescription: 'Tracks will be shown.',
    semanticName: 'enable tracks',
    theme: 'muted',
  });

  const [
    enableRadialGridAccessibleSelectedText,
    enableRadialGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial grid will be hidden.',
    isSelected: enableRadialGrid,
    selectedDescription: 'Radial grid will be shown.',
    semanticName: 'enable radial grid',
    theme: 'muted',
  });

  const [
    enableCircularGridAccessibleSelectedText,
    enableCircularGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular grid will be hidden.',
    isSelected: enableCircularGrid,
    selectedDescription: 'Circular grid will be shown.',
    semanticName: 'enable circular grid',
    theme: 'muted',
  });

  const [
    enableRadialAxisStartAccessibleSelectedText,
    enableRadialAxisStartAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis start will be hidden.',
    isSelected: enableRadialAxisStart,
    selectedDescription: 'Radial axis start will be shown.',
    semanticName: 'enable radial axis start',
    theme: 'muted',
  });

  const [
    enableRadialAxisEndAccessibleSelectedText,
    enableRadialAxisEndAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis end will be hidden.',
    isSelected: enableRadialAxisEnd,
    selectedDescription: 'Radial axis end will be shown.',
    semanticName: 'enable radial axis end',
    theme: 'muted',
  });

  const [
    enableCircularAxisInnerAccessibleSelectedText,
    enableCircularAxisInnerAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis inner will be hidden.',
    isSelected: enableCircularAxisInner,
    selectedDescription: 'Circular axis inner will be shown.',
    semanticName: 'enable circular axis inner',
    theme: 'muted',
  });

  const [
    enableCircularAxisOuterAccessibleSelectedText,
    enableCircularAxisOuterAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis outer will be hidden.',
    isSelected: enableCircularAxisOuter,
    selectedDescription: 'Circular axis outer will be shown.',
    semanticName: 'enable circular axis outer',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Labels will be hidden.',
    isSelected: enableLabels,
    selectedDescription: 'Labels will be shown.',
    semanticName: 'enable labels',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be hidden.',
    isSelected: enableLegend,
    selectedDescription: 'Legend will be shown.',
    semanticName: 'enable legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be left aligned.',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend will be justified.',
    semanticName: 'enable legend justify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Animation will be disabled.',
    isSelected: enableAnimate,
    selectedDescription: 'Animation will be enabled.',
    semanticName: 'enable animate',
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
  const createdEnableMaxValueSwitchInput = (
    <Switch
      aria-describedby={
        enableMaxValue
          ? enableMaxValueAccessibleSelectedText.props.id
          : enableMaxValueAccessibleDeselectedText.props.id
      }
      checked={enableMaxValue}
      description={
        enableMaxValue
          ? enableMaxValueAccessibleSelectedText
          : enableMaxValueAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle max value
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableMaxValue,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const maxValueSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'max value',
    disabled: !enableMaxValue,
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 1000,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMaxValue,
        payload: value,
      });
    },
    sliderDefaultValue: 1000,
    step: 1,
    value: maxValue,
    width: sliderWidth,
  };

  // base -> margin
  const marginTopSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin top',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMarginTop,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginTop,
    width: sliderWidth,
  };

  const marginRightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin right',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMarginRight,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginRight,
    width: sliderWidth,
  };

  const marginBottomSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin bottom',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMarginBottom,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginBottom,
    width: sliderWidth,
  };

  const marginLeftSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin left',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginLeft,
    width: sliderWidth,
  };

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
          Toggle tracks
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
          Toggle radial grid
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
          Toggle circular grid
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
          Toggle radial axis start
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
          Toggle radial axis end
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
          Toggle circular axis inner
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
          Toggle circular axis outer
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
          Toggle labels
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

  // legends
  const createdEnableLegendSwitchInput = (
    <Switch
      aria-describedby={
        enableLegend
          ? enableLegendAccessibleSelectedText.props.id
          : enableLegendAccessibleDeselectedText.props.id
      }
      checked={enableLegend}
      description={
        enableLegend
          ? enableLegendAccessibleSelectedText
          : enableLegendAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle legend
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableLegend,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendAnchorSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LEGEND_ANCHOR_DATA,
    disabled: !enableLegend,
    description: 'Define legend anchor.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveRadialBarChartDispatch({
        type: responsiveRadialBarChartAction.setLegendAnchor,
        payload: event.currentTarget.value as NivoLegendAnchor,
      });
    },
    value: legendAnchor,
    width: sliderWidth,
  };

  const legendDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_DIRECTION_DATA,
      disabled: !enableLegend,
      description: 'Define legend direction.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendDirection,
          payload: event.currentTarget.value as NivoLegendDirection,
        });
      },
      value: legendDirection,
      width: sliderWidth,
    };

  const createdEnableLegendJustifySwitchInput = (
    <Switch
      aria-describedby={
        enableLegendJustify
          ? enableLegendJustifyAccessibleSelectedText.props.id
          : enableLegendJustifyAccessibleDeselectedText.props.id
      }
      checked={enableLegendJustify}
      description={
        enableLegendJustify
          ? enableLegendJustifyAccessibleSelectedText
          : enableLegendJustifyAccessibleDeselectedText
      }
      disabled={!enableLegend}
      label={
        <Text weight={500} color={enableLegend ? textColor : grayColorShade}>
          Legend justify
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setEnableLegendJustify,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendTranslateXSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend translate x',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendTranslateX,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendTranslateX,
      width: sliderWidth,
    };

  const legendTranslateYSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend translate y',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendTranslateY,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendTranslateY,
      width: sliderWidth,
    };

  const legendItemWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item width',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendItemWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 100,
      step: 1,
      value: legendItemWidth,
      width: sliderWidth,
    };

  const legendItemHeightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item height',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendItemHeight,
          payload: value,
        });
      },
      sliderDefaultValue: 12,
      step: 1,
      value: legendItemHeight,
      width: sliderWidth,
    };

  const legendItemsSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend items spacing',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendItemsSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 10,
      step: 1,
      value: legendItemsSpacing,
      width: sliderWidth,
    };

  const legendItemDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_ITEM_DIRECTION_DATA,
      disabled: !enableLegend,
      description: 'Define legend item direction.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendItemDirection,
          payload: event.currentTarget.value as NivoLegendItemDirection,
        });
      },
      value: legendItemDirection,
      width: sliderWidth,
    };

  const legendItemOpacitySliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item opacity',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 1,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendItemOpacity,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 0.1,
      value: legendItemOpacity,
      width: sliderWidth,
    };

  const legendSymbolSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol size',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 100,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveRadialBarChartDispatch({
          type: responsiveRadialBarChartAction.setLegendSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: legendSymbolSize,
      width: sliderWidth,
    };

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
          Toggle animate
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

  // input creation

  // base
  const [
    createdMaxValueSliderInput,
    createdMarginTopSliderInput,
    createdMarginRightSliderInput,
    createdMarginBottomSliderInput,
    createdMarginLeftSliderInput,
    createdStartAngleSliderInput,
    createdEndAngleSliderInput,
    createdInnerRadiusSliderInput,
    createdPaddingRingSliderInput,
    createdPadAngleSliderInput,
    createdCornerRadiusSliderInput,
  ] = returnAccessibleSliderInputElements([
    maxValueSliderInputCreatorInfo,
    marginTopSliderInputCreatorInfo,
    marginRightSliderInputCreatorInfo,
    marginBottomSliderInputCreatorInfo,
    marginLeftSliderInputCreatorInfo,
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

  // legends

  const [
    createdLegendAnchorSelectInput,
    createdLegendDirectionSelectInput,
    createdLegendItemDirectionSelectInput,
  ] = returnAccessibleSelectInputElements([
    legendAnchorSelectInputCreatorInfo,
    legendDirectionSelectInputCreatorInfo,
    legendItemDirectionSelectInputCreatorInfo,
  ]);

  const [
    createdLegendTranslateXSliderInput,
    createdLegendTranslateYSliderInput,
    createdLegendItemWidthSliderInput,
    createdLegendItemHeightSliderInput,
    createdLegendItemsSpacingSliderInput,
    createdLegendItemOpacitySliderInput,
    createdLegendSymbolSizeSliderInput,
  ] = returnAccessibleSliderInputElements([
    legendTranslateXSliderInputCreatorInfo,
    legendTranslateYSliderInputCreatorInfo,
    legendItemWidthSliderInputCreatorInfo,
    legendItemHeightSliderInputCreatorInfo,
    legendItemsSpacingSliderInputCreatorInfo,
    legendItemOpacitySliderInputCreatorInfo,
    legendSymbolSizeSliderInputCreatorInfo,
  ]);

  // motion
  const [createdMotionConfigSelectInput, createdTransitionModeSelectInput] =
    returnAccessibleSelectInputElements([
      motionConfigSelectInputCreatorInfo,
      transitionModeSelectInputCreatorInfo,
    ]);

  // input display

  // base

  const displayBaseHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayEnableMaxValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableMaxValueSwitchInput}
    </Group>
  );

  const displayMaxValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMaxValueSliderInput}
      isInputDisabled={!enableMaxValue}
      label="Max value"
      symbol="px"
      value={maxValue}
    />
  );

  const displayStartAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdStartAngleSliderInput}
      label="Start angle"
      symbol="°"
      value={startAngle}
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdEndAngleSliderInput}
      label="End angle"
      symbol="°"
      value={endAngle}
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      symbol="px"
      value={innerRadius}
    />
  );

  const displayPaddingRingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdPaddingRingSliderInput}
      label="Padding ring"
      value={paddingRing}
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdPadAngleSliderInput}
      label="Pad angle"
      symbol="°"
      value={padAngle}
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      symbol="px"
      value={cornerRadius}
    />
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayEnableMaxValueSwitchInput}
      {displayMaxValueSliderInput}
      {displayStartAngleSliderInput}
      {displayEndAngleSliderInput}
      {displayInnerRadiusSliderInput}
      {displayPaddingRingSliderInput}
      {displayPadAngleSliderInput}
      {displayCornerRadiusSliderInput}
    </Stack>
  );

  // margin
  const displayMarginHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Margin
      </Title>
    </Group>
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginTopSliderInput}
      label="Margin top"
      symbol="px"
      value={marginTop}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginRightSliderInput}
      label="Margin right"
      symbol="px"
      value={marginRight}
    />
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginBottomSliderInput}
      label="Margin bottom"
      symbol="px"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginLeftSliderInput}
      label="Margin left"
      symbol="px"
      value={marginLeft}
    />
  );

  const displayMarginSection = (
    <Stack w="100%">
      {displayMarginHeading}
      {displayMarginTopSliderInput}
      {displayMarginRightSliderInput}
      {displayMarginBottomSliderInput}
      {displayMarginLeftSliderInput}
    </Stack>
  );

  // style
  const displayStyleHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayChartColorsSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdChartColorsSelectInput}
      isInputDisabled={false}
      label="Chart colors"
      value={chartColors}
    />
  );

  const displayRingBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
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
      {displayRingBorderWidthSliderInput}
    </Stack>
  );

  // tracks
  const displayTracksHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
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
      style={{ borderRadius: 4 }}
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
      style={{ borderRadius: 4 }}
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
      input={createdRadialAxisStartTickSizeSliderInput}
      isInputDisabled={!enableRadialAxisStart}
      label="Radial axis start tick size"
      symbol="px"
      value={radialAxisStartTickSize}
    />
  );

  const displayRadialAxisStartTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdRadialAxisStartTickPaddingSliderInput}
      isInputDisabled={!enableRadialAxisStart}
      label="Radial axis start tick padding"
      symbol="px"
      value={radialAxisStartTickPadding}
    />
  );

  const displayRadialAxisStartTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
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
      style={{ borderRadius: 4 }}
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
      input={createdRadialAxisEndTickSizeSliderInput}
      isInputDisabled={!enableRadialAxisEnd}
      label="Radial axis end tick size"
      symbol="px"
      value={radialAxisEndTickSize}
    />
  );

  const displayRadialAxisEndTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdRadialAxisEndTickPaddingSliderInput}
      isInputDisabled={!enableRadialAxisEnd}
      label="Radial axis end tick padding"
      symbol="px"
      value={radialAxisEndTickPadding}
    />
  );

  const displayRadialAxisEndTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
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
      style={{ borderRadius: 4 }}
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
      input={createdCircularAxisInnerTickSizeSliderInput}
      isInputDisabled={!enableCircularAxisInner}
      label="Circular axis inner tick size"
      symbol="px"
      value={circularAxisInnerTickSize}
    />
  );

  const displayCircularAxisInnerTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdCircularAxisInnerTickPaddingSliderInput}
      isInputDisabled={!enableCircularAxisInner}
      label="Circular axis inner tick padding"
      symbol="px"
      value={circularAxisInnerTickPadding}
    />
  );

  const displayCircularAxisInnerTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
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
      style={{ borderRadius: 4 }}
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
      input={createdCircularAxisOuterTickSizeSliderInput}
      isInputDisabled={!enableCircularAxisOuter}
      label="Circular axis outer tick size"
      symbol="px"
      value={circularAxisOuterTickSize}
    />
  );

  const displayCircularAxisOuterTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdCircularAxisOuterTickPaddingSliderInput}
      isInputDisabled={!enableCircularAxisOuter}
      label="Circular axis outer tick padding"
      symbol="px"
      value={circularAxisOuterTickPadding}
    />
  );

  const displayCircularAxisOuterTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
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
      style={{ borderRadius: 4 }}
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
      input={createdLabelsSkipAngleSliderInput}
      isInputDisabled={!enableLabels}
      label="Labels skip angle"
      symbol="°"
      value={labelsSkipAngle}
    />
  );

  const displayLabelsRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLabelsRadiusOffsetSliderInput}
      isInputDisabled={!enableLabels}
      label="Labels radius offset"
      symbol="px"
      value={labelsRadiusOffset}
    />
  );

  const displayLabelsTextColorInput = (
    <ChartsAndGraphsControlsStacker
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

  // legends
  const displayLegendHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
      mb={padding}
    >
      <Title order={5} color={textColor}>
        Legend
      </Title>
    </Group>
  );

  const displayEnableLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendAnchorSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend anchor"
      value={legendAnchor}
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend direction"
      value={legendDirection}
    />
  );

  const displayEnableLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate x"
      symbol="px"
      value={legendTranslateX}
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate y"
      symbol="px"
      value={legendTranslateY}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      symbol="px"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      symbol="px"
      value={legendItemHeight}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      symbol="px"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend item direction"
      value={legendItemDirection}
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemOpacitySliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item opacity"
      value={legendItemOpacity}
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendSymbolSizeSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol size"
      symbol="px"
      value={legendSymbolSize}
    />
  );

  const displayLegendSection = (
    <Stack w="100%">
      {displayLegendHeading}
      {displayEnableLegendSwitchInput}
      {displayLegendAnchorSelectInput}
      {displayLegendDirectionSelectInput}
      {displayEnableLegendJustifySwitchInput}
      {displayLegendTranslateXSliderInput}
      {displayLegendTranslateYSliderInput}
      {displayLegendItemWidthSliderInput}
      {displayLegendItemHeightSliderInput}
      {displayLegendItemsSpacingSliderInput}
      {displayLegendItemDirectionSelectInput}
      {displayLegendItemOpacitySliderInput}
      {displayLegendSymbolSizeSliderInput}
    </Stack>
  );

  // motion
  const displayMotionHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
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
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
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

  const radialBarChartControlsStack = (
    <Stack w="100%">
      {displayBaseSection}
      {displayMarginSection}
      {displayStyleSection}
      {displayTracksSection}
      {displayGridsSection}
      {displayRadialAxisStartSection}
      {displayRadialAxisEndSection}
      {displayCircularAxisInnerSection}
      {displayCircularAxisOuterSection}
      {displayLabelsSection}
      {displayLegendSection}
      {displayMotionSection}
    </Stack>
  );

  const displayRadialBarChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h={width < 1192 ? '38vh' : '70vh'} py={padding}>
        <Grid.Col span={1}>{radialBarChartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
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
      maxValue={enableMaxValue ? maxValue : void 0}
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

  const displayResponsiveRadialBarChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayRadialBarChartControls}
      </Grid.Col>

      <Grid.Col span={1}>
        {width < 1192 ? <Space h="md" /> : <Space w="md" />}
        <Divider
          orientation={width < 1192 ? 'horizontal' : 'vertical'}
          size="sm"
          w="100%"
          h="100%"
        />
      </Grid.Col>

      <Grid.Col span={width < 1192 ? 1 : 9} h="100%">
        {displayResponsiveRadialBar}
      </Grid.Col>
    </Grid>
  );

  return displayResponsiveRadialBarChartComponent;
}

export { ResponsiveRadialBarChart };
