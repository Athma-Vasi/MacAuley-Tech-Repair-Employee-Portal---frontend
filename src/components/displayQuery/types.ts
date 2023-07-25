import { CSSProperties } from 'react';

import { QueryResponseData, SelectInputData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayQueryProps<Doc> = {
  style?: CSSProperties;
  queryResponseData: QueryResponseData<Doc>[];
  componentQueryData: ComponentQueryData[];
};

type DisplayQueryState = {
  groupBySelectData: string[];
  groupBySelection: string;
  groupBySelectValueMap: Map<string, string>;
};

type DisplayQueryAction = {
  setGroupBySelectData: 'setGroupBySelectData';
  setGroupBySelection: 'setGroupBySelection';
  setGroupBySelectValueMap: 'setGroupBySelectValueMap';
};

type DisplayQueryDispatch =
  | {
      type: DisplayQueryAction['setGroupBySelectData'];
      payload: string[];
    }
  | {
      type: DisplayQueryAction['setGroupBySelection'];
      payload: string;
    }
  | {
      type: DisplayQueryAction['setGroupBySelectValueMap'];
      payload: Map<string, string>;
    };

export type {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryProps,
  DisplayQueryState,
};
