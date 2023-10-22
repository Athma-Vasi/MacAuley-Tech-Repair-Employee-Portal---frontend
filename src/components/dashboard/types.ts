import { ProductCategory, RepairCategory, SalesData } from './constants';

type DashboardState = {
  salesData: SalesData[];
  currentStoreSelection: 'all' | 'edmonton' | 'calgary' | 'vancouver';
  currentCategorySelection: 'trends' | 'products' | 'repairs';
  currentProductSelection: ProductCategory;
  currentRepairSelection: RepairCategory;
  currentTrendSelection: 'yearly' | 'monthly' | 'daily';
};

export type { DashboardState };
