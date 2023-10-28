import { SelectedCustomerMetrics } from './utils';

type DashboardCalendarView = 'Yearly' | 'Monthly' | 'Daily';

type CustomerDashboardState = {
  selectedCustomerMetrics: SelectedCustomerMetrics;
  selectedCalendarView: DashboardCalendarView;
};

type CustomerDashboardAction = {
  setSelectedCustomerMetrics: 'setSelectedCustomerMetrics';
  setSelectedCalendarView: 'setSelectedCalendarView';
};

type CustomerDashboardDispatch =
  | {
      type: CustomerDashboardAction['setSelectedCustomerMetrics'];
      payload: SelectedCustomerMetrics;
    }
  | {
      type: CustomerDashboardAction['setSelectedCalendarView'];
      payload: DashboardCalendarView;
    };

export type {
  CustomerDashboardAction,
  CustomerDashboardDispatch,
  CustomerDashboardState,
  DashboardCalendarView,
};
