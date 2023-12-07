import {
  Country,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
} from "../../../types";
import { groupByField } from "../../../utils";
import { DirectoryUserDocument } from "../../directory/types";
import { ProductReviewDocument } from "../../product/types";
import { PurchaseDocument } from "../purchase/purchase";
import { PURCHASE_DOCUMENTS } from "../purchase/purchaseDocuments";
import { RMADocument } from "../rma/rma";

type PaymentInformation = {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: Address;
};

type Address = {
  addressLine: string;
  city: string;
  province?: Province | undefined;
  state?: StatesUS | undefined;
  postalCode: PostalCode;
  country: Country;
};

type CustomerSchema = {
  username: string;
  password: string;
  email: string;

  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  dateOfBirth: string;

  contactNumber: PhoneNumber;
  address: Address;
  paymentInformation: PaymentInformation;
  productReviewsIds: string[];
  purchaseHistoryIds: string[];
  rmaHistoryIds: string[];

  isActive: boolean;
  completedSurveys: string[];
  isPrefersReducedMotion: boolean;
};

type CustomerDocument = CustomerSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/**
 * @description uses the users documents to generate customer schemas in bulk
 */
function returnCustomerSchemas(usersDocs: DirectoryUserDocument[]) {
  const aggregatedUserFields = usersDocs.reduce<
    Map<
      keyof DirectoryUserDocument,
      Set<DirectoryUserDocument[keyof DirectoryUserDocument]>
    >
  >((acc, userDoc) => {
    Object.entries(userDoc).forEach((tuple) => {
      const [key, value] = tuple as [
        keyof DirectoryUserDocument,
        DirectoryUserDocument[keyof DirectoryUserDocument]
      ];

      if (acc.has(key)) {
        const prevSet = acc.get(key) ?? new Set();
        acc.set(key, prevSet.add(value));
      } else {
        acc.set(key, new Set([value]));
      }
    });

    return acc;
  }, new Map());

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const customerSchemas = Array.from({ length: 1000 }).map((_, idx) => {
    const firstNamePool = Array.from(
      aggregatedUserFields.get("firstName") ?? []
    ) as string[];
    const randomFirstName =
      firstNamePool[Math.floor(Math.random() * firstNamePool.length)];

    const middleNamePool = Array.from(
      aggregatedUserFields.get("middleName") ?? []
    ) as string[];
    const randomMiddleName =
      middleNamePool[Math.floor(Math.random() * middleNamePool.length)];

    const lastNamePool = Array.from(
      aggregatedUserFields.get("lastName") ?? []
    ) as string[];
    const randomLastName = lastNamePool[Math.floor(Math.random() * lastNamePool.length)];

    const preferredNamePool = Array.from(
      aggregatedUserFields.get("preferredName") ?? []
    ) as string[];
    const randomPreferredName =
      preferredNamePool[Math.floor(Math.random() * preferredNamePool.length)];

    const preferredPronounsPool = Array.from(
      aggregatedUserFields.get("preferredPronouns") ?? []
    ) as PreferredPronouns[];
    const randomPreferredPronouns =
      preferredPronounsPool[Math.floor(Math.random() * preferredPronounsPool.length)];

    const profilePictureUrlPool = Array.from(
      aggregatedUserFields.get("profilePictureUrl") ?? []
    ) as string[];
    const randomProfilePictureUrl =
      profilePictureUrlPool[Math.floor(Math.random() * profilePictureUrlPool.length)];

    // random date of birth between 18 and 100 years old converted to 'YYYY-MM-DD'
    const randomDateOfBirth = new Date(
      Date.now() - Math.floor(Math.random() * 31536000000 * 82) - 31536000000 * 18
    ).toISOString();

    const contactNumberPool = Array.from(
      aggregatedUserFields.get("contactNumber") ?? []
    ) as PhoneNumber[];
    const randomContactNumber =
      contactNumberPool[Math.floor(Math.random() * contactNumberPool.length)];

    const randomEmail = `${randomFirstName.toLowerCase()}_${randomMiddleName.toLowerCase()}_${randomLastName.toLowerCase()}_${
      idx + 1
    }@example.com`;

    const addressPool = Array.from(aggregatedUserFields.get("address") ?? []) as {
      city: string;
      province?: Province;
      state?: StatesUS;
      country: Country;
    }[];
    const randomAddress = addressPool[Math.floor(Math.random() * addressPool.length)];

    const randomAddressLine = `${idx + 1} ${randomLastName} ${
      ["St.", "Ave.", "Blvd.", "Cres.", "Dr.", "Rd.", "Way."][
        Math.floor(Math.random() * 7)
      ]
    }`;
    const randomPostalCode =
      randomAddress.country === "Canada"
        ? `${alphabets[Math.floor(Math.random() * 26)]}${Math.floor(Math.random() * 10)}${
            alphabets[Math.floor(Math.random() * 26)]
          } ${Math.floor(Math.random() * 10)}${
            alphabets[Math.floor(Math.random() * 26)]
          }${Math.floor(Math.random() * 10)}`
        : `${Math.floor(Math.random() * 100000)}`;

    // payment information
    const cardholderName = `${randomFirstName} ${randomLastName}`;
    const cardNumber = `${Math.floor(Math.random() * 10_000)}${Math.floor(
      Math.random() * 10_000
    )}${Math.floor(Math.random() * 10_000)}${Math.floor(Math.random() * 10_000)}`;
    const cvv = `${Math.floor(Math.random() * 1_000)}`;
    const expirationDate = new Date(
      Date.now() + Math.floor(Math.random() * 31536000000 * 10)
    ).toISOString();
    const billingAddress = {
      ...randomAddress,
      addressLine: randomAddressLine,
      postalCode: randomPostalCode,
    };

    // random customer schema fields

    const customerSchema: CustomerSchema = {
      username: `${randomFirstName}-${randomLastName}-${idx + 1}`,
      password: `${randomFirstName}-${randomLastName.toUpperCase()}-${idx + 1}!`,
      email: randomEmail,

      firstName: randomFirstName,
      middleName: randomMiddleName,
      lastName: randomLastName,
      preferredName: randomPreferredName,
      preferredPronouns: randomPreferredPronouns,
      profilePictureUrl: randomProfilePictureUrl,
      dateOfBirth: randomDateOfBirth,
      contactNumber: randomContactNumber,
      address: {
        ...randomAddress,
        addressLine: randomAddressLine,
        postalCode: randomPostalCode,
      },
      paymentInformation: {
        cardholderName,
        cardNumber,
        cvv,
        expirationDate,
        billingAddress,
      },
      productReviewsIds: [],
      purchaseHistoryIds: [],
      rmaHistoryIds: [],
      isActive: true,
      completedSurveys: [],
      isPrefersReducedMotion: false,
    };

    return customerSchema;
  });

  return customerSchemas;
}

