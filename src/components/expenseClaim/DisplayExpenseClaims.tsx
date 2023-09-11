import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import {
  EXPENSE_CLAIM__ROUTE_PATHS,
  EXPENSE_CLAIM_QUERY_DATA,
} from './constants';
import { ExpenseClaimDocument } from './create/types';

function DisplayExpenseClaims() {
  return (
    <DisplayResource<QueryResponseData<ExpenseClaimDocument>[]>
      componentQueryData={EXPENSE_CLAIM_QUERY_DATA}
      isFileUploadsWithResource={true}
      fileUploadFieldName="fileUploads"
      fileUploadIdFieldName="uploadedFilesIds"
      paths={EXPENSE_CLAIM__ROUTE_PATHS}
      requestBodyHeading="expenseClaim"
    />
  );
}

export default DisplayExpenseClaims;
