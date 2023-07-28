import { CSSProperties } from 'react';

import { RequestStatus } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';

type DisplayQueryDesktopProps<Doc> = {
  style?: CSSProperties;
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  restOfGroupedQueryResponseData: Record<string, any>[];
  componentQueryData: ComponentQueryData[];
  tableViewSelection: 'expanded' | 'condensed';

  requestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
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

  openDeleteAcknowledge: () => void;
  parentDeleteFormDispatch: React.Dispatch<{
    type: 'setDeleteForm';
    payload: {
      id: string;
      value: boolean;
    };
  }>;
};

export type { DisplayQueryDesktopProps };
