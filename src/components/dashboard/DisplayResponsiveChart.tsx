import { Stack, Text } from '@mantine/core';

import { useGlobalState } from '../../hooks';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../charts';

function DisplayResponsiveChart() {
  const {
    globalState: { customizeChartsPageData, width, padding },
  } = useGlobalState();

  if (!customizeChartsPageData) {
    return null;
  }

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
  const chartWidth = componentWidth;

  const { chartData, chartKind, chartTitle, selectedYYYYMMDD } =
    customizeChartsPageData;

  const barChartIndexBy =
    chartKind === 'bar'
      ? Object.keys(chartData[0]).filter(
          (key) => key === 'Days' || key === 'Month' || key === 'Years'
        )[0]
      : '';

  const barChartKeys = Object.keys(chartData[0]).filter(
    (key) => key !== 'Days' && key !== 'Month' && key !== 'Years'
  );

  let [year, month, day] = selectedYYYYMMDD?.split('-') ?? ['2021', '01', '01'];
  month = month.padStart(2, '0');
  day = day.padStart(2, '0');

  console.log('selectedYYYYMMDD', selectedYYYYMMDD);

  const xFormatLineChart =
    barChartIndexBy === 'Days'
      ? (x: string) => `Day - ${x}`
      : barChartIndexBy === 'Months'
      ? () => ''
      : (x: string) => `Year - ${x}`;

  const lineChartKey = Object.keys(chartData[0])[0];
  const percentageSets = new Set([
    'netProfitMargin',
    'churnRate',
    'retentionRate',
  ]);
  const unitlessSets = new Set(['unitsSold', 'unitsRepaired']);
  const yFormatLineChart = percentageSets.has(lineChartKey)
    ? (y: number) => `${y}%`
    : unitlessSets.has(lineChartKey)
    ? (y: number) => `${y}`
    : (y: number) => `$${y}`;

  const displayResponsiveChart =
    chartKind === 'bar' ? (
      <ResponsiveBarChart
        barChartData={chartData}
        dashboardChartTitle={chartTitle}
        indexBy={barChartIndexBy}
        keys={barChartKeys}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
      />
    ) : chartKind === 'calendar' ? (
      <ResponsiveCalendarChart
        calendarChartData={chartData}
        dashboardChartTitle={chartTitle}
        from={`${year}-${month}-01`}
        to={`${year}-${month}-${day}`}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
      />
    ) : chartKind === 'line' ? (
      <ResponsiveLineChart
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dashboardChartTitle={chartTitle}
        lineChartData={chartData}
        xFormat={xFormatLineChart}
        yFormat={yFormatLineChart}
      />
    ) : chartKind === 'pie' ? (
      <ResponsivePieChart
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dashboardChartTitle={chartTitle}
        pieChartData={chartData}
      />
    ) : null;

  return (
    <Stack w="100%" p={padding}>
      <Text>{chartTitle}</Text>
      {displayResponsiveChart}
    </Stack>
  );
}

export default DisplayResponsiveChart;
