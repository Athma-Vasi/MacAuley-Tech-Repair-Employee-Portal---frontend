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
import { ResponsivePie } from '@nivo/pie';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { logState, returnThemeColors } from '../../../utils';
import { PieChartData } from '../../displayStatistics/types';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../../wrappers';
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
} from '../constants';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
} from './state';
import {
  NivoFillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartProps,
} from './types';
import { BiReset } from 'react-icons/bi';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartLegend } from '../chartControls/ChartLegend';
import { ChartOptions } from '../chartControls/ChartOptions';
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';
import { ChartArcLabel } from '../chartControls/ChartArcLabel';

function ResponsivePieChart({
  chartHeight = 500,
  chartWidth = 350,
  hideControls = false,
  pieChartData,
}: ResponsivePieChartProps) {
  /** ------------- begin hooks ------------- */
  const {
    globalState: { padding, width, themeObject, isPrefersReducedMotion },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { chartTextColor, textColor, grayColorShade },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // ensures appropriate colors based on color scheme
  const modifiedInitialResponsivePieChartState = {
    ...initialResponsivePieChartState,
    arcLabelsTextColor: chartTextColor,
    arcLinkLabelsTextColor: textColor,
    chartTitleColor: chartTextColor,
  };

  const [responsivePieChartState, responsivePieChartDispatch] = useReducer(
    responsivePieChartReducer,
    modifiedInitialResponsivePieChartState
  );
  const {
    startAngle, // -180 - 360 default: 0 step: 1
    endAngle, // -360 - 360 default: 360 step: 1
    innerRadius, // 0 - 1 default: 0 step: 0.05
    padAngle, // 0 - 45 default: 0 step: 1
    cornerRadius, // 0px - 45px default: 0 step: 1
    sortByValue, // default: false

    chartColors,
    fillPatterns,
    enableFillPatterns, // default: false
    arcBorderColor, // default: #ffffff
    arcBorderWidth, // 0px - 20px default: 0 step: 1

    arcLabel, // default: formattedValue
    enableArcLabels, // default: true
    arcLabelsRadiusOffset, // 0 - 2 default: 0.5 step: 0.05
    arcLabelsSkipAngle, // 0 - 45 default: 0 step: 1
    arcLabelsTextColor, // default: #333333

    enableArcLinkLabels, // default: true
    arcLinkLabelsSkipAngle, // 0 - 45 default: 0 step: 1
    arcLinkLabelsOffset, // -24px - 24px default: 0 step: 1
    arcLinkLabelsDiagonalLength, // 0px - 36px default: 16 step: 1
    arcLinkLabelsStraightLength, // 0px - 36px default: 24 step: 1
    arcLinkLabelsTextOffset, // 0px - 36px default: 6 step: 1
    arcLinkLabelsThickness, // 0px - 20px default: 1 step: 1
    arcLinkLabelsTextColor, // default: #333333

    activeInnerRadiusOffset, // 0px - 50px default: 0 step: 1
    activeOuterRadiusOffset, // 0px - 50px default: 0 step: 1

    enableAnimate, // default: true
    motionConfig,
    transitionMode,

    marginBottom, // 0px - 60px default: 60 step: 1
    marginLeft, // 0px - 60px default: 60 step: 1
    marginRight, // 0px - 60px default: 60 step: 1
    marginTop, // 0px - 60px default: 60 step: 1

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
  } = responsivePieChartState;

  /** ------------- end hooks ------------- */

  const chartRef = useRef(null);

  /** ------------- begin useEffects ------------- */

  // set fill patterns on enable
  useEffect(() => {
    if (!pieChartData) {
      return;
    }

    const fillPatterns = pieChartData.map(
      (pieChartData: PieChartData, chartIdx) => {
        const { id } = pieChartData;
        const fillPattern: NivoFillPatternObject = {
          match: {
            id,
          },
          id: chartIdx % 2 === 0 ? 'dots' : 'lines',
        };

        return fillPattern;
      }
    );

    responsivePieChartDispatch({
      type: responsivePieChartAction.setFillPatterns,
      payload: fillPatterns,
    });
  }, [enableFillPatterns, pieChartData]);

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsivePieChartDispatch({
      type: responsivePieChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  /** ------------- end useEffects ------------- */

  const displayResponsivePie = (
    <ResponsivePie
      data={pieChartData}
      // base
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      padAngle={padAngle}
      cornerRadius={cornerRadius}
      sortByValue={sortByValue}
      // style
      colors={{ scheme: chartColors }}
      borderColor={arcBorderColor}
      borderWidth={arcBorderWidth}
      // arc labels
      arcLabel={arcLabel}
      enableArcLabels={enableArcLabels}
      arcLabelsRadiusOffset={arcLabelsRadiusOffset}
      arcLabelsSkipAngle={arcLabelsSkipAngle}
      arcLabelsTextColor={arcLabelsTextColor}
      // arc link labels
      enableArcLinkLabels={enableArcLinkLabels}
      arcLinkLabelsSkipAngle={arcLinkLabelsSkipAngle}
      arcLinkLabelsOffset={arcLinkLabelsOffset}
      arcLinkLabelsDiagonalLength={arcLinkLabelsDiagonalLength}
      arcLinkLabelsStraightLength={arcLinkLabelsStraightLength}
      arcLinkLabelsTextOffset={arcLinkLabelsTextOffset}
      arcLinkLabelsThickness={arcLinkLabelsThickness}
      arcLinkLabelsTextColor={arcLinkLabelsTextColor}
      // interactivity
      activeInnerRadiusOffset={activeInnerRadiusOffset}
      activeOuterRadiusOffset={activeOuterRadiusOffset}
      // motion
      animate={enableAnimate}
      motionConfig={motionConfig}
      transitionMode={transitionMode}
      defs={NIVO_CHART_PATTERN_DEFS}
      fill={enableFillPatterns ? fillPatterns : []}
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
                itemWidth: legendItemWidth,
                itemHeight: legendItemHeight,
                itemTextColor: legendItemTextColor,
                itemDirection: legendItemDirection,
                itemOpacity: legendItemOpacity,
                symbolSize: legendSymbolSize,
                symbolShape: legendSymbolShape,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]
          : []
      }
    />
  );

  if (hideControls) {
    return (
      <Group
        w={chartWidth}
        h={chartHeight}
        style={{ outline: '1px solid teal' }}
      >
        {displayResponsivePie}
      </Group>
    );
  }

  /** ------------- begin accessible description texts ------------- */

  const [
    sortByValueAccessibleSelectedText,
    sortByValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: sortByValue,
    deselectedDescription:
      'Arcs will not be ordered according to their associated value.',
    selectedDescription:
      'Arcs will be ordered according to their associated value.',
    semanticName: 'sort by value',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Fill patterns will not be displayed.',
    isSelected: enableFillPatterns,
    selectedDescription: 'Fill patterns will be displayed.',
    semanticName: 'fill patterns',
    theme: 'muted',
  });

  const [
    enableArcLinkLabelsAccessibleSelectedText,
    enableArcLinkLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Arc link labels will not be displayed..',
    isSelected: enableArcLinkLabels,
    selectedDescription: 'Arc link labels will be displayed.',
    semanticName: 'arc link labels',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Transitions will be disabled.',
    isSelected: enableAnimate,
    selectedDescription: 'Transitions will be enabled.',
    semanticName: 'animate',
    theme: 'muted',
  });

  /** ------------- end accessible description texts ------------- */

  /** ------------- begin input objects ------------- */
  const { gray } = COLORS_SWATCHES;

  /** ------------- begin base ------------- */
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[3];

  const startAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'start angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 360,
    min: -180,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setStartAngle,
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
      responsivePieChartDispatch({
        type: responsivePieChartAction.setEndAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 360,
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
    precision: 2,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setInnerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 0.05,
    value: innerRadius,
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
      responsivePieChartDispatch({
        type: responsivePieChartAction.setPadAngle,
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
      responsivePieChartDispatch({
        type: responsivePieChartAction.setCornerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: cornerRadius,
    width: sliderWidth,
  };

  const createdSortByValueSwitchInput = (
    <Switch
      aria-describedby={
        sortByValue
          ? sortByValueAccessibleSelectedText.props.id
          : sortByValueAccessibleDeselectedText.props.id
      }
      checked={sortByValue}
      description={
        sortByValue
          ? sortByValueAccessibleSelectedText
          : sortByValueAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Sort by value
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setSortByValue,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );
  /** ------------- end base ------------- */

  /** ------------- begin style ------------- */
  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: "Define chart's colors",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setColorScheme,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const createdBorderColorInput = (
    <ColorInput
      aria-label="Border color"
      color={arcBorderColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcBorderColor,
          payload: color,
        });
      }}
      value={arcBorderColor}
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
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableFillPatterns,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

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
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcBorderWidth,
      width: sliderWidth,
    };
  /** ------------- end style ------------- */

  /** ------------- begin arc link labels ------------- */
  const createdEnableArcLinkLabelsSwitchInput = (
    <Switch
      aria-describedby={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText.props.id
          : enableArcLinkLabelsAccessibleDeselectedText.props.id
      }
      checked={enableArcLinkLabels}
      description={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText
          : enableArcLinkLabelsAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Arc link labels
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableArcLinkLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const arcLinkLabelsSkipAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels skip angle',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 45,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcLinkLabelsSkipAngle,
      width: sliderWidth,
    };

  const arcLinkLabelsOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels offset',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 24,
      min: -24,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcLinkLabelsOffset,
      width: sliderWidth,
    };

  const arcLinkLabelsDiagonalLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels diagonal length',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsDiagonalLength,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: arcLinkLabelsDiagonalLength,
      width: sliderWidth,
    };

  const arcLinkLabelsStraightLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels straight length',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsStraightLength,
          payload: value,
        });
      },
      sliderDefaultValue: 24,
      step: 1,
      value: arcLinkLabelsStraightLength,
      width: sliderWidth,
    };

  const arcLinkLabelsTextOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels text offset',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 6,
      step: 1,
      value: arcLinkLabelsTextOffset,
      width: sliderWidth,
    };

  const arcLinkLabelsThicknessSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels thickness',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsThickness,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: arcLinkLabelsThickness,
      width: sliderWidth,
    };

  const createdArcLinkLabelsTextColorInput = (
    <ColorInput
      aria-label="arc link labels text color"
      disabled={!enableArcLinkLabels}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextColor,
          payload: color,
        });
      }}
      value={arcLinkLabelsTextColor}
      w={sliderWidth}
    />
  );
  /** ------------- end arc link labels ------------- */

  /** ------------- begin interactivity ------------- */
  const activeInnerRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'active inner radius offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 50,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveInnerRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: activeInnerRadiusOffset,
      width: sliderWidth,
    };

  const activeOuterRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'active outer radius offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 50,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveOuterRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: activeOuterRadiusOffset,
      width: sliderWidth,
    };
  /** ------------- end interactivity ------------- */

  /** ------------- begin motion ------------- */
  const createdAnimateSwitchInput = (
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
      disabled={isPrefersReducedMotion}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableAnimate,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const motionConfigSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_MOTION_CONFIG_DATA,
    description: 'Configure react-spring.',
    disabled: !enableAnimate,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
    width: sliderWidth,
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      description: 'Define how transitions behave.',
      disabled: !enableAnimate,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTransitionMode,
          payload: event.currentTarget.value as NivoTransitionMode,
        });
      },
      value: transitionMode,
      width: sliderWidth,
    };
  /** ------------- end motion ------------- */

  // reset all button
  const [createdResetAllButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Reset',
      leftIcon: <BiReset />,
      semanticDescription: 'Reset all inputs to their default values',
      semanticName: 'Reset All',
      buttonOnClick: () => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.resetChartToDefault,
          payload: modifiedInitialResponsivePieChartState,
        });
      },
    },
  ]);

  /** ------------- end input objects ------------- */

  /** ------------- begin input creation ------------- */
  /** base */
  const [
    createdStartAngleSliderInput,
    createdEndAngleSliderInput,
    createdInnerRadiusSliderInput,
    createdPadAngleSliderInput,
    createdCornerRadiusSliderInput,
  ] = returnAccessibleSliderInputElements([
    startAngleSliderInputCreatorInfo,
    endAngleSliderInputCreatorInfo,
    innerRadiusSliderInputCreatorInfo,
    padAngleSliderInputCreatorInfo,
    cornerRadiusSliderInputCreatorInfo,
  ]);

  /** style */
  const [createdColorSchemeSelectInput] = returnAccessibleSelectInputElements([
    chartColorsSelectInputCreatorInfo,
  ]);

  const [createdArcBorderWidthSliderInput] =
    returnAccessibleSliderInputElements([
      chartBorderWidthSliderInputCreatorInfo,
    ]);

  /** arc link labels */
  const [
    createdArcLinkLabelsSkipAngleSliderInput,
    createdArcLinkLabelsOffsetSliderInput,
    createdArcLinkLabelsDiagonalLengthSliderInput,
    createdArcLinkLabelsStraightLengthSliderInput,
    createdArcLinkLabelsTextOffsetSliderInput,
    createdArcLinkLabelsThicknessSliderInput,
  ] = returnAccessibleSliderInputElements([
    arcLinkLabelsSkipAngleSliderInputCreatorInfo,
    arcLinkLabelsOffsetSliderInputCreatorInfo,
    arcLinkLabelsDiagonalLengthSliderInputCreatorInfo,
    arcLinkLabelsStraightLengthSliderInputCreatorInfo,
    arcLinkLabelsTextOffsetSliderInputCreatorInfo,
    arcLinkLabelsThicknessSliderInputCreatorInfo,
  ]);

  /** interactivity */
  const [
    createdActiveInnerRadiusOffsetSliderInput,
    createdActiveOuterRadiusOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    activeInnerRadiusOffsetSliderInputCreatorInfo,
    activeOuterRadiusOffsetSliderInputCreatorInfo,
  ]);

  /** motion */
  const [createdMotionConfigSelectInput, createdTransitionModeSelectInput] =
    returnAccessibleSelectInputElements([
      motionConfigSelectInputCreatorInfo,
      transitionModeSelectInputCreatorInfo,
    ]);

  /** ------------- end input creation ------------- */

  /** ------------- begin display ------------- */

  /** base */

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
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdStartAngleSliderInput}
      label="Start angle"
      symbol="°"
      value={startAngle}
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdEndAngleSliderInput}
      label="End angle"
      symbol="°"
      value={endAngle}
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      symbol="px"
      value={innerRadius}
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdPadAngleSliderInput}
      label="Pad angle"
      symbol="°"
      value={padAngle}
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      symbol="px"
      value={cornerRadius}
    />
  );

  const displaySortByValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdSortByValueSwitchInput}
    </Group>
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayStartAngleSliderInput}
      {displayEndAngleSliderInput}
      {displayInnerRadiusSliderInput}
      {displayPadAngleSliderInput}
      {displayCornerRadiusSliderInput}
      {displaySortByValueSwitchInput}
    </Stack>
  );

  /** style */
  const displayStyleHeading = (
    <Group
      w="100%"
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      p={padding}
      bg={sectionHeadersBgColor}
    >
      <Title order={5} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayEnableFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayColorSchemeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdColorSchemeSelectInput}
      label="Chart colors"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_COLOR_SCHEME_DATA.find(({ value }) => value === chartColors)
          ?.label ?? chartColors
      }
    />
  );

  const displayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdBorderColorInput}
      label="Arc Border color"
      value={arcBorderColor}
    />
  );

  const displayArcBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcBorderWidthSliderInput}
      label="Arc border width"
      symbol="px"
      value={arcBorderWidth}
    />
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayEnableFillPatternsSwitchInput}
      {displayColorSchemeSelectInput}
      {displayBorderColorInput}
      {displayArcBorderWidthSliderInput}
    </Stack>
  );

  /** arc labels */
  const displayChartArcLabel = (
    <ChartArcLabel
      arcLabel={arcLabel}
      arcLabelsRadiusOffset={arcLabelsRadiusOffset}
      arcLabelsSkipAngle={arcLabelsSkipAngle}
      arcLabelsTextColor={arcLabelsTextColor}
      borderColor={borderColor}
      enableArcLabels={enableArcLabels}
      initialChartState={modifiedInitialResponsivePieChartState}
      padding={padding}
      parentChartAction={responsivePieChartAction}
      parentChartDispatch={responsivePieChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  /** arc link labels */
  const displayArcLinkLabelsHeading = (
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
        Arc link labels
      </Title>
    </Group>
  );

  const displayEnableArcLinkLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableArcLinkLabelsSwitchInput}
    </Group>
  );

  const displayArcLinkLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsSkipAngleSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels skip angle"
      symbol="°"
      value={arcLinkLabelsSkipAngle}
    />
  );

  const displayArcLinkLabelsOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsOffsetSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels offset"
      symbol="px"
      value={arcLinkLabelsOffset}
    />
  );

  const displayArcLinkLabelsDiagonalLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsDiagonalLengthSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels diagonal length"
      symbol="px"
      value={arcLinkLabelsDiagonalLength}
    />
  );

  const displayArcLinkLabelsStraightLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsStraightLengthSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels straight length"
      symbol="px"
      value={arcLinkLabelsStraightLength}
    />
  );

  const displayArcLinkLabelsHeadingOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsTextOffsetSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels text offset"
      symbol="px"
      value={arcLinkLabelsTextOffset}
    />
  );

  const displayArcLinkLabelsThicknessSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsThicknessSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels thickness"
      symbol="px"
      value={arcLinkLabelsThickness}
    />
  );

  const displayArcLinkLabelsHeadingColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsTextColorInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels text color"
      value={arcLinkLabelsTextColor}
    />
  );

  const displayArcLinkLabelsSection = (
    <Stack w="100%">
      {displayArcLinkLabelsHeading}
      {displayEnableArcLinkLabelsSwitchInput}
      {displayArcLinkLabelsSkipAngleSliderInput}
      {displayArcLinkLabelsOffsetSliderInput}
      {displayArcLinkLabelsDiagonalLengthSliderInput}
      {displayArcLinkLabelsStraightLengthSliderInput}
      {displayArcLinkLabelsHeadingOffsetSliderInput}
      {displayArcLinkLabelsThicknessSliderInput}
      {displayArcLinkLabelsHeadingColorInput}
    </Stack>
  );

  /** interactivity */
  const displayInteractivityHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
    >
      <Title order={5} color={textColor}>
        Interactivity
      </Title>
    </Group>
  );

  const displayActiveInnerRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdActiveInnerRadiusOffsetSliderInput}
      label="Active inner radius offset"
      value={activeInnerRadiusOffset}
      symbol="px"
    />
  );

  const displayActiveOuterRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdActiveOuterRadiusOffsetSliderInput}
      label="Active outer radius offset"
      value={activeOuterRadiusOffset}
      symbol="px"
    />
  );

  const displayInteractivitySection = (
    <Stack w="100%">
      {displayInteractivityHeading}
      {displayActiveInnerRadiusOffsetSliderInput}
      {displayActiveOuterRadiusOffsetSliderInput}
    </Stack>
  );

  /** motion */
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

  const displayAnimateMotionSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdTransitionModeSelectInput}
      isInputDisabled={!enableAnimate}
      label="Transition mode"
      value={transitionMode}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayAnimateMotionSwitchInput}
      {displayMotionConfigSelectInput}
      {displayTransitionModeSelectInput}
    </Stack>
  );

  /** margin */
  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedInitialResponsivePieChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsivePieChartAction}
      parentChartDispatch={responsivePieChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  /** legend */
  const displayChartLegend = (
    <ChartLegend
      borderColor={borderColor}
      enableLegend={enableLegend}
      enableLegendJustify={enableLegendJustify}
      grayColorShade={grayColorShade}
      initialChartState={modifiedInitialResponsivePieChartState}
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
      parentChartAction={responsivePieChartAction}
      parentChartDispatch={responsivePieChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // options
  const displayChartOptions = (
    <ChartOptions
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      initialChartState={modifiedInitialResponsivePieChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsivePieChartAction}
      parentChartDispatch={responsivePieChartDispatch}
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
        initialChartState={modifiedInitialResponsivePieChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  const pieChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayChartArcLabel}
      {displayArcLinkLabelsSection}
      {displayInteractivitySection}
      {displayMotionSection}
      {displayChartLegend}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
  );

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={pieChartControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayResponsivePie}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  /** ------------- end display ------------- */

  return displayChartAndControls;
}

export { ResponsivePieChart };
