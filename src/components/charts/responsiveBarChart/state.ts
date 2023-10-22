import {
  ResponsiveBarChartAction,
  ResponsiveBarChartDispatch,
  ResponsiveBarChartState,
} from './types';

const initialResponsiveBarChartState: ResponsiveBarChartState = {
  /** base */
  groupMode: 'stacked',
  innerPaddingBar: 0,
  layout: 'horizontal',
  paddingBar: 0.1,
  reverse: false,
  valueScale: 'linear',

  /** margin */
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  /** style */
  chartBorderColor: '#ffffff',
  chartBorderRadius: 0,
  chartBorderWidth: 0,
  chartColors: 'set2',
  enableFillPatterns: false,
  fillPatterns: [],

  /** labels */
  enableLabels: true,
  labelSkipWidth: 0,
  labelSkipHeight: 0,
  labelTextColor: 'gray',

  /** grid and axes */
  enableGridX: false,
  enableGridY: true,
  // axis top
  axisTopLegend: '',
  axisTopLegendOffset: 0,
  axisTopLegendPosition: 'middle',
  axisTopTickPadding: 5,
  axisTopTickRotation: 0,
  axisTopTickSize: 5,
  enableAxisTop: false,
  isAxisTopLegendFocused: false,
  isAxisTopLegendValid: false,
  // axis right
  axisRightLegend: '',
  axisRightLegendOffset: 0,
  axisRightLegendPosition: 'middle',
  axisRightTickPadding: 5,
  axisRightTickRotation: 0,
  axisRightTickSize: 5,
  enableAxisRight: false,
  isAxisRightLegendFocused: false,
  isAxisRightLegendValid: false,
  // axis bottom
  axisBottomLegend: '',
  axisBottomLegendOffset: 0,
  axisBottomLegendPosition: 'middle',
  axisBottomTickPadding: 5,
  axisBottomTickRotation: 0,
  axisBottomTickSize: 5,
  enableAxisBottom: true,
  isAxisBottomLegendFocused: false,
  isAxisBottomLegendValid: false,
  // axis left
  axisLeftLegend: '',
  axisLeftLegendOffset: 0,
  axisLeftLegendPosition: 'middle',
  axisLeftTickPadding: 5,
  axisLeftTickRotation: 0,
  axisLeftTickSize: 5,
  enableAxisLeft: false,
  isAxisLeftLegendFocused: false,
  isAxisLeftLegendValid: false,

  /** legend */
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

  /** motion */
  enableAnimate: true,
  motionConfig: 'default',

  /** options */
  chartTitle: '',
  chartTitleColor: 'dark',
  chartTitlePosition: 'center',
  chartTitleSize: 3,
  isChartTitleFocused: false,
  isChartTitleValid: false,

  /** screenshot */
  isScreenshotFilenameFocused: false,
  isScreenshotFilenameValid: false,
  screenshotFilename: '',
  screenshotImageQuality: 1.0,
  screenshotImageType: 'image/png',
};

