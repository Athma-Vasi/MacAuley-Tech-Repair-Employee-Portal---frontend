import {
  ResponsiveBarChartAction,
  ResponsiveBarChartDispatch,
  ResponsiveBarChartState,
} from './types';

const initialResponsiveBarChartState: ResponsiveBarChartState = {
  groupMode: 'stacked',
  layout: 'horizontal',
  valueScale: 'linear',
  reverse: false,
  toggleMinValue: false,
  toggleMaxValue: false,
  padding: 0.1,
  innerPadding: 0,
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 60,
  colors: 'nivo',
  borderRadius: 0,
  borderWidth: 0,
  borderColor: '#ffffff',
  fillPatterns: [],
  enableFillPatterns: false,
  enableLabels: true,
  labelSkipWidth: 0,
  labelSkipHeight: 0,
  labelTextColor: '#ffffff',
  enableGridX: false,
  enableGridY: true,
  enableAxisTop: false,
  axisTopTickSize: 5,
  axisTopTickPadding: 5,
  axisTopTickRotation: 0,
  enableAxisRight: false,
  axisRightTickSize: 5,
  axisRightTickPadding: 5,
  axisRightTickRotation: 0,
  enableAxisBottom: true,
  axisBottomTickSize: 5,
  axisBottomTickPadding: 5,
  axisBottomTickRotation: 0,
  enableAxisLeft: false,
  axisLeftTickSize: 5,
  axisLeftTickPadding: 5,
  axisLeftTickRotation: 0,
  enableLegends: false,
  legendsAnchor: 'bottom-right',
  legendsDirection: 'column',
  enableLegendsJustify: false,
  legendsTranslateX: 0,
  legendsTranslateY: 0,
  legendsItemWidth: 60,
  legendsItemHeight: 20,
  legendsItemsSpacing: 2,
  legendsItemDirection: 'left-to-right',
  itemTextColor: '#000000',
  itemOpacity: 1,
  symbolSize: 12,
  symbolShape: 'circle',
  animate: true,
  motionConfig: 'default',
};

const responsiveBarChartAction: ResponsiveBarChartAction = {
  /** base */
  setGroupMode: 'setGroupMode',
  setLayout: 'setLayout',
  setValueScale: 'setValueScale',
  setReverse: 'setReverse',
  setToggleMinValue: 'setToggleMinValue',
  setMinValue: 'setMinValue',
  setToggleMaxValue: 'setToggleMaxValue',
  setMaxValue: 'setMaxValue',
  setPadding: 'setPadding',
  setInnerPadding: 'setInnerPadding',

  /** margin */
  setMarginTop: 'setMarginTop',
  setMarginRight: 'setMarginRight',
  setMarginBottom: 'setMarginBottom',
  setMarginLeft: 'setMarginLeft',

  /** style */
  setColors: 'setColors',
  setBorderRadius: 'setBorderRadius',
  setBorderWidth: 'setBorderWidth',
  setBorderColor: 'setBorderColor',
  setFillPatterns: 'setFillPatterns',
  setEnableFillPatterns: 'setEnableFillPatterns',

  /** labels */
  setEnableLabels: 'setEnableLabels',
  setLabelSkipWidth: 'setLabelSkipWidth',
  setLabelSkipHeight: 'setLabelSkipHeight',
  setLabelTextColor: 'setLabelTextColor',

  /** grid and axes */
  setEnableGridX: 'setEnableGridX',
  setEnableGridY: 'setEnableGridY',
  setEnableAxisTop: 'setEnableAxisTop',
  setAxisTopTickSize: 'setAxisTopTickSize',
  setAxisTopTickPadding: 'setAxisTopTickPadding',
  setAxisTopTickRotation: 'setAxisTopTickRotation',
  setEnableAxisRight: 'setEnableAxisRight',
  setAxisRightTickSize: 'setAxisRightTickSize',
  setAxisRightTickPadding: 'setAxisRightTickPadding',
  setAxisRightTickRotation: 'setAxisRightTickRotation',
  setEnableAxisBottom: 'setEnableAxisBottom',
  setAxisBottomTickSize: 'setAxisBottomTickSize',
  setAxisBottomTickPadding: 'setAxisBottomTickPadding',
  setAxisBottomTickRotation: 'setAxisBottomTickRotation',
  setEnableAxisLeft: 'setEnableAxisLeft',
  setAxisLeftTickSize: 'setAxisLeftTickSize',
  setAxisLeftTickPadding: 'setAxisLeftTickPadding',
  setAxisLeftTickRotation: 'setAxisLeftTickRotation',

  /** legends */
  setEnableLegends: 'setEnableLegends',
  setLegendsAnchor: 'setLegendsAnchor',
  setLegendsDirection: 'setLegendsDirection',
  setEnableLegendsJustify: 'setEnableLegendsJustify',
  setLegendsTranslateX: 'setLegendsTranslateX',
  setLegendsTranslateY: 'setLegendsTranslateY',
  setLegendsItemWidth: 'setLegendsItemWidth',
  setLegendsItemHeight: 'setLegendsItemHeight',
  setLegendsItemsSpacing: 'setLegendsItemsSpacing',
  setLegendsItemDirection: 'setLegendsItemDirection',
  setItemTextColor: 'setItemTextColor',
  setItemOpacity: 'setItemOpacity',
  setSymbolSize: 'setSymbolSize',
  setSymbolShape: 'setSymbolShape',

  /** motion */
  setAnimate: 'setAnimate',
  setMotionConfig: 'setMotionConfig',
};

