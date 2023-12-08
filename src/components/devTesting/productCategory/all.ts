import { v4 as uuidv4 } from "uuid";

/**
 * Initially the sku field was set to string and contained only one uuid (a mistake). The return${productCategory}Schemas functions were modified to generate uuid[] after the documents were generated. This function is used to update the sku field to an array of uuids of length: quantity.
 */
function returnUpdateProductCategorySkuFields(
  productCategoryDocs: Record<string, any>[]
) {
  return productCategoryDocs.map((productCategoryDoc) => {
    const { quantity } = productCategoryDoc;

    const productCategoryField = {
      documentId: productCategoryDoc._id,
      documentUpdate: {
        updateKind: "field",
        updateOperator: "$set",
        fields: { sku: Array.from({ length: quantity }, () => uuidv4()) },
      },
    };

    return productCategoryField;
  });
}

/**
 * unfortunately, the schema generated by the return${productCategory}Schemas functions all have only USD. This function is used to update the currency field to either "CAD" or "USD".
 */
function returnUpdateProductCategoryCurrencyFields(
  productCategoryDocs: Record<string, any>[]
) {
  return productCategoryDocs.map((productCategoryDoc) => {
    const currency = Math.random() > 0.25 ? "CAD" : "USD"; // bias towards CAD

    const productCategoryField = {
      documentId: productCategoryDoc._id,
      documentUpdate: {
        updateKind: "field",
        updateOperator: "$set",
        fields: { currency },
      },
    };

    return productCategoryField;
  });
}

export {
  returnUpdateProductCategoryCurrencyFields,
  returnUpdateProductCategorySkuFields,
};