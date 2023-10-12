import {
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';

type ResponsiveRadialBarChartState = {
  // base
  enableMaxValue: boolean; // default: false ? 'auto'
  maxValue: number; // 0 - 1000 default: 1000 step: 1
  // base -> margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1
  // base -> angles
  startAngle: number; // -360 - 360 default: 0 step: 1
  endAngle: number; // -360 - 360 default: 270 step: 1
  innerRadius: number; // 0 - 0.95 default: 0.3 step: 0.05
  paddingRing: number; // 0 - 0.9 default: 0.2 step: 0.1
  padAngle: number; // 0 - 45 default: 0 step: 1
  cornerRadius: number; // 0px - 45px default: 0 step: 1

  // style
  chartColors: NivoColorScheme; // default: 'nivo'
  ringBorderWidth: number; // 0px - 20px default: 0 step: 1
  ringBorderColor: string; // default: #ffffff

  // tracks
  enableTracks: boolean; // default: true
  tracksColor: string; // default: #333333

  // grids
  enableRadialGrid: boolean; // default: true
  enableCircularGrid: boolean; // default: true

  // axes
  // radial axis start
  enableRadialAxisStart: boolean; // default: true
  radialAxisStartTickSize: number; // 0 - 20 default: 5 step: 1
  radialAxisStartTickPadding: number; // 0 - 20 default: 5 step: 1
  radialAxisStartTickRotation: number; // -90 - 90 default: 0 step: 1

  // radial axis end
  enableRadialAxisEnd: boolean; // default: false
  radialAxisEndTickSize: number; // 0 - 20 default: 5 step: 1
  radialAxisEndTickPadding: number; // 0 - 20 default: 5 step: 1
  radialAxisEndTickRotation: number; // -90 - 90 default: 0 step: 1

  // circular axis inner
  enableCircularAxisInner: boolean; // default: false
  circularAxisInnerTickSize: number; // 0 - 20 default: 5 step: 1
  circularAxisInnerTickPadding: number; // 0 - 20 default: 5 step: 1
  circularAxisInnerTickRotation: number; // -90 - 90 default: 0 step: 1

  // circular axis outer
  enableCircularAxisOuter: boolean; // default: true
  circularAxisOuterTickSize: number; // 0 - 20 default: 5 step: 1
  circularAxisOuterTickPadding: number; // 0 - 20 default: 5 step: 1
  circularAxisOuterTickRotation: number; // -90 - 90 default: 0 step: 1

  // labels
  enableLabels: boolean; // default: false
  labelsSkipAngle: number; // 0 - 45 default: 10 step: 1
  labelsRadiusOffset: number; // 0 - 2 default: 0.5 step: 0.05
  labelsTextColor: string; // default: #333333

  // legend
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

  // motion
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: 'gentle'
  transitionMode: NivoTransitionMode; // default: 'centerRadius'
};

type ResponsiveRadialBarChartAction = {
  // base
  setEnableMaxValue: 'setEnableMaxValue';
  setMaxValue: 'setMaxValue';
  // base -> margin
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';
  // base -> angles
  setStartAngle: 'setStartAngle';
  setEndAngle: 'setEndAngle';
  setInnerRadius: 'setInnerRadius';
  setPaddingRing: 'setPaddingRing';
  setPadAngle: 'setPadAngle';
  setCornerRadius: 'setCornerRadius';

  // style
  setChartColors: 'setChartColors';
  setRingBorderWidth: 'setRingBorderWidth';
  setRingBorderColor: 'setRingBorderColor';

  // tracks
  setEnableTracks: 'setEnableTracks';
  setTracksColor: 'setTracksColor';

  // grids
  setEnableRadialGrid: 'setEnableRadialGrid';
  setEnableCircularGrid: 'setEnableCircularGrid';

  // axes
  // radial axis start
  setEnableRadialAxisStart: 'setEnableRadialAxisStart';
  setRadialAxisStartTickSize: 'setRadialAxisStartTickSize';
  setRadialAxisStartTickPadding: 'setRadialAxisStartTickPadding';
  setRadialAxisStartTickRotation: 'setRadialAxisStartTickRotation';

  // radial axis end
  setEnableRadialAxisEnd: 'setEnableRadialAxisEnd';
  setRadialAxisEndTickSize: 'setRadialAxisEndTickSize';
  setRadialAxisEndTickPadding: 'setRadialAxisEndTickPadding';
  setRadialAxisEndTickRotation: 'setRadialAxisEndTickRotation';

  // circular axis inner
  setEnableCircularAxisInner: 'setEnableCircularAxisInner';
  setCircularAxisInnerTickSize: 'setCircularAxisInnerTickSize';
  setCircularAxisInnerTickPadding: 'setCircularAxisInnerTickPadding';
  setCircularAxisInnerTickRotation: 'setCircularAxisInnerTickRotation';

  // circular axis outer
  setEnableCircularAxisOuter: 'setEnableCircularAxisOuter';
  setCircularAxisOuterTickSize: 'setCircularAxisOuterTickSize';
  setCircularAxisOuterTickPadding: 'setCircularAxisOuterTickPadding';
  setCircularAxisOuterTickRotation: 'setCircularAxisOuterTickRotation';

  // labels
  setEnableLabels: 'setEnableLabels';
  setLabelsSkipAngle: 'setLabelsSkipAngle';
  setLabelsRadiusOffset: 'setLabelsRadiusOffset';
  setLabelsTextColor: 'setLabelsTextColor';

  // legend
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

  // motion
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';
  setTransitionMode: 'setTransitionMode';
};

type ResponsiveRadialBarChartDispatch =
  | {
      // string payloads
      type:
        | ResponsiveRadialBarChartAction['setRingBorderColor']
        | ResponsiveRadialBarChartAction['setTracksColor']
        | ResponsiveRadialBarChartAction['setLabelsTextColor'];

      payload: string;
    }
  | {
      // number payloads
      type:
        | ResponsiveRadialBarChartAction['setMaxValue']
        | ResponsiveRadialBarChartAction['setMarginTop']
        | ResponsiveRadialBarChartAction['setMarginRight']
        | ResponsiveRadialBarChartAction['setMarginBottom']
        | ResponsiveRadialBarChartAction['setMarginLeft']
        | ResponsiveRadialBarChartAction['setStartAngle']
        | ResponsiveRadialBarChartAction['setEndAngle']
        | ResponsiveRadialBarChartAction['setInnerRadius']
        | ResponsiveRadialBarChartAction['setPaddingRing']
        | ResponsiveRadialBarChartAction['setPadAngle']
        | ResponsiveRadialBarChartAction['setCornerRadius']
        | ResponsiveRadialBarChartAction['setRingBorderWidth']
        | ResponsiveRadialBarChartAction['setRadialAxisStartTickSize']
        | ResponsiveRadialBarChartAction['setRadialAxisStartTickPadding']
        | ResponsiveRadialBarChartAction['setRadialAxisStartTickRotation']
        | ResponsiveRadialBarChartAction['setRadialAxisEndTickSize']
        | ResponsiveRadialBarChartAction['setRadialAxisEndTickPadding']
        | ResponsiveRadialBarChartAction['setRadialAxisEndTickRotation']
        | ResponsiveRadialBarChartAction['setCircularAxisInnerTickSize']
        | ResponsiveRadialBarChartAction['setCircularAxisInnerTickPadding']
        | ResponsiveRadialBarChartAction['setCircularAxisInnerTickRotation']
        | ResponsiveRadialBarChartAction['setCircularAxisOuterTickSize']
        | ResponsiveRadialBarChartAction['setCircularAxisOuterTickPadding']
        | ResponsiveRadialBarChartAction['setCircularAxisOuterTickRotation']
        | ResponsiveRadialBarChartAction['setLabelsSkipAngle']
        | ResponsiveRadialBarChartAction['setLabelsRadiusOffset']
        | ResponsiveRadialBarChartAction['setLegendTranslateX']
        | ResponsiveRadialBarChartAction['setLegendTranslateY']
        | ResponsiveRadialBarChartAction['setLegendItemsSpacing']
        | ResponsiveRadialBarChartAction['setLegendItemWidth']
        | ResponsiveRadialBarChartAction['setLegendItemHeight']
        | ResponsiveRadialBarChartAction['setLegendItemOpacity']
        | ResponsiveRadialBarChartAction['setLegendSymbolSize'];

      payload: number;
    }
  | {
      // boolean payloads
      type:
        | ResponsiveRadialBarChartAction['setEnableMaxValue']
        | ResponsiveRadialBarChartAction['setEnableTracks']
        | ResponsiveRadialBarChartAction['setEnableRadialGrid']
        | ResponsiveRadialBarChartAction['setEnableCircularGrid']
        | ResponsiveRadialBarChartAction['setEnableRadialAxisStart']
        | ResponsiveRadialBarChartAction['setEnableRadialAxisEnd']
        | ResponsiveRadialBarChartAction['setEnableCircularAxisInner']
        | ResponsiveRadialBarChartAction['setEnableCircularAxisOuter']
        | ResponsiveRadialBarChartAction['setEnableLabels']
        | ResponsiveRadialBarChartAction['setEnableLegend']
        | ResponsiveRadialBarChartAction['setEnableLegendJustify']
        | ResponsiveRadialBarChartAction['setEnableAnimate'];

      payload: boolean;
    }
  | {
      type: ResponsiveRadialBarChartAction['setChartColors'];
      payload: NivoColorScheme;
    }
  | {
      type: ResponsiveRadialBarChartAction['setLegendAnchor'];
      payload: NivoLegendAnchor;
    }
  | {
      type: ResponsiveRadialBarChartAction['setLegendDirection'];
      payload: NivoLegendDirection;
    }
  | {
      type: ResponsiveRadialBarChartAction['setLegendItemDirection'];
      payload: NivoLegendItemDirection;
    }
  | {
      type: ResponsiveRadialBarChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveRadialBarChartAction['setTransitionMode'];
      payload: NivoTransitionMode;
    };

export type {
  ResponsiveRadialBarChartAction,
  ResponsiveRadialBarChartDispatch,
  ResponsiveRadialBarChartState,
};
