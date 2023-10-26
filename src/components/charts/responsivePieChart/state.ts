import {
  ResponsivePieChartAction,
  ResponsivePieChartDispatch,
  ResponsivePieChartState,
} from './types';

const initialResponsivePieChartState: ResponsivePieChartState = {
  /** base */
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0.5,
  padAngle: 4,
  cornerRadius: 4,
  sortByValue: false,

  /** style */
  chartColors: 'nivo',
  fillPatterns: [],
  enableFillPatterns: false,
  arcBorderColor: '#ffffff',
  arcBorderWidth: 0,

  /** arc labels */
  arcLabel: 'formattedValue',
  enableArcLabels: true,
  arcLabelsRadiusOffset: 0.5,
  arcLabelsSkipAngle: 0,
  arcLabelsTextColor: 'gray',

  /** arc link labels */
  enableArcLinkLabels: false,
  arcLinkLabelsSkipAngle: 0,
  arcLinkLabelsOffset: 0,
  arcLinkLabelsDiagonalLength: 16,
  arcLinkLabelsStraightLength: 24,
  arcLinkLabelsTextOffset: 6,
  arcLinkLabelsThickness: 1,
  arcLinkLabelsTextColor: 'gray',

  /** interactivity */
  activeInnerRadiusOffset: 6,
  activeOuterRadiusOffset: 6,

  /** motion */
  enableAnimate: true,
  motionConfig: 'gentle',
  transitionMode: 'innerRadius',

  /** margin */
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

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
  legendSymbolBorderColor: 'rgba(0, 0, 0, .5)',
  legendSymbolBorderWidth: 0,
  legendSymbolShape: 'circle',
  legendSymbolSize: 12,
  legendSymbolSpacing: 8,
  legendTranslateX: 0,
  legendTranslateY: 0,

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
  screenshotImageQuality: 1,
  screenshotImageType: 'image/png',
};

