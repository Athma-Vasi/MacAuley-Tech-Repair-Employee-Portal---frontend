import {
  NivoColor,
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLineAreaBlendMode,
  NivoLineCrosshairType,
  NivoLineCurve,
  NivoMotionConfig,
} from '../types';

type ResponsiveLineChartState = {
  // base
  xScale: 'linear' | 'point'; // default: linear
  yScale: 'linear' | 'point'; // default: linear
  enableYScaleStacked: boolean; // default: false
  enableYScaleMin: boolean; // default: false ? 'auto'
  yScaleMin: number; // -2000 - 2000 default: 0
  enableYScaleMax: boolean; // default: false ? 'auto'
  yScaleMax: number; // -2000 - 2000 default: 0

  // margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  // style
  lineCurve: NivoLineCurve; // default: 'linear'
  chartColors: NivoColorScheme; // default: 'nivo'
  lineWidth: number; // 0px - 20px default: 2 step: 1
  enableArea: boolean; // default: false
  areaOpacity: number; // 0 - 1 default: 0.2 step: 0.1
  areaBlendMode: NivoLineAreaBlendMode; // default: 'normal'

  // points
  enablePoints: boolean; // default: false
  pointSize: number; // 0px - 20px default: 6 step: 1
  pointColor: NivoColor; // default: {from: 'color', modifiers: []}
  pointBorderWidth: number; // 0px - 20px default: 0 step: 1
  pointBorderColor: NivoColor; // default: {from: 'color', modifiers: []}
  enablePointLabel: boolean; // default: false
  pointLabel: 'x' | 'y'; // default: 'y'
  pointLabelYOffset: number; // -22px - 24px default: -12 step: 1

  // grids
  enableGridX: boolean; // default: true
  enableGridY: boolean; // default: true

  // axes
  // axisTop
  enableAxisTop: boolean; // default: false ? null
  axisTopTickSize: number; // 0px - 20px default: 5 step: 1
  axisTopTickPadding: number; // 0px - 20px default: 5 step: 1
  axisTopTickRotation: number; // -90° - 90° default: 0 step: 1
  axisTopLegend: string; // default: ''
  isAxisTopLegendValid: boolean; // default: false
  isAxisTopLegendFocused: boolean; // default: false
  axisTopLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axisRight
  enableAxisRight: boolean; // default: false ? null
  axisRightTickSize: number; // 0px - 20px default: 5 step: 1
  axisRightTickPadding: number; // 0px - 20px default: 5 step: 1
  axisRightTickRotation: number; // -90° - 90° default: 0 step: 1
  axisRightLegend: string; // default: ''
  isAxisRightLegendValid: boolean; // default: false
  isAxisRightLegendFocused: boolean; // default: false
  axisRightLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axisBottom
  enableAxisBottom: boolean; // default: true ? {...} : null
  axisBottomTickSize: number; // 0px - 20px default: 5 step: 1
  axisBottomTickPadding: number; // 0px - 20px default: 5 step: 1
  axisBottomTickRotation: number; // -90° - 90° default: 0 step: 1
  axisBottomLegend: string; // default: ''
  isAxisBottomLegendValid: boolean; // default: false
  isAxisBottomLegendFocused: boolean; // default: false
  axisBottomLegendOffset: number; // -60px - 60px default: 0 step: 1
  // axisLeft
  enableAxisLeft: boolean; // default: true ? {...} : null
  axisLeftTickSize: number; // 0px - 20px default: 5 step: 1
  axisLeftTickPadding: number; // 0px - 20px default: 5 step: 1
  axisLeftTickRotation: number; // -90° - 90° default: 0 step: 1
  axisLeftLegend: string; // default: ''
  isAxisLeftLegendValid: boolean; // default: false
  isAxisLeftLegendFocused: boolean; // default: false
  axisLeftLegendOffset: number; // -60px - 60px default: 0 step: 1

  // interactivity
  enableInteractive: boolean; // default: true
  enableCrosshair: boolean; // default: true
  crosshairType: NivoLineCrosshairType; // default: 'bottom-left'

  // legends
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
};

