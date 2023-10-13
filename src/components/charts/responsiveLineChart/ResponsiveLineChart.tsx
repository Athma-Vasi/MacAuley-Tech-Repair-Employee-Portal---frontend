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
import { ChangeEvent, useEffect, useReducer } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { SERIAL_ID_REGEX } from '../../../constants/regex';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnSerialIdValidationText,
  returnThemeColors,
} from '../../../utils';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../wrappers';
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  NIVO_MOTION_CONFIG_DATA,
} from '../constants';
import {
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoLineAreaBlendMode,
  NivoLineAxesScale,
  NivoLineCrosshairType,
  NivoLineCurve,
  NivoLinePointLabel,
  NivoMotionConfig,
} from '../types';
import {
  NIVO_LINE_AREA_BLEND_MODE_DATA,
  NIVO_LINE_AXES_SCALE,
  NIVO_LINE_CROSSHAIR_TYPE_DATA,
  NIVO_LINE_CURVE_DATA,
  NIVO_LINE_POINT_LABEL_DATA,
} from './constants';
import {
  initialResponsiveLineChartState,
  responsiveLineChartAction,
  responsiveLineChartReducer,
} from './state';
import { ResponsiveLineChartState } from './types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import { ResponsiveLine } from '@nivo/line';
import { BiReset } from 'react-icons/bi';

