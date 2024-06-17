import { FinancialMetricsAction } from "./actions";
import { FinancialMetricsCards } from "./cards";
import { FinancialMetricsCharts } from "./chartsData";

type FinancialMetricsCategory = "profit" | "revenue" | "expenses" | "transactions";

type FinancialMetricsState = {
  cards: FinancialMetricsCards | null;
  category: FinancialMetricsCategory;
  charts: FinancialMetricsCharts | null;
  isGenerating: boolean;
};

type FinancialMetricsDispatch =
  | {
      action: FinancialMetricsAction["setCards"];
      payload: FinancialMetricsCards;
    }
  | {
      action: FinancialMetricsAction["setCategory"];
      payload: FinancialMetricsCategory;
    }
  | {
      action: FinancialMetricsAction["setCharts"];
      payload: FinancialMetricsCharts;
    }
  | {
      action: FinancialMetricsAction["setIsGenerating"];
      payload: boolean;
    };

export type { FinancialMetricsCategory, FinancialMetricsDispatch, FinancialMetricsState };
