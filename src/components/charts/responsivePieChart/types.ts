import { PieChartData } from '../../displayStatistics/types';
import {
  FillPatternObject,
  NivoColorScheme,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoMotionConfig,
  NivoTransitionMode,
} from '../types';

type ResponsivePieChartProps = {
  pieChartData: PieChartData[];
};

type ResponsivePieChartState = {
  /** base */
  startAngle: number; // -180 - 360 default: 0 step: 1
  endAngle: number; // -360 - 360 default: 360 step: 1
  innerRadius: number; // 0 - 1 default: 0 step: 0.05
  padAngle: number; // 0 - 45 default: 0 step: 1
  cornerRadius: number; // 0px - 45px default: 0 step: 1
  sortByValue: boolean; // default: false

  /** style */
  chartColors: NivoColorScheme;
  fillPatterns: FillPatternObject[];
  enableFillPatterns: boolean; // default: false
  arcBorderColor: string; // default: #ffffff
  arcBorderWidth: number; // 0px - 20px default: 0 step: 1

  /** arc labels */
  enableArcLabels: boolean; // default: true
  arcLabelsRadiusOffset: number; // 0 - 2 default:0.5 step: 0.05
  arcLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLabelsTextColor: string; // default: #333333

  /** arc link labels */
  enableArcLinkLabels: boolean; // default: true
  arcLinkLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLinkLabelsOffset: number; // -24px - 24px default: 0 step: 1
  arcLinkLabelsDiagonalLength: number; // 0px - 36px default: 16 step: 1
  arcLinkLabelsStraightLength: number; // 0px - 36px default: 24 step: 1
  arcLinkLabelsTextOffset: number; // 0px - 36px default: 6 step: 1
  arcLinkLabelsThickness: number; // 0px - 20px default: 1 step: 1
  arcLinkLabelsTextColor: string; // default: #333333

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
  legendAnchor: NivoLegendAnchor; // default: bottom
  legendDirection: NivoLegendDirection; // default: row
  legendJustify: boolean; // default: false
  legendTranslateX: number; // -200px - 200px default: 0 step: 1
  legendTranslateY: number; // -200px - 200px default: 0 step: 1
  legendItemsSpacing: number; // 0px - 60px default: 0 step: 1
  legendItemWidth: number; // 10px - 200px default: 60 step: 1
  legendItemHeight: number; // 10px - 200px default: 20 step: 1
  legendItemDirection: NivoLegendItemDirection; // default: left-to-right
  legendItemTextColor: string; // default: #000000
  legendItemOpacity: number; // 0 - 1 default: 1 step: 0.05
  legendSymbolSize: number; // 2px - 60px default: 12 step: 1
  legendSymbolShape: NivoLegendSymbolShape; // default: circle
};

type ResponsivePieChartAction = {
  /** base */
  setStartAngle: 'setStartAngle';
  setEndAngle: 'setEndAngle';
  setInnerRadius: 'setInnerRadius';
  setPadAngle: 'setPadAngle';
  setCornerRadius: 'setCornerRadius';
  setSortByValue: 'setSortByValue';

  /** style */
  setColorScheme: 'setColorScheme';
  setFillPatterns: 'setFillPatterns';
  setEnableFillPatterns: 'setEnableFillPatterns';
  setArcBorderColor: 'setArcBorderColor';
  setArcBorderWidth: 'setArcBorderWidth';

  /** arc labels */
  setEnableArcLabels: 'setEnableArcLabels';
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset';
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle';
  setArcLabelsTextColor: 'setArcLabelsTextColor';

  /** arc link labels */
  setEnableArcLinkLabels: 'setEnableArcLinkLabels';
  setArcLinkLabelsSkipAngle: 'setArcLinkLabelsSkipAngle';
  setArcLinkLabelsOffset: 'setArcLinkLabelsOffset';
  setArcLinkLabelsDiagonalLength: 'setArcLinkLabelsDiagonalLength';
  setArcLinkLabelsStraightLength: 'setArcLinkLabelsStraightLength';
  setArcLinkLabelsTextOffset: 'setArcLinkLabelsTextOffset';
  setArcLinkLabelsThickness: 'setArcLinkLabelsThickness';
  setArcLinkLabelsTextColor: 'setArcLinkLabelsTextColor';

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
  setNivoLegendAnchor: 'setNivoLegendAnchor';
  setLegendDirection: 'setLegendDirection';
  setLegendJustify: 'setLegendJustify';
  setLegendTranslateX: 'setLegendTranslateX';
  setLegendTranslateY: 'setLegendTranslateY';
  setLegendItemsSpacing: 'setLegendItemsSpacing';
  setLegendItemWidth: 'setLegendItemWidth';
  setLegendItemHeight: 'setLegendItemHeight';
  setLegendItemDirection: 'setLegendItemDirection';
  setLegendItemTextColor: 'setLegendItemTextColor';
  setLegendItemOpacity: 'setLegendItemOpacity';
  setLegendSymbolSize: 'setLegendSymbolSize';
  setLegendSymbolShape: 'setLegendSymbolShape';

  // reset all
  resetChartToDefault: 'resetChartToDefault';
};

