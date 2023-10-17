import {
  ResponsiveCalendarChartAction,
  ResponsiveCalendarChartDispatch,
  ResponsiveCalendarChartState,
} from './types';

const initialResponsiveCalendarChartState: ResponsiveCalendarChartState = {
  // base
  calendarDirection: 'horizontal',
  calendarAlign: 'center',
  enableMinValue: false,
  minValue: 0,
  enableMaxValue: false,
  maxValue: 100,

  // margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  // style
  emptyColor: '#fff',
  enableDefaultColors: true,

  // years
  yearSpacing: 30,
  yearLegendPosition: 'before',
  yearLegendOffset: 10,

  // months
  monthSpacing: 0,
  monthBorderWidth: 2,
  monthBorderColor: '#000',
  monthLegendPosition: 'before',
  monthLegendOffset: 10,

  // days
  daySpacing: 0,
  dayBorderWidth: 1,
  dayBorderColor: '#000',

  // options
  chartTitle: '',
  chartTitleColor: 'dark',
  chartTitlePosition: 'center',
  chartTitleSize: 3,
  isChartTitleFocused: false,
  isChartTitleValid: false,

  // screenshot
  isScreenshotFilenameFocused: false,
  isScreenshotFilenameValid: false,
  screenshotFilename: '',
  screenshotImageQuality: 1,
  screenshotImageType: 'image/png',
};

const responsiveCalendarChartAction: ResponsiveCalendarChartAction = {
  // base
  setCalendarDirection: 'setCalendarDirection',
  setCalendarAlign: 'setCalendarAlign',
  setEnableMinValue: 'setEnableMinValue',
  setMinValue: 'setMinValue',
  setEnableMaxValue: 'setEnableMaxValue',
  setMaxValue: 'setMaxValue',

  // margin
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  // style
  setEmptyColor: 'setEmptyColor',
  setEnableDefaultColors: 'setEnableDefaultColors',

  // years
  setYearSpacing: 'setYearSpacing',
  setYearLegendPosition: 'setYearLegendPosition',
  setYearLegendOffset: 'setYearLegendOffset',

  // months
  setMonthSpacing: 'setMonthSpacing',
  setMonthBorderWidth: 'setMonthBorderWidth',
  setMonthBorderColor: 'setMonthBorderColor',
  setMonthLegendPosition: 'setMonthLegendPosition',
  setMonthLegendOffset: 'setMonthLegendOffset',

  // days
  setDaySpacing: 'setDaySpacing',
  setDayBorderWidth: 'setDayBorderWidth',
  setDayBorderColor: 'setDayBorderColor',

  // options
  setChartTitle: 'setChartTitle',
  setChartTitleColor: 'setChartTitleColor',
  setChartTitlePosition: 'setChartTitlePosition',
  setChartTitleSize: 'setChartTitleSize',
  setIsChartTitleFocused: 'setIsChartTitleFocused',
  setIsChartTitleValid: 'setIsChartTitleValid',

  // screenshot
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused',
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid',
  setScreenshotFilename: 'setScreenshotFilename',
  setScreenshotImageQuality: 'setScreenshotImageQuality',
  setScreenshotImageType: 'setScreenshotImageType',

  // reset all
  resetChartToDefault: 'resetChartToDefault',
};

