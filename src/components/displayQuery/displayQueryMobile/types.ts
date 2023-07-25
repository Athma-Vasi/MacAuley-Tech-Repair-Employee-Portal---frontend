import { CSSProperties } from 'react';

import { SelectInputData } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';
import { QueryResponseData } from './DisplayQueryMobile';

type DisplayQueryMobileProps<Doc> = {
  style?: CSSProperties;
  queryResponseData: QueryResponseData<Doc>[];
  componentQueryData: ComponentQueryData[];
};

type DisplayQueryMobileState = {
  groupBySelectData: SelectInputData;
};

type DisplayQueryMobileAction = {
  setGroupBySelectData: 'setGroupBySelectData';
};

type DisplayQueryMobileDispatch = {
  type: DisplayQueryMobileAction['setGroupBySelectData'];
  payload: SelectInputData;
};

export type {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileProps,
  DisplayQueryMobileState,
};
