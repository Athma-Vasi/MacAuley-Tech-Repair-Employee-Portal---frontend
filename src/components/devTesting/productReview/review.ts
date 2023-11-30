import { groupByField } from "../../../utils";
import { ProductReviewDocument, RatingKind } from "../../product/types";

const STAR_RATINGS_OBJ: Record<string, RatingKind> = {
  "0.5": "halfStar",
  "1": "oneStar",
  "1.5": "oneAndHalfStars",
  "2": "twoStars",
  "2.5": "twoAndHalfStars",
  "3": "threeStars",
  "3.5": "threeAndHalfStars",
  "4": "fourStars",
  "4.5": "fourAndHalfStars",
  "5": "fiveStars",
};

/**
 * @description - returns productCategory fields request body field for updating the ratings count based on the created productCategory product review documents
 * - customer documents created first (ids retrieved), then each productCategory documents (ids retrieved), then productReview documents(ids retrieved) for each productCategory
 */
function returnUpdateProductCategoryRatingsCountFields(
  reviewDocuments: ProductReviewDocument[]
) {
  const groupedByProductId = groupByField({
    objectArray: reviewDocuments,
    field: "productId",
  });

  const initialStarRatingsCount: Record<RatingKind, number> = {
    halfStar: 0,
    oneStar: 0,
    oneAndHalfStars: 0,
    twoStars: 0,
    twoAndHalfStars: 0,
    threeStars: 0,
    threeAndHalfStars: 0,
    fourStars: 0,
    fourAndHalfStars: 0,
    fiveStars: 0,
  };

  const productCategoryFields = Object.entries(groupedByProductId).reduce(
    (acc, [productId, reviews]) => {
      const starRatingsCount = reviews.reduce((starRatingsCountAcc, review) => {
        starRatingsCountAcc[review.productRating] += 1;

        return starRatingsCountAcc;
      }, structuredClone(initialStarRatingsCount));

      const productCategoryField = {
        documentId: productId,
        documentUpdate: {
          updateKind: "field",
          updateOperator: "$set",
          fields: { starRatingsCount },
        },
      };

      acc.push(productCategoryField);

      return acc;
    },
    [] as Record<string, unknown>[]
  );

  return productCategoryFields;
}

function returnUpdateProductCategoryReviewIdsFields(
  reviewDocuments: ProductReviewDocument[]
) {
  const groupedByProductId = groupByField({
    objectArray: reviewDocuments,
    field: "productId",
  });

  const productCategoryFields = Object.entries(groupedByProductId).reduce(
    (acc, [productId, reviews]) => {
      const fields = reviews.map((review) => {
        const productCategoryField = {
          documentId: productId,
          documentUpdate: {
            updateKind: "array",
            updateOperator: "$push",
            fields: { productReviewsIds: review._id },
          },
        };
        return productCategoryField;
      });

      acc.push(fields);

      return acc;
    },
    [] as Record<string, any>[]
  );

  return productCategoryFields.flat();
}

export {
  returnUpdateProductCategoryRatingsCountFields,
  returnUpdateProductCategoryReviewIdsFields,
  STAR_RATINGS_OBJ,
};
export type { RatingKind };
