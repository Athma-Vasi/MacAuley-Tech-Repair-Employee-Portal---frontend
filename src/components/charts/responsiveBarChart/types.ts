import {
  FillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
} from '../types';

type ResponsiveBarChartState = {
  /** base */
  groupMode: 'stacked' | 'grouped'; // default: stacked
  layout: 'horizontal' | 'vertical'; // default: horizontal
  valueScale: 'linear' | 'symlog'; // default: linear
  reverse: boolean; // default: false
  // base -> value scale
  enableMinValue: boolean; // default: false ? minValue is undefined
  minValue: number; // default: -1000 step: 1
  enableMaxValue: boolean; // default: false ? maxValue is undefined
  maxValue: number; // default: 1000 step: 1
  paddingBar: number; // 0.1 - 0.9 default: 0.1 step: 0.1
  innerPaddingBar: number; // 0 - 10 default: 0 step: 1

  // base -> margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  /** style */
  chartColors: NivoColorScheme; // default: nivo
  chartBorderRadius: number; // 0px - 36px default: 0 step: 1
  chartBorderWidth: number; // 0px - 20px default: 0 step: 1
  chartBorderColor: string; // default: #ffffff
  fillPatterns: FillPatternObject[];
  enableFillPatterns: boolean; // default: false

  /** labels */
  enableLabels: boolean; // default: true
  labelSkipWidth: number; // 0 - 36 default: 0 step: 1
  labelSkipHeight: number; // 0 - 36 default: 0 step: 1
  labelTextColor: string; // default: #ffffff

  /** grid and axes */
  enableGridX: boolean; // default: false
  enableGridY: boolean; // default: true
  // axis -> axisTop
  enableAxisTop: boolean; // default: false ? null
  axisTopTickSize: number; // 0px - 20px default: 5 step: 1
  axisTopTickPadding: number; // 0px - 20px default: 5 step: 1
  axisTopTickRotation: number; // -90° - 90° default: 0 step: 1
  axisTopLegend: string; // default: ''
  isAxisTopLegendValid: boolean; // default: false
  isAxisTopLegendFocused: boolean; // default: false
  axisTopLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axis -> axisRight
  enableAxisRight: boolean; // default: false ? null
  axisRightTickSize: number; // 0px - 20px default: 5 step: 1
  axisRightTickPadding: number; // 0px - 20px default: 5 step: 1
  axisRightTickRotation: number; // -90° - 90° default: 0 step: 1
  axisRightLegend: string; // default: ''
  isAxisRightLegendValid: boolean; // default: false
  isAxisRightLegendFocused: boolean; // default: false
  axisRightLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axis -> axisBottom
  enableAxisBottom: boolean; // default: true
  axisBottomTickSize: number; // 0px - 20px default: 5 step: 1
  axisBottomTickPadding: number; // 0px - 20px default: 5 step: 1
  axisBottomTickRotation: number; // -90° - 90° default: 0 step: 1
  axisBottomLegend: string; // default: ''
  isAxisBottomLegendValid: boolean; // default: false
  isAxisBottomLegendFocused: boolean; // default: false
  axisBottomLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axis -> axisLeft
  enableAxisLeft: boolean; // default: false ? null
  axisLeftTickSize: number; // 0px - 20px default: 5 step: 1
  axisLeftTickPadding: number; // 0px - 20px default: 5 step: 1
  axisLeftTickRotation: number; // -90° - 90° default: 0 step: 1
  axisLeftLegend: string; // default: ''
  isAxisLeftLegendValid: boolean; // default: false
  isAxisLeftLegendFocused: boolean; // default: false
  axisLeftLegendOffset: number; // -60px - 60px default: 0 step: 1

  /** legend */
  enableLegend: boolean; // default: false
  legendAnchor: NivoLegendAnchor; // default: bottom-right
  legendDirection: NivoLegendDirection; // default: column
  enableLegendJustify: boolean; // default: false
  legendTranslateX: number; // -200px - 200px default: 0 step: 1
  legendTranslateY: number; // -200px - 200px default: 0 step: 1
  legendItemWidth: number; // 10px - 200px default: 60 step: 1
  legendItemHeight: number; // 10px - 200px default: 20 step: 1
  legendItemsSpacing: number; // 0px - 60px default: 2 step: 1
  legendItemDirection: NivoLegendItemDirection; // default: left-to-right
  legendItemOpacity: number; // 0 - 1 default: 1 step: 0.05
  legendSymbolSize: number; // 2px - 60px default: 12 step: 1

  /** motion */
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: default
};

