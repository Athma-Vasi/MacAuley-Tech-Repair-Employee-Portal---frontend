import {
  ResponsiveLineChartAction,
  ResponsiveLineChartDispatch,
  ResponsiveLineChartState,
} from './types';

const initialResponsiveLineChartState: ResponsiveLineChartState = {
  // base
  enableYScaleStacked: true,
  reverseScale: false,
  xScale: 'point',
  yScale: 'linear',

  // margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  // style
  areaBlendMode: 'normal',
  areaOpacity: 0.2,
  chartColors: 'nivo',
  enableArea: false,
  lineCurve: 'linear',
  lineWidth: 2,

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
  axisTopLegend: '',
  axisTopLegendOffset: 0,
  axisTopLegendPosition: 'middle',
  axisTopTickPadding: 5,
  axisTopTickRotation: 0,
  axisTopTickSize: 5,
  enableAxisTop: false,
  isAxisTopLegendFocused: false,
  isAxisTopLegendValid: false,
  // axisRight
  axisRightLegend: '',
  axisRightLegendOffset: 0,
  axisRightLegendPosition: 'middle',
  axisRightTickPadding: 5,
  axisRightTickRotation: 0,
  axisRightTickSize: 5,
  enableAxisRight: false,
  isAxisRightLegendFocused: false,
  isAxisRightLegendValid: false,
  // axisBottom
  axisBottomLegend: '',
  axisBottomLegendOffset: 0,
  axisBottomLegendPosition: 'middle',
  axisBottomTickPadding: 5,
  axisBottomTickRotation: 0,
  axisBottomTickSize: 5,
  enableAxisBottom: true,
  isAxisBottomLegendFocused: false,
  isAxisBottomLegendValid: false,
  // axisLeft
  axisLeftLegend: '',
  axisLeftLegendOffset: 0,
  axisLeftLegendPosition: 'middle',
  axisLeftTickPadding: 5,
  axisLeftTickRotation: 0,
  axisLeftTickSize: 5,
  enableAxisLeft: true,
  isAxisLeftLegendFocused: false,
  isAxisLeftLegendValid: false,

  // interactivity
  enableCrosshair: true,
  crosshairType: 'bottom-left',

  // legends
  enableLegend: false,
  enableLegendJustify: false,
  legendAnchor: 'bottom-right',
  legendDirection: 'column',
  legendItemBackground: 'rgba(255, 255, 255, 0)',
  legendItemDirection: 'left-to-right',
  legendItemHeight: 20,
  legendItemOpacity: 1,
  legendItemTextColor: 'gray',
  legendItemWidth: 60,
  legendItemsSpacing: 2,
  legendSymbolBorderColor: 'rgba(0, 0, 0, .5)',
  legendSymbolBorderWidth: 0,
  legendSymbolShape: 'circle',
  legendSymbolSize: 12,
  legendSymbolSpacing: 8,
  legendTranslateX: 0,
  legendTranslateY: 0,

  // motion
  enableAnimate: true,
  motionConfig: 'gentle',

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

const responsiveLineChartAction: ResponsiveLineChartAction = {
  // base
  setEnableYScaleStacked: 'setEnableYScaleStacked',
  setReverseScale: 'setReverseScale',
  setXScale: 'setXScale',
  setYScale: 'setYScale',

  // margin
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  // style
  setAreaBlendMode: 'setAreaBlendMode',
  setAreaOpacity: 'setAreaOpacity',
  setChartColors: 'setChartColors',
  setEnableArea: 'setEnableArea',
  setLineCurve: 'setLineCurve',
  setLineWidth: 'setLineWidth',

  // points
  setEnablePointLabel: 'setEnablePointLabel',
  setEnablePoints: 'setEnablePoints',
  setPointBorderColor: 'setPointBorderColor',
  setPointBorderWidth: 'setPointBorderWidth',
  setPointColor: 'setPointColor',
  setPointLabel: 'setPointLabel',
  setPointLabelYOffset: 'setPointLabelYOffset',
  setPointSize: 'setPointSize',

  // grids
  setEnableGridX: 'setEnableGridX',
  setEnableGridY: 'setEnableGridY',

  // axes
  // axisTop
  setAxisTopLegend: 'setAxisTopLegend',
  setAxisTopLegendOffset: 'setAxisTopLegendOffset',
  setAxisTopLegendPosition: 'setAxisTopLegendPosition',
  setAxisTopTickPadding: 'setAxisTopTickPadding',
  setAxisTopTickRotation: 'setAxisTopTickRotation',
  setAxisTopTickSize: 'setAxisTopTickSize',
  setEnableAxisTop: 'setEnableAxisTop',
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused',
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid',
  // axisRight
  setAxisRightLegend: 'setAxisRightLegend',
  setAxisRightLegendOffset: 'setAxisRightLegendOffset',
  setAxisRightLegendPosition: 'setAxisRightLegendPosition',
  setAxisRightTickPadding: 'setAxisRightTickPadding',
  setAxisRightTickRotation: 'setAxisRightTickRotation',
  setAxisRightTickSize: 'setAxisRightTickSize',
  setEnableAxisRight: 'setEnableAxisRight',
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused',
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid',
  // axisBottom
  setAxisBottomLegend: 'setAxisBottomLegend',
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset',
  setAxisBottomLegendPosition: 'setAxisBottomLegendPosition',
  setAxisBottomTickPadding: 'setAxisBottomTickPadding',
  setAxisBottomTickRotation: 'setAxisBottomTickRotation',
  setAxisBottomTickSize: 'setAxisBottomTickSize',
  setEnableAxisBottom: 'setEnableAxisBottom',
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused',
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid',
  // axisLeft
  setAxisLeftLegend: 'setAxisLeftLegend',
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset',
  setAxisLeftLegendPosition: 'setAxisLeftLegendPosition',
  setAxisLeftTickPadding: 'setAxisLeftTickPadding',
  setAxisLeftTickRotation: 'setAxisLeftTickRotation',
  setAxisLeftTickSize: 'setAxisLeftTickSize',
  setEnableAxisLeft: 'setEnableAxisLeft',
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused',
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid',

  // interactivity
  setEnableCrosshair: 'setEnableCrosshair',
  setCrosshairType: 'setCrosshairType',

  // legends
  setEnableLegend: 'setEnableLegend',
  setEnableLegendJustify: 'setEnableLegendJustify',
  setLegendAnchor: 'setLegendAnchor',
  setLegendDirection: 'setLegendDirection',
  setLegendItemBackground: 'setLegendItemBackground',
  setLegendItemDirection: 'setLegendItemDirection',
  setLegendItemHeight: 'setLegendItemHeight',
  setLegendItemOpacity: 'setLegendItemOpacity',
  setLegendItemTextColor: 'setLegendItemTextColor',
  setLegendItemWidth: 'setLegendItemWidth',
  setLegendItemsSpacing: 'setLegendItemsSpacing',
  setLegendSymbolBorderColor: 'setLegendSymbolBorderColor',
  setLegendSymbolBorderWidth: 'setLegendSymbolBorderWidth',
  setLegendSymbolShape: 'setLegendSymbolShape',
  setLegendSymbolSize: 'setLegendSymbolSize',
  setLegendSymbolSpacing: 'setLegendSymbolSpacing',
  setLegendTranslateX: 'setLegendTranslateX',
  setLegendTranslateY: 'setLegendTranslateY',

  // motion
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',

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
    case responsiveLineChartAction.setAxisTopLegendPosition:
      return { ...state, axisTopLegendPosition: action.payload };

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
    case responsiveLineChartAction.setAxisRightLegendPosition:
      return { ...state, axisRightLegendPosition: action.payload };

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
    case responsiveLineChartAction.setAxisBottomLegendPosition:
      return { ...state, axisBottomLegendPosition: action.payload };

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
    case responsiveLineChartAction.setAxisLeftLegendPosition:
      return { ...state, axisLeftLegendPosition: action.payload };

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
    case responsiveLineChartAction.setLegendItemTextColor:
      return { ...state, legendItemTextColor: action.payload };
    case responsiveLineChartAction.setLegendItemBackground:
      return { ...state, legendItemBackground: action.payload };
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

    // options
    case responsiveLineChartAction.setChartTitle:
      return { ...state, chartTitle: action.payload };
    case responsiveLineChartAction.setChartTitleColor:
      return { ...state, chartTitleColor: action.payload };
    case responsiveLineChartAction.setChartTitlePosition:
      return { ...state, chartTitlePosition: action.payload };
    case responsiveLineChartAction.setChartTitleSize:
      return { ...state, chartTitleSize: action.payload };
    case responsiveLineChartAction.setIsChartTitleFocused:
      return { ...state, isChartTitleFocused: action.payload };
    case responsiveLineChartAction.setIsChartTitleValid:
      return { ...state, isChartTitleValid: action.payload };

    // screenshot
    case responsiveLineChartAction.setIsScreenshotFilenameFocused:
      return { ...state, isScreenshotFilenameFocused: action.payload };
    case responsiveLineChartAction.setIsScreenshotFilenameValid:
      return { ...state, isScreenshotFilenameValid: action.payload };
    case responsiveLineChartAction.setScreenshotFilename:
      return { ...state, screenshotFilename: action.payload };
    case responsiveLineChartAction.setScreenshotImageQuality:
      return { ...state, screenshotImageQuality: action.payload };
    case responsiveLineChartAction.setScreenshotImageType:
      return { ...state, screenshotImageType: action.payload };

    // reset all
    case responsiveLineChartAction.resetChartToDefault:
      return { ...action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveLineChartState,
  responsiveLineChartAction,
  responsiveLineChartReducer,
};
