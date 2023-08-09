import { PieChartData } from '../types';

type ResponsivePieChartProps = {
  pieChartDataMap: Map<string, Map<string, PieChartData[]>>;
};

type NivoColorScheme =
  | 'nivo'
  | 'category10'
  | 'accent'
  | 'dark2'
  | 'paired'
  | 'pastel1'
  | 'pastel2'
  | 'set1'
  | 'set2'
  | 'set3'
  | 'brown_blueGreen'
  | 'purpleRed_green'
  | 'pink_yellowGreen'
  | 'purple_orange'
  | 'red_blue'
  | 'red_grey'
  | 'red_yellow_blue'
  | 'red_yellow_green'
  | 'spectral'
  | 'blues'
  | 'greens'
  | 'greys'
  | 'oranges'
  | 'purples'
  | 'reds'
  | 'blue_green'
  | 'blue_purple'
  | 'green_blue'
  | 'orange_red'
  | 'purple_blue_green'
  | 'purple_blue'
  | 'purple_red'
  | 'red_purple'
  | 'yellow_green_blue'
  | 'yellow_green'
  | 'yellow_orange_brown'
  | 'yellow_orange_red';

type MotionConfig =
  | 'default'
  | 'gentle'
  | 'wobbly'
  | 'stiff'
  | 'slow'
  | 'molasses';

type TransitionMode =
  | 'startAngle'
  | 'middleAngle'
  | 'endAngle'
  | 'innerRadius'
  | 'centerRadius'
  | 'outerRadius'
  | 'pushIn'
  | 'pushOut';

type ResponsivePieChartState = {
  /** base */
  startAngle: number; // 0 - 360 default: 0 step: 1
  endAngle: number; // 0 - 360 default: 360 step: 1
  innerRadius: number; // 0 - 1 default: 0 step: 0.05
  padAngle: number; // 0 - 45 default: 0 step: 1
  cornerRadius: number; // 0px - 45px default: 0 step: 1
  sortByValue: boolean; // default: false

  /** style */
  colorScheme: NivoColorScheme;
  borderWidth: number; // 0px - 20px default: 0 step: 1

  /** arc labels */
  enableArcLabels: boolean; // default: true
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
  motionConfig: MotionConfig;
  transitionMode: TransitionMode;
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
  setBorderWidth: 'setBorderWidth';

  /** arc labels */
  setEnableArcLabels: 'setEnableArcLabels';
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
};
