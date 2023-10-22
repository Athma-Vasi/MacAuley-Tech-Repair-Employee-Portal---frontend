import { Button, Modal, ScrollArea, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';

import { STORE_LOCATION_DATA } from '../../constants/data';
import { returnDaysInMonthsInYears } from '../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
  ResponsiveRadialBarChart,
  ResponsiveSunburstChart,
} from '../charts';
import {
  addFieldsToSalesData,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
} from './constants';

function Dashboard() {
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
      hideControls={true}
    />
  );

  const displayBarChart = <ResponsiveBarChart barChartData={[]} />;
  const displayRadialBarChart = <ResponsiveRadialBarChart />;
  const displayLineChart = <ResponsiveLineChart />;
  const displayCalendarChart = <ResponsiveCalendarChart />;
  const displaySunburstChart = <ResponsiveSunburstChart />;

  useEffect(() => {
    const salesDataWithFields = addFieldsToSalesData({
      productCategories: PRODUCT_CATEGORIES,
      repairCategories: REPAIR_CATEGORIES,
      storeLocations: STORE_LOCATION_DATA,
    });
    console.log(salesDataWithFields);
    //
    // console.log(
    //   returnDaysInMonthsInYears({
    //     yearEnd: 2021,
    //     yearStart: 2015,
    //   })
    // );
  });

  return displayPieChart;
}

export default Dashboard;
