import {
  Button,
  ColorInput,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Space,
  Stack,
  Switch,
  Text,
  Title,
  TitleOrder,
  Tooltip,
} from '@mantine/core';
import { ResponsiveBar } from '@nivo/bar';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { BiReset } from 'react-icons/bi';
import { TbDownload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  COLORS_SWATCHES,
  SCREENSHOT_IMAGE_TYPE_DATA,
} from '../../../constants/data';
import { FILENAME_REGEX, SERIAL_ID_REGEX } from '../../../constants/regex';
import { useGlobalState } from '../../../hooks';
import { useAsyncReference } from '../../../hooks/useAsyncReference';
import { useScreenshot } from '../../../hooks/useScreenshot';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { ScreenshotImageType } from '../../../types';
import {
  captureScreenshot,
  logState,
  returnFilenameValidationText,
  returnSerialIdValidationText,
  returnThemeColors,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../wrappers';
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_CHART_TITLE_POSITION_DATA,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_MOTION_CONFIG_DATA,
} from '../constants';
import {
  NivoAxisLegendPosition,
  NivoChartTitlePosition,
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoMotionConfig,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
  BAR_CHART_GROUP_MODE_SELECT_DATA,
  BAR_CHART_LAYOUT_SELECT_DATA,
  BAR_CHART_VALUE_SCALE_SELECT_DATA,
} from './constants';
import {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
} from './state';
import { ResponsiveBarChartProps, ResponsiveBarChartState } from './types';
import { ChartAxisTop } from '../chartControls/ChartAxisTop';
import { ChartAxisRight } from '../chartControls/ChartAxisRight';
import { ChartAxisBottom } from '../chartControls/ChartAxisBottom';
import { ChartAxisLeft } from '../chartControls/ChartAxisLeft';
import { ChartOptions } from '../chartControls/ChartOptions';
import { ChartLegend } from '../chartControls/ChartLegend';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';

