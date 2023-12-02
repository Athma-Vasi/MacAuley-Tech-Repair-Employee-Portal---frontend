import { CUSTOMER_DOCUMENTS } from "../customer/customerDocuments";
import { PRODUCT_REVIEW_DOCUMENTS } from "../productReview/reviewDocuments";

function returnPurchaseSchemas({
  customerDocuments,
  reviewDocuments,
}: {
  customerDocuments: typeof CUSTOMER_DOCUMENTS;
  // review docs used because all product ids are in one place
  reviewDocuments: typeof PRODUCT_REVIEW_DOCUMENTS;
}) {
  return customerDocuments.map((customerDocument) => {
    const { _id, address } = customerDocument;
  });
}
