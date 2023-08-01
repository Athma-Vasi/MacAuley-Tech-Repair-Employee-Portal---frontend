import { CSSProperties } from 'react';

import { FileUploadDocument, QueryResponseData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayFileUploadsProps = {
  componentQueryData: ComponentQueryData[];
  fileUploadsData: FileUploadDocument[];

  parentComponentName: string;
  parentDeleteFormDispatch: React.Dispatch<{
    type: 'setDeleteForm';
    payload: {
      id: string;
      value: boolean;
    };
  }>;
  style?: CSSProperties;
  totalDocuments: number;
};

export type { DisplayFileUploadsProps };
