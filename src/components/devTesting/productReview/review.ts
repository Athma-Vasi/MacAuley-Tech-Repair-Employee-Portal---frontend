import { DocumentUpdateOperation } from "../../../types";
import { groupByField, shuffleArray } from "../../../utils";
import { ProductCategory } from "../../dashboard/types";
import { AccessoryDocument } from "../../product/types";
import { CUSTOMER_DOCUMENTS } from "../customer/customerDocuments";
import {
	ACCESSORY_DOCUMENTS,
	ACCESSORY_REVIEWS,
} from "../productCategory/accessory";
import { CASE_DOCUMENTS, CASE_REVIEWS } from "../productCategory/case";
import { CPU_DOCUMENTS, CPU_REVIEWS } from "../productCategory/cpu";
import {
	DESKTOP_COMPUTER_DOCUMENTS,
	DESKTOP_COMPUTER_REVIEWS,
} from "../productCategory/desktopComputer";
import { DISPLAY_DOCUMENTS, DISPLAY_REVIEWS } from "../productCategory/display";
import { GPU_DOCUMENTS, GPU_REVIEWS } from "../productCategory/gpu";
import {
	HEADPHONE_DOCUMENTS,
	HEADPHONE_REVIEWS,
} from "../productCategory/headphone";
import {
	KEYBOARD_DOCUMENTS,
	KEYBOARD_REVIEWS,
} from "../productCategory/keyboard";
import { LAPTOP_DOCUMENTS, LAPTOP_REVIEWS } from "../productCategory/laptop";
import {
	MICROPHONE_DOCUMENTS,
	MICROPHONE_REVIEWS,
} from "../productCategory/microphone";
import {
	MOTHERBOARD_DOCUMENTS,
	MOTHERBOARD_REVIEWS,
} from "../productCategory/motherboard";
import { MOUSE_DOCUMENTS, MOUSE_REVIEWS } from "../productCategory/mouse";
import { PSU_DOCUMENTS, PSU_REVIEWS } from "../productCategory/psu";
import { RAM_DOCUMENTS, RAM_REVIEWS } from "../productCategory/ram";
import {
	SMARTPHONE_DOCUMENTS,
	SMARTPHONE_REVIEWS,
} from "../productCategory/smartphone";
import { SPEAKER_DOCUMENTS, SPEAKER_REVIEWS } from "../productCategory/speaker";
import { STORAGE_DOCUMENTS, STORAGE_REVIEWS } from "../productCategory/storage";
import { TABLET_DOCUMENTS, TABLET_REVIEWS } from "../productCategory/tablet";
import { WEBCAM_DOCUMENTS, WEBCAM_REVIEWS } from "../productCategory/webcam";
import { REVIEW_DOCUMENTS } from "./reviewDocuments";

type ProductRating =
	| "0.5"
	| "1"
	| "1.5"
	| "2"
	| "2.5"
	| "3"
	| "3.5"
	| "4"
	| "4.5"
	| "5";

type ProductReviewSchema = {
	userId: string; // customer id
	username: string; // customer username
	productId: string;
	productCategory: ProductCategory;
	productBrand: string;
	productModel: string;
	productReview: string;
	productRating: ProductRating;
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
	productRating: ProductRating;
	helpfulVotes: number;
	unhelpfulVotes: number;
	isVerifiedPurchase: boolean;
};

