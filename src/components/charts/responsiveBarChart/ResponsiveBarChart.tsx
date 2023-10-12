import { ChangeEvent, useEffect, useReducer } from 'react';
import {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
} from './state';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { COLORS_SWATCHES } from '../../../constants/data';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../wrappers';
import {
  BAR_CHART_GROUP_MODE_SELECT_DATA,
  BAR_CHART_LAYOUT_SELECT_DATA,
  BAR_CHART_VALUE_SCALE_SELECT_DATA,
} from './constants';
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
import {
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
} from '../types';
import { SERIAL_ID_REGEX } from '../../../constants/regex';
import {
  returnSerialIdValidationText,
  returnThemeColors,
} from '../../../utils';
import {
  CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  NIVO_MOTION_CONFIG_DATA,
} from '../constants';
import { ChartsAndGraphsControlsStacker } from '../utils';
import { ResponsiveBar } from '@nivo/bar';

function ResponsiveBarChart() {
  const [responsiveBarChartState, responsiveBarChartDispatch] = useReducer(
    responsiveBarChartReducer,
    initialResponsiveBarChartState
  );

  const {
    globalState: {
      isPrefersReducedMotion,
      width,
      themeObject,
      padding,
      rowGap,
    },
  } = useGlobalState();

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
    semanticName: 'enable min value',
    theme: 'muted',
  });

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
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bars will be filled with a solid color.',
    isSelected: enableFillPatterns,
    selectedDescription: 'Bars will be filled with a pattern.',
    semanticName: 'enable fill patterns',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Bars will not have labels.',
    isSelected: enableLabels,
    selectedDescription: 'Bars will have labels.',
    semanticName: 'enable labels',
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
    semanticName: 'enable grid x',
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
    semanticName: 'enable grid y',
    theme: 'muted',
  });

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on top.',
    isSelected: enableAxisTop,
    selectedDescription: 'Chart will have an axis on top.',
    semanticName: 'enable axis top',
    theme: 'muted',
  });

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the right.',
    isSelected: enableAxisRight,
    selectedDescription: 'Chart will have an axis on the right.',
    semanticName: 'enable axis right',
    theme: 'muted',
  });

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the bottom.',
    isSelected: enableAxisBottom,
    selectedDescription: 'Chart will have an axis on the bottom.',
    semanticName: 'enable axis bottom',
    theme: 'muted',
  });

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the left.',
    isSelected: enableAxisLeft,
    selectedDescription: 'Chart will have an axis on the left.',
    semanticName: 'enable axis left',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have legend.',
    isSelected: enableLegend,
    selectedDescription: 'Chart will have legend.',
    semanticName: 'enable legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will not be justified.',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend will be justified.',
    semanticName: 'enable legend justify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not animate.',
    isSelected: enableAnimate,
    selectedDescription: 'Chart will animate.',
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
      label={<Text weight={500}>Reverse</Text>}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setReverse,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdToggleMinValueSwitchInput = (
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
      label={<Text weight={500}>Toggle min value</Text>}
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

  const createdToggleMaxValueSwitchInput = (
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    label: (value) => <Text style={{ color: sliderLabelColor }}>{value}</Text>,
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
    description: 'Define chart chartColors.',
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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

  const createdToggleFillPatternsSwitchInput = (
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
      label={<Text weight={500}>Fill patterns</Text>}
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
  const createdToggleLabelsSwitchInput = (
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
      label={<Text weight={500}>Labels</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleGridXSwitchInput = (
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
      label={<Text weight={500}>Grid X</Text>}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setEnableGridX,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const createdToggleGridYSwitchInput = (
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
      label={<Text weight={500}>Grid Y</Text>}
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
  const createdToggleAxisTopSwitchInput = (
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
      label={<Text weight={500}>Axis top</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleAxisRightSwitchInput = (
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
      label={<Text weight={500}>Axis right</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleAxisBottomSwitchInput = (
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
      label={<Text weight={500}>Axis bottom</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleAxisLeftSwitchInput = (
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
      label={<Text weight={500}>Axis left</Text>}
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleLegendSwitchInput = (
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
      label={<Text weight={500}>Legend</Text>}
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
        responsiveBarChartDispatch({
          type: responsiveBarChartAction.setLegendDirection,
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
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
  const createdToggleAnimateSwitchInput = (
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
      label={<Text weight={500}>Animate</Text>}
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

  /** display base */
  const displayBaseHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Base</Title>
    </Group>
  );

  const displayGroupModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdGroupModeSelectInput}
      label="Group mode"
      value={groupMode}
    />
  );

  const displayLayoutSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLayoutSelectInput}
      label="Layout"
      value={layout}
    />
  );

  const displayValueScaleSelectInput = (
    <ChartsAndGraphsControlsStacker
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
      {createdToggleMinValueSwitchInput}
    </Group>
  );

  const displayMinValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMinValueSliderInput}
      isInputDisabled={!enableMinValue}
      label="Min value"
      value={minValue}
    />
  );

  const displayToggleMaxValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleMaxValueSwitchInput}
    </Group>
  );

  const displayMaxValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMaxValueSliderInput}
      isInputDisabled={!enableMaxValue}
      label="Max value"
      value={maxValue}
    />
  );

  const displayPaddingBarSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdPaddingBarSliderInput}
      label="Padding"
      value={paddingBar}
    />
  );

  const displayInnerPaddingBarSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdInnerPaddingBarSliderInput}
      label="Inner padding"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Margin</Title>
    </Group>
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginTopSliderInput}
      label="Margin top"
      value={marginTop}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginRightSliderInput}
      label="Margin right"
      value={marginRight}
    />
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginBottomSliderInput}
      label="Margin bottom"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginLeftSliderInput}
      label="Margin left"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Style</Title>
    </Group>
  );

  const displayColorsSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdColorsSelectInput}
      label="Colors"
      value={chartColors}
    />
  );

  const displayBorderRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdChartBorderRadiusSliderInput}
      label="Border radius"
      value={chartBorderRadius}
    />
  );

  const displayBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdChartBorderWidthSliderInput}
      label="Border width"
      value={chartBorderWidth}
    />
  );

  const displayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      input={createdChartBorderColorInput}
      label="Border color"
      value={chartBorderColor}
    />
  );

  const displayToggleFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleFillPatternsSwitchInput}
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Labels</Title>
    </Group>
  );

  const displayToggleLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleLabelsSwitchInput}
    </Group>
  );

  const displayLabelSkipWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLabelSkipWidthSliderInput}
      isInputDisabled={!enableLabels}
      label="Label skip width"
      value={labelSkipWidth}
    />
  );

  const displayLabelSkipHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLabelSkipHeightSliderInput}
      isInputDisabled={!enableLabels}
      label="Label skip height"
      value={labelSkipHeight}
    />
  );

  const displayLabelTextColorInput = (
    <ChartsAndGraphsControlsStacker
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Grid</Title>
    </Group>
  );

  const displayToggleGridXSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleGridXSwitchInput}
    </Group>
  );

  const displayToggleGridYSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleGridYSwitchInput}
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Axis Top</Title>
    </Group>
  );

  const displayToggleAxisTopSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleAxisTopSwitchInput}
    </Group>
  );

  const displayAxisTopTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisTopTickSizeSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick size"
      value={axisTopTickSize}
    />
  );

  const displayAxisTopTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisTopTickPaddingSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick padding"
      value={axisTopTickPadding}
    />
  );

  const displayAxisTopTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisTopTickRotationSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick rotation"
      value={axisTopTickRotation}
    />
  );

  const displayAxisTopLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisTopLegendTextInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top legend"
      value={axisTopLegend}
    />
  );

  const displayAxisTopLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisTopLegendOffsetSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top legend offset"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Axis Right</Title>
    </Group>
  );

  const displayToggleAxisRightSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleAxisRightSwitchInput}
    </Group>
  );

  const displayAxisRightTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisRightTickSizeSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick size"
      value={axisRightTickSize}
    />
  );

  const displayAxisRightTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisRightTickPaddingSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick padding"
      value={axisRightTickPadding}
    />
  );

  const displayAxisRightTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisRightTickRotationSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick rotation"
      value={axisRightTickRotation}
    />
  );

  const displayAxisRightLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisRightLegendTextInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right legend"
      value={axisRightLegend}
    />
  );

  const displayAxisRightLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisRightLegendOffsetSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right legend offset"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Axis Bottom</Title>
    </Group>
  );

  const displayToggleAxisBottomSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleAxisBottomSwitchInput}
    </Group>
  );

  const displayAxisBottomTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisBottomTickSizeSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick size"
      value={axisBottomTickSize}
    />
  );

  const displayAxisBottomTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisBottomTickPaddingSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick padding"
      value={axisBottomTickPadding}
    />
  );

  const displayAxisBottomTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisBottomTickRotationSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick rotation"
      value={axisBottomTickRotation}
    />
  );

  const displayAxisBottomLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisBottomLegendTextInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom legend"
      value={axisBottomLegend}
    />
  );

  const displayAxisBottomLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisBottomLegendOffsetSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom legend offset"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4, marginBottom: 0 }}
    >
      <Title order={5}>Axis Left</Title>
    </Group>
  );

  const displayToggleAxisLeftSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleAxisLeftSwitchInput}
    </Group>
  );

  const displayAxisLeftTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisLeftTickSizeSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick size"
      value={axisLeftTickSize}
    />
  );

  const displayAxisLeftTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisLeftTickPaddingSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick padding"
      value={axisLeftTickPadding}
    />
  );

  const displayAxisLeftTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisLeftTickRotationSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick rotation"
      value={axisLeftTickRotation}
    />
  );

  const displayAxisLeftLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisLeftLegendTextInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left legend"
      value={axisLeftLegend}
    />
  );

  const displayAxisLeftLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdAxisLeftLegendOffsetSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left legend offset"
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Legend</Title>
    </Group>
  );

  const displayToggleLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
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
      input={createdLegendDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend direction"
      value={legendDirection}
    />
  );

  const displayToggleLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate X"
      value={legendTranslateX}
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate Y"
      value={legendTranslateY}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      value={legendItemHeight}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
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
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Motion</Title>
    </Group>
  );

  const displayToggleAnimateSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdToggleAnimateSwitchInput}
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

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayToggleAnimateSwitchInput}
      {displayMotionConfigSelectInput}
    </Stack>
  );

  const barChartControlsStack = (
    <Stack w="100%">
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
    </Stack>
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
      defs={CHART_PATTERN_DEFS}
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
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
      }
    />
  );

  /**
   *  const displayResponsivePieChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayPieChartControls}
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
        {displayResponsivePie}
      </Grid.Col>
    </Grid>
  );
   */

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

