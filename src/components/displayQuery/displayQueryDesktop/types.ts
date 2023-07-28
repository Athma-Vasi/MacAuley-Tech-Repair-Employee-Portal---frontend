import { CSSProperties } from 'react';

import type { RequestStatus } from '../../../types';
import type { ComponentQueryData } from '../../queryBuilder';

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
  deleteFormIdDispatch: React.Dispatch<{
    type: 'setDeleteFormId';
    payload: string;
  }>;
};

export type { DisplayQueryDesktopProps };
