import {
  Divider,
  Grid,
  Group,
  MantineNumberSize,
  ScrollArea,
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
  scrollBarStyle: Record<string, any>;
  width: number;
};

function ChartAndControlsDisplay(
  props: ChartAndControlsDisplayProps
): React.JSX.Element {
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
    scrollBarStyle,
    width,
  } = props;

  const displayChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h={width < 1192 ? '38vh' : '70vh'} py={padding}>
        <Grid.Col span={1}>{chartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
  );

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
        {displayChartControls}
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