type ResponsiveLineChartAction = {
  // base
  setXScale: 'setXScale';
  setYScale: 'setYScale';

  // margin
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  // style
  setLineCurve: 'setLineCurve';
  setChartColors: 'setChartColors';
  setLineWidth: 'setLineWidth';
  setEnableArea: 'setEnableArea';
  setAreaOpacity: 'setAreaOpacity';
  setAreaBlendMode: 'setAreaBlendMode';

  // points
  setEnablePoints: 'setEnablePoints';
  setPointSize: 'setPointSize';
  setPointColor: 'setPointColor';
  setPointBorderWidth: 'setPointBorderWidth';
  setPointBorderColor: 'setPointBorderColor';
  setEnablePointLabel: 'setEnablePointLabel';
  setPointLabel: 'setPointLabel';
  setPointLabelYOffset: 'setPointLabelYOffset';

  // grids
  setEnableGridX: 'setEnableGridX';
  setEnableGridY: 'setEnableGridY';

  // axes
  // axisTop
  setEnableAxisTop: 'setEnableAxisTop';
  setAxisTopTickSize: 'setAxisTopTickSize';
  setAxisTopTickPadding: 'setAxisTopTickPadding';
  setAxisTopTickRotation: 'setAxisTopTickRotation';
  setAxisTopLegend: 'setAxisTopLegend';
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid';
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused';
  setAxisTopLegendOffset: 'setAxisTopLegendOffset';
  // axisRight
  setEnableAxisRight: 'setEnableAxisRight';
  setAxisRightTickSize: 'setAxisRightTickSize';
  setAxisRightTickPadding: 'setAxisRightTickPadding';
  setAxisRightTickRotation: 'setAxisRightTickRotation';
  setAxisRightLegend: 'setAxisRightLegend';
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid';
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused';
  setAxisRightLegendOffset: 'setAxisRightLegendOffset';
  // axisBottom
  setEnableAxisBottom: 'setEnableAxisBottom';
  setAxisBottomTickSize: 'setAxisBottomTickSize';
  setAxisBottomTickPadding: 'setAxisBottomTickPadding';
  setAxisBottomTickRotation: 'setAxisBottomTickRotation';
  setAxisBottomLegend: 'setAxisBottomLegend';
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid';
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused';
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset';
  // axisLeft
  setEnableAxisLeft: 'setEnableAxisLeft';
  setAxisLeftTickSize: 'setAxisLeftTickSize';
  setAxisLeftTickPadding: 'setAxisLeftTickPadding';
  setAxisLeftTickRotation: 'setAxisLeftTickRotation';
  setAxisLeftLegend: 'setAxisLeftLegend';
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid';
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused';
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset';

  // interactivity
  setEnableInteractive: 'setIsInteractive';
  setEnableCrosshair: 'setEnableCrosshair';
  setCrosshairType: 'setCrosshairType';

  // legends
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
};