function ResponsiveLineChart() {
  const {
    globalState: { isPrefersReducedMotion, width, themeObject, padding },
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
  const modifiedResponsiveLineChartState: ResponsiveLineChartState = {
    ...initialResponsiveLineChartState,
    pointColor: chartTextColor,
    pointBorderColor: chartTextColor,
  };

  const [responsiveLineChartState, responsiveLineChartDispatch] = useReducer(
    responsiveLineChartReducer,
    modifiedResponsiveLineChartState
  );

  const {
    // base
    xScale, // default: linear
    yScale, // default: linear
    enableYScaleStacked, // default: false
    enableYScaleMin, // default: false ? 'auto'
    yScaleMin, // -2000 - 2000 default: 0
    enableYScaleMax, // default: false ? 'auto'
    yScaleMax, // -2000 - 2000 default: 0
    reverseScale, // default: false

    // margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    // style
    lineCurve, // default: 'linear'
    chartColors, // default: 'nivo'
    lineWidth, // 0px - 20px default: 2 step: 1
    enableArea, // default: false
    areaOpacity, // 0 - 1 default: 0.2 step: 0.1
    areaBlendMode, // default: 'normal'

    // points
    enablePoints, // default: false
    pointSize, // 0px - 20px default: 6 step: 1
    pointColor, // default: gray
    pointBorderWidth, // 0px - 20px default: 0 step: 1
    pointBorderColor, // default: gray
    enablePointLabel, // default: false
    pointLabel, // default: 'y'
    pointLabelYOffset, // -22px - 24px default: -12 step: 1

    // grids
    enableGridX, // default: true
    enableGridY, // default: true

    // axes
    // axisTop
    enableAxisTop, // default: false ? null
    axisTopTickSize, // 0px - 20px default: 5 step: 1
    axisTopTickPadding, // 0px - 20px default: 5 step: 1
    axisTopTickRotation, // -90° - 90° default: 0 step: 1
    axisTopLegend, // default: ''
    isAxisTopLegendValid, // default: false
    isAxisTopLegendFocused, // default: false
    axisTopLegendOffset, // -60px - 60px default: 0 step: 1
    // axisRight
    enableAxisRight, // default: false ? null
    axisRightTickSize, // 0px - 20px default: 5 step: 1
    axisRightTickPadding, // 0px - 20px default: 5 step: 1
    axisRightTickRotation, // -90° - 90° default: 0 step: 1
    axisRightLegend, // default: ''
    isAxisRightLegendValid, // default: false
    isAxisRightLegendFocused, // default: false
    axisRightLegendOffset, // -60px - 60px default: 0 step: 1
    // axisBottom
    enableAxisBottom, // default: true ? {...} : null
    axisBottomTickSize, // 0px - 20px default: 5 step: 1
    axisBottomTickPadding, // 0px - 20px default: 5 step: 1
    axisBottomTickRotation, // -90° - 90° default: 0 step: 1
    axisBottomLegend, // default: ''
    isAxisBottomLegendValid, // default: false
    isAxisBottomLegendFocused, // default: false
    axisBottomLegendOffset, // -60px - 60px default: 0 step: 1
    // axisLeft
    enableAxisLeft, // default: true ? {...} : null
    axisLeftTickSize, // 0px - 20px default: 5 step: 1
    axisLeftTickPadding, // 0px - 20px default: 5 step: 1
    axisLeftTickRotation, // -90° - 90° default: 0 step: 1
    axisLeftLegend, // default: ''
    isAxisLeftLegendValid, // default: false
    isAxisLeftLegendFocused, // default: false
    axisLeftLegendOffset, // -60px - 60px default: 0 step: 1

    // interactivity
    enableCrosshair, // default: true
    crosshairType, // default: 'bottom-left'

    // legends
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
    legendSymbolShape, // default: circle
    legendSymbolBorderColor, // default: 'rgba(0, 0, 0, .5)'
    legendSymbolBorderWidth, // 0px - 20px default: 0 step: 1
    legendSymbolSpacing, // 0px - 60px default: 8 step: 1

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'
  } = responsiveLineChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveLineChartDispatch({
      type: responsiveLineChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  // validate axisTopLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisTopLegend);

    responsiveLineChartDispatch({
      type: responsiveLineChartAction.setIsAxisTopLegendValid,
      payload: isValid,
    });
  }, [axisTopLegend]);

  // validate axisRightLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisRightLegend);

    responsiveLineChartDispatch({
      type: responsiveLineChartAction.setIsAxisRightLegendValid,
      payload: isValid,
    });
  }, [axisRightLegend]);

  // validate axisBottomLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisBottomLegend);

    responsiveLineChartDispatch({
      type: responsiveLineChartAction.setIsAxisBottomLegendValid,
      payload: isValid,
    });
  }, [axisBottomLegend]);

  // validate axisLeftLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisLeftLegend);

    responsiveLineChartDispatch({
      type: responsiveLineChartAction.setIsAxisLeftLegendValid,
      payload: isValid,
    });
  }, [axisLeftLegend]);

  const [
    enableYScaleStackedAccessibleSelectedText,
    enableYScaleStackedAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Lines will be stacked',
    isSelected: enableYScaleStacked,
    selectedDescription: 'Lines will not be stacked',
    semanticName: 'Y Scale Stacked',
    theme: 'muted',
  });

  const [
    enableYScaleMinAccessibleSelectedText,
    enableYScaleMinAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Y scale min will be automatically calculated',
    isSelected: enableYScaleMin,
    selectedDescription: 'Y scale min will be manually calculated',
    semanticName: 'Y Scale Min',
    theme: 'muted',
  });

  const [
    enableYScaleMaxAccessibleSelectedText,
    enableYScaleMaxAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Y scale max will be automatically calculated',
    isSelected: enableYScaleMax,
    selectedDescription: 'Y scale max will be manually calculated',
    semanticName: 'Y Scale Max',
    theme: 'muted',
  });

  const [
    enableReverseScaleAccessibleSelectedText,
    enableReverseScaleAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Scale will not be reversed',
    isSelected: reverseScale,
    selectedDescription: 'Scale will be reversed',
    semanticName: 'reverse Scale',
    theme: 'muted',
  });

  const [enableAreaAccessibleSelectedText, enableAreaAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      deselectedDescription: 'Area below each line will be disabled',
      isSelected: enableArea,
      selectedDescription: 'Area below each line will be enabled',
      semanticName: 'Area',
      theme: 'muted',
    });

  const [
    enablePointsAccessibleSelectedText,
    enablePointsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Points will be disabled',
    isSelected: enablePoints,
    selectedDescription: 'Points will be enabled',
    semanticName: 'Points',
    theme: 'muted',
  });

  const [
    enablePointLabelAccessibleSelectedText,
    enablePointLabelAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Point label will be disabled',
    isSelected: enablePointLabel,
    selectedDescription: 'Point label will be enabled',
    semanticName: 'Point Label',
    theme: 'muted',
  });

  const [
    enableGridXAccessibleSelectedText,
    enableGridXAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription:
      'Chart display area will not have a grid on the y axis.',
    isSelected: enableGridX,
    selectedDescription: 'Chart display area will have a grid on the y axis.',
    semanticName: 'Grid X',
    theme: 'muted',
  });

  const [
    enableGridYAccessibleSelectedText,
    enableGridYAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription:
      'Chart display area will not have a grid on the x axis.',
    isSelected: enableGridY,
    selectedDescription: 'Chart display area will have a grid on the x axis.',
    semanticName: 'Grid Y',
    theme: 'muted',
  });

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Top axis will be disabled',
    isSelected: enableAxisTop,
    selectedDescription: 'Top axis will be enabled',
    semanticName: 'Axis Top',
    theme: 'muted',
  });

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Right axis will be disabled',
    isSelected: enableAxisRight,
    selectedDescription: 'Right axis will be enabled',
    semanticName: 'Axis Right',
    theme: 'muted',
  });

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bottom axis will be disabled',
    isSelected: enableAxisBottom,
    selectedDescription: 'Bottom axis will be enabled',
    semanticName: 'Axis Bottom',
    theme: 'muted',
  });

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Left axis will be disabled',
    isSelected: enableAxisLeft,
    selectedDescription: 'Left axis will be enabled',
    semanticName: 'Axis Left',
    theme: 'muted',
  });

  const [
    enableCrosshairAccessibleSelectedText,
    enableCrosshairAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Crosshair will be disabled',
    isSelected: enableCrosshair,
    selectedDescription: 'Crosshair will be enabled',
    semanticName: 'Crosshair',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be disabled',
    isSelected: enableLegend,
    selectedDescription: 'Legend will be enabled',
    semanticName: 'Legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend items and symbols will not be justified',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend items and symbols will be justified',
    semanticName: 'Legend Justify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Animation will be disabled',
    isSelected: enableAnimate,
    selectedDescription: 'Animation will be enabled',
    semanticName: 'Animate',
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
  const xScaleSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LINE_AXES_SCALE,
    description: 'Define x scale.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setXScale,
        payload: event.currentTarget.value as NivoLineAxesScale,
      });
    },
    value: xScale,
    width: sliderWidth,
  };

  const yScaleSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LINE_AXES_SCALE,
    description: 'Define y scale.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setYScale,
        payload: event.currentTarget.value as NivoLineAxesScale,
      });
    },
    value: yScale,
    width: sliderWidth,
  };

  const createdEnableYScaleStackedSwitchInput = (
    <Switch
      aria-describedby={
        enableYScaleStacked
          ? enableYScaleStackedAccessibleSelectedText.props.id
          : enableYScaleStackedAccessibleDeselectedText.props.id
      }
      checked={enableYScaleStacked}
      description={
        enableYScaleStacked
          ? enableYScaleStackedAccessibleSelectedText
          : enableYScaleStackedAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Y Scale Stacked
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableYScaleStacked,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdEnableYScaleMinSwitchInput = (
    <Switch
      aria-describedby={
        enableYScaleMin
          ? enableYScaleMinAccessibleSelectedText.props.id
          : enableYScaleMinAccessibleDeselectedText.props.id
      }
      checked={enableYScaleMin}
      description={
        enableYScaleMin
          ? enableYScaleMinAccessibleSelectedText
          : enableYScaleMinAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Y Scale Min
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableYScaleMin,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const yScaleMinSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'y scale min',
    disabled: !enableYScaleMin,
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 2000,
    min: -2000,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setYScaleMin,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: yScaleMin,
    width: sliderWidth,
  };

  const createdEnableYScaleMaxSwitchInput = (
    <Switch
      aria-describedby={
        enableYScaleMax
          ? enableYScaleMaxAccessibleSelectedText.props.id
          : enableYScaleMaxAccessibleDeselectedText.props.id
      }
      checked={enableYScaleMax}
      description={
        enableYScaleMax
          ? enableYScaleMaxAccessibleSelectedText
          : enableYScaleMaxAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Y Scale Max
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableYScaleMax,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const yScaleMaxSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'y scale max',
    disabled: !enableYScaleMax,
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 2000,
    min: -2000,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setYScaleMax,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: yScaleMax,
    width: sliderWidth,
  };

  const createdReverseScaleSwitchInput = (
    <Switch
      aria-describedby={
        reverseScale
          ? enableReverseScaleAccessibleSelectedText.props.id
          : enableReverseScaleAccessibleDeselectedText.props.id
      }
      checked={reverseScale}
      description={
        reverseScale
          ? enableReverseScaleAccessibleSelectedText
          : enableReverseScaleAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Reverse Scale
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setReverseScale,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  // margin
  const marginTopSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin top',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMarginTop,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMarginRight,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMarginBottom,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginLeft,
    width: sliderWidth,
  };

  // style
  const lineCurveSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LINE_CURVE_DATA,
    description: 'Define line curve.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setLineCurve,
        payload: event.currentTarget.value as NivoLineCurve,
      });
    },
    value: lineCurve,
    width: sliderWidth,
  };

  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: 'Define chart colors.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setChartColors,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const lineWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'line width',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 20,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setLineWidth,
        payload: value,
      });
    },
    sliderDefaultValue: 2,
    step: 1,
    value: lineWidth,
    width: sliderWidth,
  };

  const createdEnableAreaSwitchInput = (
    <Switch
      aria-describedby={
        enableArea
          ? enableAreaAccessibleSelectedText.props.id
          : enableAreaAccessibleDeselectedText.props.id
      }
      checked={enableArea}
      description={
        enableArea
          ? enableAreaAccessibleSelectedText
          : enableAreaAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Area
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableArea,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const areaOpacitySliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'area opacity',
    disabled: !enableArea,
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 1,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setAreaOpacity,
        payload: value,
      });
    },
    sliderDefaultValue: 0.2,
    step: 0.1,
    value: areaOpacity,
    width: sliderWidth,
  };

  const areaBlendModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LINE_AREA_BLEND_MODE_DATA,
      description: 'Define line area blend mode.',
      disabled: !enableArea,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAreaBlendMode,
          payload: event.currentTarget.value as NivoLineAreaBlendMode,
        });
      },
      value: areaBlendMode,
      width: sliderWidth,
    };

  // points
  const createdEnablePointsSwitchInput = (
    <Switch
      aria-describedby={
        enablePoints
          ? enablePointsAccessibleSelectedText.props.id
          : enablePointsAccessibleDeselectedText.props.id
      }
      checked={enablePoints}
      description={
        enablePoints
          ? enablePointsAccessibleSelectedText
          : enablePointsAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Points
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnablePoints,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const pointSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'point size',
    disabled: !enablePoints,
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 20,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setPointSize,
        payload: value,
      });
    },
    sliderDefaultValue: 6,
    step: 1,
    value: pointSize,
    width: sliderWidth,
  };

  const createdPointColorInput = (
    <ColorInput
      aria-label="point color"
      color={pointColor}
      disabled={!enablePoints}
      onChange={(color: string) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setPointColor,
          payload: color,
        });
      }}
      value={pointColor}
      w={sliderWidth}
    />
  );

  const pointBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'point border width',
      disabled: !enablePoints,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setPointBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: pointBorderWidth,
      width: sliderWidth,
    };

  const createdPointBorderColorInput = (
    <ColorInput
      aria-label="point border color"
      color={pointBorderColor}
      disabled={!enablePoints}
      onChange={(color: string) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setPointBorderColor,
          payload: color,
        });
      }}
      value={pointBorderColor}
      w={sliderWidth}
    />
  );

  const createdEnablePointLabelSwitchInput = (
    <Switch
      aria-describedby={
        enablePointLabel
          ? enablePointLabelAccessibleSelectedText.props.id
          : enablePointLabelAccessibleDeselectedText.props.id
      }
      checked={enablePointLabel}
      description={
        enablePointLabel
          ? enablePointLabelAccessibleSelectedText
          : enablePointLabelAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Point Label
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnablePointLabel,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const pointLabelSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LINE_POINT_LABEL_DATA,
    description: 'Define point label.',
    disabled: !enablePointLabel,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setPointLabel,
        payload: event.currentTarget.value as NivoLinePointLabel,
      });
    },
    value: pointLabel,
    width: sliderWidth,
  };

  const pointLabelYOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'point label y offset',
      disabled: !enablePointLabel,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 24,
      min: -22,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setPointLabelYOffset,
          payload: value,
        });
      },
      sliderDefaultValue: -12,
      step: 1,
      value: pointLabelYOffset,
      width: sliderWidth,
    };

  // grids
  const createdEnableGridXSwitchInput = (
    <Switch
      aria-describedby={
        enableGridX
          ? enableGridXAccessibleSelectedText.props.id
          : enableGridXAccessibleDeselectedText.props.id
      }
      checked={enableGridX}
      description={
        enableGridX
          ? enableGridXAccessibleSelectedText
          : enableGridXAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Grid X
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableGridX,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdEnableGridYSwitchInput = (
    <Switch
      aria-describedby={
        enableGridY
          ? enableGridYAccessibleSelectedText.props.id
          : enableGridYAccessibleDeselectedText.props.id
      }
      checked={enableGridY}
      description={
        enableGridY
          ? enableGridYAccessibleSelectedText
          : enableGridYAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Grid Y
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableGridY,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  // axes
  // axisTop
  const createdEnableAxisTopSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisTop
          ? enableAxisTopAccessibleSelectedText.props.id
          : enableAxisTopAccessibleDeselectedText.props.id
      }
      checked={enableAxisTop}
      description={
        enableAxisTop
          ? enableAxisTopAccessibleSelectedText
          : enableAxisTopAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Axis Top
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableAxisTop,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisTopTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick size',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisTopTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisTopTickSize,
      width: sliderWidth,
    };

  const axisTopTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick padding',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisTopTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisTopTickPadding,
      width: sliderWidth,
    };

  const axisTopTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick rotation',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisTopTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisTopTickRotation,
      width: sliderWidth,
    };

  const [axisTopLegendErrorText, axisTopLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis top legend',
      inputText: axisTopLegend,
      isInputTextFocused: isAxisTopLegendFocused,
      isValidInputText: isAxisTopLegendValid,
      regexValidationText: returnSerialIdValidationText({
        content: axisTopLegend,
        contentKind: 'axis top legend',
      }),
    });

  const axisTopLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisTopLegendErrorText,
      valid: axisTopLegendValidText,
    },
    disabled: !enableAxisTop,
    inputText: axisTopLegend,
    isValidInputText: isAxisTopLegendValid,
    label: '',
    onBlur: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisTopLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setAxisTopLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisTopLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis top legend text',
    required: false,
    semanticName: 'axis top legend',
  };

  const axisTopLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top legend offset',
      disabled: !enableAxisTop || !axisTopLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisTopLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisTopLegendOffset,
      width: sliderWidth,
    };

  // axisRight
  const createdEnableAxisRightSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisRight
          ? enableAxisRightAccessibleSelectedText.props.id
          : enableAxisRightAccessibleDeselectedText.props.id
      }
      checked={enableAxisRight}
      description={
        enableAxisRight
          ? enableAxisRightAccessibleSelectedText
          : enableAxisRightAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Axis Right
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableAxisRight,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisRightTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick size',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisRightTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisRightTickSize,
      width: sliderWidth,
    };

  const axisRightTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick padding',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisRightTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisRightTickPadding,
      width: sliderWidth,
    };

  const axisRightTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick rotation',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisRightTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisRightTickRotation,
      width: sliderWidth,
    };

  const [axisRightLegendErrorText, axisRightLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis right legend',
      inputText: axisRightLegend,
      isInputTextFocused: isAxisRightLegendFocused,
      isValidInputText: isAxisRightLegendValid,
      regexValidationText: returnSerialIdValidationText({
        content: axisRightLegend,
        contentKind: 'axis right legend',
      }),
    });

  const axisRightLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisRightLegendErrorText,
      valid: axisRightLegendValidText,
    },
    disabled: !enableAxisRight,
    inputText: axisRightLegend,
    isValidInputText: isAxisRightLegendValid,
    label: '',
    onBlur: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisRightLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setAxisRightLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisRightLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis right legend text',
    required: false,
    semanticName: 'axis right legend',
  };

  const axisRightLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right legend offset',
      disabled: !enableAxisRight || !axisRightLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisRightLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisRightLegendOffset,
      width: sliderWidth,
    };

  // axisBottom
  const createdEnableAxisBottomSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisBottom
          ? enableAxisBottomAccessibleSelectedText.props.id
          : enableAxisBottomAccessibleDeselectedText.props.id
      }
      checked={enableAxisBottom}
      description={
        enableAxisBottom
          ? enableAxisBottomAccessibleSelectedText
          : enableAxisBottomAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis Bottom
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableAxisBottom,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisBottomTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick size',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisBottomTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisBottomTickSize,
      width: sliderWidth,
    };

  const axisBottomTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick padding',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisBottomTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisBottomTickPadding,
      width: sliderWidth,
    };

  const axisBottomTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick rotation',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisBottomTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisBottomTickRotation,
      width: sliderWidth,
    };

  const [axisBottomLegendErrorText, axisBottomLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis bottom legend',
      inputText: axisBottomLegend,
      isValidInputText: isAxisBottomLegendValid,
      isInputTextFocused: isAxisBottomLegendFocused,
      regexValidationText: returnSerialIdValidationText({
        content: axisBottomLegend,
        contentKind: 'axis bottom legend',
      }),
    });

  const axisBottomLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisBottomLegendErrorText,
      valid: axisBottomLegendValidText,
    },
    disabled: !enableAxisBottom,
    inputText: axisBottomLegend,
    isValidInputText: isAxisBottomLegendValid,
    label: '',
    onBlur: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisBottomLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setAxisBottomLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisBottomLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis bottom legend text',
    required: false,
    semanticName: 'axis bottom legend',
  };

  const axisBottomLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom legend offset',
      disabled: !enableAxisBottom || !axisBottomLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisBottomLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisBottomLegendOffset,
      width: sliderWidth,
    };

  // axis left
  const createdEnableAxisLeftSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisLeft
          ? enableAxisLeftAccessibleSelectedText.props.id
          : enableAxisLeftAccessibleDeselectedText.props.id
      }
      checked={enableAxisLeft}
      description={
        enableAxisLeft
          ? enableAxisLeftAccessibleSelectedText
          : enableAxisLeftAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis Left
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableAxisLeft,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisLeftTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick size',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisLeftTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisLeftTickSize,
      width: sliderWidth,
    };

  const axisLeftTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick padding',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisLeftTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisLeftTickPadding,
      width: sliderWidth,
    };

  const axisLeftTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick rotation',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisLeftTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisLeftTickRotation,
      width: sliderWidth,
    };

  const [axisLeftLegendErrorText, axisLeftLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis left legend',
      inputText: axisLeftLegend,
      isValidInputText: isAxisLeftLegendValid,
      isInputTextFocused: isAxisLeftLegendFocused,
      regexValidationText: returnSerialIdValidationText({
        content: axisLeftLegend,
        contentKind: 'axis left legend',
      }),
    });

  const axisLeftLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisLeftLegendErrorText,
      valid: axisLeftLegendValidText,
    },
    disabled: !enableAxisLeft,
    inputText: axisLeftLegend,
    isValidInputText: isAxisLeftLegendValid,
    label: '',
    onBlur: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisLeftLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setAxisLeftLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setIsAxisLeftLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis left legend text',
    required: false,
    semanticName: 'axis left legend',
  };

  const axisLeftLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left legend offset',
      disabled: !enableAxisLeft || !axisLeftLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setAxisLeftLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisLeftLegendOffset,
      width: sliderWidth,
    };

  // interactivity
  const createdEnableCrosshairSwitchInput = (
    <Switch
      aria-describedby={
        enableCrosshair
          ? enableCrosshairAccessibleSelectedText.props.id
          : enableCrosshairAccessibleDeselectedText.props.id
      }
      checked={enableCrosshair}
      description={
        enableCrosshair
          ? enableCrosshairAccessibleSelectedText
          : enableCrosshairAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Crosshair
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableCrosshair,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const crosshairTypeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LINE_CROSSHAIR_TYPE_DATA,
      description: 'Define crosshair type.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setCrosshairType,
          payload: event.currentTarget.value as NivoLineCrosshairType,
        });
      },
      value: crosshairType,
      width: sliderWidth,
    };

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
          Legend
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableLegend,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setLegendAnchor,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendDirection,
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
          Legend Justify
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableLegendJustify,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendTranslateX,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendTranslateY,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendItemWidth,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendItemHeight,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendItemsSpacing,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendItemDirection,
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 1,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendItemOpacity,
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
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: legendSymbolSize,
      width: sliderWidth,
    };

  const legendSymbolShapeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_SYMBOL_SHAPE_DATA,
      disabled: !enableLegend,
      description: 'Define legend symbol shape.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendSymbolShape,
          payload: event.currentTarget.value as NivoLegendSymbolShape,
        });
      },
      value: legendSymbolShape,
      width: sliderWidth,
    };

  const createdLegendSymbolBorderColorInput = (
    <ColorInput
      aria-describedby="legend symbol border color"
      color={legendSymbolBorderColor}
      disabled={!enableLegend}
      label="Legend symbol border color"
      onChange={(color: string) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendSymbolBorderColor,
          payload: color,
        });
      }}
      w={sliderWidth}
    />
  );

  const legendSymbolBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol border width',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 12,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendSymbolBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: legendSymbolBorderWidth,
      width: sliderWidth,
    };

  const legendSymbolSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol spacing',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 12,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setLegendSymbolSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 8,
      step: 1,
      value: legendSymbolSpacing,
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
          Animate
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableAnimate,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
    width: sliderWidth,
  };

  // input creation

  // reset all button
  const [createdResetAllButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Reset',
      leftIcon: <BiReset />,
      semanticDescription: 'Reset all inputs to their default values',
      semanticName: 'Reset All',
      buttonOnClick: () => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.resetChartToDefault,
          payload: modifiedResponsiveLineChartState,
        });
      },
    },
  ]);

  // base

  // base select inputs
  const [createdXScaleSelectInput, createdYScaleSelectInput] =
    returnAccessibleSelectInputElements([
      xScaleSelectInputCreatorInfo,
      yScaleSelectInputCreatorInfo,
    ]);

  // base slider inputs
  const [createdYScaleMinSliderInput, createdYScaleMaxSliderInput] =
    returnAccessibleSliderInputElements([
      yScaleMinSliderInputCreatorInfo,
      yScaleMaxSliderInputCreatorInfo,
    ]);

  // margin
  // margin slider inputs
  const [
    createdMarginTopSliderInput,
    createdMarginRightSliderInput,
    createdMarginBottomSliderInput,
    createdMarginLeftSliderInput,
  ] = returnAccessibleSliderInputElements([
    marginTopSliderInputCreatorInfo,
    marginRightSliderInputCreatorInfo,
    marginBottomSliderInputCreatorInfo,
    marginLeftSliderInputCreatorInfo,
  ]);

  // style
  // style select inputs
  const [
    createdLineCurveSelectInput,
    createdChartColorsSelectInput,
    createdAreaBlendModeSelectInput,
  ] = returnAccessibleSelectInputElements([
    lineCurveSelectInputCreatorInfo,
    chartColorsSelectInputCreatorInfo,
    areaBlendModeSelectInputCreatorInfo,
  ]);

  // style slider inputs
  const [createdLineWidthSliderInput, createdAreaOpacitySliderInput] =
    returnAccessibleSliderInputElements([
      lineWidthSliderInputCreatorInfo,
      areaOpacitySliderInputCreatorInfo,
    ]);

  // points
  // points slider inputs
  const [
    createdPointSizeSliderInput,
    createdPointBorderWidthSliderInput,
    createdPointLabelYOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    pointSizeSliderInputCreatorInfo,
    pointBorderWidthSliderInputCreatorInfo,
    pointLabelYOffsetSliderInputCreatorInfo,
  ]);

  // points select inputs
  const [createdPointLabelSelectInput] = returnAccessibleSelectInputElements([
    pointLabelSelectInputCreatorInfo,
  ]);

  // axes
  // axes slider inputs
  const [
    // axis top slider inputs
    createdAxisTopTickSizeSliderInput,
    createdAxisTopTickPaddingSliderInput,
    createdAxisTopTickRotationSliderInput,
    createdAxisTopLegendOffsetSliderInput,
    // axis right slider inputs
    createdAxisRightTickSizeSliderInput,
    createdAxisRightTickPaddingSliderInput,
    createdAxisRightTickRotationSliderInput,
    createdAxisRightLegendOffsetSliderInput,
    // axis bottom slider inputs
    createdAxisBottomTickSizeSliderInput,
    createdAxisBottomTickPaddingSliderInput,
    createdAxisBottomTickRotationSliderInput,
    createdAxisBottomLegendOffsetSliderInput,
    // axis left slider inputs
    createdAxisLeftTickSizeSliderInput,
    createdAxisLeftTickPaddingSliderInput,
    createdAxisLeftTickRotationSliderInput,
    createdAxisLeftLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    // axis top slider inputs
    axisTopTickSizeSliderInputCreatorInfo,
    axisTopTickPaddingSliderInputCreatorInfo,
    axisTopTickRotationSliderInputCreatorInfo,
    axisTopLegendOffsetSliderInputCreatorInfo,
    // axis right slider inputs
    axisRightTickSizeSliderInputCreatorInfo,
    axisRightTickPaddingSliderInputCreatorInfo,
    axisRightTickRotationSliderInputCreatorInfo,
    axisRightLegendOffsetSliderInputCreatorInfo,
    // axis bottom slider inputs
    axisBottomTickSizeSliderInputCreatorInfo,
    axisBottomTickPaddingSliderInputCreatorInfo,
    axisBottomTickRotationSliderInputCreatorInfo,
    axisBottomLegendOffsetSliderInputCreatorInfo,
    // axis left slider inputs
    axisLeftTickSizeSliderInputCreatorInfo,
    axisLeftTickPaddingSliderInputCreatorInfo,
    axisLeftTickRotationSliderInputCreatorInfo,
    axisLeftLegendOffsetSliderInputCreatorInfo,
  ]);

  // axes text inputs
  const [
    createdAxisTopLegendTextInput,
    createdAxisRightLegendTextInput,
    createdAxisBottomLegendTextInput,
    createdAxisLeftLegendTextInput,
  ] = returnAccessibleTextInputElements([
    axisTopLegendTextInputCreatorInfo,
    axisRightLegendTextInputCreatorInfo,
    axisBottomLegendTextInputCreatorInfo,
    axisLeftLegendTextInputCreatorInfo,
  ]);

  // interactivity
  const [createdCrosshairTypeSelectInput] = returnAccessibleSelectInputElements(
    [crosshairTypeSelectInputCreatorInfo]
  );

  // legend
  // legend slider inputs
  const [
    createdLegendTranslateXSliderInput,
    createdLegendTranslateYSliderInput,
    createdLegendItemWidthSliderInput,
    createdLegendItemHeightSliderInput,
    createdLegendItemsSpacingSliderInput,
    createdLegendItemOpacitySliderInput,
    createdLegendSymbolSizeSliderInput,
    createdLegendSymbolBorderWidthSliderInput,
    createdLegendSymbolSpacingSliderInput,
  ] = returnAccessibleSliderInputElements([
    legendTranslateXSliderInputCreatorInfo,
    legendTranslateYSliderInputCreatorInfo,
    legendItemWidthSliderInputCreatorInfo,
    legendItemHeightSliderInputCreatorInfo,
    legendItemsSpacingSliderInputCreatorInfo,
    legendItemOpacitySliderInputCreatorInfo,
    legendSymbolSizeSliderInputCreatorInfo,
    legendSymbolBorderWidthSliderInputCreatorInfo,
    legendSymbolSpacingSliderInputCreatorInfo,
  ]);

  // legend select inputs
  const [
    createdLegendAnchorSelectInput,
    createdLegendDirectionSelectInput,
    createdLegendItemDirectionSelectInput,
    createdLegendSymbolShapeSelectInput,
  ] = returnAccessibleSelectInputElements([
    legendAnchorSelectInputCreatorInfo,
    legendDirectionSelectInputCreatorInfo,
    legendItemDirectionSelectInputCreatorInfo,
    legendSymbolShapeSelectInputCreatorInfo,
  ]);

  // motion
  const [createdMotionConfigSelectInput] = returnAccessibleSelectInputElements([
    motionConfigSelectInputCreatorInfo,
  ]);

  // input display

  // title
  const displayResetButton = (
    <Tooltip label="Reset all inputs to their default values">
      <Group>{createdResetAllButton}</Group>
    </Tooltip>
  );

  const displayControlsHeading = (
    <Group p={padding} w="100%" position="apart">
      <Title order={3} color={textColor}>
        Calendar Controls
      </Title>
      {displayResetButton}
    </Group>
  );

  // base
  const displayBaseHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayXScaleSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdXScaleSelectInput}
      label="X scale"
      value={xScale}
    />
  );

  const displayYScaleSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdYScaleSelectInput}
      label="Y scale"
      value={yScale}
    />
  );

  const displayEnableYScaleStackedSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableYScaleStackedSwitchInput}
    </Group>
  );

  const displayEnableYScaleMinSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableYScaleMinSwitchInput}
    </Group>
  );

  const displayYScaleMinSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdYScaleMinSliderInput}
      isInputDisabled={!enableYScaleMin}
      label="Y scale min"
      value={yScaleMin}
    />
  );

  const displayEnableYScaleMaxSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableYScaleMaxSwitchInput}
    </Group>
  );

  const displayYScaleMaxSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdYScaleMaxSliderInput}
      isInputDisabled={!enableYScaleMax}
      label="Y scale max"
      value={yScaleMax}
    />
  );

  const displayReverseScaleSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdReverseScaleSwitchInput}
    </Group>
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayXScaleSelectInput}
      {displayYScaleSelectInput}
      {displayEnableYScaleStackedSwitchInput}
      {displayEnableYScaleMinSwitchInput}
      {displayYScaleMinSliderInput}
      {displayEnableYScaleMaxSwitchInput}
      {displayYScaleMaxSliderInput}
      {displayReverseScaleSwitchInput}
    </Stack>
  );

  // margin
  const displayMarginHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Margin
      </Title>
    </Group>
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdMarginTopSliderInput}
      label="Margin top"
      symbol="px"
      value={marginTop}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdMarginRightSliderInput}
      label="Margin right"
      symbol="px"
      value={marginRight}
    />
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdMarginBottomSliderInput}
      label="Margin bottom"
      symbol="px"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
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
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayLineCurveSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLineCurveSelectInput}
      label="Line curve"
      value={lineCurve}
    />
  );

  const displayChartColorsSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdChartColorsSelectInput}
      label="Chart colors"
      value={chartColors}
    />
  );

  const displayLineWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLineWidthSliderInput}
      label="Line width"
      symbol="px"
      value={lineWidth}
    />
  );

  const displayEnableAreaSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAreaSwitchInput}
    </Group>
  );

  const displayAreaOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAreaOpacitySliderInput}
      isInputDisabled={!enableArea}
      label="Area opacity"
      value={areaOpacity}
    />
  );

  const displayAreaBlendModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAreaBlendModeSelectInput}
      isInputDisabled={!enableArea}
      label="Area blend mode"
      value={areaBlendMode}
    />
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayLineCurveSelectInput}
      {displayChartColorsSelectInput}
      {displayLineWidthSliderInput}
      {displayEnableAreaSwitchInput}
      {displayAreaOpacitySliderInput}
      {displayAreaBlendModeSelectInput}
    </Stack>
  );

  // points
  const displayPointsHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Points
      </Title>
    </Group>
  );

  const displayEnablePointsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnablePointsSwitchInput}
    </Group>
  );

  const displayPointSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointSizeSliderInput}
      isInputDisabled={!enablePoints}
      label="Point size"
      symbol="px"
      value={pointSize}
    />
  );

  const displayPointColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointColorInput}
      isInputDisabled={!enablePoints}
      label="Point color"
      value={pointColor}
    />
  );

  const displayPointBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointBorderWidthSliderInput}
      isInputDisabled={!enablePoints}
      label="Point border width"
      symbol="px"
      value={pointBorderWidth}
    />
  );

  const displayPointBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointBorderColorInput}
      isInputDisabled={!enablePoints}
      label="Point border color"
      value={pointBorderColor}
    />
  );

  const displayEnablePointLabelSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnablePointLabelSwitchInput}
    </Group>
  );

  const displayPointLabelSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointLabelSelectInput}
      isInputDisabled={!enablePointLabel}
      label="Point label"
      value={pointLabel}
    />
  );

  const displayPointLabelYOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdPointLabelYOffsetSliderInput}
      isInputDisabled={!enablePointLabel}
      label="Point label Y offset"
      symbol="px"
      value={pointLabelYOffset}
    />
  );

  const displayPointsSection = (
    <Stack w="100%">
      {displayPointsHeading}
      {displayEnablePointsSwitchInput}
      {displayPointSizeSliderInput}
      {displayPointColorInput}
      {displayPointBorderWidthSliderInput}
      {displayPointBorderColorInput}
      {displayEnablePointLabelSwitchInput}
      {displayPointLabelSelectInput}
      {displayPointLabelYOffsetSliderInput}
    </Stack>
  );

  // grids
  const displayGridsHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Grids
      </Title>
    </Group>
  );

  const displayEnableGridXSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableGridXSwitchInput}
    </Group>
  );

  const displayEnableGridYSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableGridYSwitchInput}
    </Group>
  );

  const displayGridsSection = (
    <Stack w="100%">
      {displayGridsHeading}
      {displayEnableGridXSwitchInput}
      {displayEnableGridYSwitchInput}
    </Stack>
  );

  // axes
  // axes top
  const displayAxisTopHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Top
      </Title>
    </Group>
  );

  const displayEnableAxisTopSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisTopSwitchInput}
    </Group>
  );

  const displayAxisTopTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisTopTickSizeSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick size"
      symbol="px"
      value={axisTopTickSize}
    />
  );

  const displayAxisTopTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisTopTickPaddingSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick padding"
      symbol="px"
      value={axisTopTickPadding}
    />
  );

  const displayAxisTopTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisTopTickRotationSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick rotation"
      symbol="°"
      value={axisTopTickRotation}
    />
  );

  const displayAxisTopLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisTopLegendTextInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top legend"
      value={axisTopLegend}
    />
  );

  const displayAxisTopLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisTopLegendOffsetSliderInput}
      isInputDisabled={!enableAxisTop || !axisTopLegend}
      label="Axis top legend offset"
      symbol="px"
      value={axisTopLegendOffset}
    />
  );

  const displayAxisTopSection = (
    <Stack w="100%">
      {displayAxisTopHeading}
      {displayEnableAxisTopSwitchInput}
      {displayAxisTopTickSizeSliderInput}
      {displayAxisTopTickPaddingSliderInput}
      {displayAxisTopTickRotationSliderInput}
      {displayAxisTopLegendTextInput}
      {displayAxisTopLegendOffsetSliderInput}
    </Stack>
  );

  // axes right
  const displayAxisRightHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Right
      </Title>
    </Group>
  );

  const displayEnableAxisRightSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisRightSwitchInput}
    </Group>
  );

  const displayAxisRightTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisRightTickSizeSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick size"
      symbol="px"
      value={axisRightTickSize}
    />
  );

  const displayAxisRightTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisRightTickPaddingSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick padding"
      symbol="px"
      value={axisRightTickPadding}
    />
  );

  const displayAxisRightTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisRightTickRotationSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick rotation"
      symbol="°"
      value={axisRightTickRotation}
    />
  );

  const displayAxisRightLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisRightLegendTextInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right legend"
      value={axisRightLegend}
    />
  );

  const displayAxisRightLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisRightLegendOffsetSliderInput}
      isInputDisabled={!enableAxisRight || !axisRightLegend}
      label="Axis right legend offset"
      symbol="px"
      value={axisRightLegendOffset}
    />
  );

  const displayAxisRightSection = (
    <Stack w="100%">
      {displayAxisRightHeading}
      {displayEnableAxisRightSwitchInput}
      {displayAxisRightTickSizeSliderInput}
      {displayAxisRightTickPaddingSliderInput}
      {displayAxisRightTickRotationSliderInput}
      {displayAxisRightLegendTextInput}
      {displayAxisRightLegendOffsetSliderInput}
    </Stack>
  );

  // axes bottom
  const displayAxisBottomHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Bottom
      </Title>
    </Group>
  );

  const displayEnableAxisBottomSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisBottomSwitchInput}
    </Group>
  );

  const displayAxisBottomTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisBottomTickSizeSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick size"
      symbol="px"
      value={axisBottomTickSize}
    />
  );

  const displayAxisBottomTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisBottomTickPaddingSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick padding"
      symbol="px"
      value={axisBottomTickPadding}
    />
  );

  const displayAxisBottomTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisBottomTickRotationSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick rotation"
      symbol="°"
      value={axisBottomTickRotation}
    />
  );

  const displayAxisBottomLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisBottomLegendTextInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom legend"
      value={axisBottomLegend}
    />
  );

  const displayAxisBottomLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisBottomLegendOffsetSliderInput}
      isInputDisabled={!enableAxisBottom || !axisBottomLegend}
      label="Axis bottom legend offset"
      symbol="px"
      value={axisBottomLegendOffset}
    />
  );

  const displayAxisBottomSection = (
    <Stack w="100%">
      {displayAxisBottomHeading}
      {displayEnableAxisBottomSwitchInput}
      {displayAxisBottomTickSizeSliderInput}
      {displayAxisBottomTickPaddingSliderInput}
      {displayAxisBottomTickRotationSliderInput}
      {displayAxisBottomLegendTextInput}
      {displayAxisBottomLegendOffsetSliderInput}
    </Stack>
  );

  // axes left
  const displayAxisLeftHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Left
      </Title>
    </Group>
  );

  const displayEnableAxisLeftSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisLeftSwitchInput}
    </Group>
  );

  const displayAxisLeftTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisLeftTickSizeSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick size"
      symbol="px"
      value={axisLeftTickSize}
    />
  );

  const displayAxisLeftTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisLeftTickPaddingSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick padding"
      symbol="px"
      value={axisLeftTickPadding}
    />
  );

  const displayAxisLeftTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisLeftTickRotationSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick rotation"
      symbol="°"
      value={axisLeftTickRotation}
    />
  );

  const displayAxisLeftLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      // initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisLeftLegendTextInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left legend"
      value={axisLeftLegend}
    />
  );

  const displayAxisLeftLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdAxisLeftLegendOffsetSliderInput}
      isInputDisabled={!enableAxisLeft || !axisLeftLegend}
      label="Axis left legend offset"
      symbol="px"
      value={axisLeftLegendOffset}
    />
  );

  const displayAxisLeftSection = (
    <Stack w="100%">
      {displayAxisLeftHeading}
      {displayEnableAxisLeftSwitchInput}
      {displayAxisLeftTickSizeSliderInput}
      {displayAxisLeftTickPaddingSliderInput}
      {displayAxisLeftTickRotationSliderInput}
      {displayAxisLeftLegendTextInput}
      {displayAxisLeftLegendOffsetSliderInput}
    </Stack>
  );

  const displayAxesSection = (
    <Stack w="100%">
      {displayAxisTopSection}
      {displayAxisRightSection}
      {displayAxisBottomSection}
      {displayAxisLeftSection}
    </Stack>
  );

  // interactivity
  const displayInteractivityHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Interactivity
      </Title>
    </Group>
  );

  const displayEnableCrosshairSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableCrosshairSwitchInput}
    </Group>
  );

  const displayCrosshairTypeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdCrosshairTypeSelectInput}
      isInputDisabled={!enableCrosshair}
      label="Crosshair type"
      value={crosshairType}
    />
  );

  const displayInteractivitySection = (
    <Stack w="100%">
      {displayInteractivityHeading}
      {displayEnableCrosshairSwitchInput}
      {displayCrosshairTypeSelectInput}
    </Stack>
  );

  // legends
  const displayLegendsHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Legends
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
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendAnchorSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend anchor"
      value={legendAnchor}
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
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
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate X"
      symbol="px"
      value={legendTranslateX}
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate Y"
      symbol="px"
      value={legendTranslateY}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      symbol="px"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      symbol="px"
      value={legendItemHeight}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      symbol="px"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendItemDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend item direction"
      value={legendItemDirection}
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendItemOpacitySliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item opacity"
      value={legendItemOpacity}
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendSymbolSizeSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol size"
      symbol="px"
      value={legendSymbolSize}
    />
  );

  const displayLegendSymbolShapeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendSymbolShapeSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol shape"
      value={legendSymbolShape}
    />
  );

  const displayLegendSymbolBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendSymbolBorderColorInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol border color"
      value={legendSymbolBorderColor}
    />
  );

  const displayLegendSymbolBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendSymbolBorderWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol border width"
      symbol="px"
      value={legendSymbolBorderWidth}
    />
  );

  const displayLegendSymbolSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveLineChartState}
      input={createdLegendSymbolSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol spacing"
      symbol="px"
      value={legendSymbolSpacing}
    />
  );

  const displayLegendsSection = (
    <Stack w="100%">
      {displayLegendsHeading}
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
      {displayLegendSymbolShapeSelectInput}
      {displayLegendSymbolBorderColorInput}
      {displayLegendSymbolBorderWidthSliderInput}
      {displayLegendSymbolSpacingSliderInput}
    </Stack>
  );

  // motion
  const displayMotionHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
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
      initialChartState={modifiedResponsiveLineChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayEnableAnimateSwitchInput}
      {displayMotionConfigSelectInput}
    </Stack>
  );

  const lineChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayControlsHeading}
      {displayBaseSection}
      {displayMarginSection}
      {displayStyleSection}
      {displayPointsSection}
      {displayGridsSection}
      {displayAxesSection}
      {displayInteractivitySection}
      {displayLegendsSection}
      {displayMotionSection}
    </Flex>
  );

  const displayLineChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h={width < 1192 ? '38vh' : '70vh'} py={padding}>
        <Grid.Col span={1}>{lineChartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
  );

  const data = [
    {
      id: 'japan',
      color: 'hsl(210, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 230,
        },
        {
          x: 'helicopter',
          y: 82,
        },
        {
          x: 'boat',
          y: 112,
        },
        {
          x: 'train',
          y: 185,
        },
        {
          x: 'subway',
          y: 129,
        },
        {
          x: 'bus',
          y: 75,
        },
        {
          x: 'car',
          y: 33,
        },
        {
          x: 'moto',
          y: 264,
        },
        {
          x: 'bicycle',
          y: 297,
        },
        {
          x: 'horse',
          y: 255,
        },
        {
          x: 'skateboard',
          y: 197,
        },
        {
          x: 'others',
          y: 238,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(184, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 32,
        },
        {
          x: 'helicopter',
          y: 200,
        },
        {
          x: 'boat',
          y: 284,
        },
        {
          x: 'train',
          y: 74,
        },
        {
          x: 'subway',
          y: 114,
        },
        {
          x: 'bus',
          y: 263,
        },
        {
          x: 'car',
          y: 120,
        },
        {
          x: 'moto',
          y: 285,
        },
        {
          x: 'bicycle',
          y: 35,
        },
        {
          x: 'horse',
          y: 291,
        },
        {
          x: 'skateboard',
          y: 12,
        },
        {
          x: 'others',
          y: 39,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(7, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 236,
        },
        {
          x: 'helicopter',
          y: 133,
        },
        {
          x: 'boat',
          y: 195,
        },
        {
          x: 'train',
          y: 194,
        },
        {
          x: 'subway',
          y: 297,
        },
        {
          x: 'bus',
          y: 86,
        },
        {
          x: 'car',
          y: 280,
        },
        {
          x: 'moto',
          y: 60,
        },
        {
          x: 'bicycle',
          y: 61,
        },
        {
          x: 'horse',
          y: 135,
        },
        {
          x: 'skateboard',
          y: 92,
        },
        {
          x: 'others',
          y: 44,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(167, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 287,
        },
        {
          x: 'helicopter',
          y: 67,
        },
        {
          x: 'boat',
          y: 9,
        },
        {
          x: 'train',
          y: 55,
        },
        {
          x: 'subway',
          y: 187,
        },
        {
          x: 'bus',
          y: 30,
        },
        {
          x: 'car',
          y: 241,
        },
        {
          x: 'moto',
          y: 200,
        },
        {
          x: 'bicycle',
          y: 22,
        },
        {
          x: 'horse',
          y: 98,
        },
        {
          x: 'skateboard',
          y: 8,
        },
        {
          x: 'others',
          y: 69,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(87, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 250,
        },
        {
          x: 'helicopter',
          y: 237,
        },
        {
          x: 'boat',
          y: 135,
        },
        {
          x: 'train',
          y: 95,
        },
        {
          x: 'subway',
          y: 181,
        },
        {
          x: 'bus',
          y: 285,
        },
        {
          x: 'car',
          y: 251,
        },
        {
          x: 'moto',
          y: 111,
        },
        {
          x: 'bicycle',
          y: 115,
        },
        {
          x: 'horse',
          y: 37,
        },
        {
          x: 'skateboard',
          y: 43,
        },
        {
          x: 'others',
          y: 259,
        },
      ],
    },
  ];

  const displayResponsiveLine = (
    <ResponsiveLine
      data={data}
      // base
      xScale={{ type: xScale }}
      yScale={{
        type: yScale,
        min: enableYScaleMin ? yScaleMin : 'auto',
        max: enableYScaleMax ? yScaleMax : 'auto',
        stacked: enableYScaleStacked,
        reverse: reverseScale,
      }}
      yFormat=" >-.2f"
      // margin
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      // style
      curve={lineCurve}
      colors={{ scheme: chartColors }}
      lineWidth={lineWidth}
      enableArea={enableArea}
      areaOpacity={areaOpacity}
      areaBlendMode={areaBlendMode}
      defs={NIVO_CHART_PATTERN_DEFS}
      // points
      enablePoints={enablePoints}
      pointSize={pointSize}
      pointColor={pointColor}
      pointBorderWidth={pointBorderWidth}
      pointBorderColor={pointBorderColor}
      enablePointLabel={enablePointLabel}
      pointLabel={pointLabel}
      pointLabelYOffset={pointLabelYOffset}
      // grids
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      // axes
      axisTop={
        enableAxisTop
          ? {
              tickSize: axisTopTickSize,
              tickPadding: axisTopTickPadding,
              tickRotation: axisTopTickRotation,
              legend: axisTopLegend,
              legendOffset: axisTopLegendOffset,
            }
          : null
      }
      axisRight={
        enableAxisRight
          ? {
              tickSize: axisRightTickSize,
              tickPadding: axisRightTickPadding,
              tickRotation: axisRightTickRotation,
              legend: axisRightLegend,
              legendOffset: axisRightLegendOffset,
            }
          : null
      }
      axisBottom={
        enableAxisBottom
          ? {
              tickSize: axisBottomTickSize,
              tickPadding: axisBottomTickPadding,
              tickRotation: axisBottomTickRotation,
              legend: axisBottomLegend,
              legendOffset: axisBottomLegendOffset,
            }
          : null
      }
      axisLeft={
        enableAxisLeft
          ? {
              tickSize: axisLeftTickSize,
              tickPadding: axisLeftTickPadding,
              tickRotation: axisLeftTickRotation,
              legend: axisLeftLegend,
              legendOffset: axisLeftLegendOffset,
            }
          : null
      }
      // interactivity
      isInteractive={true}
      enableCrosshair={enableCrosshair}
      crosshairType={crosshairType}
      useMesh={true}
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
                itemsSpacing: legendItemsSpacing,
                itemDirection: legendItemDirection,
                itemWidth: legendItemWidth,
                itemHeight: legendItemHeight,
                itemOpacity: legendItemOpacity,
                symbolSize: legendSymbolSize,
                symbolShape: legendSymbolShape,
                symbolBorderColor: legendSymbolBorderColor,
                symbolBorderWidth: legendSymbolBorderWidth,
                symbolSpacing: legendSymbolSpacing,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
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
    />
  );

  const displayResponsiveLineChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayLineChartControls}
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
        {displayResponsiveLine}
      </Grid.Col>
    </Grid>
  );

  return displayResponsiveLineChartComponent;
}

export { ResponsiveLineChart };
