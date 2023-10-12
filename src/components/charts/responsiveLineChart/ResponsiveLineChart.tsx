import { ColorInput, Switch, Text } from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { SERIAL_ID_REGEX } from '../../../constants/regex';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
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
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_MOTION_CONFIG_DATA,
} from '../constants';
import {
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
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

  /**
   *  const [reverseAccessibleAccessibleSelectedText, reverseAccessibleAccessibleDeselectedText] =
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
    enableYScaleStackedAccessibleSelectedText,
    enableYScaleStackedAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Lines will be stacked',
    isSelected: enableYScaleStacked,
    selectedDescription: 'Lines will not be stacked',
    semanticName: 'enableYScaleStacked',
    theme: 'muted',
  });

  const [
    enableYScaleMinAccessibleSelectedText,
    enableYScaleMinAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Y scale min will be automatically calculated',
    isSelected: enableYScaleMin,
    selectedDescription: 'Y scale min will be manually calculated',
    semanticName: 'enableYScaleMin',
    theme: 'muted',
  });

  const [
    enableYScaleMaxAccessibleSelectedText,
    enableYScaleMaxAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Y scale max will be automatically calculated',
    isSelected: enableYScaleMax,
    selectedDescription: 'Y scale max will be manually calculated',
    semanticName: 'enableYScaleMax',
    theme: 'muted',
  });

  const [enableAreaAccessibleSelectedText, enableAreaAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      deselectedDescription: 'Area below each line will be disabled',
      isSelected: enableArea,
      selectedDescription: 'Area below each line will be enabled',
      semanticName: 'enableArea',
      theme: 'muted',
    });

  const [
    enablePointsAccessibleSelectedText,
    enablePointsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Points will be disabled',
    isSelected: enablePoints,
    selectedDescription: 'Points will be enabled',
    semanticName: 'enablePoints',
    theme: 'muted',
  });

  const [
    enablePointLabelAccessibleSelectedText,
    enablePointLabelAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Point label will be disabled',
    isSelected: enablePointLabel,
    selectedDescription: 'Point label will be enabled',
    semanticName: 'enablePointLabel',
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
    semanticName: 'enableGridX',
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
    semanticName: 'enableGridY',
    theme: 'muted',
  });

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Top axis will be disabled',
    isSelected: enableAxisTop,
    selectedDescription: 'Top axis will be enabled',
    semanticName: 'enableAxisTop',
    theme: 'muted',
  });

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Right axis will be disabled',
    isSelected: enableAxisRight,
    selectedDescription: 'Right axis will be enabled',
    semanticName: 'enableAxisRight',
    theme: 'muted',
  });

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bottom axis will be disabled',
    isSelected: enableAxisBottom,
    selectedDescription: 'Bottom axis will be enabled',
    semanticName: 'enableAxisBottom',
    theme: 'muted',
  });

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Left axis will be disabled',
    isSelected: enableAxisLeft,
    selectedDescription: 'Left axis will be enabled',
    semanticName: 'enableAxisLeft',
    theme: 'muted',
  });

  const [
    enableCrosshairAccessibleSelectedText,
    enableCrosshairAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Crosshair will be disabled',
    isSelected: enableCrosshair,
    selectedDescription: 'Crosshair will be enabled',
    semanticName: 'enableCrosshair',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be disabled',
    isSelected: enableLegend,
    selectedDescription: 'Legend will be enabled',
    semanticName: 'enableLegend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend items and symbols will not be justified',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend items and symbols will be justified',
    semanticName: 'enableLegendJustify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Animation will be disabled',
    isSelected: enableAnimate,
    selectedDescription: 'Animation will be enabled',
    semanticName: 'enableAnimate',
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

  /**
   * const createdEnableMaxValueSwitchInput = (
    <Switch
      aria-describedby={
        enableMaxValue
          ? enableMaxValueAccessibleAccessibleSelectedText.props.id
          : enableMaxValueAccessibleAccessibleDeselectedText.props.id
      }
      checked={enableMaxValue}
      description={
        enableMaxValue
          ? enableMaxValueAccessibleAccessibleSelectedText
          : enableMaxValueAccessibleAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle max value
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setEnableMaxValue,
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
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setMaxValue,
        payload: value,
      });
    },
    sliderDefaultValue: 1000,
    step: 1,
    value: maxValue,
    width: sliderWidth,
  };

  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: 'Define chart chartColors.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveLineChartDispatch({
        type: responsiveLineChartAction.setChartColors,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const createdTracksColorInput = (
    <ColorInput
      aria-label="Tracks color"
      color={tracksColor}
      disabled={!enableTracks}
      onChange={(color: string) => {
        responsiveLineChartDispatch({
          type: responsiveLineChartAction.setTracksColor,
          payload: color,
        });
      }}
      value={tracksColor}
      w={sliderWidth}
    />
  );

   */

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
          Toggle y scale stacked
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
          Toggle y scale min
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
          Toggle y scale max
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
          Toggle area
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
          Toggle points
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
          Toggle point label
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
          Toggle grid x
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
          Toggle grid y
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
          Toggle axis top
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
      disabled: !enableAxisTop,
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
          Toggle axis right
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
      disabled: !enableAxisRight,
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
          Axis bottom
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
      disabled: !enableAxisBottom,
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
          Axis left
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
      disabled: !enableAxisLeft,
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
          Toggle crosshair
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
          Legend justify
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

  return <></>;
}

export { ResponsiveLineChart };
