function ResponsiveBarChart() {
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