function returnProductReviewSchemas({
	accessoryDocuments,
	accessoryReviews,
	caseDocuments,
	caseReviews,
	cpuDocuments,
	cpuReviews,
	customerDocuments,
	desktopComputerDocuments,
	desktopComputerReviews,
	displayDocuments,
	displayReviews,
	gpuDocuments,
	gpuReviews,
	headphoneDocuments,
	headphoneReviews,
	keyboardDocuments,
	keyboardReviews,
	laptopDocuments,
	laptopReviews,
	ramDocuments,
	ramReviews,
	microphoneDocuments,
	microphoneReviews,
	motherboardDocuments,
	motherboardReviews,
	mouseDocuments,
	mouseReviews,
	psuDocuments,
	psuReviews,
	smartphoneDocuments,
	smartphoneReviews,
	speakerDocuments,
	speakerReviews,
	storageDocuments,
	storageReviews,
	tabletDocuments,
	tabletReviews,
	webcamDocuments,
	webcamReviews,
}: {
	accessoryDocuments: typeof ACCESSORY_DOCUMENTS;
	accessoryReviews: typeof ACCESSORY_REVIEWS;
	caseDocuments: typeof CASE_DOCUMENTS;
	caseReviews: typeof CASE_REVIEWS;
	cpuDocuments: typeof CPU_DOCUMENTS;
	cpuReviews: typeof CPU_REVIEWS;
	customerDocuments: typeof CUSTOMER_DOCUMENTS;
	desktopComputerDocuments: typeof DESKTOP_COMPUTER_DOCUMENTS;
	desktopComputerReviews: typeof DESKTOP_COMPUTER_REVIEWS;
	displayDocuments: typeof DISPLAY_DOCUMENTS;
	displayReviews: typeof DISPLAY_REVIEWS;
	gpuDocuments: typeof GPU_DOCUMENTS;
	gpuReviews: typeof GPU_REVIEWS;
	headphoneDocuments: typeof HEADPHONE_DOCUMENTS;
	headphoneReviews: typeof HEADPHONE_REVIEWS;
	keyboardDocuments: typeof KEYBOARD_DOCUMENTS;
	keyboardReviews: typeof KEYBOARD_REVIEWS;
	laptopDocuments: typeof LAPTOP_DOCUMENTS;
	laptopReviews: typeof LAPTOP_REVIEWS;
	ramDocuments: typeof RAM_DOCUMENTS;
	ramReviews: typeof RAM_REVIEWS;
	microphoneDocuments: typeof MICROPHONE_DOCUMENTS;
	microphoneReviews: typeof MICROPHONE_REVIEWS;
	motherboardDocuments: typeof MOTHERBOARD_DOCUMENTS;
	motherboardReviews: typeof MOTHERBOARD_REVIEWS;
	mouseDocuments: typeof MOUSE_DOCUMENTS;
	mouseReviews: typeof MOUSE_REVIEWS;
	psuDocuments: typeof PSU_DOCUMENTS;
	psuReviews: typeof PSU_REVIEWS;
	smartphoneDocuments: typeof SMARTPHONE_DOCUMENTS;
	smartphoneReviews: typeof SMARTPHONE_REVIEWS;
	speakerDocuments: typeof SPEAKER_DOCUMENTS;
	speakerReviews: typeof SPEAKER_REVIEWS;
	storageDocuments: typeof STORAGE_DOCUMENTS;
	storageReviews: typeof STORAGE_REVIEWS;
	tabletDocuments: typeof TABLET_DOCUMENTS;
	tabletReviews: typeof TABLET_REVIEWS;
	webcamDocuments: typeof WEBCAM_DOCUMENTS;
	webcamReviews: typeof WEBCAM_REVIEWS;
}) {
	const TUPLES_MAP = new Map([
		["Accessory", [accessoryDocuments, accessoryReviews]],
		["Central Processing Unit (CPU)", [caseDocuments, caseReviews]],
		["Computer Case", [cpuDocuments, cpuReviews]],
		["Desktop Computer", [desktopComputerDocuments, desktopComputerReviews]],
		["Display", [displayDocuments, displayReviews]],
		["Graphics Processing Unit (GPU)", [gpuDocuments, gpuReviews]],
		["Headphone", [headphoneDocuments, headphoneReviews]],
		["Keyboard", [keyboardDocuments, keyboardReviews]],
		["Laptop", [laptopDocuments, laptopReviews]],
		["Memory (RAM)", [ramDocuments, ramReviews]],
		["Microphone", [microphoneDocuments, microphoneReviews]],
		["Motherboard", [motherboardDocuments, motherboardReviews]],
		["Mouse", [mouseDocuments, mouseReviews]],
		["Power Supply Unit (PSU)", [psuDocuments, psuReviews]],
		["Smartphone", [smartphoneDocuments, smartphoneReviews]],
		["Speaker", [speakerDocuments, speakerReviews]],
		["Storage", [storageDocuments, storageReviews]],
		["Tablet", [tabletDocuments, tabletReviews]],
		["Webcam", [webcamDocuments, webcamReviews]],
	]);

	const productReviewSchemas = customerDocuments.flatMap((customerDoc) => {
		const { _id: userId, username } = customerDoc;

		const numberOfReviews = Math.floor(Math.random() * 3);

		const tuples = Array.from(TUPLES_MAP.entries());

		const shuffledTuples = shuffleArray(tuples);

		const slicedTuples = shuffledTuples.slice(0, numberOfReviews) as [
			string,
			[any[], ProductReviewsBlueprint[]],
		][];

		const productReviews = slicedTuples.reduce<ProductReviewSchema[]>(
			(productReviewsAcc, tuple) => {
				const [productCategory, keyVal] = tuple as [
					ProductCategory,
					[any[], ProductReviewsBlueprint[]],
				];
				const [productCategoryDocuments, productCategoryReviews] = keyVal;

				const shuffledProductCategoryDocuments = shuffleArray(
					productCategoryDocuments,
				);

				const slicedProductCategoryDocuments =
					shuffledProductCategoryDocuments.slice(0, numberOfReviews);

				const shuffledProductCategoryReviews = shuffleArray(
					productCategoryReviews,
				);

				const slicedProductCategoryReviews =
					shuffledProductCategoryReviews.slice(0, numberOfReviews);

				const productReviewSchemas = slicedProductCategoryDocuments.map(
					(productCategoryDocument, idx) => {
						const {
							helpfulVotes,
							isVerifiedPurchase,
							productRating,
							productReview,
							unhelpfulVotes,
						} = slicedProductCategoryReviews[idx];

						const { brand, model, _id: productId } = productCategoryDocument;

						const productReviewSchema: ProductReviewSchema = {
							userId,
							username,
							productId,
							productCategory,
							productBrand: brand,
							productModel: model,
							productReview,
							productRating,
							helpfulVotes,
							unhelpfulVotes,
							isVerifiedPurchase,
						};

						return productReviewSchema;
					},
				);

				productReviewsAcc.push(...productReviewSchemas);

				return productReviewsAcc;
			},
			[],
		);

		return productReviews;
	});

	return productReviewSchemas;
}