type ResponsiveLineChartDispatch =
  | {
      type:
        | ResponsiveLineChartAction['setAxisTopLegend']
        | ResponsiveLineChartAction['setAxisRightLegend']
        | ResponsiveLineChartAction['setAxisBottomLegend']
        | ResponsiveLineChartAction['setAxisLeftLegend'];

      payload: string;
    }
  | {
      type:
        | ResponsiveLineChartAction['setMarginTop']
        | ResponsiveLineChartAction['setMarginRight']
        | ResponsiveLineChartAction['setMarginBottom']
        | ResponsiveLineChartAction['setMarginLeft']
        | ResponsiveLineChartAction['setAxisTopTickSize']
        | ResponsiveLineChartAction['setAxisTopTickPadding']
        | ResponsiveLineChartAction['setAxisTopTickRotation']
        | ResponsiveLineChartAction['setAxisTopLegendOffset']
        | ResponsiveLineChartAction['setAxisRightTickSize']
        | ResponsiveLineChartAction['setAxisRightTickPadding']
        | ResponsiveLineChartAction['setAxisRightTickRotation']
        | ResponsiveLineChartAction['setAxisRightLegendOffset']
        | ResponsiveLineChartAction['setAxisBottomTickSize']
        | ResponsiveLineChartAction['setAxisBottomTickPadding']
        | ResponsiveLineChartAction['setAxisBottomTickRotation']
        | ResponsiveLineChartAction['setAxisBottomLegendOffset']
        | ResponsiveLineChartAction['setAxisLeftTickSize']
        | ResponsiveLineChartAction['setAxisLeftTickPadding']
        | ResponsiveLineChartAction['setAxisLeftTickRotation']
        | ResponsiveLineChartAction['setAxisLeftLegendOffset']
        | ResponsiveLineChartAction['setLineWidth']
        | ResponsiveLineChartAction['setPointSize']
        | ResponsiveLineChartAction['setPointBorderWidth']
        | ResponsiveLineChartAction['setPointLabelYOffset']
        | ResponsiveLineChartAction['setLegendTranslateX']
        | ResponsiveLineChartAction['setLegendTranslateY']
        | ResponsiveLineChartAction['setLegendItemWidth']
        | ResponsiveLineChartAction['setLegendItemHeight']
        | ResponsiveLineChartAction['setLegendItemsSpacing']
        | ResponsiveLineChartAction['setLegendItemOpacity']
        | ResponsiveLineChartAction['setLegendSymbolSize'];

      payload: number;
    }
  | {
      type:
        | ResponsiveLineChartAction['setEnableArea']
        | ResponsiveLineChartAction['setEnablePoints']
        | ResponsiveLineChartAction['setEnablePointLabel']
        | ResponsiveLineChartAction['setEnableGridX']
        | ResponsiveLineChartAction['setEnableGridY']
        | ResponsiveLineChartAction['setEnableAxisTop']
        | ResponsiveLineChartAction['setEnableAxisRight']
        | ResponsiveLineChartAction['setEnableAxisBottom']
        | ResponsiveLineChartAction['setEnableAxisLeft']
        | ResponsiveLineChartAction['setEnableInteractive']
        | ResponsiveLineChartAction['setEnableCrosshair']
        | ResponsiveLineChartAction['setEnableLegend']
        | ResponsiveLineChartAction['setEnableLegendJustify']
        | ResponsiveLineChartAction['setEnableAnimate'];

      payload: boolean;
    }
  | {
      type: ResponsiveLineChartAction['setChartColors'];
      payload: string[];
    }
  | {
      type:
        | ResponsiveLineChartAction['setPointColor']
        | ResponsiveLineChartAction['setPointBorderColor'];

      payload: NivoColor;
    }
  | {
      type: ResponsiveLineChartAction['setChartColors'];
      payload: NivoColorScheme;
    }
  | {
      type: ResponsiveLineChartAction['setLineCurve'];
      payload: NivoLineCurve;
    }
  | {
      type: ResponsiveLineChartAction['setAreaBlendMode'];
      payload: NivoLineAreaBlendMode;
    }
  | {
      type: ResponsiveLineChartAction['setLegendAnchor'];
      payload: NivoLegendAnchor;
    }
  | {
      type: ResponsiveLineChartAction['setLegendDirection'];
      payload: NivoLegendDirection;
    }
  | {
      type: ResponsiveLineChartAction['setLegendItemDirection'];
      payload: NivoLegendItemDirection;
    }
  | {
      type: ResponsiveLineChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveLineChartAction['setCrosshairType'];
      payload: NivoLineCrosshairType;
    }
  | {
      type:
        | ResponsiveLineChartAction['setXScale']
        | ResponsiveLineChartAction['setYScale'];

      payload: 'linear' | 'point';
    };

export type {
  ResponsiveLineChartState,
  ResponsiveLineChartDispatch,
  ResponsiveLineChartAction,
};
