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
  colorScheme: 'accent',
  fillPatterns: [],
  enableFillPatterns: false,
  borderColor: '#ffffff',
  borderWidth: 0,

  /** arc labels */
  enableArcLabels: true,
  arcLabelsRadiusOffset: 0.5,
  arcLabelsSkipAngle: 0,
  arcLabelsTextColor: '#333333',

  /** arc link labels */
  enableArcLinkLabels: true,
  arcLinkLabelsSkipAngle: 0,
  arcLinkLabelsOffset: 0,
  arcLinkLabelsDiagonalLength: 16,
  arcLinkLabelsStraightLength: 24,
  arcLinkLabelsTextOffset: 6,
  arcLinkLabelsThickness: 1,
  arcLinkLabelsTextColor: '#333333',

  /** interactivity */
  activeInnerRadiusOffset: 8,
  activeOuterRadiusOffset: 8,

  /** motion */
  animate: true,
  motionConfig: 'gentle',
  transitionMode: 'innerRadius',

  /** margin */
  marginTop: 80,
  marginRight: 150,
  marginBottom: 80,
  marginLeft: 150,

  /** legend */
  enableLegend: false,
  anchor: 'top-left',
  direction: 'column',
  justify: false,
  translateX: 0,
  translateY: 0,
  itemsSpacing: 10,
  itemWidth: 60,
  itemHeight: 20,
  itemDirection: 'left-to-right',
  itemTextColor: '#999',
  itemOpacity: 1,
  symbolSize: 20,
  symbolShape: 'circle',
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
  setBorderColor: 'setBorderColor',
  setBorderWidth: 'setBorderWidth',

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
  setAnimate: 'setAnimate',
  setMotionConfig: 'setMotionConfig',
  setTransitionMode: 'setTransitionMode',

  /** margin */
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  /** legend */
  setEnableLegend: 'setEnableLegend',
  setAnchor: 'setAnchor',
  setDirection: 'setDirection',
  setJustify: 'setJustify',
  setTranslateX: 'setTranslateX',
  setTranslateY: 'setTranslateY',
  setItemsSpacing: 'setItemsSpacing',
  setItemWidth: 'setItemWidth',
  setItemHeight: 'setItemHeight',
  setItemDirection: 'setItemDirection',
  setItemTextColor: 'setItemTextColor',
  setItemOpacity: 'setItemOpacity',
  setSymbolSize: 'setSymbolSize',
  setSymbolShape: 'setSymbolShape',
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
        colorScheme: action.payload,
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
    case responsivePieChartAction.setBorderColor:
      return {
        ...state,
        borderColor: action.payload,
      };
    case responsivePieChartAction.setBorderWidth:
      return {
        ...state,
        borderWidth: action.payload,
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
    case responsivePieChartAction.setAnimate:
      return {
        ...state,
        animate: action.payload,
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
    case responsivePieChartAction.setAnchor:
      return {
        ...state,
        anchor: action.payload,
      };
    case responsivePieChartAction.setDirection:
      return {
        ...state,
        direction: action.payload,
      };
    case responsivePieChartAction.setJustify:
      return {
        ...state,
        justify: action.payload,
      };
    case responsivePieChartAction.setTranslateX:
      return {
        ...state,
        translateX: action.payload,
      };
    case responsivePieChartAction.setTranslateY:
      return {
        ...state,
        translateY: action.payload,
      };
    case responsivePieChartAction.setItemsSpacing:
      return {
        ...state,
        itemsSpacing: action.payload,
      };
    case responsivePieChartAction.setItemWidth:
      return {
        ...state,
        itemWidth: action.payload,
      };
    case responsivePieChartAction.setItemHeight:
      return {
        ...state,
        itemHeight: action.payload,
      };
    case responsivePieChartAction.setItemDirection:
      return {
        ...state,
        itemDirection: action.payload,
      };
    case responsivePieChartAction.setItemTextColor:
      return {
        ...state,
        itemTextColor: action.payload,
      };
    case responsivePieChartAction.setItemOpacity:
      return {
        ...state,
        itemOpacity: action.payload,
      };
    case responsivePieChartAction.setSymbolSize:
      return {
        ...state,
        symbolSize: action.payload,
      };
    case responsivePieChartAction.setSymbolShape:
      return {
        ...state,
        symbolShape: action.payload,
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