/**
 * [
  {
    "country": "AD",
    "hot dog": 133,
    "hot dogColor": "hsl(195, 70%, 50%)",
    "burger": 66,
    "burgerColor": "hsl(297, 70%, 50%)",
    "sandwich": 50,
    "sandwichColor": "hsl(81, 70%, 50%)",
    "kebab": 134,
    "kebabColor": "hsl(114, 70%, 50%)",
    "fries": 182,
    "friesColor": "hsl(64, 70%, 50%)",
    "donut": 9,
    "donutColor": "hsl(10, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 6,
    "hot dogColor": "hsl(278, 70%, 50%)",
    "burger": 19,
    "burgerColor": "hsl(76, 70%, 50%)",
    "sandwich": 28,
    "sandwichColor": "hsl(82, 70%, 50%)",
    "kebab": 91,
    "kebabColor": "hsl(356, 70%, 50%)",
    "fries": 159,
    "friesColor": "hsl(225, 70%, 50%)",
    "donut": 116,
    "donutColor": "hsl(325, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 11,
    "hot dogColor": "hsl(8, 70%, 50%)",
    "burger": 121,
    "burgerColor": "hsl(290, 70%, 50%)",
    "sandwich": 175,
    "sandwichColor": "hsl(297, 70%, 50%)",
    "kebab": 78,
    "kebabColor": "hsl(76, 70%, 50%)",
    "fries": 85,
    "friesColor": "hsl(99, 70%, 50%)",
    "donut": 10,
    "donutColor": "hsl(228, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 57,
    "hot dogColor": "hsl(146, 70%, 50%)",
    "burger": 84,
    "burgerColor": "hsl(346, 70%, 50%)",
    "sandwich": 193,
    "sandwichColor": "hsl(124, 70%, 50%)",
    "kebab": 81,
    "kebabColor": "hsl(287, 70%, 50%)",
    "fries": 176,
    "friesColor": "hsl(76, 70%, 50%)",
    "donut": 86,
    "donutColor": "hsl(252, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 142,
    "hot dogColor": "hsl(32, 70%, 50%)",
    "burger": 155,
    "burgerColor": "hsl(120, 70%, 50%)",
    "sandwich": 105,
    "sandwichColor": "hsl(255, 70%, 50%)",
    "kebab": 16,
    "kebabColor": "hsl(283, 70%, 50%)",
    "fries": 163,
    "friesColor": "hsl(326, 70%, 50%)",
    "donut": 56,
    "donutColor": "hsl(182, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 29,
    "hot dogColor": "hsl(84, 70%, 50%)",
    "burger": 182,
    "burgerColor": "hsl(228, 70%, 50%)",
    "sandwich": 184,
    "sandwichColor": "hsl(285, 70%, 50%)",
    "kebab": 41,
    "kebabColor": "hsl(326, 70%, 50%)",
    "fries": 83,
    "friesColor": "hsl(307, 70%, 50%)",
    "donut": 63,
    "donutColor": "hsl(18, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 187,
    "hot dogColor": "hsl(322, 70%, 50%)",
    "burger": 114,
    "burgerColor": "hsl(290, 70%, 50%)",
    "sandwich": 53,
    "sandwichColor": "hsl(248, 70%, 50%)",
    "kebab": 5,
    "kebabColor": "hsl(279, 70%, 50%)",
    "fries": 151,
    "friesColor": "hsl(141, 70%, 50%)",
    "donut": 137,
    "donutColor": "hsl(142, 70%, 50%)"
  }
]
 */

/**
 * const MyResponsiveBar = ({ data  }) => (
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        chartColors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legend={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                legendItemOpacity: 0.85,
                legendSymbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            legendItemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)
 */
