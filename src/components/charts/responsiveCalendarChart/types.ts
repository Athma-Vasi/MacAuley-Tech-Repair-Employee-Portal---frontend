import {
  NivoCalendarAlign,
  NivoCalendarDirection,
  NivoCalendarLegendPosition,
} from '../types';

type ResponsiveCalendarChartState = {
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

type ResponsiveCalendarChartAction = {
  // base
  setDirection: 'setDirection';
  setAlign: 'setAlign';
  setEnableMinValue: 'setEnableMinValue';
  setMinValue: 'setMinValue';
  setEnableMaxValue: 'setEnableMaxValue';
  setMaxValue: 'setMaxValue';

  // margin
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  // style
  setChartColors: 'setChartColors';
  setEmptyColor: 'setEmptyColor';

  // years
  setYearSpacing: 'setYearSpacing';
  setYearLegendPosition: 'setYearLegendPosition';
  setYearLegendOffset: 'setYearLegendOffset';

  // months
  setMonthSpacing: 'setMonthSpacing';
  setMonthBorderWidth: 'setMonthBorderWidth';
  setMonthBorderColor: 'setMonthBorderColor';

  // days
  setDaySpacing: 'setDaySpacing';
  setDayBorderWidth: 'setDayBorderWidth';
  setDayBorderColor: 'setDayBorderColor';
};

type ResponsiveCalendarChartDispatch =
  | {
      type: ResponsiveCalendarChartAction['setDirection'];
      payload: NivoCalendarDirection;
    }
  | {
      type: ResponsiveCalendarChartAction['setAlign'];
      payload: NivoCalendarAlign;
    }
  | {
      type:
        | ResponsiveCalendarChartAction['setEnableMinValue']
        | ResponsiveCalendarChartAction['setEnableMaxValue'];
      payload: boolean;
    }
  | {
      type: ResponsiveCalendarChartAction['setMinValue'];
      payload: number;
    }
  | {
      type:
        | ResponsiveCalendarChartAction['setMaxValue']
        | ResponsiveCalendarChartAction['setMarginTop']
        | ResponsiveCalendarChartAction['setMarginRight']
        | ResponsiveCalendarChartAction['setMarginBottom']
        | ResponsiveCalendarChartAction['setMarginLeft']
        | ResponsiveCalendarChartAction['setYearSpacing']
        | ResponsiveCalendarChartAction['setYearLegendOffset']
        | ResponsiveCalendarChartAction['setMonthSpacing']
        | ResponsiveCalendarChartAction['setMonthBorderWidth']
        | ResponsiveCalendarChartAction['setDaySpacing']
        | ResponsiveCalendarChartAction['setDayBorderWidth'];
      payload: number;
    }
  | {
      type: ResponsiveCalendarChartAction['setChartColors'];
      payload: string[];
    }
  | {
      type:
        | ResponsiveCalendarChartAction['setEmptyColor']
        | ResponsiveCalendarChartAction['setMonthBorderColor']
        | ResponsiveCalendarChartAction['setDayBorderColor'];
      payload: string;
    }
  | {
      type: ResponsiveCalendarChartAction['setYearLegendPosition'];
      payload: NivoCalendarLegendPosition;
    };

export type {
  ResponsiveCalendarChartAction,
  ResponsiveCalendarChartDispatch,
  ResponsiveCalendarChartState,
};
