import {
  ColorInput,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useReducer, useRef } from "react";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleSliderInput } from "../../accessibleInputs/AccessibleSliderInput";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { ChartAndControlsDisplay } from "../chartAndControlsDisplay/ChartAndControlsDisplay";
import { ChartMargin } from "../chartControls/ChartMargin";
import { ChartOptions } from "../chartControls/ChartOptions";
import {
  returnChartOptionsStepperPages,
  SLIDER_TOOLTIP_COLOR,
  STICKY_STYLE,
} from "../constants";
import { ChartsAndGraphsControlsStacker } from "../utils";
import { responsiveCalendarChartAction } from "./actions";
import {
  NIVO_CALENDAR_ALIGN_DATA,
  NIVO_CALENDAR_CHART_COLORS,
  NIVO_CALENDAR_DIRECTION_DATA,
  NIVO_CALENDAR_LEGEND_POSITION_DATA,
} from "./constants";
import { responsiveCalendarChartReducer } from "./reducers";
import { initialResponsiveCalendarChartState } from "./state";
import type {
  ResponsiveCalendarChartProps,
  ResponsiveCalendarChartState,
} from "./types";

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
    globalState: { width, themeObject },
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
    chartTitle: dashboardChartTitle ?? "Calendar Chart",
    emptyColor: grayColorShade,
    monthBorderColor: textColor,
    chartTitleColor: chartTextColor,
    dayBorderColor: textColor,
  };

  const [responsiveCalendarChartState, responsiveCalendarChartDispatch] =
    useReducer(
      responsiveCalendarChartReducer,
      modifiedResponsiveCalendarChartState,
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

    // screenshot
    screenshotFilename,
    screenshotImageQuality, // 0 - 1 default: 1 step: 0.1
    screenshotImageType, // default: 'image/png'
  } = responsiveCalendarChartState;

  const { primaryColor } = themeObject;
  const colorsArray = Object.entries(COLORS_SWATCHES).find(
    ([key, _value]) => key === primaryColor,
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
      // valueFormat={(value) =>
      //   `${
      //     unitKind === 'currency' ? '$' : unitKind === 'percent' ? '%' : ''
      //   }${addCommaSeparator(value)}`
      // }
    />
  );

  if (hideControls) {
    return (
      <Group w={chartWidth} h={chartHeight}>
        {displayCalendarChart}
      </Group>
    );
  }

  /**
   * const enableArcLabelsSwitchInput = (
    <AccessibleSwitchInput
      attributes={{
        checked: enableArcLabels,
        invalidValueAction: parentChartAction.setPageInError,
        name: "enableArcLabels",
        offLabel: "Off",
        onLabel: "On",
        parentDispatch: parentChartDispatch,
        validValueAction: parentChartAction.setEnableArcLabels,
        value: enableArcLabels,
      }}
    />
  );

  const arcLabelSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: NIVO_SUNBURST_ARC_LABEL_DATA,
        description: "Define arc label",
        name: "arcLabel",
        parentDispatch: parentChartDispatch,
        validValueAction: parentChartAction.setArcLabel,
        value: arcLabel,
      }}
    />
  );

  const arcLabelsRadiusOffsetSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value}</Text>
        ),
        max: 2,
        min: 0,
        name: "arcLabelsRadiusOffset",
        parentDispatch: parentChartDispatch,
        sliderDefaultValue: 0.5,
        step: 0.05,
        validValueAction: parentChartAction.setArcLabelsRadiusOffset,
        value: arcLabelsRadiusOffset,
      }}
    />
  );
   */

  // base
  const calendarDirectionSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: NIVO_CALENDAR_DIRECTION_DATA,
        description: "Define calendar direction",
        name: "calendarDirection",
        validValueAction: responsiveCalendarChartAction.setCalendarDirection,
        value: calendarDirection,
      }}
    />
  );

  const calendarAlignSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: NIVO_CALENDAR_ALIGN_DATA,
        description: "Define calendar align",
        name: "calendarAlign",
        validValueAction: responsiveCalendarChartAction.setCalendarAlign,
        value: calendarAlign,
      }}
    />
  );

  // style
  const emptyColorInput = (
    <ColorInput
      aria-label="empty color"
      color={emptyColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          action: responsiveCalendarChartAction.setEmptyColor,
          payload: color,
        });
      }}
      value={emptyColor}
    />
  );

  const enableDefaultColorsSwitchInput = (
    <AccessibleSwitchInput
      attributes={{
        checked: enableDefaultColors,
        invalidValueAction: responsiveCalendarChartAction.setPageInError,
        name: "enableDefaultColors",
        offLabel: "Off",
        onLabel: "On",
        parentDispatch: responsiveCalendarChartDispatch,
        validValueAction: responsiveCalendarChartAction.setEnableDefaultColors,
        value: enableDefaultColors,
      }}
    />
  );

  // years
  const yearSpacingSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 160,
        min: 0,
        name: "yearSpacing",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 30,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setYearSpacing,
        value: yearSpacing,
      }}
    />
  );

  const yearLegendPositionSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: NIVO_CALENDAR_LEGEND_POSITION_DATA,
        description: "Define year legend position",
        name: "yearLegendPosition",
        validValueAction: responsiveCalendarChartAction.setYearLegendPosition,
        value: yearLegendPosition,
      }}
    />
  );

  const yearLegendOffsetSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 60,
        min: 0,
        name: "yearLegendOffset",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 10,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setYearLegendOffset,
        value: yearLegendOffset,
      }}
    />
  );

  // months

  const monthSpacingSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 160,
        min: 0,
        name: "monthSpacing",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 0,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setMonthSpacing,
        value: monthSpacing,
      }}
    />
  );

  const monthBorderWidthSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 20,
        min: 0,
        name: "monthBorderWidth",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 2,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setMonthBorderWidth,
        value: monthBorderWidth,
      }}
    />
  );

  const monthBorderColorInput = (
    <ColorInput
      aria-label="month border color"
      color={monthBorderColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          action: responsiveCalendarChartAction.setMonthBorderColor,
          payload: color,
        });
      }}
      value={monthBorderColor}
    />
  );

  const monthLegendPositionSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: NIVO_CALENDAR_LEGEND_POSITION_DATA,
        description: "Define month legend position",
        name: "monthLegendPosition",
        validValueAction: responsiveCalendarChartAction.setMonthLegendPosition,
        value: monthLegendPosition,
      }}
    />
  );

  const monthLegendOffsetSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 36,
        min: 0,
        name: "monthLegendOffset",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 10,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setMonthLegendOffset,
        value: monthLegendOffset,
      }}
    />
  );

  // days

  const daySpacingSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 20,
        min: 0,
        name: "daySpacing",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 0,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setDaySpacing,
        value: daySpacing,
      }}
    />
  );

  const dayBorderWidthSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => (
          <Text style={{ color: SLIDER_TOOLTIP_COLOR }}>{value} px</Text>
        ),
        max: 20,
        min: 0,
        name: "dayBorderWidth",
        parentDispatch: responsiveCalendarChartDispatch,
        sliderDefaultValue: 1,
        step: 1,
        validValueAction: responsiveCalendarChartAction.setDayBorderWidth,
        value: dayBorderWidth,
      }}
    />
  );

  const dayBorderColorInput = (
    <ColorInput
      aria-label="day border color"
      color={dayBorderColor}
      onChange={(color: string) => {
        responsiveCalendarChartDispatch({
          action: responsiveCalendarChartAction.setDayBorderColor,
          payload: color,
        });
      }}
      value={dayBorderColor}
    />
  );

  // reset all button
  const resetAllButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Reset all inputs to their default values",
        kind: "reset",
        name: "resetAll",
        onClick: () => {
          responsiveCalendarChartDispatch({
            action: responsiveCalendarChartAction.resetChartToDefault,
            payload: initialResponsiveCalendarChartState,
          });
        },
      }}
    />
  );

  // input display

  // base
  const displayBaseHeading = (
    <Group
      bg={sectionHeadersBgColor}
      style={STICKY_STYLE}
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
      input={calendarDirectionSelectInput}
      label="Calendar Direction"
      value={calendarDirection}
    />
  );

  const displayCalendarAlignSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={calendarAlignSelectInput}
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
      style={STICKY_STYLE}
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
      input={emptyColorInput}
      label="Empty Color"
      value={emptyColor}
    />
  );

  const displayEnableDefaultColorsSwitchInput = (
    <Group w="100%" style={{ borderBottom: borderColor }}>
      {enableDefaultColorsSwitchInput}
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
      style={STICKY_STYLE}
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
      input={yearSpacingSliderInput}
      label="Year Spacing"
      symbol="px"
      value={yearSpacing}
    />
  );

  const displayYearLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={yearLegendPositionSelectInput}
      label="Year Legend Position"
      value={yearLegendPosition}
    />
  );

  const displayYearLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={yearLegendOffsetSliderInput}
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
      style={STICKY_STYLE}
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
      input={monthSpacingSliderInput}
      label="Month Spacing"
      symbol="px"
      value={monthSpacing}
    />
  );

  const displayMonthBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={monthBorderWidthSliderInput}
      label="Month Border Width"
      symbol="px"
      value={monthBorderWidth}
    />
  );

  const displayMonthBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={monthBorderColorInput}
      label="Month Border Color"
      value={monthBorderColor}
    />
  );

  const displayMonthLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={monthLegendPositionSelectInput}
      label="Month Legend Position"
      value={monthLegendPosition}
    />
  );

  const displayMonthLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={monthLegendOffsetSliderInput}
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
      style={STICKY_STYLE}
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
      input={daySpacingSliderInput}
      label="Day Spacing"
      symbol="px"
      value={daySpacing}
    />
  );

  const displayDayBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={dayBorderWidthSliderInput}
      label="Day Border Width"
      symbol="px"
      value={dayBorderWidth}
    />
  );

  const displayDayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedResponsiveCalendarChartState}
      input={dayBorderColorInput}
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
      parentChartAction={responsiveCalendarChartAction}
      parentChartDispatch={responsiveCalendarChartDispatch}
      screenshotFilename={screenshotFilename}
      screenshotImageQuality={screenshotImageQuality}
      screenshotImageType={screenshotImageType}
      sectionHeadersBgColor={sectionHeadersBgColor}
      stepperPages={returnChartOptionsStepperPages()}
      textColor={textColor}
      width={width}
    />
  );

  const displayResetAllButton = (
    <Tooltip label="Reset all inputs to their default values">
      <Group>{resetAllButton}</Group>
    </Tooltip>
  );

  const displayResetAll = (
    <Stack w="100%">
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
      responsiveChart={displayCalendarChart}
      scrollBarStyle={scrollBarStyle}
      width={width}
    />
  );

  return displayChartAndControls;
}

export { ResponsiveCalendarChart };
