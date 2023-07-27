import { CSSProperties } from 'react';

import { RequestStatus } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';

type DisplayQueryMobileProps = {
  style?: CSSProperties;
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  restOfGroupedQueryResponseData: Record<string, any>[];
  componentQueryData: ComponentQueryData[];
  tableViewSelection: 'expanded' | 'condensed';
  popoversOpenCloseState: Map<string, boolean[]>;

  requestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;

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
};

export type { DisplayQueryMobileProps };
