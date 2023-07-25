import { NavLink, Text } from '@mantine/core';
import { CSSProperties, useState } from 'react';
import { TbChevronRight } from 'react-icons/tb';

import {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
} from '../../types';

/**
 * - Represents the structure of data returned from a query, or the initial display state.
 * - The type includes mandatory fields that are always returned, while the other declared fields are optional and usually returned.
 * - The 'Partial' type with the generic 'Doc' indicates the optional fields present in resource documents.
 */
type QueryData<Doc> = {
  _id: string;
  userId: string;
  username: string;
  action?: Action;
  category?: ActionsCompany | ActionsGeneral | ActionsOutreach;
  createdAt: string;
  updatedAt: string;
  __v?: number;
} & Partial<Doc>;

type DisplayQueryMobileProps<Doc> = {
  style?: CSSProperties;
  queryData: QueryData<Doc>[];
};

function DisplayQueryMobile<Doc>({
  style = {},
  queryData,
}: DisplayQueryMobileProps<Doc>): JSX.Element {
  const [activeParent, setActiveParent] = useState(0);
  const [activeChild, setActiveChild] = useState(0);

  const displayQueryMobile = queryData.map((queryDataItem, index) => {
    return (
      <NavLink
        key={`query-data-item-${index}`}
        active={activeParent === index}
        onClick={() => {
          setActiveParent(index);
        }}
        style={{
          ...style,
        }}
        rightSection={<TbChevronRight />}
        label={queryDataItem.username}
      >
        {Object.entries(queryDataItem).map(([fieldKey, fieldValue], index) => {
          return (
            <NavLink
              key={`query-data-item-${index}`}
              active={activeChild === index}
              onClick={() => {
                setActiveChild(index);
              }}
              style={{
                ...style,
              }}
              rightSection={<TbChevronRight />}
              label={fieldKey}
            >
              <Text>{fieldValue}</Text>
            </NavLink>
          );
        })}
      </NavLink>
    );
  });

  return <>{displayQueryMobile}</>;
}

export { DisplayQueryMobile };
export type { QueryData };