function returnUpdateCustomerProductReviewsIdsFields(
  reviewDocuments: ProductReviewDocument[]
) {
  const groupedByCustomerId = groupByField({
    objectArray: reviewDocuments,
    field: "userId",
  });

  const customerFields = Object.entries(groupedByCustomerId).reduce(
    (acc, [customerId, reviews]) => {
      const fields = reviews.map((review) => {
        const customerField = {
          customerId,
          documentUpdate: {
            updateKind: "array",
            updateOperator: "$push",
            fields: { productReviewsIds: review._id },
          },
        };
        return customerField;
      });

      acc.push(fields);

      return acc;
    },
    [] as Record<string, any>[]
  );

  return customerFields.flat();
}

function returnUpdateCustomerPurchaseReviewsIds(
  purchaseDocuments: typeof PURCHASE_DOCUMENTS
) {
  const groupedByCustomerId = groupByField({
    objectArray: purchaseDocuments,
    field: "customerId",
  });

  const customerFields = Object.entries(groupedByCustomerId).reduce(
    (acc, [customerId, purchases]) => {
      const fields = purchases.map((purchase) => {
        const customerField = {
          customerId,
          documentUpdate: {
            updateKind: "array",
            updateOperator: "$push",
            fields: { purchaseHistoryIds: purchase._id },
          },
        };
        return customerField;
      });

      acc.push(fields);

      return acc;
    },
    [] as Record<string, any>[]
  );

  return customerFields.flat();
}

function returnUpdateCustomerRMAReviewsIds(rmaDocuments: RMADocument[]) {
  const groupedByCustomerId = groupByField({
    objectArray: rmaDocuments,
    field: "customerId",
  });

  const customerFields = Object.entries(groupedByCustomerId).reduce(
    (acc, [customerId, rmas]) => {
      const fields = rmas.map((rma) => {
        const customerField = {
          customerId,
          documentUpdate: {
            updateKind: "array",
            updateOperator: "$push",
            fields: { rmaHistoryIds: rma._id },
          },
        };
        return customerField;
      });

      acc.push(fields);

      return acc;
    },
    [] as Record<string, any>[]
  );

  return customerFields.flat();
}

export {
  returnCustomerSchemas,
  returnUpdateCustomerProductReviewsIdsFields,
  returnUpdateCustomerPurchaseReviewsIds,
  returnUpdateCustomerRMAReviewsIds,
};
export type { CustomerDocument, CustomerSchema };
