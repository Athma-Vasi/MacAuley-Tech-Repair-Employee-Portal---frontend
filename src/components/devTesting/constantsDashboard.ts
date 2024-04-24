import {
  BusinessMetric,
  DailyFinancialMetric,
  LocationYearSpread,
  MonthlyFinancialMetric,
  YearlyFinancialMetric,
} from "../dashboard/types";

/**
 * - random daily unitsSold spread between [min, max] per year
 */
const YEAR_UNITS_SOLD_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [1, 2],
    "2014": [2, 3],
    "2015": [2, 5],
    "2016": [3, 7],
    "2017": [5, 9],
    "2018": [5, 11],
    "2019": [7, 13],
    "2020": [15, 17],
    "2021": [17, 19],
    "2022": [17, 19],
    "2023": [13, 15],
    "2024": [12, 14],
  },
  Calgary: {
    "2017": [1, 2],
    "2018": [2, 4],
    "2019": [3, 7],
    "2020": [7, 9],
    "2021": [9, 11],
    "2022": [9, 11],
    "2023": [5, 7],
    "2024": [4, 6],
  },
  Vancouver: {
    "2019": [1, 2],
    "2020": [3, 5],
    "2021": [5, 9],
    "2022": [5, 9],
    "2023": [2, 4],
    "2024": [1, 3],
  },
};

/**
 * - random daily unitsRepaired spread between [min, max] per year
 */
const YEAR_UNITS_REPAIRED_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [1, 2],
    "2014": [1, 3],
    "2015": [2, 4],
    "2016": [3, 5],
    "2017": [5, 7],
    "2018": [5, 9],
    "2019": [7, 11],
    "2020": [6, 8],
    "2021": [5, 8],
    "2022": [7, 11],
    "2023": [10, 13],
    "2024": [9, 12],
  },
  Calgary: {
    "2017": [2, 4],
    "2018": [2, 5],
    "2019": [6, 9],
    "2020": [5, 8],
    "2021": [4, 7],
    "2022": [6, 9],
    "2023": [8, 11],
    "2024": [7, 10],
  },
  Vancouver: {
    "2019": [3, 5],
    "2020": [6, 9],
    "2021": [5, 8],
    "2022": [6, 9],
    "2023": [9, 11],
    "2024": [8, 10],
  },
};

/**
 * - random daily unitsSold spread between [min, max] per year
 */
const YEAR_PROFIT_MARGIN_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.03, 0.13],
    "2014": [0.04, 0.14],
    "2015": [0.05, 0.15],
    "2016": [0.06, 0.16],
    "2017": [0.11, 0.21],
    "2018": [0.13, 0.23],
    "2019": [0.15, 0.25],
    "2020": [0.25, 0.35],
    "2021": [0.27, 0.37],
    "2022": [0.27, 0.37],
    "2023": [0.23, 0.33],
    "2024": [0.21, 0.31],
  },
  Calgary: {
    "2017": [0.07, 0.17],
    "2018": [0.08, 0.18],
    "2019": [0.09, 0.19],
    "2020": [0.15, 0.25],
    "2021": [0.17, 0.27],
    "2022": [0.17, 0.27],
    "2023": [0.13, 0.23],
    "2024": [0.12, 0.22],
  },
  Vancouver: {
    "2019": [0.09, 0.19],
    "2020": [0.13, 0.23],
    "2021": [0.17, 0.27],
    "2022": [0.17, 0.27],
    "2023": [0.15, 0.25],
    "2024": [0.14, 0.24],
  },
};

/**
 * ratio of repair profit to total profit spread between [min, max] per year
 */
