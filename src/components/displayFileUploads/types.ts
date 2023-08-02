import { CSSProperties } from 'react';

import { FileUploadDocument, QueryResponseData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayFileUploadsProps = {
  componentQueryData: ComponentQueryData[];
  fileUploadsData: Array<{ [key: string]: FileUploadDocument[] }>;

  parentComponentName: string;
  parentDeleteResourceDispatch: React.Dispatch<{
    type: 'setDeleteResource';
    payload: {
      formId: string;
      fileUploadId?: string;
      kind: 'form' | 'fileUpload' | '';
      value: boolean;
    };
  }>;
  style?: CSSProperties;
  totalDocuments: number;
};

export type { DisplayFileUploadsProps };