function responsiveCalendarChartReducer(
  state: ResponsiveCalendarChartState,
  action: ResponsiveCalendarChartDispatch
): ResponsiveCalendarChartState {
  switch (action.type) {
    // base
    case responsiveCalendarChartAction.setCalendarDirection:
      return {
        ...state,
        calendarDirection: action.payload,
      };
    case responsiveCalendarChartAction.setCalendarAlign:
      return {
        ...state,
        calendarAlign: action.payload,
      };
    case responsiveCalendarChartAction.setEnableMinValue:
      return {
        ...state,
        enableMinValue: action.payload,
      };
    case responsiveCalendarChartAction.setMinValue:
      return {
        ...state,
        minValue: action.payload,
      };
    case responsiveCalendarChartAction.setEnableMaxValue:
      return {
        ...state,
        enableMaxValue: action.payload,
      };
    case responsiveCalendarChartAction.setMaxValue:
      return {
        ...state,
        maxValue: action.payload,
      };

    // margin
    case responsiveCalendarChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsiveCalendarChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsiveCalendarChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsiveCalendarChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };

    // style
    case responsiveCalendarChartAction.setEmptyColor:
      return {
        ...state,
        emptyColor: action.payload,
      };
    case responsiveCalendarChartAction.setEnableDefaultColors:
      return {
        ...state,
        enableDefaultColors: action.payload,
      };

    // years
    case responsiveCalendarChartAction.setYearSpacing:
      return {
        ...state,
        yearSpacing: action.payload,
      };
    case responsiveCalendarChartAction.setYearLegendPosition:
      return {
        ...state,
        yearLegendPosition: action.payload,
      };
    case responsiveCalendarChartAction.setYearLegendOffset:
      return {
        ...state,
        yearLegendOffset: action.payload,
      };

    // months
    case responsiveCalendarChartAction.setMonthSpacing:
      return {
        ...state,
        monthSpacing: action.payload,
      };
    case responsiveCalendarChartAction.setMonthBorderWidth:
      return {
        ...state,
        monthBorderWidth: action.payload,
      };
    case responsiveCalendarChartAction.setMonthBorderColor:
      return {
        ...state,
        monthBorderColor: action.payload,
      };
    case responsiveCalendarChartAction.setMonthLegendPosition:
      return {
        ...state,
        monthLegendPosition: action.payload,
      };
    case responsiveCalendarChartAction.setMonthLegendOffset:
      return {
        ...state,
        monthLegendOffset: action.payload,
      };

    // days
    case responsiveCalendarChartAction.setDaySpacing:
      return {
        ...state,
        daySpacing: action.payload,
      };
    case responsiveCalendarChartAction.setDayBorderWidth:
      return {
        ...state,
        dayBorderWidth: action.payload,
      };
    case responsiveCalendarChartAction.setDayBorderColor:
      return {
        ...state,
        dayBorderColor: action.payload,
      };

    // options
    case responsiveCalendarChartAction.setChartTitle:
      return {
        ...state,
        chartTitle: action.payload,
      };
    case responsiveCalendarChartAction.setChartTitleColor:
      return {
        ...state,
        chartTitleColor: action.payload,
      };
    case responsiveCalendarChartAction.setChartTitlePosition:
      return {
        ...state,
        chartTitlePosition: action.payload,
      };
    case responsiveCalendarChartAction.setChartTitleSize:
      return {
        ...state,
        chartTitleSize: action.payload,
      };
    case responsiveCalendarChartAction.setIsChartTitleFocused:
      return {
        ...state,
        isChartTitleFocused: action.payload,
      };
    case responsiveCalendarChartAction.setIsChartTitleValid:
      return {
        ...state,
        isChartTitleValid: action.payload,
      };

    // screenshot
    case responsiveCalendarChartAction.setIsScreenshotFilenameFocused:
      return {
        ...state,
        isScreenshotFilenameFocused: action.payload,
      };
    case responsiveCalendarChartAction.setIsScreenshotFilenameValid:
      return {
        ...state,
        isScreenshotFilenameValid: action.payload,
      };
    case responsiveCalendarChartAction.setScreenshotFilename:
      return {
        ...state,
        screenshotFilename: action.payload,
      };
    case responsiveCalendarChartAction.setScreenshotImageQuality:
      return {
        ...state,
        screenshotImageQuality: action.payload,
      };
    case responsiveCalendarChartAction.setScreenshotImageType:
      return {
        ...state,
        screenshotImageType: action.payload,
      };

    // reset all
    case responsiveCalendarChartAction.resetChartToDefault:
      return { ...action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveCalendarChartState,
  responsiveCalendarChartAction,
  responsiveCalendarChartReducer,
};