const YEAR_REPAIR_PROFIT_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0, 0.01],
    "2014": [0.01, 0.015],
    "2015": [0.015, 0.02],
    "2016": [0.02, 0.025],
    "2017": [0.05, 0.055],
    "2018": [0.055, 0.06],
    "2019": [0.06, 0.065],
    "2020": [0.08, 0.085],
    "2021": [0.085, 0.09],
    "2022": [0.085, 0.09],
    "2023": [0.075, 0.08],
    "2024": [0.07, 0.075],
  },
  Calgary: {
    "2017": [0.02, 0.025],
    "2018": [0.025, 0.03],
    "2019": [0.03, 0.035],
    "2020": [0.05, 0.055],
    "2021": [0.055, 0.06],
    "2022": [0.055, 0.06],
    "2023": [0.045, 0.05],
    "2024": [0.04, 0.045],
  },
  Vancouver: {
    "2019": [0.03, 0.035],
    "2020": [0.045, 0.05],
    "2021": [0.055, 0.06],
    "2022": [0.055, 0.06],
    "2023": [0.05, 0.055],
    "2024": [0.045, 0.05],
  },
};

/**
 * ratio of online profit to (total profit - repair profit) spread between [min, max] per year
 */
const YEAR_ONLINE_PROFIT_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.3, 0.35],
    "2014": [0.35, 0.4],
    "2015": [0.4, 0.45],
    "2016": [0.45, 0.5],
    "2017": [0.5, 0.55],
    "2018": [0.55, 0.6],
    "2019": [0.6, 0.65],
    "2020": [0.65, 0.7],
    "2021": [0.7, 0.75],
    "2022": [0.7, 0.75],
    "2023": [0.65, 0.7],
    "2024": [0.6, 0.65],
  },
  Calgary: {
    "2017": [0.4, 0.45],
    "2018": [0.45, 0.5],
    "2019": [0.5, 0.55],
    "2020": [0.55, 0.6],
    "2021": [0.6, 0.65],
    "2022": [0.6, 0.65],
    "2023": [0.55, 0.6],
    "2024": [0.5, 0.55],
  },
  Vancouver: {
    "2019": [0.45, 0.5],
    "2020": [0.55, 0.6],
    "2021": [0.6, 0.65],
    "2022": [0.6, 0.65],
    "2023": [0.55, 0.6],
    "2024": [0.5, 0.55],
  },
};

/**
 * ratio of repair expenses to total expenses spread between [min, max] per year
 */
const YEAR_REPAIR_EXPENSES_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.23, 0.25],
    "2014": [0.21, 0.23],
    "2015": [0.19, 0.21],
    "2016": [0.17, 0.19],
    "2017": [0.15, 0.17],
    "2018": [0.13, 0.15],
    "2019": [0.11, 0.13],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.1],
    "2023": [0.1, 0.11],
    "2024": [0.1, 0.11],
  },
  Calgary: {
    "2017": [0.15, 0.17],
    "2018": [0.13, 0.15],
    "2019": [0.11, 0.13],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.1],
    "2023": [0.1, 0.11],
    "2024": [0.1, 0.11],
  },
  Vancouver: {
    "2019": [0.11, 0.13],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.1],
    "2023": [0.1, 0.11],
    "2024": [0.1, 0.11],
  },
};

/**
 * ratio of online expenses to sales expenses spread between [min, max] per year
 */
const YEAR_ONLINE_EXPENSES_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.2, 0.22],
    "2014": [0.18, 0.2],
    "2015": [0.16, 0.18],
    "2016": [0.14, 0.16],
    "2017": [0.1, 0.12],
    "2018": [0.08, 0.1],
    "2019": [0.06, 0.08],
    "2020": [0.05, 0.07],
    "2021": [0.04, 0.06],
    "2022": [0.04, 0.06],
    "2023": [0.05, 0.07],
    "2024": [0.05, 0.07],
  },
  Calgary: {
    "2017": [0.14, 0.16],
    "2018": [0.12, 0.14],
    "2019": [0.1, 0.12],
    "2020": [0.08, 0.1],
    "2021": [0.06, 0.08],
    "2022": [0.06, 0.08],
    "2023": [0.05, 0.07],
    "2024": [0.05, 0.07],
  },
  Vancouver: {
    "2019": [0.1, 0.12],
    "2020": [0.08, 0.1],
    "2021": [0.06, 0.08],
    "2022": [0.06, 0.08],
    "2023": [0.05, 0.07],
    "2024": [0.05, 0.07],
  },
};

