import { CSSProperties } from 'react';

import { RequestStatus } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';

type DisplayQueryMobileProps = {
  componentQueryData: ComponentQueryData[];
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

export type { DisplayQueryMobileProps };
