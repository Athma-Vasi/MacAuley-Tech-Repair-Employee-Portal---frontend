import { TitleOrder } from '@mantine/core';
import { ScreenshotImageType } from '../../../types';
import {
  NivoArcLabel,
  NivoChartTitlePosition,
  NivoColorScheme,
  NivoFillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';

type PieChartData = {
  id: string;
  label: string;
  value: number;
};

type ResponsivePieChartProps = {
  chartHeight?: number;
  chartWidth?: number;
  hideControls?: boolean;
  pieChartData: PieChartData[];
};

type ResponsivePieChartState = {
  /** base */
  cornerRadius: number; // 0px - 45px default: 0 step: 1
  endAngle: number; // -360 - 360 default: 360 step: 1
  innerRadius: number; // 0 - 1 default: 0 step: 0.05
  padAngle: number; // 0 - 45 default: 0 step: 1
  sortByValue: boolean; // default: false
  startAngle: number; // -180 - 360 default: 0 step: 1

  /** style */
  arcBorderColor: string; // default: #ffffff
  arcBorderWidth: number; // 0px - 20px default: 0 step: 1
  chartColors: NivoColorScheme;
  enableFillPatterns: boolean; // default: false
  fillPatterns: NivoFillPatternObject[];

  /** arc labels */
  arcLabel: NivoArcLabel; // default: 'value'
  arcLabelsRadiusOffset: number; // 0 - 2 default:0.5 step: 0.05
  arcLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLabelsTextColor: string; // default: #333333
  enableArcLabels: boolean; // default: true

  /** arc link labels */
  arcLinkLabelsDiagonalLength: number; // 0px - 36px default: 16 step: 1
  arcLinkLabelsOffset: number; // -24px - 24px default: 0 step: 1
  arcLinkLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLinkLabelsStraightLength: number; // 0px - 36px default: 24 step: 1
  arcLinkLabelsTextColor: string; // default: #333333
  arcLinkLabelsTextOffset: number; // 0px - 36px default: 6 step: 1
  arcLinkLabelsThickness: number; // 0px - 20px default: 1 step: 1
  enableArcLinkLabels: boolean; // default: true

  /** interactivity */
  activeInnerRadiusOffset: number; // 0px - 50px default: 0 step: 1
  activeOuterRadiusOffset: number; // 0px - 50px default: 0 step: 1

  /** motion */
  enableAnimate: boolean; // default: true
  motionConfig: NivoMotionConfig;
  transitionMode: NivoTransitionMode;

  /** margin */
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  /** legend */
  enableLegend: boolean; // default: true
  enableLegendJustify: boolean; // default: false
  legendAnchor: NivoLegendAnchor; // default: bottom
  legendDirection: NivoLegendDirection; // default: row
  legendItemBackground: string; // default: 'rgba(255, 255, 255, 0)'
  legendItemDirection: NivoLegendItemDirection; // default: left-to-right
  legendItemHeight: number; // 10px - 200px default: 20 step: 1
  legendItemOpacity: number; // 0 - 1 default: 1 step: 0.05
  legendItemTextColor: string; // default: #000000
  legendItemWidth: number; // 10px - 200px default: 60 step: 1
  legendItemsSpacing: number; // 0px - 60px default: 0 step: 1
  legendSymbolBorderColor: string; // default: 'rgba(0, 0, 0, .5)'
  legendSymbolBorderWidth: number; // 0px - 20px default: 0 step: 1
  legendSymbolShape: NivoLegendSymbolShape; // default: circle
  legendSymbolSize: number; // 2px - 60px default: 12 step: 1
  legendSymbolSpacing: number; // 0px - 30px default: 8 step: 1
  legendTranslateX: number; // -200px - 200px default: 0 step: 1
  legendTranslateY: number; // -200px - 200px default: 0 step: 1

  /** options */
  chartTitle: string;
  chartTitleColor: string; // default: #ffffff
  chartTitlePosition: NivoChartTitlePosition; // default: center
  chartTitleSize: TitleOrder; // 1 - 6 px default: 3 step: 1
  isChartTitleFocused: boolean;
  isChartTitleValid: boolean;

  /** screenshot */
  isScreenshotFilenameFocused: boolean;
  isScreenshotFilenameValid: boolean;
  screenshotFilename: string;
  screenshotImageQuality: number; // 0 - 1 default: 1 step: 0.05
  screenshotImageType: ScreenshotImageType;
};

type ResponsivePieChartAction = {
  /** base */
  setCornerRadius: 'setCornerRadius';
  setEndAngle: 'setEndAngle';
  setInnerRadius: 'setInnerRadius';
  setPadAngle: 'setPadAngle';
  setSortByValue: 'setSortByValue';
  setStartAngle: 'setStartAngle';

  /** style */
  setArcBorderColor: 'setArcBorderColor';
  setArcBorderWidth: 'setArcBorderWidth';
  setColorScheme: 'setColorScheme';
  setEnableFillPatterns: 'setEnableFillPatterns';
  setFillPatterns: 'setFillPatterns';

  /** arc labels */
  setArcLabel: 'setArcLabel';
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset';
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle';
  setArcLabelsTextColor: 'setArcLabelsTextColor';
  setEnableArcLabels: 'setEnableArcLabels';

  /** arc link labels */
  setArcLinkLabelsDiagonalLength: 'setArcLinkLabelsDiagonalLength';
  setArcLinkLabelsOffset: 'setArcLinkLabelsOffset';
  setArcLinkLabelsSkipAngle: 'setArcLinkLabelsSkipAngle';
  setArcLinkLabelsStraightLength: 'setArcLinkLabelsStraightLength';
  setArcLinkLabelsTextColor: 'setArcLinkLabelsTextColor';
  setArcLinkLabelsTextOffset: 'setArcLinkLabelsTextOffset';
  setArcLinkLabelsThickness: 'setArcLinkLabelsThickness';
  setEnableArcLinkLabels: 'setEnableArcLinkLabels';

  /** interactivity */
  setActiveInnerRadiusOffset: 'setActiveInnerRadiusOffset';
  setActiveOuterRadiusOffset: 'setActiveOuterRadiusOffset';

  /** motion */
  setEnableAnimate: 'setEnableAnimate';
  setMotionConfig: 'setMotionConfig';
  setTransitionMode: 'setTransitionMode';

  /** margin */
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  /** legend */
  setEnableLegend: 'setEnableLegend';
  setEnableLegendJustify: 'setEnableLegendJustify';
  setLegendAnchor: 'setLegendAnchor';
  setLegendDirection: 'setLegendDirection';
  setLegendItemBackground: 'setLegendItemBackground';
  setLegendItemDirection: 'setLegendItemDirection';
  setLegendItemHeight: 'setLegendItemHeight';
  setLegendItemOpacity: 'setLegendItemOpacity';
  setLegendItemTextColor: 'setLegendItemTextColor';
  setLegendItemWidth: 'setLegendItemWidth';
  setLegendItemsSpacing: 'setLegendItemsSpacing';
  setLegendSymbolBorderColor: 'setLegendSymbolBorderColor';
  setLegendSymbolBorderWidth: 'setLegendSymbolBorderWidth';
  setLegendSymbolShape: 'setLegendSymbolShape';
  setLegendSymbolSize: 'setLegendSymbolSize';
  setLegendSymbolSpacing: 'setLegendSymbolSpacing';
  setLegendTranslateX: 'setLegendTranslateX';
  setLegendTranslateY: 'setLegendTranslateY';

  /** options */
  setChartTitle: 'setChartTitle';
  setChartTitleColor: 'setChartTitleColor';
  setChartTitlePosition: 'setChartTitlePosition';
  setChartTitleSize: 'setChartTitleSize';
  setIsChartTitleFocused: 'setIsChartTitleFocused';
  setIsChartTitleValid: 'setIsChartTitleValid';

  /** screenshot */
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused';
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid';
  setScreenshotFilename: 'setScreenshotFilename';
  setScreenshotImageQuality: 'setScreenshotImageQuality';
  setScreenshotImageType: 'setScreenshotImageType';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsivePieChartDispatch =
  | {
      // all number payloads
      type:
        | ResponsivePieChartAction['setActiveInnerRadiusOffset']
        | ResponsivePieChartAction['setActiveOuterRadiusOffset']
        | ResponsivePieChartAction['setArcBorderWidth']
        | ResponsivePieChartAction['setArcLabelsRadiusOffset']
        | ResponsivePieChartAction['setArcLabelsSkipAngle']
        | ResponsivePieChartAction['setArcLinkLabelsDiagonalLength']
        | ResponsivePieChartAction['setArcLinkLabelsOffset']
        | ResponsivePieChartAction['setArcLinkLabelsSkipAngle']
        | ResponsivePieChartAction['setArcLinkLabelsStraightLength']
        | ResponsivePieChartAction['setArcLinkLabelsTextOffset']
        | ResponsivePieChartAction['setArcLinkLabelsThickness']
        | ResponsivePieChartAction['setCornerRadius']
        | ResponsivePieChartAction['setEndAngle']
        | ResponsivePieChartAction['setInnerRadius']
        | ResponsivePieChartAction['setLegendItemHeight']
        | ResponsivePieChartAction['setLegendItemOpacity']
        | ResponsivePieChartAction['setLegendItemWidth']
        | ResponsivePieChartAction['setLegendItemsSpacing']
        | ResponsivePieChartAction['setLegendSymbolBorderWidth']
        | ResponsivePieChartAction['setLegendSymbolSize']
        | ResponsivePieChartAction['setLegendSymbolSpacing']
        | ResponsivePieChartAction['setLegendTranslateX']
        | ResponsivePieChartAction['setLegendTranslateY']
        | ResponsivePieChartAction['setMarginBottom']
        | ResponsivePieChartAction['setMarginLeft']
        | ResponsivePieChartAction['setMarginRight']
        | ResponsivePieChartAction['setMarginTop']
        | ResponsivePieChartAction['setPadAngle']
        | ResponsivePieChartAction['setScreenshotImageQuality']
        | ResponsivePieChartAction['setStartAngle'];

      payload: number;
    }
  | {
      // all boolean payloads
      type:
        | ResponsivePieChartAction['setEnableAnimate']
        | ResponsivePieChartAction['setEnableArcLabels']
        | ResponsivePieChartAction['setEnableArcLinkLabels']
        | ResponsivePieChartAction['setEnableFillPatterns']
        | ResponsivePieChartAction['setEnableLegend']
        | ResponsivePieChartAction['setEnableLegendJustify']
        | ResponsivePieChartAction['setIsChartTitleFocused']
        | ResponsivePieChartAction['setIsChartTitleValid']
        | ResponsivePieChartAction['setIsScreenshotFilenameFocused']
        | ResponsivePieChartAction['setIsScreenshotFilenameValid']
        | ResponsivePieChartAction['setSortByValue'];

      payload: boolean;
    }
  | {
      type: ResponsivePieChartAction['setFillPatterns'];
      payload: NivoFillPatternObject[];
    }
  | {
      type: ResponsivePieChartAction['setColorScheme'];
      payload: NivoColorScheme;
    }
  | {
      type:
        | ResponsivePieChartAction['setArcBorderColor']
        | ResponsivePieChartAction['setArcLabelsTextColor']
        | ResponsivePieChartAction['setArcLinkLabelsTextColor']
        | ResponsivePieChartAction['setChartTitle']
        | ResponsivePieChartAction['setChartTitleColor']
        | ResponsivePieChartAction['setLegendItemBackground']
        | ResponsivePieChartAction['setLegendItemTextColor']
        | ResponsivePieChartAction['setLegendSymbolBorderColor']
        | ResponsivePieChartAction['setScreenshotFilename'];

      payload: string;
    }
  | {
      type: ResponsivePieChartAction['setArcLabel'];
      payload: NivoArcLabel;
    }
  | {
      type: ResponsivePieChartAction['setMotionConfig'];
      payload: NivoMotionConfig;
    }
  | {
      type: ResponsivePieChartAction['setTransitionMode'];
      payload: NivoTransitionMode;
    }
  | {
      type: ResponsivePieChartAction['setLegendAnchor'];
      payload: NivoLegendAnchor;
    }
  | {
      type: ResponsivePieChartAction['setLegendDirection'];
      payload: NivoLegendDirection;
    }
  | {
      type: ResponsivePieChartAction['setLegendItemDirection'];
      payload: NivoLegendItemDirection;
    }
  | {
      type: ResponsivePieChartAction['setLegendSymbolShape'];
      payload: NivoLegendSymbolShape;
    }
  | {
      type: ResponsivePieChartAction['setChartTitlePosition'];
      payload: NivoChartTitlePosition;
    }
  | {
      type: ResponsivePieChartAction['setChartTitleSize'];
      payload: TitleOrder;
    }
  | {
      type: ResponsivePieChartAction['setScreenshotImageType'];
      payload: ScreenshotImageType;
    }
  | {
      type: ResponsivePieChartAction['resetChartToDefault'];
      payload: ResponsivePieChartState;
    };

type ResponsivePieChartReducer = (
  state: ResponsivePieChartState,
  action: ResponsivePieChartDispatch
) => ResponsivePieChartState;

export type {
  NivoColorScheme,
  NivoFillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartAction,
  ResponsivePieChartDispatch,
  ResponsivePieChartProps,
  ResponsivePieChartReducer,
  ResponsivePieChartState,
  PieChartData,
};