/**
 * ratio of online transactions to total transactions spread between [min, max] per year
 */
const YEAR_ONLINE_TRANSACTIONS_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.15, 0.25],
    "2014": [0.2, 0.25],
    "2015": [0.25, 0.3],
    "2016": [0.3, 0.35],
    "2017": [0.35, 0.4],
    "2018": [0.4, 0.45],
    "2019": [0.45, 0.5],
    "2020": [0.65, 0.85],
    "2021": [0.65, 0.75],
    "2022": [0.65, 0.75],
    "2023": [0.6, 0.7],
    "2024": [0.55, 0.65],
  },
  Calgary: {
    "2017": [0.35, 0.4],
    "2018": [0.4, 0.45],
    "2019": [0.45, 0.5],
    "2020": [0.65, 0.85],
    "2021": [0.65, 0.75],
    "2022": [0.65, 0.75],
    "2023": [0.6, 0.7],
    "2024": [0.55, 0.65],
  },
  Vancouver: {
    "2019": [0.45, 0.5],
    "2020": [0.65, 0.85],
    "2021": [0.65, 0.75],
    "2022": [0.65, 0.75],
    "2023": [0.6, 0.7],
    "2024": [0.55, 0.65],
  },
};

/**
 * conversion rate spread between [min, max] per year
 * @see https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/
 */
const YEAR_CONVERSION_RATE_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.01, 0.011],
    "2014": [0.011, 0.012],
    "2015": [0.012, 0.013],
    "2016": [0.013, 0.014],
    "2017": [0.02, 0.025],
    "2018": [0.025, 0.03],
    "2019": [0.03, 0.035],
    "2020": [0.035, 0.04],
    "2021": [0.04, 0.045],
    "2022": [0.04, 0.045],
    "2023": [0.035, 0.04],
    "2024": [0.03, 0.035],
  },
  Calgary: {
    "2017": [0.02, 0.025],
    "2018": [0.025, 0.03],
    "2019": [0.03, 0.035],
    "2020": [0.035, 0.04],
    "2021": [0.04, 0.045],
    "2022": [0.04, 0.045],
    "2023": [0.035, 0.04],
    "2024": [0.03, 0.035],
  },
  Vancouver: {
    "2019": [0.03, 0.035],
    "2020": [0.035, 0.04],
    "2021": [0.04, 0.045],
    "2022": [0.04, 0.045],
    "2023": [0.035, 0.04],
    "2024": [0.03, 0.035],
  },
};

/**
 * churn rate spread between [min, max] per year
 * @see https://customergauge.com/blog/average-churn-rate-by-industry
 */
const YEAR_CHURN_RATE_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.3, 0.4],
    "2014": [0.25, 0.3],
    "2015": [0.2, 0.25],
    "2016": [0.18, 0.22],
    "2017": [0.16, 0.2],
    "2018": [0.15, 0.18],
    "2019": [0.13, 0.16],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.11],
    "2023": [0.1, 0.12],
    "2024": [0.1, 0.12],
  },
  Calgary: {
    "2017": [0.18, 0.22],
    "2018": [0.15, 0.18],
    "2019": [0.13, 0.16],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.11],
    "2023": [0.1, 0.12],
    "2024": [0.1, 0.12],
  },
  Vancouver: {
    "2019": [0.13, 0.16],
    "2020": [0.1, 0.12],
    "2021": [0.09, 0.11],
    "2022": [0.09, 0.11],
    "2023": [0.1, 0.12],
    "2024": [0.1, 0.12],
  },
};

/**
 * - random daily customers spread between [min, max] per year
 */
const YEAR_CUSTOMERS_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [60, 260],
    "2014": [80, 280],
    "2015": [100, 300],
    "2016": [120, 320],
    "2017": [220, 420],
    "2018": [260, 460],
    "2019": [300, 500],
    "2020": [500, 700],
    "2021": [540, 740],
    "2022": [540, 740],
    "2023": [460, 660],
    "2024": [420, 620],
  },
  Calgary: {
    "2017": [60, 260],
    "2018": [80, 280],
    "2019": [100, 300],
    "2020": [120, 320],
    "2021": [220, 420],
    "2022": [260, 460],
    "2023": [300, 500],
    "2024": [260, 460],
  },
  Vancouver: {
    "2019": [80, 280],
    "2020": [180, 380],
    "2021": [340, 460],
    "2022": [460, 540],
    "2023": [300, 460],
    "2024": [260, 420],
  },
};

