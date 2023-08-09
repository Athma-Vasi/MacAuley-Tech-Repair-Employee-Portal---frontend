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
  colorScheme: 'nivo',
  borderColor: '#e0e0e0',
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
  activeInnerRadiusOffset: 4,
  activeOuterRadiusOffset: 4,

  /** motion */
  animate: true,
  motionConfig: 'gentle',
  transitionMode: 'innerRadius',
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

    default:
      return state;
  }
}

export {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
};
