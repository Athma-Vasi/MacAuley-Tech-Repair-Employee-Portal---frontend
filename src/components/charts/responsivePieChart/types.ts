import { PieChartData } from '../../displayStatistics/types';
import {
  FillPatternObject,
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
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
  colorScheme: NivoColorScheme;
  fillPatterns: FillPatternObject[];
  enableFillPatterns: boolean; // default: false
  borderColor: string; // default: #ffffff
  borderWidth: number; // 0px - 20px default: 0 step: 1

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
  animate: boolean; // default: true
  motionConfig: NivoMotionConfig;
  transitionMode: NivoTransitionMode;

  /** margin */
  marginTop: number; // 0px - 200px default: 60 step: 1
  marginRight: number; // 0px - 200px default: 60 step: 1
  marginBottom: number; // 0px - 200px default: 60 step: 1
  marginLeft: number; // 0px - 200px default: 60 step: 1

  /** legend */
  enableLegend: boolean; // default: true
  anchor: LegendAnchor; // default: bottom
  direction: LegendDirection; // default: row
  justify: boolean; // default: false
  translateX: number; // -200px - 200px default: 0 step: 1
  translateY: number; // -200px - 200px default: 0 step: 1
  itemsSpacing: number; // 0px - 60px default: 0 step: 1
  itemWidth: number; // 10px - 200px default: 60 step: 1
  itemHeight: number; // 10px - 200px default: 20 step: 1
  itemDirection: LegendItemDirection; // default: left-to-right
  itemTextColor: string; // default: #000000
  itemOpacity: number; // 0 - 1 default: 1 step: 0.05
  symbolSize: number; // 2px - 60px default: 12 step: 1
  symbolShape: LegendSymbolShape; // default: circle
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
  setBorderColor: 'setBorderColor';
  setBorderWidth: 'setBorderWidth';

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
  setAnimate: 'setAnimate';
  setMotionConfig: 'setMotionConfig';
  setTransitionMode: 'setTransitionMode';

  /** margin */
  setMarginTop: 'setMarginTop';
  setMarginRight: 'setMarginRight';
  setMarginBottom: 'setMarginBottom';
  setMarginLeft: 'setMarginLeft';

  /** legend */
  setEnableLegend: 'setEnableLegend';
  setAnchor: 'setAnchor';
  setDirection: 'setDirection';
  setJustify: 'setJustify';
  setTranslateX: 'setTranslateX';
  setTranslateY: 'setTranslateY';
  setItemsSpacing: 'setItemsSpacing';
  setItemWidth: 'setItemWidth';
  setItemHeight: 'setItemHeight';
  setItemDirection: 'setItemDirection';
  setItemTextColor: 'setItemTextColor';
  setItemOpacity: 'setItemOpacity';
  setSymbolSize: 'setSymbolSize';
  setSymbolShape: 'setSymbolShape';
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
        | ResponsivePieChartAction['setBorderWidth']
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
        | ResponsivePieChartAction['setTranslateX']
        | ResponsivePieChartAction['setTranslateY']
        | ResponsivePieChartAction['setItemsSpacing']
        | ResponsivePieChartAction['setItemWidth']
        | ResponsivePieChartAction['setItemHeight']
        | ResponsivePieChartAction['setItemOpacity']
        | ResponsivePieChartAction['setSymbolSize'];

      payload: number;
    }
  | {
      // all boolean payloads
      type:
        | ResponsivePieChartAction['setSortByValue']
        | ResponsivePieChartAction['setEnableFillPatterns']
        | ResponsivePieChartAction['setEnableArcLabels']
        | ResponsivePieChartAction['setEnableArcLinkLabels']
        | ResponsivePieChartAction['setAnimate']
        | ResponsivePieChartAction['setEnableLegend']
        | ResponsivePieChartAction['setJustify'];

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
        | ResponsivePieChartAction['setBorderColor']
        | ResponsivePieChartAction['setArcLinkLabelsTextColor']
        | ResponsivePieChartAction['setItemTextColor'];

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
      type: ResponsivePieChartAction['setAnchor'];
      payload: LegendAnchor;
    }
  | {
      type: ResponsivePieChartAction['setDirection'];
      payload: LegendDirection;
    }
  | {
      type: ResponsivePieChartAction['setItemDirection'];
      payload: LegendItemDirection;
    }
  | {
      type: ResponsivePieChartAction['setSymbolShape'];
      payload: LegendSymbolShape;
    };

type ResponsivePieChartReducer = (
  state: ResponsivePieChartState,
  action: ResponsivePieChartDispatch
) => ResponsivePieChartState;

export type {
  FillPatternObject,
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartAction,
  ResponsivePieChartDispatch,
  ResponsivePieChartProps,
  ResponsivePieChartReducer,
  ResponsivePieChartState,
};