const responsiveBarChartAction: ResponsiveBarChartAction = {
  /** base */
  setGroupMode: 'setGroupMode',
  setInnerPaddingBar: 'setInnerPaddingBar',
  setLayout: 'setLayout',
  setPaddingBar: 'setPaddingBar',
  setReverse: 'setReverse',
  setValueScale: 'setValueScale',

  /** margin */
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  /** style */
  setChartBorderColor: 'setChartBorderColor',
  setChartBorderRadius: 'setChartBorderRadius',
  setChartBorderWidth: 'setChartBorderWidth',
  setChartColors: 'setChartColors',
  setEnableFillPatterns: 'setEnableFillPatterns',
  setFillPatterns: 'setFillPatterns',

  /** labels */
  setEnableLabels: 'setEnableLabels',
  setLabelSkipHeight: 'setLabelSkipHeight',
  setLabelSkipWidth: 'setLabelSkipWidth',
  setLabelTextColor: 'setLabelTextColor',

  /** grid and axes */
  setEnableGridX: 'setEnableGridX',
  setEnableGridY: 'setEnableGridY',
  // axis top
  setAxisTopLegend: 'setAxisTopLegend',
  setAxisTopLegendOffset: 'setAxisTopLegendOffset',
  setAxisTopLegendPosition: 'setAxisTopLegendPosition',
  setAxisTopTickPadding: 'setAxisTopTickPadding',
  setAxisTopTickRotation: 'setAxisTopTickRotation',
  setAxisTopTickSize: 'setAxisTopTickSize',
  setEnableAxisTop: 'setEnableAxisTop',
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused',
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid',
  // axis right
  setAxisRightLegend: 'setAxisRightLegend',
  setAxisRightLegendOffset: 'setAxisRightLegendOffset',
  setAxisRightLegendPosition: 'setAxisRightLegendPosition',
  setAxisRightTickPadding: 'setAxisRightTickPadding',
  setAxisRightTickRotation: 'setAxisRightTickRotation',
  setAxisRightTickSize: 'setAxisRightTickSize',
  setEnableAxisRight: 'setEnableAxisRight',
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused',
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid',
  // axis bottom
  setAxisBottomLegend: 'setAxisBottomLegend',
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset',
  setAxisBottomLegendPosition: 'setAxisBottomLegendPosition',
  setAxisBottomTickPadding: 'setAxisBottomTickPadding',
  setAxisBottomTickRotation: 'setAxisBottomTickRotation',
  setAxisBottomTickSize: 'setAxisBottomTickSize',
  setEnableAxisBottom: 'setEnableAxisBottom',
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused',
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid',
  // axis left
  setAxisLeftLegend: 'setAxisLeftLegend',
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset',
  setAxisLeftLegendPosition: 'setAxisLeftLegendPosition',
  setAxisLeftTickPadding: 'setAxisLeftTickPadding',
  setAxisLeftTickRotation: 'setAxisLeftTickRotation',
  setAxisLeftTickSize: 'setAxisLeftTickSize',
  setEnableAxisLeft: 'setEnableAxisLeft',
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused',
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid',

  /** legend */
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

  /** motion */
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',

  /** options */
  setChartTitle: 'setChartTitle',
  setChartTitleColor: 'setChartTitleColor',
  setChartTitlePosition: 'setChartTitlePosition',
  setChartTitleSize: 'setChartTitleSize',
  setIsChartTitleFocused: 'setIsChartTitleFocused',
  setIsChartTitleValid: 'setIsChartTitleValid',

  /** screenshot */
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused',
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid',
  setScreenshotFilename: 'setScreenshotFilename',
  setScreenshotImageQuality: 'setScreenshotImageQuality',
  setScreenshotImageType: 'setScreenshotImageType',

  /** reset all */
  resetChartToDefault: 'resetChartToDefault',
};

