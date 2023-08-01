import { CSSProperties } from 'react';

import type { FileUploadDocument, RequestStatus } from '../../../types';
import type { ComponentQueryData } from '../../queryBuilder';

type DisplayQueryDesktopProps<Doc> = {
  componentQueryData: ComponentQueryData[];
  fileUploadsData?: FileUploadDocument[];
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;

  openDeleteAcknowledge: () => void;
  deleteFormIdDispatch: React.Dispatch<{
    type: 'setDeleteFormId';
    payload: string;
  }>;

  popoversOpenCloseState: Map<string, boolean[]>;
  popoversStateDispatch: React.Dispatch<{
    type: 'setPopoversOpenCloseState';
    payload: {
      key: string;
      popoverState: {
        index: number;
        value: boolean;
      };
    };
  }>;

  requestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
  restOfGroupedQueryResponseData: Record<string, any>[];
  style?: CSSProperties;
  tableViewSelection: 'expanded' | 'condensed';
};

export type { DisplayQueryDesktopProps };
