import { Flex } from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { useReducer } from 'react';
import {
  displayStatisticsReducer,
  initialDisplayStatisticsState,
} from './state';
import { DisplayStatisticsProps } from './types';

function DisplayStatistics({ surveyStatistics }: DisplayStatisticsProps) {
  const [displayStatisticsState, displayStatisticsDispatch] = useReducer(
    displayStatisticsReducer,
    initialDisplayStatisticsState
  );
  const { chartData, chartKind, chartTitle } = displayStatisticsState;

  const data = [
    {
      id: 'make',
      label: 'make',
      value: 415,
      //   color: 'hsl(358, 70%, 50%)',
    },
    {
      id: 'hack',
      label: 'hack',
      value: 352,
      //   color: 'hsl(52, 70%, 50%)',
    },
    {
      id: 'haskell',
      label: 'haskell',
      value: 28,
      //   color: 'hsl(124, 70%, 50%)',
    },
    {
      id: 'scala',
      label: 'scala',
      value: 255,
      //   color: 'hsl(106, 70%, 50%)',
    },
    {
      id: 'elixir',
      label: 'elixir',
      value: 356,
      //   color: 'hsl(199, 70%, 50%)',
    },
  ];

  const responsivePie = (
    <ResponsivePie
      onClick={(event) => console.log(event)}
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-180}
      innerRadius={0.45}
      padAngle={3}
      cornerRadius={4}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'green_blue' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
  return (
    <Flex w="100%" h="100vh">
      {responsivePie}
    </Flex>
  );
}

export { DisplayStatistics };
