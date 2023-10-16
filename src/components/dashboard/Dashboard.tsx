import { Button, Modal, ScrollArea, Stack } from '@mantine/core';
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
  ResponsiveRadialBarChart,
  ResponsiveSunburstChart,
} from '../charts';
import { useDisclosure } from '@mantine/hooks';

function Dashboard() {
  const [openedChartModal, { open: openChartModal, close: closeChartModal }] =
    useDisclosure(false);

  const displayPieChart = (
    <ResponsivePieChart
      pieChartData={[
        {
          id: 'php',
          label: 'php',
          value: 561,
        },
        {
          id: 'stylus',
          label: 'stylus',
          value: 124,
        },
        {
          id: 'sass',
          label: 'sass',
          value: 385,
        },
        {
          id: 'make',
          label: 'make',
          value: 239,
        },
        {
          id: 'python',
          label: 'python',
          value: 219,
        },
      ]}
    />
  );

  const displayBarChart = <ResponsiveBarChart />;
  const displayRadialBarChart = <ResponsiveRadialBarChart />;
  const displayLineChart = <ResponsiveLineChart />;
  const displaySunburstChart = <ResponsiveSunburstChart />;

  const displayModal = (
    <Modal
      centered
      opened={openedChartModal}
      onClose={closeChartModal}
      scrollAreaComponent={ScrollArea.Autosize}
      size="calc(100vw - 1rem)"
    >
      <Stack w="100%">
        {/* {displayPieChart} */}
        {displayBarChart}
        {/* {displayRadialBarChart} */}
        {/* {displayLineChart} */}
        {/* {displaySunburstChart} */}
      </Stack>
    </Modal>
  );

  return (
    <Stack>
      {/* {displayPieChart} */}
      {/* {displayBarChart} */}
      {/* {displayRadialBarChart} */}
      {/* {displayLineChart} */}
      <Button onClick={openChartModal}>Open Modal</Button>
      {displayBarChart}
      {displayModal}
    </Stack>
  );
}

export default Dashboard;
