import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import { ImageUpload } from '../imageUpload';
import {
  EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY,
  EXPENSE_CLAIM_QUERY_DATA,
  EXPENSE_CLAIM__ROUTE_PATHS,
} from './constants';
import { ExpenseClaimDocument } from './createExpenseClaim/types';

function DisplayExpenseClaims() {
  return (
    <DisplayResource<QueryResponseData<ExpenseClaimDocument>[]>
      componentQueryData={EXPENSE_CLAIM_QUERY_DATA}
      isFileUploadsWithResource={true}
      fileUploadFieldName="fileUploads"
      paths={EXPENSE_CLAIM__ROUTE_PATHS}
      requestBodyHeading="expenseClaim"
    />
  );
}

export { DisplayExpenseClaims };
