import { PROVINCES, STATES_US } from "../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_FULL_RANGE_REGEX,
  SERIAL_ID_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnDateFullRangeValidationText,
  returnLargeIntegerValidationText,
  returnSerialIdValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { COUNTRIES_DATA } from "../addressChange/constants";
import { CURRENCY_DATA } from "../benefits/constants";
import { PRODUCT_CATEGORIES } from "../dashboard/constants";
import { LARGE_INTEGER_REGEX } from "../product/constants";
import { ComponentQueryData } from "../queryBuilder";
import { STORE_LOCATION_DATA } from "../register/constants";

const PURCHASE_QUERY_DATA: ComponentQueryData[] = [
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
    label: "SKU",
    value: "sku",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Quantity",
    value: "quantity",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },

  {
    label: "Product Category",
    value: "productCategory",
    inputKind: "selectInput",
    selectData: PRODUCT_CATEGORIES,
  },
  {
    label: "Date of Purchase",
    value: "dateOfPurchase",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Purchase Currency",
    value: "purchaseCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Purchase Store Location",
    value: "purchaseStoreLocation",
    inputKind: "selectInput",
    selectData: STORE_LOCATION_DATA,
  },
  {
    label: "Purchase Kind",
    value: "purchaseKind",
    inputKind: "selectInput",
    selectData: ["Online", "In-Store"],
  },
  {
    label: "Address Line",
    value: "addressLine",
    inputKind: "textInput",
    regex: ADDRESS_LINE_REGEX,
    regexValidationFn: returnAddressValidationText,
  },
  {
    label: "City",
    value: "city",
    inputKind: "textInput",
    regex: CITY_REGEX,
    regexValidationFn: returnCityValidationText,
  },
  {
    label: "State",
    value: "state",
    inputKind: "selectInput",
    selectData: STATES_US,
  },
  {
    label: "Province",
    value: "province",
    inputKind: "selectInput",
    selectData: PROVINCES,
  },
  {
    label: "Country",
    value: "country",
    inputKind: "selectInput",
    selectData: COUNTRIES_DATA,
  },
  {
    label: "Postal Code",
    value: "postalCode",
    inputKind: "textInput",
  },
];

const PURCHASE_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "purchase",
  manager: "purchase",
  employee: "purchase",
};

export { PURCHASE_QUERY_DATA, PURCHASE_RESOURCE_ROUTE_PATHS };
