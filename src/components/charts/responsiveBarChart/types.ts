import {
  FillPatternObject,
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
} from '../types';

type ResponsiveBarChartState = {
  /** base */
  groupMode: 'stacked' | 'grouped'; // default: stacked
  layout: 'horizontal' | 'vertical'; // default: horizontal
  valueScale: 'linear' | 'symlog'; // default: linear
  reverse: boolean; // default: false
  toggleIndexScale: boolean; // default: true
  // base -> value scale
  toggleMinValue: boolean; // default: false ? minValue is undefined
  minValue?: number; // default: -1000 step: 1
  toggleMaxValue: boolean; // default: false ? maxValue is undefined
  maxValue?: number; // default: 1000 step: 1
  padding: number; // 0.1 - 0.9 default: 0.1 step: 0.1
  innerPadding: number; // 0 - 10 default: 0 step: 1

  // base -> margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  /** style */
  colors: NivoColorScheme; // default: nivo
  borderRadius: number; // 0px - 36px default: 0 step: 1
  borderWidth: number; // 0px - 20px default: 0 step: 1
  borderColor: string; // default: #ffffff
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
  axisTopTickSize: number; // 0 - 20 default: 5 step: 1
  axisTopTickPadding: number; // 0 - 20 default: 5 step: 1
  axisTopTickRotation: number; // -90 - 90 default: 0 step: 1
  // axis -> axisRight
  enableAxisRight: boolean; // default: false ? null
  axisRightTickSize: number; // 0 - 20 default: 5 step: 1
  axisRightTickPadding: number; // 0 - 20 default: 5 step: 1
  axisRightTickRotation: number; // -90 - 90 default: 0 step: 1
  // axis -> axisBottom
  enableAxisBottom: boolean; // default: true
  axisBottomTickSize: number; // 0 - 20 default: 5 step: 1
  axisBottomTickPadding: number; // 0 - 20 default: 5 step: 1
  axisBottomTickRotation: number; // -90 - 90 default: 0 step: 1
  // axis -> axisLeft
  enableAxisLeft: boolean; // default: false ? null
  axisLeftTickSize: number; // 0 - 20 default: 5 step: 1
  axisLeftTickPadding: number; // 0 - 20 default: 5 step: 1
  axisLeftTickRotation: number; // -90 - 90 default: 0 step: 1

  /** interactivity */
  isInteractive: boolean; // default: true

  /** legends */
  enableLegends: boolean; // default: false
  legendsAnchor: LegendAnchor; // default: bottom-right
  legendsDirection: LegendDirection; // default: column
  enableLegendsJustify: boolean; // default: false
  legendsTranslateX: number; // -200px - 200px default: 0 step: 1
  legendsTranslateY: number; // -200px - 200px default: 0 step: 1
  legendsItemWidth: number; // 10px - 200px default: 60 step: 1
  legendsItemHeight: number; // 10px - 200px default: 20 step: 1
  legendsItemsSpacing: number; // 0px - 60px default: 2 step: 1
  legendsItemDirection: LegendItemDirection; // default: left-to-right

  itemTextColor: string; // default: #000000
  itemOpacity: number; // 0 - 1 default: 1 step: 0.05
  symbolSize: number; // 2px - 60px default: 12 step: 1
  symbolShape: LegendSymbolShape; // default: circle

  /** motion */
  animate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: default
};

