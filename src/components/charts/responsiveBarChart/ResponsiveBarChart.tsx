import { useEffect, useReducer } from 'react';
import {
  initialResponsiveBarChartState,
  responsiveBarChartAction,
  responsiveBarChartReducer,
} from './state';
import { useGlobalState } from '../../../hooks';
import { AccessibleSelectedDeselectedTextElements } from '../../../jsxCreators';
import { COLORS_SWATCHES } from '../../../constants/data';

function ResponsiveBarChart() {
  const [responsiveBarChartState, responsiveBarChartDispatch] = useReducer(
    responsiveBarChartReducer,
    initialResponsiveBarChartState
  );

  const {
    globalState: { isPrefersReducedMotion, width, themeObject },
  } = useGlobalState();

  const {
    /** base */
    groupMode, // default: stacked
    layout, // default: horizontal
    valueScale, // default: linear
    reverse, // default: false
    // scale
    toggleMinValue, // default: false ? minValue is undefined
    minValue, // default: -1000 step: 1
    toggleMaxValue, // default: false ? maxValue is undefined
    maxValue, // default: 1000 step: 1
    padding, // 0.1 - 0.9 default: 0.1 step: 0.1
    innerPadding, // 0 - 10 default: 0 step: 1

    // base -> margin
    marginTop, // 0px - 200px default: 60 step: 1
    marginRight, // 0px - 200px default: 60 step: 1
    marginBottom, // 0px - 200px default: 60 step: 1
    marginLeft, // 0px - 200px default: 60 step: 1

    /** style */
    colors, // default: nivo
    borderRadius, // 0px - 36px default: 0 step: 1
    borderWidth, // 0px - 20px default: 0 step: 1
    borderColor, // default: #ffffff
    fillPatterns,
    enableFillPatterns, // default: false

    /** labels */
    enableLabels, // default: true
    labelSkipWidth, // 0 - 36 default: 0 step: 1
    labelSkipHeight, // 0 - 36 default: 0 step: 1
    labelTextColor, // default: #ffffff

    /** grid and axes */
    enableGridX, // default: false
    enableGridY, // default: true
    // axisTop
    enableAxisTop, // default: false ? null
    axisTopTickSize, // 0 - 20 default: 5 step: 1
    axisTopTickPadding, // 0 - 20 default: 5 step: 1
    axisTopTickRotation, // -90 - 90 default: 0 step: 1
    // axisRight
    enableAxisRight, // default: false ? null
    axisRightTickSize, // 0 - 20 default: 5 step: 1
    axisRightTickPadding, // 0 - 20 default: 5 step: 1
    axisRightTickRotation, // -90 - 90 default: 0 step: 1
    // axisBottom
    enableAxisBottom, // default: true
    axisBottomTickSize, // 0 - 20 default: 5 step: 1
    axisBottomTickPadding, // 0 - 20 default: 5 step: 1
    axisBottomTickRotation, // -90 - 90 default: 0 step: 1
    // axisLeft
    enableAxisLeft, // default: false ? null
    axisLeftTickSize, // 0 - 20 default: 5 step: 1
    axisLeftTickPadding, // 0 - 20 default: 5 step: 1
    axisLeftTickRotation, // -90 - 90 default: 0 step: 1

    /** legends */
    enableLegends, // default: false
    legendsAnchor, // default: bottom-right
    legendsDirection, // default: column
    enableLegendsJustify, // default: false
    legendsTranslateX, // -200px - 200px default: 0 step: 1
    legendsTranslateY, // -200px - 200px default: 0 step: 1
    legendsItemWidth, // 10px - 200px default: 60 step: 1
    legendsItemHeight, // 10px - 200px default: 20 step: 1
    legendsItemsSpacing, // 0px - 60px default: 2 step: 1
    legendsItemDirection, // default: left-to-right

    itemTextColor, // default: #000000
    itemOpacity, // 0 - 1 default: 1 step: 0.05
    symbolSize, // 2px - 60px default: 12 step: 1
    symbolShape, // default: circle

    /** motion */
    animate, // default: true
    motionConfig, // default: default
  } = responsiveBarChartState;

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsiveBarChartDispatch({
      type: responsiveBarChartAction.setAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  const [reverseAccessibleSelectedText, reverseAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: reverse,
      semanticName: 'reverse',
      deselectedDescription: 'Bars will be ordered from smallest to largest.',
      selectedDescription: 'Bars will be ordered from largest to smallest.',
      theme: 'muted',
    });

  const [
    toggleMinValueAccessibleSelectedText,
    toggleMinValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: toggleMinValue,
    semanticName: 'toggle min value',
    deselectedDescription: 'Min value will be automatically calculated.',
    selectedDescription: 'Min value is user defined.',
    theme: 'muted',
  });

  const [
    toggleMaxValueAccessibleSelectedText,
    toggleMaxValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: toggleMaxValue,
    semanticName: 'toggle max value',
    deselectedDescription: 'Max value will be automatically calculated.',
    selectedDescription: 'Max value is user defined.',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableFillPatterns,
    semanticName: 'enable fill patterns',
    deselectedDescription: 'Bars will be filled with a solid color.',
    selectedDescription: 'Bars will be filled with a pattern.',
    theme: 'muted',
  });

  const [
    enableLabelsAccessibleSelectedText,
    enableLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableLabels,
    semanticName: 'enable labels',
    deselectedDescription: 'Bars will not have labels.',
    selectedDescription: 'Bars will have labels.',
    theme: 'muted',
  });

  const [
    enableGridXAccessibleSelectedText,
    enableGridXAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableGridX,
    semanticName: 'enable grid x',
    deselectedDescription:
      'Chart display area will not have a grid on the y axis.',
    selectedDescription: 'Chart display area will have a grid on the y axis.',
    theme: 'muted',
  });

  const [
    enableGridYAccessibleSelectedText,
    enableGridYAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableGridY,
    semanticName: 'enable grid y',
    deselectedDescription:
      'Chart display area will not have a grid on the x axis.',
    selectedDescription: 'Chart display area will have a grid on the x axis.',
    theme: 'muted',
  });

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableAxisTop,
    semanticName: 'enable axis top',
    deselectedDescription: 'Chart will not have an axis on top.',
    selectedDescription: 'Chart will have an axis on top.',
    theme: 'muted',
  });

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableAxisRight,
    semanticName: 'enable axis right',
    deselectedDescription: 'Chart will not have an axis on the right.',
    selectedDescription: 'Chart will have an axis on the right.',
    theme: 'muted',
  });

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableAxisBottom,
    semanticName: 'enable axis bottom',
    deselectedDescription: 'Chart will not have an axis on the bottom.',
    selectedDescription: 'Chart will have an axis on the bottom.',
    theme: 'muted',
  });

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableAxisLeft,
    semanticName: 'enable axis left',
    deselectedDescription: 'Chart will not have an axis on the left.',
    selectedDescription: 'Chart will have an axis on the left.',
    theme: 'muted',
  });

  const [
    enableLegendsAccessibleSelectedText,
    enableLegendsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableLegends,
    semanticName: 'enable legends',
    deselectedDescription: 'Chart will not have legends.',
    selectedDescription: 'Chart will have legends.',
    theme: 'muted',
  });

  const [
    enableLegendsJustifyAccessibleSelectedText,
    enableLegendsJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableLegendsJustify,
    semanticName: 'enable legends justify',
    deselectedDescription: 'Legends will not be justified.',
    selectedDescription: 'Legends will be justified.',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: animate,
    semanticName: 'enable animate',
    deselectedDescription: 'Chart will not animate.',
    selectedDescription: 'Chart will animate.',
    theme: 'muted',
  });

  //
  const { gray } = COLORS_SWATCHES;
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[3];

  return <></>;
}

