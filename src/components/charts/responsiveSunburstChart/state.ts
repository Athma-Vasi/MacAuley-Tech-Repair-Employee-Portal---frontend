import {
  ResponsiveSunburstChartAction,
  ResponsiveSunburstChartDispatch,
  ResponsiveSunburstChartState,
} from './types';

const initialResponsiveSunburstChartState: ResponsiveSunburstChartState = {
  // base
  cornerRadius: 0,

  // margin
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,

  // style
  chartColors: 'nivo',
  inheritColorFromParent: true,
  chartBorderWidth: 1,
  chartBorderColor: 'white',
  enableFillPatterns: false,
  fillPatterns: [],

  // arc labels
  enableArcLabels: false,
  arcLabel: 'formattedValue',
  arcLabelsRadiusOffset: 0.5,
  arcLabelsSkipAngle: 0,
  arcLabelsTextColor: 'gray',

  // motion
  enableAnimate: true,
  motionConfig: 'gentle',
  transitionMode: 'innerRadius',
};

const responsiveSunburstChartAction: ResponsiveSunburstChartAction = {
  // base
  setCornerRadius: 'setCornerRadius',

  // margin
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  // style
  setChartColors: 'setChartColors',
  setInheritColorFromParent: 'setInheritColorFromParent',
  setChartBorderWidth: 'setChartBorderWidth',
  setChartBorderColor: 'setChartBorderColor',
  setEnableFillPatterns: 'setEnableFillPatterns',
  setFillPatterns: 'setFillPatterns',

  // arc labels
  setEnableArcLabels: 'setEnableArcLabels',
  setArcLabel: 'setArcLabel',
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset',
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle',
  setArcLabelsTextColor: 'setArcLabelsTextColor',

  // motion
  setEnableAnimate: 'setEnableAnimate',
  setMotionConfig: 'setMotionConfig',
  setTransitionMode: 'setTransitionMode',

  // reset all
  resetChartToDefault: 'resetChartToDefault',
};

function responsiveSunburstChartReducer(
  state: ResponsiveSunburstChartState,
  action: ResponsiveSunburstChartDispatch
): ResponsiveSunburstChartState {
  switch (action.type) {
    // base
    case responsiveSunburstChartAction.setCornerRadius:
      return {
        ...state,
        cornerRadius: action.payload,
      };

    // margin
    case responsiveSunburstChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsiveSunburstChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsiveSunburstChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsiveSunburstChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };

    // style
    case responsiveSunburstChartAction.setChartColors:
      return {
        ...state,
        chartColors: action.payload,
      };
    case responsiveSunburstChartAction.setInheritColorFromParent:
      return {
        ...state,
        inheritColorFromParent: action.payload,
      };
    case responsiveSunburstChartAction.setChartBorderWidth:
      return {
        ...state,
        chartBorderWidth: action.payload,
      };
    case responsiveSunburstChartAction.setChartBorderColor:
      return {
        ...state,
        chartBorderColor: action.payload,
      };
    case responsiveSunburstChartAction.setEnableFillPatterns:
      return {
        ...state,
        enableFillPatterns: action.payload,
      };
    case responsiveSunburstChartAction.setFillPatterns:
      return {
        ...state,
        fillPatterns: action.payload,
      };

    // arc labels
    case responsiveSunburstChartAction.setEnableArcLabels:
      return {
        ...state,
        enableArcLabels: action.payload,
      };
    case responsiveSunburstChartAction.setArcLabel:
      return {
        ...state,
        arcLabel: action.payload,
      };
    case responsiveSunburstChartAction.setArcLabelsRadiusOffset:
      return {
        ...state,
        arcLabelsRadiusOffset: action.payload,
      };
    case responsiveSunburstChartAction.setArcLabelsSkipAngle:
      return {
        ...state,
        arcLabelsSkipAngle: action.payload,
      };
    case responsiveSunburstChartAction.setArcLabelsTextColor:
      return {
        ...state,
        arcLabelsTextColor: action.payload,
      };

    // motion
    case responsiveSunburstChartAction.setEnableAnimate:
      return {
        ...state,
        enableAnimate: action.payload,
      };
    case responsiveSunburstChartAction.setMotionConfig:
      return {
        ...state,
        motionConfig: action.payload,
      };
    case responsiveSunburstChartAction.setTransitionMode:
      return {
        ...state,
        transitionMode: action.payload,
      };

    // reset all
    case responsiveSunburstChartAction.resetChartToDefault:
      return { ...action.payload };

    default:
      return state;
  }
}

export {
  initialResponsiveSunburstChartState,
  responsiveSunburstChartAction,
  responsiveSunburstChartReducer,
};
