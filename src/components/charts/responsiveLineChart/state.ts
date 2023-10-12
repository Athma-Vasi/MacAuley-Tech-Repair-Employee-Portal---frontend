import {
  ResponsiveLineChartAction,
  ResponsiveLineChartDispatch,
  ResponsiveLineChartState,
} from './types';

const initialResponsiveLineChartState: ResponsiveLineChartState = {
  // base
  xScale: 'point',
  yScale: 'linear',
  enableYScaleStacked: true,
  enableYScaleMin: false,
  yScaleMin: 0,
  enableYScaleMax: false,
  yScaleMax: 0,
  reverseScale: false,

  // margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  // style
  lineCurve: 'linear',
  chartColors: 'nivo',
  lineWidth: 2,
  enableArea: false,
  areaOpacity: 0.2,
  areaBlendMode: 'normal',

  // points
  enablePoints: false,
  pointSize: 6,
  pointColor: 'gray',
  pointBorderWidth: 0,
  pointBorderColor: 'gray',
  enablePointLabel: false,
  pointLabel: 'y',
  pointLabelYOffset: -12,

  // grids
  enableGridX: true,
  enableGridY: true,

  // axes
  // axisTop
  enableAxisTop: false,
  axisTopTickSize: 5,
  axisTopTickPadding: 5,
  axisTopTickRotation: 0,
  axisTopLegend: '',
  isAxisTopLegendValid: false,
  isAxisTopLegendFocused: false,
  axisTopLegendOffset: 0,
  // axisRight
  enableAxisRight: false,
  axisRightTickSize: 5,
  axisRightTickPadding: 5,
  axisRightTickRotation: 0,
  axisRightLegend: '',
  isAxisRightLegendValid: false,
  isAxisRightLegendFocused: false,
  axisRightLegendOffset: 0,
  // axisBottom
  enableAxisBottom: true,
  axisBottomTickSize: 5,
  axisBottomTickPadding: 5,
  axisBottomTickRotation: 0,
  axisBottomLegend: '',
  isAxisBottomLegendValid: false,
  isAxisBottomLegendFocused: false,
  axisBottomLegendOffset: 0,
  // axisLeft
  enableAxisLeft: true,
  axisLeftTickSize: 5,
  axisLeftTickPadding: 5,
  axisLeftTickRotation: 0,
  axisLeftLegend: '',
  isAxisLeftLegendValid: false,
  isAxisLeftLegendFocused: false,
  axisLeftLegendOffset: 0,

  // interactivity
  enableCrosshair: true,
  crosshairType: 'bottom-left',

  // legends
  enableLegend: false,
  legendAnchor: 'bottom-right',
  legendDirection: 'column',
  enableLegendJustify: false,
  legendTranslateX: 0,
  legendTranslateY: 0,
  legendItemWidth: 60,
  legendItemHeight: 20,
  legendItemsSpacing: 2,
  legendItemDirection: 'left-to-right',
  legendItemOpacity: 1,
  legendSymbolSize: 12,
  legendSymbolShape: 'circle',
  legendSymbolBorderColor: 'rgba(0, 0, 0, .5)',
  legendSymbolBorderWidth: 0,
  legendSymbolSpacing: 8,

  // motion
  enableAnimate: true,
  motionConfig: 'gentle',
};