type ResponsivePieChartDispatch =
  | {
      // all number payloads
      type:
        | ResponsivePieChartAction['setStartAngle']
        | ResponsivePieChartAction['setEndAngle']
        | ResponsivePieChartAction['setInnerRadius']
        | ResponsivePieChartAction['setPadAngle']
        | ResponsivePieChartAction['setCornerRadius']
        | ResponsivePieChartAction['setArcBorderWidth']
        | ResponsivePieChartAction['setArcLabelsSkipAngle']
        | ResponsivePieChartAction['setArcLabelsRadiusOffset']
        | ResponsivePieChartAction['setArcLinkLabelsSkipAngle']
        | ResponsivePieChartAction['setArcLinkLabelsOffset']
        | ResponsivePieChartAction['setArcLinkLabelsDiagonalLength']
        | ResponsivePieChartAction['setArcLinkLabelsStraightLength']
        | ResponsivePieChartAction['setArcLinkLabelsTextOffset']
        | ResponsivePieChartAction['setArcLinkLabelsThickness']
        | ResponsivePieChartAction['setActiveInnerRadiusOffset']
        | ResponsivePieChartAction['setActiveOuterRadiusOffset']
        | ResponsivePieChartAction['setMarginTop']
        | ResponsivePieChartAction['setMarginRight']
        | ResponsivePieChartAction['setMarginBottom']
        | ResponsivePieChartAction['setMarginLeft']
        | ResponsivePieChartAction['setLegendTranslateX']
        | ResponsivePieChartAction['setLegendTranslateY']
        | ResponsivePieChartAction['setLegendItemsSpacing']
        | ResponsivePieChartAction['setLegendItemWidth']
        | ResponsivePieChartAction['setLegendItemHeight']
        | ResponsivePieChartAction['setLegendItemOpacity']
        | ResponsivePieChartAction['setLegendSymbolSize'];

      payload: number;
    }
  | {
      // all boolean payloads
      type:
        | ResponsivePieChartAction['setSortByValue']
        | ResponsivePieChartAction['setEnableFillPatterns']
        | ResponsivePieChartAction['setEnableArcLabels']
        | ResponsivePieChartAction['setEnableArcLinkLabels']
        | ResponsivePieChartAction['setEnableAnimate']
        | ResponsivePieChartAction['setEnableLegend']
        | ResponsivePieChartAction['setLegendJustify'];

      payload: boolean;
    }
  | {
      type: ResponsivePieChartAction['setFillPatterns'];
      payload: FillPatternObject[];
    }
  | {
      type: ResponsivePieChartAction['setColorScheme'];
      payload: NivoColorScheme;
    }
  | {
      type:
        | ResponsivePieChartAction['setArcLabelsTextColor']
        | ResponsivePieChartAction['setArcBorderColor']
        | ResponsivePieChartAction['setArcLinkLabelsTextColor']
        | ResponsivePieChartAction['setLegendItemTextColor'];

      payload: string;
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
      type: ResponsivePieChartAction['setNivoLegendAnchor'];
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
      type: ResponsivePieChartAction['resetChartToDefault'];
      payload: ResponsivePieChartState;
    };

type ResponsivePieChartReducer = (
  state: ResponsivePieChartState,
  action: ResponsivePieChartDispatch
) => ResponsivePieChartState;

export type {
  FillPatternObject,
  NivoColorScheme,
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
};
