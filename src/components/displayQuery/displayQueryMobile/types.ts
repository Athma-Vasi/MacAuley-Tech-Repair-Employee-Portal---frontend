import { CSSProperties } from 'react';

import { SelectInputData } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';
import { QueryResponseData } from './DisplayQueryMobile';

type DisplayQueryMobileProps<Doc> = {
  style?: CSSProperties;
  // queryResponseData: QueryResponseData<Doc>[];
  // componentQueryData: ComponentQueryData[];
};

export type { DisplayQueryMobileProps };