type ResponsiveBarChartAction = {
  /** base */
  setGroupMode: 'setGroupMode';
  setLayout: 'setLayout';
  setValueScale: 'setValueScale';
  setReverse: 'setReverse';
  setToggleIndexScale: 'setToggleIndexScale';
  setToggleMinValue: 'setToggleMinValue';
  setMinValue: 'setMinValue';
  setToggleMaxValue: 'setToggleMaxValue';
  setMaxValue: 'setMaxValue';
  setPadding: 'setPadding';
  setInnerPadding: 'setInnerPadding';

  /** margin */
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  /** style */
  setColors: 'setColors';
  setBorderRadius: 'setBorderRadius';
  setBorderWidth: 'setBorderWidth';
  setBorderColor: 'setBorderColor';
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
  setEnableAxisTop: 'setEnableAxisTop';
  setAxisTopTickSize: 'setAxisTopTickSize';
  setAxisTopTickPadding: 'setAxisTopTickPadding';
  setAxisTopTickRotation: 'setAxisTopTickRotation';
  setEnableAxisRight: 'setEnableAxisRight';
  setAxisRightTickSize: 'setAxisRightTickSize';
  setAxisRightTickPadding: 'setAxisRightTickPadding';
  setAxisRightTickRotation: 'setAxisRightTickRotation';
  setEnableAxisBottom: 'setEnableAxisBottom';
  setAxisBottomTickSize: 'setAxisBottomTickSize';
  setAxisBottomTickPadding: 'setAxisBottomTickPadding';
  setAxisBottomTickRotation: 'setAxisBottomTickRotation';
  setEnableAxisLeft: 'setEnableAxisLeft';
  setAxisLeftTickSize: 'setAxisLeftTickSize';
  setAxisLeftTickPadding: 'setAxisLeftTickPadding';
  setAxisLeftTickRotation: 'setAxisLeftTickRotation';

  /** interactivity */
  setIsInteractive: 'setIsInteractive';

  /** legends */
  setEnableLegends: 'setEnableLegends';
  setLegendsAnchor: 'setLegendsAnchor';
  setLegendsDirection: 'setLegendsDirection';
  setEnableLegendsJustify: 'setEnableLegendsJustify';
  setLegendsTranslateX: 'setLegendsTranslateX';
  setLegendsTranslateY: 'setLegendsTranslateY';
  setLegendsItemWidth: 'setLegendsItemWidth';
  setLegendsItemHeight: 'setLegendsItemHeight';
  setLegendsItemsSpacing: 'setLegendsItemsSpacing';
  setLegendsItemDirection: 'setLegendsItemDirection';
  setItemTextColor: 'setItemTextColor';
  setItemOpacity: 'setItemOpacity';
  setSymbolSize: 'setSymbolSize';
  setSymbolShape: 'setSymbolShape';

  /** motion */
  setAnimate: 'setAnimate';
  setMotionConfig: 'setMotionConfig';
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
        | ResponsiveBarChartAction['setToggleIndexScale']
        | ResponsiveBarChartAction['setToggleMinValue']
        | ResponsiveBarChartAction['setToggleMaxValue']
        | ResponsiveBarChartAction['setEnableLabels']
        | ResponsiveBarChartAction['setEnableGridX']
        | ResponsiveBarChartAction['setEnableGridY']
        | ResponsiveBarChartAction['setEnableAxisTop']
        | ResponsiveBarChartAction['setEnableAxisRight']
        | ResponsiveBarChartAction['setEnableAxisBottom']
        | ResponsiveBarChartAction['setEnableAxisLeft']
        | ResponsiveBarChartAction['setIsInteractive']
        | ResponsiveBarChartAction['setEnableLegends']
        | ResponsiveBarChartAction['setEnableLegendsJustify']
        | ResponsiveBarChartAction['setEnableFillPatterns'];

      payload: boolean;
    }
  | {
      type:
        | ResponsiveBarChartAction['setMinValue']
        | ResponsiveBarChartAction['setMaxValue']
        | ResponsiveBarChartAction['setPadding']
        | ResponsiveBarChartAction['setInnerPadding']
        | ResponsiveBarChartAction['setAxisTopTickSize']
        | ResponsiveBarChartAction['setAxisTopTickPadding']
        | ResponsiveBarChartAction['setAxisTopTickRotation']
        | ResponsiveBarChartAction['setAxisRightTickSize']
        | ResponsiveBarChartAction['setAxisRightTickPadding']
        | ResponsiveBarChartAction['setAxisRightTickRotation']
        | ResponsiveBarChartAction['setAxisBottomTickSize']
        | ResponsiveBarChartAction['setAxisBottomTickPadding']
        | ResponsiveBarChartAction['setAxisBottomTickRotation']
        | ResponsiveBarChartAction['setAxisLeftTickSize']
        | ResponsiveBarChartAction['setAxisLeftTickPadding']
        | ResponsiveBarChartAction['setAxisLeftTickRotation']
        | ResponsiveBarChartAction['setMarginTop']
        | ResponsiveBarChartAction['setMarginRight']
        | ResponsiveBarChartAction['setMarginBottom']
        | ResponsiveBarChartAction['setMarginLeft']
        | ResponsiveBarChartAction['setLegendsTranslateX']
        | ResponsiveBarChartAction['setLegendsTranslateY']
        | ResponsiveBarChartAction['setLegendsItemWidth']
        | ResponsiveBarChartAction['setLegendsItemHeight']
        | ResponsiveBarChartAction['setLegendsItemsSpacing']
        | ResponsiveBarChartAction['setItemOpacity']
        | ResponsiveBarChartAction['setSymbolSize'];

      payload: number;
    }
  | {
      type:
        | ResponsiveBarChartAction['setColors']
        | ResponsiveBarChartAction['setBorderColor']
        | ResponsiveBarChartAction['setLabelTextColor']
        | ResponsiveBarChartAction['setItemTextColor'];

      payload: string;
    }
  | {
      type: ResponsiveBarChartAction['setFillPatterns'];
      payload: FillPatternObject[];
    }
  | {
      type:
        | ResponsiveBarChartAction['setLegendsAnchor']
        | ResponsiveBarChartAction['setLegendsDirection']
        | ResponsiveBarChartAction['setLegendsItemDirection']
        | ResponsiveBarChartAction['setSymbolShape'];

      payload:
        | LegendAnchor
        | LegendDirection
        | LegendItemDirection
        | LegendSymbolShape;
    }
  | {
      type: ResponsiveBarChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveBarChartAction['setColors'];
      payload: NivoColorScheme;
    };

export type { ResponsiveBarChartDispatch, ResponsiveBarChartState };
