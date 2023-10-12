import { useEffect, useReducer } from 'react';
import {
  initialResponsiveRadialBarChartState,
  responsiveRadialBarChartAction,
  responsiveRadialBarChartReducer,
} from './state';
import { useGlobalState } from '../../../hooks';
import { AccessibleSelectedDeselectedTextElements } from '../../../jsxCreators';

function ResponsiveRadialBarChart() {
  const [responsiveRadialBarChartState, responsiveRadialBarChartDispatch] =
    useReducer(
      responsiveRadialBarChartReducer,
      initialResponsiveRadialBarChartState
    );

  const {
    globalState: { isPrefersReducedMotion, themeObject },
  } = useGlobalState();

  const {
    // base
    enableMaxValue, // default: false ? 'auto'
    maxValue, // 0 - 1000 default: 1000 step: 1
    // base -> margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1
    // base -> angles
    startAngle, // -360 - 360 default: 0 step: 1
    endAngle, // -360 - 360 default: 270 step: 1
    innerRadius, // 0 - 0.95 default: 0.3 step: 0.05
    paddingRing, // 0 - 0.9 default: 0.2 step: 0.1
    padAngle, // 0 - 45 default: 0 step: 1
    cornerRadius, // 0px - 45px default: 0 step: 1

    // style
    chartColors, // default: 'nivo'
    ringBorderWidth, // 0px - 20px default: 0 step: 1
    ringBorderColor, // default: #ffffff

    // tracks
    enableTracks, // default: true
    tracksColor, // default: #333333

    // grids
    enableRadialGrid, // default: true
    enableCircularGrid, // default: true

    // axes
    // radial axis start
    enableRadialAxisStart, // default: true
    radialAxisStartTickSize, // 0 - 20 default: 5 step: 1
    radialAxisStartTickPadding, // 0 - 20 default: 5 step: 1
    radialAxisStartTickRotation, // -90 - 90 default: 0 step: 1

    // radial axis end
    enableRadialAxisEnd, // default: false
    radialAxisEndTickSize, // 0 - 20 default: 5 step: 1
    radialAxisEndTickPadding, // 0 - 20 default: 5 step: 1
    radialAxisEndTickRotation, // -90 - 90 default: 0 step: 1

    // circular axis inner
    enableCircularAxisInner, // default: false
    circularAxisInnerTickSize, // 0 - 20 default: 5 step: 1
    circularAxisInnerTickPadding, // 0 - 20 default: 5 step: 1
    circularAxisInnerTickRotation, // -90 - 90 default: 0 step: 1

    // circular axis outer
    enableCircularAxisOuter, // default: true
    circularAxisOuterTickSize, // 0 - 20 default: 5 step: 1
    circularAxisOuterTickPadding, // 0 - 20 default: 5 step: 1
    circularAxisOuterTickRotation, // -90 - 90 default: 0 step: 1

    // labels
    enableLabels, // default: false
    labelsSkipAngle, // 0 - 45 default: 10 step: 1
    labelsRadiusOffset, // 0 - 2 default: 0.5 step: 0.05
    labelsTextColor, // default: #333333

    // legend
    enableLegend, // default: false
    legendAnchor, // default: bottom-right
    legendDirection, // default: column
    enableLegendJustify, // default: false
    legendTranslateX, // -200px - 200px default: 0 step: 1
    legendTranslateY, // -200px - 200px default: 0 step: 1
    legendItemWidth, // 10px - 200px default: 60 step: 1
    legendItemHeight, // 10px - 200px default: 20 step: 1
    legendItemsSpacing, // 0px - 60px default: 2 step: 1
    legendItemDirection, // default: left-to-right
    legendItemOpacity, // 0 - 1 default: 1 step: 0.05
    legendSymbolSize, // 2px - 60px default: 12 step: 1

    // motion
    enableAnimate, // default: true
    motionConfig, // default: 'gentle'
    transitionMode, // default: 'centerRadius'
  } = responsiveRadialBarChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveRadialBarChartDispatch({
      type: responsiveRadialBarChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  /**
   * const [reverseAccessibleSelectedText, reverseAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      deselectedDescription:
        'Bars will start on bottom instead of top for vertical layout and left instead of right for horizontal one',
      isSelected: reverse,
      selectedDescription:
        'Bars will start on top instead of bottom for vertical layout and right instead of left for horizontal one',
      semanticName: 'reverse',
      theme: 'muted',
    });
   */

  const [
    enableMaxValueAccessibleSelectedText,
    enableMaxValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Max value will be automatically calculated.',
    isSelected: enableMaxValue,
    selectedDescription: 'Max value is user defined.',
    semanticName: 'enable max value',
    theme: 'muted',
  });

  const [
    enableTracksAccessibleSelectedText,
    enableTracksAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Tracks will be hidden.',
    isSelected: enableTracks,
    selectedDescription: 'Tracks will be shown.',
    semanticName: 'enable tracks',
    theme: 'muted',
  });

  const [
    enableRadialGridAccessibleSelectedText,
    enableRadialGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial grid will be hidden.',
    isSelected: enableRadialGrid,
    selectedDescription: 'Radial grid will be shown.',
    semanticName: 'enable radial grid',
    theme: 'muted',
  });

  const [
    enableCircularGridAccessibleSelectedText,
    enableCircularGridAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular grid will be hidden.',
    isSelected: enableCircularGrid,
    selectedDescription: 'Circular grid will be shown.',
    semanticName: 'enable circular grid',
    theme: 'muted',
  });

  const [
    enableRadialAxisStartAccessibleSelectedText,
    enableRadialAxisStartAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis start will be hidden.',
    isSelected: enableRadialAxisStart,
    selectedDescription: 'Radial axis start will be shown.',
    semanticName: 'enable radial axis start',
    theme: 'muted',
  });

  const [
    enableRadialAxisEndAccessibleSelectedText,
    enableRadialAxisEndAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Radial axis end will be hidden.',
    isSelected: enableRadialAxisEnd,
    selectedDescription: 'Radial axis end will be shown.',
    semanticName: 'enable radial axis end',
    theme: 'muted',
  });

  const [
    enableCircularAxisInnerAccessibleSelectedText,
    enableCircularAxisInnerAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis inner will be hidden.',
    isSelected: enableCircularAxisInner,
    selectedDescription: 'Circular axis inner will be shown.',
    semanticName: 'enable circular axis inner',
    theme: 'muted',
  });

  const [
    enableCircularAxisOuterAccessibleSelectedText,
    enableCircularAxisOuterAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Circular axis outer will be hidden.',
    isSelected: enableCircularAxisOuter,
    selectedDescription: 'Circular axis outer will be shown.',
    semanticName: 'enable circular axis outer',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Labels will be hidden.',
    isSelected: enableLabels,
    selectedDescription: 'Labels will be shown.',
    semanticName: 'enable labels',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be hidden.',
    isSelected: enableLegend,
    selectedDescription: 'Legend will be shown.',
    semanticName: 'enable legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will be left aligned.',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend will be justified.',
    semanticName: 'enable legend justify',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Animation will be disabled.',
    isSelected: enableAnimate,
    selectedDescription: 'Animation will be enabled.',
    semanticName: 'enable animate',
    theme: 'muted',
  });

  return <></>;
}

export { ResponsiveRadialBarChart };
