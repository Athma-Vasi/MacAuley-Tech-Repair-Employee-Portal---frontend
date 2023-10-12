import {
  ResponsiveCalendarChartAction,
  ResponsiveCalendarChartDispatch,
  ResponsiveCalendarChartState,
} from './types';

/**
 * type ResponsiveCalendarChartState = {
  // base
  direction: NivoCalendarDirection; // default: 'horizontal'
  align: NivoCalendarAlign; // default: 'center'
  enableMinValue: boolean; // default: false ? minValue = 'auto'
  minValue: number; // number default: 0
  enableMaxValue: boolean; // default: true ? maxValue : maxValue = 'auto'
  maxValue: number; // number default: 100

  // margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  // style
  chartColors: string[]; // color array, default: emptyColor
  emptyColor: string; // default: '#fff'

  // years
  yearSpacing: number; // 0px - 160px default: 30 step: 1
  yearLegendPosition: NivoCalendarLegendPosition; // default: 'before'
  yearLegendOffset: number; // 0px - 60px default: 10

  // months
  monthSpacing: number; // 0px - 160px default: 0 step: 1
  monthBorderWidth: number; // 0px - 20px default: 2 step: 1
  monthBorderColor: string; // default: '#000'
  monthLegendPosition: NivoCalendarLegendPosition; // default: 'before'
  monthLegendOffset: number; // 0px - 36px default: 10

  // days
  daySpacing: number; // 0px - 20px default: 0 step: 1
  dayBorderWidth: number; // 0px - 20px default: 1 step: 1
  dayBorderColor: string; // default: '#000'
};
 */

const initialResponsiveCalendarChartState: ResponsiveCalendarChartState = {
  // base
  direction: 'horizontal',
  align: 'center',
  enableMinValue: false,
  minValue: 0,
  enableMaxValue: true,
  maxValue: 100,

  // margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  // style
  chartColors: [],
  emptyColor: '#fff',

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
};

const responsiveCalendarChartAction: ResponsiveCalendarChartAction = {
  // base
  setDirection: 'setDirection',
  setAlign: 'setAlign',
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
  setChartColors: 'setChartColors',
  setEmptyColor: 'setEmptyColor',

  // years
  setYearSpacing: 'setYearSpacing',
  setYearLegendPosition: 'setYearLegendPosition',
  setYearLegendOffset: 'setYearLegendOffset',

  // months
  setMonthSpacing: 'setMonthSpacing',
  setMonthBorderWidth: 'setMonthBorderWidth',
  setMonthBorderColor: 'setMonthBorderColor',

  // days
  setDaySpacing: 'setDaySpacing',
  setDayBorderWidth: 'setDayBorderWidth',
  setDayBorderColor: 'setDayBorderColor',
};

function responsiveCalendarChartReducer(
  state: ResponsiveCalendarChartState,
  action: ResponsiveCalendarChartDispatch
): ResponsiveCalendarChartState {
  switch (action.type) {
    // base
    case responsiveCalendarChartAction.setDirection:
      return {
        ...state,
        direction: action.payload,
      };
    case responsiveCalendarChartAction.setAlign:
      return {
        ...state,
        align: action.payload,
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
    case responsiveCalendarChartAction.setChartColors:
      return {
        ...state,
        chartColors: action.payload,
      };
    case responsiveCalendarChartAction.setEmptyColor:
      return {
        ...state,
        emptyColor: action.payload,
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

    default:
      return state;
  }
}

export {
  initialResponsiveCalendarChartState,
  responsiveCalendarChartAction,
  responsiveCalendarChartReducer,
};
