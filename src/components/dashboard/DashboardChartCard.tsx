import { Card, Group, MantineNumberSize } from '@mantine/core';
import { PieChartData } from '../displayStatistics/types';
import { ResponsivePieChart } from '../charts';
import { useGlobalState } from '../../hooks';

function DashboardChartCard({
  cardContent,
  pieChartData,
}: {
  cardContent: React.JSX.Element;
  pieChartData: PieChartData[];
}) {
  const {
    globalState: { width, padding },
  } = useGlobalState();

  const cardWidth =
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

  const createdChartCard = (
    <Card shadow="sm" padding={padding} radius="md" withBorder w={cardWidth}>
      <Card.Section>
        <ResponsivePieChart pieChartData={pieChartData} hideControls />
      </Card.Section>

      {cardContent}
    </Card>
  );

  return createdChartCard;
}

export { DashboardChartCard };
