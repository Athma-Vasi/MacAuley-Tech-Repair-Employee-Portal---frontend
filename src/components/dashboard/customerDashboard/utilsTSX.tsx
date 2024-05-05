import { MantineNumberSize } from "@mantine/core";

import {
  createDashboardMetricsCards,
  CreateDashboardMetricsCardsInput,
  DashboardCardInfo,
} from "../utilsTSX";
import { SelectedDateCustomerMetrics } from "./utils";

type CreateCustomerMetricsCardsInput = {
  greenColorShade: string;
  padding: MantineNumberSize;
  redColorShade: string;
  selectedDateCustomerMetrics: SelectedDateCustomerMetrics;
  width: number;
};

type CustomerMetricsCards = {
  dailyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
  };
  monthlyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
    churnRate: DashboardCardInfo[];
    retentionRate: DashboardCardInfo[];
  };
  yearlyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
    churnRate: DashboardCardInfo[];
    retentionRate: DashboardCardInfo[];
  };
};

function createCustomerMetricsCards({
  greenColorShade,
  padding,
  redColorShade,
  selectedDateCustomerMetrics,
  width,
}: CreateCustomerMetricsCardsInput): Promise<CustomerMetricsCards> {
  const {
    dayCustomerMetrics: { prevDayMetrics, selectedDayMetrics },
    monthCustomerMetrics: { prevMonthMetrics, selectedMonthMetrics },
    yearCustomerMetrics: { prevYearMetrics, selectedYearMetrics },
  } = selectedDateCustomerMetrics;

  if (
    !selectedYearMetrics ||
    !prevYearMetrics ||
    !selectedMonthMetrics ||
    !prevMonthMetrics ||
    !selectedDayMetrics ||
    !prevDayMetrics
  ) {
    return new Promise<CustomerMetricsCards>((resolve) => {
      resolve({
        dailyCards: {
          overview: [],
          new: [],
          returning: [],
        },
        monthlyCards: {
          overview: [],
          new: [],
          returning: [],
          churnRate: [],
          retentionRate: [],
        },
        yearlyCards: {
          overview: [],
          new: [],
          returning: [],
          churnRate: [],
          retentionRate: [],
        },
      });
    });
  }

  return new Promise<CustomerMetricsCards>((resolve) => {
    setTimeout(() => {
      const currentYear = selectedYearMetrics.year;
      const prevYear = prevYearMetrics.year;
      const currentMonth = selectedMonthMetrics.month;
      const prevMonth = prevMonthMetrics.month;
      const prevDay = prevDayMetrics.day;

      const DASHBOARD_CARD_INFO_INPUT_TEMPLATE: CreateDashboardMetricsCardsInput = {
        currentMonth,
        currentYear,
        greenColorShade,
        heading: "Total",
        kind: "day",
        padding,
        prevDay,
        prevMonth,
        prevValue: 1,
        prevYear,
        redColorShade,
        selectedValue: 1,
        width,
      };

      // daily

      // daily -> overview

      const dayTotalCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total",
        kind: "day",
        prevValue: prevDayMetrics.customers.total,
        selectedValue: selectedDayMetrics.customers.total,
      });

      const dayTotalNewCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total New",
        kind: "day",
        prevValue: prevDayMetrics.customers.new.total,
        selectedValue: selectedDayMetrics.customers.new.total,
      });

      const dayTotalReturningCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total Returning",
        kind: "day",
        prevValue: prevDayMetrics.customers.returning.total,
        selectedValue: selectedDayMetrics.customers.returning.total,
      });

      // daily -> new

      // daily new total already created above

      const dayTotalNewRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "day",
        prevValue: prevDayMetrics.customers.new.repair,
        selectedValue: selectedDayMetrics.customers.new.repair,
      });

      const dayTotalNewSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "day",
        prevValue: prevDayMetrics.customers.new.sales.total,
        selectedValue: selectedDayMetrics.customers.new.sales.total,
      });

      const dayTotalNewSalesOnlineCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales Online",
        kind: "day",
        prevValue: prevDayMetrics.customers.new.sales.online,
        selectedValue: selectedDayMetrics.customers.new.sales.online,
      });

      const dayTotalNewSalesInStoreCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales In-Store",
        kind: "day",
        prevValue: prevDayMetrics.customers.new.sales.inStore,
        selectedValue: selectedDayMetrics.customers.new.sales.inStore,
      });

      // daily -> returning

      // daily returning total already created above

      const dayTotalReturningRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "day",
        prevValue: prevDayMetrics.customers.returning.repair,
        selectedValue: selectedDayMetrics.customers.returning.repair,
      });

      const dayTotalReturningSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "day",
        prevValue: prevDayMetrics.customers.returning.sales.total,
        selectedValue: selectedDayMetrics.customers.returning.sales.total,
      });

      const dayTotalReturningSalesOnlineCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales Online",
        kind: "day",
        prevValue: prevDayMetrics.customers.returning.sales.online,
        selectedValue: selectedDayMetrics.customers.returning.sales.online,
      });

      const dayTotalReturningSalesInStoreCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales In-Store",
        kind: "day",
        prevValue: prevDayMetrics.customers.returning.sales.inStore,
        selectedValue: selectedDayMetrics.customers.returning.sales.inStore,
      });

      // month

      // month -> overview

      const monthTotalCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total",
        kind: "month",
        prevValue: prevMonthMetrics.customers.total,
        selectedValue: selectedMonthMetrics.customers.total,
      });

      const monthTotalNewCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total New",
        kind: "month",
        prevValue: prevMonthMetrics.customers.new.total,
        selectedValue: selectedMonthMetrics.customers.new.total,
      });

      const monthTotalReturningCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total Returning",
        kind: "month",
        prevValue: prevMonthMetrics.customers.returning.total,
        selectedValue: selectedMonthMetrics.customers.returning.total,
      });

      // month -> new

      // month new total already created above

      const monthTotalNewRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "month",
        prevValue: prevMonthMetrics.customers.new.repair,
        selectedValue: selectedMonthMetrics.customers.new.repair,
      });

      const monthTotalNewSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "month",
        prevValue: prevMonthMetrics.customers.new.sales.total,
        selectedValue: selectedMonthMetrics.customers.new.sales.total,
      });

      const monthTotalNewSalesOnlineCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales Online",
        kind: "month",
        prevValue: prevMonthMetrics.customers.new.sales.online,
        selectedValue: selectedMonthMetrics.customers.new.sales.online,
      });

      const monthTotalNewSalesInStoreCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales In-Store",
        kind: "month",
        prevValue: prevMonthMetrics.customers.new.sales.inStore,
        selectedValue: selectedMonthMetrics.customers.new.sales.inStore,
      });

      // month -> returning

      // month returning total already created above

      const monthTotalReturningRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "month",
        prevValue: prevMonthMetrics.customers.returning.repair,
        selectedValue: selectedMonthMetrics.customers.returning.repair,
      });

      const monthTotalReturningSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "month",
        prevValue: prevMonthMetrics.customers.returning.sales.total,
        selectedValue: selectedMonthMetrics.customers.returning.sales.total,
      });

      const monthTotalReturningSalesOnlineCustomersCardInfo = createDashboardMetricsCards(
        {
          ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
          heading: "Sales Online",
          kind: "month",
          prevValue: prevMonthMetrics.customers.returning.sales.online,
          selectedValue: selectedMonthMetrics.customers.returning.sales.online,
        }
      );

      const monthTotalReturningSalesInStoreCustomersCardInfo =
        createDashboardMetricsCards({
          ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
          heading: "Sales In-Store",
          kind: "month",
          prevValue: prevMonthMetrics.customers.returning.sales.inStore,
          selectedValue: selectedMonthMetrics.customers.returning.sales.inStore,
        });

      // month -> churn rate
      const monthChurnRateCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Churn Rate",
        isFlipColor: true,
        kind: "month",
        prevValue: prevMonthMetrics.customers.churnRate,
        selectedValue: selectedMonthMetrics.customers.churnRate,
      });

      // month -> retention rate
      const monthRetentionRateCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Retention Rate",
        kind: "month",
        prevValue: prevMonthMetrics.customers.retentionRate,
        selectedValue: selectedMonthMetrics.customers.retentionRate,
      });

      // year

      // year -> overview

      const yearTotalCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total",
        kind: "year",
        prevValue: prevYearMetrics.customers.total,
        selectedValue: selectedYearMetrics.customers.total,
      });

      const yearTotalNewCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total New",
        kind: "year",
        prevValue: prevYearMetrics.customers.new.total,
        selectedValue: selectedYearMetrics.customers.new.total,
      });

      const yearTotalReturningCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Total Returning",
        kind: "year",
        prevValue: prevYearMetrics.customers.returning.total,
        selectedValue: selectedYearMetrics.customers.returning.total,
      });

      // year -> new

      // year new total already created above

      const yearTotalNewRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "year",
        prevValue: prevYearMetrics.customers.new.repair,
        selectedValue: selectedYearMetrics.customers.new.repair,
      });

      const yearTotalNewSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "year",
        prevValue: prevYearMetrics.customers.new.sales.total,
        selectedValue: selectedYearMetrics.customers.new.sales.total,
      });

      const yearTotalNewSalesOnlineCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales Online",
        kind: "year",
        prevValue: prevYearMetrics.customers.new.sales.online,
        selectedValue: selectedYearMetrics.customers.new.sales.online,
      });

      const yearTotalNewSalesInStoreCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales In-Store",
        kind: "year",
        prevValue: prevYearMetrics.customers.new.sales.inStore,
        selectedValue: selectedYearMetrics.customers.new.sales.inStore,
      });

      // year -> returning

      // year returning total already created above

      const yearTotalReturningRepairCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Repair",
        kind: "year",
        prevValue: prevYearMetrics.customers.returning.repair,
        selectedValue: selectedYearMetrics.customers.returning.repair,
      });

      const yearTotalReturningSalesCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales",
        kind: "year",
        prevValue: prevYearMetrics.customers.returning.sales.total,
        selectedValue: selectedYearMetrics.customers.returning.sales.total,
      });

      const yearTotalReturningSalesOnlineCustomersCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Sales Online",
        kind: "year",
        prevValue: prevYearMetrics.customers.returning.sales.online,
        selectedValue: selectedYearMetrics.customers.returning.sales.online,
      });

      const yearTotalReturningSalesInStoreCustomersCardInfo = createDashboardMetricsCards(
        {
          ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
          heading: "Sales In-Store",
          kind: "year",
          prevValue: prevYearMetrics.customers.returning.sales.inStore,
          selectedValue: selectedYearMetrics.customers.returning.sales.inStore,
        }
      );

      // year -> churn rate
      const yearChurnRateCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Churn Rate",
        isFlipColor: true,
        kind: "year",
        prevValue: prevYearMetrics.customers.churnRate,
        selectedValue: selectedYearMetrics.customers.churnRate,
      });

      // year -> retention rate
      const yearRetentionRateCardInfo = createDashboardMetricsCards({
        ...DASHBOARD_CARD_INFO_INPUT_TEMPLATE,
        heading: "Retention Rate",
        kind: "year",
        prevValue: prevYearMetrics.customers.retentionRate,
        selectedValue: selectedYearMetrics.customers.retentionRate,
      });

      resolve({
        dailyCards: {
          overview: [
            dayTotalCustomersCardInfo,
            dayTotalNewCustomersCardInfo,
            dayTotalReturningCustomersCardInfo,
          ],
          new: [
            dayTotalNewCustomersCardInfo,
            dayTotalNewRepairCustomersCardInfo,
            dayTotalNewSalesCustomersCardInfo,
            dayTotalNewSalesOnlineCustomersCardInfo,
            dayTotalNewSalesInStoreCustomersCardInfo,
          ],
          returning: [
            dayTotalReturningCustomersCardInfo,
            dayTotalReturningRepairCustomersCardInfo,
            dayTotalReturningSalesCustomersCardInfo,
            dayTotalReturningSalesOnlineCustomersCardInfo,
            dayTotalReturningSalesInStoreCustomersCardInfo,
          ],
        },
        monthlyCards: {
          overview: [
            monthTotalCustomersCardInfo,
            monthTotalNewCustomersCardInfo,
            monthTotalReturningCustomersCardInfo,
          ],
          new: [
            monthTotalNewCustomersCardInfo,
            monthTotalNewRepairCustomersCardInfo,
            monthTotalNewSalesCustomersCardInfo,
            monthTotalNewSalesOnlineCustomersCardInfo,
            monthTotalNewSalesInStoreCustomersCardInfo,
          ],
          returning: [
            monthTotalReturningCustomersCardInfo,
            monthTotalReturningRepairCustomersCardInfo,
            monthTotalReturningSalesCustomersCardInfo,
            monthTotalReturningSalesOnlineCustomersCardInfo,
            monthTotalReturningSalesInStoreCustomersCardInfo,
          ],
          churnRate: [monthChurnRateCardInfo],
          retentionRate: [monthRetentionRateCardInfo],
        },
        yearlyCards: {
          overview: [
            yearTotalCustomersCardInfo,
            yearTotalNewCustomersCardInfo,
            yearTotalReturningCustomersCardInfo,
          ],
          new: [
            yearTotalNewCustomersCardInfo,
            yearTotalNewRepairCustomersCardInfo,
            yearTotalNewSalesCustomersCardInfo,
            yearTotalNewSalesOnlineCustomersCardInfo,
            yearTotalNewSalesInStoreCustomersCardInfo,
          ],
          returning: [
            yearTotalReturningCustomersCardInfo,
            yearTotalReturningRepairCustomersCardInfo,
            yearTotalReturningSalesCustomersCardInfo,
            yearTotalReturningSalesOnlineCustomersCardInfo,
            yearTotalReturningSalesInStoreCustomersCardInfo,
          ],
          churnRate: [yearChurnRateCardInfo],
          retentionRate: [yearRetentionRateCardInfo],
        },
      });
    }, 0);
  });
}

export { createCustomerMetricsCards };
export type { CustomerMetricsCards };
