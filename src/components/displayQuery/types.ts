import { CSSProperties } from 'react';

import {
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
} from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayQueryProps<Doc> = {
  style?: CSSProperties;
  queryResponseData: QueryResponseData<Doc>[];
  componentQueryData: ComponentQueryData[];
  parentComponentName: string;
  parentComponentDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
};

type DisplayQueryState = {
  groupByRadioData: RadioGroupInputData;
  groupBySelection: string;
  currentSelectionData: string[];
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  restOfGroupedQueryResponseData: Record<string, any>[];

  currentSegmentedSelection: 'expanded' | 'condensed';
  popoversOpenCloseState: Map<string, boolean[]>;
};

type DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData';
  setGroupBySelection: 'setGroupBySelection';
  setCurrentSelectionData: 'setCurrentSelectionData';

  setGroupedByQueryResponseData: 'setGroupedByQueryResponseData';
  setRestOfGroupedQueryResponseData: 'setRestOfGroupedQueryResponseData';

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection';
  setPopoversOpenCloseState: 'setPopoversOpenCloseState';
};

type DisplayQueryDispatch =
  | {
      type: DisplayQueryAction['setGroupByRadioData'];
      payload: RadioGroupInputData;
    }
  | {
      type: DisplayQueryAction['setGroupBySelection'];
      payload: string;
    }
  | {
      type: DisplayQueryAction['setCurrentSegmentedSelection'];
      payload: 'expanded' | 'condensed';
    }
  | {
      type: DisplayQueryAction['setCurrentSelectionData'];
      payload: string[];
    }
  | {
      type: DisplayQueryAction['setGroupedByQueryResponseData'];
      payload: Map<string | number, Record<string, any>[]>;
    }
  | {
      type: DisplayQueryAction['setRestOfGroupedQueryResponseData'];
      payload: Record<string, any>[];
    }
  | {
      type: DisplayQueryAction['setPopoversOpenCloseState'];
      payload: {
        key: string;
        popoverState: {
          index: number;
          value: boolean;
        };
      };
    };

export type {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryProps,
  DisplayQueryState,
};
