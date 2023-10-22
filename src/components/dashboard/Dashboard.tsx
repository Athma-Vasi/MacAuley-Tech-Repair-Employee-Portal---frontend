import { Button, Modal, ScrollArea, Stack, Text } from '@mantine/core';
import { useEffect } from 'react';

import { STORE_LOCATION_DATA } from '../../constants/data';
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
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  YEAR_TRANSACTIONS_SPREAD,
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
      daysPerMonth: DAYS_PER_MONTH,
      months: MONTHS,
      productCategories: PRODUCT_CATEGORIES,
      repairCategories: REPAIR_CATEGORIES,
      storeLocations: STORE_LOCATION_DATA,
      yearTransactionsSpread: YEAR_TRANSACTIONS_SPREAD,
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

  return displayCalendarChart;
}

export default Dashboard;
