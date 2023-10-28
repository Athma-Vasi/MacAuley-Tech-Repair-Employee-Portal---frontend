import {
  ColorInput,
  Flex,
  Group,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ResponsiveLine } from '@nivo/line';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import { BiReset } from 'react-icons/bi';

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
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';
import { ChartAxisBottom } from '../chartControls/ChartAxisBottom';
import { ChartAxisLeft } from '../chartControls/ChartAxisLeft';
import { ChartAxisRight } from '../chartControls/ChartAxisRight';
import { ChartAxisTop } from '../chartControls/ChartAxisTop';
import { ChartLegend } from '../chartControls/ChartLegend';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartOptions } from '../chartControls/ChartOptions';
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_MOTION_CONFIG_DATA,
} from '../constants';
import {
  NivoColorScheme,
  NivoLineAreaBlendMode,
  NivoLineAxesScale,
  NivoLineCrosshairType,
  NivoLineCurve,
  NivoLinePointLabel,
  NivoMotionConfig,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
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
import { ResponsiveLineChartProps, ResponsiveLineChartState } from './types';

function ResponsiveLineChart({
  lineChartData,
  chartHeight = 350,
  chartWidth = 350,
  hideControls = false,
  xFormat,
  yFormat,
}: ResponsiveLineChartProps) {
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
    pointColor: 'rgba(0, 0, 0, 0)',
    chartTitleColor: chartTextColor,
  };

  const [responsiveLineChartState, responsiveLineChartDispatch] = useReducer(
    responsiveLineChartReducer,
    modifiedResponsiveLineChartState
  );

  const {
    // base
    enableYScaleStacked, // default: false
    reverseScale, // default: false
    xScale, // default: linear
    yScale, // default: linear

    // margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    // style
    areaBlendMode, // default: 'normal'
    areaOpacity, // 0 - 1 default: 0.2 step: 0.1
    chartColors, // default: 'nivo'
    enableArea, // default: false
    lineCurve, // default: 'linear'
    lineWidth, // 0px - 20px default: 2 step: 1

    // points
    enablePointLabel, // default: false
    enablePoints, // default: false
    pointBorderWidth, // 0px - 20px default: 0 step: 1
    pointColor, // default: gray
    pointLabel, // default: 'y'
    pointLabelYOffset, // -22px - 24px default: -12 step: 1
    pointSize, // 0px - 20px default: 6 step: 1

    // grids
    enableGridX, // default: true
    enableGridY, // default: true

    // axes
    // axisTop
    axisTopLegend, // default: ''
    axisTopLegendOffset, // -60px - 60px default: 0 step: 1
    axisTopLegendPosition, // 'start' | 'middle' | 'end' default: 'middle'
    axisTopTickPadding, // 0px - 20px default: 5 step: 1
    axisTopTickRotation, // -90° - 90° default: 0 step: 1
    axisTopTickSize, // 0px - 20px default: 5 step: 1
    enableAxisTop, // default: false ? null
    isAxisTopLegendFocused, // default: false
    isAxisTopLegendValid, // default: false
    // axisRight
    axisRightLegend, // default: ''
    axisRightLegendOffset, // -60px - 60px default: 0 step: 1
    axisRightLegendPosition, // 'start' | 'middle' | 'end' default: 'middle'
    axisRightTickPadding, // 0px - 20px default: 5 step: 1
    axisRightTickRotation, // -90° - 90° default: 0 step: 1
    axisRightTickSize, // 0px - 20px default: 5 step: 1
    enableAxisRight, // default: false ? null
    isAxisRightLegendFocused, // default: false
    isAxisRightLegendValid, // default: false
    // axisBottom
    axisBottomLegend, // default: ''
    axisBottomLegendOffset, // -60px - 60px default: 0 step: 1
    axisBottomLegendPosition, // 'start' | 'middle' | 'end' default: 'middle'
    axisBottomTickPadding, // 0px - 20px default: 5 step: 1
    axisBottomTickRotation, // -90° - 90° default: 0 step: 1
    axisBottomTickSize, // 0px - 20px default: 5 step: 1
    enableAxisBottom, // default: true ? {...} : null
    isAxisBottomLegendFocused, // default: false
    isAxisBottomLegendValid, // default: false
    // axisLeft
    axisLeftLegend, // default: ''
    axisLeftLegendOffset, // -60px - 60px default: 0 step: 1
    axisLeftLegendPosition, // 'start' | 'middle' | 'end' default: 'middle'
    axisLeftTickPadding, // 0px - 20px default: 5 step: 1
    axisLeftTickRotation, // -90° - 90° default: 0 step: 1
    axisLeftTickSize, // 0px - 20px default: 5 step: 1
    enableAxisLeft, // default: true ? {...} : null
    isAxisLeftLegendFocused, // default: false
    isAxisLeftLegendValid, // default: false

    // interactivity
    enableCrosshair, // default: true
    crosshairType, // default: 'bottom-left'

    // legends
    enableLegend, // default: false
    enableLegendJustify, // default: false
    legendAnchor, // default: bottom-right
    legendDirection, // default: column
    legendItemBackground, // default: 'rgba(0, 0, 0, 0)'
    legendItemDirection, // default: left-to-right
    legendItemHeight, // 10px - 200px default: 20 step: 1
    legendItemOpacity, // 0 - 1 default: 1 step: 0.05
    legendItemTextColor, // default: 'gray'
    legendItemWidth, // 10px - 200px default: 60 step: 1
    legendItemsSpacing, // 0px - 60px default: 2 step: 1
    legendSymbolBorderColor, // default: 'rgba(0, 0, 0, .5)'
    legendSymbolBorderWidth, // 0px - 20px default: 0 step: 1
    legendSymbolShape, // default: circle
    legendSymbolSize, // 2px - 60px default: 12 step: 1
    legendSymbolSpacing, // 0px - 60px default: 8 step: 1
    legendTranslateX, // -200px - 200px default: 0 step: 1
    legendTranslateY, // -200px - 200px default: 0 step: 1

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'

    // options
    chartTitle,
    chartTitleColor, // default: 'gray'
    chartTitlePosition, // default: 'center'
    chartTitleSize, // 1 - 6 default: 3
    isChartTitleFocused,
    isChartTitleValid,

    // screenshot
    isScreenshotFilenameFocused,
    isScreenshotFilenameValid,
    screenshotFilename,
    screenshotImageQuality, // 0 - 1 default: 1 step: 0.1
    screenshotImageType, // default: 'image/png'
  } = responsiveLineChartState;

  const chartRef = useRef(null);

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

  const displayResponsiveLine = (
    <ResponsiveLine
      data={lineChartData}
      // base
      xScale={{ type: xScale }}
      xFormat={xFormat}
      yScale={{
        type: yScale,
        min: 'auto',
        max: 'auto',
        stacked: enableYScaleStacked,
        reverse: reverseScale,
      }}
      yFormat={yFormat}
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
      pointBorderColor={{ from: 'serieColor' }}
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
              legendPosition: axisTopLegendPosition,
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
              legendPosition: axisRightLegendPosition,
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
              legendPosition: axisBottomLegendPosition,
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
              legendPosition: axisLeftLegendPosition,
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

  if (hideControls) {
    return (
      <Group w={chartWidth} h={chartHeight}>
        {displayResponsiveLine}
      </Group>
    );
  }

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

  // input creation

  // base
  // base select inputs
  const [createdXScaleSelectInput, createdYScaleSelectInput] =
    returnAccessibleSelectInputElements([
      xScaleSelectInputCreatorInfo,
      yScaleSelectInputCreatorInfo,
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

  // interactivity
  const [createdCrosshairTypeSelectInput] = returnAccessibleSelectInputElements(
    [crosshairTypeSelectInputCreatorInfo]
  );

  // motion
  const [createdMotionConfigSelectInput] = returnAccessibleSelectInputElements([
    motionConfigSelectInputCreatorInfo,
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
      {displayReverseScaleSwitchInput}
    </Stack>
  );

  // margin
  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedResponsiveLineChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
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
      initialChartState={modifiedResponsiveLineChartState}
      isAxisTopLegendFocused={isAxisTopLegendFocused}
      isAxisTopLegendValid={isAxisTopLegendValid}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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
      initialChartState={modifiedResponsiveLineChartState}
      isAxisRightLegendFocused={isAxisRightLegendFocused}
      isAxisRightLegendValid={isAxisRightLegendValid}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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
      initialChartState={modifiedResponsiveLineChartState}
      isAxisBottomLegendFocused={isAxisBottomLegendFocused}
      isAxisBottomLegendValid={isAxisBottomLegendValid}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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
      initialChartState={modifiedResponsiveLineChartState}
      isAxisLeftLegendFocused={isAxisLeftLegendFocused}
      isAxisLeftLegendValid={isAxisLeftLegendValid}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
      sectionHeadersBgColor={sectionHeadersBgColor}
      textColor={textColor}
      width={width}
    />
  );

  // interactivity
  const displayInteractivityHeading = (
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
  const displayChartLegend = (
    <ChartLegend
      borderColor={borderColor}
      enableLegend={enableLegend}
      enableLegendJustify={enableLegendJustify}
      grayColorShade={grayColorShade}
      initialChartState={modifiedResponsiveLineChartState}
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
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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

  // options
  const displayChartOptions = (
    <ChartOptions
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      initialChartState={modifiedResponsiveLineChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsiveLineChartAction}
      parentChartDispatch={responsiveLineChartDispatch}
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
        initialChartState={modifiedResponsiveLineChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  const lineChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayPointsSection}
      {displayGridsSection}
      {displayChartAxisTop}
      {displayChartAxisRight}
      {displayChartAxisBottom}
      {displayChartAxisLeft}
      {displayInteractivitySection}
      {displayChartLegend}
      {displayMotionSection}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
  );

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={lineChartControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayResponsiveLine}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveLineChart };
