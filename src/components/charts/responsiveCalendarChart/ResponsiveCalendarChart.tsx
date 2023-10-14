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
import { useEffect, useReducer } from 'react';
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

function ResponsiveCalendarChart() {
  const [responsiveCalendarChartState, responsiveCalendarChartDispatch] =
    useReducer(
      responsiveCalendarChartReducer,
      initialResponsiveCalendarChartState
    );

  const {
    globalState: { width, themeObject, padding },
  } = useGlobalState();

  const {
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { textColor },
    appThemeColors: { borderColor },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const {
    // base
    calendarDirection, // default: 'horizontal'
    calendarAlign, // default: 'center'
    enableMinValue, // default: false ? minValue = 'auto'
    minValue, // -300 - 300 default: 0
    enableMaxValue, // default: true ? maxValue : maxValue = 'auto'
    maxValue, // 0 - 600 default: 100

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
  } = responsiveCalendarChartState;

  const [
    enableMinValueAccessibleSelectedText,
    enableMinValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Min value will be automatically calculated',
    isSelected: enableMinValue,
    selectedDescription: 'Please provide a min value',
    semanticName: 'Min Value',
    theme: 'muted',
  });

  const [
    enableMaxValueAccessibleSelectedText,
    enableMaxValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Max value will be automatically calculated',
    isSelected: enableMaxValue,
    selectedDescription: 'Please provide a max value',
    semanticName: 'Max Value',
    theme: 'muted',
  });

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
          Toggle Min Value
        </Text>
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setEnableMinValue,
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
    max: 300,
    min: -300,
    onChangeSlider: (value: number) => {
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMinValue,
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
          Toggle Max Value
        </Text>
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        responsiveCalendarChartDispatch({
          type: responsiveCalendarChartAction.setEnableMaxValue,
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
    max: 600,
    min: 0,
    onChangeSlider: (value: number) => {
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMaxValue,
        payload: value,
      });
    },
    sliderDefaultValue: 100,
    step: 1,
    value: maxValue,
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
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMarginTop,
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
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMarginRight,
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
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMarginBottom,
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
      responsiveCalendarChartDispatch({
        type: responsiveCalendarChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 60,
    step: 1,
    value: marginLeft,
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

  const [createdMinValueSliderInput, createdMaxValueSliderInput] =
    returnAccessibleSliderInputElements([
      minValueSliderInputCreatorInfo,
      maxValueSliderInputCreatorInfo,
    ]);

  // margin
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
  // title
  const displayResetButton = (
    <Tooltip label="Reset all inputs to their default values">
      <Group>{createdResetAllButton}</Group>
    </Tooltip>
  );

  const displayControlsHeading = (
    <Group bg={sectionHeadersBgColor} p={padding} w="100%" position="apart">
      <Title order={3} color={textColor}>
        Calendar Chart Controls
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
      <Title order={4} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayCalendarDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdCalendarDirectionSelectInput}
      label="Calendar Direction"
      value={calendarDirection}
    />
  );

  const displayCalendarAlignSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdCalendarAlignSelectInput}
      label="Calendar Align"
      value={calendarAlign}
    />
  );

  const displayEnableMinValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableMinValueSwitchInput}
    </Group>
  );

  const displayMinValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMinValueSliderInput}
      isInputDisabled={!enableMinValue}
      label="Min Value"
      value={minValue}
    />
  );

  const displayEnableMaxValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableMaxValueSwitchInput}
    </Group>
  );

  const displayMaxValueSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMaxValueSliderInput}
      isInputDisabled={!enableMaxValue}
      label="Max Value"
      value={maxValue}
    />
  );

  const displayBaseSection = (
    <Stack w="100%" style={{ borderTop: borderColor }}>
      {displayBaseHeading}
      {displayCalendarDirectionSelectInput}
      {displayCalendarAlignSelectInput}
      {displayEnableMinValueSwitchInput}
      {displayMinValueSliderInput}
      {displayEnableMaxValueSwitchInput}
      {displayMaxValueSliderInput}
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
      <Title order={4} color={textColor}>
        Margin
      </Title>
    </Group>
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMarginTopSliderInput}
      label="Margin Top"
      symbol="px"
      value={marginTop}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMarginRightSliderInput}
      label="Margin Right"
      symbol="px"
      value={marginRight}
    />
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMarginBottomSliderInput}
      label="Margin Bottom"
      symbol="px"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMarginLeftSliderInput}
      label="Margin Left"
      symbol="px"
      value={marginLeft}
    />
  );

  const displayMarginSection = (
    <Stack w="100%" style={{ borderTop: borderColor }}>
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
      <Title order={4} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayEmptyColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
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
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={4} color={textColor}>
        Years
      </Title>
    </Group>
  );

  const displayYearSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdYearSpacingSliderInput}
      label="Year Spacing"
      symbol="px"
      value={yearSpacing}
    />
  );

  const displayYearLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdYearLegendPositionSelectInput}
      label="Year Legend Position"
      value={yearLegendPosition}
    />
  );

  const displayYearLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
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
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={4} color={textColor}>
        Months
      </Title>
    </Group>
  );

  const displayMonthSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMonthSpacingSliderInput}
      label="Month Spacing"
      symbol="px"
      value={monthSpacing}
    />
  );

  const displayMonthBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMonthBorderWidthSliderInput}
      label="Month Border Width"
      symbol="px"
      value={monthBorderWidth}
    />
  );

  const displayMonthBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMonthBorderColorInput}
      label="Month Border Color"
      value={monthBorderColor}
    />
  );

  const displayMonthLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdMonthLegendPositionSelectInput}
      label="Month Legend Position"
      value={monthLegendPosition}
    />
  );

  const displayMonthLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
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
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={4} color={textColor}>
        Days
      </Title>
    </Group>
  );

  const displayDaySpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdDaySpacingSliderInput}
      label="Day Spacing"
      symbol="px"
      value={daySpacing}
    />
  );

  const displayDayBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
      input={createdDayBorderWidthSliderInput}
      label="Day Border Width"
      symbol="px"
      value={dayBorderWidth}
    />
  );

  const displayDayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialResponsiveCalendarChartState}
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

  // display
  const calendarChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayControlsHeading}
      {displayBaseSection}
      {displayMarginSection}
      {displayStyleSection}
      {displayYearsSection}
      {displayMonthsSection}
      {displayDaysSection}
    </Flex>
  );

  const displayCalendarChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h="70vh" py={padding}>
        <Grid.Col span={1}>{calendarChartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
  );

  const { primaryColor } = themeObject;
  const colorsArray = Object.entries(COLORS_SWATCHES).find(
    ([key, value]) => key === primaryColor
  )?.[1];

  const displayCalendarChart = (
    <ResponsiveCalendar
      data={data}
      from="2015-03-01"
      to="2016-07-12"
      // base
      direction={calendarDirection}
      align={calendarAlign}
      minValue={enableMinValue ? minValue : void 0}
      maxValue={enableMaxValue ? maxValue : void 0}
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

  const displayResponsiveCalendarChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayCalendarChartControls}
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
        {displayCalendarChart}
      </Grid.Col>
    </Grid>
  );

  return displayResponsiveCalendarChartComponent;
}

export { ResponsiveCalendarChart };
