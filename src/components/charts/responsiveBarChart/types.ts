import { TitleOrder } from '@mantine/core';
import { ScreenshotImageType } from '../../../types';
import {
  NivoFillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoAxisLegendPosition,
  NivoBarGroupMode,
  NivoBarLayout,
  NivoBarValueScale,
  NivoChartTitlePosition,
} from '../types';

type ResponsiveBarChartState = {
  /** base */
  groupMode: NivoBarGroupMode; // default: stacked
  layout: NivoBarLayout; // default: horizontal
  valueScale: NivoBarValueScale; // default: linear
  reverse: boolean; // default: false
  // base -> value scale
  enableMaxValue: boolean; // default: false ? maxValue is undefined
  enableMinValue: boolean; // default: false ? minValue is undefined
  innerPaddingBar: number; // 0 - 10 default: 0 step: 1
  maxValue: number; // default: 1000 step: 1
  minValue: number; // default: -1000 step: 1
  paddingBar: number; // 0.1 - 0.9 default: 0.1 step: 0.1

  // base -> margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  /** style */
  chartBorderColor: string; // default: #ffffff
  chartBorderRadius: number; // 0px - 36px default: 0 step: 1
  chartBorderWidth: number; // 0px - 20px default: 0 step: 1
  chartColors: NivoColorScheme; // default: nivo
  enableFillPatterns: boolean; // default: false
  fillPatterns: NivoFillPatternObject[];

  /** labels */
  enableLabels: boolean; // default: true
  labelSkipWidth: number; // 0 - 36 default: 0 step: 1
  labelSkipHeight: number; // 0 - 36 default: 0 step: 1
  labelTextColor: string; // default: #ffffff

  /** grid and axes */
  enableGridX: boolean; // default: false
  enableGridY: boolean; // default: true
  // axis -> axisTop
  axisTopLegend: string; // default: ''
  axisTopLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisTopLegendPosition: NivoAxisLegendPosition; // default: middle
  axisTopTickPadding: number; // 0px - 20px default: 5 step: 1
  axisTopTickRotation: number; // -90° - 90° default: 0 step: 1
  axisTopTickSize: number; // 0px - 20px default: 5 step: 1
  enableAxisTop: boolean; // default: false ? null
  isAxisTopLegendFocused: boolean; // default: false
  isAxisTopLegendValid: boolean; // default: false
  // axis -> axisRight
  axisRightLegend: string; // default: ''
  axisRightLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisRightLegendPosition: NivoAxisLegendPosition; // default: middle
  axisRightTickPadding: number; // 0px - 20px default: 5 step: 1
  axisRightTickRotation: number; // -90° - 90° default: 0 step: 1
  axisRightTickSize: number; // 0px - 20px default: 5 step: 1
  enableAxisRight: boolean; // default: false ? null
  isAxisRightLegendFocused: boolean; // default: false
  isAxisRightLegendValid: boolean; // default: false
  // axis -> axisBottom
  axisBottomLegend: string; // default: ''
  axisBottomLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisBottomLegendPosition: NivoAxisLegendPosition; // default: middle
  axisBottomTickPadding: number; // 0px - 20px default: 5 step: 1
  axisBottomTickRotation: number; // -90° - 90° default: 0 step: 1
  axisBottomTickSize: number; // 0px - 20px default: 5 step: 1
  enableAxisBottom: boolean; // default: true
  isAxisBottomLegendFocused: boolean; // default: false
  isAxisBottomLegendValid: boolean; // default: false
  // axis -> axisLeft
  axisLeftLegend: string; // default: ''
  axisLeftLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisLeftLegendPosition: NivoAxisLegendPosition; // default: middle
  axisLeftTickPadding: number; // 0px - 20px default: 5 step: 1
  axisLeftTickRotation: number; // -90° - 90° default: 0 step: 1
  axisLeftTickSize: number; // 0px - 20px default: 5 step: 1
  enableAxisLeft: boolean; // default: false ? null
  isAxisLeftLegendFocused: boolean; // default: false
  isAxisLeftLegendValid: boolean; // default: false

  /** legend */
  enableLegend: boolean; // default: false
  enableLegendJustify: boolean; // default: false
  legendAnchor: NivoLegendAnchor; // default: bottom-right
  legendDirection: NivoLegendDirection; // default: column
  legendItemBackground: string; // default: 'rgba(255, 255, 255, 0)'
  legendItemDirection: NivoLegendItemDirection; // default: left-to-right
  legendItemHeight: number; // 10px - 200px default: 20 step: 1
  legendItemOpacity: number; // 0 - 1 default: 1 step: 0.05
  legendItemTextColor: string; // default: '#ffffff'
  legendItemWidth: number; // 10px - 200px default: 60 step: 1
  legendItemsSpacing: number; // 0px - 60px default: 2 step: 1
  legendSymbolBorderColor: string; // default: 'rgba(0, 0, 0, .5)'
  legendSymbolBorderWidth: number; // 0px - 20px default: 0 step: 1
  legendSymbolShape: NivoLegendSymbolShape; // default: circle
  legendSymbolSize: number; // 2px - 60px default: 12 step: 1
  legendSymbolSpacing: number; // 0px - 20px default: 8 step: 1
  legendTranslateX: number; // -200px - 200px default: 0 step: 1
  legendTranslateY: number; // -200px - 200px default: 0 step: 1

  /** motion */
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: default

  /** options */
  chartTitle: string;
  chartTitleColor: string; // default: #ffffff
  chartTitlePosition: NivoChartTitlePosition; // default: center
  chartTitleSize: TitleOrder; // 1 - 6 px default: 3 step: 1
  isChartTitleFocused: boolean;
  isChartTitleValid: boolean;

  /** screenshot */
  isScreenshotFilenameFocused: boolean;
  isScreenshotFilenameValid: boolean;
  screenshotFilename: string;
  screenshotImageQuality: number; // 0 - 1 default: 1 step: 0.05
  screenshotImageType: ScreenshotImageType;
};

