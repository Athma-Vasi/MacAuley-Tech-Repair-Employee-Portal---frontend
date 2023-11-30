import { ProductCategory } from "../../dashboard/types";

type RatingKind =
  | "halfStar"
  | "oneStar"
  | "oneAndHalfStars"
  | "twoStars"
  | "twoAndHalfStars"
  | "threeStars"
  | "threeAndHalfStars"
  | "fourStars"
  | "fourAndHalfStars"
  | "fiveStars";

type ProductReviewSchema = {
  userId: string; // customer id
  username: string; // customer username
  productId: string;
  productCategory: ProductCategory;
  productSku: string;
  productBrand: string;
  productModel: string;
  productReview: string;
  productRating: RatingKind;
  helpfulVotes: number;
  unhelpfulVotes: number;
  isVerifiedPurchase: boolean;
};

type ProductReviewDocument = ProductReviewSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type ProductReviewsBlueprint = {
  productReview: string;
  productRating: RatingKind;
  helpfulVotes: number;
  unhelpfulVotes: number;
  isVerifiedPurchase: boolean;
};

function returnProductReviewSchemas({
  productCategoryDocuments,
  productCategoryReviews,
}: {
  productCategoryDocuments: Record<string, any>[];
  productCategoryReviews: ProductReviewsBlueprint[];
}) {
  // const TUPLES_MAP = new Map([
  // 	["Accessory", [accessoryDocuments, accessoryReviews]],
  // 	["Central Processing Unit (CPU)", [caseDocuments, caseReviews]],
  // 	["Computer Case", [cpuDocuments, cpuReviews]],
  // 	["Desktop Computer", [desktopComputerDocuments, desktopComputerReviews]],
  // 	["Display", [displayDocuments, displayReviews]],
  // 	["Graphics Processing Unit (GPU)", [gpuDocuments, gpuReviews]],
  // 	["Headphone", [headphoneDocuments, headphoneReviews]],
  // 	["Keyboard", [keyboardDocuments, keyboardReviews]],
  // 	["Laptop", [laptopDocuments, laptopReviews]],
  // 	["Memory (RAM)", [ramDocuments, ramReviews]],
  // 	["Microphone", [microphoneDocuments, microphoneReviews]],
  // 	["Motherboard", [motherboardDocuments, motherboardReviews]],
  // 	["Mouse", [mouseDocuments, mouseReviews]],
  // 	["Power Supply Unit (PSU)", [psuDocuments, psuReviews]],
  // 	["Smartphone", [smartphoneDocuments, smartphoneReviews]],
  // 	["Speaker", [speakerDocuments, speakerReviews]],
  // 	["Storage", [storageDocuments, storageReviews]],
  // 	["Tablet", [tabletDocuments, tabletReviews]],
  // 	["Webcam", [webcamDocuments, webcamReviews]],
  // ]);
  // const productReviewSchemas = customerDocuments.flatMap((customerDoc) => {
  // 	const { _id: userId, username } = customerDoc;
  // 	const numberOfReviews = Math.floor(Math.random() * 3);
  // 	const tuples = Array.from(TUPLES_MAP.entries());
  // 	const shuffledTuples = shuffleArray(tuples);
  // 	const slicedTuples = shuffledTuples.slice(0, numberOfReviews) as [
  // 		string,
  // 		[any[], ProductReviewsBlueprint[]],
  // 	][];
  // 	const productReviews = slicedTuples.reduce<ProductReviewSchema[]>(
  // 		(productReviewsAcc, tuple) => {
  // 			const [productCategory, keyVal] = tuple as [
  // 				ProductCategory,
  // 				[any[], ProductReviewsBlueprint[]],
  // 			];
  // 			const [productCategoryDocuments, productCategoryReviews] = keyVal;
  // 			const shuffledProductCategoryDocuments = shuffleArray(
  // 				productCategoryDocuments,
  // 			);
  // 			const slicedProductCategoryDocuments =
  // 				shuffledProductCategoryDocuments.slice(0, numberOfReviews);
  // 			const shuffledProductCategoryReviews = shuffleArray(
  // 				productCategoryReviews,
  // 			);
  // 			const slicedProductCategoryReviews =
  // 				shuffledProductCategoryReviews.slice(0, numberOfReviews);
  // 			const productReviewSchemas = slicedProductCategoryDocuments.map(
  // 				(productCategoryDocument, idx) => {
  // 					const {
  // 						helpfulVotes,
  // 						isVerifiedPurchase,
  // 						productRating,
  // 						productReview,
  // 						unhelpfulVotes,
  // 					} = slicedProductCategoryReviews[idx];
  // 					const { brand, model, _id: productId } = productCategoryDocument;
  // 					const productReviewSchema: ProductReviewSchema = {
  // 						userId,
  // 						username,
  // 						productId,
  // 						productCategory,
  // 						productBrand: brand,
  // 						productModel: model,
  // 						productReview,
  // 						productRating,
  // 						helpfulVotes,
  // 						unhelpfulVotes,
  // 						isVerifiedPurchase,
  // 					};
  // 					return productReviewSchema;
  // 				},
  // 			);
  // 			productReviewsAcc.push(...productReviewSchemas);
  // 			return productReviewsAcc;
  // 		},
  // 		[],
  // 	);
  // 	return productReviews;
  // });
  // return productReviewSchemas;
}