const responsiveLineChartAction: ResponsiveLineChartAction = {
  // base
  setXScale: 'setXScale',
  setYScale: 'setYScale',
  setEnableYScaleStacked: 'setEnableYScaleStacked',
  setEnableYScaleMin: 'setEnableYScaleMin',
  setYScaleMin: 'setYScaleMin',
  setEnableYScaleMax: 'setEnableYScaleMax',
  setYScaleMax: 'setYScaleMax',
  setReverseScale: 'setReverseScale',

  // margin
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  // style
  setLineCurve: 'setLineCurve',
  setChartColors: 'setChartColors',
  setLineWidth: 'setLineWidth',
  setEnableArea: 'setEnableArea',
  setAreaOpacity: 'setAreaOpacity',
  setAreaBlendMode: 'setAreaBlendMode',

  // points
  setEnablePoints: 'setEnablePoints',
  setPointSize: 'setPointSize',
  setPointColor: 'setPointColor',
  setPointBorderWidth: 'setPointBorderWidth',
  setPointBorderColor: 'setPointBorderColor',
  setEnablePointLabel: 'setEnablePointLabel',
  setPointLabel: 'setPointLabel',
  setPointLabelYOffset: 'setPointLabelYOffset',

  // grids
  setEnableGridX: 'setEnableGridX',
  setEnableGridY: 'setEnableGridY',

  // axes
  // axisTop
  setEnableAxisTop: 'setEnableAxisTop',
  setAxisTopTickSize: 'setAxisTopTickSize',
  setAxisTopTickPadding: 'setAxisTopTickPadding',
  setAxisTopTickRotation: 'setAxisTopTickRotation',
  setAxisTopLegend: 'setAxisTopLegend',
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid',
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused',
  setAxisTopLegendOffset: 'setAxisTopLegendOffset',
  // axisRight
  setEnableAxisRight: 'setEnableAxisRight',
  setAxisRightTickSize: 'setAxisRightTickSize',
  setAxisRightTickPadding: 'setAxisRightTickPadding',
  setAxisRightTickRotation: 'setAxisRightTickRotation',
  setAxisRightLegend: 'setAxisRightLegend',
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid',
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused',
  setAxisRightLegendOffset: 'setAxisRightLegendOffset',
  // axisBottom
  setEnableAxisBottom: 'setEnableAxisBottom',
  setAxisBottomTickSize: 'setAxisBottomTickSize',
  setAxisBottomTickPadding: 'setAxisBottomTickPadding',
  setAxisBottomTickRotation: 'setAxisBottomTickRotation',
  setAxisBottomLegend: 'setAxisBottomLegend',
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid',
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused',
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset',
  // axisLeft
  setEnableAxisLeft: 'setEnableAxisLeft',
  setAxisLeftTickSize: 'setAxisLeftTickSize',
  setAxisLeftTickPadding: 'setAxisLeftTickPadding',
  setAxisLeftTickRotation: 'setAxisLeftTickRotation',
  setAxisLeftLegend: 'setAxisLeftLegend',
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid',
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused',
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset',

  // interactivity
  setEnableCrosshair: 'setEnableCrosshair',
  setCrosshairType: 'setCrosshairType',

  // legends
  setEnableLegend: 'setEnableLegend',
  setLegendAnchor: 'setLegendAnchor',
  setLegendDirection: 'setLegendDirection',
  setEnableLegendJustify: 'setEnableLegendJustify',
  setLegendTranslateX: 'setLegendTranslateX',
  setLegendTranslateY: 'setLegendTranslateY',
  setLegendItemWidth: 'setLegendItemWidth',
  setLegendItemHeight: 'setLegendItemHeight',
  setLegendItemsSpacing: 'setLegendItemsSpacing',
  setLegendItemDirection: 'setLegendItemDirection',
  setLegendItemOpacity: 'setLegendItemOpacity',
  setLegendSymbolSize: 'setLegendSymbolSize',
  setLegendSymbolShape: 'setLegendSymbolShape',
  setLegendSymbolBorderColor: 'setLegendSymbolBorderColor',
  setLegendSymbolBorderWidth: 'setLegendSymbolBorderWidth',
  setLegendSymbolSpacing: 'setLegendSymbolSpacing',

  // motion
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',
};