type ResponsiveBarChartAction = {
  /** base */
  setEnableMaxValue: 'setEnableMaxValue';
  setEnableMinValue: 'setEnableMinValue';
  setGroupMode: 'setGroupMode';
  setInnerPaddingBar: 'setInnerPaddingBar';
  setLayout: 'setLayout';
  setMaxValue: 'setMaxValue';
  setMinValue: 'setMinValue';
  setPaddingBar: 'setPaddingBar';
  setReverse: 'setReverse';
  setValueScale: 'setValueScale';

  /** margin */
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  /** style */
  setChartBorderColor: 'setChartBorderColor';
  setChartBorderRadius: 'setChartBorderRadius';
  setChartBorderWidth: 'setChartBorderWidth';
  setChartColors: 'setChartColors';
  setEnableFillPatterns: 'setEnableFillPatterns';
  setFillPatterns: 'setFillPatterns';

  /** labels */
  setEnableLabels: 'setEnableLabels';
  setLabelSkipHeight: 'setLabelSkipHeight';
  setLabelSkipWidth: 'setLabelSkipWidth';
  setLabelTextColor: 'setLabelTextColor';

  /** grid and axes */
  setEnableGridX: 'setEnableGridX';
  setEnableGridY: 'setEnableGridY';
  // axis -> axisTop
  setAxisTopLegend: 'setAxisTopLegend';
  setAxisTopLegendOffset: 'setAxisTopLegendOffset';
  setAxisTopLegendPosition: 'setAxisTopLegendPosition';
  setAxisTopTickPadding: 'setAxisTopTickPadding';
  setAxisTopTickRotation: 'setAxisTopTickRotation';
  setAxisTopTickSize: 'setAxisTopTickSize';
  setEnableAxisTop: 'setEnableAxisTop';
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused';
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid';
  // axis -> axisRight
  setAxisRightLegend: 'setAxisRightLegend';
  setAxisRightLegendOffset: 'setAxisRightLegendOffset';
  setAxisRightLegendPosition: 'setAxisRightLegendPosition';
  setAxisRightTickPadding: 'setAxisRightTickPadding';
  setAxisRightTickRotation: 'setAxisRightTickRotation';
  setAxisRightTickSize: 'setAxisRightTickSize';
  setEnableAxisRight: 'setEnableAxisRight';
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused';
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid';
  // axis -> axisBottom
  setAxisBottomLegend: 'setAxisBottomLegend';
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset';
  setAxisBottomLegendPosition: 'setAxisBottomLegendPosition';
  setAxisBottomTickPadding: 'setAxisBottomTickPadding';
  setAxisBottomTickRotation: 'setAxisBottomTickRotation';
  setAxisBottomTickSize: 'setAxisBottomTickSize';
  setEnableAxisBottom: 'setEnableAxisBottom';
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused';
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid';
  // axis -> axisLeft
  setAxisLeftLegend: 'setAxisLeftLegend';
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset';
  setAxisLeftLegendPosition: 'setAxisLeftLegendPosition';
  setAxisLeftTickPadding: 'setAxisLeftTickPadding';
  setAxisLeftTickRotation: 'setAxisLeftTickRotation';
  setAxisLeftTickSize: 'setAxisLeftTickSize';
  setEnableAxisLeft: 'setEnableAxisLeft';
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused';
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid';

  /** legend */
  setEnableLegend: 'setEnableLegend';
  setEnableLegendJustify: 'setEnableLegendJustify';
  setLegendAnchor: 'setLegendAnchor';
  setLegendDirection: 'setLegendDirection';
  setLegendItemBackground: 'setLegendItemBackground';
  setLegendItemDirection: 'setLegendItemDirection';
  setLegendItemHeight: 'setLegendItemHeight';
  setLegendItemOpacity: 'setLegendItemOpacity';
  setLegendItemTextColor: 'setLegendItemTextColor';
  setLegendItemWidth: 'setLegendItemWidth';
  setLegendItemsSpacing: 'setLegendItemsSpacing';
  setLegendSymbolBorderColor: 'setLegendSymbolBorderColor';
  setLegendSymbolBorderWidth: 'setLegendSymbolBorderWidth';
  setLegendSymbolShape: 'setLegendSymbolShape';
  setLegendSymbolSize: 'setLegendSymbolSize';
  setLegendSymbolSpacing: 'setLegendSymbolSpacing';
  setLegendTranslateX: 'setLegendTranslateX';
  setLegendTranslateY: 'setLegendTranslateY';

  /** motion */
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';

  /** options */
  setChartTitle: 'setChartTitle';
  setChartTitleColor: 'setChartTitleColor';
  setChartTitlePosition: 'setChartTitlePosition';
  setChartTitleSize: 'setChartTitleSize';
  setIsChartTitleFocused: 'setIsChartTitleFocused';
  setIsChartTitleValid: 'setIsChartTitleValid';

  /** screenshot */
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused';
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid';
  setScreenshotFilename: 'setScreenshotFilename';
  setScreenshotImageQuality: 'setScreenshotImageQuality';
  setScreenshotImageType: 'setScreenshotImageType';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsiveBarChartDispatch =
  | {
      type: ResponsiveBarChartAction['setGroupMode'];
      payload: NivoBarGroupMode;
    }
  | {
      type: ResponsiveBarChartAction['setLayout'];
      payload: NivoBarLayout;
    }
  | {
      type: ResponsiveBarChartAction['setValueScale'];
      payload: NivoBarValueScale;
    }
  | {
      type:
        | ResponsiveBarChartAction['setEnableAnimate']
        | ResponsiveBarChartAction['setEnableAxisBottom']
        | ResponsiveBarChartAction['setEnableAxisLeft']
        | ResponsiveBarChartAction['setEnableAxisRight']
        | ResponsiveBarChartAction['setEnableAxisTop']
        | ResponsiveBarChartAction['setEnableFillPatterns']
        | ResponsiveBarChartAction['setEnableGridX']
        | ResponsiveBarChartAction['setEnableGridY']
        | ResponsiveBarChartAction['setEnableLabels']
        | ResponsiveBarChartAction['setEnableLegend']
        | ResponsiveBarChartAction['setEnableLegendJustify']
        | ResponsiveBarChartAction['setEnableMaxValue']
        | ResponsiveBarChartAction['setEnableMinValue']
        | ResponsiveBarChartAction['setIsAxisBottomLegendFocused']
        | ResponsiveBarChartAction['setIsAxisBottomLegendValid']
        | ResponsiveBarChartAction['setIsAxisLeftLegendFocused']
        | ResponsiveBarChartAction['setIsAxisLeftLegendValid']
        | ResponsiveBarChartAction['setIsAxisRightLegendFocused']
        | ResponsiveBarChartAction['setIsAxisRightLegendValid']
        | ResponsiveBarChartAction['setIsAxisTopLegendFocused']
        | ResponsiveBarChartAction['setIsAxisTopLegendValid']
        | ResponsiveBarChartAction['setIsChartTitleFocused']
        | ResponsiveBarChartAction['setIsChartTitleValid']
        | ResponsiveBarChartAction['setIsScreenshotFilenameFocused']
        | ResponsiveBarChartAction['setIsScreenshotFilenameValid']
        | ResponsiveBarChartAction['setReverse'];

      payload: boolean;
    }
  | {
      type:
        | ResponsiveBarChartAction['setAxisBottomLegendOffset']
        | ResponsiveBarChartAction['setAxisBottomTickPadding']
        | ResponsiveBarChartAction['setAxisBottomTickRotation']
        | ResponsiveBarChartAction['setAxisBottomTickSize']
        | ResponsiveBarChartAction['setAxisLeftLegendOffset']
        | ResponsiveBarChartAction['setAxisLeftTickPadding']
        | ResponsiveBarChartAction['setAxisLeftTickRotation']
        | ResponsiveBarChartAction['setAxisLeftTickSize']
        | ResponsiveBarChartAction['setAxisRightLegendOffset']
        | ResponsiveBarChartAction['setAxisRightTickPadding']
        | ResponsiveBarChartAction['setAxisRightTickRotation']
        | ResponsiveBarChartAction['setAxisRightTickSize']
        | ResponsiveBarChartAction['setAxisTopLegendOffset']
        | ResponsiveBarChartAction['setAxisTopTickPadding']
        | ResponsiveBarChartAction['setAxisTopTickRotation']
        | ResponsiveBarChartAction['setAxisTopTickSize']
        | ResponsiveBarChartAction['setChartBorderRadius']
        | ResponsiveBarChartAction['setChartBorderWidth']
        | ResponsiveBarChartAction['setInnerPaddingBar']
        | ResponsiveBarChartAction['setLabelSkipHeight']
        | ResponsiveBarChartAction['setLabelSkipWidth']
        | ResponsiveBarChartAction['setLegendItemHeight']
        | ResponsiveBarChartAction['setLegendItemOpacity']
        | ResponsiveBarChartAction['setLegendItemWidth']
        | ResponsiveBarChartAction['setLegendItemsSpacing']
        | ResponsiveBarChartAction['setLegendSymbolBorderWidth']
        | ResponsiveBarChartAction['setLegendSymbolSize']
        | ResponsiveBarChartAction['setLegendSymbolSpacing']
        | ResponsiveBarChartAction['setLegendTranslateX']
        | ResponsiveBarChartAction['setLegendTranslateY']
        | ResponsiveBarChartAction['setMarginBottom']
        | ResponsiveBarChartAction['setMarginLeft']
        | ResponsiveBarChartAction['setMarginRight']
        | ResponsiveBarChartAction['setMarginTop']
        | ResponsiveBarChartAction['setMaxValue']
        | ResponsiveBarChartAction['setMinValue']
        | ResponsiveBarChartAction['setPaddingBar']
        | ResponsiveBarChartAction['setScreenshotImageQuality'];

      payload: number;
    }
  | {
      type:
        | ResponsiveBarChartAction['setAxisBottomLegend']
        | ResponsiveBarChartAction['setAxisLeftLegend']
        | ResponsiveBarChartAction['setAxisRightLegend']
        | ResponsiveBarChartAction['setAxisTopLegend']
        | ResponsiveBarChartAction['setChartBorderColor']
        | ResponsiveBarChartAction['setChartTitle']
        | ResponsiveBarChartAction['setChartTitleColor']
        | ResponsiveBarChartAction['setLabelTextColor']
        | ResponsiveBarChartAction['setLegendItemBackground']
        | ResponsiveBarChartAction['setLegendItemTextColor']
        | ResponsiveBarChartAction['setLegendSymbolBorderColor']
        | ResponsiveBarChartAction['setScreenshotFilename'];

      payload: string;
    }
  | {
      type: ResponsiveBarChartAction['setFillPatterns'];
      payload: NivoFillPatternObject[];
    }
  | {
      type:
        | ResponsiveBarChartAction['setAxisTopLegendPosition']
        | ResponsiveBarChartAction['setAxisRightLegendPosition']
        | ResponsiveBarChartAction['setAxisBottomLegendPosition']
        | ResponsiveBarChartAction['setAxisLeftLegendPosition'];
      payload: NivoAxisLegendPosition;
    }
  | {
      type: ResponsiveBarChartAction['setLegendAnchor'];
      payload: NivoLegendAnchor;
    }
  | {
      type: ResponsiveBarChartAction['setLegendDirection'];
      payload: NivoLegendDirection;
    }
  | {
      type: ResponsiveBarChartAction['setLegendItemDirection'];
      payload: NivoLegendItemDirection;
    }
  | {
      type: ResponsiveBarChartAction['setLegendSymbolShape'];
      payload: NivoLegendSymbolShape;
    }
  | {
      type: ResponsiveBarChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveBarChartAction['setChartColors'];
      payload: NivoColorScheme;
    }
  | {
      type: ResponsiveBarChartAction['setChartTitleSize'];
      payload: TitleOrder;
    }
  | {
      type: ResponsiveBarChartAction['setScreenshotImageType'];
      payload: ScreenshotImageType;
    }
  | {
      type: ResponsiveBarChartAction['setChartTitlePosition'];
      payload: NivoChartTitlePosition;
    }
  | {
      type: ResponsiveBarChartAction['resetChartToDefault'];
      payload: ResponsiveBarChartState;
    };

export type {
  ResponsiveBarChartAction,
  ResponsiveBarChartDispatch,
  ResponsiveBarChartState,
};