function responsiveBarChartReducer(
  state: ResponsiveBarChartState,
  action: ResponsiveBarChartDispatch
): ResponsiveBarChartState {
  switch (action.type) {
    case responsiveBarChartAction.setGroupMode:
      return {
        ...state,
        groupMode: action.payload,
      };
    case responsiveBarChartAction.setLayout:
      return {
        ...state,
        layout: action.payload,
      };
    case responsiveBarChartAction.setValueScale:
      return {
        ...state,
        valueScale: action.payload,
      };
    case responsiveBarChartAction.setReverse:
      return {
        ...state,
        reverse: action.payload,
      };
    case responsiveBarChartAction.setPaddingBar:
      return {
        ...state,
        paddingBar: action.payload,
      };
    case responsiveBarChartAction.setInnerPaddingBar:
      return {
        ...state,
        innerPaddingBar: action.payload,
      };
    case responsiveBarChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsiveBarChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsiveBarChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsiveBarChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };
    case responsiveBarChartAction.setChartColors:
      return {
        ...state,
        chartColors: action.payload,
      };
    case responsiveBarChartAction.setChartBorderRadius:
      return {
        ...state,
        chartBorderRadius: action.payload,
      };
    case responsiveBarChartAction.setChartBorderWidth:
      return {
        ...state,
        chartBorderWidth: action.payload,
      };
    case responsiveBarChartAction.setChartBorderColor:
      return {
        ...state,
        chartBorderColor: action.payload,
      };
    case responsiveBarChartAction.setFillPatterns:
      return {
        ...state,
      };
    case responsiveBarChartAction.setEnableFillPatterns:
      return {
        ...state,
        enableFillPatterns: action.payload,
      };
    case responsiveBarChartAction.setEnableLabels:
      return {
        ...state,
        enableLabels: action.payload,
      };
    case responsiveBarChartAction.setLabelSkipWidth:
      return {
        ...state,
        labelSkipWidth: action.payload,
      };
    case responsiveBarChartAction.setLabelSkipHeight:
      return {
        ...state,
        labelSkipHeight: action.payload,
      };
    case responsiveBarChartAction.setLabelTextColor:
      return {
        ...state,
        labelTextColor: action.payload,
      };
    case responsiveBarChartAction.setEnableGridX:
      return {
        ...state,
        enableGridX: action.payload,
      };
    case responsiveBarChartAction.setEnableGridY:
      return {
        ...state,
        enableGridY: action.payload,
      };

    // axis top
    case responsiveBarChartAction.setEnableAxisTop:
      return {
        ...state,
        enableAxisTop: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickSize:
      return {
        ...state,
        axisTopTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickPadding:
      return {
        ...state,
        axisTopTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickRotation:
      return {
        ...state,
        axisTopTickRotation: action.payload,
      };
    case responsiveBarChartAction.setAxisTopLegend:
      return {
        ...state,
        axisTopLegend: action.payload,
      };
    case responsiveBarChartAction.setIsAxisTopLegendValid:
      return {
        ...state,
        isAxisTopLegendValid: action.payload,
      };
    case responsiveBarChartAction.setIsAxisTopLegendFocused:
      return {
        ...state,
        isAxisTopLegendFocused: action.payload,
      };
    case responsiveBarChartAction.setAxisTopLegendOffset:
      return {
        ...state,
        axisTopLegendOffset: action.payload,
      };
    case responsiveBarChartAction.setAxisTopLegendPosition:
      return {
        ...state,
        axisTopLegendPosition: action.payload,
      };

    // axis right
    case responsiveBarChartAction.setEnableAxisRight:
      return {
        ...state,
        enableAxisRight: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickSize:
      return {
        ...state,
        axisRightTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickPadding:
      return {
        ...state,
        axisRightTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickRotation:
      return {
        ...state,
        axisRightTickRotation: action.payload,
      };
    case responsiveBarChartAction.setAxisRightLegend:
      return {
        ...state,
        axisRightLegend: action.payload,
      };
    case responsiveBarChartAction.setIsAxisRightLegendValid:
      return {
        ...state,
        isAxisRightLegendValid: action.payload,
      };
    case responsiveBarChartAction.setIsAxisRightLegendFocused:
      return {
        ...state,
        isAxisRightLegendFocused: action.payload,
      };
    case responsiveBarChartAction.setAxisRightLegendOffset:
      return {
        ...state,
        axisRightLegendOffset: action.payload,
      };
    case responsiveBarChartAction.setAxisRightLegendPosition:
      return {
        ...state,
        axisRightLegendPosition: action.payload,
      };

    // axis bottom
    case responsiveBarChartAction.setEnableAxisBottom:
      return {
        ...state,
        enableAxisBottom: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickSize:
      return {
        ...state,
        axisBottomTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickPadding:
      return {
        ...state,
        axisBottomTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickRotation:
      return {
        ...state,
        axisBottomTickRotation: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomLegend:
      return {
        ...state,
        axisBottomLegend: action.payload,
      };
    case responsiveBarChartAction.setIsAxisBottomLegendValid:
      return {
        ...state,
        isAxisBottomLegendValid: action.payload,
      };
    case responsiveBarChartAction.setIsAxisBottomLegendFocused:
      return {
        ...state,
        isAxisBottomLegendFocused: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomLegendOffset:
      return {
        ...state,
        axisBottomLegendOffset: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomLegendPosition:
      return {
        ...state,
        axisBottomLegendPosition: action.payload,
      };

    // axis left
    case responsiveBarChartAction.setEnableAxisLeft:
      return {
        ...state,
        enableAxisLeft: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickSize:
      return {
        ...state,
        axisLeftTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickPadding:
      return {
        ...state,
        axisLeftTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickRotation:
      return {
        ...state,
        axisLeftTickRotation: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftLegend:
      return {
        ...state,
        axisLeftLegend: action.payload,
      };
    case responsiveBarChartAction.setIsAxisLeftLegendValid:
      return {
        ...state,
        isAxisLeftLegendValid: action.payload,
      };
    case responsiveBarChartAction.setIsAxisLeftLegendFocused:
      return {
        ...state,
        isAxisLeftLegendFocused: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftLegendOffset:
      return {
        ...state,
        axisLeftLegendOffset: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftLegendPosition:
      return {
        ...state,
        axisLeftLegendPosition: action.payload,
      };

    // legend
    case responsiveBarChartAction.setEnableLegend:
      return {
        ...state,
        enableLegend: action.payload,
      };
    case responsiveBarChartAction.setLegendAnchor:
      return {
        ...state,
        legendAnchor: action.payload,
      };
    case responsiveBarChartAction.setLegendDirection:
      return {
        ...state,
        legendDirection: action.payload,
      };
    case responsiveBarChartAction.setEnableLegendJustify:
      return {
        ...state,
        enableLegendJustify: action.payload,
      };
    case responsiveBarChartAction.setLegendTranslateX:
      return {
        ...state,
        legendTranslateX: action.payload,
      };
    case responsiveBarChartAction.setLegendTranslateY:
      return {
        ...state,
        legendTranslateY: action.payload,
      };
    case responsiveBarChartAction.setLegendItemWidth:
      return {
        ...state,
        legendItemWidth: action.payload,
      };
    case responsiveBarChartAction.setLegendItemHeight:
      return {
        ...state,
        legendItemHeight: action.payload,
      };
    case responsiveBarChartAction.setLegendItemsSpacing:
      return {
        ...state,
        legendItemsSpacing: action.payload,
      };
    case responsiveBarChartAction.setLegendItemDirection:
      return {
        ...state,
        legendItemDirection: action.payload,
      };
    case responsiveBarChartAction.setLegendItemTextColor:
      return {
        ...state,
        legendItemTextColor: action.payload,
      };
    case responsiveBarChartAction.setLegendItemBackground:
      return {
        ...state,
        legendItemBackground: action.payload,
      };
    case responsiveBarChartAction.setLegendItemOpacity:
      return {
        ...state,
        legendItemOpacity: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolShape:
      return {
        ...state,
        legendSymbolShape: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolBorderColor:
      return {
        ...state,
        legendSymbolBorderColor: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolBorderWidth:
      return {
        ...state,
        legendSymbolBorderWidth: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolSpacing:
      return {
        ...state,
        legendSymbolSpacing: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolSize:
      return {
        ...state,
        legendSymbolSize: action.payload,
      };

    // motion
    case responsiveBarChartAction.setEnableAnimate:
      return {
        ...state,
        enableAnimate: action.payload,
      };
    case responsiveBarChartAction.setMotionConfig:
      return {
        ...state,
        motionConfig: action.payload,
      };

    // options
    case responsiveBarChartAction.setChartTitle:
      return {
        ...state,
        chartTitle: action.payload,
      };
    case responsiveBarChartAction.setIsChartTitleValid:
      return {
        ...state,
        isChartTitleValid: action.payload,
      };
    case responsiveBarChartAction.setIsChartTitleFocused:
      return {
        ...state,
        isChartTitleFocused: action.payload,
      };
    case responsiveBarChartAction.setChartTitleColor:
      return {
        ...state,
        chartTitleColor: action.payload,
      };
    case responsiveBarChartAction.setChartTitleSize:
      return {
        ...state,
        chartTitleSize: action.payload,
      };
    case responsiveBarChartAction.setChartTitlePosition:
      return {
        ...state,
        chartTitlePosition: action.payload,
      };

    // screenshot
    case responsiveBarChartAction.setScreenshotFilename:
      return {
        ...state,
        screenshotFilename: action.payload,
      };
    case responsiveBarChartAction.setIsScreenshotFilenameValid:
      return {
        ...state,
        isScreenshotFilenameValid: action.payload,
      };
    case responsiveBarChartAction.setIsScreenshotFilenameFocused:
      return {
        ...state,
        isScreenshotFilenameFocused: action.payload,
      };
    case responsiveBarChartAction.setScreenshotImageType:
      return {
        ...state,
        screenshotImageType: action.payload,
      };
    case responsiveBarChartAction.setScreenshotImageQuality:
      return {
        ...state,
        screenshotImageQuality: action.payload,
      };

    // reset all
    case responsiveBarChartAction.resetChartToDefault:
      return { ...action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
};
