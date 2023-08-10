import { Card, Flex, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useGlobalState } from '../../hooks';
import { logState } from '../../utils';
import { ResponsivePieChart } from './responsivePieChart';
import {
  displayStatisticsAction,
  displayStatisticsReducer,
  initialDisplayStatisticsState,
} from './state';
import { ChartKind, DisplayStatisticsProps, PieChartData } from './types';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { TbChartPie3 } from 'react-icons/tb';
import { TextWrapper } from '../wrappers';
import { PageBuilder } from '../pageBuilder';
import { useDisclosure } from '@mantine/hooks';

function DisplayStatistics({ surveys }: DisplayStatisticsProps) {
  const [displayStatisticsState, displayStatisticsDispatch] = useReducer(
    displayStatisticsReducer,
    initialDisplayStatisticsState
  );
  const {
    pieChartDataMap,
    chartKindsMap,
    chartTitlesMap,
    currentSelectedSurvey,
    modalPage,
    totalResponsesMap,
  } = displayStatisticsState;
  const {
    globalState: { width, height, padding, rowGap },
  } = useGlobalState();

  const [
    openedStatisticsModal,
    { open: openStatisticsModal, close: closeStatisticsModal },
  ] = useDisclosure(false);

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

  // loop through completed surveys and create cards to display statistics modal
  const completedSurveysCards = surveys.map((survey, idx) => {
    const { surveyTitle, _id } = survey;

    const createdViewModalButton = returnAccessibleButtonElements([
      {
        buttonLabel: 'View statistics',
        semanticDescription: 'View statistics for this completed survey',
        semanticName: 'View statistics',
        buttonOnClick: () => {
          displayStatisticsDispatch({
            type: displayStatisticsAction.setCurrentSelectedSurvey,
            payload: survey,
          });
        },
        leftIcon: <TbChartPie3 />,
      },
    ]);

    const createdCard = (
      <Card
        shadow="sm"
        padding={padding}
        radius="md"
        withBorder
        key={`${_id}-${idx}-${surveyTitle}`}
      >
        <Group position="apart" w="100%">
          <TextWrapper creatorInfoObj={{}}>{surveyTitle}</TextWrapper>
          {createdViewModalButton}
        </Group>
      </Card>
    );

    return createdCard;
  });

  const displayCompletedSurveysCards = (
    <Stack
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
      p={padding}
    >
      <Text size="md" color="dark">
        <strong>Completed surveys</strong>
      </Text>
      <Flex
        w="100%"
        align="center"
        justify="flex-start"
        wrap="wrap"
        rowGap={rowGap}
        columnGap={rowGap}
      >
        {completedSurveysCards}
      </Flex>
    </Stack>
  );

  const createdStatisticsSection = (
    <Stack w="100%">
      <Flex w="100%" align="center" justify="space-between" wrap="wrap">
        <Text color="dark" size="lg">
          {currentSelectedSurvey?.questions?.[modalPage]?.question}
        </Text>
        <PageBuilder
          total={currentSelectedSurvey?.questions?.length ?? 0}
          setModalPage={displayStatisticsAction.setModalPage}
          modalPageDispatch={displayStatisticsDispatch}
        />
      </Flex>
    </Stack>
  );

  const createdSurveyStatisticModal = (
    <Modal
      opened={openedStatisticsModal}
      onClose={closeStatisticsModal}
      title={currentSelectedSurvey?.surveyTitle}
      w={width * 0.75}
      h={height * 0.75}
    >
      <></>
    </Modal>
  );

  const testData =
    pieChartDataMap
      .get('64d1b31f255fd5fcf9d7e654')
      ?.get('How would you rate the communication skills of your manager?') ??
    [];

  const displayResponsivePieChart = (
    <Flex w="100%" h="100%" style={width < 1192 ? { overflowY: 'scroll' } : {}}>
      <ResponsivePieChart pieChartData={testData} />
      {/* {responsivePie} */}
    </Flex>
  );

  return displayCompletedSurveysCards;
}

export { DisplayStatistics };
