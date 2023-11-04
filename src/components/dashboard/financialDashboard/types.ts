// import { ReturnDashboardFinancialCardInfoOutput } from '../jsxHelpers';
import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';
// import {
//   FinancialNewMapKey,
//   FinancialOverviewMapKey,
//   FinancialReturningMapKey,
//   FinancialMetricsCharts,
// } from './utils';

type YAxisFinancialChartSelection = {};
//   newYAxis: FinancialNewMapKey;
//   overviewYAxis: FinancialOverviewMapKey;
//   returningYAxis: FinancialReturningMapKey;
// };

type FinancialDashboardState = {
  //   customerChartsData: FinancialMetricsCharts | null;
  //   customerCardsInfo: ReturnDashboardFinancialCardInfoOutput | null;
  //   selectedCalendarView: DashboardCalendarView;
  //   selectedDate: string;
  //   selectedMonth: Month;
  //   selectedYear: Year;
  //   selectedStoreLocationView: BusinessMetricStoreLocation;
  //   selectedYYYYMMDD: string;
};

type FinancialDashboardAction = {
  //   setFinancialChartsData: 'setFinancialChartsData';
  //   setFinancialCardsInfo: 'setFinancialCardsInfo';
  //   setSelectedCalendarView: 'setSelectedCalendarView';
  //   setSelectedStoreLocationView: 'setSelectedStoreLocationView';
  //   setSelectedDate: 'setSelectedDate';
  //   setSelectedMonth: 'setSelectedMonth';
  //   setSelectedYear: 'setSelectedYear';
  //   setSelectedYYYYMMDD: 'setSelectedYYYYMMDD';
};

type FinancialDashboardDispatch = {};
//   | {
//       type: FinancialDashboardAction['setFinancialChartsData'];
//       payload: FinancialMetricsCharts;
//     }
//   | {
//       type: FinancialDashboardAction['setFinancialCardsInfo'];
//       payload: ReturnDashboardFinancialCardInfoOutput;
//     }
//   | {
//       type: FinancialDashboardAction['setSelectedCalendarView'];
//       payload: DashboardCalendarView;
//     }
//   | {
//       type: FinancialDashboardAction['setSelectedStoreLocationView'];
//       payload: BusinessMetricStoreLocation;
//     }
//   | {
//       type:
//         | FinancialDashboardAction['setSelectedDate']
//         | FinancialDashboardAction['setSelectedYYYYMMDD'];
//       payload: string;
//     }
//   | {
//       type: FinancialDashboardAction['setSelectedMonth'];
//       payload: Month;
//     }
//   | {
//       type: FinancialDashboardAction['setSelectedYear'];
//       payload: Year;
//     };

export type {
  FinancialDashboardAction,
  FinancialDashboardDispatch,
  FinancialDashboardState,
  DashboardCalendarView,
  YAxisFinancialChartSelection,
};