type ResponsiveBarChartAction = {
  /** base */
  setGroupMode: 'setGroupMode';
  setLayout: 'setLayout';
  setValueScale: 'setValueScale';
  setReverse: 'setReverse';
  setEnableMinValue: 'setEnableMinValue';
  setMinValue: 'setMinValue';
  setEnableMaxValue: 'setEnableMaxValue';
  setMaxValue: 'setMaxValue';
  setPaddingBar: 'setPaddingBar';
  setInnerPaddingBar: 'setInnerPaddingBar';

  /** margin */
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  /** style */
  setChartColors: 'setChartColors';
  setChartBorderRadius: 'setChartBorderRadius';
  setChartBorderWidth: 'setChartBorderWidth';
  setChartBorderColor: 'setChartBorderColor';
  setFillPatterns: 'setFillPatterns';
  setEnableFillPatterns: 'setEnableFillPatterns';

  /** labels */
  setEnableLabels: 'setEnableLabels';
  setLabelSkipWidth: 'setLabelSkipWidth';
  setLabelSkipHeight: 'setLabelSkipHeight';
  setLabelTextColor: 'setLabelTextColor';

  /** grid and axes */
  setEnableGridX: 'setEnableGridX';
  setEnableGridY: 'setEnableGridY';
  // axis -> axisTop
  setEnableAxisTop: 'setEnableAxisTop';
  setAxisTopTickSize: 'setAxisTopTickSize';
  setAxisTopTickPadding: 'setAxisTopTickPadding';
  setAxisTopTickRotation: 'setAxisTopTickRotation';
  setAxisTopLegend: 'setAxisTopLegend';
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid';
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused';
  setAxisTopLegendOffset: 'setAxisTopLegendOffset';
  // axis -> axisRight
  setEnableAxisRight: 'setEnableAxisRight';
  setAxisRightTickSize: 'setAxisRightTickSize';
  setAxisRightTickPadding: 'setAxisRightTickPadding';
  setAxisRightTickRotation: 'setAxisRightTickRotation';
  setAxisRightLegend: 'setAxisRightLegend';
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid';
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused';
  setAxisRightLegendOffset: 'setAxisRightLegendOffset';
  // axis -> axisBottom
  setEnableAxisBottom: 'setEnableAxisBottom';
  setAxisBottomTickSize: 'setAxisBottomTickSize';
  setAxisBottomTickPadding: 'setAxisBottomTickPadding';
  setAxisBottomTickRotation: 'setAxisBottomTickRotation';
  setAxisBottomLegend: 'setAxisBottomLegend';
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid';
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused';
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset';
  // axis -> axisLeft
  setEnableAxisLeft: 'setEnableAxisLeft';
  setAxisLeftTickSize: 'setAxisLeftTickSize';
  setAxisLeftTickPadding: 'setAxisLeftTickPadding';
  setAxisLeftTickRotation: 'setAxisLeftTickRotation';
  setAxisLeftLegend: 'setAxisLeftLegend';
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid';
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused';
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset';

  /** legend */
  setEnableLegend: 'setEnableLegend';
  setLegendAnchor: 'setLegendAnchor';
  setLegendDirection: 'setLegendDirection';
  setEnableLegendJustify: 'setEnableLegendJustify';
  setLegendTranslateX: 'setLegendTranslateX';
  setLegendTranslateY: 'setLegendTranslateY';
  setLegendItemWidth: 'setLegendItemWidth';
  setLegendItemHeight: 'setLegendItemHeight';
  setLegendItemsSpacing: 'setLegendItemsSpacing';
  setLegendItemDirection: 'setLegendItemDirection';
  setLegendItemOpacity: 'setLegendItemOpacity';
  setLegendSymbolSize: 'setLegendSymbolSize';

  /** motion */
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsiveBarChartDispatch =
  | {
      type: ResponsiveBarChartAction['setGroupMode'];
      payload: 'stacked' | 'grouped';
    }
  | {
      type: ResponsiveBarChartAction['setLayout'];
      payload: 'horizontal' | 'vertical';
    }
  | {
      type: ResponsiveBarChartAction['setValueScale'];
      payload: 'linear' | 'symlog';
    }
  | {
      type:
        | ResponsiveBarChartAction['setReverse']
        | ResponsiveBarChartAction['setEnableMinValue']
        | ResponsiveBarChartAction['setEnableMaxValue']
        | ResponsiveBarChartAction['setIsAxisTopLegendValid']
        | ResponsiveBarChartAction['setIsAxisTopLegendFocused']
        | ResponsiveBarChartAction['setIsAxisRightLegendValid']
        | ResponsiveBarChartAction['setIsAxisRightLegendFocused']
        | ResponsiveBarChartAction['setIsAxisBottomLegendValid']
        | ResponsiveBarChartAction['setIsAxisBottomLegendFocused']
        | ResponsiveBarChartAction['setIsAxisLeftLegendValid']
        | ResponsiveBarChartAction['setIsAxisLeftLegendFocused']
        | ResponsiveBarChartAction['setEnableLabels']
        | ResponsiveBarChartAction['setEnableGridX']
        | ResponsiveBarChartAction['setEnableGridY']
        | ResponsiveBarChartAction['setEnableAxisTop']
        | ResponsiveBarChartAction['setEnableAxisRight']
        | ResponsiveBarChartAction['setEnableAxisBottom']
        | ResponsiveBarChartAction['setEnableAxisLeft']
        | ResponsiveBarChartAction['setEnableLegend']
        | ResponsiveBarChartAction['setEnableLegendJustify']
        | ResponsiveBarChartAction['setEnableFillPatterns']
        | ResponsiveBarChartAction['setEnableAnimate'];

      payload: boolean;
    }
  | {
      type:
        | ResponsiveBarChartAction['setMinValue']
        | ResponsiveBarChartAction['setMaxValue']
        | ResponsiveBarChartAction['setPaddingBar']
        | ResponsiveBarChartAction['setInnerPaddingBar']
        | ResponsiveBarChartAction['setAxisTopTickSize']
        | ResponsiveBarChartAction['setAxisTopTickPadding']
        | ResponsiveBarChartAction['setAxisTopTickRotation']
        | ResponsiveBarChartAction['setAxisTopLegendOffset']
        | ResponsiveBarChartAction['setAxisRightTickSize']
        | ResponsiveBarChartAction['setAxisRightTickPadding']
        | ResponsiveBarChartAction['setAxisRightTickRotation']
        | ResponsiveBarChartAction['setAxisRightLegendOffset']
        | ResponsiveBarChartAction['setAxisBottomTickSize']
        | ResponsiveBarChartAction['setAxisBottomTickPadding']
        | ResponsiveBarChartAction['setAxisBottomTickRotation']
        | ResponsiveBarChartAction['setAxisBottomLegendOffset']
        | ResponsiveBarChartAction['setAxisLeftTickSize']
        | ResponsiveBarChartAction['setAxisLeftTickPadding']
        | ResponsiveBarChartAction['setAxisLeftTickRotation']
        | ResponsiveBarChartAction['setAxisLeftLegendOffset']
        | ResponsiveBarChartAction['setMarginTop']
        | ResponsiveBarChartAction['setMarginRight']
        | ResponsiveBarChartAction['setMarginBottom']
        | ResponsiveBarChartAction['setMarginLeft']
        | ResponsiveBarChartAction['setLabelSkipWidth']
        | ResponsiveBarChartAction['setLabelSkipHeight']
        | ResponsiveBarChartAction['setChartBorderRadius']
        | ResponsiveBarChartAction['setChartBorderWidth']
        | ResponsiveBarChartAction['setLegendTranslateX']
        | ResponsiveBarChartAction['setLegendTranslateY']
        | ResponsiveBarChartAction['setLegendItemWidth']
        | ResponsiveBarChartAction['setLegendItemHeight']
        | ResponsiveBarChartAction['setLegendItemsSpacing']
        | ResponsiveBarChartAction['setLegendItemOpacity']
        | ResponsiveBarChartAction['setLegendSymbolSize'];

      payload: number;
    }
  | {
      type:
        | ResponsiveBarChartAction['setAxisTopLegend']
        | ResponsiveBarChartAction['setAxisRightLegend']
        | ResponsiveBarChartAction['setAxisBottomLegend']
        | ResponsiveBarChartAction['setAxisLeftLegend']
        | ResponsiveBarChartAction['setChartBorderColor']
        | ResponsiveBarChartAction['setLabelTextColor'];

      payload: string;
    }
  | {
      type: ResponsiveBarChartAction['setFillPatterns'];
      payload: FillPatternObject[];
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
      type: ResponsiveBarChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveBarChartAction['setChartColors'];
      payload: NivoColorScheme;
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
