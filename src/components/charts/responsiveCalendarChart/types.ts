import { TitleOrder } from "@mantine/core";

import { ScreenshotImageType } from "../../../types";
import {
  NivoCalendarAlign,
  NivoCalendarDirection,
  NivoCalendarLegendPosition,
  NivoChartTitlePosition,
} from "../types";

type CalendarChartData = {
  day: string; // YYYY-MM-DD
  value: number;
};

type ResponsiveCalendarChartProps = {
  calendarChartData: CalendarChartData[];
  chartHeight?: number;
  chartWidth?: number;
  dashboardChartTitle?: string;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  hideControls?: boolean;
};

type ResponsiveCalendarChartState = {
  // base
  calendarAlign: NivoCalendarAlign; // default: 'center'
  calendarDirection: NivoCalendarDirection; // default: 'horizontal'

  // margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  // style
  emptyColor: string; // default: '#fff'
  enableDefaultColors: boolean; // default: true

  // years
  yearLegendOffset: number; // 0px - 60px default: 10
  yearLegendPosition: NivoCalendarLegendPosition; // default: 'before'
  yearSpacing: number; // 0px - 160px default: 30 step: 1

  // months
  monthBorderColor: string; // default: '#000'
  monthBorderWidth: number; // 0px - 20px default: 2 step: 1
  monthLegendOffset: number; // 0px - 36px default: 10
  monthLegendPosition: NivoCalendarLegendPosition; // default: 'before'
  monthSpacing: number; // 0px - 160px default: 0 step: 1

  // days
  dayBorderColor: string; // default: '#000'
  dayBorderWidth: number; // 0px - 20px default: 1 step: 1
  daySpacing: number; // 0px - 20px default: 0 step: 1

  // options
  chartTitle: string;
  chartTitleColor: string; // default: #ffffff
  chartTitlePosition: NivoChartTitlePosition; // default: center
  chartTitleSize: TitleOrder; // 1 - 6 px default: 3 step: 1
  isChartTitleFocused: boolean;
  isChartTitleValid: boolean;

  // screenshot
  isScreenshotFilenameFocused: boolean;
  isScreenshotFilenameValid: boolean;
  screenshotFilename: string;
  screenshotImageQuality: number; // 0 - 1 default: 1 step: 0.05
  screenshotImageType: ScreenshotImageType;
};

type ResponsiveCalendarChartAction = {
  // base
  setCalendarAlign: "setCalendarAlign";
  setCalendarDirection: "setCalendarDirection";

  // margin
  setMarginTop: "setMarginTop";
  setMarginRight: "setMarginRight";
  setMarginBottom: "setMarginBottom";
  setMarginLeft: "setMarginLeft";

  // style
  setEmptyColor: "setEmptyColor";
  setEnableDefaultColors: "setEnableDefaultColors";

  // years
  setYearLegendOffset: "setYearLegendOffset";
  setYearLegendPosition: "setYearLegendPosition";
  setYearSpacing: "setYearSpacing";

  // months
  setMonthBorderColor: "setMonthBorderColor";
  setMonthBorderWidth: "setMonthBorderWidth";
  setMonthLegendOffset: "setMonthLegendOffset";
  setMonthLegendPosition: "setMonthLegendPosition";
  setMonthSpacing: "setMonthSpacing";

  // days
  setDayBorderColor: "setDayBorderColor";
  setDayBorderWidth: "setDayBorderWidth";
  setDaySpacing: "setDaySpacing";

  // options
  setChartTitle: "setChartTitle";
  setChartTitleColor: "setChartTitleColor";
  setChartTitlePosition: "setChartTitlePosition";
  setChartTitleSize: "setChartTitleSize";
  setIsChartTitleFocused: "setIsChartTitleFocused";
  setIsChartTitleValid: "setIsChartTitleValid";

  // screenshot
  setIsScreenshotFilenameFocused: "setIsScreenshotFilenameFocused";
  setIsScreenshotFilenameValid: "setIsScreenshotFilenameValid";
  setScreenshotFilename: "setScreenshotFilename";
  setScreenshotImageQuality: "setScreenshotImageQuality";
  setScreenshotImageType: "setScreenshotImageType";

  // reset all
  resetChartToDefault: "resetChartToDefault";
};

type ResponsiveCalendarChartDispatch =
  | {
      type: ResponsiveCalendarChartAction["setCalendarDirection"];
      payload: NivoCalendarDirection;
    }
  | {
      type: ResponsiveCalendarChartAction["setCalendarAlign"];
      payload: NivoCalendarAlign;
    }
  | {
      type:
        | ResponsiveCalendarChartAction["setEnableDefaultColors"]
        | ResponsiveCalendarChartAction["setIsChartTitleFocused"]
        | ResponsiveCalendarChartAction["setIsChartTitleValid"]
        | ResponsiveCalendarChartAction["setIsScreenshotFilenameFocused"]
        | ResponsiveCalendarChartAction["setIsScreenshotFilenameValid"];

      payload: boolean;
    }
  | {
      type:
        | ResponsiveCalendarChartAction["setDayBorderWidth"]
        | ResponsiveCalendarChartAction["setDaySpacing"]
        | ResponsiveCalendarChartAction["setMarginBottom"]
        | ResponsiveCalendarChartAction["setMarginLeft"]
        | ResponsiveCalendarChartAction["setMarginRight"]
        | ResponsiveCalendarChartAction["setMarginTop"]
        | ResponsiveCalendarChartAction["setMonthBorderWidth"]
        | ResponsiveCalendarChartAction["setMonthLegendOffset"]
        | ResponsiveCalendarChartAction["setMonthSpacing"]
        | ResponsiveCalendarChartAction["setScreenshotImageQuality"]
        | ResponsiveCalendarChartAction["setYearLegendOffset"]
        | ResponsiveCalendarChartAction["setYearSpacing"];

      payload: number;
    }
  | {
      type:
        | ResponsiveCalendarChartAction["setChartTitle"]
        | ResponsiveCalendarChartAction["setChartTitleColor"]
        | ResponsiveCalendarChartAction["setDayBorderColor"]
        | ResponsiveCalendarChartAction["setEmptyColor"]
        | ResponsiveCalendarChartAction["setMonthBorderColor"]
        | ResponsiveCalendarChartAction["setScreenshotFilename"];

      payload: string;
    }
  | {
      type:
        | ResponsiveCalendarChartAction["setYearLegendPosition"]
        | ResponsiveCalendarChartAction["setMonthLegendPosition"];
      payload: NivoCalendarLegendPosition;
    }
  | {
      type: ResponsiveCalendarChartAction["setChartTitlePosition"];
      payload: NivoChartTitlePosition;
    }
  | {
      type: ResponsiveCalendarChartAction["setScreenshotImageType"];
      payload: ScreenshotImageType;
    }
  | {
      type: ResponsiveCalendarChartAction["setChartTitleSize"];
      payload: TitleOrder;
    }
  | {
      type: ResponsiveCalendarChartAction["resetChartToDefault"];
      payload: ResponsiveCalendarChartState;
    };

export type {
  CalendarChartData,
  ResponsiveCalendarChartAction,
  ResponsiveCalendarChartDispatch,
  ResponsiveCalendarChartProps,
  ResponsiveCalendarChartState,
};
