import {
  Card,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useReducer } from 'react';
import { TbChartPie3, TbChartPie4 } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { logState, returnThemeColors } from '../../utils';
import { PageBuilder } from '../pageBuilder';
import { TextWrapper } from '../wrappers';
import { ResponsivePieChart } from './responsivePieChart';
import {
  displayStatisticsAction,
  displayStatisticsReducer,
  initialDisplayStatisticsState,
} from './state';
import { ChartKind, DisplayStatisticsProps, PieChartData } from './types';
import { COLORS_SWATCHES } from '../../constants/data';

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
    globalState: { width, padding, rowGap, themeObject },
  } = useGlobalState();

  const [
    openedStatisticsModal,
    { open: openStatisticsModal, close: closeStatisticsModal },
  ] = useDisclosure(false);

  // set initial data structure
  useEffect(() => {
    if (!surveys || !surveys.length) {
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
                      case '0': {
                        response = 'No response';
                        break;
                      }
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
    if (!surveys.length || !currentSelectedSurvey || !pieChartDataMap) {
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

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  /** ------------- begin conditional render ------------- */
  if (surveys.length === 0) {
    return (
      <Stack
        w="100%"
        p={padding}
        style={{
          borderBottom: borderColor,
        }}
      >
        <Title order={4}>Completed surveys</Title>
        <Text>Complete surveys to view statistics!</Text>
      </Stack>
    );
  }

  /** ------------- end conditional render ------------- */

  /** ------------- begin input creators ------------- */

  // loop through completed surveys and create cards to display statistics modal
  const completedSurveysCards = surveys.map((survey, idx) => {
    const { surveyTitle, _id } = survey;

    const createdCard = (
      <UnstyledButton
        aria-label={`View statistics for ${surveyTitle}`}
        onClick={() => {
          displayStatisticsDispatch({
            type: displayStatisticsAction.setCurrentSelectedSurvey,
            payload: survey,
          });
          openStatisticsModal();
        }}
      >
        <Card
          shadow="sm"
          padding={padding}
          radius="md"
          withBorder
          key={`${_id}-${idx}-${surveyTitle}`}
        >
          <Group position="apart" w="100%">
            <TbChartPie4 color="grey" />
            <TextWrapper creatorInfoObj={{}}>{surveyTitle}</TextWrapper>
          </Group>
        </Card>
      </UnstyledButton>
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
      <Title order={4} color="dark">
        Completed surveys
      </Title>
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

  const displayStatisticsComponent = (
    <Stack w="100%" h="100%">
      {displayCompletedSurveysCards}
      {createdSurveyStatisticModal}
    </Stack>
  );

  return displayStatisticsComponent;
}

export { DisplayStatistics };
