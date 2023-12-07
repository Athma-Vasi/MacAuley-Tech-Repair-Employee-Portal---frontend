import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  SERIAL_ID_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnBrandNameValidationText,
  returnDateFullRangeValidationText,
  returnGrammarValidationText,
  returnMediumIntegerValidationText,
  returnSerialIdValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { PRODUCT_CATEGORIES } from "../dashboard/constants";
import {
  BRAND_REGEX,
  MEDIUM_INTEGER_REGEX,
  PRODUCT_RATING_DATA,
} from "../product/constants";
import { ComponentQueryData } from "../queryBuilder";

const PRODUCT_REVIEW_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Product Category",
    value: "productCategory",
    inputKind: "selectInput",
    selectData: PRODUCT_CATEGORIES,
  },
  {
    label: "Product Brand",
    value: "productBrand",
    inputKind: "textInput",
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: "Product Model",
    value: "productModel",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Product Review",
    value: "productReview",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Product Rating",
    value: "productRating",
    inputKind: "selectInput",
    selectData: PRODUCT_RATING_DATA,
  },
  {
    label: "Helpful Votes",
    value: "helpfulVotes",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Unhelpful Votes",
    value: "unhelpfulVotes",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Is Verified Purchase",
    value: "isVerifiedPurchase",
    inputKind: "selectInput",
    selectData: ["true", "false"],
  },
];

const PRODUCT_REVIEW_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-review",
  manager: "product-review",
  employee: "product-review",
};

export { PRODUCT_REVIEW_QUERY_DATA, PRODUCT_REVIEW_RESOURCE_ROUTE_PATHS };