function returnProductCategoryStarRatingsCount({
	productCategory,
	reviewDocuments,
}: {
	productCategory: ProductCategory;
	reviewDocuments: typeof REVIEW_DOCUMENTS;
}) {
	const groupedByProductCategory = groupByField({
		objectArray: reviewDocuments,
		field: "productCategory",
	});

	const productCategoryDocuments = groupedByProductCategory[productCategory];

	const groupedByProductId = groupByField({
		objectArray: productCategoryDocuments,
		field: "productId",
	});

	console.log("groupedByProductId", groupedByProductId);

	// because the productRating is a string (e.g. "4.5")
	const starRatingsObj: Record<string, string> = {
		"0.5": "'0.5'",
		"1": "'1.0'",
		"1.5": "'1.5'",
		"2": "'2.0'",
		"2.5": "'2.5'",
		"3": "'3.0'",
		"3.5": "'3.5'",
		"4": "'4.0'",
		"4.5": "'4.5'",
		"5": "'5.0'",
	};

	const starRatingsCount = Object.entries(groupedByProductId).reduce(
		(starRatingsCountAcc: any[], tuple) => {
			const [productId, reviews] = tuple;

			const initialUpdateFieldsObj = {
				documentId: productId,
				documentUpdate: {
					updateKind: "field",
					updateOperator: "$set",
					fields: {
						starRatingsCount: {
							"0.5": 0,
							"1.0": 0,
							"1.5": 0,
							"2.0": 0,
							"2.5": 0,
							"3.0": 0,
							"3.5": 0,
							"4.0": 0,
							"4.5": 0,
							"5.0": 0,
						},
					},
				},
			};

			const updateFields = reviews.reduce((updateFieldsAcc: any, review) => {
				const { productRating } = review;
				const starRating = starRatingsObj[productRating];

				// find the star rating key in the updateFields object
				const starRatingKey =
					Object.keys(
						updateFieldsAcc.documentUpdate.fields.starRatingsCount,
					).find((key) => key === starRating) ?? "";

				// increment the star rating count
				updateFieldsAcc.documentUpdate.fields.starRatingsCount[
					starRatingKey
				] += 1;

				return updateFieldsAcc;
			}, structuredClone(initialUpdateFieldsObj));

			starRatingsCountAcc.push(updateFields);

			//
			return starRatingsCountAcc;
		},
		[],
	);

	return starRatingsCount;
}

export { returnProductCategoryStarRatingsCount, returnProductReviewSchemas };
export type { ProductRating, ProductReviewDocument, ProductReviewSchema };
