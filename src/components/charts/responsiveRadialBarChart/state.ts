import {
  ResponsiveRadialBarChartAction,
  ResponsiveRadialBarChartDispatch,
  ResponsiveRadialBarChartState,
} from './types';

const initialResponsiveRadialBarChartState: ResponsiveRadialBarChartState = {
  // base
  // base -> margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,
  // base -> angles
  startAngle: 0,
  endAngle: 270,
  innerRadius: 0.3,
  paddingRing: 0.2,
  padAngle: 0,
  cornerRadius: 0,

  // style
  chartColors: 'nivo',
  ringBorderWidth: 0,
  ringBorderColor: 'gray',

  // tracks
  enableTracks: true,
  tracksColor: 'gray',

  // grids
  enableRadialGrid: true,
  enableCircularGrid: true,

  // axes
  // radial axis start
  enableRadialAxisStart: true,
  radialAxisStartTickSize: 5,
  radialAxisStartTickPadding: 5,
  radialAxisStartTickRotation: 0,

  // radial axis end
  enableRadialAxisEnd: false,
  radialAxisEndTickSize: 5,
  radialAxisEndTickPadding: 5,
  radialAxisEndTickRotation: 0,

  // circular axis inner
  enableCircularAxisInner: false,
  circularAxisInnerTickSize: 5,
  circularAxisInnerTickPadding: 5,
  circularAxisInnerTickRotation: 0,

  // circular axis outer
  enableCircularAxisOuter: true,
  circularAxisOuterTickSize: 5,
  circularAxisOuterTickPadding: 7,
  circularAxisOuterTickRotation: 0,

  // labels
  enableLabels: false,
  labelsSkipAngle: 10,
  labelsRadiusOffset: 0.5,
  labelsTextColor: 'gray',

  // legend
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
  legendSymbolBorderColor: 'rgba(0, 0, 0, 0)',
  legendSymbolBorderWidth: 0,
  legendSymbolShape: 'circle',
  legendSymbolSize: 12,
  legendSymbolSpacing: 8,
  legendTranslateX: 0,
  legendTranslateY: 0,

  // motion
  enableAnimate: true,
  motionConfig: 'gentle',
  transitionMode: 'centerRadius',

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
  screenshotImageQuality: 1.0,
  screenshotImageType: 'image/png',
};

