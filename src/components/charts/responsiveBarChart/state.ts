import {
  ResponsiveBarChartAction,
  ResponsiveBarChartDispatch,
  ResponsiveBarChartState,
} from './types';

const initialResponsiveBarChartState: ResponsiveBarChartState = {
  /** base */
  groupMode: 'stacked',
  layout: 'horizontal',
  valueScale: 'linear',
  reverse: false,
  enableMinValue: false,
  minValue: 0,
  enableMaxValue: false,
  maxValue: 0,
  paddingBar: 0.1,
  innerPaddingBar: 0,
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  /** style */
  chartColors: 'set2',
  chartBorderRadius: 0,
  chartBorderWidth: 0,
  chartBorderColor: '#ffffff',
  fillPatterns: [],
  enableFillPatterns: false,

  /** labels */
  enableLabels: true,
  labelSkipWidth: 0,
  labelSkipHeight: 0,
  labelTextColor: 'gray',

  /** grid and axes */
  enableGridX: false,
  enableGridY: true,
  // axis top
  enableAxisTop: false,
  axisTopTickSize: 5,
  axisTopTickPadding: 5,
  axisTopTickRotation: 0,
  axisTopLegend: '',
  isAxisTopLegendValid: false,
  isAxisTopLegendFocused: false,
  axisTopLegendOffset: 0,
  axisTopLegendPosition: 'middle',
  // axis right
  enableAxisRight: false,
  axisRightTickSize: 5,
  axisRightTickPadding: 5,
  axisRightTickRotation: 0,
  axisRightLegend: '',
  isAxisRightLegendValid: false,
  isAxisRightLegendFocused: false,
  axisRightLegendOffset: 0,
  axisRightLegendPosition: 'middle',
  // axis bottom
  enableAxisBottom: true,
  axisBottomTickSize: 5,
  axisBottomTickPadding: 5,
  axisBottomTickRotation: 0,
  axisBottomLegend: '',
  isAxisBottomLegendValid: false,
  isAxisBottomLegendFocused: false,
  axisBottomLegendOffset: 0,
  axisBottomLegendPosition: 'middle',
  // axis left
  enableAxisLeft: false,
  axisLeftTickSize: 5,
  axisLeftTickPadding: 5,
  axisLeftTickRotation: 0,
  axisLeftLegend: '',
  isAxisLeftLegendValid: false,
  isAxisLeftLegendFocused: false,
  axisLeftLegendOffset: 0,
  axisLeftLegendPosition: 'middle',

  /** legend */
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

  /** motion */
  enableAnimate: true,
  motionConfig: 'default',

  /** options */
  chartTitle: '',
  isChartTitleValid: false,
  isChartTitleFocused: false,
  chartTitleColor: 'dark',
  chartTitleSize: 3,
  chartTitlePosition: 'center',

  /** screenshot */
  screenshotFilename: '',
  isScreenshotFilenameValid: false,
  isScreenshotFilenameFocused: false,
  screenshotImageType: 'image/png',
  screenshotImageQuality: 1.0,
};

