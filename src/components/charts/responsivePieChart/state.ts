import {
  ResponsivePieChartAction,
  ResponsivePieChartDispatch,
  ResponsivePieChartState,
} from './types';

const initialResponsivePieChartState: ResponsivePieChartState = {
  /** base */
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0.25,
  padAngle: 4,
  cornerRadius: 4,
  sortByValue: false,

  /** style */
  chartColors: 'set2',
  fillPatterns: [],
  enableFillPatterns: false,
  chartBorderColor: '#ffffff',
  chartBorderWidth: 0,

  /** arc labels */
  enableArcLabels: true,
  arcLabelsRadiusOffset: 0.5,
  arcLabelsSkipAngle: 0,
  arcLabelsTextColor: 'gray',

  /** arc link labels */
  enableArcLinkLabels: true,
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
  marginTop: 80,
  marginRight: 150,
  marginBottom: 80,
  marginLeft: 150,

  /** legend */
  enableLegend: false,
  legendAnchor: 'top-left',
  legendDirection: 'column',
  legendJustify: false,
  legendTranslateX: 0,
  legendTranslateY: 0,
  legendItemsSpacing: 10,
  legendItemWidth: 60,
  legendItemHeight: 20,
  legendItemDirection: 'left-to-right',
  legendItemTextColor: '#999',
  legendItemOpacity: 1,
  legendSymbolSize: 20,
  legendSymbolShape: 'circle',
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
  setChartBorderColor: 'setChartBorderColor',
  setChartBorderWidth: 'setChartBorderWidth',

  /** arc labels */
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
  setNivoLegendAnchor: 'setNivoLegendAnchor',
  setLegendDirection: 'setLegendDirection',
  setLegendJustify: 'setLegendJustify',
  setLegendTranslateX: 'setLegendTranslateX',
  setLegendTranslateY: 'setLegendTranslateY',
  setLegendItemsSpacing: 'setLegendItemsSpacing',
  setLegendItemWidth: 'setLegendItemWidth',
  setLegendItemHeight: 'setLegendItemHeight',
  setLegendItemDirection: 'setLegendItemDirection',
  setLegendItemTextColor: 'setLegendItemTextColor',
  setLegendItemOpacity: 'setLegendItemOpacity',
  setLegendSymbolSize: 'setLegendSymbolSize',
  setLegendSymbolShape: 'setLegendSymbolShape',
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
    case responsivePieChartAction.setChartBorderColor:
      return {
        ...state,
        chartBorderColor: action.payload,
      };
    case responsivePieChartAction.setChartBorderWidth:
      return {
        ...state,
        chartBorderWidth: action.payload,
      };

    /** arc labels */
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
    case responsivePieChartAction.setNivoLegendAnchor:
      return {
        ...state,
        legendAnchor: action.payload,
      };
    case responsivePieChartAction.setLegendDirection:
      return {
        ...state,
        legendDirection: action.payload,
      };
    case responsivePieChartAction.setLegendJustify:
      return {
        ...state,
        legendJustify: action.payload,
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

    default:
      return state;
  }
}

export {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
};
