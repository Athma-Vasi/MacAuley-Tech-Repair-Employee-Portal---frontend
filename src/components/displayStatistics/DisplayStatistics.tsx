import { Flex } from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { useEffect, useReducer } from 'react';

import { logState } from '../../utils';
import {
  displayStatisticsReducer,
  initialDisplayStatisticsState,
} from './state';
import {
  ChartData,
  ChartKind,
  DisplayStatisticsProps,
  PieChartData,
} from './types';
import { ResponsivePieChart } from './responsivePieChart';
import { useGlobalState } from '../../hooks';

function DisplayStatistics({ surveys }: DisplayStatisticsProps) {
  const [displayStatisticsState, displayStatisticsDispatch] = useReducer(
    displayStatisticsReducer,
    initialDisplayStatisticsState
  );
  const { pieChartDataMap, chartKindsMap, chartTitlesMap } =
    displayStatisticsState;
  const {
    globalState: { width },
  } = useGlobalState();

  // set initial data structure
  useEffect(() => {
    if (!surveys) {
      return;
    }

    const [pieChartDataMap, chartKindsMap, chartTitlesMap, totalResponsesMap] =
      surveys.reduce(
        (
          [pieChartDataMap, chartKindsMap, chartTitlesMap, totalResponsesMap]: [
            Map<string, Map<string, PieChartData[]>>,
            Map<string, Map<string, ChartKind>>,
            Map<string, string[]>,
            Map<string, Map<string, number>>
          ],
          survey
        ) => {
          const { _id, surveyStatistics } = survey;

          pieChartDataMap.set(_id, new Map());
          chartKindsMap.set(_id, new Map());
          chartTitlesMap.set(_id, []);
          totalResponsesMap.set(_id, new Map());

          surveyStatistics.forEach((surveyStatistic) => {
            const {
              question,
              responseDistribution,
              totalResponses,
              responseInput,
            } = surveyStatistic;

            const chartDataArray = Object.entries(responseDistribution).map(
              ([response, count]) => {
                switch (responseInput) {
                  case 'emotion': {
                    switch (response) {
                      case '1': {
                        response = 'Devastated';
                        break;
                      }
                      case '2': {
                        response = 'Annoyed';
                        break;
                      }
                      case '3': {
                        response = 'Neutral';
                        break;
                      }
                      case '4': {
                        response = 'Happy';
                        break;
                      }
                      case '5': {
                        response = 'Ecstatic';
                        break;
                      }
                      default:
                        break;
                    }

                    break;
                  }
                  case 'stars': {
                    switch (response) {
                      case '1': {
                        response = '1 Star';
                        break;
                      }
                      case '2': {
                        response = '2 Stars';
                        break;
                      }
                      case '3': {
                        response = '3 Stars';
                        break;
                      }
                      case '4': {
                        response = '4 Stars';
                        break;
                      }
                      case '5': {
                        response = '5 Stars';
                        break;
                      }
                      default:
                        break;
                    }

                    break;
                  }
                }

                const chartData: PieChartData = {
                  id: response,
                  label: response,
                  value: count,
                };

                return chartData;
              }
            );
            pieChartDataMap.get(_id)?.set(question, chartDataArray);

            chartKindsMap.get(_id)?.set(question, 'pie');
            chartTitlesMap.get(_id)?.push(question);
            totalResponsesMap.get(_id)?.set(question, totalResponses);
          });

          return [
            pieChartDataMap,
            chartKindsMap,
            chartTitlesMap,
            totalResponsesMap,
          ];
        },
        [new Map(), new Map(), new Map(), new Map()]
      );

    displayStatisticsDispatch({
      type: 'setPieChartDataMap',
      payload: pieChartDataMap,
    });
    displayStatisticsDispatch({
      type: 'setChartKindsMap',
      payload: chartKindsMap,
    });
    displayStatisticsDispatch({
      type: 'setChartTitlesMap',
      payload: chartTitlesMap,
    });
    displayStatisticsDispatch({
      type: 'setTotalResponsesMap',
      payload: totalResponsesMap,
    });
  }, [surveys]);

  useEffect(() => {
    logState({
      state: displayStatisticsState,
      groupLabel: 'DisplayStatistics',
    });
  }, [displayStatisticsState]);

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

  const testData =
    pieChartDataMap
      .get('64d1b31f255fd5fcf9d7e654')
      ?.get('How would you rate the communication skills of your manager?') ??
    [];

  return (
    <Flex w="100%" h="100%" style={width < 1192 ? { overflowY: 'scroll' } : {}}>
      <ResponsivePieChart pieChartData={testData} />
      {/* {responsivePie} */}
    </Flex>
  );
}

export { DisplayStatistics };