const responsiveBarChartAction: ResponsiveBarChartAction = {
  /** base */
  setGroupMode: 'setGroupMode',
  setLayout: 'setLayout',
  setValueScale: 'setValueScale',
  setReverse: 'setReverse',
  setEnableMinValue: 'setEnableMinValue',
  setMinValue: 'setMinValue',
  setEnableMaxValue: 'setEnableMaxValue',
  setMaxValue: 'setMaxValue',
  setPaddingBar: 'setPaddingBar',
  setInnerPaddingBar: 'setInnerPaddingBar',

  /** margin */
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  /** style */
  setChartColors: 'setChartColors',
  setChartBorderRadius: 'setChartBorderRadius',
  setChartBorderWidth: 'setChartBorderWidth',
  setChartBorderColor: 'setChartBorderColor',
  setFillPatterns: 'setFillPatterns',
  setEnableFillPatterns: 'setEnableFillPatterns',

  /** labels */
  setEnableLabels: 'setEnableLabels',
  setLabelSkipWidth: 'setLabelSkipWidth',
  setLabelSkipHeight: 'setLabelSkipHeight',
  setLabelTextColor: 'setLabelTextColor',

  /** grid and axes */
  setEnableGridX: 'setEnableGridX',
  setEnableGridY: 'setEnableGridY',
  // axis top
  setEnableAxisTop: 'setEnableAxisTop',
  setAxisTopTickSize: 'setAxisTopTickSize',
  setAxisTopTickPadding: 'setAxisTopTickPadding',
  setAxisTopTickRotation: 'setAxisTopTickRotation',
  setAxisTopLegend: 'setAxisTopLegend',
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid',
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused',
  setAxisTopLegendOffset: 'setAxisTopLegendOffset',
  setAxisTopLegendPosition: 'setAxisTopLegendPosition',
  // axis right
  setEnableAxisRight: 'setEnableAxisRight',
  setAxisRightTickSize: 'setAxisRightTickSize',
  setAxisRightTickPadding: 'setAxisRightTickPadding',
  setAxisRightTickRotation: 'setAxisRightTickRotation',
  setAxisRightLegend: 'setAxisRightLegend',
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid',
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused',
  setAxisRightLegendOffset: 'setAxisRightLegendOffset',
  setAxisRightLegendPosition: 'setAxisRightLegendPosition',
  // axis bottom
  setEnableAxisBottom: 'setEnableAxisBottom',
  setAxisBottomTickSize: 'setAxisBottomTickSize',
  setAxisBottomTickPadding: 'setAxisBottomTickPadding',
  setAxisBottomTickRotation: 'setAxisBottomTickRotation',
  setAxisBottomLegend: 'setAxisBottomLegend',
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid',
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused',
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset',
  setAxisBottomLegendPosition: 'setAxisBottomLegendPosition',
  // axis left
  setEnableAxisLeft: 'setEnableAxisLeft',
  setAxisLeftTickSize: 'setAxisLeftTickSize',
  setAxisLeftTickPadding: 'setAxisLeftTickPadding',
  setAxisLeftTickRotation: 'setAxisLeftTickRotation',
  setAxisLeftLegend: 'setAxisLeftLegend',
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid',
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused',
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset',
  setAxisLeftLegendPosition: 'setAxisLeftLegendPosition',

  /** legend */
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

  /** motion */
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',

  /** options */
  setChartTitle: 'setChartTitle',
  setIsChartTitleValid: 'setIsChartTitleValid',
  setIsChartTitleFocused: 'setIsChartTitleFocused',
  setChartTitleColor: 'setChartTitleColor',
  setChartTitleSize: 'setChartTitleSize',
  setChartTitlePosition: 'setChartTitlePosition',

  /** screenshot */
  setScreenshotFilename: 'setScreenshotFilename',
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid',
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused',
  setScreenshotImageType: 'setScreenshotImageType',
  setScreenshotImageQuality: 'setScreenshotImageQuality',

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
    case responsiveBarChartAction.setEnableMinValue:
      return {
        ...state,
        enableMinValue: action.payload,
      };
    case responsiveBarChartAction.setMinValue:
      return {
        ...state,
        minValue: action.payload,
      };
    case responsiveBarChartAction.setEnableMaxValue:
      return {
        ...state,
        enableMaxValue: action.payload,
      };
    case responsiveBarChartAction.setMaxValue:
      return {
        ...state,
        maxValue: action.payload,
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
    case responsiveBarChartAction.setLegendItemOpacity:
      return {
        ...state,
        legendItemOpacity: action.payload,
      };
    case responsiveBarChartAction.setLegendSymbolSize:
      return {
        ...state,
        legendSymbolSize: action.payload,
      };
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
