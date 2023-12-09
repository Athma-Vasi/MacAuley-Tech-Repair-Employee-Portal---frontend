import { CustomerDocument } from "../../customer/types";
import { DirectoryUserDocument } from "../../directory/types";
import { CUSTOMER_DOCUMENTS } from "../customer/customerDocuments";

function returnUsernameEmailSetSchemas({
  customersDocs,
  usersDocs,
}: {
  usersDocs: DirectoryUserDocument[];
  customersDocs: typeof CUSTOMER_DOCUMENTS;
}) {
  const usernameSet = new Set<string>();
  const emailSet = new Set<string>();

  customersDocs.forEach((customerDoc) => {
    usernameSet.add(customerDoc.username);
    emailSet.add(customerDoc.email);
  });

  usersDocs.forEach((userDoc) => {
    usernameSet.add(userDoc.username);
    emailSet.add(userDoc.email);
  });

  return {
    username: Array.from(usernameSet),
    email: Array.from(emailSet),
  };
}

export { returnUsernameEmailSetSchemas };
