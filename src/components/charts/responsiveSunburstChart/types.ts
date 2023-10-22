import { TitleOrder } from '@mantine/core';

import { ScreenshotImageType } from '../../../types';
import {
  NivoArcLabel,
  NivoChartTitlePosition,
  NivoColorScheme,
  NivoFillPatternObject,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';

type SunburstChartData = {
  name: string;
  children?: SunburstChartData[];
};

type ResponsiveSunburstChartProps = {
  chartHeight?: number;
  chartWidth?: number;
  hideControls?: boolean;
  sunburstChartData: SunburstChartData;
};

type ResponsiveSunburstChartState = {
  // base
  cornerRadius: number; // 0px - 45px default: 0 step: 1

  // margin
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  // style
  chartBorderColor: string; // default: 'white'
  chartBorderWidth: number; // 0px - 20px default: 1 step: 1
  chartColors: NivoColorScheme; // default: 'nivo'
  enableFillPatterns: boolean; // default: false
  fillPatterns: NivoFillPatternObject[]; // default: []
  inheritColorFromParent: boolean; // default: true

  // arc labels
  enableArcLabels: boolean; // default: false
  arcLabel: NivoArcLabel; // default: 'formattedValue'
  arcLabelsRadiusOffset: number; // 0 - 2 default: 0.5 step: 0.05
  arcLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLabelsTextColor: string; // default: 'gray'

  // motion
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig; // default: 'gentle'
  transitionMode: NivoTransitionMode; // default: 'innerRadius'

  // options
  chartTitle: string;
  chartTitleColor: string; // default: #ffffff
  chartTitlePosition: NivoChartTitlePosition; // default: center
  chartTitleSize: TitleOrder; // 1 - 6 px default: 3 step: 1
  isChartTitleFocused: boolean;
  isChartTitleValid: boolean;

  // screenshot
  isScreenshotFilenameFocused: boolean;
  isScreenshotFilenameValid: boolean;
  screenshotFilename: string;
  screenshotImageQuality: number; // 0 - 1 default: 1 step: 0.05
  screenshotImageType: ScreenshotImageType;
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
  setChartBorderColor: 'setChartBorderColor';
  setChartBorderWidth: 'setChartBorderWidth';
  setChartColors: 'setChartColors';
  setEnableFillPatterns: 'setEnableFillPatterns';
  setFillPatterns: 'setFillPatterns';
  setInheritColorFromParent: 'setInheritColorFromParent';

  // arc labels
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset';
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle';
  setArcLabelsTextColor: 'setArcLabelsTextColor';
  setEnableArcLabels: 'setEnableArcLabels';
  setArcLabel: 'setArcLabel';

  // motion
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';
  setTransitionMode: 'setTransitionMode';

  // options
  setChartTitle: 'setChartTitle';
  setChartTitleColor: 'setChartTitleColor';
  setChartTitlePosition: 'setChartTitlePosition';
  setChartTitleSize: 'setChartTitleSize';
  setIsChartTitleFocused: 'setIsChartTitleFocused';
  setIsChartTitleValid: 'setIsChartTitleValid';

  // screenshot
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused';
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid';
  setScreenshotFilename: 'setScreenshotFilename';
  setScreenshotImageQuality: 'setScreenshotImageQuality';
  setScreenshotImageType: 'setScreenshotImageType';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsiveSunburstChartDispatch =
  | {
      type:
        | ResponsiveSunburstChartAction['setArcLabelsRadiusOffset']
        | ResponsiveSunburstChartAction['setArcLabelsSkipAngle']
        | ResponsiveSunburstChartAction['setChartBorderWidth']
        | ResponsiveSunburstChartAction['setCornerRadius']
        | ResponsiveSunburstChartAction['setMarginBottom']
        | ResponsiveSunburstChartAction['setMarginLeft']
        | ResponsiveSunburstChartAction['setMarginRight']
        | ResponsiveSunburstChartAction['setMarginTop']
        | ResponsiveSunburstChartAction['setScreenshotImageQuality'];

      payload: number;
    }
  | {
      type:
        | ResponsiveSunburstChartAction['setArcLabelsTextColor']
        | ResponsiveSunburstChartAction['setChartBorderColor']
        | ResponsiveSunburstChartAction['setChartTitle']
        | ResponsiveSunburstChartAction['setChartTitleColor']
        | ResponsiveSunburstChartAction['setScreenshotFilename'];

      payload: string;
    }
  | {
      type:
        | ResponsiveSunburstChartAction['setEnableAnimate']
        | ResponsiveSunburstChartAction['setEnableArcLabels']
        | ResponsiveSunburstChartAction['setEnableFillPatterns']
        | ResponsiveSunburstChartAction['setInheritColorFromParent']
        | ResponsiveSunburstChartAction['setIsChartTitleFocused']
        | ResponsiveSunburstChartAction['setIsChartTitleValid']
        | ResponsiveSunburstChartAction['setIsScreenshotFilenameFocused']
        | ResponsiveSunburstChartAction['setIsScreenshotFilenameValid'];

      payload: boolean;
    }
  | {
      type: ResponsiveSunburstChartAction['setChartColors'];
      payload: NivoColorScheme;
    }
  | {
      type: ResponsiveSunburstChartAction['setArcLabel'];
      payload: NivoArcLabel;
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
      type: ResponsiveSunburstChartAction['setChartTitlePosition'];
      payload: NivoChartTitlePosition;
    }
  | {
      type: ResponsiveSunburstChartAction['setChartTitleSize'];
      payload: TitleOrder;
    }
  | {
      type: ResponsiveSunburstChartAction['setScreenshotImageType'];
      payload: ScreenshotImageType;
    }
  | {
      type: ResponsiveSunburstChartAction['resetChartToDefault'];
      payload: ResponsiveSunburstChartState;
    };

export type {
  ResponsiveSunburstChartAction,
  ResponsiveSunburstChartDispatch,
  ResponsiveSunburstChartProps,
  ResponsiveSunburstChartState,
  SunburstChartData,
};