function ResponsiveBarChart({
  barChartData,
  chartHeight = 500,
  chartWidth = 500,
  hideControls = false,
}: ResponsiveBarChartProps) {
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
    chartTitleColor: chartTextColor,
  };

  const [responsiveBarChartState, responsiveBarChartDispatch] = useReducer(
    responsiveBarChartReducer,
    modifiedInitialResponsiveBarChartState
  );

  const chartRef = useRef(null);

  const {
    /** base */
    groupMode, // default: stacked
    layout, // default: horizontal
    reverse, // default: false
    valueScale, // default: linear
    // scale
    enableMaxValue, // default: false ? maxValue is undefined
    enableMinValue, // default: false ? minValue is undefined
    innerPaddingBar, // 0 - 10 default: 0 step: 1
    maxValue, // default: 1000 step: 1
    minValue, // default: -1000 step: 1
    paddingBar, // 0.1 - 0.9 default: 0.1 step: 0.1

    // base -> margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    /** style */
    chartBorderColor, // default: #ffffff
    chartBorderRadius, // 0px - 36px default: 0 step: 1
    chartBorderWidth, // 0px - 20px default: 0 step: 1
    chartColors, // default: nivo
    enableFillPatterns, // default: false
    fillPatterns,

    /** labels */
    enableLabels, // default: true
    labelSkipHeight, // 0 - 36 default: 0 step: 1
    labelSkipWidth, // 0 - 36 default: 0 step: 1
    labelTextColor, // default: #ffffff

    /** grid and axes */
    enableGridX, // default: false
    enableGridY, // default: true
    // axisTop
    axisTopLegend, // default: ''
    axisTopLegendOffset, // -60px - 60px default: 0 step: 1
    axisTopLegendPosition, // default: middle
    axisTopTickPadding, // 0 - 20 default: 5 step: 1
    axisTopTickRotation, // -90 - 90 default: 0 step: 1
    axisTopTickSize, // 0 - 20 default: 5 step: 1
    enableAxisTop, // default: false ? null
    isAxisTopLegendFocused, // default: false
    isAxisTopLegendValid, // default: false
    // axisRight
    axisRightLegend, // default: ''
    axisRightLegendOffset, // -60px - 60px default: 0 step: 1
    axisRightLegendPosition, // default: middle
    axisRightTickPadding, // 0 - 20 default: 5 step: 1
    axisRightTickRotation, // -90 - 90 default: 0 step: 1
    axisRightTickSize, // 0 - 20 default: 5 step: 1
    enableAxisRight, // default: false ? null
    isAxisRightLegendFocused, // default: false
    isAxisRightLegendValid, // default: false
    // axisBottom
    axisBottomLegend, // default: ''
    axisBottomLegendOffset, // -60px - 60px default: 0 step: 1
    axisBottomLegendPosition, // default: middle
    axisBottomTickPadding, // 0 - 20 default: 5 step: 1
    axisBottomTickRotation, // -90 - 90 default: 0 step: 1
    axisBottomTickSize, // 0 - 20 default: 5 step: 1
    enableAxisBottom, // default: true
    isAxisBottomLegendFocused, // default: false
    isAxisBottomLegendValid, // default: false
    // axisLeft
    axisLeftLegend, // default: ''
    axisLeftLegendOffset, // -60px - 60px default: 0 step: 1
    axisLeftLegendPosition, // default: middle
    axisLeftTickPadding, // 0 - 20 default: 5 step: 1
    axisLeftTickRotation, // -90 - 90 default: 0 step: 1
    axisLeftTickSize, // 0 - 20 default: 5 step: 1
    enableAxisLeft, // default: false ? null
    isAxisLeftLegendFocused, // default: false
    isAxisLeftLegendValid, // default: false

    /** legend */
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

    /** motion */
    enableAnimate, // default: true
    motionConfig, // default: default

    /** options */
    chartTitle,
    chartTitleColor,
    chartTitlePosition,
    chartTitleSize,
    isChartTitleFocused,
    isChartTitleValid,

    /** screenshot */
    isScreenshotFilenameFocused,
    isScreenshotFilenameValid,
    screenshotFilename,
    screenshotImageQuality,
    screenshotImageType,
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

  const resetAllButtonCreatorInfo: AccessibleButtonCreatorInfo = {
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
  ] = returnAccessibleSliderInputElements([
    minValueSliderInputCreatorInfo,
    maxValueSliderInputCreatorInfo,
    paddingBarSliderInputCreatorInfo,
    innerPaddingBarSliderInputCreatorInfo,
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

  /** motion */
  const [createdMotionConfigSelectInput] = returnAccessibleSelectInputElements([
    motionConfigSelectInputCreatorInfo,
  ]);

  const [createdResetAllButton] = returnAccessibleButtonElements([
    resetAllButtonCreatorInfo,
  ]);

  // input display

  /** display base */
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

  // margin
  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedInitialResponsiveBarChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // display style
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

  const displayChartAxisTop = (
    <ChartAxisTop
      axisTopLegend={axisTopLegend}
      axisTopLegendOffset={axisTopLegendOffset}
      axisTopLegendPosition={axisTopLegendPosition}
      axisTopTickPadding={axisTopTickPadding}
      axisTopTickRotation={axisTopTickRotation}
      axisTopTickSize={axisTopTickSize}
      borderColor={borderColor}
      enableAxisTop={enableAxisTop}
      initialChartState={modifiedInitialResponsiveBarChartState}
      isAxisTopLegendFocused={isAxisTopLegendFocused}
      isAxisTopLegendValid={isAxisTopLegendValid}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  const displayChartAxisRight = (
    <ChartAxisRight
      axisRightLegend={axisRightLegend}
      axisRightLegendOffset={axisRightLegendOffset}
      axisRightLegendPosition={axisRightLegendPosition}
      axisRightTickPadding={axisRightTickPadding}
      axisRightTickRotation={axisRightTickRotation}
      axisRightTickSize={axisRightTickSize}
      borderColor={borderColor}
      enableAxisRight={enableAxisRight}
      initialChartState={modifiedInitialResponsiveBarChartState}
      isAxisRightLegendFocused={isAxisRightLegendFocused}
      isAxisRightLegendValid={isAxisRightLegendValid}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  const displayChartAxisBottom = (
    <ChartAxisBottom
      axisBottomLegend={axisBottomLegend}
      axisBottomLegendOffset={axisBottomLegendOffset}
      axisBottomLegendPosition={axisBottomLegendPosition}
      axisBottomTickPadding={axisBottomTickPadding}
      axisBottomTickRotation={axisBottomTickRotation}
      axisBottomTickSize={axisBottomTickSize}
      borderColor={borderColor}
      enableAxisBottom={enableAxisBottom}
      initialChartState={modifiedInitialResponsiveBarChartState}
      isAxisBottomLegendFocused={isAxisBottomLegendFocused}
      isAxisBottomLegendValid={isAxisBottomLegendValid}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  const displayChartAxisLeft = (
    <ChartAxisLeft
      axisLeftLegend={axisLeftLegend}
      axisLeftLegendOffset={axisLeftLegendOffset}
      axisLeftLegendPosition={axisLeftLegendPosition}
      axisLeftTickPadding={axisLeftTickPadding}
      axisLeftTickRotation={axisLeftTickRotation}
      axisLeftTickSize={axisLeftTickSize}
      borderColor={borderColor}
      enableAxisLeft={enableAxisLeft}
      initialChartState={modifiedInitialResponsiveBarChartState}
      isAxisLeftLegendFocused={isAxisLeftLegendFocused}
      isAxisLeftLegendValid={isAxisLeftLegendValid}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // display labels
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
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
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

  // display motion
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

  const displayChartLegend = (
    <ChartLegend
      borderColor={borderColor}
      enableLegend={enableLegend}
      enableLegendJustify={enableLegendJustify}
      grayColorShade={grayColorShade}
      initialChartState={modifiedInitialResponsiveBarChartState}
      legendAnchor={legendAnchor}
      legendDirection={legendDirection}
      legendItemBackground={legendItemBackground}
      legendItemDirection={legendItemDirection}
      legendItemHeight={legendItemHeight}
      legendItemOpacity={legendItemOpacity}
      legendItemsSpacing={legendItemsSpacing}
      legendItemTextColor={legendItemTextColor}
      legendItemWidth={legendItemWidth}
      legendSymbolBorderColor={legendSymbolBorderColor}
      legendSymbolShape={legendSymbolShape}
      legendSymbolSize={legendSymbolSize}
      legendTranslateX={legendTranslateX}
      legendTranslateY={legendTranslateY}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      legendSymbolBorderWidth={legendSymbolBorderWidth}
      legendSymbolSpacing={legendSymbolSpacing}
      width={width}
    />
  );

  const displayChartOptions = (
    <ChartOptions
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      initialChartState={modifiedInitialResponsiveBarChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsiveBarChartAction}
      parentChartDispatch={responsiveBarChartDispatch}
      screenshotFilename={screenshotFilename}
      screenshotImageQuality={screenshotImageQuality}
      screenshotImageType={screenshotImageType}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // options
  const displayResetAllButton = (
    <Tooltip label="Reset all input values to default">
      <Group>{createdResetAllButton}</Group>
    </Tooltip>
  );

  const displayResetAll = (
    <Stack w="100%" py={padding}>
      <ChartsAndGraphsControlsStacker
        initialChartState={modifiedInitialResponsiveBarChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  const barChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayLabelsSection}
      {displayGridSection}
      {displayChartAxisTop}
      {displayChartAxisRight}
      {displayChartAxisBottom}
      {displayChartAxisLeft}
      {displayChartLegend}
      {displayMotionSection}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
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
              legendPosition: axisTopLegendPosition,
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
              legendPosition: axisRightLegendPosition,
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
              legendPosition: axisBottomLegendPosition,
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
              legendPosition: axisLeftLegendPosition,
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
                itemBackground: legendItemBackground,
                itemTextColor: legendItemTextColor,
                itemDirection: legendItemDirection,
                itemOpacity: legendItemOpacity,
                // padding:'',
                symbolBorderColor: legendSymbolBorderColor,
                symbolBorderWidth: legendSymbolBorderWidth,
                symbolShape: legendSymbolShape,
                symbolSpacing: legendSymbolSpacing,
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

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={barChartControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayResponsiveBar}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveBarChart };
