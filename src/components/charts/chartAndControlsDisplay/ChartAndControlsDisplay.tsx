import {
  Divider,
  Grid,
  Group,
  MantineNumberSize,
  Space,
  Title,
  TitleOrder,
} from '@mantine/core';
import { NivoChartTitlePosition } from '../types';

type ChartAndControlsDisplayProps = {
  chartControlsStack: React.JSX.Element;
  chartRef: React.MutableRefObject<null>;
  chartTitle: string;
  chartTitleColor: string;
  chartTitlePosition: NivoChartTitlePosition;
  chartTitleSize: TitleOrder;
  height?: number;
  padding: MantineNumberSize;
  responsiveChart: React.JSX.Element;
  width: number;
};

function ChartAndControlsDisplay(props: ChartAndControlsDisplayProps) {
  const {
    chartControlsStack,
    chartRef,
    chartTitle,
    chartTitleColor,
    chartTitlePosition,
    chartTitleSize,
    height,
    padding,
    responsiveChart,
    width,
  } = props;

  const displayChartTitle = (
    <Group w="100%" position={chartTitlePosition} px={padding}>
      <Title order={chartTitleSize} color={chartTitleColor}>
        {chartTitle}
      </Title>
    </Group>
  );

  const displayChartAndControls = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {chartControlsStack}
      </Grid.Col>

      <Grid.Col span={1}>
        {width < 1192 ? <Space h="md" /> : <Space w="md" />}
        <Divider
          orientation={width < 1192 ? 'horizontal' : 'vertical'}
          size="sm"
          w="100%"
          h="100%"
        />
      </Grid.Col>

      <Grid.Col span={width < 1192 ? 1 : 9} h="70vh" ref={chartRef} p="xl">
        {displayChartTitle}
        {responsiveChart}
      </Grid.Col>
    </Grid>
  );

  return displayChartAndControls;
}

export { ChartAndControlsDisplay };
