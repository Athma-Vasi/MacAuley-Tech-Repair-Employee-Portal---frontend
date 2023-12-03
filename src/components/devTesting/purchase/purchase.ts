import { v4 as uuidv4 } from "uuid";

import { STORE_LOCATION_DATA } from "../../../constants/data";
import {
  Country,
  Currency,
  PostalCode,
  Province,
  StatesUS,
  StoreLocation,
} from "../../../types";
import { shuffleArray } from "../../../utils";
import { ProductCategory } from "../../dashboard/types";
import { CUSTOMER_DOCUMENTS } from "../customer/customerDocuments";
import { PRODUCT_REVIEW_DOCUMENTS } from "../productReview/reviewDocuments";

type OrderStatus =
  | "Pending"
  | "Shipped"
  | "Delivered"
  | "Returned"
  | "Cancelled"
  | "Received";

type Address = {
  addressLine: string;
  city: string;
  province?: Province;
  state?: StatesUS;
  postalCode: PostalCode;
  country: Country;
};

type PaymentInformation = {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: Address;
};

type ProductsPurchased = {
  productId: string;
  sku: string;
  quantity: number;
  price: number;
  currency: Currency;
  productCategory: ProductCategory;
  orderStatus: OrderStatus;
};

type PurchaseKind = "Online" | "In-Store";

type PurchaseSchema = {
  products: ProductsPurchased[];
  customerId: string;
  dateOfPurchase: string;
  purchaseAmount: number;
  purchaseCurrency: Currency; // assume that 3rd party API will convert to CAD
  purchaseStoreLocation: StoreLocation;
  purchaseKind: PurchaseKind;
  shippingAddress: Address | null;
  paymentInformation: PaymentInformation;
};

type PurchaseDocument = PurchaseSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function returnPurchaseSchemas({
  customerDocuments,
  productCategoryDocuments,
  productReviewDocuments,
}: {
  customerDocuments: typeof CUSTOMER_DOCUMENTS;
  productCategoryDocuments: Record<string, any>[];
  productReviewDocuments: typeof PRODUCT_REVIEW_DOCUMENTS;
}) {
  const shuffledProductCategoryDocuments = shuffleArray(productCategoryDocuments);

  const positiveOrderStatusData = ["Pending", "Shipped", "Delivered", "Received"];
  const negativeOrderStatusData = ["Returned", "Cancelled"];

  return customerDocuments.reduce<PurchaseSchema[]>(
    (purchaseSchemasAcc, customerDocument) => {
      const randomCustomerPurchases = Math.round(Math.random() * (3 - 1) + 1);

      Array.from({ length: randomCustomerPurchases }).forEach(() => {
        const randomStoreLocation =
          STORE_LOCATION_DATA[Math.floor(Math.random() * STORE_LOCATION_DATA.length)];

        const randomDateOfPurchase =
          randomStoreLocation === "Edmonton"
            ? // Edmonton store opened in 2013
              new Date(2013, 0, 1 + Math.floor(Math.random() * 365 * 8))
            : // Calgary store opened in 2017
            randomStoreLocation === "Calgary"
            ? new Date(2017, 0, 1 + Math.floor(Math.random() * 365 * 4))
            : // Vancouver store opened in 2019
              new Date(2019, 0, 1 + Math.floor(Math.random() * 365 * 2));

        const randomPurchaseKind = Math.random() > 0.25 ? "Online" : "In-Store"; // bias towards online purchases

        const randomProductsPurchased = Math.round(Math.random() * (3 - 1) + 1);

        const randomStartingIdx = Math.floor(
          Math.random() *
            (shuffledProductCategoryDocuments.length - randomProductsPurchased)
        );

        const randomProducts = shuffledProductCategoryDocuments.slice(
          randomStartingIdx,
          randomStartingIdx + randomProductsPurchased
        );

        const randomShippingAddress =
          randomPurchaseKind === "Online"
            ? shuffleArray(customerDocuments).slice(0, 1)[0].address
            : null;

        const products = randomProducts.map((randomProduct) => {
          const randomQuantity = Math.round(Math.random() * (3 - 1) + 1);

          const randomOrderStatus =
            Math.random() < 0.1
              ? negativeOrderStatusData[
                  Math.floor(Math.random() * negativeOrderStatusData.length)
                ]
              : positiveOrderStatusData[
                  Math.floor(Math.random() * positiveOrderStatusData.length)
                ];

          // find the corresponding productCategory from the productReviewDocuments because the productCategory is not included in productCategoryDocuments
          const productCategory = productReviewDocuments.find(
            (productReview) => productReview.productId === randomProduct._id
          )?.productCategory as ProductCategory;

          return {
            productId: randomProduct._id as string,
            sku: uuidv4(),
            quantity: randomQuantity,
            price: randomProduct.price as number,
            currency: "CAD" as Currency,
            productCategory,
            orderStatus: randomOrderStatus as OrderStatus,
          };
        });

        const { _id, paymentInformation } = customerDocument;

        const purchaseAmount = products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        // round to 2 decimal places (https://stackoverflow.com/a/11832950)
        const purchaseAmountRounded =
          Math.round((purchaseAmount + Number.EPSILON) * 100) / 100;

        const purchaseSchema: PurchaseSchema = {
          products,
          customerId: _id,
          dateOfPurchase: randomDateOfPurchase.toISOString(),
          purchaseAmount: purchaseAmountRounded,
          purchaseCurrency: "CAD" as Currency,
          purchaseStoreLocation: randomStoreLocation as StoreLocation,
          purchaseKind: randomPurchaseKind as PurchaseKind,
          shippingAddress: randomShippingAddress as Address | null,
          paymentInformation: paymentInformation as PaymentInformation,
        };

        purchaseSchemasAcc.push(purchaseSchema);
      });

      return purchaseSchemasAcc;
    },
    []
  );
}

export { returnPurchaseSchemas };
export type { PurchaseDocument, PurchaseSchema };
