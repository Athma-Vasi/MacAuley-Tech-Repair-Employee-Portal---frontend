import { CSSProperties } from 'react';

import {
  QueryResponseData,
  RadioGroupInputData,
  SelectInputData,
} from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayQueryProps<Doc> = {
  style?: CSSProperties;
  queryResponseData: QueryResponseData<Doc>[];
  componentQueryData: ComponentQueryData[];
};

type DisplayQueryState = {
  groupByRadioData: RadioGroupInputData;
  groupBySelection: string;
  groupBySelectValueMap: Map<string, string>;
};

type DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData';
  setGroupBySelection: 'setGroupBySelection';
  setGroupBySelectValueMap: 'setGroupBySelectValueMap';
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
      type: DisplayQueryAction['setGroupBySelectValueMap'];
      payload: Map<string, string>;
    };

export type {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryProps,
  DisplayQueryState,
};