const responsivePieChartAction: ResponsivePieChartAction = {
  /** base */
  setStartAngle: 'setStartAngle',
  setEndAngle: 'setEndAngle',
  setInnerRadius: 'setInnerRadius',
  setPadAngle: 'setPadAngle',
  setCornerRadius: 'setCornerRadius',
  setSortByValue: 'setSortByValue',

  /** style */
  setColorScheme: 'setColorScheme',
  setFillPatterns: 'setFillPatterns',
  setEnableFillPatterns: 'setEnableFillPatterns',
  setArcBorderColor: 'setArcBorderColor',
  setArcBorderWidth: 'setArcBorderWidth',

  /** arc labels */
  setArcLabel: 'setArcLabel',
  setEnableArcLabels: 'setEnableArcLabels',
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset',
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle',
  setArcLabelsTextColor: 'setArcLabelsTextColor',

  /** arc link labels */
  setEnableArcLinkLabels: 'setEnableArcLinkLabels',
  setArcLinkLabelsSkipAngle: 'setArcLinkLabelsSkipAngle',
  setArcLinkLabelsOffset: 'setArcLinkLabelsOffset',
  setArcLinkLabelsDiagonalLength: 'setArcLinkLabelsDiagonalLength',
  setArcLinkLabelsStraightLength: 'setArcLinkLabelsStraightLength',
  setArcLinkLabelsTextOffset: 'setArcLinkLabelsTextOffset',
  setArcLinkLabelsThickness: 'setArcLinkLabelsThickness',
  setArcLinkLabelsTextColor: 'setArcLinkLabelsTextColor',

  /** interactivity */
  setActiveInnerRadiusOffset: 'setActiveInnerRadiusOffset',
  setActiveOuterRadiusOffset: 'setActiveOuterRadiusOffset',

  /** motion */
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',
  setTransitionMode: 'setTransitionMode',

  /** margin */
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

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

function responsivePieChartReducer(
  state: ResponsivePieChartState,
  action: ResponsivePieChartDispatch
): ResponsivePieChartState {
  switch (action.type) {
    /** base */
    case responsivePieChartAction.setStartAngle:
      return {
        ...state,
        startAngle: action.payload,
      };
    case responsivePieChartAction.setEndAngle:
      return {
        ...state,
        endAngle: action.payload,
      };
    case responsivePieChartAction.setInnerRadius:
      return {
        ...state,
        innerRadius: action.payload,
      };
    case responsivePieChartAction.setPadAngle:
      return {
        ...state,
        padAngle: action.payload,
      };
    case responsivePieChartAction.setCornerRadius:
      return {
        ...state,
        cornerRadius: action.payload,
      };
    case responsivePieChartAction.setSortByValue:
      return {
        ...state,
        sortByValue: action.payload,
      };

    /** style */
    case responsivePieChartAction.setColorScheme:
      return {
        ...state,
        chartColors: action.payload,
      };
    case responsivePieChartAction.setFillPatterns:
      return {
        ...state,
        fillPatterns: action.payload,
      };
    case responsivePieChartAction.setEnableFillPatterns:
      return {
        ...state,
        enableFillPatterns: action.payload,
      };
    case responsivePieChartAction.setArcBorderColor:
      return {
        ...state,
        arcBorderColor: action.payload,
      };
    case responsivePieChartAction.setArcBorderWidth:
      return {
        ...state,
        arcBorderWidth: action.payload,
      };

    /** arc labels */
    case responsivePieChartAction.setArcLabel:
      return {
        ...state,
        arcLabel: action.payload,
      };
    case responsivePieChartAction.setEnableArcLabels:
      return {
        ...state,
        enableArcLabels: action.payload,
      };
    case responsivePieChartAction.setArcLabelsRadiusOffset:
      return {
        ...state,
        arcLabelsRadiusOffset: action.payload,
      };
    case responsivePieChartAction.setArcLabelsSkipAngle:
      return {
        ...state,
        arcLabelsSkipAngle: action.payload,
      };
    case responsivePieChartAction.setArcLabelsTextColor:
      return {
        ...state,
        arcLabelsTextColor: action.payload,
      };

    /** arc link labels */
    case responsivePieChartAction.setEnableArcLinkLabels:
      return {
        ...state,
        enableArcLinkLabels: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsSkipAngle:
      return {
        ...state,
        arcLinkLabelsSkipAngle: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsOffset:
      return {
        ...state,
        arcLinkLabelsOffset: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsDiagonalLength:
      return {
        ...state,
        arcLinkLabelsDiagonalLength: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsStraightLength:
      return {
        ...state,
        arcLinkLabelsStraightLength: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsTextOffset:
      return {
        ...state,
        arcLinkLabelsTextOffset: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsThickness:
      return {
        ...state,
        arcLinkLabelsThickness: action.payload,
      };
    case responsivePieChartAction.setArcLinkLabelsTextColor:
      return {
        ...state,
        arcLinkLabelsTextColor: action.payload,
      };

    /** interactivity */
    case responsivePieChartAction.setActiveInnerRadiusOffset:
      return {
        ...state,
        activeInnerRadiusOffset: action.payload,
      };
    case responsivePieChartAction.setActiveOuterRadiusOffset:
      return {
        ...state,
        activeOuterRadiusOffset: action.payload,
      };

    /** motion */
    case responsivePieChartAction.setEnableAnimate:
      return {
        ...state,
        enableAnimate: action.payload,
      };
    case responsivePieChartAction.setMotionConfig:
      return {
        ...state,
        motionConfig: action.payload,
      };
    case responsivePieChartAction.setTransitionMode:
      return {
        ...state,
        transitionMode: action.payload,
      };

    /** margin */
    case responsivePieChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsivePieChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsivePieChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsivePieChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };

    /** legend */
    case responsivePieChartAction.setEnableLegend:
      return {
        ...state,
        enableLegend: action.payload,
      };
    case responsivePieChartAction.setLegendAnchor:
      return {
        ...state,
        legendAnchor: action.payload,
      };
    case responsivePieChartAction.setLegendDirection:
      return {
        ...state,
        legendDirection: action.payload,
      };
    case responsivePieChartAction.setEnableLegendJustify:
      return {
        ...state,
        enableLegendJustify: action.payload,
      };
    case responsivePieChartAction.setLegendTranslateX:
      return {
        ...state,
        legendTranslateX: action.payload,
      };
    case responsivePieChartAction.setLegendTranslateY:
      return {
        ...state,
        legendTranslateY: action.payload,
      };
    case responsivePieChartAction.setLegendItemsSpacing:
      return {
        ...state,
        legendItemsSpacing: action.payload,
      };
    case responsivePieChartAction.setLegendItemWidth:
      return {
        ...state,
        legendItemWidth: action.payload,
      };
    case responsivePieChartAction.setLegendItemHeight:
      return {
        ...state,
        legendItemHeight: action.payload,
      };
    case responsivePieChartAction.setLegendItemDirection:
      return {
        ...state,
        legendItemDirection: action.payload,
      };
    case responsivePieChartAction.setLegendItemTextColor:
      return {
        ...state,
        legendItemTextColor: action.payload,
      };
    case responsivePieChartAction.setLegendItemOpacity:
      return {
        ...state,
        legendItemOpacity: action.payload,
      };
    case responsivePieChartAction.setLegendSymbolSize:
      return {
        ...state,
        legendSymbolSize: action.payload,
      };
    case responsivePieChartAction.setLegendSymbolShape:
      return {
        ...state,
        legendSymbolShape: action.payload,
      };
    case responsivePieChartAction.setLegendSymbolBorderColor:
      return {
        ...state,
        legendSymbolBorderColor: action.payload,
      };
    case responsivePieChartAction.setLegendSymbolBorderWidth:
      return {
        ...state,
        legendSymbolBorderWidth: action.payload,
      };
    case responsivePieChartAction.setLegendSymbolSpacing:
      return {
        ...state,
        legendSymbolSpacing: action.payload,
      };
    case responsivePieChartAction.setLegendItemBackground:
      return {
        ...state,
        legendItemBackground: action.payload,
      };

    /** options */
    case responsivePieChartAction.setChartTitle:
      return {
        ...state,
        chartTitle: action.payload,
      };
    case responsivePieChartAction.setChartTitleColor:
      return {
        ...state,
        chartTitleColor: action.payload,
      };
    case responsivePieChartAction.setChartTitlePosition:
      return {
        ...state,
        chartTitlePosition: action.payload,
      };
    case responsivePieChartAction.setChartTitleSize:
      return {
        ...state,
        chartTitleSize: action.payload,
      };
    case responsivePieChartAction.setIsChartTitleFocused:
      return {
        ...state,
        isChartTitleFocused: action.payload,
      };
    case responsivePieChartAction.setIsChartTitleValid:
      return {
        ...state,
        isChartTitleValid: action.payload,
      };

    /** screenshot */
    case responsivePieChartAction.setIsScreenshotFilenameFocused:
      return {
        ...state,
        isScreenshotFilenameFocused: action.payload,
      };
    case responsivePieChartAction.setIsScreenshotFilenameValid:
      return {
        ...state,
        isScreenshotFilenameValid: action.payload,
      };
    case responsivePieChartAction.setScreenshotFilename:
      return {
        ...state,
        screenshotFilename: action.payload,
      };
    case responsivePieChartAction.setScreenshotImageQuality:
      return {
        ...state,
        screenshotImageQuality: action.payload,
      };
    case responsivePieChartAction.setScreenshotImageType:
      return {
        ...state,
        screenshotImageType: action.payload,
      };

    /** reset all */
    case responsivePieChartAction.resetChartToDefault:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}

export {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
};
