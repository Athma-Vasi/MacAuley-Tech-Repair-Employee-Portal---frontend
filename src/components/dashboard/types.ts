import { ProductCategory, RepairCategory, SalesData } from './constants';

type CurrentStoreSelection = 'all' | 'edmonton' | 'calgary' | 'vancouver';
type CurrentCategorySelection = 'trends' | 'products' | 'repairs';
type CurrentTrendSelection = 'yearly' | 'monthly' | 'daily';

type DashboardState = {
  salesData: SalesData[];
  currentStoreSelection: CurrentStoreSelection;
  currentCategorySelection: CurrentCategorySelection;
  currentProductSelection: ProductCategory;
  currentRepairSelection: RepairCategory;
  currentTrendSelection: CurrentTrendSelection;
};

export type { DashboardState };
