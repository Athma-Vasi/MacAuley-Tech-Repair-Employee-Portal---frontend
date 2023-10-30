import { Card, Group, Stack, Text, Title } from '@mantine/core';

import { DashboardCardInfo, returnDashboardCard } from './jsxHelpers';

type DashboardSectionProps = {
  chartCarousel: React.JSX.Element;
  heading: string;
  overviewCards: DashboardCardInfo[];
  pieChart: React.JSX.Element;
  pieChartHeading: string;
  width: number;
};

function DashboardSection({
  chartCarousel,
  heading,
  overviewCards,
  pieChart,
  pieChartHeading,
  width,
}: DashboardSectionProps) {
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
  const cardWidth = chartWidth / 2;

  const displayHeading = <Title order={4}>{heading}</Title>;

  const createdCards = overviewCards.map((overviewCard, idx) => (
    <Group
      key={`${idx}-${overviewCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(overviewCard)}
    </Group>
  ));
  const displayCards = <Stack>{createdCards}</Stack>;

  const displayPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">{pieChartHeading}</Text>
    </Group>
  );

  const displayPieChart = (
    <Card shadow="sm" radius="md" withBorder w={chartWidth}>
      <Card.Section>{pieChart}</Card.Section>
    </Card>
  );

  const displayCardsAndPieChart = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayCards}
      <Stack>
        {displayPieChartHeading}
        {displayPieChart}
      </Stack>
    </Group>
  );

  const displayDashboardSection = (
    <Stack w="100%">
      {displayHeading}
      {displayCardsAndPieChart}
      {chartCarousel}
    </Stack>
  );

  return displayDashboardSection;
}

export default DashboardSection;