function responsiveLineChartReducer(
  state: ResponsiveLineChartState,
  action: ResponsiveLineChartDispatch
): ResponsiveLineChartState {
  switch (action.type) {
    // base
    case responsiveLineChartAction.setXScale:
      return { ...state, xScale: action.payload };
    case responsiveLineChartAction.setYScale:
      return { ...state, yScale: action.payload };
    case responsiveLineChartAction.setEnableYScaleStacked:
      return { ...state, enableYScaleStacked: action.payload };
    case responsiveLineChartAction.setEnableYScaleMin:
      return { ...state, enableYScaleMin: action.payload };
    case responsiveLineChartAction.setYScaleMin:
      return { ...state, yScaleMin: action.payload };
    case responsiveLineChartAction.setEnableYScaleMax:
      return { ...state, enableYScaleMax: action.payload };
    case responsiveLineChartAction.setYScaleMax:
      return { ...state, yScaleMax: action.payload };
    case responsiveLineChartAction.setReverseScale:
      return { ...state, reverseScale: action.payload };

    // margin
    case responsiveLineChartAction.setMarginTop:
      return { ...state, marginTop: action.payload };
    case responsiveLineChartAction.setMarginRight:
      return { ...state, marginRight: action.payload };
    case responsiveLineChartAction.setMarginBottom:
      return { ...state, marginBottom: action.payload };
    case responsiveLineChartAction.setMarginLeft:
      return { ...state, marginLeft: action.payload };

    // style
    case responsiveLineChartAction.setLineCurve:
      return { ...state, lineCurve: action.payload };
    case responsiveLineChartAction.setChartColors:
      return { ...state, chartColors: action.payload };
    case responsiveLineChartAction.setLineWidth:
      return { ...state, lineWidth: action.payload };
    case responsiveLineChartAction.setEnableArea:
      return { ...state, enableArea: action.payload };
    case responsiveLineChartAction.setAreaOpacity:
      return { ...state, areaOpacity: action.payload };
    case responsiveLineChartAction.setAreaBlendMode:
      return { ...state, areaBlendMode: action.payload };

    // points
    case responsiveLineChartAction.setEnablePoints:
      return { ...state, enablePoints: action.payload };
    case responsiveLineChartAction.setPointSize:
      return { ...state, pointSize: action.payload };
    case responsiveLineChartAction.setPointColor:
      return { ...state, pointColor: action.payload };
    case responsiveLineChartAction.setPointBorderWidth:
      return { ...state, pointBorderWidth: action.payload };
    case responsiveLineChartAction.setPointBorderColor:
      return { ...state, pointBorderColor: action.payload };
    case responsiveLineChartAction.setEnablePointLabel:
      return { ...state, enablePointLabel: action.payload };
    case responsiveLineChartAction.setPointLabel:
      return { ...state, pointLabel: action.payload };
    case responsiveLineChartAction.setPointLabelYOffset:
      return { ...state, pointLabelYOffset: action.payload };

    // grids
    case responsiveLineChartAction.setEnableGridX:
      return { ...state, enableGridX: action.payload };
    case responsiveLineChartAction.setEnableGridY:
      return { ...state, enableGridY: action.payload };

    // axes
    // axisTop
    case responsiveLineChartAction.setEnableAxisTop:
      return { ...state, enableAxisTop: action.payload };
    case responsiveLineChartAction.setAxisTopTickSize:
      return { ...state, axisTopTickSize: action.payload };
    case responsiveLineChartAction.setAxisTopTickPadding:
      return { ...state, axisTopTickPadding: action.payload };
    case responsiveLineChartAction.setAxisTopTickRotation:
      return { ...state, axisTopTickRotation: action.payload };
    case responsiveLineChartAction.setAxisTopLegend:
      return { ...state, axisTopLegend: action.payload };
    case responsiveLineChartAction.setIsAxisTopLegendValid:
      return { ...state, isAxisTopLegendValid: action.payload };
    case responsiveLineChartAction.setIsAxisTopLegendFocused:
      return { ...state, isAxisTopLegendFocused: action.payload };
    case responsiveLineChartAction.setAxisTopLegendOffset:
      return { ...state, axisTopLegendOffset: action.payload };
    // axisRight
    case responsiveLineChartAction.setEnableAxisRight:
      return { ...state, enableAxisRight: action.payload };
    case responsiveLineChartAction.setAxisRightTickSize:
      return { ...state, axisRightTickSize: action.payload };
    case responsiveLineChartAction.setAxisRightTickPadding:
      return { ...state, axisRightTickPadding: action.payload };
    case responsiveLineChartAction.setAxisRightTickRotation:
      return { ...state, axisRightTickRotation: action.payload };
    case responsiveLineChartAction.setAxisRightLegend:
      return { ...state, axisRightLegend: action.payload };
    case responsiveLineChartAction.setIsAxisRightLegendValid:
      return { ...state, isAxisRightLegendValid: action.payload };
    case responsiveLineChartAction.setIsAxisRightLegendFocused:
      return { ...state, isAxisRightLegendFocused: action.payload };
    case responsiveLineChartAction.setAxisRightLegendOffset:
      return { ...state, axisRightLegendOffset: action.payload };
    // axisBottom
    case responsiveLineChartAction.setEnableAxisBottom:
      return { ...state, enableAxisBottom: action.payload };
    case responsiveLineChartAction.setAxisBottomTickSize:
      return { ...state, axisBottomTickSize: action.payload };
    case responsiveLineChartAction.setAxisBottomTickPadding:
      return { ...state, axisBottomTickPadding: action.payload };
    case responsiveLineChartAction.setAxisBottomTickRotation:
      return { ...state, axisBottomTickRotation: action.payload };
    case responsiveLineChartAction.setAxisBottomLegend:
      return { ...state, axisBottomLegend: action.payload };
    case responsiveLineChartAction.setIsAxisBottomLegendValid:
      return { ...state, isAxisBottomLegendValid: action.payload };
    case responsiveLineChartAction.setIsAxisBottomLegendFocused:
      return { ...state, isAxisBottomLegendFocused: action.payload };
    case responsiveLineChartAction.setAxisBottomLegendOffset:
      return { ...state, axisBottomLegendOffset: action.payload };
    // axisLeft
    case responsiveLineChartAction.setEnableAxisLeft:
      return { ...state, enableAxisLeft: action.payload };
    case responsiveLineChartAction.setAxisLeftTickSize:
      return { ...state, axisLeftTickSize: action.payload };
    case responsiveLineChartAction.setAxisLeftTickPadding:
      return { ...state, axisLeftTickPadding: action.payload };
    case responsiveLineChartAction.setAxisLeftTickRotation:
      return { ...state, axisLeftTickRotation: action.payload };
    case responsiveLineChartAction.setAxisLeftLegend:
      return { ...state, axisLeftLegend: action.payload };
    case responsiveLineChartAction.setIsAxisLeftLegendValid:
      return { ...state, isAxisLeftLegendValid: action.payload };
    case responsiveLineChartAction.setIsAxisLeftLegendFocused:
      return { ...state, isAxisLeftLegendFocused: action.payload };
    case responsiveLineChartAction.setAxisLeftLegendOffset:
      return { ...state, axisLeftLegendOffset: action.payload };

    // interactivity
    case responsiveLineChartAction.setEnableCrosshair:
      return { ...state, enableCrosshair: action.payload };
    case responsiveLineChartAction.setCrosshairType:
      return { ...state, crosshairType: action.payload };

    // legends
    case responsiveLineChartAction.setEnableLegend:
      return { ...state, enableLegend: action.payload };
    case responsiveLineChartAction.setLegendAnchor:
      return { ...state, legendAnchor: action.payload };
    case responsiveLineChartAction.setLegendDirection:
      return { ...state, legendDirection: action.payload };
    case responsiveLineChartAction.setEnableLegendJustify:
      return { ...state, enableLegendJustify: action.payload };
    case responsiveLineChartAction.setLegendTranslateX:
      return { ...state, legendTranslateX: action.payload };
    case responsiveLineChartAction.setLegendTranslateY:
      return { ...state, legendTranslateY: action.payload };
    case responsiveLineChartAction.setLegendItemWidth:
      return { ...state, legendItemWidth: action.payload };
    case responsiveLineChartAction.setLegendItemHeight:
      return { ...state, legendItemHeight: action.payload };
    case responsiveLineChartAction.setLegendItemsSpacing:
      return { ...state, legendItemsSpacing: action.payload };
    case responsiveLineChartAction.setLegendItemDirection:
      return { ...state, legendItemDirection: action.payload };
    case responsiveLineChartAction.setLegendItemOpacity:
      return { ...state, legendItemOpacity: action.payload };
    case responsiveLineChartAction.setLegendSymbolSize:
      return { ...state, legendSymbolSize: action.payload };
    case responsiveLineChartAction.setLegendSymbolShape:
      return { ...state, legendSymbolShape: action.payload };
    case responsiveLineChartAction.setLegendSymbolBorderColor:
      return { ...state, legendSymbolBorderColor: action.payload };
    case responsiveLineChartAction.setLegendSymbolBorderWidth:
      return { ...state, legendSymbolBorderWidth: action.payload };
    case responsiveLineChartAction.setLegendSymbolSpacing:
      return { ...state, legendSymbolSpacing: action.payload };

    // motion
    case responsiveLineChartAction.setEnableAnimate:
      return { ...state, enableAnimate: action.payload };
    case responsiveLineChartAction.setMotionConfig:
      return { ...state, motionConfig: action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveLineChartState,
  responsiveLineChartAction,
  responsiveLineChartReducer,
};
