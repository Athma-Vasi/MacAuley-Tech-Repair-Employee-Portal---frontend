import {
  Accordion,
  Card,
  Divider,
  Flex,
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import { DashboardCardInfo, returnDashboardCardElement } from './jsxHelpers';
import { StatisticsObject } from './utils';

type DashboardMetricsLayoutProps<MetricObjKey extends string = string> = {
  barChart: React.JSX.Element;
  barChartYAxisSelectInput: React.JSX.Element;
  barChartHeading: string;
  borderColor: string;
  calendarChart?: React.JSX.Element;
  calendarChartYAxisSelectInput?: React.JSX.Element;
  calendarChartHeading?: string;
  expandChartButton: React.JSX.Element;
  isMoney?: boolean;
  lineChart: React.JSX.Element;
  lineChartYAxisSelectInput: React.JSX.Element;
  lineChartHeading: string;
  overviewCards: DashboardCardInfo[];
  padding: MantineNumberSize;
  pieChart?: React.JSX.Element;
  pieChartYAxisSelectInput?: React.JSX.Element;
  pieChartHeading?: string;
  sectionHeading: string;
  semanticLabel?: string;
  statisticsMap: Map<MetricObjKey, StatisticsObject>;
  width: number;
};

function DashboardMetricsLayout({
  barChart,
  barChartYAxisSelectInput,
  barChartHeading,
  borderColor,
  expandChartButton,
  isMoney = false,
  lineChart,
  lineChartYAxisSelectInput,
  lineChartHeading,
  overviewCards,
  padding,
  pieChart,
  pieChartYAxisSelectInput,
  pieChartHeading,
  sectionHeading,
  semanticLabel = 'customers',
  statisticsMap,
  width,
  calendarChart,
  calendarChartYAxisSelectInput,
  calendarChartHeading,
}: DashboardMetricsLayoutProps) {
  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight =
    width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = width < 1024 ? componentWidth : componentWidth * 0.75;
  const cardWidth = 350;

  const displayHeading = (
    <Divider
      variant="dashed"
      labelPosition="left"
      size="md"
      label={<Title order={3}>{sectionHeading}</Title>}
    />
  );

  // info cards section
  const createdCards = overviewCards.map((overviewCard, idx) => (
    <Group
      key={`${idx}-${overviewCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCardElement(overviewCard)}
    </Group>
  ));

  const displayCards = (
    <Stack pb={padding} style={{ borderBottom: borderColor }}>
      <Title order={4}>Summary</Title>
      <Group w="100%" spacing={padding}>
        {createdCards}
      </Group>
    </Stack>
  );

  // bar chart section
  const displayBarChartSection = (
    <Stack pb={padding} style={{ borderBottom: borderColor }} align="center">
      <Title order={4}>Bar Chart</Title>
      <Group w="100%" position="apart">
        {barChartYAxisSelectInput}
        {expandChartButton}
      </Group>
      <Group w="100%" position="center">
        <Text size="lg" weight={500}>
          {barChartHeading}
        </Text>
      </Group>
      <Group w="100%" position="center">
        {barChart}
      </Group>
    </Stack>
  );

  // calendar chart section
  const displayCalendarChartSection = calendarChart ? (
    <Stack pb={padding} style={{ borderBottom: borderColor }} align="center">
      <Title order={4}>Calendar Chart</Title>
      <Group w="100%" position="apart">
        {calendarChartYAxisSelectInput}
        {expandChartButton}
      </Group>
      <Group w="100%" position="center">
        <Text size="lg" weight={500}>
          {calendarChartHeading}
        </Text>
      </Group>
      <Group w="100%" position="center">
        {calendarChart}
      </Group>
    </Stack>
  ) : null;

  // line chart section
  const displayLineChartSection = (
    <Stack pb={padding} style={{ borderBottom: borderColor }} align="center">
      <Title order={4}>Line Chart</Title>
      <Group w="100%" position="apart">
        {lineChartYAxisSelectInput}
        {expandChartButton}
      </Group>
      <Group w="100%" position="center">
        <Text size="lg" weight={500}>
          {lineChartHeading}
        </Text>
      </Group>
      <Group w="100%" position="center">
        {lineChart}
      </Group>
    </Stack>
  );

  // pie chart section
  const pieChartHeadingSection = pieChartYAxisSelectInput ? (
    <Flex direction="column">
      <Group w="100%" position="apart">
        {pieChartYAxisSelectInput}
        {expandChartButton}
      </Group>
      <Group w="100%" position="center">
        <Text size="lg" weight={500}>
          {pieChartHeading}
        </Text>
      </Group>
    </Flex>
  ) : (
    <Flex direction="column">
      <Group w="100%" position="apart">
        <Text size="lg" weight={500}>
          {pieChartHeading}
        </Text>
        {expandChartButton}
      </Group>
    </Flex>
  );

  const displayPieChartSection = pieChart ? (
    <Stack pb={padding} style={{ borderBottom: borderColor }} align="center">
      <Title order={4}>Pie Chart</Title>
      {pieChartHeadingSection}
      <Group w="100%" position="center">
        {pieChart}
      </Group>
    </Stack>
  ) : null;

  // statistics section
  const createdStatisticsAccordions = Array.from(statisticsMap).map(
    ([key, statisticsObject], idx) => {
      const {
        arithmeticMean,
        interquartileRange,
        max,
        median,
        min,
        mode,
        standardDeviation,
      } = statisticsObject;

      const statisticsAccordion = (
        <Accordion
          w={350}
          key={`${idx}-${min}-${max}-${median}-${mode}-${arithmeticMean}-${interquartileRange}-${standardDeviation}`}
        >
          <Accordion.Item value={key}>
            <Accordion.Control>
              <Text weight={500} size="md">{`${key} ${semanticLabel}`}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" rowGap="xs">
                <Text>{`Min: ${isMoney ? '$' : ''} ${min.value.toFixed(
                  2
                )}`}</Text>
                <Text pl={padding}>{`Occurred: ${min.occurred}`}</Text>

                <Text>{`Max: ${isMoney ? '$' : ''} ${max.value.toFixed(
                  2
                )}`}</Text>
                <Text pl={padding}>{`Occurred: ${max.occurred}`}</Text>

                <Text>{`Median: ${isMoney ? '$' : ''} ${median.toFixed(
                  2
                )}`}</Text>

                <Text>{`Mode: ${isMoney ? '$' : ''} ${mode.toFixed(2)}`}</Text>

                <Text>{`Arithmetic Mean: ${
                  isMoney ? '$' : ''
                } ${arithmeticMean.toFixed(2)}`}</Text>

                <Text>{`Interquartile Range: ${
                  isMoney ? '$' : ''
                } ${interquartileRange.toFixed(2)}`}</Text>

                <Text>{`Standard Deviation: ${
                  isMoney ? '$' : ''
                } ${standardDeviation.toFixed(2)}`}</Text>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );

      return statisticsAccordion;
    }
  );

  const displayStatisticsSection = (
    <Stack w="100%" pb={padding} style={{ borderBottom: borderColor }}>
      <Group w="100%">
        <Title order={4}>Statistics</Title>
      </Group>
      <Group w="100%" align="baseline">
        {createdStatisticsAccordions}
      </Group>
    </Stack>
  );

  const displayDashboardMetricsLayout = (
    <Stack w="100%" spacing="xl">
      {displayHeading}
      {displayCards}
      {displayStatisticsSection}
      {displayPieChartSection}
      {displayBarChartSection}
      {displayLineChartSection}
      {displayCalendarChartSection}
    </Stack>
  );

  return displayDashboardMetricsLayout;
}

export default DashboardMetricsLayout;
