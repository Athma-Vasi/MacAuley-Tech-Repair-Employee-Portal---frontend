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
import { ResponsiveBar } from '@nivo/bar';
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
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  BAR_CHART_GROUP_MODE_SELECT_DATA,
  BAR_CHART_LAYOUT_SELECT_DATA,
  BAR_CHART_VALUE_SCALE_SELECT_DATA,
} from './constants';
import {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
} from './state';
import { ResponsiveBarChartState } from './types';
import { BiReset } from 'react-icons/bi';

function ResponsiveBarChart() {
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
  const modifiedInitialResponsiveBarChartState: ResponsiveBarChartState = {
    ...initialResponsiveBarChartState,
    chartBorderColor: chartTextColor,
    labelTextColor: chartTextColor,
  };

  const [responsiveBarChartState, responsiveBarChartDispatch] = useReducer(
    responsiveBarChartReducer,
    modifiedInitialResponsiveBarChartState
  );

  const {
    /** base */
    groupMode, // default: stacked
    layout, // default: horizontal
    valueScale, // default: linear
    reverse, // default: false
    // scale
    enableMinValue, // default: false ? minValue is undefined
    minValue, // default: -1000 step: 1
    enableMaxValue, // default: false ? maxValue is undefined
    maxValue, // default: 1000 step: 1
    paddingBar, // 0.1 - 0.9 default: 0.1 step: 0.1
    innerPaddingBar, // 0 - 10 default: 0 step: 1

    // base -> margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    /** style */
    chartColors, // default: nivo
    chartBorderRadius, // 0px - 36px default: 0 step: 1
    chartBorderWidth, // 0px - 20px default: 0 step: 1
    chartBorderColor, // default: #ffffff
    fillPatterns,
    enableFillPatterns, // default: false

    /** labels */
    enableLabels, // default: true
    labelSkipWidth, // 0 - 36 default: 0 step: 1
    labelSkipHeight, // 0 - 36 default: 0 step: 1
    labelTextColor, // default: #ffffff

    /** grid and axes */
    enableGridX, // default: false
    enableGridY, // default: true
    // axisTop
    enableAxisTop, // default: false ? null
    axisTopTickSize, // 0 - 20 default: 5 step: 1
    axisTopTickPadding, // 0 - 20 default: 5 step: 1
    axisTopTickRotation, // -90 - 90 default: 0 step: 1
    axisTopLegend, // default: ''
    isAxisTopLegendValid, // default: false
    isAxisTopLegendFocused, // default: false
    axisTopLegendOffset, // -60px - 60px default: 0 step: 1
    // axisRight
    enableAxisRight, // default: false ? null
    axisRightTickSize, // 0 - 20 default: 5 step: 1
    axisRightTickPadding, // 0 - 20 default: 5 step: 1
    axisRightTickRotation, // -90 - 90 default: 0 step: 1
    axisRightLegend, // default: ''
    isAxisRightLegendValid, // default: false
    isAxisRightLegendFocused, // default: false
    axisRightLegendOffset, // -60px - 60px default: 0 step: 1
    // axisBottom
    enableAxisBottom, // default: true
    axisBottomTickSize, // 0 - 20 default: 5 step: 1
    axisBottomTickPadding, // 0 - 20 default: 5 step: 1
    axisBottomTickRotation, // -90 - 90 default: 0 step: 1
    axisBottomLegend, // default: ''
    isAxisBottomLegendValid, // default: false
    isAxisBottomLegendFocused, // default: false
    axisBottomLegendOffset, // -60px - 60px default: 0 step: 1
    // axisLeft
    enableAxisLeft, // default: false ? null
    axisLeftTickSize, // 0 - 20 default: 5 step: 1
    axisLeftTickPadding, // 0 - 20 default: 5 step: 1
    axisLeftTickRotation, // -90 - 90 default: 0 step: 1
    axisLeftLegend, // default: ''
    isAxisLeftLegendValid, // default: false
    isAxisLeftLegendFocused, // default: false
    axisLeftLegendOffset, // -60px - 60px default: 0 step: 1

    /** legend */
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

    /** motion */
    enableAnimate, // default: true
    motionConfig, // default: default
  } = responsiveBarChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  // validate axisTopLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisTopLegend);

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setIsAxisTopLegendValid,
      payload: isValid,
    });
  }, [axisTopLegend]);

  // validate axisRightLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisRightLegend);

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setIsAxisRightLegendValid,
      payload: isValid,
    });
  }, [axisRightLegend]);

  // validate axisBottomLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisBottomLegend);

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setIsAxisBottomLegendValid,
      payload: isValid,
    });
  }, [axisBottomLegend]);

  // validate axisLeftLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisLeftLegend);

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setIsAxisLeftLegendValid,
      payload: isValid,
    });
  }, [axisLeftLegend]);

  const [reverseAccessibleSelectedText, reverseAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      deselectedDescription:
        'Bars will start on bottom instead of top for vertical layout and left instead of right for horizontal one',
      isSelected: reverse,
      selectedDescription:
        'Bars will start on top instead of bottom for vertical layout and right instead of left for horizontal one',
      semanticName: 'reverse',
      theme: 'muted',
    });

  const [
    enableMinValueAccessibleSelectedText,
    enableMinValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Min value will be automatically calculated.',
    isSelected: enableMinValue,
    selectedDescription: 'Min value is user defined.',
    semanticName: 'min value',
    theme: 'muted',
  });

  const [
    enableMaxValueAccessibleSelectedText,
    enableMaxValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Max value will be automatically calculated.',
    isSelected: enableMaxValue,
    selectedDescription: 'Max value is user defined.',
    semanticName: 'max value',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bars will be filled with a solid color.',
    isSelected: enableFillPatterns,
    selectedDescription: 'Bars will be filled with a pattern.',
    semanticName: 'fill patterns',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bars will not have labels.',
    isSelected: enableLabels,
    selectedDescription: 'Bars will have labels.',
    semanticName: 'labels',
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
    semanticName: 'grid x',
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
    semanticName: 'grid y',
    theme: 'muted',
  });

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on top.',
    isSelected: enableAxisTop,
    selectedDescription: 'Chart will have an axis on top.',
    semanticName: 'axis top',
    theme: 'muted',
  });

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the right.',
    isSelected: enableAxisRight,
    selectedDescription: 'Chart will have an axis on the right.',
    semanticName: 'axis right',
    theme: 'muted',
  });

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the bottom.',
    isSelected: enableAxisBottom,
    selectedDescription: 'Chart will have an axis on the bottom.',
    semanticName: 'axis bottom',
    theme: 'muted',
  });

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the left.',
    isSelected: enableAxisLeft,
    selectedDescription: 'Chart will have an axis on the left.',
    semanticName: 'axis left',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have legend.',
    isSelected: enableLegend,
    selectedDescription: 'Chart will have legend.',
    semanticName: 'legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will not be justified.',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend will be justified.',
    semanticName: 'legend justify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not animate.',
    isSelected: enableAnimate,
    selectedDescription: 'Chart will animate.',
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

  const groupModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: BAR_CHART_GROUP_MODE_SELECT_DATA,
    description: 'Define how bars are grouped together.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setGroupMode,
        payload: event.currentTarget.value as 'stacked' | 'grouped',
      });
    },
    value: groupMode,
    width: sliderWidth,
  };

  const layoutSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: BAR_CHART_LAYOUT_SELECT_DATA,
    description: 'Define the chart layout.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setLayout,
        payload: event.currentTarget.value as 'horizontal' | 'vertical',
      });
    },
    value: layout,
    width: sliderWidth,
  };

  const valueScaleSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: BAR_CHART_VALUE_SCALE_SELECT_DATA,
    description: 'Define the scale of the chart.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setValueScale,
        payload: event.currentTarget.value as 'linear' | 'symlog',
      });
    },
    value: valueScale,
    width: sliderWidth,
  };

  const createdReverseSwitchInput = (
    <Switch
      aria-describedby={
        reverse
          ? reverseAccessibleSelectedText.props.id
          : reverseAccessibleDeselectedText.props.id
      }
      checked={reverse}
      description={
        reverse
          ? reverseAccessibleSelectedText
          : reverseAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Reverse
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setReverse,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdEnableMinValueSwitchInput = (
    <Switch
      aria-describedby={
        enableMinValue
          ? enableMinValueAccessibleSelectedText.props.id
          : enableMinValueAccessibleDeselectedText.props.id
      }
      checked={enableMinValue}
      description={
        enableMinValue
          ? enableMinValueAccessibleSelectedText
          : enableMinValueAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle min value
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableMinValue,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const minValueSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'min value',
    disabled: !enableMinValue,
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 0,
    min: -1000,
    onChangeSlider: (value: number) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMinValue,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: minValue,
    width: sliderWidth,
  };

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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableMaxValue,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMaxValue,
        payload: value,
      });
    },
    sliderDefaultValue: 1000,
    step: 1,
    value: maxValue,
    width: sliderWidth,
  };

  const paddingBarSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'padding bar',
    kind: 'slider',
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
    max: 0.9,
    min: 0.1,
    onChangeSlider: (value: number) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setPaddingBar,
        payload: value,
      });
    },
    sliderDefaultValue: 0.1,
    step: 0.1,
    value: paddingBar,
    width: sliderWidth,
  };

  const innerPaddingBarSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'inner padding bar',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 10,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setInnerPaddingBar,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: innerPaddingBar,
      width: sliderWidth,
    };

  const marginTopSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin top',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 200,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMarginTop,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMarginRight,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMarginBottom,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginLeft,
    width: sliderWidth,
  };

  /** style */
  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: 'Define chart colors.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setChartColors,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const chartBorderRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'border radius',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      step: 1,
      onChangeSlider: (value: number) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setChartBorderRadius,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      value: chartBorderRadius,
      width: sliderWidth,
    };

  const chartBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setChartBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: chartBorderWidth,
      width: sliderWidth,
    };

  const createdChartBorderColorInput = (
    <ColorInput
      aria-label="Border color"
      color={chartBorderColor}
      onChange={(color: string) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setChartBorderColor,
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
          Fill patterns
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableFillPatterns,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  /** labels */
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
          Labels
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const labelSkipWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'label skip width',
      disabled: !enableLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLabelSkipWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: labelSkipWidth,
      width: sliderWidth,
    };

  const labelSkipHeightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'label skip height',
      disabled: !enableLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLabelSkipHeight,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: labelSkipHeight,
      width: sliderWidth,
    };

  const createdLabelTextColorInput = (
    <ColorInput
      aria-label="Label text color"
      color={labelTextColor}
      disabled={!enableLabels}
      onChange={(color: string) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLabelTextColor,
          payload: color,
        });
      }}
      value={labelTextColor}
      w={sliderWidth}
    />
  );

  /** grid and axes */
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
          Grid X
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableGridX,
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
          Grid Y
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableGridY,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  /** axis top */
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
          Axis top
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableAxisTop,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisTopTickSize,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisTopTickPadding,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisTopTickRotation,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisTopLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setAxisTopLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisTopLegendFocused,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisTopLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisTopLegendOffset,
      width: sliderWidth,
    };

  // axis right
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
          Axis right
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableAxisRight,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisRightTickSize,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisRightTickPadding,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisRightTickRotation,
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
      isValidInputText: isAxisRightLegendValid,
      isInputTextFocused: isAxisRightLegendFocused,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisRightLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setAxisRightLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisRightLegendFocused,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisRightLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisRightLegendOffset,
      width: sliderWidth,
    };

  // axis bottom
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableAxisBottom,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisBottomTickSize,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisBottomTickPadding,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisBottomTickRotation,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisBottomLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setAxisBottomLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisBottomLegendFocused,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisBottomLegendOffset,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableAxisLeft,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisLeftTickSize,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisLeftTickPadding,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisLeftTickRotation,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisLeftLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setAxisLeftLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setIsAxisLeftLegendFocused,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setAxisLeftLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisLeftLegendOffset,
      width: sliderWidth,
    };

  /** legend */
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableLegend,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setLegendAnchor,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendDirection,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableLegendJustify,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendTranslateX,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendTranslateY,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendItemWidth,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendItemHeight,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendItemsSpacing,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendItemDirection,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendItemOpacity,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: legendSymbolSize,
      width: sliderWidth,
    };

  /** motion */
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableAnimate,
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
      responsiveBarChartDispatch({
        type: responsiveBarChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.resetChartToDefault,
          payload: modifiedInitialResponsiveBarChartState,
        });
      },
    },
  ]);

  // input creation

  /** base */
  const [
    createdGroupModeSelectInput,
    createdLayoutSelectInput,
    createdValueScaleSelectInput,
  ] = returnAccessibleSelectInputElements([
    groupModeSelectInputCreatorInfo,
    layoutSelectInputCreatorInfo,
    valueScaleSelectInputCreatorInfo,
  ]);

  const [
    createdMinValueSliderInput,
    createdMaxValueSliderInput,
    createdPaddingBarSliderInput,
    createdInnerPaddingBarSliderInput,
    createdMarginTopSliderInput,
    createdMarginRightSliderInput,
    createdMarginBottomSliderInput,
    createdMarginLeftSliderInput,
  ] = returnAccessibleSliderInputElements([
    minValueSliderInputCreatorInfo,
    maxValueSliderInputCreatorInfo,
    paddingBarSliderInputCreatorInfo,
    innerPaddingBarSliderInputCreatorInfo,
    marginTopSliderInputCreatorInfo,
    marginRightSliderInputCreatorInfo,
    marginBottomSliderInputCreatorInfo,
    marginLeftSliderInputCreatorInfo,
  ]);

  /** style */
  const [createdColorsSelectInput] = returnAccessibleSelectInputElements([
    chartColorsSelectInputCreatorInfo,
  ]);

  const [
    createdChartBorderRadiusSliderInput,
    createdChartBorderWidthSliderInput,
  ] = returnAccessibleSliderInputElements([
    chartBorderRadiusSliderInputCreatorInfo,
    chartBorderWidthSliderInputCreatorInfo,
  ]);

  /** labels */
  const [createdLabelSkipWidthSliderInput, createdLabelSkipHeightSliderInput] =
    returnAccessibleSliderInputElements([
      labelSkipWidthSliderInputCreatorInfo,
      labelSkipHeightSliderInputCreatorInfo,
    ]);

  /** grid and axes */

  // slider inputs
  const [
    // axis top
    createdAxisTopTickSizeSliderInput,
    createdAxisTopTickPaddingSliderInput,
    createdAxisTopTickRotationSliderInput,
    createdAxisTopLegendOffsetSliderInput,
    // axis right
    createdAxisRightTickSizeSliderInput,
    createdAxisRightTickPaddingSliderInput,
    createdAxisRightTickRotationSliderInput,
    createdAxisRightLegendOffsetSliderInput,
    // axis bottom
    createdAxisBottomTickSizeSliderInput,
    createdAxisBottomTickPaddingSliderInput,
    createdAxisBottomTickRotationSliderInput,
    createdAxisBottomLegendOffsetSliderInput,
    // axis left
    createdAxisLeftTickSizeSliderInput,
    createdAxisLeftTickPaddingSliderInput,
    createdAxisLeftTickRotationSliderInput,
    createdAxisLeftLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    // axis top
    axisTopTickSizeSliderInputCreatorInfo,
    axisTopTickPaddingSliderInputCreatorInfo,
    axisTopTickRotationSliderInputCreatorInfo,
    axisTopLegendOffsetSliderInputCreatorInfo,
    // axis right
    axisRightTickSizeSliderInputCreatorInfo,
    axisRightTickPaddingSliderInputCreatorInfo,
    axisRightTickRotationSliderInputCreatorInfo,
    axisRightLegendOffsetSliderInputCreatorInfo,
    // axis bottom
    axisBottomTickSizeSliderInputCreatorInfo,
    axisBottomTickPaddingSliderInputCreatorInfo,
    axisBottomTickRotationSliderInputCreatorInfo,
    axisBottomLegendOffsetSliderInputCreatorInfo,
    // axis left
    axisLeftTickSizeSliderInputCreatorInfo,
    axisLeftTickPaddingSliderInputCreatorInfo,
    axisLeftTickRotationSliderInputCreatorInfo,
    axisLeftLegendOffsetSliderInputCreatorInfo,
  ]);

  // text inputs
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

  /** legend */
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

  const [
    createdLegendAnchorSelectInput,
    createdLegendDirectionSelectInput,
    createdLegendItemDirectionSelectInput,
  ] = returnAccessibleSelectInputElements([
    legendAnchorSelectInputCreatorInfo,
    legendDirectionSelectInputCreatorInfo,
    legendItemDirectionSelectInputCreatorInfo,
  ]);

  /** motion */
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

  /** display base */
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

  const displayGroupModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdGroupModeSelectInput}
      label="Group mode"
      value={groupMode}
    />
  );

  const displayLayoutSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLayoutSelectInput}
      label="Layout"
      value={layout}
    />
  );

  const displayValueScaleSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdValueScaleSelectInput}
      label="Value scale"
      value={valueScale}
    />
  );

  const displayReverseSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdReverseSwitchInput}
    </Group>
  );

  const displayToggleMinValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableMinValueSwitchInput}
    </Group>
  );

  const displayMinValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMinValueSliderInput}
      isInputDisabled={!enableMinValue}
      label="Min value"
      value={minValue}
    />
  );

  const displayToggleMaxValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableMaxValueSwitchInput}
    </Group>
  );

  const displayMaxValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMaxValueSliderInput}
      isInputDisabled={!enableMaxValue}
      label="Max value"
      value={maxValue}
    />
  );

  const displayPaddingBarSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdPaddingBarSliderInput}
      label="Padding bar"
      value={paddingBar}
    />
  );

  const displayInnerPaddingBarSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdInnerPaddingBarSliderInput}
      label="Inner padding bar"
      symbol="px"
      value={innerPaddingBar}
    />
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayGroupModeSelectInput}
      {displayLayoutSelectInput}
      {displayValueScaleSelectInput}
      {displayReverseSwitchInput}
      {displayToggleMinValueSwitchInput}
      {displayMinValueSliderInput}
      {displayToggleMaxValueSwitchInput}
      {displayMaxValueSliderInput}
      {displayPaddingBarSliderInput}
      {displayInnerPaddingBarSliderInput}
    </Stack>
  );

  // display margin
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
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMarginTopSliderInput}
      label="Margin top"
      symbol="px"
      value={marginTop}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMarginRightSliderInput}
      label="Margin right"
      symbol="px"
      value={marginRight}
    />
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMarginBottomSliderInput}
      label="Margin bottom"
      symbol="px"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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

  // display style
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

  const displayColorsSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdColorsSelectInput}
      label="Colors"
      value={chartColors}
    />
  );

  const displayBorderRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdChartBorderRadiusSliderInput}
      label="Chart border radius"
      symbol="px"
      value={chartBorderRadius}
    />
  );

  const displayBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdChartBorderWidthSliderInput}
      label="Chart border width"
      symbol="px"
      value={chartBorderWidth}
    />
  );

  const displayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdChartBorderColorInput}
      label="Chart border color"
      value={chartBorderColor}
    />
  );

  const displayToggleFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayColorsSelectInput}
      {displayBorderRadiusSliderInput}
      {displayBorderWidthSliderInput}
      {displayBorderColorInput}
      {displayToggleFillPatternsSwitchInput}
    </Stack>
  );

  // display labels
  const displayLabelsHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Labels
      </Title>
    </Group>
  );

  const displayToggleLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLabelsSwitchInput}
    </Group>
  );

  const displayLabelSkipWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLabelSkipWidthSliderInput}
      isInputDisabled={!enableLabels}
      label="Label skip width"
      symbol="px"
      value={labelSkipWidth}
    />
  );

  const displayLabelSkipHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLabelSkipHeightSliderInput}
      isInputDisabled={!enableLabels}
      label="Label skip height"
      symbol="px"
      value={labelSkipHeight}
    />
  );

  const displayLabelTextColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLabelTextColorInput}
      isInputDisabled={!enableLabels}
      label="Label text color"
      value={labelTextColor}
    />
  );

  const displayLabelsSection = (
    <Stack w="100%">
      {displayLabelsHeading}
      {displayToggleLabelsSwitchInput}
      {displayLabelSkipWidthSliderInput}
      {displayLabelSkipHeightSliderInput}
      {displayLabelTextColorInput}
    </Stack>
  );

  // display grid
  const displayGridHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Grid
      </Title>
    </Group>
  );

  const displayToggleGridXSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableGridXSwitchInput}
    </Group>
  );

  const displayToggleGridYSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableGridYSwitchInput}
    </Group>
  );

  const displayGridSection = (
    <Stack w="100%">
      {displayGridHeading}
      {displayToggleGridXSwitchInput}
      {displayToggleGridYSwitchInput}
    </Stack>
  );

  // axis top
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

  const displayToggleAxisTopSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisTopSwitchInput}
    </Group>
  );

  const displayAxisTopTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisTopTickSizeSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick size"
      symbol="px"
      value={axisTopTickSize}
    />
  );

  const displayAxisTopTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisTopTickPaddingSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick padding"
      symbol="px"
      value={axisTopTickPadding}
    />
  );

  const displayAxisTopTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisTopTickRotationSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick rotation"
      symbol="°"
      value={axisTopTickRotation}
    />
  );

  const displayAxisTopLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisTopLegendTextInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top legend"
      value={axisTopLegend}
    />
  );

  const displayAxisTopLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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
      {displayToggleAxisTopSwitchInput}
      {displayAxisTopTickSizeSliderInput}
      {displayAxisTopTickPaddingSliderInput}
      {displayAxisTopTickRotationSliderInput}
      {displayAxisTopLegendTextInput}
      {displayAxisTopLegendOffsetSliderInput}
    </Stack>
  );

  // axis right
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

  const displayToggleAxisRightSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisRightSwitchInput}
    </Group>
  );

  const displayAxisRightTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisRightTickSizeSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick size"
      symbol="px"
      value={axisRightTickSize}
    />
  );

  const displayAxisRightTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisRightTickPaddingSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick padding"
      symbol="px"
      value={axisRightTickPadding}
    />
  );

  const displayAxisRightTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisRightTickRotationSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick rotation"
      symbol="°"
      value={axisRightTickRotation}
    />
  );

  const displayAxisRightLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisRightLegendTextInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right legend"
      value={axisRightLegend}
    />
  );

  const displayAxisRightLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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
      {displayToggleAxisRightSwitchInput}
      {displayAxisRightTickSizeSliderInput}
      {displayAxisRightTickPaddingSliderInput}
      {displayAxisRightTickRotationSliderInput}
      {displayAxisRightLegendTextInput}
      {displayAxisRightLegendOffsetSliderInput}
    </Stack>
  );

  // axis bottom
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

  const displayToggleAxisBottomSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisBottomSwitchInput}
    </Group>
  );

  const displayAxisBottomTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisBottomTickSizeSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick size"
      symbol="px"
      value={axisBottomTickSize}
    />
  );

  const displayAxisBottomTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisBottomTickPaddingSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick padding"
      symbol="px"
      value={axisBottomTickPadding}
    />
  );

  const displayAxisBottomTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisBottomTickRotationSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick rotation"
      symbol="°"
      value={axisBottomTickRotation}
    />
  );

  const displayAxisBottomLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisBottomLegendTextInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom legend"
      value={axisBottomLegend}
    />
  );

  const displayAxisBottomLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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
      {displayToggleAxisBottomSwitchInput}
      {displayAxisBottomTickSizeSliderInput}
      {displayAxisBottomTickPaddingSliderInput}
      {displayAxisBottomTickRotationSliderInput}
      {displayAxisBottomLegendTextInput}
      {displayAxisBottomLegendOffsetSliderInput}
    </Stack>
  );

  // axis left
  const displayAxisLeftHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4, marginBottom: 0 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Left
      </Title>
    </Group>
  );

  const displayToggleAxisLeftSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisLeftSwitchInput}
    </Group>
  );

  const displayAxisLeftTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisLeftTickSizeSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick size"
      symbol="px"
      value={axisLeftTickSize}
    />
  );

  const displayAxisLeftTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisLeftTickPaddingSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick padding"
      symbol="px"
      value={axisLeftTickPadding}
    />
  );

  const displayAxisLeftTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisLeftTickRotationSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick rotation"
      symbol="°"
      value={axisLeftTickRotation}
    />
  );

  const displayAxisLeftLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdAxisLeftLegendTextInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left legend"
      value={axisLeftLegend}
    />
  );

  const displayAxisLeftLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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
      {displayToggleAxisLeftSwitchInput}
      {displayAxisLeftTickSizeSliderInput}
      {displayAxisLeftTickPaddingSliderInput}
      {displayAxisLeftTickRotationSliderInput}
      {displayAxisLeftLegendTextInput}
      {displayAxisLeftLegendOffsetSliderInput}
    </Stack>
  );

  // display legend
  const displayLegendHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Legend
      </Title>
    </Group>
  );

  const displayToggleLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendAnchorSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend anchor"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ANCHOR_DATA.find(({ value }) => value === legendAnchor)
          ?.label ?? legendAnchor
      }
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend direction"
      value={legendDirection}
    />
  );

  const displayToggleLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate X"
      symbol="px"
      value={legendTranslateX}
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate Y"
      symbol="px"
      value={legendTranslateY}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      symbol="px"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      symbol="px"
      value={legendItemHeight}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      symbol="px"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendItemDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend item direction"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ITEM_DIRECTION_DATA.find(
          ({ value }) => value === legendItemDirection
        )?.label ?? legendItemDirection
      }
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdLegendItemOpacitySliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item opacity"
      value={legendItemOpacity}
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
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
      {displayToggleLegendSwitchInput}
      {displayLegendAnchorSelectInput}
      {displayLegendDirectionSelectInput}
      {displayToggleLegendJustifySwitchInput}
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

  // display motion
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

  const displayToggleAnimateSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsiveBarChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayToggleAnimateSwitchInput}
      {displayMotionConfigSelectInput}
    </Stack>
  );

  const barChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayControlsHeading}
      {displayBaseSection}
      {displayMarginSection}
      {displayStyleSection}
      {displayLabelsSection}
      {displayGridSection}
      {displayAxisTopSection}
      {displayAxisRightSection}
      {displayAxisBottomSection}
      {displayAxisLeftSection}
      {displayLegendSection}
      {displayMotionSection}
    </Flex>
  );

  const displayBarChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h={width < 1192 ? '38vh' : '70vh'} py={padding}>
        <Grid.Col span={1}>{barChartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
  );

  const data = [
    {
      country: 'AD',
      'hot dog': 189,
      'hot dogColor': 'hsl(165, 70%, 50%)',
      burger: 28,
      burgerColor: 'hsl(7, 70%, 50%)',
      sandwich: 184,
      sandwichColor: 'hsl(279, 70%, 50%)',
      kebab: 134,
      kebabColor: 'hsl(152, 70%, 50%)',
      fries: 51,
      friesColor: 'hsl(2, 70%, 50%)',
      donut: 174,
      donutColor: 'hsl(81, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 200,
      'hot dogColor': 'hsl(34, 70%, 50%)',
      burger: 117,
      burgerColor: 'hsl(209, 70%, 50%)',
      sandwich: 173,
      sandwichColor: 'hsl(131, 70%, 50%)',
      kebab: 119,
      kebabColor: 'hsl(10, 70%, 50%)',
      fries: 105,
      friesColor: 'hsl(191, 70%, 50%)',
      donut: 200,
      donutColor: 'hsl(131, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 178,
      'hot dogColor': 'hsl(204, 70%, 50%)',
      burger: 194,
      burgerColor: 'hsl(172, 70%, 50%)',
      sandwich: 71,
      sandwichColor: 'hsl(104, 70%, 50%)',
      kebab: 45,
      kebabColor: 'hsl(277, 70%, 50%)',
      fries: 28,
      friesColor: 'hsl(331, 70%, 50%)',
      donut: 39,
      donutColor: 'hsl(129, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 74,
      'hot dogColor': 'hsl(272, 70%, 50%)',
      burger: 113,
      burgerColor: 'hsl(255, 70%, 50%)',
      sandwich: 3,
      sandwichColor: 'hsl(264, 70%, 50%)',
      kebab: 61,
      kebabColor: 'hsl(101, 70%, 50%)',
      fries: 1,
      friesColor: 'hsl(263, 70%, 50%)',
      donut: 192,
      donutColor: 'hsl(292, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 91,
      'hot dogColor': 'hsl(272, 70%, 50%)',
      burger: 105,
      burgerColor: 'hsl(263, 70%, 50%)',
      sandwich: 143,
      sandwichColor: 'hsl(309, 70%, 50%)',
      kebab: 6,
      kebabColor: 'hsl(345, 70%, 50%)',
      fries: 4,
      friesColor: 'hsl(144, 70%, 50%)',
      donut: 195,
      donutColor: 'hsl(66, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 171,
      'hot dogColor': 'hsl(310, 70%, 50%)',
      burger: 101,
      burgerColor: 'hsl(195, 70%, 50%)',
      sandwich: 18,
      sandwichColor: 'hsl(43, 70%, 50%)',
      kebab: 152,
      kebabColor: 'hsl(20, 70%, 50%)',
      fries: 176,
      friesColor: 'hsl(233, 70%, 50%)',
      donut: 70,
      donutColor: 'hsl(357, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 125,
      'hot dogColor': 'hsl(152, 70%, 50%)',
      burger: 179,
      burgerColor: 'hsl(78, 70%, 50%)',
      sandwich: 68,
      sandwichColor: 'hsl(96, 70%, 50%)',
      kebab: 50,
      kebabColor: 'hsl(311, 70%, 50%)',
      fries: 175,
      friesColor: 'hsl(303, 70%, 50%)',
      donut: 77,
      donutColor: 'hsl(202, 70%, 50%)',
    },
  ];

  const displayResponsiveBar = (
    <ResponsiveBar
      // base
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      groupMode={groupMode}
      layout={layout}
      valueScale={{ type: valueScale }}
      indexScale={{ type: 'band', round: true }}
      reverse={reverse}
      minValue={enableMinValue ? minValue : void 0}
      maxValue={enableMaxValue ? maxValue : void 0}
      padding={paddingBar}
      innerPadding={innerPaddingBar}
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      // style
      colors={{ scheme: chartColors }}
      borderRadius={chartBorderRadius}
      borderWidth={chartBorderWidth}
      borderColor={chartBorderColor}
      defs={NIVO_CHART_PATTERN_DEFS}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      // labels
      enableLabel={enableLabels}
      labelSkipWidth={labelSkipWidth}
      labelSkipHeight={labelSkipHeight}
      labelTextColor={labelTextColor}
      // grid and axes
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      axisTop={
        enableAxisTop
          ? {
              tickSize: axisTopTickSize,
              tickPadding: axisTopTickPadding,
              tickRotation: axisTopTickRotation,
              legend: axisTopLegend,
              legendOffset: axisTopLegendOffset,
            }
          : void 0
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
          : void 0
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
          : void 0
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
          : void 0
      }
      legends={
        enableLegend
          ? [
              {
                dataFrom: 'keys',
                anchor: legendAnchor,
                direction: legendDirection,
                justify: enableLegendJustify,
                translateX: legendTranslateX,
                translateY: legendTranslateY,
                itemsSpacing: legendItemsSpacing,
                itemWidth: legendItemWidth,
                itemHeight: legendItemHeight,
                itemDirection: legendItemDirection,
                itemOpacity: legendItemOpacity,
                symbolSize: legendSymbolSize,
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
      isInteractive={true}
      role="application"
      ariaLabel="Nivo bar chart"
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
      }
    />
  );

  const displayResponsiveBarChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayBarChartControls}
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
        {displayResponsiveBar}
      </Grid.Col>
    </Grid>
  );

  return displayResponsiveBarChartComponent;
}

export { ResponsiveBarChart };
