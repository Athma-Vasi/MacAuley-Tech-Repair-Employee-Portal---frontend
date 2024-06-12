import { CustomerMetricsAction } from "./actions";
import { CustomerMetricsCharts } from "./utils";
import { CustomerMetricsCards } from "./utilsTSX";

type CustomerMetricsState = {
  customerMetricsCards: CustomerMetricsCards | null;
  customerMetricsCharts: CustomerMetricsCharts | null;
  isGenerating: boolean;
};

type CustomerMetricsDispatch =
  | {
      action: CustomerMetricsAction["setCustomerMetricsCards"];
      payload: CustomerMetricsCards;
    }
  | {
      action: CustomerMetricsAction["setCustomerMetricsCharts"];
      payload: CustomerMetricsCharts;
    }
  | {
      action: CustomerMetricsAction["setIsGenerating"];
      payload: boolean;
    };

export type { CustomerMetricsDispatch, CustomerMetricsState };