// function returnProductCategoryStarRatingsCount({
// 	productCategory,
// 	reviewDocuments,
// }: {
// 	productCategory: ProductCategory;
// 	reviewDocuments: typeof REVIEW_DOCUMENTS;
// }) {
// 	const groupedByProductCategory = groupByField({
// 		objectArray: reviewDocuments,
// 		field: "productCategory",
// 	});

// 	const productCategoryDocuments = groupedByProductCategory[productCategory];

// 	const groupedByProductId = groupByField({
// 		objectArray: productCategoryDocuments,
// 		field: "productId",
// 	});

// 	console.log("groupedByProductId", groupedByProductId);

// 	// because the productRating is a string (e.g. "4.5")
// 	const starRatingsObj: Record<string, string> = {
// 		"0.5": "'0.5'",
// 		"1": "'1.0'",
// 		"1.5": "'1.5'",
// 		"2": "'2.0'",
// 		"2.5": "'2.5'",
// 		"3": "'3.0'",
// 		"3.5": "'3.5'",
// 		"4": "'4.0'",
// 		"4.5": "'4.5'",
// 		"5": "'5.0'",
// 	};

// 	const starRatingsCount = Object.entries(groupedByProductId).reduce(
// 		(starRatingsCountAcc: any[], tuple) => {
// 			const [productId, reviews] = tuple;

// 			const initialUpdateFieldsObj = {
// 				documentId: productId,
// 				documentUpdate: {
// 					updateKind: "field",
// 					updateOperator: "$set",
// 					fields: {
// 						starRatingsCount: {
// 							"0.5": 0,
// 							"1.0": 0,
// 							"1.5": 0,
// 							"2.0": 0,
// 							"2.5": 0,
// 							"3.0": 0,
// 							"3.5": 0,
// 							"4.0": 0,
// 							"4.5": 0,
// 							"5.0": 0,
// 						},
// 					},
// 				},
// 			};

// 			const updateFields = reviews.reduce((updateFieldsAcc: any, review) => {
// 				const { productRating } = review;
// 				const starRating = starRatingsObj[productRating];

// 				// find the star rating key in the updateFields object
// 				const starRatingKey =
// 					Object.keys(
// 						updateFieldsAcc.documentUpdate.fields.starRatingsCount,
// 					).find((key) => key === starRating) ?? "";

// 				// increment the star rating count
// 				updateFieldsAcc.documentUpdate.fields.starRatingsCount[
// 					starRatingKey
// 				] += 1;

// 				return updateFieldsAcc;
// 			}, structuredClone(initialUpdateFieldsObj));

// 			starRatingsCountAcc.push(updateFields);

// 			//
// 			return starRatingsCountAcc;
// 		},
// 		[],
// 	);

// 	return starRatingsCount;
// }

export { returnProductReviewSchemas };
export type { ProductReviewDocument, ProductReviewSchema, RatingKind };
