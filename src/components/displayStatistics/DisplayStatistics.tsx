import { Card, Flex, Group, Modal, Stack, Text, Title } from '@mantine/core';
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
    totalResponsesMap,
    currentSelectedSurvey,
    currentlySelectedPieChartData,
    modalPage,
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

  // set currently selected survey's question's pie chart data
  useEffect(() => {
    if (!surveys || !currentSelectedSurvey || !pieChartDataMap) {
      return;
    }

    const { _id } = currentSelectedSurvey;
    const currentlySelectedSurveyPieChartData = pieChartDataMap.get(_id);
    if (!currentlySelectedSurveyPieChartData) {
      return;
    }

    const currentlySelectedSurveyQuestion =
      chartTitlesMap.get(_id)?.[modalPage - 1];
    if (!currentlySelectedSurveyQuestion) {
      return;
    }

    const currentlySelectedPieChartData =
      currentlySelectedSurveyPieChartData.get(currentlySelectedSurveyQuestion);
    if (!currentlySelectedPieChartData) {
      return;
    }

    displayStatisticsDispatch({
      type: 'setCurrentlySelectedPieChartData',
      payload: currentlySelectedPieChartData,
    });
  }, [
    chartTitlesMap,
    currentSelectedSurvey,
    modalPage,
    pieChartDataMap,
    surveys,
  ]);

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
          openStatisticsModal();
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

  const createdModalHeadingSection = (
    <Stack w="100%">
      <Flex
        w="100%"
        align="center"
        justify="space-between"
        wrap="wrap"
        // style={{ outline: '1px solid violet' }}
        rowGap={rowGap}
      >
        <Group w="100%" position="apart">
          <Group position="left">
            <Title order={4} color="dark">
              {currentSelectedSurvey?.surveyTitle ?? ''}
            </Title>
          </Group>
          <Group position="right">
            <PageBuilder
              total={currentSelectedSurvey?.questions?.length ?? 0}
              setModalPage={displayStatisticsAction.setModalPage}
              modalPageDispatch={displayStatisticsDispatch}
            />
          </Group>
        </Group>

        <Group
          w="100%"
          position="apart"
          style={{ borderBottom: '1px solid #e0e0e0' }}
          pb={padding}
        >
          <Group
            // w="100%"
            position="left"
            align="center"
          >
            <Text color="dark" size="md">
              Question:{' '}
            </Text>
            <Text color="dark" size="md">
              {currentSelectedSurvey?.questions?.[modalPage - 1]?.question}
            </Text>
          </Group>

          {/* total responses */}
          <Group
            // w="100%"
            position="left"
            align="center"
          >
            <Text color="dark" size="md">
              Total responses:{' '}
            </Text>
            <Text color="dark" size="md">
              {totalResponsesMap
                .get(currentSelectedSurvey?._id ?? '')
                ?.get(
                  currentSelectedSurvey?.questions?.[modalPage - 1]?.question ??
                    ''
                ) ?? 0}
            </Text>
          </Group>
        </Group>
      </Flex>
    </Stack>
  );

  const displayResponsivePieChart = (
    <Flex
      w="100%"
      h="100%"
      py={padding}
      style={width < 1192 ? { overflowY: 'scroll' } : {}}
    >
      <ResponsivePieChart pieChartData={currentlySelectedPieChartData ?? []} />
    </Flex>
  );

  const createdSurveyStatisticModal = (
    <Modal
      opened={openedStatisticsModal}
      onClose={closeStatisticsModal}
      centered
      size="calc(100vw - 2rem)"
    >
      {createdModalHeadingSection}
      {displayResponsivePieChart}
    </Modal>
  );

  const testData =
    pieChartDataMap
      .get('64d1b31f255fd5fcf9d7e654')
      ?.get('How would you rate the communication skills of your manager?') ??
    [];

  const displayStatisticsComponent = (
    <Stack w="100%" h="100%">
      {displayCompletedSurveysCards}
      {createdSurveyStatisticModal}
    </Stack>
  );

  return displayStatisticsComponent;
}

export { DisplayStatistics };