const responsiveRadialBarChartAction: ResponsiveRadialBarChartAction = {
  // base
  // base -> margin
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',
  // base -> angles
  setStartAngle: 'setStartAngle',
  setEndAngle: 'setEndAngle',
  setInnerRadius: 'setInnerRadius',
  setPaddingRing: 'setPaddingRing',
  setPadAngle: 'setPadAngle',
  setCornerRadius: 'setCornerRadius',

  // style
  setChartColors: 'setChartColors',
  setRingBorderWidth: 'setRingBorderWidth',
  setRingBorderColor: 'setRingBorderColor',

  // tracks
  setEnableTracks: 'setEnableTracks',
  setTracksColor: 'setTracksColor',

  // grids
  setEnableRadialGrid: 'setEnableRadialGrid',
  setEnableCircularGrid: 'setEnableCircularGrid',

  // axes
  // radial axis start
  setEnableRadialAxisStart: 'setEnableRadialAxisStart',
  setRadialAxisStartTickSize: 'setRadialAxisStartTickSize',
  setRadialAxisStartTickPadding: 'setRadialAxisStartTickPadding',
  setRadialAxisStartTickRotation: 'setRadialAxisStartTickRotation',

  // radial axis end
  setEnableRadialAxisEnd: 'setEnableRadialAxisEnd',
  setRadialAxisEndTickSize: 'setRadialAxisEndTickSize',
  setRadialAxisEndTickPadding: 'setRadialAxisEndTickPadding',
  setRadialAxisEndTickRotation: 'setRadialAxisEndTickRotation',

  // circular axis inner
  setEnableCircularAxisInner: 'setEnableCircularAxisInner',
  setCircularAxisInnerTickSize: 'setCircularAxisInnerTickSize',
  setCircularAxisInnerTickPadding: 'setCircularAxisInnerTickPadding',
  setCircularAxisInnerTickRotation: 'setCircularAxisInnerTickRotation',

  // circular axis outer
  setEnableCircularAxisOuter: 'setEnableCircularAxisOuter',
  setCircularAxisOuterTickSize: 'setCircularAxisOuterTickSize',
  setCircularAxisOuterTickPadding: 'setCircularAxisOuterTickPadding',
  setCircularAxisOuterTickRotation: 'setCircularAxisOuterTickRotation',

  // labels
  setEnableLabels: 'setEnableLabels',
  setLabelsSkipAngle: 'setLabelsSkipAngle',
  setLabelsRadiusOffset: 'setLabelsRadiusOffset',
  setLabelsTextColor: 'setLabelsTextColor',

  // legend
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
  setTransitionMode: 'setTransitionMode',

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

function responsiveRadialBarChartReducer(
  state: ResponsiveRadialBarChartState,
  action: ResponsiveRadialBarChartDispatch
): ResponsiveRadialBarChartState {
  switch (action.type) {
    // base
    // base -> margin
    case responsiveRadialBarChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsiveRadialBarChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsiveRadialBarChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsiveRadialBarChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };
    // base -> angles
    case responsiveRadialBarChartAction.setStartAngle:
      return {
        ...state,
        startAngle: action.payload,
      };
    case responsiveRadialBarChartAction.setEndAngle:
      return {
        ...state,
        endAngle: action.payload,
      };
    case responsiveRadialBarChartAction.setInnerRadius:
      return {
        ...state,
        innerRadius: action.payload,
      };
    case responsiveRadialBarChartAction.setPaddingRing:
      return {
        ...state,
        paddingRing: action.payload,
      };
    case responsiveRadialBarChartAction.setPadAngle:
      return {
        ...state,
        padAngle: action.payload,
      };
    case responsiveRadialBarChartAction.setCornerRadius:
      return {
        ...state,
        cornerRadius: action.payload,
      };
    // style
    case responsiveRadialBarChartAction.setChartColors:
      return {
        ...state,
        chartColors: action.payload,
      };
    case responsiveRadialBarChartAction.setRingBorderWidth:
      return {
        ...state,
        ringBorderWidth: action.payload,
      };
    case responsiveRadialBarChartAction.setRingBorderColor:
      return {
        ...state,
        ringBorderColor: action.payload,
      };
    // tracks
    case responsiveRadialBarChartAction.setEnableTracks:
      return {
        ...state,
        enableTracks: action.payload,
      };
    case responsiveRadialBarChartAction.setTracksColor:
      return {
        ...state,
        tracksColor: action.payload,
      };
    // grids
    case responsiveRadialBarChartAction.setEnableRadialGrid:
      return {
        ...state,
        enableRadialGrid: action.payload,
      };
    case responsiveRadialBarChartAction.setEnableCircularGrid:
      return {
        ...state,
        enableCircularGrid: action.payload,
      };
    // axes
    // radial axis start
    case responsiveRadialBarChartAction.setEnableRadialAxisStart:
      return {
        ...state,
        enableRadialAxisStart: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisStartTickSize:
      return {
        ...state,
        radialAxisStartTickSize: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisStartTickPadding:
      return {
        ...state,
        radialAxisStartTickPadding: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisStartTickRotation:
      return {
        ...state,
        radialAxisStartTickRotation: action.payload,
      };
    // radial axis end
    case responsiveRadialBarChartAction.setEnableRadialAxisEnd:
      return {
        ...state,
        enableRadialAxisEnd: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisEndTickSize:
      return {
        ...state,
        radialAxisEndTickSize: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisEndTickPadding:
      return {
        ...state,
        radialAxisEndTickPadding: action.payload,
      };
    case responsiveRadialBarChartAction.setRadialAxisEndTickRotation:
      return {
        ...state,
        radialAxisEndTickRotation: action.payload,
      };
    // circular axis inner
    case responsiveRadialBarChartAction.setEnableCircularAxisInner:
      return {
        ...state,
        enableCircularAxisInner: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisInnerTickSize:
      return {
        ...state,
        circularAxisInnerTickSize: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisInnerTickPadding:
      return {
        ...state,
        circularAxisInnerTickPadding: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisInnerTickRotation:
      return {
        ...state,
        circularAxisInnerTickRotation: action.payload,
      };
    // circular axis outer
    case responsiveRadialBarChartAction.setEnableCircularAxisOuter:
      return {
        ...state,
        enableCircularAxisOuter: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisOuterTickSize:
      return {
        ...state,
        circularAxisOuterTickSize: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisOuterTickPadding:
      return {
        ...state,
        circularAxisOuterTickPadding: action.payload,
      };
    case responsiveRadialBarChartAction.setCircularAxisOuterTickRotation:
      return {
        ...state,
        circularAxisOuterTickRotation: action.payload,
      };
    // labels
    case responsiveRadialBarChartAction.setEnableLabels:
      return {
        ...state,
        enableLabels: action.payload,
      };
    case responsiveRadialBarChartAction.setLabelsSkipAngle:
      return {
        ...state,
        labelsSkipAngle: action.payload,
      };
    case responsiveRadialBarChartAction.setLabelsRadiusOffset:
      return {
        ...state,
        labelsRadiusOffset: action.payload,
      };
    case responsiveRadialBarChartAction.setLabelsTextColor:
      return {
        ...state,
        labelsTextColor: action.payload,
      };
    // legend
    case responsiveRadialBarChartAction.setEnableLegend:
      return {
        ...state,
        enableLegend: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendAnchor:
      return {
        ...state,
        legendAnchor: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendDirection:
      return {
        ...state,
        legendDirection: action.payload,
      };
    case responsiveRadialBarChartAction.setEnableLegendJustify:
      return {
        ...state,
        enableLegendJustify: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendTranslateX:
      return {
        ...state,
        legendTranslateX: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendTranslateY:
      return {
        ...state,
        legendTranslateY: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemWidth:
      return {
        ...state,
        legendItemWidth: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemHeight:
      return {
        ...state,
        legendItemHeight: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemsSpacing:
      return {
        ...state,
        legendItemsSpacing: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemDirection:
      return {
        ...state,
        legendItemDirection: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemTextColor:
      return {
        ...state,
        legendItemTextColor: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemBackground:
      return {
        ...state,
        legendItemBackground: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendItemOpacity:
      return {
        ...state,
        legendItemOpacity: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendSymbolShape:
      return {
        ...state,
        legendSymbolShape: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendSymbolBorderColor:
      return {
        ...state,
        legendSymbolBorderColor: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendSymbolBorderWidth:
      return {
        ...state,
        legendSymbolBorderWidth: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendSymbolSpacing:
      return {
        ...state,
        legendSymbolSpacing: action.payload,
      };
    case responsiveRadialBarChartAction.setLegendSymbolSize:
      return {
        ...state,
        legendSymbolSize: action.payload,
      };

    // options
    case responsiveRadialBarChartAction.setChartTitle:
      return {
        ...state,
        chartTitle: action.payload,
      };
    case responsiveRadialBarChartAction.setChartTitleColor:
      return {
        ...state,
        chartTitleColor: action.payload,
      };
    case responsiveRadialBarChartAction.setChartTitlePosition:
      return {
        ...state,
        chartTitlePosition: action.payload,
      };
    case responsiveRadialBarChartAction.setChartTitleSize:
      return {
        ...state,
        chartTitleSize: action.payload,
      };
    case responsiveRadialBarChartAction.setIsChartTitleFocused:
      return {
        ...state,
        isChartTitleFocused: action.payload,
      };
    case responsiveRadialBarChartAction.setIsChartTitleValid:
      return {
        ...state,
        isChartTitleValid: action.payload,
      };

    // screenshot
    case responsiveRadialBarChartAction.setIsScreenshotFilenameFocused:
      return {
        ...state,
        isScreenshotFilenameFocused: action.payload,
      };
    case responsiveRadialBarChartAction.setIsScreenshotFilenameValid:
      return {
        ...state,
        isScreenshotFilenameValid: action.payload,
      };
    case responsiveRadialBarChartAction.setScreenshotFilename:
      return {
        ...state,
        screenshotFilename: action.payload,
      };
    case responsiveRadialBarChartAction.setScreenshotImageQuality:
      return {
        ...state,
        screenshotImageQuality: action.payload,
      };
    case responsiveRadialBarChartAction.setScreenshotImageType:
      return {
        ...state,
        screenshotImageType: action.payload,
      };

    // motion
    case responsiveRadialBarChartAction.setEnableAnimate:
      return {
        ...state,
        enableAnimate: action.payload,
      };
    case responsiveRadialBarChartAction.setMotionConfig:
      return {
        ...state,
        motionConfig: action.payload,
      };
    case responsiveRadialBarChartAction.setTransitionMode:
      return {
        ...state,
        transitionMode: action.payload,
      };

    // reset all
    case responsiveRadialBarChartAction.resetChartToDefault:
      return { ...action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveRadialBarChartState,
  responsiveRadialBarChartAction,
  responsiveRadialBarChartReducer,
};
