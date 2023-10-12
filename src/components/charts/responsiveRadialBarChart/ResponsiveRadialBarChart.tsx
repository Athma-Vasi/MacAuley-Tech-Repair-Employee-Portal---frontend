import { ChangeEvent, useEffect, useReducer } from 'react';
import {
  initialResponsiveRadialBarChartState,
  responsiveRadialBarChartAction,
  responsiveRadialBarChartReducer,
} from './state';
import { useGlobalState } from '../../../hooks';
import { AccessibleSelectedDeselectedTextElements } from '../../../jsxCreators';
import { COLORS_SWATCHES } from '../../../constants/data';
import { returnThemeColors } from '../../../utils';
import { ColorInput, Switch, Text } from '@mantine/core';
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
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';

function ResponsiveRadialBarChart() {
  const [responsiveRadialBarChartState, responsiveRadialBarChartDispatch] =
    useReducer(
      responsiveRadialBarChartReducer,
      initialResponsiveRadialBarChartState
    );

  const {
    globalState: { isPrefersReducedMotion, themeObject, width },
  } = useGlobalState();

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

  /**
   * const [reverseAccessibleSelectedText, reverseAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      deselectedDescription:
        'Bars will start on bottom instead of top for vertical layout and left instead of right for horizontal one',
      isSelected: reverse,
      selectedDescription:
        'Bars will start on top instead of bottom for vertical layout and right instead of left for horizontal one',
      semanticName: 'reverse',
      theme: 'muted',
    });
   */

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

  const {
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { grayColorShade },
    appThemeColors: { borderColor },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

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
      label={<Text weight={500}>Toggle max value</Text>}
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
      <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
    description: 'Define chart chartColors.',
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
      label={<Text weight={500}>Toggle tracks</Text>}
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
      label={<Text weight={500}>Toggle radial grid</Text>}
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
      label={<Text weight={500}>Toggle circular grid</Text>}
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
      label={<Text weight={500}>Toggle radial axis start</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
      label={<Text weight={500}>Toggle radial axis end</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
      label={<Text weight={500}>Toggle circular axis inner</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
      label={<Text weight={500}>Toggle circular axis outer</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}px</Text>
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
      label={<Text weight={500}>Toggle labels</Text>}
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
      label={<Text weight={500}>Toggle legend</Text>}
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
        payload: event.currentTarget.value as LegendAnchor,
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
          payload: event.currentTarget.value as LegendDirection,
        });
      },
      value: legendDirection,
      width: sliderWidth,
    };

  const createdToggleLegendJustifySwitchInput = (
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
        <Text weight={500} color={enableLegend ? void 0 : grayColorShade}>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
          payload: event.currentTarget.value as LegendItemDirection,
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
      label={<Text weight={500}>Toggle animate</Text>}
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

  return <></>;
}

export { ResponsiveRadialBarChart };
