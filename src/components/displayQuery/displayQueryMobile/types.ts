import { CSSProperties } from 'react';
import { ComponentQueryData } from '../../queryBuilder';

type DisplayQueryMobileProps = {
  style?: CSSProperties;
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  restOfGroupedQueryResponseData: Record<string, any>[];
  componentQueryData: ComponentQueryData[];
};

export type { DisplayQueryMobileProps };