/**
 * - random daily new customers fraction spread between [min, max] per year
 */
const YEAR_NEW_CUSTOMERS_SPREAD: LocationYearSpread = {
  Edmonton: {
    "2013": [0.6, 0.7],
    "2014": [0.5, 0.7],
    "2015": [0.4, 0.6],
    "2016": [0.35, 0.55],
    "2017": [0.3, 0.5],
    "2018": [0.25, 0.45],
    "2019": [0.25, 0.4],
    "2020": [0.2, 0.35],
    "2021": [0.2, 0.35],
    "2022": [0.2, 0.35],
    "2023": [0.15, 0.3],
    "2024": [0.1, 0.25],
  },
  Calgary: {
    "2017": [0.6, 0.7],
    "2018": [0.5, 0.7],
    "2019": [0.4, 0.6],
    "2020": [0.35, 0.55],
    "2021": [0.3, 0.5],
    "2022": [0.25, 0.45],
    "2023": [0.25, 0.4],
    "2024": [0.2, 0.35],
  },
  Vancouver: {
    "2019": [0.6, 0.7],
    "2020": [0.5, 0.7],
    "2021": [0.4, 0.6],
    "2022": [0.35, 0.55],
    "2023": [0.3, 0.5],
    "2024": [0.25, 0.45],
  },
};

const FINANCIAL_METRICS_YEARLY_TEMPLATE: YearlyFinancialMetric = {
  year: "2013",
  averageOrderValue: 0,
  conversionRate: 0,
  netProfitMargin: 0,

  expenses: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  profit: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  revenue: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  transactions: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  monthlyMetrics: [],
};

const FINANCIAL_METRICS_MONTHLY_TEMPLATE: MonthlyFinancialMetric = {
  month: "January",
  averageOrderValue: 0,
  conversionRate: 0,
  netProfitMargin: 0,

  expenses: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  profit: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  revenue: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  transactions: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  dailyMetrics: [],
};

const FINANCIAL_METRICS_DAILY_TEMPLATE: DailyFinancialMetric = {
  day: "2021-01-01",
  averageOrderValue: 0,
  conversionRate: 0,
  netProfitMargin: 0,

  expenses: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  profit: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  revenue: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },

  transactions: {
    total: 0,
    repair: 0,
    sales: {
      total: 0,
      online: 0,
      inStore: 0,
    },
  },
};

const BUSINESS_METRICS_TEMPLATE: BusinessMetric = {
  storeLocation: "Edmonton",
  customerMetrics: {
    totalCustomers: 0,
    lifetimeValue: 0,
    yearlyMetrics: [],
  },
  financialMetrics: [],
  productMetrics: [],
  repairMetrics: [],
};

export {
  BUSINESS_METRICS_TEMPLATE,
  FINANCIAL_METRICS_DAILY_TEMPLATE,
  FINANCIAL_METRICS_MONTHLY_TEMPLATE,
  FINANCIAL_METRICS_YEARLY_TEMPLATE,
  YEAR_CHURN_RATE_SPREAD,
  YEAR_CONVERSION_RATE_SPREAD,
  YEAR_CUSTOMERS_SPREAD,
  YEAR_NEW_CUSTOMERS_SPREAD,
  YEAR_ONLINE_EXPENSES_SPREAD,
  YEAR_ONLINE_PROFIT_SPREAD,
  YEAR_ONLINE_TRANSACTIONS_SPREAD,
  YEAR_PROFIT_MARGIN_SPREAD,
  YEAR_REPAIR_EXPENSES_SPREAD,
  YEAR_REPAIR_PROFIT_SPREAD,
  YEAR_UNITS_REPAIRED_SPREAD,
  YEAR_UNITS_SOLD_SPREAD,
};