function responsiveBarChartReducer(
  state: ResponsiveBarChartState,
  action: ResponsiveBarChartDispatch
): ResponsiveBarChartState {
  switch (action.type) {
    case responsiveBarChartAction.setGroupMode:
      return {
        ...state,
        groupMode: action.payload,
      };
    case responsiveBarChartAction.setLayout:
      return {
        ...state,
        layout: action.payload,
      };
    case responsiveBarChartAction.setValueScale:
      return {
        ...state,
        valueScale: action.payload,
      };
    case responsiveBarChartAction.setReverse:
      return {
        ...state,
        reverse: action.payload,
      };
    case responsiveBarChartAction.setToggleMinValue:
      return {
        ...state,
        toggleMinValue: action.payload,
      };
    case responsiveBarChartAction.setMinValue:
      return {
        ...state,
        minValue: action.payload,
      };
    case responsiveBarChartAction.setToggleMaxValue:
      return {
        ...state,
        toggleMaxValue: action.payload,
      };
    case responsiveBarChartAction.setMaxValue:
      return {
        ...state,
        maxValue: action.payload,
      };
    case responsiveBarChartAction.setPadding:
      return {
        ...state,
        padding: action.payload,
      };
    case responsiveBarChartAction.setInnerPadding:
      return {
        ...state,
        innerPadding: action.payload,
      };
    case responsiveBarChartAction.setMarginTop:
      return {
        ...state,
        marginTop: action.payload,
      };
    case responsiveBarChartAction.setMarginRight:
      return {
        ...state,
        marginRight: action.payload,
      };
    case responsiveBarChartAction.setMarginBottom:
      return {
        ...state,
        marginBottom: action.payload,
      };
    case responsiveBarChartAction.setMarginLeft:
      return {
        ...state,
        marginLeft: action.payload,
      };
    case responsiveBarChartAction.setColors:
      return {
        ...state,
        colors: action.payload,
      };
    case responsiveBarChartAction.setBorderRadius:
      return {
        ...state,
        borderRadius: action.payload,
      };
    case responsiveBarChartAction.setBorderWidth:
      return {
        ...state,
        borderWidth: action.payload,
      };
    case responsiveBarChartAction.setBorderColor:
      return {
        ...state,
        borderColor: action.payload,
      };
    case responsiveBarChartAction.setFillPatterns:
      return {
        ...state,
      };
    case responsiveBarChartAction.setEnableFillPatterns:
      return {
        ...state,
        enableFillPatterns: action.payload,
      };
    case responsiveBarChartAction.setEnableLabels:
      return {
        ...state,
        enableLabels: action.payload,
      };
    case responsiveBarChartAction.setLabelSkipWidth:
      return {
        ...state,
        labelSkipWidth: action.payload,
      };
    case responsiveBarChartAction.setLabelSkipHeight:
      return {
        ...state,
        labelSkipHeight: action.payload,
      };
    case responsiveBarChartAction.setLabelTextColor:
      return {
        ...state,
        labelTextColor: action.payload,
      };
    case responsiveBarChartAction.setEnableGridX:
      return {
        ...state,
        enableGridX: action.payload,
      };
    case responsiveBarChartAction.setEnableGridY:
      return {
        ...state,
        enableGridY: action.payload,
      };
    case responsiveBarChartAction.setEnableAxisTop:
      return {
        ...state,
        enableAxisTop: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickSize:
      return {
        ...state,
        axisTopTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickPadding:
      return {
        ...state,
        axisTopTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisTopTickRotation:
      return {
        ...state,
        axisTopTickRotation: action.payload,
      };
    case responsiveBarChartAction.setEnableAxisRight:
      return {
        ...state,
        enableAxisRight: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickSize:
      return {
        ...state,
        axisRightTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickPadding:
      return {
        ...state,
        axisRightTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisRightTickRotation:
      return {
        ...state,
        axisRightTickRotation: action.payload,
      };
    case responsiveBarChartAction.setEnableAxisBottom:
      return {
        ...state,
        enableAxisBottom: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickSize:
      return {
        ...state,
        axisBottomTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickPadding:
      return {
        ...state,
        axisBottomTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisBottomTickRotation:
      return {
        ...state,
        axisBottomTickRotation: action.payload,
      };
    case responsiveBarChartAction.setEnableAxisLeft:
      return {
        ...state,
        enableAxisLeft: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickSize:
      return {
        ...state,
        axisLeftTickSize: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickPadding:
      return {
        ...state,
        axisLeftTickPadding: action.payload,
      };
    case responsiveBarChartAction.setAxisLeftTickRotation:
      return {
        ...state,
        axisLeftTickRotation: action.payload,
      };
    case responsiveBarChartAction.setEnableLegends:
      return {
        ...state,
        enableLegends: action.payload,
      };
    case responsiveBarChartAction.setLegendsAnchor:
      return {
        ...state,
        legendsAnchor: action.payload,
      };
    case responsiveBarChartAction.setLegendsDirection:
      return {
        ...state,
        legendsDirection: action.payload,
      };
    case responsiveBarChartAction.setEnableLegendsJustify:
      return {
        ...state,
        enableLegendsJustify: action.payload,
      };
    case responsiveBarChartAction.setLegendsTranslateX:
      return {
        ...state,
        legendsTranslateX: action.payload,
      };
    case responsiveBarChartAction.setLegendsTranslateY:
      return {
        ...state,
        legendsTranslateY: action.payload,
      };
    case responsiveBarChartAction.setLegendsItemWidth:
      return {
        ...state,
        legendsItemWidth: action.payload,
      };
    case responsiveBarChartAction.setLegendsItemHeight:
      return {
        ...state,
        legendsItemHeight: action.payload,
      };
    case responsiveBarChartAction.setLegendsItemsSpacing:
      return {
        ...state,
        legendsItemsSpacing: action.payload,
      };
    case responsiveBarChartAction.setLegendsItemDirection:
      return {
        ...state,
        legendsItemDirection: action.payload,
      };
    case responsiveBarChartAction.setItemTextColor:
      return {
        ...state,
        itemTextColor: action.payload,
      };
    case responsiveBarChartAction.setItemOpacity:
      return {
        ...state,
        itemOpacity: action.payload,
      };
    case responsiveBarChartAction.setSymbolSize:
      return {
        ...state,
        symbolSize: action.payload,
      };
    case responsiveBarChartAction.setSymbolShape:
      return {
        ...state,
        symbolShape: action.payload,
      };
    case responsiveBarChartAction.setAnimate:
      return {
        ...state,
        animate: action.payload,
      };
    case responsiveBarChartAction.setMotionConfig:
      return {
        ...state,
        motionConfig: action.payload,
      };
    default:
      return state;
  }
}

export {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
};
