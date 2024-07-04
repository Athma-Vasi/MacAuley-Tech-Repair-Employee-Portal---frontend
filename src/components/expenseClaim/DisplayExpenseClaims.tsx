import { Flex } from "@mantine/core";

import { QueryResponseData } from "../../types";
import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { EXPENSE_CLAIM_ROUTE_PATHS, EXPENSE_CLAIM_QUERY_DATA } from "./constants";
import { ExpenseClaimDocument } from "./create/types";

function DisplayExpenseClaims() {
  const imageSrc =
    "https://images.pexels.com/photos/837129/pexels-photo-837129.jpeg?auto=compress";
  const imageAlt = "Business person travelling";
  const resourceDescription = "Simplify Your Expense Reimbursements";
  const resourceTitle = "Expense Claims";

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource
      componentQueryData={EXPENSE_CLAIM_QUERY_DATA}
      createResourcePath="/home/company/expense-claim/create"
      isFileUploadsWithResource={true}
      resourceUrlPaths={EXPENSE_CLAIM_ROUTE_PATHS}
      requestBodyHeading="expenseClaim"
    />
  );

  const displayExpenseClaimComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayExpenseClaimComponent;
}

export default DisplayExpenseClaims;
