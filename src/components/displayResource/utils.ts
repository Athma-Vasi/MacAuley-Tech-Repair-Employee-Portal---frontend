import { ProductCategory } from "../dashboard/types";
import { ComponentQueryData } from "../queryBuilder";

function buildQueryString({
  isDisplayProductsDocs,
  limitPerPage,
  newQueryFlag,
  pageQueryString,
  productCategory,
  queryBuilderString,
  totalDocuments,
}: {
  isDisplayProductsDocs: boolean;
  limitPerPage: string;
  newQueryFlag: boolean;
  pageQueryString: string;
  productCategory: ProductCategory;
  queryBuilderString: string;
  totalDocuments: number;
}) {
  return isDisplayProductsDocs
    ? `/${productCategory}?limit=${limitPerPage}&newQueryFlag=${newQueryFlag}&page=${pageQueryString}&totalDocuments=${totalDocuments}&projection=-action&projection=-category`
    : `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&limit=${limitPerPage}&projection=-action&projection=-category`;
}

// /**
//  * - filters out the fields in the componentQueryData obj based on the productCategory
//  * - prevents displaying all Product model fields in the QueryBuilder component
//  */
// function returnProductCategoryComponentQueryData({
//   componentQueryData,
//   productCategory,
//   productCategoryFieldsObj,
// }: {
//   componentQueryData: ComponentQueryData[];
//   productCategory: ProductCategory;
//   productCategoryFieldsObj: Record<ProductCategory, Set<string>>;
// }) {
//   return componentQueryData.filter(({ value }) =>
//     productCategoryFieldsObj[productCategory].has(value)
//   );
// }

export { buildQueryString };