export { ResponsiveBarChart };

/**
 * [
  {
    "country": "AD",
    "hot dog": 133,
    "hot dogColor": "hsl(195, 70%, 50%)",
    "burger": 66,
    "burgerColor": "hsl(297, 70%, 50%)",
    "sandwich": 50,
    "sandwichColor": "hsl(81, 70%, 50%)",
    "kebab": 134,
    "kebabColor": "hsl(114, 70%, 50%)",
    "fries": 182,
    "friesColor": "hsl(64, 70%, 50%)",
    "donut": 9,
    "donutColor": "hsl(10, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 6,
    "hot dogColor": "hsl(278, 70%, 50%)",
    "burger": 19,
    "burgerColor": "hsl(76, 70%, 50%)",
    "sandwich": 28,
    "sandwichColor": "hsl(82, 70%, 50%)",
    "kebab": 91,
    "kebabColor": "hsl(356, 70%, 50%)",
    "fries": 159,
    "friesColor": "hsl(225, 70%, 50%)",
    "donut": 116,
    "donutColor": "hsl(325, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 11,
    "hot dogColor": "hsl(8, 70%, 50%)",
    "burger": 121,
    "burgerColor": "hsl(290, 70%, 50%)",
    "sandwich": 175,
    "sandwichColor": "hsl(297, 70%, 50%)",
    "kebab": 78,
    "kebabColor": "hsl(76, 70%, 50%)",
    "fries": 85,
    "friesColor": "hsl(99, 70%, 50%)",
    "donut": 10,
    "donutColor": "hsl(228, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 57,
    "hot dogColor": "hsl(146, 70%, 50%)",
    "burger": 84,
    "burgerColor": "hsl(346, 70%, 50%)",
    "sandwich": 193,
    "sandwichColor": "hsl(124, 70%, 50%)",
    "kebab": 81,
    "kebabColor": "hsl(287, 70%, 50%)",
    "fries": 176,
    "friesColor": "hsl(76, 70%, 50%)",
    "donut": 86,
    "donutColor": "hsl(252, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 142,
    "hot dogColor": "hsl(32, 70%, 50%)",
    "burger": 155,
    "burgerColor": "hsl(120, 70%, 50%)",
    "sandwich": 105,
    "sandwichColor": "hsl(255, 70%, 50%)",
    "kebab": 16,
    "kebabColor": "hsl(283, 70%, 50%)",
    "fries": 163,
    "friesColor": "hsl(326, 70%, 50%)",
    "donut": 56,
    "donutColor": "hsl(182, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 29,
    "hot dogColor": "hsl(84, 70%, 50%)",
    "burger": 182,
    "burgerColor": "hsl(228, 70%, 50%)",
    "sandwich": 184,
    "sandwichColor": "hsl(285, 70%, 50%)",
    "kebab": 41,
    "kebabColor": "hsl(326, 70%, 50%)",
    "fries": 83,
    "friesColor": "hsl(307, 70%, 50%)",
    "donut": 63,
    "donutColor": "hsl(18, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 187,
    "hot dogColor": "hsl(322, 70%, 50%)",
    "burger": 114,
    "burgerColor": "hsl(290, 70%, 50%)",
    "sandwich": 53,
    "sandwichColor": "hsl(248, 70%, 50%)",
    "kebab": 5,
    "kebabColor": "hsl(279, 70%, 50%)",
    "fries": 151,
    "friesColor": "hsl(141, 70%, 50%)",
    "donut": 137,
    "donutColor": "hsl(142, 70%, 50%)"
  }
]
 */

/**
 * const MyResponsiveBar = ({ data  }) => (
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)
 */
