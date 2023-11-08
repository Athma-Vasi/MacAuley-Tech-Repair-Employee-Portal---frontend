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
import { ResponsiveCalendar } from '@nivo/calendar';
import { useEffect, useReducer, useRef } from 'react';
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
import {
  NivoCalendarAlign,
  NivoCalendarDirection,
  NivoCalendarLegendPosition,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  data,
  NIVO_CALENDAR_ALIGN_DATA,
  NIVO_CALENDAR_CHART_COLORS,
  NIVO_CALENDAR_DIRECTION_DATA,
  NIVO_CALENDAR_LEGEND_POSITION_DATA,
} from './constants';
import {
  initialResponsiveCalendarChartState,
  responsiveCalendarChartAction,
  responsiveCalendarChartReducer,
} from './state';
import { ChartMargin } from '../chartControls/ChartMargin';
import { ChartOptions } from '../chartControls/ChartOptions';
import { ChartAndControlsDisplay } from '../chartAndControlsDisplay/ChartAndControlsDisplay';
import {
  ResponsiveCalendarChartProps,
  ResponsiveCalendarChartState,
} from './types';

function ResponsiveCalendarChart({
  calendarChartData,
  chartHeight = 350,
  chartWidth = 350,
  dashboardChartTitle,
  from,
  to,
  hideControls = false,
}: ResponsiveCalendarChartProps) {
  const {
    globalState: { width, themeObject, padding },
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
  const modifiedResponsiveCalendarChartState: ResponsiveCalendarChartState = {
    ...initialResponsiveCalendarChartState,
    chartTitle: dashboardChartTitle ?? 'Calendar Chart',
    emptyColor: grayColorShade,
    monthBorderColor: textColor,
    chartTitleColor: chartTextColor,
    dayBorderColor: textColor,
  };

  const [responsiveCalendarChartState, responsiveCalendarChartDispatch] =
    useReducer(
      responsiveCalendarChartReducer,
      modifiedResponsiveCalendarChartState
    );

  const chartRef = useRef(null);

  const {
    // base
    calendarDirection, // default: 'horizontal'
    calendarAlign, // default: 'center'

    // margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    // style
    emptyColor, // default: '#fff'
    enableDefaultColors, // default: true

    // years
    yearSpacing, // 0px - 160px default: 30 step: 1
    yearLegendPosition, // default: 'before'
    yearLegendOffset, // 0px - 60px default: 10

    // months
    monthSpacing, // 0px - 160px default: 0 step: 1
    monthBorderWidth, // 0px - 20px default: 2 step: 1
    monthBorderColor, // default: '#000'
    monthLegendPosition, // default: 'before'
    monthLegendOffset, // 0px - 36px default: 10

    // days
    daySpacing, // 0px - 20px default: 0 step: 1
    dayBorderWidth, // 0px - 20px default: 1 step: 1
    dayBorderColor, // default: '#000'

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
  } = responsiveCalendarChartState;

  const { primaryColor } = themeObject;
  const colorsArray = Object.entries(COLORS_SWATCHES).find(
    ([key, _value]) => key === primaryColor
  )?.[1];

  const displayCalendarChart = (
    <ResponsiveCalendar
      data={calendarChartData}
      from={from}
      to={to}
      // base
      direction={calendarDirection}
      align={calendarAlign}
      minValue="auto"
      maxValue="auto"
      // margin
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      // style
      emptyColor="#eeeeee"
      colors={enableDefaultColors ? NIVO_CALENDAR_CHART_COLORS : colorsArray}
      // years
      yearSpacing={yearSpacing}
      yearLegendPosition={yearLegendPosition}
      yearLegendOffset={yearLegendOffset}
      // months
      monthSpacing={monthSpacing}
      monthBorderWidth={monthBorderWidth}
      monthBorderColor={monthBorderColor}
      monthLegendPosition={monthLegendPosition}
      monthLegendOffset={monthLegendOffset}
      // days
      daySpacing={daySpacing}
      dayBorderWidth={dayBorderWidth}
      dayBorderColor={dayBorderColor}
      // interactivity
      isInteractive={true}
    />
  );

  if (hideControls) {
    return (
      <Group w={chartWidth} h={chartHeight}>
        {displayCalendarChart}
      </Group>
    );
  }

  const [
    enableDefaultColorsAccessibleSelectedText,
    enableDefaultColorsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: "Shades from App's theme color will be used",
    isSelected: enableDefaultColors,
    selectedDescription: 'Default color shades will be used',
    semanticName: 'Default Colors',
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
  const calendarDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_CALENDAR_DIRECTION_DATA,
      description: 'Define calendar direction.',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setCalendarDirection,
          payload: event.currentTarget.value as NivoCalendarDirection,
        });
      },
      value: calendarDirection,
      width: sliderWidth,
    };

  const calendarAlignSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_CALENDAR_ALIGN_DATA,
      description: 'Define calendar align.',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setCalendarAlign,
          payload: event.currentTarget.value as NivoCalendarAlign,
        });
      },
      value: calendarAlign,
      width: sliderWidth,
    };

  // style
  const createdEmptyColorInput = (
    <ColorInput
      aria-label="empty color"
      color={emptyColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setEmptyColor,
          payload: color,
        });
      }}
      value={emptyColor}
      w={sliderWidth}
    />
  );

  const createdEnableDefaultColorsSwitchInput = (
    <Switch
      aria-describedby={
        enableDefaultColors
          ? enableDefaultColorsAccessibleSelectedText.props.id
          : enableDefaultColorsAccessibleDeselectedText.props.id
      }
      checked={enableDefaultColors}
      description={
        enableDefaultColors
          ? enableDefaultColorsAccessibleSelectedText
          : enableDefaultColorsAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Toggle Default Colors
        </Text>
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setEnableDefaultColors,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  // years
  const yearSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'year spacing',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 160,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setYearSpacing,
        payload: value,
      });
    },
    sliderDefaultValue: 30,
    step: 1,
    value: yearSpacing,
    width: sliderWidth,
  };

  const yearLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_CALENDAR_LEGEND_POSITION_DATA,
      description: 'Define year legend position.',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setYearLegendPosition,
          payload: event.currentTarget.value as NivoCalendarLegendPosition,
        });
      },
      value: yearLegendPosition,
      width: sliderWidth,
    };

  const yearLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'year legend offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setYearLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 10,
      step: 1,
      value: yearLegendOffset,
      width: sliderWidth,
    };

  // months
  const monthSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'month spacing',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 160,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMonthSpacing,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: monthSpacing,
    width: sliderWidth,
  };

  const monthBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'month border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setMonthBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 2,
      step: 1,
      value: monthBorderWidth,
      width: sliderWidth,
    };

  const createdMonthBorderColorInput = (
    <ColorInput
      aria-label="month border color"
      color={monthBorderColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setMonthBorderColor,
          payload: color,
        });
      }}
      value={monthBorderColor}
      w={sliderWidth}
    />
  );

  const monthLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_CALENDAR_LEGEND_POSITION_DATA,
      description: 'Define month legend position.',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setMonthLegendPosition,
          payload: event.currentTarget.value as NivoCalendarLegendPosition,
        });
      },
      value: monthLegendPosition,
      width: sliderWidth,
    };

  const monthLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'month legend offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setMonthLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 10,
      step: 1,
      value: monthLegendOffset,
      width: sliderWidth,
    };

  // days
  const daySpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'day spacing',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 20,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setDaySpacing,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: daySpacing,
    width: sliderWidth,
  };

  const dayBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'day border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setDayBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: dayBorderWidth,
      width: sliderWidth,
    };

  const createdDayBorderColorInput = (
    <ColorInput
      aria-label="day border color"
      color={dayBorderColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setDayBorderColor,
          payload: color,
        });
      }}
      value={dayBorderColor}
      w={sliderWidth}
    />
  );

  // input creation

  // reset all button
  const [createdResetAllButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Reset',
      leftIcon: <BiReset />,
      semanticDescription: 'Reset all inputs to their default values',
      semanticName: 'Reset All',
      buttonOnClick: () => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.resetChartToDefault,
          payload: initialResponsiveCalendarChartState,
        });
      },
    },
  ]);

  // base
  const [createdCalendarDirectionSelectInput, createdCalendarAlignSelectInput] =
    returnAccessibleSelectInputElements([
      calendarDirectionSelectInputCreatorInfo,
      calendarAlignSelectInputCreatorInfo,
    ]);

  // years months days
  const [
    // years
    createdYearSpacingSliderInput,
    createdYearLegendOffsetSliderInput,
    // months
    createdMonthSpacingSliderInput,
    createdMonthBorderWidthSliderInput,
    createdMonthLegendOffsetSliderInput,
    // days
    createdDaySpacingSliderInput,
    createdDayBorderWidthSliderInput,
  ] = returnAccessibleSliderInputElements([
    // years
    yearSpacingSliderInputCreatorInfo,
    yearLegendOffsetSliderInputCreatorInfo,
    // months
    monthSpacingSliderInputCreatorInfo,
    monthBorderWidthSliderInputCreatorInfo,
    monthLegendOffsetSliderInputCreatorInfo,
    // days
    daySpacingSliderInputCreatorInfo,
    dayBorderWidthSliderInputCreatorInfo,
  ]);

  const [
    // years
    createdYearLegendPositionSelectInput,
    // months
    createdMonthLegendPositionSelectInput,
  ] = returnAccessibleSelectInputElements([
    // years
    yearLegendPositionSelectInputCreatorInfo,
    // months
    monthLegendPositionSelectInputCreatorInfo,
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
      <Title order={4} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayCalendarDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdCalendarDirectionSelectInput}
      label="Calendar Direction"
      value={calendarDirection}
    />
  );

  const displayCalendarAlignSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdCalendarAlignSelectInput}
      label="Calendar Align"
      value={calendarAlign}
    />
  );

  const displayBaseSection = (
    <Stack w="100%" style={{ borderTop: borderColor }}>
      {displayBaseHeading}
      {displayCalendarDirectionSelectInput}
      {displayCalendarAlignSelectInput}
    </Stack>
  );

  // margin
  const displayChartMargin = (
    <ChartMargin
      initialChartState={modifiedResponsiveCalendarChartState}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      padding={padding}
      parentChartAction={responsiveCalendarChartAction}
      parentChartDispatch={responsiveCalendarChartDispatch}
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
      <Title order={4} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayEmptyColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdEmptyColorInput}
      label="Empty Color"
      value={emptyColor}
    />
  );

  const displayEnableDefaultColorsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableDefaultColorsSwitchInput}
    </Group>
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayEmptyColorInput}
      {displayEnableDefaultColorsSwitchInput}
    </Stack>
  );

  // years
  const displayYearsHeading = (
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
      <Title order={4} color={textColor}>
        Years
      </Title>
    </Group>
  );

  const displayYearSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdYearSpacingSliderInput}
      label="Year Spacing"
      symbol="px"
      value={yearSpacing}
    />
  );

  const displayYearLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdYearLegendPositionSelectInput}
      label="Year Legend Position"
      value={yearLegendPosition}
    />
  );

  const displayYearLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdYearLegendOffsetSliderInput}
      label="Year Legend Offset"
      symbol="px"
      value={yearLegendOffset}
    />
  );

  const displayYearsSection = (
    <Stack w="100%">
      {displayYearsHeading}
      {displayYearSpacingSliderInput}
      {displayYearLegendPositionSelectInput}
      {displayYearLegendOffsetSliderInput}
    </Stack>
  );

  // months
  const displayMonthsHeading = (
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
      <Title order={4} color={textColor}>
        Months
      </Title>
    </Group>
  );

  const displayMonthSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdMonthSpacingSliderInput}
      label="Month Spacing"
      symbol="px"
      value={monthSpacing}
    />
  );

  const displayMonthBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdMonthBorderWidthSliderInput}
      label="Month Border Width"
      symbol="px"
      value={monthBorderWidth}
    />
  );

  const displayMonthBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdMonthBorderColorInput}
      label="Month Border Color"
      value={monthBorderColor}
    />
  );

  const displayMonthLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdMonthLegendPositionSelectInput}
      label="Month Legend Position"
      value={monthLegendPosition}
    />
  );

  const displayMonthLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdMonthLegendOffsetSliderInput}
      label="Month Legend Offset"
      symbol="px"
      value={monthLegendOffset}
    />
  );

  const displayMonthsSection = (
    <Stack w="100%">
      {displayMonthsHeading}
      {displayMonthSpacingSliderInput}
      {displayMonthBorderWidthSliderInput}
      {displayMonthBorderColorInput}
      {displayMonthLegendPositionSelectInput}
      {displayMonthLegendOffsetSliderInput}
    </Stack>
  );

  // days
  const displayDaysHeading = (
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
      <Title order={4} color={textColor}>
        Days
      </Title>
    </Group>
  );

  const displayDaySpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdDaySpacingSliderInput}
      label="Day Spacing"
      symbol="px"
      value={daySpacing}
    />
  );

  const displayDayBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdDayBorderWidthSliderInput}
      label="Day Border Width"
      symbol="px"
      value={dayBorderWidth}
    />
  );

  const displayDayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={createdDayBorderColorInput}
      label="Day Border Color"
      value={dayBorderColor}
    />
  );

  const displayDaysSection = (
    <Stack w="100%">
      {displayDaysHeading}
      {displayDaySpacingSliderInput}
      {displayDayBorderWidthSliderInput}
      {displayDayBorderColorInput}
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
      initialChartState={modifiedResponsiveCalendarChartState}
      isChartTitleFocused={isChartTitleFocused}
      isChartTitleValid={isChartTitleValid}
      isScreenshotFilenameFocused={isScreenshotFilenameFocused}
      isScreenshotFilenameValid={isScreenshotFilenameValid}
      padding={padding}
      parentChartAction={responsiveCalendarChartAction}
      parentChartDispatch={responsiveCalendarChartDispatch}
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
        initialChartState={modifiedResponsiveCalendarChartState}
        input={displayResetAllButton}
        label="Reset all values"
        value=""
      />
    </Stack>
  );

  // display
  const calendarChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayChartMargin}
      {displayStyleSection}
      {displayYearsSection}
      {displayMonthsSection}
      {displayDaysSection}
      {displayChartOptions}
      {displayResetAll}
    </Flex>
  );

  const displayChartAndControls = (
    <ChartAndControlsDisplay
      chartControlsStack={calendarChartControlsStack}
      chartRef={chartRef}
      chartTitle={chartTitle}
      chartTitleColor={chartTitleColor}
      chartTitlePosition={chartTitlePosition}
      chartTitleSize={chartTitleSize}
      padding={padding}
      responsiveChart={displayCalendarChart}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveCalendarChart };
