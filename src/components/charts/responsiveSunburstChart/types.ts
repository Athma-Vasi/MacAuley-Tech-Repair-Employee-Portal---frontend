import {
  NivoColorScheme,
  NivoFillPatternObject,
  NivoMotionConfig,
  NivoSunburstArcLabel,
  NivoTransitionMode,
} from '../types';

type ResponsiveSunburstChartState = {
  // base
  cornerRadius: number; // 0px - 45px default: 0 step: 1

  // margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  // style
  chartColors: NivoColorScheme; // default: 'nivo'
  inheritColorFromParent: boolean; // default: true
  chartBorderWidth: number; // 0px - 20px default: 1 step: 1
  chartBorderColor: string; // default: 'white'
  enableFillPatterns: boolean; // default: false
  fillPatterns: NivoFillPatternObject[]; // default: []

  // arc labels
  enableArcLabels: boolean; // default: false
  arcLabel: NivoSunburstArcLabel; // default: 'formattedValue'
  arcLabelsRadiusOffset: number; // 0 - 2px default: 0.5 step: 0.05
  arcLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLabelsTextColor: string; // default: 'gray'

  // motion
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: 'gentle'
  transitionMode: NivoTransitionMode; // default: 'innerRadius'

  // reset all
  resetChartToDefault: boolean;
};

type ResponsiveSunburstChartAction = {
  // base
  setCornerRadius: 'setCornerRadius';

  // margin
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  // style
  setChartColors: 'setChartColors';
  setInheritColorFromParent: 'setInheritColorFromParent';
  setChartBorderWidth: 'setChartBorderWidth';
  setChartBorderColor: 'setChartBorderColor';
  setEnableFillPatterns: 'setEnableFillPatterns';
  setFillPatterns: 'setFillPatterns';

  // arc labels
  setEnableArcLabels: 'setEnableArcLabels';
  setArcLabel: 'setArcLabel';
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset';
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle';
  setArcLabelsTextColor: 'setArcLabelsTextColor';

  // motion
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';
  setTransitionMode: 'setTransitionMode';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsiveSunburstChartDispatch =
  | {
      type:
        | ResponsiveSunburstChartAction['setCornerRadius']
        | ResponsiveSunburstChartAction['setMarginTop']
        | ResponsiveSunburstChartAction['setMarginRight']
        | ResponsiveSunburstChartAction['setMarginBottom']
        | ResponsiveSunburstChartAction['setMarginLeft']
        | ResponsiveSunburstChartAction['setChartBorderWidth']
        | ResponsiveSunburstChartAction['setArcLabelsRadiusOffset']
        | ResponsiveSunburstChartAction['setArcLabelsSkipAngle'];

      payload: number;
    }
  | {
      type:
        | ResponsiveSunburstChartAction['setChartColors']
        | ResponsiveSunburstChartAction['setChartBorderColor']
        | ResponsiveSunburstChartAction['setArcLabelsTextColor'];

      payload: string;
    }
  | {
      type:
        | ResponsiveSunburstChartAction['setInheritColorFromParent']
        | ResponsiveSunburstChartAction['setEnableFillPatterns']
        | ResponsiveSunburstChartAction['setEnableArcLabels']
        | ResponsiveSunburstChartAction['setEnableAnimate'];

      payload: boolean;
    }
  | {
      type: ResponsiveSunburstChartAction['setArcLabel'];
      payload: NivoSunburstArcLabel;
    }
  | {
      type: ResponsiveSunburstChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsiveSunburstChartAction['setTransitionMode'];
      payload: NivoTransitionMode;
    }
  | {
      type: ResponsiveSunburstChartAction['setFillPatterns'];
      payload: NivoFillPatternObject[];
    }
  | {
      type: ResponsiveSunburstChartAction['resetChartToDefault'];
      payload: ResponsiveSunburstChartState;
    };

export type {
  ResponsiveSunburstChartAction,
  ResponsiveSunburstChartDispatch,
  ResponsiveSunburstChartState,
};
